/**
 * File: PageNotFound.tsx
 * Author: Yusuf Saquib
 */

import React, {FC} from 'react';
import { Link } from 'react-router-dom';

const PageNotFound : FC = () => 
{
    return (
        <section id="pagenotfound">
            <h1 className="err_title">Page Not Found</h1>
            <Link to="/" className="err_home">Go Back to Homepage</Link>
        </section>
    );
}

export default PageNotFound;