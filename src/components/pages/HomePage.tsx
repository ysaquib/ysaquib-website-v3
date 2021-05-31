/**
 * File: HomePage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import Banner from '../sections/Banner';
import Projects from '../sections/Projects';
import ACWrapper from '../wrappers/ACWrapper';

const HomePage : FC = () =>
{
    return (
        <>
        <Banner />
        <Projects />
        <ACWrapper />
        </>
    );
}

export default HomePage;