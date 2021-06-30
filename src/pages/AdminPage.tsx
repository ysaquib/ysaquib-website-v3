/**
 * File: AdminPage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import { Container } from '@material-ui/core';
import AdminBanner from '../components/superadmin/AdminBanner';
import AdminAbout from '../components/superadmin/AdminAbout';
import AdminProjects from '../components/superadmin/AdminProjects';
import Section from '../components/elements/Section';
 
const Admin : FC = () =>
{
    return (
        <Section title="Admin Dashboard">
            <section id="admin">
                <AdminBanner />
                <AdminAbout />
                <AdminProjects />
            </section>
        </Section>
    );
}

export default Admin;