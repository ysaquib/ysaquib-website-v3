/**
 * File: SignIn.tsx
 * Author: Yusuf Saquib
 */

 import React, { FC } from 'react';

 import { Container } from '@material-ui/core';
import LoginPortal from '../components/sections/LoginPortal';
 
 const SignIn : FC = () =>
 {
     return (
         <Container>
             <LoginPortal />
         </Container>
     );
 }
 
 export default SignIn;