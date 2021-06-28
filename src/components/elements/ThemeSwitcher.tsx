import React, { FC, useState, useEffect } from 'react';
import Button from './Button';

let default_data = require('../../default_data.json');

interface ThemeSwitcherProps
{
    useButton?: boolean;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({useButton=true, ...props}) => 
{
    const [useDarkTheme, setDarkTheme] = useState(true);

    /**
     * Check the current state. If it is already dark, make it light and 
     * update class list of body.
     */
    const toggleTheme = () =>
    {
        setDarkTheme(!useDarkTheme);
        if (useDarkTheme)
        {
            localStorage.setItem('theme', "light");
            document.getElementById("root")?.classList.remove("theme-dark");
            document.getElementById("root")?.classList.add("theme-light");
            document.body.classList.remove("theme-dark");
            document.body.classList.add("theme-light");
        } 
        else 
        {
            localStorage.setItem('theme', "dark");
            document.getElementById("root")?.classList.remove("theme-light");
            document.getElementById("root")?.classList.add("theme-dark");
            document.body.classList.remove("theme-light");
            document.body.classList.add("theme-dark");
        }
    }

    /**
     * Check the cache for the theme and set the class list of body
     */
    useEffect(() => 
    {
        const getTheme = localStorage.getItem('theme') || default_data.dark;
        switch (getTheme)
        {
            case "dark":
                setDarkTheme(true);
                document.body.classList.add("theme-dark");
                break;
            case "light":
                setDarkTheme(false);
                document.body.classList.add("theme-light");
                break;
        }
    }, [])

    if (!useButton && props.children)
    {
        return (
            <span onClick={toggleTheme}>
                {props.children}
            </span>
        )
    }

    // Default behavior.
    return (
        <Button className="no_background" text={`Use ` + (useDarkTheme ? "Light" : "Dark") + ` Theme`} onClick={toggleTheme}/>
    );
}

export default ThemeSwitcher;