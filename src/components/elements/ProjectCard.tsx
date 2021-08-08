/**
 * File: ProjectCard.tsx
 * Author: Yusuf Saquib
 */

import { format } from 'date-fns';
import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import { ProjectData } from '../../store/types/projectTypes';
import Anchor from './Anchor';
import { IconArticle, IconGithub, IconLaunch } from './Icons';

interface CardProps extends ProjectData
{
    className?: string;
    order: number;
}

const ProjectCard : FC<CardProps> = ({children, className, order, ...projectData}) => 
{
    const featured_order : number = 0;

    /**
     * Create the "Featured Project" tag that will only be applied to the 
     * featured project (any project with the 'featured' className)
     */
    const featured_tag: JSX.Element = order === featured_order ? (
        <p className="project_tag featured_tag">
            Featured
        </p>) : (<></>);

    const wip_tag: JSX.Element = projectData.project_inProgress ? (
        <p className="project_tag wip_tag">
            In Progress
        </p>) : (<></>);


    /**
     * Create the date tag depending on the following cases:
     *
     * Case 1: Project is in progress and start year is the current year.
     *         Display Start month - present.
     * Case 2: Project is in progress and start year is not the current year.
     *         Display start month and year - present.
     * Case 3: Start and End are the same. Display Month and Year.
     * Case 4: Start and End month are in the same year. Only display year for
     *         end date. 
     * Case 5: Start and End month are not in the same year. Display
     *         years for both dates. 
     */
    const currentYear = (new Date(Date.now())).getFullYear();
    const isSameYear = projectData.project_startDate.getFullYear() === projectData.project_endDate.getFullYear();
    
    const start = format(projectData.project_startDate, "MMM yyyy");
    const start_month = format(projectData.project_startDate, "MMM");
    const end = format(projectData.project_endDate, "MMM yyyy");

    const projectDate = () =>
    {
        if (projectData.project_inProgress)
        {
            if (projectData.project_startDate.getFullYear() === currentYear)
                return `${start_month} — Present`;
            return `${start} — Present`;
        }
        if (end === start)
            return end;
        else
        {
            if (isSameYear)
                return `${start_month} — ${end}`;
            return `${start} — ${end}`;
        }
        
    }

    const date_tag: JSX.Element = (
        <p className="project_tag date_tag">
            {projectDate()}
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
                        {projectData.project_blog && <Link className="links_item svg_icon" key="blog" title="Read More" to={"/blog/" + projectData.project_blog}>{IconArticle}</Link>}
                        {projectData.project_github && <Anchor className="links_item svg_icon" key="github" title="View Github Repo" href={projectData.project_github}>{IconGithub}</Anchor>}
                        {projectData.project_url && <Anchor className="links_item svg_icon" key="demo" title="View Demo" href={projectData.project_url}>{IconLaunch}</Anchor>}
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