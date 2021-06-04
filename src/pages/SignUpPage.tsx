/**
 * File: SignUp.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import { Container } from '@material-ui/core';
import RegisterPortal from '../components/modules/RegisterPortal';
 
 const SignUp : FC = () =>
 {
     return (
         <Container>
             <RegisterPortal />
         </Container>
     );
 }
 
 export default SignUp;