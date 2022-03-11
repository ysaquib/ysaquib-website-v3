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
                            career_title="Security Researcher" 
                            career_organization="Carnegie Mellon University" 
                            career_organizationURL="www.cmu.edu"
                            career_description={`Workd on some stuff\nAndmore stuff`} 
                            career_startDate={new Date(Date.now())} 
                            career_endDate={new Date(Date.now())}
                            career_blog="https://www.google.com" 
                            career_isCurrent={true}
                            career_type="work"
                            />
                <CareerItem career_id="fd2" 
                            career_title="Course Assistant" 
                            career_subtitle="15-122: Principles of Imperative Computation" 
                            career_organization="Carnegie Mellon University" 
                            career_organizationURL="www.cmu.edu"
                            career_location='Doha' 
                            career_description={`Workd on some stuff\n\nAndmore stuff\nI did some stuff here\nI did quire a lot of stuff\nmore stuff here and here\ni dont even know anymore\nDid dkslafjdj dsakfj kdsaj fdjsal fkds ajfdj sakfk sda fkdlsjak lds alkfdjsa;l fd sa fkdlsa lfd;sa fdsa fld;jsa klfd sak; fds afklds;a fdlska fldsjka jkj`} 
                            career_startDate={new Date(Date.now())} 
                            career_endDate={new Date(Date.now())}
                            career_isCurrent={false}
                            career_type="work"
                            />
                <CareerItem career_id="fd3" 
                            career_title="Intern" 
                            career_subtitle="Software Engineering" 
                            career_organization="Biomotivate" 
                            career_organizationURL="blogs"
                            career_location='Doha' 
                            career_description={`Workd on some stuff\n\nAndmore stuff`} 
                            career_startDate={new Date(Date.now())} 
                            career_endDate={new Date(Date.now())}
                            career_isCurrent={false}
                            career_type="work"
                            />
            </div>
        </Section>
    );
}

export default Work;