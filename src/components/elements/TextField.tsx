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
    replace_label?: boolean,
    register: UseFormRegister<any>;
    registration: RegisterOptions;
    show_label?: boolean;
}

const TextField: FC<TextFieldProps> = ({ label, type, name, className, disabled, message, register, registration, replace_label, show_label=false, ...props }) => 
{
    const [showLabel, setShowLabel] = useState(props.defaultValue != null || show_label);

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
    }, [showLabel, message, name])

    return (
       <div className={`input_wrapper ${className ? className : ""}`}>
            <label id={name} htmlFor={name} className={`text_label ${message ? "error" : ""}`}>
                {replace_label ? `${message != null ? message : label }` : `${label} ${message != null ? message : "" }`}
            </label>
            <br />
            <input {...props} type={type} {...register(name, registration)}
                id={`${name}_input`}
                name={name}
                className={message ? "error" : ""}
                disabled={disabled} 
                placeholder={label}
                onChange={(event) => event.target.value === "" ? setShowLabel(false) : setShowLabel(true)}/>
       </div>
    );
}

export default TextField;