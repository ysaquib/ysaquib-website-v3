/**
 * File: Contact.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react'
import TextField from '../elements/TextField';
import Section from '../elements/Section';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../elements/Button';
import { Link } from 'react-router-dom';

interface IFormValues
{
   "Email Address" : string;
   "Password" : string;
}

const LoginPortal : FC = () =>
{
    const {register, handleSubmit} = useForm<IFormValues>();
    return (
       <Section id="login" title="Sign In">
           <form className="login_wrapper">
               <TextField label="Email Address" name="email" type="text" register={register} registration={{required: true}} />
               <TextField label="Password" name="password" type="password" register={register} registration={{required: true}} />
               <Link to="/signup" className="leftbtn">Create an account</Link>
               <Button text="Sign In" className="confirmbtn"/>
           </form>
       </Section>
    );
}

export default LoginPortal