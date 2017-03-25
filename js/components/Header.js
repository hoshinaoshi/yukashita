import React, { Component, PropTypes } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <div className="bs-docs-header">
        <div className="container top-header-image">
          <h1>ユカシタ</h1>
          <p>実際に使用した分だけお支払いいただくクラウドストレージサービスです。</p>
          <p><Button bsStyle="success">事前登録する</Button></p>
        </div>
      </div>
    );
  }
}
