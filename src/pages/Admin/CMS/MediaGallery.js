import React from 'react';
import Layout from "../../../components/Layout/Layout";
import { Container, Box, Paper } from '@material-ui/core';
import classNames from 'classnames';
import {  styled } from '@mui/material';
import { useHistory, useParams } from 'react-router';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { baseUrl } from '../../../config/config';
import Swal from 'sweetalert2';
const MyContainer = styled(Container)({

})
const MyBox = styled(Box)({
  display: "flex",
  width: "100%", 
  height: "500px",
  justifyContent: "center",
  alignItems: "center"
})
const InnerBox = styled(Paper)({
  display :"flex",
  flexDirection: "column",
  padding: "20px",
  minHeight: "300px",
  width: "400px",
  lineHeight : "30px",
  borderRadius: "10px"
})
const MediaGallery = () => {
    const userId = window.localStorage.getItem("adminkey");
    let history = useHistory()
    const [heading, setHeading] = useState("")
    const { handleSubmit, register, errors, getValues } = useForm();
    const onSubmit = (value) => {
      let formData = new FormData();
      let file ; 
      formData.append("title", heading);
      formData.append("type", "image");
      formData.append("date_event", value.date_event)
      var uploadImg = value.uploadImg;
      if (uploadImg) {
        for (var i = 0; i < uploadImg.length; i++) {
           file = uploadImg[i];
           formData.append("upload[]", file);
        }
      }
    
    // if (uploadImg) {
    //   for (var i = 0; i < uploadImg.length; i++) {
    //     let file = uploadImg[i];
    //     formData.append("upload", file);
    //     formData.append("type", "image")
       
    //   }
    // }
      axios({
        method : "POST", 
        url : `${baseUrl}/cms/uploadphoto`,
        data : formData
      })
      .then((res) => {
        let a = res.data
        console.log("res", a)
        if(res.data.code === 1){
          Swal.fire({
            title :"success",
            html : "Image uploaded successfully",
            icon :"success"
          })
          history.push("/admin/mediatab")
        }
      })
      console.log("done")
    }
    return(
        <Layout adminDashboard="adminDashboard" adminUserId={userId}>

        <MyContainer>
           
        <MyBox>
       <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          

         <InnerBox>
           <h4 style={{textAlign: "center"}}>Media </h4>
         <div className="row">
         <div className="col-md-12 col-sm-12">
                  
                  <label className="form-label">Title</label>
                    <input 
                    type="text"
                    className={classNames("form-control", {
                     "is-invalid": errors.p_heading,
                   })}
                   value={heading}
                   onChange={(e) => setHeading(e.target.value)}
                   ref={register({ required: true })}
                   name="p_heading"
                    placeholder = "Please enter heading"
                    />
                  </div>
                </div>
                <div className="row">
                <div className="col-md-12 col-sm-12">
                  
                  <label className="form-label">Date</label>
                  <input
               type="date"
               name= "date_event"
               ref={register}
               className="form-control"
               multiple
              
              />
                  </div>
                  </div>
                <div className="row">
                <div className="col-md-12 col-sm-12">
                  
                  <label className="form-label">Media</label>
                  <input
               type="file"
               name= "uploadImg"
               ref={register}
               className="form-control-file manage_file"
               multiple
              
              />
                  </div>
            
                  </div>
                <div className="row">
                  <div className="col-md-12">
               <button className="customBtn mt-5">Submit</button> </div>
               </div>
         </InnerBox>
          
         
          
           
          
            </form>
       </MyBox>
                </MyContainer>
                </Layout>
    )
}
export default MediaGallery;