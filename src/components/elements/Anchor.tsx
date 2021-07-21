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
 
const Anchor: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({href, ...props}) => 
{
    /**
     * Only open links in new tab. Requires that a url be passed in
     */
    function openInNewTab(href : string)
    {
        const newWindow = window.open(href, "_blank", "noopener, noreferrer");
        if (newWindow)
            newWindow.opener = null;
        return;
    }

    function scrollToElement(scroll_location: number)
    {
        window.scrollTo({top: scroll_location, behavior: "smooth"});
    }

    if (href && href.startsWith("#"))
    {
        const element = document.getElementById(href.replace("#", ""));
        const scroll_location = element ? element.getBoundingClientRect().top - 60 : 0;
        
        return (
            <a {...props} onClick={() => {element && scrollToElement(scroll_location)}}>
                {props.children}
            </a>
        );
    }


    return (
        <a {...props} title={`Link${href && ` to ${href}`}`} onClick={() => {href && openInNewTab(href)}}>
            {props.children}
        </a>
    );
}

export default Anchor;