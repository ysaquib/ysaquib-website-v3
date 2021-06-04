/**
 * File: Button.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, ButtonHTMLAttributes } from 'react';

/**
 * Extend the ButtonHTMLAttributes Class to inherit regular button properties
 * but also add our own custom propertie: text
 * 
 * The only real use of this is so that there is no need for children.
 */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> 
{
  text: string;
}

const Button: FC<ButtonProps> = (props : ButtonProps) => 
{
    return (
        <button {...props} type={props.type} className={`btn ${props.className}`} onClick={props.onClick} disabled={props.disabled} >
            {props.text}
        </button>
    );
}

export default Button;