/**
 * File: Banner.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from '../../firebase/config';
import { RootState } from '../../store';
import { getBannerData } from '../../store/actions/dataActions';
import Button from '../elements/Button'
import TextField from '../elements/TextField';
import ThemeSwitcher from '../elements/ThemeSwitcher'

let default_data = require('../../default_data.json');

type InitialData =
{
    name : string;
    title : string;
    prefix : string;
    resume_url : string;
}


const Banner : FC = () =>
{
    const BannerData = useSelector((state: RootState) => state.banner);
    const dispatch = useDispatch();

    // console.log("STATE", name, prefix, title, resume_url);

    const [banner, setBanner] = useState<any>(BannerData);

    const resume_btn = default_data.banner.resume_btn;
    const contact_btn = default_data.banner.contact_btn;


    
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
            setBanner([]);
        }
    }, [BannerData]);
    
    return (
       <section id="banner">
           <div className="banner_wrapper">
                <h2 className="pre">{banner.prefix}</h2>
                <h1 className="my_name">{banner.name}</h1>
                <h1 className="my_title">{banner.title}</h1>
                <div className="banner_buttons">
                    <Button type="button" text={resume_btn}/>
                    <Button type="button" className="secondary" text={contact_btn}/>
                    <ThemeSwitcher />
                </div>
           </div>
       </section>
    );
}

export default Banner