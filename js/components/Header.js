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
            <Button bsStyle="success" href="https://docs.google.com/forms/d/e/1FAIpQLSfERmTjXCQzTZqaY2ruWH4bhlBGWGujcShOATXPKvxDwdqZxw/viewform?c=0&w=1">事前登録する<Glyphicon glyph="envelope" /></Button>
          </Col>
	</Row>
      </Grid>
    );
  }
}
