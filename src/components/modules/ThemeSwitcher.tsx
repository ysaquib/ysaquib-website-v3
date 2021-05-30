import React, { FC, useState, useEffect } from 'react';
import Button from './Button';

const ThemeSwitcher: FC = () => 
{
    const [useDarkTheme, setDarkTheme] = useState(true);

    // const updateButtonText = () : string =>
    // {
    //     return useDarkTheme ? "Use Light Theme" : "Use Dark Theme";
    // }

    const toggleTheme = () =>
    {
        setDarkTheme(!useDarkTheme);
        if (useDarkTheme)
        {
            localStorage.setItem('Theme', "Light");
            document.body.classList.remove("theme-dark");
            document.body.classList.add("theme-light");
        } 
        else 
        {
            localStorage.setItem('Theme', "Dark");
            document.body.classList.remove("theme-light");
            document.body.classList.add("theme-dark");
            // document.body.style.backgroundColor = ;
        }
    }

    useEffect(() => 
    {
        const getTheme = localStorage.getItem('Theme');
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