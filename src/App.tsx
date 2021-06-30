/**
 * File: App.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect } from 'react';
import './styles/main.scss';
import './firebase/config'

import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Admin from './pages/AdminPage';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import PublicRoute from './components/auth/PublicRoute';
import PrivateRoute from './components/auth/PrivateRoute';

import { RootState } from './store';
import { getUserById, setLoading, setNeedVerification } from './store/actions/authActions';
import firebase from 'firebase';
import Error404 from './pages/ErrorPage';
import Loader from './components/layout/Loader';
import BlogsPage from './pages/BlogsPage';
import { getMessages } from './store/actions/dataActions';
import { Container } from '@material-ui/core';
import Inbox from './components/modules/Inbox';
import Projects from './components/sections/Projects';

let default_data = require('./default_data.json');

const App : FC = () =>
{
    const dispatch = useDispatch();
    const AuthState = useSelector((state : RootState) => state.auth);

    const getTheme = localStorage.getItem('theme') || default_data.theme;
    switch (getTheme)
    {
        case "light":
            document.body.classList.remove("theme-dark");
            document.body.classList.add("theme-light");
            break;
        default:
            document.body.classList.remove("theme-light");
            document.body.classList.add("theme-dark");
            break;
    }

    useEffect(() => {
        dispatch(setLoading(true));
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => 
        {
            if(user) 
            {
                dispatch(setLoading(true));
                dispatch(getMessages());
                await dispatch(getUserById(user.uid));
                if(!user.emailVerified) 
                {
                    dispatch(setNeedVerification());
                }
            }
            dispatch(setLoading(false));
        });
        
        return () => 
        {
            unsubscribe();
        };
    }, [dispatch]);

    if (AuthState.loading)
    {
        return(<Loader />);
    }
    
    return (
        <BrowserRouter>
            <Header />
            <Container>
                <Switch>
                    <PublicRoute exact path="/"> <HomePage /> </PublicRoute>
                    <PublicRoute exact path="/signin"> <SignIn /> </PublicRoute>
                    <PublicRoute exact path="/signup"> <SignUp /> </PublicRoute>
                    <PublicRoute path="/blog"> <BlogsPage /> </PublicRoute>
                    <PublicRoute path="/projects"> <Projects id="all_projects" sectionTitle="Projects Archive" showAllProjects={true}/> </PublicRoute>
                    <PrivateRoute path="/admin" authRoles={["superadmin"]}> <Admin /> </PrivateRoute>
                    <PrivateRoute path="/inbox" authRoles={["superadmin"]}> <Inbox /> </PrivateRoute>
                    <Route component={Error404} />
                </Switch>
            <Footer />
            </Container>
        </BrowserRouter>
    );
}

export default App;
