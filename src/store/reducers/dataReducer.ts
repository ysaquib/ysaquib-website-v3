/**
 * File: dataReducer.ts
 * Author: Yusuf Saquib
 */

import {BannerData, Data_SetBannerData, BannerAction, Data_SetAboutData, AboutAction, AboutData, ProjectAction, Data_SetProjectData, BlogAction, Data_SetBlogData, MessageAction, Data_AddMessageData, MessageState, Data_IncrementNew, Data_DecrementNew, Data_DelMessageData, Data_SeenMessageData, Data_SetAllBlogsData, Data_DelBlog, Data_AddBlog, Data_SetAllProjectsData, Data_AddProject, Data_DelProject, Data_UpdateAllProjects, ProjectState, Data_isLoadingProjects, BlogState, Data_isLoadingBlogs, Data_SetAllMessagesData, Data_isLoadingMessages, Data_SetNewMessagesCount, } from '../types/dataTypes'

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

const initialProjectsState: ProjectState =
{
    allProjects: [],
    isLoadingProjects: true,
}
export const projectReducer = (state = initialProjectsState, action: ProjectAction) : ProjectState =>
{
    switch (action.type)
    {
        case Data_SetAllProjectsData:
            return {...state, allProjects: action.payload};

        case Data_SetProjectData:
            const newProjects = state.allProjects;
            console.log(state.allProjects);
            const project_index = newProjects.findIndex((proj) => {return proj.project_id === action.payload.project_id});
            console.log(project_index);
            newProjects[project_index] = action.payload;
            console.log(newProjects);
            return {...state, allProjects: newProjects};
            
        case Data_AddProject:
            const allProjects = state.allProjects;
            allProjects.push(action.payload);
            return {...state, allProjects: allProjects};

        case Data_UpdateAllProjects:
            action.payload.forEach((project, index) => {project.project_order = index});
            return {...state, allProjects: action.payload};
        
        case Data_DelProject:
            const newAllProjects = state.allProjects.filter((proj) => {return proj.project_id !== action.payload.project_id});
            newAllProjects.forEach((project, index) => {project.project_order = index});
            return {...state, allProjects: newAllProjects};
        
        case Data_isLoadingProjects:
            return {...state, isLoadingProjects: action.payload};
            
        default:
            return state;
    }
}

const initialBlogsState: BlogState =
{
    allBlogs: [],
    isLoadingBlogs: true,
}
export const blogReducer = (state = initialBlogsState, action: BlogAction) : BlogState =>
{
    switch (action.type)
    {
        case Data_SetAllBlogsData:
            return {...state, allBlogs: action.payload};

        case Data_SetBlogData:
            const allBlogs = state.allBlogs;
            const indexToSet = allBlogs.findIndex((blogItem) => {return blogItem.blog_id === action.payload.blog_id});
            allBlogs[indexToSet] = action.payload;
            return {...state, allBlogs};

        case Data_DelBlog:
            const newAllBlogs = state.allBlogs.filter((blog) => {return blog.blog_id !== action.payload.blog_id});
            return {...state, allBlogs: newAllBlogs};

        case Data_AddBlog:
            const allBlogsAdd = state.allBlogs;
            allBlogsAdd.unshift(action.payload);
            console.log(state);
            return {...state, allBlogs: allBlogsAdd};

        case Data_isLoadingBlogs:
            return {...state, isLoadingBlogs: action.payload};

        default:
            return state;
    }
}

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
            console.log(state.hasNewMessages, state.newMessagesCount);
            return {...state, newMessagesCount: state.newMessagesCount - 1, hasNewMessages: (state.newMessagesCount - 1 > 0)};

        case Data_isLoadingMessages:
            return {...state, isLoadingMessages: action.payload};
        
        case Data_SetNewMessagesCount:
            return {...state, newMessagesCount: action.payload, hasNewMessages: true};

        default:
            return state;
    }
}