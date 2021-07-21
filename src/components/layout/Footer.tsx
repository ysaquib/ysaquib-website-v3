/**
 * File: Footer.tsx
 * Author: Yusuf Saquib
 */

import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React, { FC } from 'react';
import Anchor from '../elements/Anchor';
let default_data = require('../../default_data.json');

const Footer : FC = () =>
{
    return (
        <footer id="footer">
            <div className="footer_wrapper">
                <Anchor href={default_data.footer.url} title={default_data.footer.alt} className="footer_label"><ChevronLeft />{default_data.footer.text}<ChevronRight /></Anchor>
            </div>
        </footer>
    );
}

export default Footer;