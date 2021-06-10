/**
 * File: ACWrapper.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react'
import About from '../sections/About';
import Contact from '../sections/Contact';


const ACWrapper : FC = () =>
{
    /**
     * Wrap the About and Contact sections in one neat little section
     */
    return (
        <section id="ac_wrapper">
            <About />
            <Contact />
        </section>
    );
}

export default ACWrapper