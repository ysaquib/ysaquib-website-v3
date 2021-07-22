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

    const scrollToElement = () =>
    {
        if (href)
        {
            const element = document.getElementById(href.replace("#", ""));
            const scroll_location = element ? element.offsetTop - 60 : 0;
            window.scrollTo({top: scroll_location, behavior: "smooth"});
        }
        else
        {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
    }

    if (href && href.startsWith("#"))
    {
        
        
        return (
            <a {...props} onClick={scrollToElement}>
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