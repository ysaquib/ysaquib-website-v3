/**
 * File: TextArea.tsx
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
    replace_label?: boolean,
    register?: UseFormRegister<any>;
    registration?: RegisterOptions;
    show_label?: boolean;
    classNameInner?: string;
    className?: string;
    onChangeEvent?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: FC<TextAreaProps> = ({ label, name, classNameInner, className, disabled, message, register, registration, replace_label, show_label=false, onChangeEvent, ...props }) => 
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
    }, [showLabel, message, name]);

    if(register)
    {
        const {onChange, ...reg} = register && register(name, registration);

        return (
            <div className={`input_wrapper ${className ? className : ""}`}>
                <label id={name} htmlFor={name} className={`text_label ${message ? "error" : ""}`}>
                    {replace_label ? `${message != null ? message : label }` : `${label} ${message != null ? message : "" }`}
                </label>
                <textarea {...props}
                    {...reg}
                    id={`${name}_input`}
                    name={name}
                    className={`${classNameInner ?? ""} ${message ? "error" : ""}`}
                    disabled={disabled} 
                    placeholder={label}
                    onChange={(event) => {
                        onChangeEvent && onChangeEvent(event); 
                        onChange(event); 
                        (event.target.value === "" && !show_label) ? setShowLabel(false) : setShowLabel(true)}}
                    />
            </div>
        );
    }

    
    return (
        <div className={`input_wrapper ${className ? className : ""}`}>
            <label id={name} htmlFor={name} className={`text_label ${message ? "error" : ""}`}>
                {replace_label ? `${message != null ? message : label }` : `${label} ${message != null ? message : "" }`}
            </label>
            <textarea {...props}
                id={`${name}_input`}
                name={name}
                className={`${classNameInner ?? ""} ${message ? "error" : ""}`}
                disabled={disabled} 
                placeholder={label}
                onChange={(event) => {
                    onChangeEvent && onChangeEvent(event); 
                    (event.target.value === "" && !show_label) ? setShowLabel(false) : setShowLabel(true)}}
                />
        </div>
    );
}

export default TextArea;