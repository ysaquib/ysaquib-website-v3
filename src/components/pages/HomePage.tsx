/**
 * File: HomePage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import Banner from '../sections/Banner';
import Projects from '../sections/Projects';
import Security from '../sections/Security';
import ACWrapper from '../wrappers/ACWrapper';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const HomePage : FC = () =>
{
    return (
        <>
        <Header />
        <Banner />
        <Projects />
        <ACWrapper />
        <Security />
        <Footer />
        </>
    );
}

export default HomePage;