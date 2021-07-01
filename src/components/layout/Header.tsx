/**
 * File: Header.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import { userSignOut } from '../../store/actions/authActions';
import ThemeSwitcher from '../elements/ThemeSwitcher';



let default_data = require('../../default_data.json');

const Header : FC = () =>
{
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [scrollPosition, setScrollPosition] = useState(0);
    const {authenticated, userRoles} = useSelector((state : RootState) => state.auth);
    const {hasNewMessages, newMessagesCount} = useSelector((state : RootState) => state.messages);

    const currentPath = useLocation();

    const [selectedPath, setSelectedPath] = useState<string>(currentPath.pathname);
    
    const handleScroll = () => 
    {
        const posY = window.pageYOffset;
        setScrollPosition(posY);
    }
    
    useEffect(() => {
        setSelectedPath(currentPath.pathname);
    }, [history.location])
    
    useEffect(() => 
    {
        document.getElementById(selectedPath)?.classList.add("selected_path");
        console.log(selectedPath);
        
        return () => 
        {
            document.getElementById(selectedPath)?.classList.remove("selected_path");

        }
    }, [selectedPath]);

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
            <ThemeSwitcher useButton={false}>
                <p className="header_title">
                    {default_data.header.title}
                </p>
            </ThemeSwitcher>


            <ol className="header_list">
                {default_data.header.sections.map(([title, path] : [string, string]) => {
                    return (
                    <li className="header_item" 
                        key={title} 
                        id={path} 
                        onClick=
                        {() => history.push(path)}>
                        {title}
                    </li>);
                })}

                {!authenticated ? 
                    <li className="header_item" id="/signin" onClick={() => {history.push("/signin")}} >
                            Sign In
                    </li> : <></>   
                }

                {authenticated && userRoles.includes("superadmin") ? 
                    <li className="header_item" id="/inbox" onClick={() => history.push("/inbox")} >
                        {`${hasNewMessages ? `${newMessagesCount} New ` : ""}Message${newMessagesCount > 1 || !hasNewMessages ? "s" : ""}`}
                    </li> : <></>   
                }

                {authenticated && userRoles.includes("superadmin") ? 
                    <li className="header_item" id="/admin" onClick={() => history.push("/admin")} >
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