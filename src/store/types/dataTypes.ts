export const Data_SetBannerData = 'Data_SetBannerData';

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

export type BannerAction = SetBannerDataAction;