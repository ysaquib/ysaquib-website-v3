/**
 * 
 */

import firebase from 'firebase/app';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import Firebase from '../../firebase/config';
import { CareerAction, CareerData, Data_AddCareer, Data_DelCareer, Data_isLoadingCareers, Data_SetAllCareersData, Data_SetCareerData, Data_SetErrorCareers } from '../types/careerTypes';

export const getCareerData = (onComplete?: () => void, onError?: (msg: any) => void) : ThunkAction<void, RootState, null, CareerAction> =>
{
    return async dispatch =>
    {
        try
        {
            const careers = await Firebase.firestore().collection("careers").orderBy("career_endDate", "desc").get();
            const career_items: CareerData[] = [];
            careers.forEach((doc) => {
                career_items.push({
                    ...doc.data(),
                    career_id: doc.id,
                    career_startDate: doc.get("career_startDate").toDate(),
                    career_endDate: doc.get("career_endDate").toDate()
                } as CareerData);
            });

            dispatch({type: Data_SetAllCareersData, payload: career_items});
            dispatch(setCareersLoading(false));

            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
            dispatch(setCareersError(true));
            dispatch(setCareersLoading(false));
        }
    }
}

export const setCareerData = (careerData: CareerData, onComplete?: () => void, onError?: (msg: any) => void) : ThunkAction<void, RootState, null, CareerAction> =>
{
    return async dispatch =>
    {
        try
        {
            const {career_id, ...career} = careerData;
            const career_startDate = firebase.firestore.Timestamp.fromDate(career.career_startDate);
            const career_endDate = firebase.firestore.Timestamp.fromDate(career.career_endDate);
            
            await Firebase.firestore().collection("careers").doc(careerData.career_id).set({
                ...career,
                career_startDate,
                career_endDate
            });
            
            dispatch({
                type: Data_SetCareerData,
                payload: careerData
            });

            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
        }
    }
}

export const addNewCareer = (careerData: CareerData, onComplete?: () => void, onError?: (msg: any) => void) : ThunkAction<void, RootState, null, CareerAction> =>
{
    return async dispatch =>
    {
        try
        {
            const {career_id, ...career} = careerData;
            const career_startDate = firebase.firestore.Timestamp.fromDate(career.career_startDate);
            const career_endDate = firebase.firestore.Timestamp.fromDate(career.career_endDate);
            
            const new_career = await Firebase.firestore().collection("careers").add({
                ...careerData,
                career_startDate,
                career_endDate
            });

            dispatch({
                type: Data_AddCareer,
                payload: {...career, career_id: new_career.id}
            });

            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
        }
    }
}

export const deleteCareer = (careerData: CareerData, onComplete?: () => void, onError?: (msg: any) => void) : ThunkAction<void, RootState, null, CareerAction> =>
{
    return async dispatch =>
    {
        try
        {
            await Firebase.firestore().collection("careers").doc(careerData.career_id).delete();

            dispatch({
                type: Data_DelCareer,
                payload: careerData
            });

            onComplete && onComplete();
        }
        catch (error)
        {
            onError && onError(error);
            console.error(error);
        }
    }
}

export const setCareersLoading = (isLoading: boolean) : ThunkAction<void, RootState, null, CareerAction> =>
{
    return async dispatch =>
    {
        dispatch({
            type: Data_isLoadingCareers, 
            payload: isLoading
        });
    }
}

export const setCareersError = (isError: boolean) : ThunkAction<void, RootState, null, CareerAction> =>
{
    return async dispatch =>
    {
        dispatch({
            type: Data_SetErrorCareers, 
            payload: isError
        });
    }
}