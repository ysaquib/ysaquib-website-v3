/**
 * File: Header.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../../store';
import { userSignOut } from '../../store/actions/authActions';



let default_data = require('../../default_data.json');

const Header : FC = () =>
{
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [scrollPosition, setScrollPosition] = useState(0);
    const {authenticated, userRoles} = useSelector((state : RootState) => state.auth);
    
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

    const handleSignOut = () =>
    {
        dispatch(userSignOut());
    }
    
    //onClick={() => history.push(path)}

    return (
        <header id="pseudo_header">
        <div id="header">
        <div className="header_wrapper">
            <p className="header_title">
                <Link to="/">
                    {default_data.header.title}
                </Link>
            </p>


            <ol className="header_list">
                {default_data.header.sections.map(([title, path] : [string, string]) => {
                    return (
                    <li className="header_item" key={title} onClick={() => history.push(path)}>
                        {title}
                    </li>);
                })}

                {!authenticated ? 
                    <li className="header_item" onClick={() => {history.push("/signin")}} >
                            Sign In
                    </li> : <></>   
                }

                {authenticated && userRoles.includes("superadmin") ? 
                    <li className="header_item" onClick={() => {history.push("/inbox")}} >
                        Messages
                    </li> : <></>   
                }

                {authenticated && userRoles.includes("superadmin") ? 
                    <li className="header_item" onClick={() => {history.push("/admin")}} >
                        Admin Dashboard
                    </li> : <></>   
                }


                {authenticated ? 
                    <li className="header_item sign_out" onClick={handleSignOut} >
                            Sign Out
                    </li> : <></>   
                }
            </ol>
        </div>
        </div>
        </header>
    );
    
}

export default Header;