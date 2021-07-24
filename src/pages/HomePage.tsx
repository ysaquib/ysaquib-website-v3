/**
 * File: HomePage.tsx
 * Author: Yusuf Saquib
 * 
 * Shows the homepage and basic components.
 */

import React, { FC } from 'react';
import Head from '../components/layout/Head';

import Banner from '../components/sections/Banner';
import Projects from '../components/sections/Projects';
import Security from '../components/sections/Security';
import ACWrapper from '../components/wrappers/ACWrapper';

const HomePage : FC = () =>
{
    return (
        <>
            <Head title="Computer Science Student" />
            
            <Banner />
            <Projects projectsLimit={6} id="projects"/>
            <ACWrapper />
            <Security />
        </>
    );
}

export default HomePage;