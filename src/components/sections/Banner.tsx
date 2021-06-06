/**
 * File: Banner.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import { firebase } from '../../firebase/config';
import Button from '../elements/Button'
import ThemeSwitcher from '../elements/ThemeSwitcher'

let default_data = require('../../default_data.json');

type InitialData =
{
    name : string;
    title : string;
    prefix : string;
    resume : string;
    resume_btn : string;
    contact_btn : string;
}

const Banner : FC = () =>
{

    const [banner, setBanner] = useState<any>([]);

    /**
     * Get the banner information from the cache if it exists. Otherwise 
     * resort to default values for each field.
     */
    const init : InitialData =
    {
        name : localStorage.getItem("banner_name") || default_data.banner.name,
        title : localStorage.getItem("banner_title") || default_data.banner.title,
        prefix : localStorage.getItem("banner_prefix") || default_data.banner.prefix,
        resume : localStorage.getItem("banner_resume_url") || default_data.banner.resume,
        resume_btn : localStorage.getItem("banner_resume_btn") || default_data.banner.resume_btn,
        contact_btn : localStorage.getItem("banner_contact_btn") || default_data.banner.contact_btn,
    };
    
    /**
     * Get the banner information from the database.
     * If the banner_info document exists, then update the banner state 
     * and store the information in the cache
     * 
     * Only store information in cache if the information retrieved from the
     * datavase is defined.
     */
    useEffect(() => {
        function setIfDefined(key: string, value: string)
        {
            if (value !== undefined)
                localStorage.setItem(key, value);
            else
                localStorage.removeItem(key);
        }
        const banner_info = firebase.firestore().collection("basic_info").doc("banner_info");
        banner_info.get().then((doc) => {
            if (doc.exists)
            {
                setBanner(doc.data());
                setIfDefined("banner_name", doc.get("name"));
                setIfDefined("banner_title", doc.get("title"));
                setIfDefined("banner_prefix", doc.get("prefix"));
                setIfDefined("banner_resume_url", doc.get("resume_url"));
                setIfDefined("banner_resume_btn", doc.get("resume_btn"));
                setIfDefined("banner_contact_btn", doc.get("contact_btn"));
            }
            else
            {
                console.log("Document does not exist");
            }
        }).catch((error) => {
            console.log("Error retrieving data %s", error);
        });
    }, []);
    

    return (
       <section id="banner">
           <div className="banner_wrapper">
                <h2 className="pre">{banner.prefix || init.prefix}</h2>
                <h1 className="my_name">{banner.name || init.name}</h1>
                <h1 className="my_title">{banner.title || init.title}</h1>
                <div className="banner_buttons">
                    <Button type="button" className="resume" text={init.resume_btn}/>
                    <Button type="button" className="contact" text={init.contact_btn}/>
                    <ThemeSwitcher />
                </div>
           </div>
       </section>
    );
}

export default Banner