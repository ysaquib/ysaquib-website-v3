/**
 * File: InboxPage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getMessages } from '../../store/actions/dataActions';
import { MessageData } from '../../store/types/dataTypes';
import LoadingSkeleton from '../elements/LoadingSkeleton';

interface MessageListProps
{
    allMessages: MessageData[];
    isLoading: boolean;
}

const MessageList: FC<MessageListProps> = ({allMessages, isLoading}) =>
{
    if (isLoading)
    {
        return (
            <ul id="message_list">
                <LoadingSkeleton type="rectangle" className="message_loader" />
                <LoadingSkeleton type="rectangle" className="message_loader" />
                <LoadingSkeleton type="rectangle" className="message_loader" />
                <LoadingSkeleton type="rectangle" className="message_loader" />
                <LoadingSkeleton type="rectangle" className="message_loader" />
                <LoadingSkeleton type="rectangle" className="message_loader" />
                <LoadingSkeleton type="rectangle" className="message_loader" />
            </ul>
        );
    }

    return (
        <ul id="message_list">
            {allMessages && allMessages.map((message) =>
                <li className={`message_li ${message.msg_seen ? "" : "new_msg"}`} id={message.msg_id} key={message.msg_id}>
                    <h3 className="message_subject">{message.msg_subject}</h3>
                    <p className="message_sender">{message.msg_firstname} {message.msg_lastname} &lt;{message.msg_emailaddress}&gt;</p>
                </li>
            )}
        </ul>
    );
}

const Inbox : FC = () =>
{
    const dispatch = useDispatch();
    const {allMessages, isLoadingMessages} = useSelector((state: RootState) => state.messages);

    useEffect(() => 
    {
        dispatch(getMessages(undefined, () => {console.log("Error getting message data")}));
    }, [dispatch]);

    return (
        <section id="inbox">
            <MessageList allMessages={allMessages} isLoading={isLoadingMessages} />
            <div id="message">

            </div>
        </section>
    );
}

export default Inbox;