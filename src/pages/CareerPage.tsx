/**
 * File: AdminPage.tsx
 * Author: Yusuf Saquib
 * 
 * Shows the admin dashboard and admin components
 */

import React, { FC, useEffect } from 'react';
import Education from '../components/sections/Education';
import Work from '../components/sections/Work';
 
const CareerPage : FC = () =>
{
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