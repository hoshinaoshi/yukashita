import React, { Component, PropTypes } from 'react';
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
      <div>
        <Header />
        <SignUp />
        <SignIn />
        <Mypage />
        <MainSection />
        <Register />
        <Footer />
      </div>
    );
  }
}
