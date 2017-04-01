import React, { Component, PropTypes } from 'react';
import { Button, Grid, Row, Col, Glyphicon, Image, Jumbotron } from 'react-bootstrap';

export default class Footer extends Component {
  render() {
    return (
      <Jumbotron id="footer">
        <p className="center">&copy;<Button bsStyle="link" href="http://blog.naoshihoshi.com/" target="_blank">NaoshiHoshi.</Button> All Rights Reserved.</p>
      </Jumbotron>
    );
  }
}
