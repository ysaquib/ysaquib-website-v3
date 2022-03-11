/**
 * File: AdminPage.tsx
 * Author: Yusuf Saquib
 * 
 * Shows the admin dashboard and admin components
 */

import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Education from '../components/sections/Education';
import Work from '../components/sections/Work';
import { RootState } from '../store';
import { getCareerData } from '../store/actions/careerActions';
 
const CareerPage : FC = () =>
{
    const {allCareers, isLoadingCareers, isError} = useSelector((state: RootState) => state.careers);
    const dispatch = useDispatch();

    useEffect(() => 
    {
        dispatch(getCareerData( undefined, () => {console.error("Error getting Career data.")}));
        return () => {}
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    
    return (
        <>
            <Education />
            <Work />
        </>
    );
}

export default CareerPage;