/**
 * File: Head.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import { Helmet } from 'react-helmet';

interface PageHeadProps
{
    main?:      boolean;
    title?:     string;
}

const PageHead : FC<PageHeadProps> = ({main=false, title, ...props}) =>
{
    if (main)
    {
        return (
            <Helmet>
                <title>Yusuf Saquib</title>
            </Helmet>
        );
    }
    return (
        <Helmet>
            <title>{(title && `${title} | `) || ""}Yusuf Saquib</title>
        </Helmet>
    );
}

export default PageHead;