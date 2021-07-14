/**
 * File: SignIn.tsx
 * Author: Yusuf Saquib
 * 
 * Simply shows the login portal
 */

import React, { FC } from 'react';

import LoginPortal from '../components/modules/LoginPortal';
import Head from '../components/layout/Head';
 
const SignIn : FC = () =>
{
    return (
        <>
            <Head title="Sign In" />
            
            <LoginPortal />
        </>
    );
}

export default SignIn;