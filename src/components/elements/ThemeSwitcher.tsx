import React, { FC } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import Button from './Button';


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
                return (<Button className="no_background" text={`Use ` + (theme === "theme-dark" ? "Light" : "Dark") + ` Theme`} onClick={toggleTheme}/>)
            }}
        </ThemeContext.Consumer>
    );
}

export default ThemeSwitcher;