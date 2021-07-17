/**
 * File: About.tsx
 * Author: Yusuf Saquib
 */

import Markdown from 'markdown-to-jsx';
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getAboutData } from '../../store/actions/dataActions';
import { AboutData } from '../../store/types/dataTypes';
import Section from '../elements/Section';

const About : FC = () =>
{
    const dispatch = useDispatch();
    const AboutData = useSelector((state: RootState) => state.about);
    const [about, setAbout] = useState<AboutData>(AboutData);

    /**
     * Get About Data from the database
     */
    useEffect(() => 
    {
        dispatch(getAboutData(() => {console.error("Error getting about data")}));
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
                <Markdown className="about_description markdown_content">
                    {about.about_description}
                </Markdown>
           </div>
       </Section>
    );
}

export default About