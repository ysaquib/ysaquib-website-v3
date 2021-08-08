/**
 * 
 */

import firebase from 'firebase/app';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import Firebase from '../../firebase/config';
import { Data_AddMessageData, Data_DecrementNew, Data_DelMessageData, Data_IncrementNew, Data_isLoadingMessages, Data_SeenMessageData, Data_SetAllMessagesData, Data_SetNewMessagesCount, MessageAction, MessageData } from '../types/messageTypes';

export const getMessages = (onComplete?: () => void, onError?: (err: any) => void) : ThunkAction<void, RootState, null, MessageAction> =>
{
    return async dispatch =>
    {
        try
        {
            const messages = await Firebase.firestore().collection("messages").orderBy("msg_sentAt", "desc").get();
            const message_items: MessageData[] = [];
            let newMessages = 0;
            messages.forEach((doc) => {
                message_items.push({...doc.data(), msg_id: doc.id, msg_sentAt: doc.get("msg_sentAt").toDate()} as MessageData);
                if (doc.get("msg_seen") === false)
                {
                    newMessages++;
                }
            })
            
            if(newMessages > 0)
            {
                dispatch({
                    type: Data_SetNewMessagesCount,
                    payload: newMessages
                });
            }
            dispatch({
                type: Data_SetAllMessagesData, 
                payload: message_items
            });
            dispatch(setMessagesLoading(false));
            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
            dispatch(setMessagesLoading(false));
        }
    }
}

export const addNewMessage = (messageData: MessageData, onComplete?: () => void, onError?: (err: any) => void) : ThunkAction<void, RootState, null, MessageAction> =>
{
    return async dispatch =>
    {
        try
        {
            const currentTime = new Date(Date.now());
            const createdAt = firebase.firestore.Timestamp.fromDate(currentTime);
            const {msg_id, ...message} = messageData;
            await Firebase.firestore().collection("messages").add({...message, msg_sentAt: createdAt});
            dispatch({type: Data_AddMessageData, payload: messageData});
            dispatch({type: Data_IncrementNew});
            onComplete && onComplete();
            
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
        }
    }
}

export const deleteMessage = (messageData: MessageData, onComplete?: () => void, onError?: (err: any) => void) : ThunkAction<void, RootState, null, MessageAction> =>
{
    return async dispatch =>
    {
        try
        {
            dispatch({type: Data_DelMessageData, payload: messageData});
            await Firebase.firestore().collection("messages").doc(messageData.msg_id).delete();
            
            /**
             * Not strictly necessary but may need it later if I ever decide 
             * to move the delete button somewhere that does not require seeing
             * the message in order to delete it
             */
            if(!messageData.msg_seen)
            {
                dispatch({type: Data_DecrementNew});
            }
            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
        }
    }
}

export const seenMessage = (messageData: MessageData, onComplete?: () => void, onError?: (err: any) => void) : ThunkAction<void, RootState, null, MessageAction> =>
{
    return async dispatch =>
    {
        try
        {
            await Firebase.firestore().collection("messages").doc(messageData.msg_id).update({msg_seen: true});
            dispatch({type: Data_SeenMessageData, payload: messageData});
            dispatch({type: Data_DecrementNew});
            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
        }
    }
}

export const setMessagesLoading = (isLoading: boolean) : ThunkAction<void, RootState, null, MessageAction> =>
{
    return async dispatch =>
    {
        dispatch({
            type: Data_isLoadingMessages, 
            payload: isLoading
        });
    }
}