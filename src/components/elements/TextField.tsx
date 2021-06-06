/**
 * File: TextField.tsx
 * Author: Yusuf Saquib
 */
import React, { FC, InputHTMLAttributes, useEffect, useState } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';


/**
 * Extend the InputHTMLAttributes Class to inherit regular input properties
 * but also add our own custom properties
 * 
 */
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> 
{
    name: string;
    label: string;
    message?: string;
    register: UseFormRegister<any>;
    registration: RegisterOptions;
}

const TextField: FC<TextFieldProps> = ({ label, type, name, className, disabled, message, register, registration, ...props }) => 
{
    const [showLabel, setShowLabel] = useState(false);

    useEffect(() => 
    {
        if(showLabel === false && message == null)
        {
            document.getElementById(name)?.classList.remove("shown");
        }
        else
        {
            document.getElementById(name)?.classList.add("shown");
        }
    }, [showLabel, message])

    return (
       <div className={`input_wrapper ${className ? className : ""}`}>
            <label id={name} htmlFor={name} className={`text_label ${message ? "error" : ""}`}>
                {message != null ? label + " " + message : label}
            </label>
            <br />
            <input {...props} type={type} {...register(name, registration)} 
                name={name}
                disabled={disabled} 
                placeholder={label}
                onChange={(event) => event.target.value === "" ? setShowLabel(false) : setShowLabel(true)}/>
       </div>
    );
}

export default TextField;