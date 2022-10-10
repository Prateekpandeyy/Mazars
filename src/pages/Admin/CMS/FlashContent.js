import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { baseUrl } from '../../../config/config';
import Swal from 'sweetalert2';
import classNames from "classnames";
import { useForm } from "react-hook-form";
import Layout from "../../../components/Layout/Layout";
import { Container } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import {
  
  Row,
  Col,
 
} from "reactstrap";
import AddEditor from './AddEditor';
import CustomQuillEditor from './CustomQuillEditor';
import CustomHeading from '../../../components/Common/CustomHeading';
const FlashContent = () => {
    const { handleSubmit, register, errors, getValues, reset } = useForm();
    const [news , setNews] = useState("")
    const [heading, setHeading] = useState("")
    const [det, addDet] = useState();
    const [stats, setStats] = useState(false)
    const [contentType, setContentType] = useState("Editor")
    const userId = localStorage.getItem("adminkey")
    let history  = useHistory()
    let getId = useParams()
    const token = window.localStorage.getItem("token")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
   useEffect(() => {
       getData()
   }, [])
   const getData = () => {
    axios.get(`${baseUrl}/cms/getallnews?uid=${JSON.parse(userId)}&id=${getId.id}`, myConfig)
    .then((res) => {
     
       res.data.result.map((i) => {
           setHeading(i.heading)
           addDet(i.news)
           if(i.status == "1"){
               setStats(true)
           }
           else{
               setStats(false)
           }
       })
    })
   }
    const onSubmit = (value) => {
        let message = ""
        let formData = new FormData()
        if(contentType !== "Editor") {
            var uploadImg = value.p_draft;
         
      
            if (uploadImg) {
              if(contentType === "Doc_upload"){
                formData.append("content_type", 0)
              }
              else if(contentType === "Pdf_upload"){
                formData.append("content_type", 1)
              }
              else if(contentType === "Ppt_upload"){
                formData.append("content_type", 3)
              }
              for (var i = 0; i < uploadImg.length; i++) {
                let file = uploadImg[i];
                formData.append("content", file);
               
              }
            }
            formData.append("heading", value.p_heading)
            {
           stats === true ?
           formData.append("status", 1):
           formData.append("status", 0)
         }
          }
          else {
        var myEditor = document.querySelector('#snow-container')
        var html = myEditor.children[0].innerHTML;
        addDet(html)
        let message = "Flash added successfully"
        let formData = new FormData()
       
        formData.append("news", html);
        formData.append("heading", value.p_heading)
       {
      stats === true ?
      formData.append("status", 1):
      formData.append("status", 0)
    }
}
    if(getId.id){
        formData.append("id", getId.id)
        message = "Flash updated successfully"
    }
     axios({

         method : "POST",
         url : `${baseUrl}/cms/setnews`,
         headers : {
             uit : token
         },
         data : formData
     })
     .then((res) => {
       
         if(res.data.code === 1){
          
             Swal.fire({
                 message : "success", 
                 html : `${message}`,
                 icon : "success"
             })
             history.push("/cms/flash")
        
         }
         else if (res.data.code === 102){
            history.push("/cms/login")
          }
         else{
             Swal.fire({
                 message : "error",
                 html : "Something went wrong, please try again",
                 icon : "error"
             })
           
         }
     })
    }
    const myLabel = (e) => {
      
        setStats(!stats)
    }
   
    return (
        <Layout cmsDashboard="cmsDashboard"> 
          <Container maxWidth = "xl">
      <div className="py-2">
      <Row>
          <Col md="4">
          <button
                className="autoWidthBtn" 
                onClick={() => history.goBack()}
              >
               
                Go Back
              </button>
              
            </Col>
            <Col md="4" align = "center">
                <CustomHeading>
                    Flash updates
                </CustomHeading>
            </Col>
            </Row>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="row">
<div className="col-md-4">
    <label>Heading </label>
    <input 
    type="text"
    name="p_heading"
    value={heading}
    onChange={(e) => setHeading(e.target.value)}
    className={classNames("form-control", {
        "is-invalid" : errors.p_heading
    })}
     ref={register({required : true})} />
    </div>
    <div className="col-md-4 col-sm-12">
                 
                 <label className="form-label">Type</label>
                      <select
                      multiple = {false}
                      onChange = {(e) => setContentType(e.target.value)}
                      className={classNames("form-control", {
                        "is-invalid": errors.p_content,
                      })}
                      value = {contentType}
                      ref={register({ required: true })}
                      name="p_content"
                      >
                      <option value = "Editor">Editor</option>
                      <option value = "Doc_upload">Word Document</option>
                      <option value = "Pdf_upload">PDF</option>
                      <option value = "Ppt_upload">PPT</option>
                          </select>
                 </div>
<div className="col-md-12">
    <label>Content</label>
               {
                   getId.id ? 
                   <>
                     {contentType !== "Editor" ?
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Upload Your Document</label>
            <input
                type="file"
                name="p_draft"
                ref={register}
                className="form-control-file manage_file"
              
              />
          </div>

          
        </form>
         : ""}
       {
         contentType === "Editor" ?
         <div className="row">
         <div className="col-md-12">
         <label className="form-label">Content</label> </div>
         
         <div className="col-md-12" style={{display : "flex", flexDirection :"column"}}>
         <CustomQuillEditor 
 content={det} />
             </div>
           
     </div>
 : ""
       }         
                   
 </>   :
 <>
     {contentType !== "Editor" ?
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Upload Your Document</label>
            <input
                type="file"
                name="p_draft"
                ref={register}
                className="form-control-file manage_file"
              
              />
          </div>

          
        </form>
         : ""}
       {
         contentType === "Editor" ?
         <div className="row">
         <div className="col-md-12">
         <label className="form-label">Content</label> </div>
         
         <div className="col-md-12" style={{display : "flex", flexDirection :"column"}}>
       <AddEditor
     />
             </div>
           
     </div>
 : ""
       }         
 </>  
               }
    </div>
    <div className="col-md-3">
 
<span style={{margin : "10px 0"}}>
<input type="checkbox" 
style={{margin : "10px 0px"}} 
name="hide" checked = {stats} 
id="hide" onChange= {(e) => myLabel(e)}></input>
<label htmlFor="hide" style={{margin : "10px"}}> Publish</label>
</span>
         </div>
         <div className="col-md-12">
<button type="submit" className="customBtn my-2">Submit</button> </div>

</div>

</form>
      </Container>
        </Layout>
    )
}
export default FlashContent;