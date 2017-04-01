import React, { Component, PropTypes } from 'react';

import Main from '../components/Main';
import Promotion from '../components/Promotion';
import Register from '../components/Register';

export default class Top extends Component {

  render() {
    return (
      <div>
        <Main />
        <Promotion />
        <Register />
      </div>
    );
  }
}
