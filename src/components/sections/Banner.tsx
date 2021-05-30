import React, { FC } from 'react'
import Button from '../modules/Button'
import ThemeSwitcher from '../modules/ThemeSwitcher'


const Banner : FC = () =>
{


    return (
       <section id="banner">
           <div className="banner_wrapper">
                <h2 className="pre">Hi! My name is</h2>
                <h1 className="my_name">Yusuf Saquib.</h1>
                <h1 className="my_title">I am a Computer Science Student.</h1>
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