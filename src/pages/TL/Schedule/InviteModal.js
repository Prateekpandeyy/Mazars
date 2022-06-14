import React, {useState} from 'react';

import { Modal, ModalHeader, ModalBody , Button } from "reactstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from 'classnames';
import { useHistory } from 'react-router';
const Schema = yup.object().shape({
    p_email: yup.string().email("invalid email").required(""),
    p_password: yup.string().required(""),
  });
  
const InviteModal = ({invite, showInvite, inviteData}) => {
    const { handleSubmit, register, errors } = useForm({
        resolver: yupResolver(Schema),
      });
      const [open, isOpen] = useState(true)
      const [user, setUser] = useState("")
      let history = useHistory()
   const closeFun = () => {
       isOpen(!open)
   } 
   const getUser = (e) => {
    var regEx = /^[0-9a-zA-Z]+$/;
    if(e.target.value.match(regEx)){
      setUser(e.target.value.toUpperCase())
    }
    else{
      setUser("")
    }
   
  }
 
    return (
     <>
         
        <Modal isOpen={invite} toggle={showInvite} size="md" scrollable>
            <ModalHeader  toggle={showInvite}>
Join Call
            </ModalHeader>
            <ModalBody>
           <form>
           <div className="form-group passForm ">


<label className="form-label">Id<span className="declined">*</span></label>
<input
  type="text"
  onChange={(e) => getUser(e)}
  defaultValue = {inviteData.id}
  name="p_user"
  ref={register({ required: true })}
  placeholder="Enter User Id"
  className={classNames("form-control", {
    "is-invalid": errors.p_user 
  })}
/>

</div>
<button className="customBtn my-2">Submit</button>
           </form>
            </ModalBody>
        </Modal>
      
     </>
    )
}
export default InviteModal;