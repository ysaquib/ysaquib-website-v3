/**
 * File: AdminPage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import AdminBanner from '../components/superadmin/AdminBanner';
import AdminAbout from '../components/superadmin/AdminAbout';
import AdminProjects from '../components/superadmin/AdminProjects';
import Section from '../components/elements/Section';
import Head from '../components/layout/Head';
 
const Admin : FC = () =>
{
    return (
        <Section title="Admin Dashboard">
            <Head title="Admin Dashboard" />
            
            <section id="admin">
                <AdminBanner />
                <AdminAbout />
                <AdminProjects />
            </section>
        </Section>
    );
}

export default Admin;