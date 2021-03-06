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
    className?: string;
}

const Button: FC<ButtonProps> = ({text, className="", ...props} : ButtonProps) => 
{
    return (
        <button {...props} className={`btn ${className}`}>
            {text}
        </button>
    );
}

export default Button;