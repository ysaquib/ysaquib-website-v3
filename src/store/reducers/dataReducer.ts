import {BannerData, Data_SetBannerData, BannerAction} from '../types/dataTypes'

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