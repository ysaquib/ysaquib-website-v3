/**
 * File: Contact.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useCallback, useEffect, useState } from 'react'
import TextField from '../elements/TextField';
import Section from '../elements/Section';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextArea from '../elements/TextArea';
import Button from '../elements/Button';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Prompt } from 'react-router-dom';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

let default_data = require('../../default_data.json');

interface FormInputs
{
    "firstname" : string;
    "lastname" : string;
    "emailaddress" : string;
    "subject" : string;
    "message" : string;
}

const schema = yup.object().shape(
{
    firstname : yup.string().required("is required."),
    lastname : yup.string().required("is required."),
    emailaddress : yup.string().email("is not valid.").required("is required."),
    subject : yup.string().required("is required."),
    message : yup.string().required("is required.")
});

const Contact : FC = () =>
{

    const resolver = yupResolver(schema);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormInputs>({mode:"onBlur" ,resolver});
    const [isMsgSent, setMsgSent] = useState(false);
    const [formChanged, setFormChanged] = useState(false);


    useEffect(() => {
        if (formChanged)
        {
            window.onbeforeunload = () => true;
        }
        return () => {
            window.onbeforeunload = () => undefined;
        };
    }, [formChanged]);
    

    const onSubmit : SubmitHandler<FormInputs> = (data) => 
    {
        window.onbeforeunload = () => undefined;
        console.log(JSON.stringify(data));
        /**
         * // TODO: Clear form on submit
         * // TODO: Add verification
         * TODO: Send message + (save to database?)
         * TODO: Add recaptcha
         */
        
        setMsgSent(true);
        reset();
    }

    if (isMsgSent)
    {
        return(
            <Section id="contact" className="mini" title={default_data.contact.title}>
                <h2>Your message has been sent! I will be in touch with you as soon as possible.</h2>
            </Section>
        );
    }

    return (
        <Section id="contact" className="mini" title={default_data.contact.title}>
            <form className="contact_wrapper" onSubmit={handleSubmit(onSubmit)} onChange={() => setFormChanged(true)}>
                <TextField 
                    label="First Name" 
                    name="firstname" 
                    type="text" 
                    className="half" 
                    message={errors.firstname?.message} 
                    register={register} 
                    registration={{required: true}} />
                        
                <TextField 
                    label="Last Name" 
                    name="lastname" 
                    type="text" 
                    className="half" 
                    message={errors.lastname?.message} 
                    register={register} 
                    registration={{required: true}} />

                <TextField 
                    label="Email Address" 
                    name="emailaddress" 
                    type="text" 
                    message={errors.emailaddress?.message} 
                    register={register} 
                    registration={{required: true}} />

                <TextField 
                    label="Subject" 
                    name="subject" 
                    type="text" 
                    message={errors.subject?.message} 
                    register={register} 
                    registration={{required: true}} />

                <TextArea 
                    label="Message" 
                    name="message" 
                    rows={10} 
                    message={errors.message?.message} 
                    register={register} 
                    registration={{required: true}} />

                
                <Prompt
                    when={formChanged}
                    message='You have unsaved changes, are you sure you want to leave?'/>
                    
                <Button text="Send Message" className="confirmbtn" />
            </form>
        </Section>
    );
}

export default Contact


