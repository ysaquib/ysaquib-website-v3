import React, {FC} from 'react';

interface SectionProps
{
    title: string;
    id?: string;
}

const Section : FC<SectionProps> = ({children, title, id}) => 
{
    return (
        <section id={id}>
            <h1 className="sec_title">{title}</h1>
            {children}
        </section>
    );
}

export default Section;