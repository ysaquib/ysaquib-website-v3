/**
 * File: Projects.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getProjectData } from '../../store/actions/dataActions';
import { ProjectData } from '../../store/types/dataTypes';
import Button from '../elements/Button';
import LoadingSkeleton from '../elements/LoadingSkeleton';
import ProjectCard from '../elements/ProjectCard';
import Section from '../elements/Section';

const Projects : FC = () =>
{
    const [isLoading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const ProjectsData = useSelector((state: RootState) => state.projects);
    const [projects, setProjects] = useState<ProjectData[]>(ProjectsData);

    useEffect(() => 
    {
        dispatch(getProjectData(() => {setLoading(false)}, () => {console.log("Error getting about data")}));
    }, [dispatch]);
    
    useEffect(() => 
    {
        setProjects(ProjectsData);
        
        return () =>
        {
            setProjects([]);
        }
    }, [ProjectsData]);

    

    /**
     * If the projects are currently being loaded, make sure it is known.
     */
    if(isLoading)
    {
        return(
            <Section title="My Projects" id="projects">
                <div className="projects_wrapper">
                    <LoadingSkeleton type="rectangle" className="loading_card featured" />
                    <LoadingSkeleton type="rectangle" className="loading_card large" />
                    <LoadingSkeleton type="rectangle" className="loading_card large" />
                    <LoadingSkeleton type="rectangle" className="loading_card" />
                    <LoadingSkeleton type="rectangle" className="loading_card" />
                    <LoadingSkeleton type="rectangle" className="loading_card" />
                </div>
            </Section>
        )
    }
    return (
        <Section title="My Projects" id="projects">
            <div className="projects_wrapper">
                {projects && 
                (projects
                    .filter((project) => {return !(project.project_isHidden) ?? true}))
                    .map((project : ProjectData) => (
                    <ProjectCard key={project.project_order} {...project} />
                ))}
            </div>

            <div className="projects_button">
                <Button text="See All Projects"/>
            </div>
        </Section>
    );
}

export default Projects