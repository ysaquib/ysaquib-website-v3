/**
 * File: Header.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';


let default_data = require('../../default_data.json');

const Header : FC = () =>
{
    return (
        <header id="header">
            <div className="header_wrapper">
                
            </div>
        </header>
    );
    
}

Header.defaultProps = {isOnHome: true};
export default Header;