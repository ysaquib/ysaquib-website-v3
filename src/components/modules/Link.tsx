/**
 * File: Link.tsx
 * Author: Yusuf Saquib
 */

 import React, { FC, AnchorHTMLAttributes } from 'react';

 /**
  * Extend the AnchorHTMLAttributes Class to inherit regular <a> properties
  * but also add our own custom properties and require some.
  * 
  */
 
interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>
{
    url: string;
}

const Link: FC<LinkProps> = ({url, ...props}: LinkProps) => 
{
    function openInNewTab(url : string)
    {
        const newWindow = window.open(url, "_blank", "noopener, noreferrer");
        if (newWindow)
            newWindow.opener = null;
        return;
    }
    return (
        <a {...props} onClick={() => openInNewTab(url)}>
            {props.children}
        </a>
    );
}

export default Link;