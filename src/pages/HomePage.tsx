/**
 * File: HomePage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import Banner from '../components/sections/Banner';
import Projects from '../components/sections/Projects';
import Security from '../components/sections/Security';
import ACWrapper from '../components/wrappers/ACWrapper';
import { Container } from '@material-ui/core';

const HomePage : FC = () =>
{
    return (
        <Container>
            <Banner />
            <Projects />
            <ACWrapper />
            <Security />
        </Container>
    );
}

export default HomePage;