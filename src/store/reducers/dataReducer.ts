import {BannerData, Data_SetBannerData, BannerAction, Data_SetAboutData, AboutAction, AboutData, ProjectData, ProjectAction, Data_SetProjectData, BlogData, BlogAction, Data_SetBlogData, MessageData, MessageAction, Data_AddMessageData, MessageState, Data_IncrementNew, Data_DecrementNew, Data_DelMessageData, Data_SeenMessageData, Data_SetAllBlogsData, Data_DelBlog, Data_AddBlog, Data_SetAllProjectsData, Data_AddProject, Data_DelProject, Data_UpdateAllProjects, } from '../types/dataTypes'

let default_data = require('../../default_data.json');

const localBannerState: string | null = localStorage.getItem("banner");
const initialBannerState: BannerData = localBannerState != null ? JSON.parse(localBannerState) : default_data.banner;

export const bannerReducer = (state = initialBannerState, action: BannerAction) =>
{
    switch (action.type)
    {
        case Data_SetBannerData:
            localStorage.setItem("banner", JSON.stringify(action.payload));
            return (action.payload);

        default:
            return state;
    }
}

const localAboutState : string | null = localStorage.getItem("about");
const initialAboutState : AboutData = localAboutState != null ? JSON.parse(localAboutState) : default_data.about;

export const aboutReducer = (state = initialAboutState, action: AboutAction) =>
{
    switch (action.type)
    {
        case Data_SetAboutData:
            localStorage.setItem("about", JSON.stringify(action.payload));
            return (action.payload);
            
        default:
            return state;
    }
}

const initialProjectsState : ProjectData[] = [];
export const projectReducer = (state = initialProjectsState, action: ProjectAction) =>
{
    switch (action.type)
    {
        case Data_SetAllProjectsData:
            return action.payload;

        case Data_SetProjectData:
            const project_index = state.findIndex((proj) => {return proj.project_id === action.payload.project_id});
            state[project_index] = action.payload;
            return state;
            
        case Data_AddProject:
            state.push(action.payload);
            return state;

        case Data_UpdateAllProjects:
            action.payload.forEach((project, index) => {project.project_order = index});
            console.log(action.payload);
            return action.payload;
        
        case Data_DelProject:
            const newAllProjects = state.filter((proj) => {return proj.project_id !== action.payload.project_id});
            newAllProjects.forEach((project, index) => {project.project_order = index});
            return newAllProjects;
            
        default:
            return state;
    }
}

const initialBlogsState : BlogData[] = [];
export const blogReducer = (state = initialBlogsState, action: BlogAction) =>
{
    switch (action.type)
    {
        case Data_SetAllBlogsData:
            return action.payload;

        case Data_SetBlogData:
            const indexToSet = state.findIndex((blogItem) => {return blogItem.blog_id === action.payload.blog_id});
            state[indexToSet] = action.payload;
            return state;

        case Data_DelBlog:
            const newAllBlogs = state.filter((blog) => {return blog.blog_id !== action.payload.blog_id});
            return newAllBlogs;

        case Data_AddBlog:
            state.unshift(action.payload);
            console.log(state);
            return state;

        default:
            return state;
    }
}

const initialMessagesState : MessageState = {
    messages: [],
    hasNewMessages: false,
    newMessagesCount: 0
};
export const messageReducer = (state = initialMessagesState, action: MessageAction) => 
{
    switch (action.type)
    {
        case Data_AddMessageData:
            return {...state, messages: state.messages.push(action.payload)};

        case Data_DelMessageData:
            return {...state, messages: state.messages.filter((msg) => {return action.payload.msg_id !== msg.msg_id})};
        
        case Data_SeenMessageData:
            const msgToUpdate = state.messages.find((msg) => (msg.msg_id === action.payload.msg_id));
            msgToUpdate && (msgToUpdate.msg_seen = true);
            return state;

        case Data_IncrementNew:
            return {...state, newMessagesCount: state.newMessagesCount + 1, hasNewMessages: true};

        case Data_DecrementNew:
            return {...state, newMessagesCount: state.newMessagesCount - 1, hasNewMessages: (state.newMessagesCount - 1 === 0)};

        default:
            return state;
    }
}