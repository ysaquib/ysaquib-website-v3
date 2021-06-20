/**
 * File: AdminPage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import { Container } from '@material-ui/core';
import AdminBanner from '../components/superadmin/AdminBanner';
import AdminAbout from '../components/superadmin/AdminAbout';
import AdminProjects from '../components/superadmin/AdminProjects';
import DialogBox from '../components/elements/DialogBox';
 
const Admin : FC = () =>
{
    return (
        <Container>
            {/* <DialogBox 
                title="Confrim Delete Project" 
                message="Are you sure you want to delete this project?"
                messageWarning="Warning: this action cannot be undone."
                optionConfirm="Yes"/> */}
            
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