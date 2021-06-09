/**
 * File: Header.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';



let default_data = require('../../default_data.json');

const Header : FC = () =>
{
    const [scrollPosition, setScrollPosition] = useState(0);
    const {authenticated} = useSelector((state : RootState) => state.auth);
    
    const handleScroll = () => 
    {
        const posY = window.pageYOffset;
        setScrollPosition(posY);
    }
    
    useEffect(() => 
    {
        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => 
        {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => 
    {
        if (scrollPosition > 10)
        {
            return document.getElementById("header")?.classList.add("scrolling");
        }
        else
        {
            return document.getElementById("header")?.classList.remove("scrolling");
        }
    }, [scrollPosition]);

    

    return (
        <header id="header">
            <div className="header_wrapper">
                <p className="header_title"><Link to="/">{default_data.header.title}</Link></p>
                <ol className="header_list">
                    {default_data.header.sections.map(([title, path] : [string, string]) => {
                        return (<li className="header_item" key={title}>
                                    <a href={path} className="header_link">
                                        {title}
                                    </a>
                                </li>)
                    })}
                    <li className="header_item">
                        <Link to={authenticated ? `/account` : `signin`} className="header_link">
                            Account
                        </Link>
                    </li>
                </ol>
            </div>
        </header>
    );
    
}

export default Header;