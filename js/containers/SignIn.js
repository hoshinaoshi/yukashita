import React, { Component, PropTypes } from 'react';
import { HashRouter, Route, Link, Redirect, withRouter} from 'react-router-dom'

// AWS
import awsConfig from "../utils/aws-config.js";
import {Config, CognitoIdentityCredentials} from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

import { Button, Grid, Row, Col, Glyphicon, Image } from 'react-bootstrap';

Config.region = awsConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: awsConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.UserPoolId,
  ClientId:   awsConfig.ClientId,
});

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      code: '',
      isLogin: false
    };
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    const authenticationData = {
      Username : this.state.email.trim(),
      Password : this.state.password.trim()
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);
    var userData = {
      Username : this.state.email.trim(),
      Pool : userPool
    };
    var cognitoUser = new CognitoUser(userData);
    var isLogin = false;
    const that = this;
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : 'staging_pool', // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-west-2.amazonaws.com/us-west-2_QbJcF2OZB' : result.getIdToken().getJwtToken()
                }
            });

            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();
            that.setState({isLogin: true})
            that.render

        },

        onFailure: function(err) {
            alert(err);
        },

    });
  }

  render() {
    if(this.state.isLogin){
      return(
        <Redirect to={{
          pathname: '/mypage'
        }}/>
      )
    } else {
      return (
        <Grid>
          <Row>
            <Col md={12}>
              <p>Use case 4. Authenticating a user and establishing a user session with the Amazon Cognito Identity service.</p>
            </Col>
            <Col md={12}>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text"
                       value={this.state.email}
                       placeholder="Email"
                       onChange={this.handleEmailChange.bind(this)}/>
                <input type="password"
                       value={this.state.password}
                       placeholder="Password"
                       onChange={this.handlePasswordChange.bind(this)}/>
                <input type="submit"/>
              </form>
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}
