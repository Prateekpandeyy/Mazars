import React from 'react';
import { AppBar, Toolbar, Button, Typography, TextField, Grid, Box, Container, Card, Paper } from '@material-ui/core';
import {useForm} from 'react-hook-form';
import { Link } from 'react-router-dom';
import mazars from "../../assets/images/mazars-logo.png";
import Select from "react-select";
import style from './QueryStyle.module.css';
import Header from "../../components/Header/Header";
import axios from 'axios';
import { baseUrl } from "../../config/config";
import Swal from 'sweetalert2';
const QueryContact = () => {
    const { handleSubmit, register, errors } = useForm();
    
    const onSubmit = (value) => {
        let formData = new FormData();
        formData.append("enquiry_type", value.info);
        formData.append("name", value.p_name);
        formData.append("email", value.p_email);
        formData.append("message", value.p_message);
     axios({
         method :"POST",
         url : `${baseUrl}/ustomers/enquirysubmit`,
         data : formData
     })   
     .then((res) => {
         console.log("response", res)
         if(res.data.code === 1){
             Swal.fire({
                 title : "success",
                 html : "Your query submitted successfully, our team will contact you soon",
                 icon : "success"
             })
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

<Header noSign="noSign"/>
<Box style={{margin: "10px 30px"}}>
                       <h1>Enquiry form</h1>
                           </Box>
                       
            <Container maxWidth="md">
                <Grid container justify="center">
                    <Grid item lg={12} sm={12}>

                   
                         <form onSubmit={handleSubmit(onSubmit)}>
                         <Grid item lg={12}>
                               <Box className={style.myFormBox}>
                               <label className = {style.formFieldLegend}>
                               Your information
                               </label>
                              <select 
                                 ref={register}
                                 name="info"
                              className={style.formFieldSelect}>
                                  <option>General enquiries - Mazars in India</option>
                                  <option>Business Advisory Services - Mazars in India</option>
                              </select>
                               </Box>
                              </Grid> 
                              <Grid item lg={12}>
                              <Box className={style.myFormBox}>
                              <input 
                                 ref={register}
                             placeholder = "Type here your name"
                             className={style.myNameBox}
                             name = "p_name"
                             type = "text" />
                                  </Box>
                            
                              </Grid> 
                              <Grid item lg={12}>
                              <Box className={style.myFormBox}>
                              <input 
                                 ref={register}
                                 name = "p_email"
                             placeholder = "Type here your e-mail address"
                             className={style.myNameBox}
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
                             className={style.formTextArea}>

                             </textarea>
                               </Box>
                              </Grid> 
                              <Grid item lg={12}>
                               <Box className={style.myFormBox}>
                               <div className="form-check">
  <input style={{width : "1.2rem", height : "1.2rem"}} 
     ref={register} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
  <label className = {style.formChoice} for="flexCheckDefault">
I accept that Mazars will process my personal data for the purpose of handling my request
  </label>
  </div>
                               </Box>
                              </Grid>
                              <Grid item lg={12}>
                               <Box className={style.myFormBox}>
                          <button className={style.formButton}>Send</button>
                               </Box>
                              </Grid> 
                         </form>
                       
                    </Grid>
                    
                </Grid>
            </Container>
          
        </>
    )
}
export default QueryContact;