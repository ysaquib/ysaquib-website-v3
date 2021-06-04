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
     "Email Address" : string;
     "Password" : string;
 }
 
 const LoginPortal : FC = () =>
 {
     const {register, handleSubmit} = useForm<IFormValues>();
     return (
        <Section id="login" title="Sign In">
            <div className="input_wrapper">
                 <TextField label="Email Address" name="email" type="text" required register={register} />
                 <TextField label="Password" name="password" type="password" required register={register} />
            </div>
        </Section>
     );
 }
 
 export default LoginPortal