export const Data_SetAllMessagesData = "Data_SetAllMessagesData";
export const Data_AddMessageData = "Data_AddMessageData";
export const Data_DelMessageData = "Data_DelMessageData";
export const Data_SeenMessageData = "Data_SeenMessageData";
export const Data_SetHasNew = "Data_SetHasNew";
export const Data_IncrementNew = "Data_IncrementNew";
export const Data_DecrementNew = "Data_DecrementNew";
export const Data_SetNewMessagesCount = "Data_SetNewMessagesCount";
export const Data_isLoadingMessages = "Data_isLoadingMessages";

export interface MessageData
{
    msg_id: string;
    msg_firstname: string;
    msg_lastname: string;
    msg_emailaddress: string;
    msg_subject: string;
    msg_message: string;
    msg_sentAt: Date;
    msg_seen: boolean;
}

interface SetAllMessagesDataAction
{
    type: typeof Data_SetAllMessagesData;
    payload: MessageData[];
}

interface AddMessageDataAction
{
    type: typeof Data_AddMessageData;
    payload: MessageData;
}

interface DelMessageDataAction
{
    type: typeof Data_DelMessageData;
    payload: MessageData;
}

interface SeenMessageDataAction
{
    type: typeof Data_SeenMessageData;
    payload: MessageData;
}

interface SetHasNewDataAction
{
    type: typeof Data_SetHasNew;
    payload: boolean;
}
interface IncrementNewDataAction
{
    type: typeof Data_IncrementNew;
}
interface DecrementNewDataAction
{
    type: typeof Data_DecrementNew;
}
interface SetNewMessagesCountAction
{
    type: typeof Data_SetNewMessagesCount;
    payload: number;
}
interface SetLoadingMessagesAction
{
    type: typeof Data_isLoadingMessages;
    payload: boolean;
}

export interface MessageState 
{
    allMessages: MessageData[];
    hasNewMessages: boolean;
    newMessagesCount: number;
    isLoadingMessages: boolean;
}

export type MessageAction = SetNewMessagesCountAction | SetAllMessagesDataAction | AddMessageDataAction | DelMessageDataAction | SeenMessageDataAction | SetHasNewDataAction | SetLoadingMessagesAction | IncrementNewDataAction | DecrementNewDataAction;
