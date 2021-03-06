export const Data_SetAllCareersData = "Data_SetAllCareersData";
export const Data_SetErrorCareers = "Data_SetErrorCareers";
export const Data_UpdateAllCareersData = "Data_UpdateAllCareersData";
export const Data_SetCareerData = "Data_SetCareerData";
export const Data_AddCareer = "Data_AddCareer";
export const Data_DelCareer = "Data_DelCareer";
export const Data_isLoadingCareers = "Data_isLoadingCareers";
export type CareerType = "work" | "research" | "education" | "other";

export interface CareerData
{
    career_id: string;
    career_title: string;
    career_startDate: Date;
    career_endDate: Date;

    career_type: CareerType;

    career_blog?: string;
    career_subtitle?: string;
    career_subtitleURL?: string;
    career_description?: string;
    career_organization?: string;
    career_organizationURL?: string;
    career_isCurrent?: boolean;
    career_isHidden?: boolean;
    career_location?: string;
}

interface SetAllCareersDataAction
{
    type: typeof Data_SetAllCareersData;
    payload: CareerData[];
}

interface UpdateAllCareersDataAction
{
    type: typeof Data_UpdateAllCareersData;
    payload: CareerData[];
}

interface setCareerDataAction
{
    type: typeof Data_SetCareerData;
    payload: CareerData;
}

interface AddCareerDataAction
{
    type: typeof Data_AddCareer;
    payload: CareerData;
}

interface DelCareerDataAction
{
    type: typeof Data_DelCareer;
    payload: CareerData;
}

interface SetLoadingCareersAction
{
    type: typeof Data_isLoadingCareers;
    payload: boolean;
}

interface SetErrorCareersAction
{
    type: typeof Data_SetErrorCareers;
    payload: boolean;
}

export interface CareerState
{
    allCareers: CareerData[];
    isLoadingCareers: boolean;
    isError: boolean;
}

export type CareerAction = SetErrorCareersAction | SetAllCareersDataAction | UpdateAllCareersDataAction | setCareerDataAction | AddCareerDataAction | DelCareerDataAction | SetLoadingCareersAction;