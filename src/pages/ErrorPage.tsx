/**
 * File: ErrorPage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import { Container } from '@material-ui/core';
import PageNotFound from '../components/layout/PageNotFound';
import Head from '../components/layout/Head';
 
const Error404 : FC = () =>
{
    return (
        <Container>
            <Head title="Page Not Found" />

            <PageNotFound />
        </Container>
    );
}

export default Error404;