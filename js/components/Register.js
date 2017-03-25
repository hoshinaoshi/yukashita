import React, { Component, PropTypes } from 'react';
import { Button, Grid, Row, Col, Glyphicon, Image } from 'react-bootstrap';

export default class Register extends Component {
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
          <Col md={12}><p className="center">事前登録受付中！申し込みは下記のボタンから</p></Col>
          <Col md={12}>
            <Button bsStyle="success" href="https://docs.google.com/forms/d/e/1FAIpQLSfERmTjXCQzTZqaY2ruWH4bhlBGWGujcShOATXPKvxDwdqZxw/viewform?c=0&w=1">事前登録する<Glyphicon glyph="envelope" /></Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}
