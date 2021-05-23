import React, { FC } from 'react'
import Button from '../modules/Button'

const Intro : FC = () =>
{
    return (
       <section id="intro">
           <div className="intro_wrapper">
                <h1 className="my_name">Yusuf Saquib</h1>
                <Button type="button" className="resume" text="See Resume"/>
           </div>
       </section>
    );
}

export default Intro