/**
 * File: TextField.tsx
 * Author: Yusuf Saquib
 */
import React, { FC, TextareaHTMLAttributes, useEffect, useState } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';


/**
 * Extend the TextareaHTMLAttributes Class to inherit regular area properties
 * but also add our own custom properties
 * 
 */
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> 
{
    name: string;
    label: string;
    message?: string;
    register: UseFormRegister<any>;
    registration: RegisterOptions;
}

const TextArea: FC<TextAreaProps> = ({ label, name, className, disabled, message, register, registration, ...props }) => 
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
    }, [showLabel, message]);

    return (
        <div className={`input_wrapper ${className ? className : ""}`}>
            <label id={name} htmlFor={name} className={`text_label ${message ? "error" : ""}`}>
                {message != null ? label + " " + message : label}
            </label>
            <br />
            <textarea {...register(name, registration)} {...props}
                name={name}
                disabled={disabled} 
                placeholder={label}
                onChange={(event) => event.target.value === "" ? setShowLabel(false) : setShowLabel(true)}/>
        </div>
    );
}

export default TextArea;