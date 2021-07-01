/**
 * File: Contact.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect } from 'react'
import TextField from '../elements/TextField';
import Section from '../elements/Section';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextArea from '../elements/TextArea';
import Button from '../elements/Button';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Prompt } from 'react-router-dom';
import { MessageData } from '../../store/types/dataTypes';
import { useDispatch } from 'react-redux';
import { addNewMessage } from '../../store/actions/dataActions';


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
    firstname : yup.string().max(20, "cannot exceed 20 characters.").required("is required."),
    lastname : yup.string().max(20, "cannot exceed 20 characters.").required("is required."),
    emailaddress : yup.string().email("is not valid.").required("is required."),
    subject : yup.string().max(60, "cannot exceed 60 characters.").required("is required."),
    message : yup.string().max(1000, "cannot exceed 1000 caracters.").required("is required.")
});

const Contact : FC = () =>
{
    const dispatch = useDispatch();
    const resolver = yupResolver(schema);
    const {register, handleSubmit, reset, formState: {errors, isDirty, isSubmitting, isSubmitted}} = useForm<FormInputs>({mode:"all" ,resolver});

    useEffect(() => {
        if (isDirty)
        {
            window.onbeforeunload = () => true;
        }

        else if (isSubmitted)
        {
            window.onbeforeunload = () => undefined;
        }
        
        return () => {
            window.onbeforeunload = () => undefined;
        };
    }, [isDirty, isSubmitted]);

    const onSubmit : SubmitHandler<FormInputs> = (data) => 
    {
        window.onbeforeunload = () => undefined;
        console.log(JSON.stringify(data));
        const message: MessageData = 
        {
            msg_id: "",
            msg_firstname: data.firstname,
            msg_lastname: data.lastname,
            msg_emailaddress: data.emailaddress,
            msg_subject: data.subject,
            msg_message: data.message,
            msg_seen: false,
            msg_sentAt: new Date(Date.now())
        }
        
        dispatch(addNewMessage(message));
        reset();
        /**
         * TODO: Add recaptcha
         */
    }

    if (isSubmitted)
    {
        return(
            <Section id="contact" className="mini" title={default_data.contact.title}>
                <h2 className="message_sent">Your message has been sent!<br />I will be in touch with you as soon as possible.</h2>
            </Section>
        );
    }

    return (
        <Section id="contact" className="mini" title={default_data.contact.title}>
            <form className="contact_wrapper" onSubmit={handleSubmit(onSubmit)}>
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
                    when={isDirty}
                    message='You have unsaved changes, are you sure you want to leave?'/>
                    
                <Button text="Send Message" disabled={ !isDirty || isSubmitting || isSubmitted } className="confirmbtn" />
            </form>
        </Section>
    );
}

export default Contact


