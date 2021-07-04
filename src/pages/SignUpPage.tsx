/**
 * File: SignUp.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import { Container } from '@material-ui/core';
import RegisterPortal from '../components/modules/RegisterPortal';
import Head from '../components/layout/Head';
 
const SignUp : FC = () =>
{
    return (
        <Container>
            <Head title="Sign Up" />
            <RegisterPortal />
        </Container>
    );
}
 
 export default SignUp;