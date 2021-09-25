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
            <h1 className="err_title">Error: 404 Not Found</h1>
            <Link to="/" className="err_home">Back to Homepage</Link>
        </section>
    );
}

export default PageNotFound;