/**
 * File: App.tsx
 * Author: Yusuf Saquib
 */

import React, { FC, useEffect } from 'react';
import './styles/main.scss';
import './firebase/config'

import { useDispatch, useSelector } from 'react-redux'; //useSelector
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

let default_data = require('./default_data.json');

const App : FC = () =>
{
    const dispatch = useDispatch();
    const { loading } = useSelector((state : RootState) => state.auth);

    const getTheme = localStorage.getItem('theme') || default_data.theme;
    switch (getTheme)
    {
        case "dark":
            document.body.classList.add("theme-dark");
            break;
        case "light":
            document.body.classList.add("theme-light");
            break;
    }

    useEffect(() => {
        dispatch(setLoading(true));
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => 
        {
            if(user) 
            {
                dispatch(setLoading(true));
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

    if (loading )
    {
        return(
            <Loader />
        )
    }
    
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <PublicRoute exact path="/" component={HomePage} />
                <PublicRoute exact path="/signin" component={SignIn} />
                <PublicRoute exact path="/signup" component={SignUp} />
                <PublicRoute path="/admin" component={Admin} />
                <PrivateRoute path="/account" component={SignIn} />
                <Route component={Error404}/>
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
