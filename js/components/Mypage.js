import React, { Component, PropTypes } from 'react';

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

export default class Mypage extends React.Component {
  constructor() {
    super();
    this.state = {
      oldPassword: '',
      newPassword: ''
    };
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null){
    cognitoUser.getSession(function(err, sessresult) {
      if (sessresult) {
        console.log("login success")
        /*
        cognitoUser.signOut();
        cognitoUser.globalSignOut({
          onSuccess: function (result) {
            console.log("globalSignOut")
          }
        });
        */
      } else{
        console.log("login fail")
      }
    });
    }
    else{
      console.log("no user(sign out state)")
    }
  }

  handleOldPasswordChange(e) {
    this.setState({oldPassword: e.target.value})
    console.log(e.target.value)
  }
  handleNewPasswordChange(e) {
    this.setState({newPassword: e.target.value})
    console.log(e.target.value)
  }
  handleSetPassSubmit(e) {
    e.preventDefault();
    const cognitoUser = userPool.getCurrentUser();
    const oldPassword = this.state.oldPassword
    const newPassword = this.state.newPassword
    cognitoUser.getSession(function(err, sessresult) {
      cognitoUser.changePassword(oldPassword, newPassword, function(err, result) {
        if (err) {
          alert(err);
          return;
        }
        console.log('call result: ' + result);
      });
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <p>Use case 4. Authenticating a user and establishing a user session with the Amazon Cognito Identity service.</p>
            <p>Use case 15. Global signout for an authenticated user(invalidates all issued tokens).</p>
            <p>Use case 11. Changing the current password for an authenticated user.</p>
	    <form onSubmit={this.handleSetPassSubmit.bind(this)}>
	      <input type="password"
		     value={this.state.oldPassword}
		     placeholder="Old Password"
		     onChange={this.handleOldPasswordChange.bind(this)}/>
	      <input type="password"
		     value={this.state.newPassword}
		     placeholder="Nwe Password"
		     onChange={this.handleNewPasswordChange.bind(this)}/>
	      <input type="submit"/>
	    </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
