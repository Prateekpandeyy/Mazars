import React, {useState, useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter  } from "reactstrap";
import { useForm ,  useFieldArray } from "react-hook-form";
import * as yup from "yup";
import classNames from 'classnames';
import { useHistory } from 'react-router';
import {Button} from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import { baseUrl } from "../../../config/config";
import Swal from 'sweetalert2';
import Select from 'react-select';
const Schema = yup.object().shape({
    p_email: yup.string().email("invalid email").required(""),
    p_password: yup.string().required(""),
  });
  
const InviteModal = ({invite, showInvite, inviteData}) => {
  const [particiapnts, setParticipants] = useState([])
  const [allParticipants, setAllParticipants] = useState([])
  const [error, setError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [user, setUser] = useState("")
  const [client, setClient] = useState([])
  const [part, setPart] = useState([])
  const [estate, setEstate] = useState("");
  const token = window.localStorage.getItem("tlToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
    const { handleSubmit, register, errors, reset, getValues, control } = useForm({
        defaultValues: {
          p_email: [{ p_email: "" }],
        },
      });
      const { append, remove, fields} = useFieldArray({
        control,
        name: "p_email",
      });
     useEffect(() => {
getClient()
     }, [inviteData])
     
     const getClient = () => {
      console.log("done")
      let collectData = []
      axios.get(
        `${baseUrl}/tl/querycustomers?query_id=${inviteData.question_id}`, myConfig
      )
      .then((res) => {
        let email = {}
        console.log("response", res)
        res.data.result.map((i) => {
          console.log("iii", i)
          email = {
            label : i.email,
            value : i.email
          }
          collectData.push(email)
          
        })
        console.log("data", collectData)
        setClient(collectData)
      })
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
 const getParticiapnts = (e) => {
   setEmailError(false)
   setError(false)
   setParticipants(e.value)
   setPart(e)
 }
const addParticipants = () => {
 
   if(particiapnts.length > 0 && estate.length === 0 && emailError === false){
    setParticipants([])
   
    setAllParticipants((oldData) => {
      return [...oldData, particiapnts]
    })
   }
   else if(particiapnts.length === 0 && estate.length > 0 && emailError === false){
    setParticipants([])
   
    setAllParticipants((oldData) => {
      return [...oldData, estate]
    })
   }
   else if(particiapnts.length === 0 && emailError === false) {
     setError(true)
   }
 }
 const delUser = (id) => {
  
let kp = allParticipants.filter((data, key) => {
  return key !== id
})
setAllParticipants(kp)
 }
 const validateEmail = (e) => {
  var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (particiapnts.length > 0 && particiapnts.match(validRegex)) {
    
  }
  else{
    setEmailError(true)
  }
 }
 
 const onSubmit = (data) => {
   let formData = new FormData();
   formData.append("scheduleid", inviteData.id);
   formData.append("question_id", inviteData.question_id);
   formData.append("invite_email", allParticipants)
   axios({
     method : "POST", 
     url : `${baseUrl}/tl/invitecall`,
     headers : {
       uit : token
     },
     data : formData
   })
   .then((res) => {
     
     if(res.data.code === 1){
Swal.fire({
  title : "success",
  message : "Participants added successfully",
  icon : "success"
})
     }
     else{
      Swal.fire({
        title : "error",
        message : "Something went wrong , please try again",
        icon : "error"
      })
     }
   })
 }
 const getStateValue = (input, reason) => {
  if (
    reason.action === "set-value" ||
    reason.action === "input-blur" ||
    reason.action === "menu-close"
  ) {
    return;
  }

 setEstate(input)
}


    return (
     <>
         
        <Modal isOpen={invite} toggle={showInvite} size="md" scrollable>
            <ModalHeader  toggle={showInvite}>
            Invite Participants
            </ModalHeader>
            <ModalBody>
              <h4>{inviteData.title} </h4>
            <h6><b>From </b> {inviteData.startDate} <b>To </b> {inviteData.endDate}</h6>
           <form onSubmit={handleSubmit(onSubmit)}>
          
<div className="row">
<div className="col-md-12">
<label className="form-label">Emails</label>
  </div>
  {/* <div className="col-md-8">
 
  <input
  type="text"
value={particiapnts}
 onChange={(e) => getParticiapnts(e)}
 onBlur = {(e) => validateEmail(e)}
  ref={register({ required: true })}
  placeholder="Enter User Id"
  className={classNames("form-control", {
    "is-invalid" : error || emailError
  })}
/>
{error === true ?
<p className="declined"> Please enter Email id</p> : ""}
{
  emailError === true ?
  <p className="declined"> Please enter valid email</p> : ""
}
    </div> */}
    <div className="col-md-8">
    <Select
  isMulti={false}
        options={client}
        inputValue={estate}
        onInputChange={getStateValue}
        onChange={(e) => getParticiapnts(e)}
        closeMenuOnSelect={true}
        onSelectResetsInput={false}
        blurInputOnSelect={false}
       value={part}
      />
     
      </div>
    <div className="col-md-4 mb-4">
      <Button variant="contained" onClick={() => addParticipants()}>
        <AddIcon />
      </Button>
      </div>
  </div>
 {
   allParticipants?.map((i, e) => (
    <div className="row" key = {e}
    id={e}>
    <div className="col-md-8 mb-2">
    <p>
    {i}
    </p>
      </div>
      <div className="col-md-4">
      <Button variant="contained" onClick={(d) => delUser(e)}>
     <span>
     <RemoveIcon />
     </span>
      </Button>
        </div>
    </div>
   ))
 }
<button className="customBtn my-2">Submit</button>
           </form>
           
            </ModalBody>
           
        </Modal>
      
     </>
    )
}
export default InviteModal;