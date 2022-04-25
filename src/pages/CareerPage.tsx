/**
 * File: AdminPage.tsx
 * Author: Yusuf Saquib
 * 
 * Shows the admin dashboard and admin components
 */

import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Education from '../components/sections/Education';
import Research from '../components/sections/Research';
import Work from '../components/sections/Work';
import { getCareerData } from '../store/actions/careerActions';
 
const CareerPage : FC = () =>
{
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
            <Research />
            <Work />
        </>
    );
}

export default CareerPage;