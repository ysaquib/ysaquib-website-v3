/**
 * File: ProjectCard.tsx
 * Author: Yusuf Saquib
 */

import React, {FC} from 'react';
import { ProjectData } from '../../store/types/dataTypes';
import { IconArticle, IconGithub, IconLaunch } from './Icons';

interface CardProps extends ProjectData
{
    className?: string;
    order: number;
}

const ProjectCard : FC<CardProps> = ({children, className, order, ...projectData}) => 
{
    const featured_order : number = 0;
    console.log(order);
    /**
     * Create the "Featured Project" tag that will only be applied to the 
     * featured project (any project with the 'featured' className)
     */
    const featured_tag: JSX.Element = order === featured_order ? (
        <div className="featured_tag">
            <h3 className="label">Featured Project</h3>
        </div>) : (<></>);

    const wip_tag: JSX.Element = projectData.project_inProgress ? (
        <div className="wip_tag">
            <h3 className="label">In Progress</h3>
        </div>) : (<></>);


    const wip_bar: JSX.Element = projectData.project_inProgress ? (
        <div className="wip_bar_wrapper">
        <label className="wip_label">Progress: {projectData.project_progress}%</label>
        <div className="wip_bar">
            <div className="wip_progress" style={{width: `${projectData.project_progress}%`}} />
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
            case featured_order+1:
            case featured_order+2:
                return "large";
            default:
                return "";
        }
    }
    
    return (
        <div id={`js-${order}`} className={`project_card_wrapper ${getClassName(order)} ${projectData.project_inProgress ? "wip" : ""} ${className ?? ""}`}>
            <div className="project_card">
                
                <h1 className="project_title">
                    {projectData.project_title}
                </h1>
                <div className="project_links">
                    {featured_tag}
                    {wip_tag}
                    <ul className="links_list">
                        {projectData.project_blog && <li className="links_item svg_icon" title="Read More">{IconArticle}</li>}
                        {projectData.project_github && <li className="links_item svg_icon" title="View Github Repo">{IconGithub}</li>}
                        {projectData.project_url && <li className="links_item svg_icon" title="View Demo">{IconLaunch}</li>}
                    </ul>
                </div>
                <p className="project_description">
                    {projectData.project_description}
                </p>
                <ul className="project_languages">
                    {(projectData.project_tags?.split(","))?.map(tag => {return(<li key={tag.trim()}>{tag.trim()}</li>);})}
                </ul>
                {wip_bar}
            </div>
        </div>
    );
}

export default ProjectCard;