/**
 * File: LoginPortal.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react'
import TextField from '../elements/TextField';
import Section from '../elements/Section';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../elements/Button';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { userSignIn } from '../../store/actions/authActions';

interface FormInputs
{
    "emailaddress" : string;
    "password" : string;
}

const schema = yup.object().shape(
{
    emailaddress : yup.string()
                      .email("is not valid.")
                      .required("is required."),
    password : yup.string()
                  .min(8, "must be at least 8 characters.")
                  .max(100, "cannot exceed 100 characters.")
                  .required("is required.")
});

const LoginPortal : FC = () =>
{
    const resolver = yupResolver(schema);
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormInputs>({mode: "all", resolver});
    
    const dispatch = useDispatch();
    const {error} = useSelector((state : RootState) => state.auth);

    const onSubmit : SubmitHandler<FormInputs> = (data) => 
    {
        console.log(JSON.stringify(data));
        
        dispatch(userSignIn({
            email: data.emailaddress, 
            password: data.password
        }));
    }

    return (
        <Section id="login" title="Sign In">
            <form className="login_wrapper" onSubmit={handleSubmit(onSubmit)}>
                {error && <p className="banner">{error}</p>}
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
                <Link to="/signup" className="leftbtn">
                    <Button className="no_background" text="Create an account" />
                </Link>

                <Button 
                    text={isSubmitting ? "Signing In" : "Sign In"} 
                    className="confirmbtn"
                    disabled={isSubmitting}
                    type="submit"/>
           </form>
        </Section>
    );
}

export default LoginPortal