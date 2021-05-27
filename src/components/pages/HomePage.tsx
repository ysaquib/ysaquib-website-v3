import React, { FC } from 'react';

import Banner from '../sections/Banner';
import Projects from '../sections/Projects';

const HomePage : FC = () =>
{
    return (
        <>
        <Banner />
        <Projects />
        </>
    );
}

export default HomePage;