/**
 * File: Contact.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import TextField from '../elements/TextField';
import Section from '../elements/Section';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextArea from '../elements/TextArea';
import Button from '../elements/Button';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Prompt } from 'react-router-dom';
import { MessageData } from '../../store/types/messageTypes';
import { useDispatch } from 'react-redux';
import { addNewMessage } from '../../store/actions/messageActions';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from "axios";

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
    const {register, handleSubmit, reset, formState: {errors, isDirty, isValid} } = useForm<FormInputs>({mode: "all" ,resolver});
    const [isSent, setSent] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [isSending, setIsSending] = useState<boolean>(false);
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [errorMsg, setErrorMsg] = useState<string>("");

    /**
     * Disable Button when "Send Message" is clicked.
     */
    useEffect(() => {
        setButtonDisabled(!(isValid && isDirty));
    }, [isValid, isDirty]);

    /**
     * Shows prompt if navigating away and form has stuff in it.
     */
    useEffect(() => {
        if (isDirty)
        {
            window.onbeforeunload = () => true;
        }

        if (isSent)
        {
            window.onbeforeunload = () => undefined;
        }
        
        return () => {
            window.onbeforeunload = () => undefined;
        };
    }, [isDirty, isSent]);

    /**
     * handle form submission.
     * Create a new empty message and fill it with the data from the form and
     * send that to the database.
     */
    const onSubmit : SubmitHandler<FormInputs> = (data) => 
    {
        window.onbeforeunload = () => undefined;
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
        
        setSent(true);
        dispatch(addNewMessage(message));
        reset();
    }
    
    /**
     * Verify the recaptcha before submitting the form. If the recaptcha is
     * valid, then submit. Otherwise fail and show an error asking the user to
     * try again later
     */
    const handleReCaptchaVerify = async () => {
        setErrorMsg("");
        if (executeRecaptcha) 
        {
            setButtonDisabled(true);
            setIsSending(true);
            const token = await executeRecaptcha('Contact');
            try {
                const resp = await axios.get(`https://us-central1-ysaquib-website.cloudfunctions.net/sendRecaptcha?token=${token}`);
                if (resp.data.success && resp.data.score >= 0.5)
                {
                    handleSubmit(onSubmit)();
                }
                else
                {
                    setButtonDisabled(false);
                    setErrorMsg("An error has occured. Please try again later.");
                }
            }
            catch (error) {
                setErrorMsg("An unexpected error has occured. Please try again later.");
                setButtonDisabled(false);
            }
        }
        else
        {
            setIsSending(false);
            setButtonDisabled(false);
            setErrorMsg("An unknown error has occured. Please try again later.");
        }
    }

    if (isSent)
    {
        return(
            <Section id="contact" className="mini" title={default_data.contact.title}>

                <h2 className="message_sent">Your message has been sent!<br />I will be in touch with you as soon as possible.</h2>
            </Section>
        );
    }

    return (
        <Section id="contact" className="mini" title={default_data.contact.title}>
            {errorMsg !== "" && <div id="form_error">{errorMsg}</div>}
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
                    when={isDirty && !isSent}
                    message='You have unsaved changes, are you sure you want to leave?'/>
                    
                <Button text={isSending ? "Sending Message" : "Send Message"} disabled={isButtonDisabled} className="confirmbtn" onClick={(e) => {e.preventDefault(); handleReCaptchaVerify();}} />
                <div className="google_recaptcha_branding">
                    This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                </div>
            </form>
        </Section>
    );
}

export default Contact


