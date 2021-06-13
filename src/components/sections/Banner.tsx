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
     * If the banner_info document exists, then update the banner state 
     * and store the information in the cache
     * 
     * Only store information in cache if the information retrieved from the
     * datavase is defined.
     */
    useEffect(() => 
    {
        dispatch(getBannerData(() => {console.log("Error getting banner data")}));
    }, []);

    useEffect(() => 
    {
        setBanner(BannerData);
        return () =>
        {
            setBanner(BannerData);
        }
    }, [BannerData]);
    
    return (
       <section id="banner">
           <div className="banner_wrapper">
                <h2 className="pre">{banner.banner_prefix}</h2>
                <h1 className="my_name">{banner.banner_name}</h1>
                <h1 className="my_title">{banner.banner_title}</h1>
                <div className="banner_buttons">
                    <Button type="button" text={resume_btn} onClick={() => window.open(banner.banner_resume_url, "_blank", "noopener noreferrer")} />
                    <Button type="button" className="secondary" text={contact_btn}/>
                    <ThemeSwitcher />
                </div>
           </div>
       </section>
    );
}

export default Banner