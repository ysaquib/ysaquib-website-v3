/**
 * File: Footer.tsx
 * Author: Yusuf Saquib
 */

import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React, { FC } from 'react';
import Link from '../modules/Link';
let default_data = require('../../default_data.json');

const Footer : FC = () =>
{
    return (
        <footer id="footer">
            <div className="footer_wrapper">
                <Link url={default_data.footer.url} className="footer_label"><ChevronLeft />{default_data.footer.text}<ChevronRight /></Link>
            </div>
        </footer>
    );
}

export default Footer;