/**
 * File: Button.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, ButtonHTMLAttributes, RefObject } from 'react';

/**
 * Extend the ButtonHTMLAttributes Class to inherit regular button properties
 * but also add our own custom propertie: text
 * 
 * The only real use of this is so that there is no need for children.
 */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> 
{
  text: string;
//   ref?: RefObject<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({text, ...props} : ButtonProps) => 
{
    return (
        <button {...props} className={`btn ${props.className}`}>
            {text}
        </button>
    );
}

export default Button;