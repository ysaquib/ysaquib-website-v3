/**
 * File: TextField.tsx
 * Author: Yusuf Saquib
 */
import React, { FC, InputHTMLAttributes, useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';


/**
 * Extend the InputHTMLAttributes Class to inherit regular input properties
 * but also add our own custom properties
 * 
 */
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> 
{
    name: string;
    label: string;
    required: boolean;
    register: UseFormRegister<any>;
}

const TextField: FC<TextFieldProps> = ({ label, type, name, className, disabled, register, required, ...props }) => 
{
    const [showLabel, setShowLabel] = useState(false);

    useEffect(() => 
    {
        if(showLabel)
        {
            document.getElementById(name)?.classList.add("shown");
        }
        else
        {
            document.getElementById(name)?.classList.remove("shown");
        }
    }, [showLabel, name])

    return (
       <div className={`input_wrapper ${className}`}>
            <label id={name} htmlFor={name} className="input_label">{label}</label>
            <br />
            <input {...props} type={type} {...register(label, {required})} 
                name={name}
                disabled={disabled} 
                placeholder={label}
                onChange={(event) => event.target.value === "" ? setShowLabel(false) : setShowLabel(true)}/>
       </div>
    );
}

export default TextField;