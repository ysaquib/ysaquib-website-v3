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
     "Username" : string;
     "Email Address" : string;
     "Password" : string;
     "Confirm Password" : string;
 }
 
 const RegisterPortal : FC = () =>
 {
     const {register, handleSubmit} = useForm<IFormValues>();
     return (
        <Section id="register" title="Create An Account">
            <form className="register_wrapper">
                <TextField label="Username" name="username" type="text" className="email" register={register} registration={{required: true}} />
                <TextField label="Email Address" name="email" type="text" className="email" register={register} registration={{required: true}} />
                <TextField label="Password" name="password" type="password" className="pass" register={register} registration={{required: true}} />
                <TextField label="Confirm Password" name="confirmpassword" type="password" className="pass" register={register} registration={{required: true}} />
                <Link to="/signin" className="leftbtn">Already Registered?</Link>
                <Button text="Sign Up" className="confirmbtn"/>
            </form>
        </Section>
     );
 }
 
 export default RegisterPortal