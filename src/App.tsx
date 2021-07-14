/**
 * File: App.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect, useState } from 'react';
import './styles/main.scss';
import './firebase/config'

import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

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
import Inbox from './components/modules/Inbox';
import Projects from './components/sections/Projects';
import { ThemeContext } from './contexts/ThemeContext';
import Head from './components/layout/Head';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

let default_data = require('./default_data.json');

const App : FC = () =>
{
    const dispatch = useDispatch();
    const AuthState = useSelector((state : RootState) => state.auth);

    const getTheme = localStorage.getItem('theme') || default_data.theme;
    const [currentTheme, setCurrentTheme] = useState<string>(getTheme ?? "theme-dark");
    if(getTheme == null)
    {
        document.body.classList.add("theme-dark");
        console.log(getTheme);
    }

    useEffect(() => {
        document.body.classList.add(currentTheme);
        localStorage.setItem("theme", currentTheme);
        return () => {
            document.body.classList.remove(currentTheme);
        }
    }, [currentTheme]);

    
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => 
        {
            if(user) 
            {
                dispatch(setLoading(true));
                dispatch(getUserById(user.uid));
                dispatch(getMessages());
                
                if(!user.emailVerified) 
                {
                    dispatch(setNeedVerification());
                }
            }
            else 
            {
                dispatch(setLoading(false));
            }
        });
        
        
        return () => 
        {
            dispatch(setLoading(false));
            unsubscribe();
        };
    }, [dispatch]);

    if (AuthState.loading)
    {
        return(<Loader className={currentTheme==="theme-light" ? "light" : "dark"}/>);
    }
    
    return (
        <GoogleReCaptchaProvider reCaptchaKey="6LfePyMbAAAAAAyhCMtDPqGNK_7IfJnR1YZJ-23Q" >

        <BrowserRouter>
        <HelmetProvider>

            <Head main={true}/>

            <ThemeContext.Provider value={{theme: currentTheme, toggleTheme: () => setCurrentTheme(currentTheme === "theme-dark" ? "theme-light" : "theme-dark")}}>
            <Header />

            <div id="main_container">
                <Switch>
                    <PublicRoute exact path="/"> <HomePage /> </PublicRoute>
                    
                    <PublicRoute exact path="/signin"> 
                        {AuthState.authenticated ? <Redirect to="/" /> : <SignIn /> } 
                    </PublicRoute>
                    
                    <PublicRoute exact path="/signup"> <SignUp /> </PublicRoute>
                    <PublicRoute path="/blog"> <BlogsPage /> </PublicRoute>
                    <PublicRoute path="/projects"> <Projects id="all_projects" sectionTitle="Projects Archive" showAllProjects={true}/> </PublicRoute>
                    <PrivateRoute path="/admin" authRoles={["superadmin"]}> <Admin /> </PrivateRoute>
                    <PrivateRoute path="/inbox" authRoles={["superadmin"]}> <Inbox /> </PrivateRoute>
                    <Route component={Error404} />
                </Switch>
            <Footer />
            </div>

            </ThemeContext.Provider>

        </HelmetProvider>
        </BrowserRouter>
    </GoogleReCaptchaProvider>
    );
}

export default App;
