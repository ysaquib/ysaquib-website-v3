/**
 * File: ErrorPage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import { Container } from '@material-ui/core';
import PageNotFound from '../components/layout/PageNotFound';
 
const Error404 : FC = () =>
{
    return (
        <Container>
            <PageNotFound />
        </Container>
    );
}

export default Error404;