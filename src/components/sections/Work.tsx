/**
 * File: Work.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react'
import CareerItem from '../elements/CareerItem';
import Section from '../elements/Section';

const Work : FC = () =>
{
    
    return (
        <Section id="work" title="Work Experience">
            <div className="careers_wrapper">
                <CareerItem career_id="fd" 
                            career_title="Research Assistant" 
                            career_organization="Carnegie Mellon University" 
                            career_organizationURL="www.cmu.edu"
                            career_city='Doha' 
                            career_country='Qatar'
                            career_description={`Workd on some stuff\nAndmore stuff`} 
                            career_startDate={new Date(Date.now())} 
                            career_endDate={new Date(Date.now())}
                            career_isCurrent={true}
                            />
                <CareerItem career_id="fd2" 
                            career_title="Course Assistant" 
                            career_subtitle="15-122: Principles of Imperative Computation" 
                            career_organization="Carnegie Mellon University" 
                            career_organizationURL="www.cmu.edu"
                            career_city='Doha' 
                            career_country='Qatar'
                            career_description={`* Workd on some stuff\n\n* Andmore stuff`} 
                            career_startDate={new Date(Date.now())} 
                            career_endDate={new Date(Date.now())}
                            career_isCurrent={true}
                            />
            </div>
        </Section>
    );
}

export default Work;