/**
 * File: App.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';
import './components/styles/main.scss';
import { BrowserRouter, Switch } from 'react-router-dom';
// import { Helmet } from 'react-helmet';

import './firebase/config'

import HomePage from './pages/HomePage'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PublicRoute from './components/auth/PublicRoute';

const App : FC = () =>
{
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PublicRoute path="/" component={HomePage} exact />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
