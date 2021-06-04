/**
 * File: ProjectCard.tsx
 * Author: Yusuf Saquib
 */

import React, {FC} from 'react';

interface CardProps
{
    className?: string;
    title: string;
    children?: string;
    image?: string;
    github?: string;
    url?: string;
    languages?: string[];
}

const ProjectCard : FC<CardProps> = ({children, title, className, image, github, url, languages}) => 
{
    /**
     * Create the "Featured Project" tag that will only be applied to the 
     * featured project (any project with the 'featured' className)
     */
    var tag: JSX.Element = (
        <div className="featured_tag">
            <h3 className="label">Featured Project</h3>
        </div>);

    if (className !== "featured")
    {
        tag = (<></>);
    }
    
    return (
        <div className={`project_card_wrapper ${className}`}>
            {tag}
            <div className="project_card">
                <h1 className="project_title">
                    {title}
                </h1>
                <p className="project_description">
                    {children}
                </p>
                <ul className="project_languages">
                    {languages?.map(lang => {return(<li key={lang}>{lang}</li>);})}
                </ul>
            </div>
        </div>
    );
}

export default ProjectCard;