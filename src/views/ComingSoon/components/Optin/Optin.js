import React, { Component , useState} from "react";
import "./Optin.css";
import { Modal, ModalHeader, ModalBody , Button } from "reactstrap";
class Optin extends Component {
    constructor(props){
        this.state = {
            isOpen : false
        }
    }
  modal() {
    this.setState({
        isOpen : !isOpen
    })
  }

  render() {
    return (
      <div className="optin">
        <p>Want to be the first to know when we launch?</p>
        <button onClick={() => this.modal()}>Click Me</button>
        <div id="modal">
          <div className="wrapper">
            <h3>Enter Your Email</h3>
            <div className="clearfix">
              <div className="col-8" />
              <div className="col-3" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Optin;
