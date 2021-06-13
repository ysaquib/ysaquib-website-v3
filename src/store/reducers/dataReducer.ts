import {BannerData, Data_SetBannerData, BannerAction, Data_SetAboutData, AboutAction, AboutData } from '../types/dataTypes'

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