/**
 * File: App.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';
import './components/styles/main.scss';
import { BrowserRouter, Switch } from 'react-router-dom';
// import { Helmet } from 'react-helmet';

import './firebase/config'

import HomePage from './pages/HomePage';
import SignIn from './pages/SignInPage';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import PublicRoute from './components/auth/PublicRoute';
import PrivateRoute from './components/auth/PrivateRoute';

const App : FC = () =>
{
    /**
     * Perform Check for root id elem to ensure it has a theme-class. If not,
     * then we add one.
     */
    const Root = document.getElementById("root");
    const Body = document.body;
    var isDark = false;
    var isLight = false;
    if (Root !== null)
    {
        isDark = Root!.classList.contains("theme-dark");
        isLight = Root!.classList.contains("theme-light");
    }
    else
    {
        console.log("Error: Root component has no theme class");
    }

    if(!isDark && !isLight)
    {
        Root!.classList.add("theme-dark");
        Body.classList.add("theme-dark");
    }

    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <PublicRoute exact path="/" component={HomePage} />
                <PublicRoute exact path="/signin" component={SignIn} />
                <PublicRoute exact path="/signup" component={HomePage} />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
