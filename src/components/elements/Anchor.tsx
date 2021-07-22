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
        <a {...props} href={href} rel="noopener noreferrer" target="_blank">
            {props.children}
        </a>
    );
}

export default Anchor;