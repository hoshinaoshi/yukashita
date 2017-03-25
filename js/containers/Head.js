import React, { Component, PropTypes } from 'react';
import { Helmet } from "react-helmet";

export default class Head extends Component {
  render() {
    return (
      <Helmet>
        <meta name="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="Content―Language" content="ja" />
        <meta name="Content―Style-Type" content="text/css" />
        <meta name="Content―Script-Type" content="text/javascript" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />

        <title>従量制のクラウドストレージ - ユカシタ</title>
        
        <meta name="keywords" content="従量制, ファイル,クラウド,効率,高速,大容量" />
        <meta name="description" content="ユカシタは実際に使用した分だけお支払いいただくクラウドストレージサービスです。ライセンスや複雑な契約がなく、シンプルな従量制です。容量も無制限>にご利用いただけます。" />

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
        <link rel="stylesheet" href="./dist/bundle.css" />
      </Helmet>
    )
  }
}
