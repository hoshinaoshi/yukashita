import React, { Component, PropTypes } from 'react';
import { Button, Grid, Row, Col, Glyphicon, Image } from 'react-bootstrap';

export default class Promotion extends Component {
  render() {
    return (
      <Grid id="top-main-section">
        <Row className="top-icon center">
          <Col md={4}><Glyphicon glyph="apple" /></Col>
          <Col md={4}><Glyphicon glyph="resize-full" /></Col>
          <Col md={4}><Glyphicon glyph="usd" /></Col>
        </Row>
        <Row className="center">
          <Col md={4}><h2>シンプル</h2></Col>
          <Col md={4}><h2>無制限</h2></Col>
          <Col md={4}><h2>低コスト</h2></Col>
        </Row>
        <Row className="show-grid">
          <Col md={4}><p>シンプルな従量制です。契約の縛りや複雑なライセンスもありません。登録した直後から利用可能です。</p></Col>
          <Col md={4}><p>容量の制限がありません。必要な量のデータを保存し、必要なときにアクセスできます。</p></Col>
          <Col md={4}><p>1ヶ月1GBあたり5円で使用することができます。解約料もありません。</p></Col>
        </Row>
      </Grid>
    );
  }
}
