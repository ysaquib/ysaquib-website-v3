/**
 * File: ThemeSwitcher.tsx
 * Author: Yusuf Saquib
 */


import React, { FC } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import Button from './Button';
import { IconMoon, IconMoonFilled, IconSun, IconSunFilled } from './Icons';


interface ThemeSwitcherProps
{
    type?: "button" | "wrapper" | "icon";
}

/**
 * Implements a wrapper which toggles the current theme from ThemeContext.
 */

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({type="button", ...props}) => 
{
    
    return (
        <ThemeContext.Consumer>
            {({theme, toggleTheme}) => {
                if (type === "wrapper" && props.children)
                {
                    return (<button id="themeswitcher" onClick={toggleTheme}>{props.children}</button>)
                }
                else if (type === "icon")
                {
                    return (<button id="themeswitcher" className="icon_type" onClick={toggleTheme}><span className="svg_icon">{theme === "theme-dark" ? IconSunFilled : IconMoonFilled}</span></button>)
                }
                return (<Button type="button" className="no_background" text={`Use ` + (theme === "theme-dark" ? "Light" : "Dark") + ` Theme`} onClick={toggleTheme}/>)
            }}
        </ThemeContext.Consumer>
    );
}

export default ThemeSwitcher;