import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link} from 'react-router-dom'

import Head from './containers/Head';
import Header from './containers/Header';
import Footer from './containers/Footer';
import Top from './containers/Top';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import Mypage from './containers/Mypage';

ReactDOM.render(
  <HashRouter basename="/">
    <div>
      <Head />
      <Header />
      <Route exact path="/" component={Top}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/mypage" component={Mypage}/>
      <Footer />
    </div>
  </HashRouter>,
  document.getElementById('main')
);
