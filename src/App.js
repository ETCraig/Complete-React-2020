import React, { useEffect } from 'react';
import './App.css';

import CheckoutPage from './pages/checkout/checkout.component';
import { checkUserSession } from './redux/user/user.actions';
import Header from './components/header/header.component';
import { HomePage } from './pages/homepage/homepage.component';
import { selectCurrentUser } from './redux/user/user.selector';
import ShopPage from './pages/shop/shop.component'
import SignInAndUpPage from './pages/sign-in-n-up/sign-in-n-up.component';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Redirect, Switch } from 'react-router-dom';

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signIn' render={() => currentUser ? <Redirect to='/' /> : <SignInAndUpPage />} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);