import React, { FC } from 'react'
import Section from '../modules/Section';

const Projects : FC = () =>
{
    return (
       <Section title="My Projects" id="projects">
           <div className="projects_wrapper"></div>
       </Section>
    );
}

export default Projects