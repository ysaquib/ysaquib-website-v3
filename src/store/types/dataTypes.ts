export const Data_SetBannerData = 'Data_SetBannerData';
export const Data_SetAboutData = 'Data_SetAboutData';
export const Data_SetProjectData = 'Data_SetProjectData';

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
    project_languages: string;
    project_order: number;
    project_image?: string;
    project_github?: string;
    project_url?: string;
    project_inProgress: boolean;
    project_progress?: number;
}

interface SetProjectDataAction
{
    type: typeof Data_SetProjectData;
    payload: ProjectData[];
}

export type ProjectAction = SetProjectDataAction;

export type BannerAction = SetBannerDataAction;
export type AboutAction = SetAboutDataAction;
