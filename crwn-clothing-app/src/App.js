import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import Header from './components/header/header.component';
import { HomePage } from './pages/homepage/homepage.component';
import SignInAndUpPage from './pages/sign-in-n-up/sign-in-n-up.component';
import ShopPage from './pages/shop/shop.component'
import { auth, createUserProfileDocument } from './firebase/firebasae.utils';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
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
          <Route path='/signIn' component={SignInAndUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
