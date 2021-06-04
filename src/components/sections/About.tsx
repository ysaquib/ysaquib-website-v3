/**
 * File: About.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react'
import Section from '../elements/Section';

const About : FC = () =>
{
    return (
       <Section id="about" className="mini" title="About Me">
           <div className="about_wrapper">
               <p className="about_description">
               Hello! My name is Yusuf, and I am a Computer Science student at 
               Carnegie Mellon University, minoring in Business Administration. 
               I am expected to graduate in the Spring of 2022.
               <br />
               <br />
                I love building and creating things, whether it be applications, 
                software for embedded systems, and everything in between! 
                My goal is to create products that are seamless down to the last inch.
               </p>
           </div>
       </Section>
    );
}

export default About