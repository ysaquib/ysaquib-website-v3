/**
 * File: About.tsx
 * Author: Yusuf Saquib
 */

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
    const [about, setAbout] = useState<AboutData>(AboutData)
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    
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
           </div>
       </Section>
    );
}

export default About