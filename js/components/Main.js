import React, { Component, PropTypes } from 'react';
import { HashRouter, Route, Link} from 'react-router-dom'

import { Button, Grid, Row, Col, Jumbotron, Glyphicon, Image, Collapse, Modal } from 'react-bootstrap';

export default class Header extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      open: false
    };
  }
  render() {
    return (
      <Jumbotron>
        <Grid>
          <Row className="show-grid">
            <Col md={12}>
              <h1>ユカシタ</h1>
              <p>実際に使用した分だけお支払いいただくクラウドストレージサービスです。</p>
              <Link to="/signup">
                <Button>今すぐ始める</Button>
              </Link>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
    );
  }
}
