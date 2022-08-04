import React, {useState, useEffect} from 'react';
import { Grid, Box, Container} from '@material-ui/core';
import {useForm} from 'react-hook-form';
import { useHistory} from 'react-router-dom';
import mazars from "../../assets/images/mazars-logo.png";
import style from './QueryStyle.module.css';
import Header from "../../components/Header/Header";
import axios from 'axios';
import { baseUrl, baseUrl3 } from "../../config/config";
import Swal from 'sweetalert2';
import classNames from 'classnames';
import Footer from './../../components/Footer/Footer';
import { yupResolver } from "@hookform/resolvers/yup";
import { OuterloginContainer } from '../../components/Common/OuterloginContainer';
import * as yup from "yup";
import {Markup} from 'interweave';

const Schema = yup.object().shape({
    p_email: yup.string().email("invalid email").required(""),
    p_name: yup.string().required(""),
    p_message: yup.string().required(""),
    p_info: yup.string().required(""),
    acceptTerms: yup.bool()
    .oneOf([true], 'Accept Ts & Cs is required')
  });
const QueryContact = () => {
    const [check, setCheck] = useState(true)
    const [cpatcha, setCaptcha] = useState("")
    const [captchValue, setCaptchValue] = useState("")
    let history = useHistory()
    const { handleSubmit, register, errors } = useForm(
        {
            resolver: yupResolver(Schema),
        }
    );
    const resendCaptcha = () => {
        axios.get(`${baseUrl}/customers/crateauo`)
.then((res) => {
    setCaptcha(res.data.result)
    
})
    }
    useEffect(() => {
resendCaptcha()
    }, [])
    
    const onSubmit = (value) => {
        console.log("data", value.p_info)
        let formData = new FormData();
        formData.append("enquiry_type", value.p_info);
        formData.append("name", value.p_name);
        formData.append("email", value.p_email);
        formData.append("message", value.p_message);
        formData.append("captcha", captchValue)
     axios({
         method :"POST",
         url : `${baseUrl}/customers/enquirysubmit`,
         data : formData
     })   
     .then((res) => {
         console.log("response", res)
         if(res.data.code === 1){
             Swal.fire({
                 title : "success",
                 html : "Your enquiry submitted successfully, our team will contact you soon",
                 icon : "success"
             })
             history.push("/")
         }
         else{
             Swal.fire({
                 title : "error",
                 html :"Something went wrong, please try again",
                 icon : "error"
             })
         }
     })
    }
    return (
        <>

<OuterloginContainer>
<Header noSign="noSign"/>

                       
<Container maxWidth="md">
    <Grid container justify="center">
        <Grid item lg={12} sm={12}>

       
             <form onSubmit={handleSubmit(onSubmit)}>
             <Grid item lg={12}>
                   <Box className={style.myFormBox}>
                   <label className = {style.formFieldLegend}>
                   MAS Enquiry Form
                   </label>
                  
                  <select 
                     ref={register}
                     name="p_info"
                     className={classNames(`form-control ${style.mySelectBox}`, {
                        "is-invalid": errors.p_info,
                      })}>
                         
                      <option value="General enquiries - MAS">General enquiries - MAS </option>
                      <option value="Business Advisory Services - MAS">Business Advisory Services - MAS </option>
                  </select>
                   </Box>
                  </Grid> 
                  <Grid item lg={12}>
                  <Box className={style.myFormBox}>
                  <input 
                    type = "text" 
                    name = "p_name"
                     ref={register}
                 placeholder = "Type here your name"
                 className={classNames(`form-control ${style.myNameBox}`, {
                    "is-invalid": errors.p_name,
                  })}
               />
                      </Box>
                
                  </Grid> 
                  <Grid item lg={12}>
                  <Box className={style.myFormBox}>
                  <input 
                     ref={register}
                     name = "p_email"
                 placeholder = "Type here your e-mail address"
                 className={classNames(`form-control ${style.myNameBox}`, {
                     "is-invalid" : errors.p_email
                 })}
                 type = "text" />
                      </Box>
                
                  </Grid>  
                  <Grid item lg={12}>
                   <Box className={style.myFormBox}>
                   <label className = {style.formFieldLegend}>
                Your message*

                   </label>
                 <textarea 
                    ref={register}
                    name = "p_message"
                 placeholder="Type your message here"
                 className={classNames(`form-control ${style.formTextArea}`,
                 {
                     "is-invalid" : errors.p_message
                 })}>

                 </textarea>
                   </Box>
                  </Grid> 
                  <Grid item lg={12}>
                   <Box className={style.myFormBox}>
                   <div className="form-check">
<input  
type="checkbox"
id="flexCheckDefault"
ref={register}
name="acceptTerms" 
onChange={(e) => setCheck(!check)}
className={classNames(`form-check-input`,
                 {
                     "mainCheckBox" : errors.acceptTerms 
                 })} />
              
<label className = {style.formChoice} for="flexCheckDefault">
I accept that MAS will process my personal data for the purpose of handling my request.
</label>

</div>
<div style={{display : "flex", maxWidth : "500px", width : "100%", justifyContent : "space-between"}}>
<img src = {`${baseUrl3}/${cpatcha}`} />
<input type="text" value = {captchValue} onChange = {(e) => setCaptchValue(e.target.value)} />
    <a onClick = {() => resendCaptcha()} style={{color : "#0071ce", margin : "auto 0px"}}>Resend</a>
    </div>        </Box>
                  </Grid>
                  <Grid item lg={12}>
                   <Box className={style.myFormBox}>
              <button type="submit" className={style.formButton}>Send</button>
                   </Box>
                  </Grid> 
             </form>
           
        </Grid>
        
    </Grid>
   
</Container>
<Footer />
</OuterloginContainer>
        </>
    )
}
export default QueryContact;