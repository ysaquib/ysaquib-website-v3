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
           <CareerItem career_id="fd" career_title="Software Engineer" career_location="Apple" career_locationURL="www.apple.com" career_description={`Workd on some stuff\nAndmore stuff`} career_startDate={new Date(Date.now())} career_endDate={new Date(Date.now())}/>
       </Section>
    );
}

export default Work;