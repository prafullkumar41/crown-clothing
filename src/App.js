import React from 'react';
import './App.css';
import { Route,Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {auth} from './firebase/firebase.utils';



class App extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      currentuser : null
    }

  }

unsubscribeFromAuth =null;  

componentDidMount (){
 this.unsubscribeFromAuth = auth.onAuthStateChanged( user => {
    this.setState({currentuser: user})
  });
}

componentWillUnmount() {
  this.unsubscribeFromAuth();
}



  render() {
    return (
      <div >
        <Header currentUser={this.state.currentuser} />
        <Switch>
          <Route exact path = '/' component={HomePage} />
          <Route  path = '/shop' component={ShopPage} />
          <Route  path = '/signin' component={SignInAndSignUp} />
        </Switch>
      </div>
    );
   }
  }



 
export default App;
