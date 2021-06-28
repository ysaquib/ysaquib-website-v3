export const Data_SetBannerData = "Data_SetBannerData";

export const Data_SetAboutData = "Data_SetAboutData";

export const Data_SetProjectData = "Data_SetProjectData";
export const Data_SetAllProjectsData = "Data_SetAllProjectsData";
export const Data_AddProject = "Data_AddProject";
export const Data_DelProject = "Data_DelProject";
export const Data_UpdateAllProjects = "Data_UpdateAllProjects";
export const Data_isLoadingProjects = "Data_isLoadingProjects";

export const Data_SetBlogData = "Data_SetBlogData";
export const Data_SetAllBlogsData = "Data_SetAllBlogData";
export const Data_AddBlog = "Data_AddBlog";
export const Data_DelBlog = "Data_DelBlog";
export const Data_isLoadingBlogs = "Data_isLoadingBlogs";

export const Data_SetAllMessagesData = "Data_SetAllMessagesData";
export const Data_AddMessageData = "Data_AddMessageData";
export const Data_DelMessageData = "Data_DelMessageData";
export const Data_SeenMessageData = "Data_SeenMessageData";
export const Data_SetHasNew = "Data_SetHasNew";
export const Data_IncrementNew = "Data_IncrementNew";
export const Data_DecrementNew = "Data_DecrementNew";
export const Data_SetNewMessagesCount = "Data_SetNewMessagesCount";
export const Data_isLoadingMessages = "Data_isLoadingMessages";

export interface BannerData
{
    banner_name: string;
    banner_title: string;
    banner_prefix: string;
    banner_resume_url: string;
}

interface SetBannerDataAction
{
    type: typeof Data_SetBannerData;
    payload: BannerData;
}

export interface AboutData
{
    about_title: string;
    about_description: string;
    about_links: {[key: string]: string};
}

interface SetAboutDataAction
{
    type: typeof Data_SetAboutData;
    payload: AboutData;
}

export interface ProjectData
{
    project_id: string;
    project_title: string;
    project_description: string;
    project_tags: string;
    project_order: number;
    project_blog?: string;
    project_github?: string;
    project_url?: string;
    project_inProgress?: boolean;
    project_progress?: number;
    project_isHidden?: boolean;
}

interface SetAllProjectsDataAction
{
    type: typeof Data_SetAllProjectsData;
    payload: ProjectData[];
}

interface SetProjectDataAction
{
    type: typeof Data_SetProjectData;
    payload: ProjectData;
}

interface AddProjectAction
{
    type: typeof Data_AddProject;
    payload: ProjectData;
}

interface DelProjectAction
{
    type: typeof Data_DelProject;
    payload: ProjectData;
}

interface UpdateAllProjectsAction
{
    type: typeof Data_UpdateAllProjects;
    payload: ProjectData[];
}

interface SetLoadingProjectsAction
{
    type: typeof Data_isLoadingProjects;
    payload: boolean;
}

export interface ProjectState
{
    allProjects: ProjectData[];
    isLoadingProjects: boolean;
}

export interface BlogData
{
    blog_id: string;
    blog_url: string;
    blog_title: string;
    blog_content: string;
    blog_createdAt: Date;
    blog_updatedAt?: Date;
    blog_tags?: string;
    blog_isHidden?: boolean;
    blog_inProgress?: boolean;
    blog_isFeatured?: boolean;
}

interface SetAllBlogsAction
{
    type: typeof Data_SetAllBlogsData;
    payload: BlogData[];
}

interface SetBlogDataAction
{
    type: typeof Data_SetBlogData;
    payload: BlogData;
}

interface AddBlogAction
{
    type: typeof Data_AddBlog;
    payload: BlogData;
}

interface DelBlogAction
{
    type: typeof Data_DelBlog;
    payload: BlogData;
}

interface SetLoadingBlogsAction
{
    type: typeof Data_isLoadingBlogs;
    payload: boolean;
}

export interface BlogState
{
    allBlogs: BlogData[];
    isLoadingBlogs: boolean;
}

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

export type BannerAction = SetBannerDataAction;
export type AboutAction = SetAboutDataAction;
export type ProjectAction = SetProjectDataAction | SetLoadingProjectsAction | SetAllProjectsDataAction | AddProjectAction | DelProjectAction | UpdateAllProjectsAction;
export type BlogAction = SetBlogDataAction | SetAllBlogsAction | AddBlogAction | DelBlogAction | SetLoadingBlogsAction;
export type MessageAction = SetNewMessagesCountAction | SetAllMessagesDataAction | AddMessageDataAction | DelMessageDataAction | SeenMessageDataAction | SetHasNewDataAction | SetLoadingMessagesAction | IncrementNewDataAction | DecrementNewDataAction;
