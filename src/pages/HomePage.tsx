/**
 * File: HomePage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import Banner from '../components/sections/Banner';
import Projects from '../components/sections/Projects';
import Security from '../components/sections/Security';
import ACWrapper from '../components/wrappers/ACWrapper';

const HomePage : FC = () =>
{
    return (
        <>
            <Banner />
            <Projects projectsLimit={5} id="projects"/>
            <ACWrapper />
            <Security />
        </>
    );
}

export default HomePage;