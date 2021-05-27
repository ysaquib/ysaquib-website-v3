import React, { FC } from 'react'
import Button from '../modules/Button'

const Banner : FC = () =>
{
    return (
       <section id="banner">
           <div className="banner_wrapper">
                <h2 className="pre">Hi! My name is</h2>
                <h1 className="my_name">Yusuf Saquib.</h1>
                <h1 className="suf">I am a Computer Science Student.</h1>
                <div className="btns">
                    <Button type="button" className="resume" text="See Resume"/>
                    <Button type="button" className="contact" text="Contact Me"/>
                </div>
           </div>
       </section>
    );
}

export default Banner