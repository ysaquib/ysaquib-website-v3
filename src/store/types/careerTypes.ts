export const Data_SetAllCareersData = "Data_SetAllCareersData";
export const Data_UpdateAllCareersData = "Data_UpdateAllCareersData";
export const Data_SetCareerData = "Data_SetCareerData";
export const Data_AddCareer = "Data_AddCareer";
export const Data_DelCareer = "Data_DelCareer";
export const Data_isLoadingCareers = "Data_isLoadingCareers";

export interface CareerData
{
    career_id: string;
    career_title: string;
    career_startDate: Date;
    career_endDate: Date;

    career_blog?: string;
    career_subtitle?: string;
    career_subtitleURL?: string;
    career_description?: string;
    career_organization?: string;
    career_organizationURL?: string;
    career_isCurrent?: boolean;
    career_isHidden?: boolean;
    career_city?: string;
    career_state?: string;
    career_country?: string;
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

export interface CareerState
{
    allCareers: CareerData[];
    isLoadingCareers: boolean;
}

export type CareerAction = SetAllCareersDataAction | UpdateAllCareersDataAction | setCareerDataAction | AddCareerDataAction | DelCareerDataAction | SetLoadingCareersAction;