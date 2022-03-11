/**
 * File: SelectMenu.tsx
 * Author: Yusuf Saquib
 */
import React, { FC, SelectHTMLAttributes, useEffect, useState } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

/**
 * Extend the InputHTMLAttributes Class to inherit regular input properties
 * but also add our own custom properties
 * 
 */
interface SelectMenuProps extends SelectHTMLAttributes<HTMLSelectElement> 
{
    name: string;
    label: string;
    message?: string;
    replace_label?: boolean,
    options: string[],
    register?: UseFormRegister<any>;
    registration?: RegisterOptions;
    show_label?: boolean;
    className?: string;
    classNameInner?: string;
    onChangeEvent?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectMenu: FC<SelectMenuProps> = ({ label, onChangeEvent, options, name, classNameInner, className, disabled, message, register, registration, replace_label, show_label=false, ...props }) => 
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

    if (register)
    {
        const {onChange, ...reg} = register && register(name, registration);

        return (
            <div className={`input_wrapper ${className ? className : ""}`}>
                <label id={name} htmlFor={name} className={`text_label ${message ? "error" : ""}`}>
                    {replace_label ? `${message != null ? message : label }` : `${label} ${message != null ? message : "" }`}
                </label>
                <div className="select-wrapper">
                <select {...props}
                    {...reg}
                    id={`${name}_input`}
                    name={name}
                    className={`${classNameInner ?? ""} ${message ? "error" : ""}`}
                    disabled={disabled} 
                    placeholder={label}
                    onChange={(event) => {
                        onChangeEvent && onChangeEvent(event); 
                        (event.target.value === "" && !show_label) ? setShowLabel(false) : setShowLabel(true)}}
                    >
                        {options.map((item) => { return(
                            <option key={item.toLowerCase()} value={item.toLowerCase()}>{item}</option>
                        )})}
                </select>
                </div>
            </div>
        );
    }
    return (
       <div className={`input_wrapper ${className ? className : ""}`}>
            <label id={name} htmlFor={name} className={`text_label ${message ? "error" : ""}`}>
                {replace_label ? `${message != null ? message : label }` : `${label} ${message != null ? message : "" }`}
            </label>
            <div className="select-wrapper">
            <select {...props}
                id={`${name}_input`}
                name={name}
                className={`${classNameInner ?? ""} ${message ? "error" : ""}`}
                disabled={disabled} 
                placeholder={label}
                onChange={(event) => {
                    onChangeEvent && onChangeEvent(event); 
                    (event.target.value === "" && !show_label) ? setShowLabel(false) : setShowLabel(true)}}
                >
                    {options.map((item) => { return(
                        <option key={item.toLowerCase()} value={item.toLowerCase()}>{item}</option>
                    )})}
            </select>
            </div>
       </div>
    );
}

export default SelectMenu;