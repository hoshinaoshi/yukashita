import React, { Component, PropTypes } from 'react';
import { HashRouter, Route, Link, Redirect, withRouter} from 'react-router-dom'
import Upload from '../components/mypage/Upload';
import request from 'superagent';

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
      newPassword: '',
      isLogin: false,
      isLoading: true
    };
  }

  componentDidMount(){
    var that = this
    var token = ""
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null){
      cognitoUser.getSession(function(err, sessresult) {
        if (sessresult) {
          console.log("login success")
          console.log("access token: " + sessresult.accessToken.jwtToken)
          console.log("id token: " + sessresult.idToken.jwtToken)
          token = sessresult.accessToken.jwtToken
          /*
          //cognitoUser.signOut();
          cognitoUser.globalSignOut({
            onSuccess: function (result) {
              console.log("globalSignOut")
            },
            onFailure: function(err) {
                alert(err);
            }
          });
          */
          that.setState({isLogin: true})
          that.setState({isLoading: false})
          that.render
        } else{
          console.log("login fail")
          that.setState({isLogin: false})
          that.setState({isLoading: false})
          that.render
        }
      });
    }
    else{
      console.log("no user(sign out state)");
      this.setState({isLogin: false})
      this.setState({isLoading: false})
      this.render
    }
    console.log("invoke start")
    /*
        request.get("https://dzdvd4im60.execute-api.us-west-2.amazonaws.com/dev/hello")
          .set('Authorization', token)
          .send(
            {
              name: "NaoshiHoshi",
            }
          )
          .end(function(err, res) {
            if (err) {
              console.log(err);
            } else {
              console.log(res.status);
            }
          });
          */
    console.log("invoke end")
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
  };

  render() {
    if(this.state.isLoading){
      return(<p>ローディング中</p>)
    }
    if (this.state.isLogin) {
      return(
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
          <Row>
            <Col md={12}>
              <Upload />
            </Col>
          </Row>
        </Grid>
      );
    } else {
      return(
        <Redirect to={{
          pathname: '/signin',
          state: { from: "/mypage" }
        }}/>
      );
    }
  }
}
