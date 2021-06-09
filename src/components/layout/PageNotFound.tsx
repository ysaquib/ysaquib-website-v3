/**
 * File: Section.tsx
 * Author: Yusuf Saquib
 */

import React, {FC} from 'react';
import { useHistory } from 'react-router';
import Button from '../elements/Button';

const PageNotFound : FC = () => 
{
    const history = useHistory();
    return (
        <section id="pagenotfound">
            <h1 className="title">Error 404</h1>
            <h2 className="subtitle">Page Not Found :(</h2>
            <Button text="Go to Home Page" className="no_background home_btn" onClick={() => history.push("/")} />
        </section>
    );
}

export default PageNotFound;