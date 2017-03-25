import React, { Component, PropTypes } from 'react';
import { Button, Grid, Row, Col, Glyphicon, Image } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <Grid>
	<Row className="show-grid">
	  <Col md={12}>
            <h1>ユカシタ</h1>
            <p>実際に使用した分だけお支払いいただくクラウドストレージサービスです。</p>
            <Button bsStyle="success">事前登録する<Glyphicon glyph="envelope" /></Button>
          </Col>
	</Row>
      </Grid>
    );
  }
}
