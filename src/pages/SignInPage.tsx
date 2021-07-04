/**
 * File: SignIn.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import { Container } from '@material-ui/core';
import LoginPortal from '../components/modules/LoginPortal';
import Head from '../components/layout/Head';
 
const SignIn : FC = () =>
{
    return (
        <Container>
            <Head title="Sign In" />
            
            <LoginPortal />
        </Container>
    );
}

export default SignIn;