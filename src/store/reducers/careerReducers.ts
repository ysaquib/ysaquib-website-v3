import { CareerAction, CareerState, Data_AddCareer, Data_DelCareer, Data_SetAllCareersData, Data_SetCareerData, Data_UpdateAllCareersData, Data_isLoadingCareers } from "../types/careerTypes";

const initialBlogsState: CareerState =
{
    allCareers: [],
    isLoadingCareers: true,
}
export const blogReducer = (state = initialBlogsState, action: CareerAction) : CareerState =>
{
    switch (action.type)
    {
        case Data_SetAllCareersData:
            return {...state, allCareers: action.payload};

        // case Data_UpdateAllCareersData:
        //     return state;

        case Data_SetCareerData:
            const newCareers = state.allCareers;
            const career_index = state.allCareers.findIndex((career) => {return career.career_id === action.payload.career_id});
            newCareers[career_index] = action.payload;
            return {...state, allCareers: newCareers};
            
            case Data_AddCareer:
            const allCareers = state.allCareers;
            allCareers.push(action.payload);
            return {...state, allCareers: allCareers};

        case Data_DelCareer:
            const newAllCareers = state.allCareers.filter((career) => {return career.career_id !== action.payload.career_id});
            return {...state, allCareers: newAllCareers};

        case Data_isLoadingCareers:
            return {...state, isLoadingCareers: action.payload};

        default:
            return state;
    }
}