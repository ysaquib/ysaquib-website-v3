import React, { FC, useState, useEffect } from 'react';
import Button from './Button';

const ThemeSwitcher: FC = () => 
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
            localStorage.setItem('theme', "Light");
            document.body.classList.remove("theme-dark");
            document.body.classList.add("theme-light");
        } 
        else 
        {
            localStorage.setItem('theme', "Dark");
            document.body.classList.remove("theme-light");
            document.body.classList.add("theme-dark");
        }
    }

    /**
     * Check the cache for the theme and set the class list of body
     */
    useEffect(() => 
    {
        const getTheme = localStorage.getItem('theme');
        switch (getTheme)
        {
            case "Dark":
                setDarkTheme(true);
                document.body.classList.add("theme-dark");
                break;
            case "Light":
                setDarkTheme(false);
                document.body.classList.add("theme-light");
                break;
        }
    }, [])

    return (
        <Button className="theme_toggler" text={`Use ` + (useDarkTheme ? "Light" : "Dark") + ` Theme`} onClick={toggleTheme}/>
    );
}

export default ThemeSwitcher;