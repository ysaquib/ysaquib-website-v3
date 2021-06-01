/**
 * File: Contact.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react'
import TextField from '../modules/TextField';
import Section from '../modules/Section';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormValues
{
    "First Name" : string;
    "Last Name" : string;
    "Email Address" : string;
    "Subject" : string;
    "Message" : string;
}

const Contact : FC = () =>
{
    const {register, handleSubmit} = useForm<IFormValues>();
    return (
       <Section id="contact" className="mini" title="Contact Me">
           <div className="contact_wrapper">
                <TextField label="First Name" name="first" type="text" className="half" required register={register} />
                <TextField label="Last Name" name="last" type="text" className="half" required register={register} />
                <TextField label="Email Address" name="email" type="text" required register={register} />
                <TextField label="Subject" name="subject" type="text" required register={register} />

                <label htmlFor="message" className="contact_label">Message
                    <textarea placeholder="placeholder" className="contact_message"/>
                </label>


           </div>
       </Section>
    );
}

export default Contact