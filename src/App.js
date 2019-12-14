import React, { Component } from 'react';
import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebasae.utils';
import CheckoutPage from './pages/checkout/checkout.component';
import { connect } from 'react-redux';
import Header from './components/header/header.component';
import { HomePage } from './pages/homepage/homepage.component';
import { selectCurrentUser } from './redux/user/user.selector';
import { setCurrentUser } from './redux/user/user.actions';
import ShopPage from './pages/shop/shop.component'
import SignInAndUpPage from './pages/sign-in-n-up/sign-in-n-up.component';

import { createStructuredSelector } from 'reselect';
import { Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signIn' render={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndUpPage />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);