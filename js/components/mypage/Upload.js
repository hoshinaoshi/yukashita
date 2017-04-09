import React, { Component, PropTypes } from 'react';
import { HashRouter, Route, Link} from 'react-router-dom'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import request from 'superagent';
import { Button, Grid, Row, Col, Jumbotron, Glyphicon, Image, Collapse, Modal } from 'react-bootstrap';

export default class Upload extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      files: []
    };
  }

  onOpenClick() {
    this.dropzone.open();
  }

  handleDropAccepted(acceptedFiles){
    acceptedFiles.forEach((file)=> {
      /*
      axios.post('https://dzdvd4im60.execute-api.us-west-2.amazonaws.com/dev/upload', file)
      var formData = new FormData();
      formData.append('file', file);
      */
      request.post("https://dzdvd4im60.execute-api.us-west-2.amazonaws.com/dev/upload")
        .attach(file.name, file)
        .set('Accept', 'image/jpeg')
        .set('Content-type', 'image/jpeg')
	.end(function(err, res) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log(res.status);
	  }
	});
    });
  }
  handleDropRejected(rejectedFiles){
    //var req = request.post('/upload');
    rejectedFiles.forEach((file)=> {
      alert("r")
      //req.attach(file.name, file);
    });
    //req.end(callback);
  }

  render() {
    return (
      <Grid>
        <Row className="top-register-row">
          <Col md={12}>
            <Dropzone
              onDropAccepted={this.handleDropAccepted}
              onDropRejected={this.handleDropRejected}
              accept="image/gif,image/jpeg,image/png,image/jpg" >
                <span>
                  <p>ファイルを指定してドラッグ&ドロップしてください</p>
                  <p>形式: gif/png/jpeg/jpg</p>
                </span>
            </Dropzone>
            <Button type="button" onClick={this.onOpenClick}>今すぐ始める</Button>
	    {
              this.state.files.length > 0 ? 
                <div>
	          <h2>Uploading {this.state.files.length} files...</h2>
	          <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
	        </div>
              : null
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}
