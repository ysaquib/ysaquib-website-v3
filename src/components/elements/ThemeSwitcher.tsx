import React, { FC, useState, useEffect } from 'react';
import { ThemeContext } from '../../ThemeContext';
import Button from './Button';

let default_data = require('../../default_data.json');

interface ThemeSwitcherProps
{
    useButton?: boolean;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({useButton=true, ...props}) => 
{


    
    // Default behavior.
    return (
        <ThemeContext.Consumer>
            {({theme, toggleTheme}) => {
                if (!useButton && props.children)
                {
                    return (<span onClick={toggleTheme}>{props.children}</span>)
                }
                console.log(theme);
                return (<Button className="no_background" text={`Use ` + (theme === "theme-dark" ? "Light" : "Dark") + ` Theme`} onClick={toggleTheme}/>)
            }}
        </ThemeContext.Consumer>
    );
}

export default ThemeSwitcher;