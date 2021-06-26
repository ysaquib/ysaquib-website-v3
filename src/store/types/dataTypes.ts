export const Data_SetBannerData = 'Data_SetBannerData';
export const Data_SetAboutData = 'Data_SetAboutData';
export const Data_SetProjectData = 'Data_SetProjectData';
export const Data_SetBlogData = 'Data_SetBlogData';
export const Data_AddMessageData = 'Data_AddMessageData';
export const Data_DelMessageData = 'Data_DelMessageData';
export const Data_SetHasNew = 'Data_SetHasNew';
export const Data_IncrementNew = 'Data_IncrementNew';
export const Data_DecrementNew = 'Data_DecrementNew';

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

interface SetProjectDataAction
{
    type: typeof Data_SetProjectData;
    payload: ProjectData[];
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

interface SetBlogDataAction
{
    type: typeof Data_SetBlogData;
    payload: BlogData[];
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

export interface MessageState 
{
    messages: MessageData[];
    hasNewMessages: boolean;
    newMessagesCount: number;
}

export type BannerAction = SetBannerDataAction;
export type AboutAction = SetAboutDataAction;
export type ProjectAction = SetProjectDataAction;
export type BlogAction = SetBlogDataAction;
export type MessageAction = AddMessageDataAction | DelMessageDataAction | SetHasNewDataAction | IncrementNewDataAction | DecrementNewDataAction;
