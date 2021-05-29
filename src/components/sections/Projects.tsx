import React, { FC } from 'react'
import Button from '../modules/Button';
import ProjectCard from '../modules/ProjectCard';
import Section from '../modules/Section';

const Projects : FC = () =>
{
    const langs : string[] = ["Javascript", "React", "NodeJS"];
    return (
       <Section title="My Projects" id="projects">
           <div className="projects_wrapper">
                <ProjectCard className="featured" title="Digital Canvas" languages={langs}>
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