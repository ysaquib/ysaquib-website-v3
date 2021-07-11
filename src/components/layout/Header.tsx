/**
 * File: Header.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import { userSignOut } from '../../store/actions/authActions';
import ThemeSwitcher from '../elements/ThemeSwitcher';

import scss_exports from "../../styles/abstracts/_exports.module.scss";
import { IconMenu } from '../elements/Icons';


let default_data = require('../../default_data.json');

const Header : FC = () =>
{
    const history = useHistory();
    const dispatch = useDispatch();
    
    const {authenticated, userRoles} = useSelector((state : RootState) => state.auth);
    const {hasNewMessages, newMessagesCount} = useSelector((state : RootState) => state.messages);
    
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    

    // This is probably a very "janky" way of importing a SCSS variable
    const [isMobileHeader, setIsMobileHeader] = useState(false);

    const currentPath = useLocation();
    const [selectedPath, setSelectedPath] = useState<string>(currentPath.pathname);
    
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    /**
     * Switch to a mobile header depending on window size, which we have 
     * added a listener to
     */
    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    useEffect(() => {
        setIsMobileHeader(windowSize.width <= parseInt(scss_exports.breakpointTablet));
    }, [windowSize]);
    
    
    /**
     * Toggle view of Mobile Header
     */
    useEffect(() => {
        console.log(isOpen);
        if (isOpen)
            document.getElementById("header_menu_wrapper")?.classList.add("open");
        else
            document.getElementById("header_menu_wrapper")?.classList.remove("open");
    }, [isOpen]);

    /**
     * Change which header page tab is currently selected
     */
    
    useEffect(() => {
        setSelectedPath(currentPath.pathname);
    }, [history.location, currentPath.pathname]);
    
    
    useEffect(() => {
        document.getElementById(selectedPath)?.classList.add("selected_path");
        console.log(document.getElementById(selectedPath));
        return () => 
        {
            document.getElementById(selectedPath)?.classList.remove("selected_path");
        }
    }, [selectedPath]);

    /**
     * Changes the color of header if the user is currently scrolling
     */
    const handleScroll = () => 
    {
        const posY = window.pageYOffset;
        setScrollPosition(posY);
    }

    useEffect(() => {
        if (scrollPosition > 0)
        {
            return document.getElementById("header")?.classList.add("scrolling");
        }
        else
        {
            return document.getElementById("header")?.classList.remove("scrolling");
        }
    }, [scrollPosition]);

    /**
     * Add event listeners for scroll and resize
     */
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, {passive: true});
        window.addEventListener("resize", handleResize);
        handleScroll();
        handleResize();

        return () => 
        {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize)
        }
    }, []);

    const handleSignOut = () => {dispatch(userSignOut());}

    /**
     * Declaring the header page tab items and the other tabs based on the
     * auth state of the user.
     */

    const list_items: JSX.Element = default_data.header.sections.map(([title, path] : [string, string]) => {
        return (
        <li className={`header_item ${selectedPath === path ? "selected_path" : ""}`} 
            key={title} 
            id={path} 
            onClick=
            {() => history.push(path)}>
            {title}
        </li>);
    });
    
    const signin_tab: JSX.Element = !authenticated 
        ? ( <li className={`header_item ${selectedPath === "/signin" ? "selected_path" : ""}`} id="/signin" onClick={() => {history.push("/signin")}}>Sign In</li> ) 
        : ( <></> );

    const messages_tab: JSX.Element = authenticated && userRoles.includes("superadmin") 
        ? ( <li className={`header_item ${selectedPath === "/inbox" ? "selected_path" : ""}`} id="/inbox" onClick={() => history.push("/inbox")}> 
                {`${hasNewMessages ? `${newMessagesCount} New ` : ""}Message${newMessagesCount > 1 || !hasNewMessages ? "s" : ""}`}
            </li>) 
        : ( <></> );

    const admin_tab: JSX.Element = authenticated && userRoles.includes("superadmin")
        ? ( <li className={`header_item ${selectedPath === "/admin" ? "selected_path" : ""}`} id="/admin" onClick={() => history.push("/admin")}>Admin Dashboard</li> )
        : ( <></> );

    const signout_tab: JSX.Element = authenticated
        ? ( <li className="header_item sign_out" onClick={handleSignOut}>Sign Out</li> ) 
        : ( <></> );

    if (isMobileHeader)
    {
        return (
            <header id="pseudo_header">
                <div id="header">
                    <div className="header_wrapper">
                        <ThemeSwitcher useButton={false}>
                            <p className="header_title">
                                {default_data.header.title}
                            </p>
                        </ThemeSwitcher>

                        <span className="svg_icon menu_icon" onClick={()=>setIsOpen(!isOpen)}>{IconMenu}</span>

                    </div>
                    <div id="header_menu_wrapper" className="header_menu_wrapper" onClick={()=>setIsOpen(!isOpen)}>
                        <div id="header_mobile_menu" className="header_menu">
                            <ol className="header_list">
                                {list_items}
                                {signin_tab}
                                {messages_tab}
                                {admin_tab}
                                {signout_tab}
                            </ol>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

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
                        {list_items}
                        {signin_tab}
                        {messages_tab}
                        {admin_tab}
                        {signout_tab}
                    </ol>

                </div>
            </div>
        </header>
    );
    
}

export default Header;