/**
 * File: Projects.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
    const history = useHistory();
    const {allProjects, isLoadingProjects} = useSelector((state: RootState) => state.projects);
    const [projects, setProjects] = useState<ProjectData[]>(allProjects);

    useEffect(() => 
    {
        dispatch(getProjectData(undefined, () => {console.log("Error getting about data")}));
    }, [dispatch]);
    
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
                    <Button text="See All Projects" onClick={() => history.push("/projects")}/>
                </div>
            }
        </Section>
    );
}

export default Projects