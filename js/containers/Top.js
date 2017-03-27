import React, { Component, PropTypes } from 'react';
import { HashRouter, Route, Link} from 'react-router-dom'

import Header from '../components/Header';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import Mypage from '../components/Mypage';
import MainSection from '../components/MainSection';
import Register from '../components/Register';
import Footer from '../components/Footer';

export default class Top extends Component {

  render() {
    return (
      <HashRouter basename="/">
        <div>
          <Header />
          <Link to="/signup">SignUpa</Link>
          <Route exact path="/signup" component={SignUp}/>
          <SignIn />
          <Mypage />
          <MainSection />
          <Register />
          <Footer />
        </div>
      </HashRouter>
    );
  }
}
