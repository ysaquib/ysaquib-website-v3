import React, { FC, useEffect, useState } from 'react'
// import {database} from '../../firebase/config';
import Firebase from '../../firebase/config';
import Button from '../modules/Button';
import ProjectCard from '../modules/ProjectCard';
import Section from '../modules/Section';

const Projects : FC = () =>
{
    const [projects, setProjects] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    
    useEffect(() => {
        const projectsDB = Firebase.firestore().collection("projects");
        setLoading(true);
        projectsDB.onSnapshot((querySnapshot) => 
        {
            const items : any = [];
            querySnapshot.forEach((doc) => 
            {
                items.push(doc.data());
            });
            items.sort(
                (a : any, b : any) =>
                {
                    if (b.featured && !(a.featured))
                        return 1;
                    else
                        return -1;
                }
            );
            setProjects(items);
            console.log(items);
            setLoading(false);
        });
    }, []);
    
    return (
       <Section title="My Projects" id="projects">
           <div className="projects_wrapper">
               {projects && projects.map((project : any) => (
                   <ProjectCard className={project.featured ? "featured" : ""} key={project.id} title={project.title}>
                       {project.description}
                   </ProjectCard>
               ))}
                <ProjectCard className="featured" title="Digital Canvas">
                    this is a brief description of the project that I have created and I can keep talking
                    about stuff that I have done in my life because this is super super super cool and 
                    this is just utter nonsense now. However I do in fact oviously clearly know what I am 
                    talking about haha.
                </ProjectCard>
                <ProjectCard className="large" title="Clock Timer">Test</ProjectCard>
                <ProjectCard className="large" title="Clock Timer2">Test</ProjectCard>
                <ProjectCard title="Clock Timer3">Test</ProjectCard>
           </div>
           <div className="projects_button">
                <Button className="big" text="See All Projects"/>
           </div>
       </Section>
    );
}

export default Projects