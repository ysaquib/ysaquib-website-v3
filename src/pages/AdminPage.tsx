/**
 * File: SignUp.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import { Container } from '@material-ui/core';
import AdminBanner from '../components/superadmin/AdminBanner';
import AdminAbout from '../components/superadmin/AdminAbout';
import AdminProjects from '../components/superadmin/AdminProjects';
 
const Admin : FC = () =>
{
    return (
        <Container>
            <h1 className="admin_title">Admin Dashboard</h1>
            <section id="admin">
                <AdminBanner />
                <AdminAbout />
                <AdminProjects />
            </section>
        </Container>
    );
}

export default Admin;