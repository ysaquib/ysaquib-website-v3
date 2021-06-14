/**
 * File: Projects.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import { firebase } from '../../firebase/config';
import Button from '../elements/Button';
import LoadingSkeleton from '../elements/LoadingSkeleton';
import ProjectCard from '../elements/ProjectCard';
import Section from '../elements/Section';

const Projects : FC = () =>
{
    const [isLoading, setLoading] = useState<boolean>(false);
    const [projects, setProjects] = useState<any>([]);

    /**
     * Get each project doc from the projects database in ascending order with
     * repect to the 'order' field.
     * For each document retreived, push the document to an array which will be 
     * used to update the projects state. Each item in the projects state holds
     * a single project with their associated fields.
     * 
     * Todo: Possibly store a certain number of projects in the cache
     */
    
    useEffect(() => {
        const projectsDB = firebase.firestore().collection("projects").orderBy("order");
        setLoading(true);
        /**
         * Using .get() on a database will get the data on page load.
         * Using .onSnapshot() on a database will get data in real time.
         */
        // projectsDB.onSnapshot((querySnapshot) =>
        projectsDB.get().then((querySnapshot) => 
        {
            const items : any = [];
            querySnapshot.forEach((doc) => 
            {
                items.push(doc.data());
            });
            setProjects(items);
            setLoading(false);
        });
        return () =>
        {
            setProjects([]);
        }
    }, []);

    

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
                {projects && projects.map((project : any) => (
                    <ProjectCard key={project.order}
                                 order={project.order}
                                 title={project.title}
                                 languages={project.languages}
                                 inProgress={true}>
                        {project.description}
                    </ProjectCard>
                ))}
            </div>

            <div className="projects_button">
                <Button text="See All Projects"/>
            </div>
        </Section>
    );
}

export default Projects