/**
 * File: Projects.tsx
 * Author: Yusuf Saquib
 * 
 * : Creates a Project Card for each project based on project data.
 */

import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { getProjectData } from '../../store/actions/dataActions';
import { ProjectData } from '../../store/types/dataTypes';
import Button from '../elements/Button';
import LoadingSkeleton from '../elements/LoadingSkeleton';
import ProjectCard from '../elements/ProjectCard';
import Section from '../elements/Section';
import Head from '../layout/Head';

interface ProjectsProps
{
    sectionTitle?: string;
    showAllProjects?: boolean;
    projectsLimit?: number;
    id: string;
}

const Projects : FC<ProjectsProps> = ({showAllProjects=false, id, sectionTitle="My Projects", projectsLimit=6}) =>
{
    const dispatch = useDispatch();
    const {allProjects, isLoadingProjects} = useSelector((state: RootState) => state.projects);
    const [projects, setProjects] = useState<ProjectData[]>(allProjects);
    const [errorMsg, setErrorMsg] = useState<string>("");

    /**
     * Get all projects from database.
     */
    useEffect(() => 
    {
        dispatch(getProjectData(undefined, () => {setErrorMsg("Error retrieving project data");}));
    }, [dispatch]);
    
    /**
     * Calculate how many projects to show based on props.
     */
    useEffect(() => 
    {
        const visibleProjects = allProjects.filter((project) => {return !(project.project_isHidden) ?? true});
        if(!showAllProjects && projectsLimit < visibleProjects.length)
        {
            setProjects(visibleProjects.slice(0, projectsLimit));
        }
        else
        {
            setProjects(visibleProjects);
        }
        
        return () =>
        {
            setProjects([]);
        }
    }, [allProjects, projectsLimit, showAllProjects]);

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    

    /**
     * If the projects are currently being loaded, make sure it is known.
     */
    if(isLoadingProjects)
    {
        return(
            <Section title={sectionTitle} id={id} className="projects">
                <div className="projects_wrapper">
                    <LoadingSkeleton type="rectangle" className="loading_card featured_project" />
                    <LoadingSkeleton type="rectangle" className="loading_card large_project" />
                    <LoadingSkeleton type="rectangle" className="loading_card large_project" />
                    <LoadingSkeleton type="rectangle" className="loading_card" />
                    <LoadingSkeleton type="rectangle" className="loading_card" />
                    <LoadingSkeleton type="rectangle" className="loading_card" />
                </div>
            </Section>
        )
    }
    /**
     * Handle error in case failed to get projects or there are no projects.
     */
    else if (projects && projects.length === 0)
    {
        return (
            <Section title={sectionTitle} id={id} className="projects">
                <div className="projects_wrapper">
                    <div id={`js-none`} className={`project_card_wrapper error`}>
                        No projects to show. {errorMsg}
                    </div>
                </div>
            </Section>
        );
    }
    return (
        <Section title={sectionTitle} id={id} className="projects">
            <div className="projects_wrapper">
                {projects && 
                projects.map((project : ProjectData, index) => (
                    <ProjectCard key={project.project_id} order={index} {...project} />
                ))}
            </div>

            { showAllProjects && 
                <Head title="All Projects" />
            }

            { !showAllProjects &&
                <div className="projects_button">
                    <Link to="/projects"><Button text="See All Projects" onClick={() => window.scrollTo(0,0)}/></Link>
                </div>
            }
        </Section>
    );
}

export default Projects