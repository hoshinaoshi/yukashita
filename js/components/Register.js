import React, { Component, PropTypes } from 'react';
import { HashRouter, Route, Link} from 'react-router-dom'
import { Button, Grid, Row, Col, Jumbotron, Glyphicon, Image, Collapse, Modal } from 'react-bootstrap';

export default class Register extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    return (
      <Grid>
        <Row className="top-register-row">
          <Col md={4}>
            <Image src="./dist/images/register.jpg" responsive />
          </Col>
          <Col md={8}>
            <h2>使用した分だけ支払う従量制</h2>
            <p>ユカシタは、使用した分だけ支払う従量制のクラウドストレージです。複雑なライセンスや、契約の縛りもありません。1GBあたり5円で、容量の制限もなくご利用できます</p>
          </Col>
        </Row>
        <Row className="top-register-row center">
          <Col md={12}>
            <Link to="/signup">
              <Button>今すぐ始める</Button>
            </Link>
          </Col>
        </Row>
      </Grid>
    );
  }
}
