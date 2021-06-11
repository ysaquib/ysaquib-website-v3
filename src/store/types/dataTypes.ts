export const Data_SetBannerData = 'Data_SetBannerData';
export const Status_SetLoading = 'Status_SetLoading';
export const Status_SetError = 'Status_SetError';

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

export type BannerAction = SetBannerDataAction ;