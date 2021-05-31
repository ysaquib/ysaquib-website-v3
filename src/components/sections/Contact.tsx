/**
 * File: Contact.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react'
import Section from '../modules/Section';

const Contact : FC = () =>
{
    return (
       <Section id="contact" className="mini" title="Contact Me">
           <div className="contact_wrapper">
               <label>

               <input type="text" name="subject" placeholder="subject"/>
               </label>

           </div>
       </Section>
    );
}

export default Contact