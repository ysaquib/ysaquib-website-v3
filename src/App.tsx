/**
 * File: App.tsx
 * Author: Yusuf Saquib
 */

import React, { FC } from 'react';
import './components/styles/main.scss';
import { BrowserRouter } from 'react-router-dom'; //Switch
// import { Helmet } from 'react-helmet';

import './firebase/config'

import HomePage from './components/pages/HomePage'

const App : FC = () =>
{
  return (
    <BrowserRouter>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>Yusuf Saquib</title>
        <html lang='en'/>
        <meta name="description" content='Yusuf Saquib | Computer Science Senior at Carnegie Mellon University' />
      </Helmet> */}

      <HomePage />
    </BrowserRouter>
  );
}

export default App;
