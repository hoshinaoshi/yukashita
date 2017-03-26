import React, { Component, PropTypes } from 'react';

// AWS
import awsConfig from "../utils/aws-config.js";
import {Config, CognitoIdentityCredentials} from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from "amazon-cognito-identity-js";

import { Button, Grid, Row, Col, Glyphicon, Image } from 'react-bootstrap';

Config.region = awsConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: awsConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.UserPoolId,
  ClientId:   awsConfig.ClientId,
});

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      code: ''
    };
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  
  handleCodeChange(e) {
    this.setState({code: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    ];
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('user name is ' + result.user.getUsername());
      console.log('call result: ' + result);
    });
  }

  handleCodeSubmit(e) {
    e.preventDefault();
    const code = this.state.code.trim();
    var userData = {
      Username : 'hoshinaoshi@gmail.com',
      Pool : userPool
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      console.log('call result: ' + result);
    });
  }
  
  handleResendingSubmit(e) {
    e.preventDefault();
    const code = this.state.code.trim();
    var userData = {
      Username : 'hoshinaoshi@gmail.com',
      Pool : userPool
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      console.log('call result: ' + result);
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <p>Use case 1. Registering a user with the application. One needs to create a CognitoUserPool object by providing a UserPoolId and a ClientId and signing up by using a username, password, attribute list, and validation data.</p>
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
        <Row>
          <p>Use case 2. Confirming a registered, unauthenticated user using a confirmation code received via SMS.</p>
          <Col md={12}>
	    <form onSubmit={this.handleCodeSubmit.bind(this)}>
	      <input type="text"
		     value={this.state.code}
		     placeholder="code"
		     onChange={this.handleCodeChange.bind(this)}/>
	      <input type="submit"/>
	    </form>
          </Col>
        </Row>
        <Row>
	  <p>Use case 3. Resending a confirmation code via SMS for confirming registration for a unauthenticated user.</p>
          <Col md={12}>
	    <form onSubmit={this.handleResendingSubmit.bind(this)}>
	      <input type="submit"/>
	    </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
