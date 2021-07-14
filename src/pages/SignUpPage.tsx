/**
 * File: SignUp.tsx
 * Author: Yusuf Saquib
 * 
 * Simply shows the registration portal.
 */

import React, { FC } from 'react';

import RegisterPortal from '../components/modules/RegisterPortal';
import Head from '../components/layout/Head';
 
const SignUp : FC = () =>
{
    return (
        <>
            <Head title="Sign Up" />
            <RegisterPortal />
        </>
    );
}
 
 export default SignUp;