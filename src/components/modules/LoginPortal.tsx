/**
 * File: Contact.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useState } from 'react'
import TextField from '../elements/TextField';
import Section from '../elements/Section';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../elements/Button';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormInputs
{
    "emailaddress" : string;
    "password" : string;
}

const schema = yup.object().shape(
{
    emailaddress : yup.string().email("is not valid.").required("is required."),
    password : yup.string().required("is required.")
});

const LoginPortal : FC = () =>
{
    const resolver = yupResolver(schema);
    const {register, handleSubmit, formState: {errors}} = useForm<FormInputs>({mode: "onBlur", resolver});
    
    const [isLoading, setLoading] = useState(false);
    const onSubmit : SubmitHandler<FormInputs> = (data) => 
    {
        console.log(JSON.stringify(data));
        
        setLoading(true);
        // reset();
    }
    return (
        <Section id="login" title="Sign In">
            <form className="login_wrapper" onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                    label="Email Address" 
                    name="emailaddress"
                    message={errors.emailaddress?.message} 
                    type="text" 
                    register={register} 
                    registration={{required: true}} />
                <TextField 
                    label="Password" 
                    name="password"
                    message={errors.password?.message} 
                    type="password" 
                    register={register} 
                    registration={{required: true}} />
                <Link to="/signup" className="leftbtn">Create an account</Link>

                <Button 
                    text={isLoading ? "Signing In" : "Sign In"} 
                    className="confirmbtn"
                    disabled={isLoading} />
           </form>
        </Section>
    );
}

export default LoginPortal