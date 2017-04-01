import React, { Component, PropTypes } from 'react';
import { HashRouter, Route, Link, NavLink} from 'react-router-dom'
import { Button, Grid, Row, Col, Glyphicon, Image, Jumbotron, Collapse, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <Jumbotron id="header">
        <Grid>
          <Row className="show-grid">
            <Col md={1}>Yukashita</Col>
            <Col mdOffset={9} md={1}><Link to="/signin">SignIn</Link></Col>
            <Col md={1}><Link to="/signup">SignUp</Link></Col>
          </Row>
        </Grid>
      </Jumbotron>
    );
  }
}
