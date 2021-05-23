import React, { FC } from 'react';
import './components/styles/main.scss';
import { BrowserRouter, Switch } from 'react-router-dom';

import './firebase/config'

import HomePage from './components/pages/HomePage'

const App : FC = () =>
{
  return (
    <BrowserRouter>
        <HomePage />
    </BrowserRouter>
  );
}

export default App;
