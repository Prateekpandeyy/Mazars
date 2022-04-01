import React, { useEffect} from 'react';
import Layout from "../../../components/Layout/Layout";
import { Container, Box, Paper } from '@material-ui/core';
import classNames from 'classnames';
import {  styled } from '@mui/material';
import { useHistory, useParams } from 'react-router';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { baseUrl, baseUrl3 } from '../../../config/config';
import Swal from 'sweetalert2';
import {DeleteIcon, EyeIcon} from "../../../components/Common/MessageIcon";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import {
  
  Row,
  Col,
 
} from "reactstrap";
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
const EditVideo = () => {
    const userId = window.localStorage.getItem("adminkey");
    let history = useHistory()
    const [heading, setHeading] = useState("")
    const [date, setDate] = useState("")
    const [data, setData] = useState([]) 
    const { handleSubmit, register, errors, getValues } = useForm();
    let getId = useParams()
    var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
    const [item] = useState(current_date);
  
    useEffect(() => {
      getData()
    }, [])
    const getData = (e) => {
   
     if(getId.id !== undefined){
        axios.get(`${baseUrl}/cms/getgallarylist?uid=${JSON.parse(userId)}&type=video&id=${getId.id}`)
      .then((res) => {
    
      setData(res.data.result);
     res.data.result.map((i) => {
        
         setHeading(i.title)
         console.log(i.created_date.split(" ")[0].split("-").reverse().join("-"))
         setDate(i.created_date.split(" ")[0].split("-").join("-"))
     })
      })
     }
    }
   
    const onSubmit = (value) => {
      let formData = new FormData();
      let file ; 
      formData.append("title", heading);
      formData.append("type", "video");
      formData.append("date_event", value.date_event)
      formData.append("id", getId.id)
      var uploadImg = value.uploadImg;
      if (uploadImg) {
        for (var i = 0; i < uploadImg.length; i++) {
           file = uploadImg[i];
           formData.append("upload[]", file);
        }
      }
    
  
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
            html : "Video Gallery Update successfully",
            icon :"success"
          })
          history.push("/cms/mediatab")
        }
      })
     
    }

    const del = (e) => {
 

      Swal.fire({
          title: "Are you sure?",
          text: "Want to delete articles? Yes, delete it!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
      }).then((result) => {
          if (result.value) {
            axios.get(`${baseUrl}/cms/deletevideo?uid=${JSON.parse(userId)}&id=${e.imageid}&videooid=${e.id}`)
            .then((res) => {
  console.log("response", res)
  if(res.data.code === 1){
  Swal.fire({
    title : "success",
    html  : "Video deleted successfully",
    icon : "success"
  })
  getData()
  }
  else{
  Swal.fire({
    title :"error",
    html : "Something went wrong , please try again",
    icon : "error"
  })
  }
            })
          }
      });
  };
    return(
        <Layout adminDashboard="adminDashboard" adminUserId={userId}>

        <MyContainer>
        <Row className="my-2">
          <Col md="4">
          <button
                className="autoWidthBtn" 
                onClick={() => history.goBack()}
              >
               
                Go Back
              </button>
              
            </Col>
            <Col md="4" alig ="center">
              <h4>Video Gallery</h4>
            </Col>
            </Row>  
        <MyBox>
        
       <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          

         <InnerBox>
         
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
               defaultValue={date}
               name= "date_event"
               ref={register}
               className="form-control"
             
              
              />
                  </div>
                  </div>
                  <div className="row" style={{display : "flex",maxHeight: "100px",
                   padding: "10px 0", overflow : "auto"}}>
                      {data.map((i, e) => (
                          <div className="col-md-12 col-sm-12">
                            <div style={{display : "flex", justifyContent : "space-evenly", alignItems : "center"}}>
                          <a href={`${baseUrl3}/assets/gallery/${i.name}`} className="tabHover" target="_blank">
                          <OndemandVideoIcon className="inprogress" />
                              </a>

                              <span onClick={() => del(i)}>
                            <DeleteIcon />
                            </span>
                                </div>
                              </div>
                      ))}
                      </div>
                <div className="row">
                <div className="col-md-12 col-sm-12">
                  
                  <label className="form-label">Media</label>
                
               <input
                  type="file"
                accept="file_extension|audio/*|video/*|image/*|media_type"
                name= "uploadImg"
                ref={register}
                className="form-control-file"
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
export default EditVideo;