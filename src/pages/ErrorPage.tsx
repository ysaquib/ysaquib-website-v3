/**
 * File: ErrorPage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import PageNotFound from '../components/layout/PageNotFound';
import Head from '../components/layout/Head';
 
const Error404 : FC = () =>
{
    return (
        <>
            <Head title="Page Not Found" />

            <PageNotFound />
        </>
    );
}

export default Error404;