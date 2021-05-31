/**
 * File: Section.tsx
 * Author: Yusuf Saquib
 */

import React, {FC} from 'react';

/**
 * Creates a Function Component with the following interface to create a
 * section with a title in it, and accepts className and id for the section.
 */

interface SectionProps
{
    title: string;
    id?: string;
    className?: string;
}

const Section : FC<SectionProps> = ({children, title, id, className}) => 
{
    return (
        <section id={id} className={className}>
            <h1 className="sec_title">{title}</h1>
            {children}
        </section>
    );
}

export default Section;