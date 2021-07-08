/**
 * File: ProjectCard.tsx
 * Author: Yusuf Saquib
 */

import React, {FC} from 'react';
import { useHistory } from 'react-router-dom';
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
    const history = useHistory();

    const currentURL = new URL(window.location.href);
    const blogURL = new URL(projectData.project_blog && projectData.project_blog !== "" ? projectData.project_blog : "https://www.yusufsaquib.com/");
    const isOriginSame = blogURL.origin === currentURL.origin;

    /**
     * Create the "Featured Project" tag that will only be applied to the 
     * featured project (any project with the 'featured' className)
     */
    const featured_tag: JSX.Element = order === featured_order ? (
        <p className="project_tag featured_tag">
            Featured Project
        </p>) : (<></>);

    const wip_tag: JSX.Element = projectData.project_inProgress ? (
        <p className="project_tag wip_tag">
            In Progress
        </p>) : (<></>);

    const date_tag: JSX.Element = (
        <p className="project_tag date_tag">
            {projectData.project_createdAt.toLocaleDateString(undefined, {month: "short", year: "numeric"})}
        </p>
    );


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
                return "featured_project";
            case featured_order+1:
            case featured_order+2:
                return "large_project";
            default:
                return "";
        }
    }
    
    return (
        <div id={`js-${order}`} className={`project_card_wrapper ${getClassName(order)} ${projectData.project_inProgress ? "wip_project" : ""} ${className ?? ""}`}>
            <div className="project_card">
                
                <h1 className={`project_title ${getClassName(order)}_text`}>
                    {projectData.project_title}
                </h1>
                <div className="project_links">
                    {date_tag}
                    {featured_tag}
                    {wip_tag}
                    <ul className="links_list">
                        {projectData.project_blog && <li className="links_item svg_icon" key="blog" title="Read More" onClick={() => isOriginSame ? history.push(blogURL.pathname) : window.open(projectData.project_blog, "_blank", "noopener noreferrer")}>{IconArticle}</li>}
                        {projectData.project_github && <li className="links_item svg_icon" key="github" title="View Github Repo" onClick={()=>window.open(projectData.project_github, "_blank", "noopener noreferrer")}>{IconGithub}</li>}
                        {projectData.project_url && <li className="links_item svg_icon" key="demo" title="View Demo" onClick={()=>window.open(projectData.project_url, "_blank", "noopener noreferrer")}>{IconLaunch}</li>}
                    </ul>
                </div>
                <p className={`project_description ${getClassName(order)}_text`}>
                    {projectData.project_description}
                </p>
                <ul className={`project_languages ${getClassName(order)}_text`}>
                    {(projectData.project_tags?.split(","))?.map((tag, index) => {return(<li key={`${tag.trim()}_${index}`}>{tag.trim()}</li>);})}
                </ul>
                {wip_bar}
            </div>
        </div>
    );
}

export default ProjectCard;