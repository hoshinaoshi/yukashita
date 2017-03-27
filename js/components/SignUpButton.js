import React, { Component, PropTypes } from 'react';
import { Button, Collapse, Modal } from 'react-bootstrap';

export default class SignUpButton extends Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Button onClick={()=> this.setState({ open: !this.state.open })}>今すぐ始める</Button>
        <Collapse in={this.state.open}>
          <div className="static-modal">
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                One fine body...
              </Modal.Body>

              <Modal.Footer>
                <Button>Close</Button>
                <Button bsStyle="primary">Save changes</Button>
              </Modal.Footer>

            </Modal.Dialog>
          </div>
        </Collapse>
      </div>
    );
  }
}
