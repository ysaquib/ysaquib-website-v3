/**
 * File: Banner.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BannerData } from '../../store/types/dataTypes';
import { getBannerData } from '../../store/actions/dataActions';
import Button from '../elements/Button'
import ThemeSwitcher from '../elements/ThemeSwitcher'
import resume from "../../documents/resume.pdf";

let default_data = require('../../default_data.json');


const Banner : FC = () =>
{
    const BannerData = useSelector((state: RootState) => state.banner);
    const dispatch = useDispatch();
    
    const [banner, setBanner] = useState<BannerData>(BannerData);

    const resume_btn = default_data.banner.banner_resume_btn;
    const contact_btn = default_data.banner.banner_contact_btn;
    
    /**
     * Get the banner information from the database.
     */
    useEffect(() => 
    {
        dispatch(getBannerData(() => {console.log("Error getting banner data")}));
    }, [dispatch]);

    useEffect(() => 
    {
        setBanner(BannerData);
        return () =>
        {
            setBanner(BannerData);
        }
    }, [BannerData]);

    /**
     * Scrolls contact section into view smoothly.
     */
    const handleContact = () => 
    {
        const contact_section = document.getElementById("contact");
        if (contact_section)
        {
            const scroll_location = contact_section.getBoundingClientRect().top - 40;
            window.scrollTo({top: scroll_location, behavior: "smooth"});
        }
    }
    
    return (
       <section id="banner">
           <div className="banner_wrapper">
                <h2 className="pre">{banner.banner_prefix}</h2>
                <h1 className="my_name">{banner.banner_name}</h1>
                <h1 className="my_title">{banner.banner_title}</h1>
                <div className="banner_buttons">
                    <Button type="button" text={resume_btn} onClick={() => window.open(resume, "_blank", "noopener noreferrer")} />
                    <Button type="button" className="secondary" text={contact_btn} onClick={handleContact}/>
                    <ThemeSwitcher />
                </div>
           </div>
       </section>
    );
}

export default Banner