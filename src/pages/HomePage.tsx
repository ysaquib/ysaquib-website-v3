/**
 * File: HomePage.tsx
 * Author: Yusuf Saquib
 * 
 * Shows the homepage and basic components.
 */

import React, { FC } from 'react';
import Head from '../components/layout/Head';

import Banner from '../components/sections/Banner';
import Education from '../components/sections/Education';
import Projects from '../components/sections/Projects';
import Research from '../components/sections/Research';
import Security from '../components/sections/Security';
import Work from '../components/sections/Work';
import ACWrapper from '../components/wrappers/ACWrapper';

const HomePage : FC = () =>
{
    return (
        <>
            <Head />
            
            <Banner />
            <Projects projectsLimit={3} id="projects"/>
            <Work getData={true} itemLimit={3} showButton/>
            <Research getData={true} itemLimit={3} showButton/>
            <Education getData={true}/>
            <ACWrapper />
            <Security />
        </>
    );
}

export default HomePage;