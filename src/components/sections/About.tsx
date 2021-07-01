/**
 * File: About.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getAboutData } from '../../store/actions/dataActions';
import { AboutData } from '../../store/types/dataTypes';
import { IconBugcrowd, IconGithubFilled, IconLinkedInBoxFilled, IconMail, IconStackOverflow } from '../elements/Icons';
import Section from '../elements/Section';

const About : FC = () =>
{
    const dispatch = useDispatch();
    const AboutData = useSelector((state: RootState) => state.about);
    const [about, setAbout] = useState<AboutData>(AboutData);

    const getIcon = (title: string) : JSX.Element => 
    {
        switch(title)
        {
            case "Email":
                return IconMail;
            case "GitHub":
                return IconGithubFilled;
            case "LinkedIn":
                return IconLinkedInBoxFilled;
            case "StackOverflow":
                return IconStackOverflow;
            case "BugCrowd":
                return IconBugcrowd;
            default:
                return <></>;
        }
    }

    useEffect(() => 
    {
        dispatch(getAboutData(() => {console.log("Error getting about data")}));
    }, [dispatch]);

    useEffect(() => 
    {
        setAbout(AboutData);
        return () =>
        {
            setAbout(AboutData);
        }
    }, [AboutData]);
    
    return (
       <Section id="about" className="mini" title={about.about_title}>
           <div className="about_wrapper">
               <p className="about_description">
               {about.about_description}
               </p>
               <h3 className="sec_subtitle">See more of my work</h3>
               <ul className="about_links">
                   {
                       about.about_links && about.about_links.map((value, index) => 
                       {
                           const [title, link] = value.split(",");
                           return (
                               <li key={`link_${title.trim()}`} className="about_links_item"><a href={link.trim()} title={title.trim()} ><span className="svg_icon">{getIcon(title.trim())}</span></a></li>
                           )
                       }
                       )
                   }
               </ul>
           </div>
       </Section>
    );
}

export default About