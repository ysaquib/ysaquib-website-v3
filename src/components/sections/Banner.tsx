/**
 * File: Banner.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react'
import { database } from '../../firebase/config';
import Button from '../modules/Button'
import ThemeSwitcher from '../modules/ThemeSwitcher'

let default_data = require('../../default_data.json');


const Banner : FC = () =>
{

    const [banner, setBanner] = useState<any>([]);

    /**
     * Get the banner information from the cache if it exists. Otherwise 
     * resort to default values for each field.
     */
    const banner_name = localStorage.getItem("banner_name") || default_data.banner.name;
    const banner_title = localStorage.getItem("banner_title") || default_data.banner.title;
    const banner_prefix = localStorage.getItem("banner_prefix") || default_data.banner.prefix;

    
    /**
     * Get the banner information from the database.
     * If the banner_info document exists, then update the banner state 
     * and store the information in the cache
     */
    useEffect(() => {
        const banner_info = database.collection("basic_info").doc("banner_info");
        banner_info.get().then((doc) => {
            if (doc.exists)
            {
                setBanner(doc.data());
                localStorage.setItem("banner_name", doc.get("name"));
                localStorage.setItem("banner_title", doc.get("title"));
                localStorage.setItem("banner_prefix", doc.get("prefix"));
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
                <h2 className="pre">{banner.prefix || banner_prefix}</h2>
                <h1 className="my_name">{banner.name || banner_name}</h1>
                <h1 className="my_title">{banner.title || banner_title}</h1>
                <div className="banner_buttons">
                    <Button type="button" className="resume" text="See Resume"/>
                    <Button type="button" className="contact" text="Contact Me"/>
                    <ThemeSwitcher />
                </div>
           </div>
       </section>
    );
}

export default Banner