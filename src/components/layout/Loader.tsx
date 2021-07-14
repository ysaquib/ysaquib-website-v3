/**
 * File: Loader.tsx
 * Author: Yusuf Saquib
 * 
 * Shows the loading screen. Pretty straightforward.
 */

import React, { FC } from 'react';

interface LoaderProps
{
    className?: string;
}
const Loader : FC<LoaderProps> = ({className}) =>
{
    return (
        <section id="loader" className={`${className ?? ""}`}>
            <div className="loader_wrapper">
                <div className="loader loader-ball" />
            </div>
            <h1 className="loading_text">Loading</h1>
        </section>
    );
}

export default Loader;