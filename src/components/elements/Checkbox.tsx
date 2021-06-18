/**
 * File: CheckBox.tsx
 * Author: Yusuf Saquib
 */
import React, { FC, InputHTMLAttributes, useEffect, useState } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';


/**
 * Extend the InputHTMLAttributes Class to inherit regular input properties
 * but also add our own custom properties
 */
interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> 
{
    name: string;
    label: string;
    register: UseFormRegister<any>;
    registration: RegisterOptions;
    isChecked?: boolean;   
}

const CheckBox: FC<CheckBoxProps> = ({ isChecked, label, name, className, disabled, register, required, registration, ...props }) => 
{
    /**
     * Use a state for the checked status of the checkbox. Fairly standard.
     * UseEffect adds or removes a 'checked' class on the label associated 
     * with the checkbox.
     */
    const [checked, setChecked] = useState(false);
    
    useEffect(() => {
        if (checked)
        {
            document.getElementById(name)?.classList.add("checked");
        }
        else
        {
            document.getElementById(name)?.classList.remove("checked");
        }
    }, [checked, name])
    
    return (
       <div className={`input_wrapper checkbox_wrapper ${className ? className : ""}`}>
            <input {...props} type="checkbox" {...register(name, registration)}
                name={name}
                id={`${name}_input`}
                disabled={disabled}
                defaultChecked={checked}
                onClick={() => setChecked(!checked)}
                onChange={props?.onChange} />
            <label id={name} htmlFor={name} className={`checkbox_label ${disabled ? "disabled" : ""}`}>{label}</label>
       </div>
    );
}

export default CheckBox;