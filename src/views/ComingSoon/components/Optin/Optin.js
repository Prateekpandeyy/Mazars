import React, { Component , useState} from "react";
import "./Optin.css";
import { Modal, ModalHeader, ModalBody , Button } from "reactstrap";
import { Spinner } from "reactstrap";
import classNames from "classnames";
class Optin extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen : false,
            loading : false,
            email : "",
            emailError : false
        }
       
    }
 
  modal() {
      console.log("click modal")
    this.setState({
        isOpen : !this.state.isOpen
    })
  }
gotoWeb () {
if(this.state.email.length > 1){
    this.setState({
        emailError : false
    })
    window.location.hash = "/"

}
else{
    this.setState({
        emailError : true
    })
    return false
}
}
emailFun (e) {
    this.setState({
        email : e.target.value,
        emailError : false
    })
    
}
  render() {
    return (
      <div className="optin">
        <p>Want to be the first to know when we launch?</p>
        <button onClick={() => this.modal()} id="clickModal">Click Me</button>
     
         <Modal isOpen={this.state.isOpen} toggle={this.modal} >
         <ModalHeader>Discussion</ModalHeader>
         <ModalBody>
           <form>
             <div className="mb-3">
             <input
             type="email"
                className={classNames("form-control", {
                  "is-invalid": this.state.emailError,
                })}
              onChange = {(e) => this.emailFun(e) }
                rows="4"
                name="p_chat"
               
                placeholder="enter email here"
              />
             </div>
             <div class="modal-footer">
               {
                 this.state.loading ?
                   <Spinner color="primary" />
                   :
                   <div>
                     <button type="button" onClick = {() => this.gotoWeb()} className="customBtn">
                       Submit
                     </button>
                     <button className="dangerBtn ml-2" type="button" onClick={() => this.modal()}>Cancel</button>
                   </div>
               }
             </div>
           </form>
         </ModalBody>
       </Modal >

        {/* <div id="modal">
          <div className="wrapper">
            <h3>Enter Your Email</h3>
            <div className="clearfix">
              <div className="col-8" />
              <div className="col-3" />
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Optin;
