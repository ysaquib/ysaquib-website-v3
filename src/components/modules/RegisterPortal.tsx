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
    "username" : string;
    "firstname" : string;
    "lastname" : string;
    "emailaddress" : string;
    "password" : string;
    "confirmpassword" : string;
}

const schema = yup.object().shape(
{
    username : yup.string().required("is required."),
    firstname : yup.string().required("is required."),
    lastname : yup.string().required("is required."),
    emailaddress : yup.string().email("is not valid.").required("is required."),
    password : yup.string().required("is required."),
    confirmpassword : yup.string().equals([yup.ref("password")], "Passwords must match.").required("Password must be confirmed.")
});

 
const RegisterPortal : FC = () =>
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
        <Section id="register" title="Create An Account">
            <form className="register_wrapper" onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                    label="First Name" 
                    name="firstname"
                    message={errors.firstname?.message} 
                    type="text" 
                    className="half" 
                    register={register} 
                    registration={{required: true}} />

                <TextField 
                    label="Last Name" 
                    name="lastname"
                    message={errors.lastname?.message} 
                    type="text" 
                    className="half" 
                    register={register} 
                    registration={{required: true}} />

                <TextField 
                    label="Username" 
                    name="username"
                    message={errors.username?.message} 
                    type="text" 
                    register={register} 
                    registration={{required: true}} />

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

                <TextField 
                    label="Confirm Password" 
                    name="confirmpassword"
                    replace_label
                    message={errors.confirmpassword?.message} 
                    type="password" 
                    register={register} 
                    registration={{required: true}} />

                <Link to="/signin" className="leftbtn">Already Registered?</Link>
                <Button 
                    text={isLoading ? "Signing Up" : "Sign Up"} 
                    className="confirmbtn"
                    disabled={isLoading} />
            </form>
        </Section>
    );
}
 
export default RegisterPortal