import React , {useState} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter  } from "reactstrap";
import { useForm, useFieldArray } from "react-hook-form";
import classNames from "classnames";
import { baseUrl } from '../../config/config';
import Swal from 'sweetalert2';
import axios from 'axios';
const AddModal = ({addEmailFun, addEmail, addedEmail, token, getData}) => {
   const [email, setEmail] = useState("")
   const [emailError, setEmailError] = useState(null)
   const [wEmail, setWemail] = useState();
   const [valiEmail, setValiemail] = useState(null)
   const [invalid, setInvalid] = useState(null)
  const { handleSubmit, register, errors, reset, getValues, control } = useForm();
 
  const emailHandler = (e) => {
    console.log("eee", e.target.value)
    setEmail(e.target.value)
        if (e.target.value.length < 1) {
            setWemail("")
        }
      };
  const onSubmit = (value) => {
      let formData = new FormData()
    formData.append("email", email);
    axios({
       
        method: "POST",
        url : `${baseUrl}/customers/addoptionalemail`,
          headers : {
             uit : token
         },
        data: formData,
    })
    .then((res) => {
        addEmailFun()
        if(res.data.code === 1){
            Swal.fire({
                title : "success",
                html : "email added successfully",
                icon : "success"
            })
        }
        else if (res.data.code === 0){
            Swal.fire({
                title : "error",
                html : `${res.data.message}`,
                icon : "error"
            })
        }
        getData()
    })
  }
  const emailValidation = (key) => {

    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.length > 0 && email.match(validRegex)) {
       setWemail("");
       setEmailError(false)
    }
    else {
       setEmailError(true)
       setWemail("invalid email")
      }
}
    return(
        <Modal isOpen={addEmail} toggle={addEmailFun} size="sm">
            <ModalHeader toggle={addEmailFun}>
            <h4>Add Email</h4>
            </ModalHeader>
            <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">    
            <div className="row">
                      <div className="col-lg-12">
                      
                        <label className="form-label">
                        Secondary Email 
                        </label>
                      
                        
                     
                      <input
                        type="email"
                        maxLength = "100"
                        name="p_email"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_email 
                        })}
                    value = {email}
                         onChange={(e) => emailHandler(e)}
                        onBlur={(e) => emailValidation(e)}
                        placeholder="Enter Your Email"
                        ref={register({ required: true })}
                      />
                    
                    {
    wEmail ? <p className="declined">{wEmail}</p> : <>
      {valiEmail ?
        <p className="completed">
          {valiEmail}
        </p>
        :
        <p className="declined">{invalid}</p>}
    </>
  }

                        </div>
                      </div>
                      <button className="customBtn" type="submit">
                          Add
                        </button>
                      </form>
            </ModalBody>
        </Modal>
    )
}
export default AddModal;