import React, { Component, PropTypes } from 'react';
import { Button, Grid, Row, Col, Jumbotron, Glyphicon, Image, Collapse, Modal } from 'react-bootstrap';
import SignUpButton from './SignUpButton';

export default class Header extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    return (
      <Jumbotron>
      <Grid>
	<Row className="show-grid">
	  <Col md={12}>
            <h1>ユカシタ</h1>
            <p>実際に使用した分だけお支払いいただくクラウドストレージサービスです。</p>
            <SignUpButton />
          </Col>
	</Row>
      </Grid>
      </Jumbotron>
    );
  }
}
