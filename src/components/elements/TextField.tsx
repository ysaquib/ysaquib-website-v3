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
    register?: UseFormRegister<any>;
    registration?: RegisterOptions;
    show_label?: boolean;
    className?: string;
    classNameInner?: string;
    onChangeEvent?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: FC<TextFieldProps> = ({ label, onChangeEvent, type, name, classNameInner, className, disabled, message, register, registration, replace_label, show_label=false, ...props }) => 
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
            {register 
            ?
                <input {...props} type={type} {...register(name, registration)}
                    id={`${name}_input`}
                    name={name}
                    className={`${classNameInner ?? ""} ${message ? "error" : ""}`}
                    disabled={disabled} 
                    placeholder={label}
                    onChange={(event) => {onChangeEvent && onChangeEvent(event); (event.target.value === "" && !show_label) ? setShowLabel(false) : setShowLabel(true)}}/>
            :
                <input {...props} type={type}
                    id={`${name}_input`}
                    name={name}
                    className={`${classNameInner ?? ""} ${message ? "error" : ""}`}
                    disabled={disabled} 
                    placeholder={label}
                    onChange={(event) => {onChangeEvent && onChangeEvent(event); (event.target.value === "" && !show_label) ? setShowLabel(false) : setShowLabel(true)}}/>

            }
       </div>
    );
}

export default TextField;