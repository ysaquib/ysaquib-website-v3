/**
 * File: Anchor.tsx
 * Author: Yusuf Saquib
 */

 import React, { FC, AnchorHTMLAttributes } from 'react';

 /**
  * Extend the AnchorHTMLAttributes Class to inherit regular <a> properties
  * but also add our own custom properties and require some.
  * 
  */
 
interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement>
{
    url: string;
}

const Anchor: FC<AnchorProps> = ({url, ...props}: AnchorProps) => 
{
    /**
     * Only open links in new tab. Requires that a url be passed in
     */
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

export default Anchor;