import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Modal, ModalHeader, ModalBody , Button } from "reactstrap";
import MainContainer from "../../components/Common/MainContainer";
import MyContainer from "../../components/Common/MyContainer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from 'classnames';
import { useHistory, useParams} from 'react-router';

const Schema = yup.object().shape({
    p_email: yup.string().email("invalid email").required(""),
    p_password: yup.string().required(""),
  });
  
const OuterLinkVideo = () => {
    const { handleSubmit, register, errors } = useForm({
        resolver: yupResolver(Schema),
      });
      const [open, isOpen] = useState(true)
      const [user, setUser] = useState("")
      let history = useHistory()
    let id = useParams()
    console.log("id" , id)
     
      let key2 = history.location.search.split("=")[1]
   const closeFun = () => {
       isOpen(!open)
   } 
   const getUser = (e) => {
    var regEx = /^[0-9a-zA-Z]+$/;
   setUser(e.target.value)
   
  }
  const enterVideo = () => {
    axios.get(`${baseUrl}/customers/getcalloauth?t=${key2}&name=${user}`)
.then((res) => {
 if(res.data.code === 1){
  history.push(`/customer/meetingouter/${res.data.result.scheduleid}`)
 }
})
    // localStorage.setItem("tlName", "Test")
    // localStorage.setItem("tlToken", "DJRAwniN")
    // localStorage.setItem("tlkey", "71")
    // localStorage.setItem("tlloginTime", "1655174600563")
    // localStorage.setItem("tlEmail", "test@gmail.com")
    
  }
    return (
     <>
         <MainContainer>
      
  
      <Header noSign="noSign"/>
      
       <MyContainer>
        <Modal isOpen={open} toggle={closeFun} size="md" scrollable>
            <ModalHeader  toggle={closeFun}>
Join Call
            </ModalHeader>
            <ModalBody>
           <form>
           <div className="form-group passForm ">


<label className="form-label">Name<span className="declined">*</span></label>
<input
  type="text"
  onChange={(e) => getUser(e)}
  name="p_user"

  placeholder="Enter User Id"
  className="form-control"
/>

</div>

<button type="button" onClick={() => enterVideo()} className="customBtn my-2">Submit</button>
           </form>
            </ModalBody>
        </Modal>
        </MyContainer>
        <Footer  />
        </MainContainer>
     </>
    )
}
export default OuterLinkVideo;