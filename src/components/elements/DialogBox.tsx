/**
 * File: DialogBox.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useState } from 'react';
import Button from './Button';

interface DialogProps
{
    onConfirm?: () => void;
    onReject?: () => void;
    onClose?: () => void;
    onWarning?: () => void;

    title: string;

    message?: string;
    messageWarning?: string;
    messageError?: string;
    messageSuccess?: string;

    optionReject?: string;
    optionWarning?: string;
    optionConfirm?: string;
    optionClose?: string;

    className?: string;
    overlay?: boolean;
}

const DialogBox: FC<DialogProps> = ({overlay=true, className="", ...props}) => 
{
    const [isLoading, setLoading] = useState(false);

    return (
        <div id="overlay" className={`background ${overlay ? "overlay" : ""}`}>

            <div className={`dialog_box ${className}`}>
                <h3 className="dialog_box_title">{props.title}</h3>
                <p className="dialog_box_message">
                    {props.message}
                </p>

                {props.messageWarning && 
                <p className="dialog_box_message warning">
                {props.messageWarning}
                </p>}

                {props.messageError && 
                <p className="dialog_box_message error">
                {props.messageError}
                </p>}

                {props.messageSuccess && 
                <p className="dialog_box_message success">
                {props.messageSuccess}
                </p>}

                <div className="dialog_box_buttons">
                    
                    {props.optionClose && 
                    <Button text={props.optionClose} disabled={isLoading} className="neutral" onClick={()=>{setLoading(true); props.onClose && props.onClose();}}/>}

                    {props.optionReject && 
                    <Button text={props.optionReject} disabled={isLoading} className="reject" onClick={()=>{setLoading(true); props.onReject && props.onReject();}}/>}
                    
                    {props.optionWarning && 
                    <Button text={props.optionWarning} disabled={isLoading} className="warning" onClick={()=>{setLoading(true); props.onWarning && props.onWarning();}}/>}
                    
                    {props.optionConfirm && 
                    <Button text={props.optionConfirm} disabled={isLoading} className="confirm" onClick={()=>{setLoading(true); props.onConfirm && props.onConfirm();}}/>}
                    
                
                </div>

            </div>
        </div>
    );
}

export default DialogBox;