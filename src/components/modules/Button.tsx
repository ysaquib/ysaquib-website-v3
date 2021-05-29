import React, { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> 
{
  text: string;
  className?: string;
}

const Button: FC<ButtonProps> = ({ text, className, onClick, type, disabled }) => 
{
    return (
        <button type={type} className={`btn ${className}`} onClick={onClick} disabled={disabled}>
            {/* <div> */}
            {text}
            {/* </div> */}
        </button>
    );
}

export default Button;