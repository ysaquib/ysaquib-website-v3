/**
 * File: Projects.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
// import {database} from '../../firebase/config';
import { database } from '../../firebase/config';
import Button from '../modules/Button';
import ProjectCard from '../modules/ProjectCard';
import Section from '../modules/Section';

const Projects : FC = () =>
{
    const [projects, setProjects] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Get each project doc from the projects database in ascending order with
     * repect to the 'order' field.
     * For each document retreived, push the document to an array which will be 
     * used to update the projects state. Each item in the projects state holds
     * a single project with their associated fields.
     * 
     * Todo: Possibly remove realtime features to allow for cache storage
     * Todo: Possibly store a certain number of projects in the cache
     */
    
    useEffect(() => {
        const projectsDB = database.collection("projects").orderBy("order");
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
    }, []);

    /**
     * Given an order number, return the respective className.
     * This is to ensure that the project with order 1 is always featured,
     * projects with orders 2 and 3 are large, and everything else is small.
     */
    function getClassName(order : number)
    {
        switch (order)
        {
            case 1:
                return "featured";
            case 2:
            case 3:
                return "large";
            default:
                return "";
        }
    }
    
    /**
     * If the projects are currently being loaded, make sure it is known.
     */
    if(loading)
    {
        return(
            <Section title="My Projects" id="projects">
            <div className="projects_wrapper">
                <h2 className="projects_loading">Loading...</h2>
            </div>
            </Section>
        )
    }
    return (
       <Section title="My Projects" id="projects">
           <div className="projects_wrapper">
               {projects && projects.map((project : any) => (
                   <ProjectCard className={getClassName(project.order)} key={project.order} title={project.title} languages={project.languages}>
                       {project.description}
                   </ProjectCard>
               ))}
           </div>
           <div className="projects_button">
                <Button className="project" text="See All Projects"/>
           </div>
       </Section>
    );
}

export default Projects