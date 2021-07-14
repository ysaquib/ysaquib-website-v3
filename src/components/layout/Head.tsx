/**
 * File: Head.tsx
 * Author: Yusuf Saquib
 * 
 * Appends stuff to the head using react-helmet-async
 */

import React, { FC } from 'react';

import { Helmet } from 'react-helmet-async';

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