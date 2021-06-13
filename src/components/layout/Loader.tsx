/**
 * File: Loader.tsx
 * Author: Yusuf Saquib
 */

import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React, { FC } from 'react';

const Loader : FC = () =>
{
    return (
        <section id="loader">
            <div className="loader_wrapper">
                <div className="loader loader-ball" />
            </div>
            <h1 className="loading_text">Loading</h1>
        </section>
    );
}

export default Loader;