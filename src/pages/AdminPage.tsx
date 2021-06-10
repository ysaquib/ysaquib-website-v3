/**
 * File: SignUp.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import { Container } from '@material-ui/core';
import AdminBanner from '../components/superadmin/AdminBanner';
 
const Admin : FC = () =>
{
    return (
        <Container>
            <h1 className="admin_title">Admin Dashboard</h1>
            <section id="admin">
                <AdminBanner />
            </section>
        </Container>
    );
}

export default Admin;