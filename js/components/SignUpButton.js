import React, { Component, PropTypes } from 'react';

// AWS
import awsConfig from "../utils/aws-config.js";
import {Config, CognitoIdentityCredentials} from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";

import { Button, Grid, Row, Col, Glyphicon, Image, Collapse, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

Config.region = awsConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: awsConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.UserPoolId,
  ClientId:   awsConfig.ClientId,
});

export default class SignUpButton extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      email: '',
      password: '',
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

  FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
	<ControlLabel>{label}</ControlLabel>
	<FormControl {...props} />
	{help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }
  render() {
    return (
      <div>
        <Button onClick={()=> this.setState({ open: !this.state.open })}>今すぐ始める</Button>
        <Collapse in={this.state.open}>
          <div className="static-modal">
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>会員登録</Modal.Title>
              </Modal.Header>

              <form onSubmit={this.handleSubmit.bind(this)}>
                <Modal.Body>
                    <this.FieldGroup
                      id="formControlsEmail"
                      type="email"
                      label="Email address"
                      value={this.state.email}
                      placeholder="メールアドレス"
                      onChange={this.handleEmailChange.bind(this)}
                    />
                    <this.FieldGroup
                      id="formControlsPassword"
                      label="Password"
                      value={this.state.password}
                      type="password"
                      placeholder="パスワード"
                      onChange={this.handlePasswordChange.bind(this)}
                    />
                </Modal.Body>

                <Modal.Footer>
                  <Button>キャンセル</Button>
                  <Button type="submit" bsStyle="primary">登録</Button>
                </Modal.Footer>
              </form>

            </Modal.Dialog>
          </div>
        </Collapse>
      </div>
    );
  }
}
