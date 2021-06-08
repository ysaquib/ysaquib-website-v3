/**
 * File: Header.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';
import { Link } from 'react-router-dom';


let default_data = require('../../default_data.json');

const Header : FC = () =>
{
    return (
        <header id="header">
            <div className="header_wrapper">
                <ol>
                    {default_data.header.sections.map(([title, path] : [string, string]) => {
                        return (<li className="header_item">
                                    <a href={path} className="header_link">
                                        {title}
                                    </a>
                                </li>)
                    })}
                </ol>
            </div>
        </header>
    );
    
}

export default Header;