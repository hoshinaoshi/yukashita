import React, { Component, PropTypes } from 'react';
import { Button, Grid, Row, Col, Glyphicon, Image } from 'react-bootstrap';

export default class Footer extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}><p>&copy;<Button bsStyle="link" href="http://blog.naoshihoshi.com/" target="_blank">NaoshiHoshi.</Button> All Rights Reserved.</p></Col>
        </Row>
      </Grid>
    );
  }
}
