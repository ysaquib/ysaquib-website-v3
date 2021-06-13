export const Data_SetBannerData = 'Data_SetBannerData';
export const Data_SetAboutData = 'Data_SetAboutData';

export interface BannerData
{
    banner_name : string;
    banner_title : string;
    banner_prefix : string;
    banner_resume_url : string;
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

export type BannerAction = SetBannerDataAction;
export type AboutAction = SetAboutDataAction;