export const Data_SetBannerData = 'Data_SetBannerData';
export const Data_SetAboutData = 'Data_SetAboutData';
export const Data_SetProjectData = 'Data_SetProjectData';
export const Data_SetBlogData = 'Data_SetBlogData';

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
    blog_tags: string;
    blog_isHidden?: boolean;
    blog_inProgress?: boolean;
    blog_isFeatured?: boolean;
}

interface SetBlogDataAction
{
    type: typeof Data_SetBlogData;
    payload: BlogData[];
}

export type BannerAction = SetBannerDataAction;
export type AboutAction = SetAboutDataAction;
export type ProjectAction = SetProjectDataAction;
export type BlogAction = SetBlogDataAction;
