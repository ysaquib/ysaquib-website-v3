/**
 * File: Button.tsx
 * Author: Yusuf Saquib
 */
import React, { FC, InputHTMLAttributes, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';


/**
 * Extend the InputHTMLAttributes Class to inherit regular input properties
 * but also add our own custom properties
 * 
 */
interface TextField extends InputHTMLAttributes<HTMLInputElement> 
{
    name: string;
    label: string;
    required: boolean;
    register: UseFormRegister<any>;
}

const TextField: FC<TextField> = ({ label, type, name, className, disabled, register, required }) => 
{

    function getValue(input : string)
    {
        if(input === "")
        {
            document.getElementById(name)?.classList.remove("shown");
        }
        else
        {
            document.getElementById(name)?.classList.add("shown");
        }
    }

    return (
       <div className={`input_wrapper ${className}`}>
            <label id={name} htmlFor={name} className="input_label">{label}</label>
            <br />
            <input type={type} {...register(label, {required})} 
                name={name}
                className="input" 
                disabled={disabled} 
                placeholder={label}
                onChange={(event) => getValue(event.target.value)}/>
       </div>
    );
}

export default TextField;