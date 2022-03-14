/**
 * File: AdminPage.tsx
 * Author: Yusuf Saquib
 * 
 * Shows the admin dashboard and admin components
 */

import React, { FC, useEffect } from 'react';

import AdminBanner from '../components/superadmin/AdminBanner';
import AdminAbout from '../components/superadmin/AdminAbout';
import AdminProjects from '../components/superadmin/AdminProjects';
import Section from '../components/elements/Section';
import Head from '../components/layout/Head';
import AdminCareers from '../components/superadmin/AdminCareers';
 
const Admin : FC = () =>
{
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    
    return (
        <Section title="Admin Dashboard">
            <Head title="Admin Dashboard" />
            
            <section id="admin">
                <AdminBanner />
                <AdminAbout />
                <AdminProjects />
                <AdminCareers />
            </section>
        </Section>
    );
}

export default Admin;