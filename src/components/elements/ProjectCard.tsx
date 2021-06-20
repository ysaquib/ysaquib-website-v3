/**
 * File: ProjectCard.tsx
 * Author: Yusuf Saquib
 */

import React, {FC} from 'react';

interface CardProps
{
    title: string;
    order: number;
    className?: string;
    tags?: string;
    children?: string;
    
    image?: string;
    github?: string;
    url?: string;
    
    inProgress?: boolean;
    progress?: number;
}

const ProjectCard : FC<CardProps> = ({children, title, className, image, github, url, tags, order, progress=100, inProgress=false}) => 
{
    const featured_order : number = 0;
    /**
     * Create the "Featured Project" tag that will only be applied to the 
     * featured project (any project with the 'featured' className)
     */
    const featured_tag: JSX.Element = order === featured_order ? (
        <div className="featured_tag">
            <h3 className="label">Featured Project</h3>
        </div>) : (<></>);

    const wip_tag: JSX.Element = inProgress ? (
        <div className="wip_tag">
            <h3 className="label">In Progress</h3>
        </div>) : (<></>);


    const wip_bar: JSX.Element = inProgress ? (
        <div className="wip_bar_wrapper">
        <label className="wip_label">Progress: {progress}%</label>
        <div className="wip_bar">
            <div className="wip_progress" style={{width: `${progress}%`}} />
        </div>
        </div>
        ) : (<></>);

    /**
     * Given an order number, return the respective className.
     * This is to ensure that the project with order 1 is always featured,
     * projects with orders 2 and 3 are large, and everything else is small.
     */
    function getClassName(order : number)
    {
        switch (order)
        {
            case featured_order:
                return "featured";
            // case 2:
            // case 3:
            default:
                return "large";
                //return "";
        }
    }
    
    return (
        <div className={`project_card_wrapper ${getClassName(order)} ${inProgress ? "wip" : ""} ${className ?? ""}`}>
            <div className="project_card">
                
                <h1 className="project_title">
                    {title}
                </h1>
                <div className="project_links">
                    {featured_tag}
                    {wip_tag}
                    <ul className="links_list">
                        <li className="links_item">Read More</li>
                        <li className="links_item">Open Demo</li>
                        <li className="links_item">View Code </li>
                    </ul>
                </div>
                <p className="project_description">
                    {children}
                </p>
                <ul className="project_languages">
                    {(tags?.split(","))?.map(tag => {return(<li key={tag.trim()}>{tag.trim()}</li>);})}
                </ul>
                {wip_bar}
            </div>
        </div>
    );
}

export default ProjectCard;