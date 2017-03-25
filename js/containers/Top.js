import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import Register from '../components/Register';
import Footer from '../components/Footer';

export default class Top extends Component {
  render() {
    return (
      <div>
        <Header />
        <MainSection />
        <Register />
        <Footer />
      </div>
    );
  }
}
