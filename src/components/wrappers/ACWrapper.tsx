/**
 * File: ACWrapper.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
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
            <GoogleReCaptchaProvider reCaptchaKey="6LfePyMbAAAAAAyhCMtDPqGNK_7IfJnR1YZJ-23Q">
                <Contact />
            </GoogleReCaptchaProvider>
        </section>
    );
}

export default ACWrapper