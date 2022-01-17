import { Data_AddMessageData, Data_DecrementNew, Data_DelMessageData, Data_IncrementNew, Data_isLoadingMessages, Data_SeenMessageData, Data_SetAllMessagesData, Data_SetNewMessagesCount, MessageAction, MessageState } from "../types/messageTypes";

const initialMessagesState : MessageState = {
    allMessages: [],
    hasNewMessages: false,
    newMessagesCount: 0,
    isLoadingMessages: true,
};
export const messageReducer = (state = initialMessagesState, action: MessageAction) : MessageState => 
{
    switch (action.type)
    {
        case Data_SetAllMessagesData:
            return {...state, allMessages: action.payload}

        case Data_AddMessageData:
            const allMessages = state.allMessages;
            allMessages.unshift(action.payload);
            return {...state, allMessages};

        case Data_DelMessageData:
            return {...state, allMessages: state.allMessages.filter((msg) => {return action.payload.msg_id !== msg.msg_id})};
        
        case Data_SeenMessageData:
            const msgToUpdate = state.allMessages.find((msg) => (msg.msg_id === action.payload.msg_id));
            msgToUpdate && (msgToUpdate.msg_seen = true);
            return state;

        case Data_IncrementNew:
            return {...state, newMessagesCount: state.newMessagesCount + 1, hasNewMessages: true};

        case Data_DecrementNew:
            return {...state, newMessagesCount: state.newMessagesCount - 1, hasNewMessages: (state.newMessagesCount - 1 > 0)};

        case Data_isLoadingMessages:
            return {...state, isLoadingMessages: action.payload};
        
        case Data_SetNewMessagesCount:
            return {...state, newMessagesCount: action.payload, hasNewMessages: true};

        default:
            return state;
    }
}