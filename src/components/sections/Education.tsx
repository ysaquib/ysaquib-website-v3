/**
 * File: Education.tsx
 * Author: Yusuf Saquib
 */

import Markdown from 'markdown-to-jsx';
import React, { FC } from 'react'
import Anchor from '../elements/Anchor';
import CareerItem from '../elements/CareerItem';
import Section from '../elements/Section';

const Education : FC = () =>
{
    
    return (
        <Section id="education" title="Education">
            <div className="careers_wrapper">
                <CareerItem career_id="fdd" 
                            career_title="B.Sc. Computer Science" 
                            career_organization="Carnegie Mellon University" 
                            //    career_organizationURL="www.cmu.edu"
                            career_location='Doha' 
                            //    career_description={`Workd on some stuff\nAndmore stuff`} 
                            career_startDate={new Date(Date.now())} 
                            career_endDate={new Date(Date.now())}
                            career_isCurrent={true}
                            career_type="education"
                            />
                <CareerItem career_id="fd2d" 
                            career_title="M.Sc. Computer Science" 
                            career_organization="Carnegie Mellon University" 
                            //    career_organizationURL="www.cmu.edu"
                            career_location='Pittsburgh' 
                            //    career_description={`Workd on some stuff\nAndmore stuff`} 
                            career_startDate={new Date(Date.now())} 
                            career_endDate={new Date(Date.now())}
                            career_isCurrent={false}
                            career_type="education"
                            />
            </div>
        </Section>
    );
}

export default Education;