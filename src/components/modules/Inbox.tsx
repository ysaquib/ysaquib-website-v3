/**
 * File: Inbox.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { deleteMessage, getMessages, seenMessage } from '../../store/actions/messageActions';
import { MessageData } from '../../store/types/messageTypes';
import DialogBox from '../elements/DialogBox';
import LoadingSkeleton from '../elements/LoadingSkeleton';
import Head from '../layout/Head';

interface ListItemProps
{
    message: MessageData;
    key: string;
    selected: boolean;
    onClick: () => void;
}

interface MessageBoxProps
{
    message: MessageData | undefined;
    handleDelete: (msg: MessageData) => void;
}

/**
 * A single message item using message data.
 */
const ListItem: FC<ListItemProps> = ({message, onClick, selected, ...props}) =>
{
    const ref = React.useRef<HTMLLIElement>(null);
    const dispatch = useDispatch();

    const handleClick = () =>
    {
        onClick();
        if(!message.msg_seen)
        {
            dispatch(seenMessage(message));
        }
        document.getElementById(message.msg_id)?.classList.add("selected_msg");
    }

    return (
        <li className={`message_li ${message.msg_seen ? "" : "new_msg"} ${selected ? "selected_msg" : ""}`} 
            id={message.msg_id} 
            ref={ref}
            onClick={handleClick} {...props}>
            <h3 className="msgli sender">{message.msg_firstname} {message.msg_lastname}</h3>
            <p className="msgli time">{message.msg_sentAt.toLocaleString("en-GB", {dateStyle: "short", timeStyle: "short", hour12: false})}</p>
            <h3 className="msgli subject">{message.msg_subject}</h3>
        </li>
    );
}

/**
 * Creates area where the message is shown.
 */
const MessageBox: FC<MessageBoxProps> = ({message, handleDelete}) =>
{
    if(!message)
    {
        return (
            <div id="message" className="empty_message">
                <p>No message selected.</p>
            </div>
        );
    }
    return (
        <div id="message">
            <input type="text" readOnly className="msginfo sender" value={`${message.msg_firstname} ${message.msg_lastname} <${message.msg_emailaddress}>`}></input>
            <input type="text" readOnly className="msginfo subject" value={`${message.msg_subject}`} />
            <textarea readOnly className="msginfo content" value={message.msg_message} />
            <div className="msginfo buttons">
                <div className="msgbtn delete" 
                     onClick={() => handleDelete(message)}>Delete</div>
                <div className="msgbtn save" 
                     onClick={() => console.info("Download")}>Save</div>
                <div className="msgbtn reply"
                     onClick={(event) => 
                     {
                         event.preventDefault();
                         window.location.href = `mailto:${message.msg_emailaddress}?subject=RE: ${message.msg_subject}&body=---%0D%0A${message.msg_message}`;
                     }}>Reply</div>
            </div>
        </div>
    );
}

const Inbox : FC = () =>
{
    const dispatch = useDispatch();
    const { allMessages, isLoadingMessages } = useSelector((state: RootState) => state.messages);
    const { authenticated, userRoles } = useSelector((state: RootState) => state.auth);
    const [ selectedMessage, setSelectedMessage] = useState<MessageData>();
    const [ dialog, setDialog ] = useState<JSX.Element>(<></>);

    /**
     * Get all messages from database.
     * : Note that this is not unique per user. This is for all users. But since I am the only user, its okay.
     */
    useEffect(() => 
    {
        if(authenticated && userRoles.includes("superadmin")) 
            dispatch(getMessages(undefined, () => {console.error("Error getting message data")}));
    }, [dispatch, authenticated, userRoles]);

    const handleClickDelete = (message: MessageData) =>
    {
        setDialog(
            <DialogBox title="Confirm Delete Message" 
                       message={`Are you sure you want to delete this message from ${message.msg_firstname} ${message.msg_lastname}?`}
                       messageError="Warning: this action cannot be undone."
                       optionReject="Delete Message"
                       optionClose="Cancel"
                       onClose={()=>setDialog(<></>)}
                       onReject={() => {
                           setSelectedMessage(undefined);
                           dispatch(deleteMessage(message));
                           setDialog(<></>);
                       }}/>);
    }
    
    if (isLoadingMessages)
    {
        return (
            <section id="inbox">
                <ul id="message_list" className="loading_list">
                    <LoadingSkeleton type="rectangle" className="message_loader" />
                    <LoadingSkeleton type="rectangle" className="message_loader" />
                    <LoadingSkeleton type="rectangle" className="message_loader" />
                    <LoadingSkeleton type="rectangle" className="message_loader" />
                    <LoadingSkeleton type="rectangle" className="message_loader" />
                    <LoadingSkeleton type="rectangle" className="message_loader" />
                    <LoadingSkeleton type="rectangle" className="message_loader" />
                </ul>
                <div id="message">
                </div>
            </section>
        );
    }
    else if (!isLoadingMessages && allMessages.length === 0)
    {
        return (
            <section id="inbox"> 
                <ul id="message_list" className="empty_list">
                    <li>You have no messages.</li>
                </ul>
                <div id="message" className="empty_message">
                    <p>No message selected.</p>
                </div>
            </section>
        );
    }
    return (
        <section id="inbox">
            <Head title="Messages" />

            {dialog}
            <ul id="message_list">
            {allMessages && allMessages.map((message) =>
                <ListItem message={message} 
                          key={message.msg_id}
                          selected={selectedMessage?.msg_id === message.msg_id}
                          onClick={() => {
                            if (selectedMessage)
                            {
                                document.getElementById(selectedMessage.msg_id)?.classList.remove("selected_msg", "new_msg");
                            }
                            setSelectedMessage(message);
                          }}/>
            )}
            </ul>
            <MessageBox message={selectedMessage} handleDelete={handleClickDelete}/>
        </section>
    );
}

export default Inbox;