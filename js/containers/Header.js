import React, { Component, PropTypes } from 'react';
import { HashRouter, Route, Link, NavLink} from 'react-router-dom'
import { Button, Grid, Row, Col, Glyphicon, Image, Jumbotron, Collapse, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <Jumbotron id="header">
        <Grid>
          <Row className="show-grid">
            <Col md={1}>SmartShot</Col>
            <Col mdOffset={9} md={1}><Link to="/mypage">マイページ</Link></Col>
            <Col md={1}><Link to="/signup">会員登録</Link></Col>
          </Row>
        </Grid>
      </Jumbotron>
    );
  }
}
