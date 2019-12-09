import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import Header from './components/header/header.component';
import { HomePage } from './pages/homepage/homepage.component';
import SignInAndUpPage from './pages/sign-in-n-up/sign-in-n-up.component';
import ShopPage from './pages/shop/shop.component'

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signIn' component={SignInAndUpPage} />
      </Switch>
    </div>
  );
}

export default App;
