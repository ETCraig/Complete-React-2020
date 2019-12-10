import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/header/header.component';
import { HomePage } from './pages/homepage/homepage.component';
import SignInAndUpPage from './pages/sign-in-n-up/sign-in-n-up.component';
import ShopPage from './pages/shop/shop.component'
import { auth, createUserProfileDocument } from './firebase/firebasae.utils';

class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

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
          <Route exact path='/signIn' render={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndUpPage />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);