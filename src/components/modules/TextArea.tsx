/**
 * File: TextField.tsx
 * Author: Yusuf Saquib
 */
 import React, { FC, TextareaHTMLAttributes, useEffect, useState } from 'react';
 import { UseFormRegister } from 'react-hook-form';
 
 
 /**
  * Extend the TextareaHTMLAttributes Class to inherit regular area properties
  * but also add our own custom properties
  * 
  */
 interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> 
 {
     name: string;
     label: string;
     required: boolean;
     register: UseFormRegister<any>;
 }
 
 const TextArea: FC<TextAreaProps> = ({ label, name, className, disabled, register, required, ...props }) => 
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
     }, [showLabel, name]);
 
     return (
        <div className={`input_wrapper ${className ? className : ""}`}>
             <label id={name} htmlFor={name} className="text_label">{label}</label>
             <br />
             <textarea {...props} {...register(label, {required})} 
                 name={name}
                 disabled={disabled} 
                 placeholder={label}
                 onChange={(event) => event.target.value === "" ? setShowLabel(false) : setShowLabel(true)}/>
        </div>
     );
 }
 
 export default TextArea;