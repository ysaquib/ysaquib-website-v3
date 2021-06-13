export const Data_SetBannerData = 'Data_SetBannerData';
export const Data_SetAboutData = 'Data_SetAboutData';

export interface BannerData
{
    name : string;
    title : string;
    prefix : string;
    resume_url : string;
}

interface SetBannerDataAction
{
    type: typeof Data_SetBannerData;
    payload: BannerData;
}

export interface AboutData
{
    title: string;
    description: string;
    links: {[key: string]: string};
}

interface SetAboutDataAction
{
    type: typeof Data_SetAboutData;
    payload: AboutData;
}

export type BannerAction = SetBannerDataAction;
export type AboutAction = SetAboutDataAction;