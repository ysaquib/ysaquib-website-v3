/**
 * File: InboxPage.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';

import { Container } from '@material-ui/core';
import Inbox from '../components/modules/Inbox';
 
const InboxPage : FC = () =>
{
    return (
        <Container>
            <Inbox />
        </Container>
    );
}

export default InboxPage;