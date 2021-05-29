import React, {FC} from 'react';

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