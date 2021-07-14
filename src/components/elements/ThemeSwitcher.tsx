/**
 * File: ThemeSwitcher.tsx
 * Author: Yusuf Saquib
 */


import React, { FC } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import Button from './Button';


interface ThemeSwitcherProps
{
    useButton?: boolean;
}

/**
 * Implements a wrapper which toggles the current theme from ThemeContext.
 */

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({useButton=true, ...props}) => 
{
    
    return (
        <ThemeContext.Consumer>
            {({theme, toggleTheme}) => {
                if (!useButton && props.children)
                {
                    return (<span onClick={toggleTheme}>{props.children}</span>)
                }
                return (<Button type="button" className="no_background" text={`Use ` + (theme === "theme-dark" ? "Light" : "Dark") + ` Theme`} onClick={toggleTheme}/>)
            }}
        </ThemeContext.Consumer>
    );
}

export default ThemeSwitcher;