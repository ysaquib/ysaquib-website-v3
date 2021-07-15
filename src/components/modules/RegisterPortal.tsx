/**
 * File: RegisterPortal.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useState } from 'react'
import TextField from '../elements/TextField';
import Section from '../elements/Section';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../elements/Button';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSignUp } from '../../store/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

interface FormInputs
{
    "firstname" : string;
    "lastname" : string;
    "emailaddress" : string;
    "password" : string;
    "confirmpassword" : string;
}

const schema = yup.object().shape(
{
    firstname : yup.string()
                   .required("is required."),
    lastname : yup.string()
                  .required("is required."),
    emailaddress : yup.string()
                      .email("is not valid.")
                      .required("is required."),
    password : yup.string()
                   .min(8, "must be at least 8 characters.")
                  .max(100, "cannot exceed 100 characters.")
                  .required("is required."),
    confirmpassword : yup.string()
                         .equals([yup.ref("password")], "Passwords must match.")
                         .required("Password must be confirmed.")
});

 
const RegisterPortal : FC = () =>
{
    const resolver = yupResolver(schema);
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<FormInputs>({mode: "all", resolver});
    const [isLoading, setLoading] = useState(false);
    const [isRegistered, setRegistered] = useState('');
    const dispatch = useDispatch();
    const {error, authenticated} = useSelector((state : RootState) => state.auth);

    const onSubmit : SubmitHandler<FormInputs> = (data) => 
    {
        setLoading(true);
        dispatch(userSignUp(
            {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.emailaddress,
                password: data.password
            },
            () => {setLoading(false)}));
        setRegistered(data.emailaddress);
    }

    if(authenticated && isRegistered === "")
    {
        return (
            <Redirect to="/" />
        );
    }
    else if(isRegistered !== "")
    {
        return (
            <Section id="register" title="Create An Account">
                <div className="register_wrapper">
                    <p className="banner success">
                        You have successfully signed up!
                        <br />
                        Please check your email '{isRegistered}' to complete registration.
                    </p>
                    <Link to="/signin" className="leftbtn">
                        <Button className="no_background" text="Sign In"/>
                    </Link>

                    <Link to="/" className="confirmbtn">
                        <Button className="no_background" text="Homepage"/>
                    </Link>
                </div>
            </Section>
        );
    }
    return (
        <Section id="register" title="Create An Account">
            <form className="register_wrapper" onSubmit={handleSubmit(onSubmit)}>
                {error && <p className="banner">{error}</p>}
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

                <Link to="/signin" className="leftbtn">
                    <Button type="button" className="no_background" text="Already Registered?"/>
                </Link>
                <Button 
                    text={isLoading ? "Signing Up" : "Sign Up"} 
                    className="confirmbtn"
                    type="submit"
                    disabled={isLoading || !isValid} />
            </form>
        </Section>
    );
}
 
export default RegisterPortal