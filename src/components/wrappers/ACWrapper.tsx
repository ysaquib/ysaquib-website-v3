import React, { FC } from 'react'
import About from '../sections/About';
import Contact from '../sections/Contact';

const ACWrapper : FC = () =>
{
    return (
        <section id="ac_wrapper">
            <About />
            <Contact />
        </section>
    );
}

export default ACWrapper