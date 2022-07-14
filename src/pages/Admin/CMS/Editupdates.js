import React, {useState, useEffect} from 'react';
import { Container } from '@material-ui/core';
import {  styled } from '@mui/material';
import axios from 'axios';
import { baseUrl , baseUrl3 } from '../../../config/config';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './map.css';
import Swal from 'sweetalert2';
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from 'react-router';
import classNames from "classnames";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table,
  } from "reactstrap";
  import CustomQuillEditor from './CustomQuillEditor';
  // import { baseUrl } from '../../../config/config';
const MyContainer = styled(Container)({

})
const Editupdates = () => {
    const userId = localStorage.getItem("adminkey")
    const { handleSubmit, register, errors, getValues } = useForm();
    const [pages, getPages] = useState("")
    const [det, addDet] = useState();
    const [pageto, setTopage] = useState([])
    const [heading, setHeading] = useState("")
    const [date, setDate] = useState("")
    const [stats, setStats] = useState(false)
    const [contentType, setContentType] = useState("Editor")
    const [showEditor, setShowEditor] = useState(false)
    const [file, setFile] = useState("")
 let history = useHistory()
 let getId = useParams()
 const token = localStorage.getItem("token")
 const myConfig = {
   headers : {
    "uit" : token
   }
 }
 var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
 const [item] = useState(current_date);
    useEffect(() => {
        getPageValue()
    }, [])
    const getPageValue = () => {
        axios.get(`${baseUrl}/cms/getallupdate?uid=${JSON.parse(userId)}&id=${getId.id}`, myConfig)
        .then((res) =>{
            console.log("ress", res.data.result)
          
            res.data.result.map((i) => {
              console.log(i.content)
              setHeading(i.heading)
              addDet(i.content)
              setDate(i.publish_date)
              setTopage(i.type)
              setFile(i.file)
              if(i.status == 1){
                setStats(true)
               }
               else{
                 setStats(false)
               }
               if(i.content_type === "0"){
                
                setContentType("Doc_upload")
              }
              else if(i.content_type === "2"){
               addDet(i.content)
               
                 setContentType("Editor")
              
              }
              else if(i.content_type === "1"){
                console.log("done")
                setContentType("Pdf_upload")
              }
              else if(i.content_type === "3"){
               setContentType("Ppt_upload")
             }
            })
      
        })
    }
   const getToPage = (e) => {
       setTopage(e)
   }
   const onSubmit = (e) => {
    setShowEditor(false)
     let formData = new FormData()
    let message = "Updates created successfully"
    if(contentType !== "Editor") {
      
      var uploadImg = e.p_draft;
      if (uploadImg.length > 0) {
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
      else {
        Swal.fire({
          title : "error",
          html : "Please upload file",
          icon : "error"
        })
        return false
      }
    }
    else {
      console.log("myValue")
    var myEditor = document.querySelector('#snow-container')
    var html = myEditor.children[0].innerHTML;
    addDet(html)
      
   
       formData.append("content", html);
       formData.append("status", Number(stats))
       formData.append("content_type", 2)
    }
       formData.append("heading", heading)
       formData.append("publish_date", date);
       formData.append("type", pageto)
      if(getId.id){
        formData.append("id", getId.id)
        let message = "Updated updated successfully"
      }
       axios({
           method : "POST", 
           url : `${baseUrl}/cms/setupdate`,
           headers : {
             uit : token
           },
           data : formData
       })
       .then((res) => {
          if(res.data.code === 1){
              Swal.fire({
                  title : "success",
                  html : `${message}`,
                  icon : "success"
              })
              history.push("/cms/updates")
          }
       })
   
  }
   const myLabel = (e) => {
  
    setStats(!stats)
}
const editorShow = (e) => {
  setContentType(e.target.value)
 if(e.target.value === "Editor"){
  setShowEditor(true)
 }
}
    return(
        <Layout adminDashboard="adminDashboard" adminUserId={userId}>
      <Container maxWidth="xl">
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
            <Col md="4">
              <h4>Updates</h4>
            </Col>
            </Row>
        </div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        
       
        
       <div className="row">
       <div className="col-md-4 col-sm-12">
                 
                 <label className="form-label">Category</label>
                      <select
                     onChange={(e) => getToPage(e.target.value)}
                      value={pageto}
                      multiple = {false}
                      className={classNames("form-control", {
                        "is-invalid": errors.p_category,
                      })}
                      ref={register({ required: true })}
                      name="p_category"
                      >
                      <option value = "direct">Direct Tax</option>
                      <option value = "indirect">Indirect Tax</option>
                      <option value = "miscellaneous">Miscellenous</option>
                          </select>
                 </div>
       <div className="col-md-4 col-sm-12">
                 
                 <label className="form-label">Heading</label>
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
                 <div className="col-md-4 col-sm-12">
                 
                 <label className="form-label">Date of Publishing</label>
                   <input 
                   type="date"
                   className={classNames("form-control", {
                    "is-invalid": errors.p_publisher,
                  })}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  ref={register({ required: true })}
                  name="p_publisher"
               max={item}
                   />
                 </div>
                 <div className="col-md-4 col-sm-12">
                 
                 <label className="form-label">Type</label>
                      <select
                      multiple = {false}
                      onChange = {(e) => editorShow(e)}
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
         </div>
         <div className="row">
           { 
           contentType !== "Editor"  ?
         <div className = "col-md-6">
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

          <span style={{display : "flex", cursor : "pointer"}}>
                   <a href={`${baseUrl3}/${file}`} target="_blank">
                   <i className="fa fa-photo"></i>
                     <span style={{ marginLeft: "10px" }}>View Document</span>
                   </a>
                       </span>
        </form>
           </div>
         : ""}
           </div>
        {
          contentType === "Editor" ?
          <div className="row">
          <div className="col-md-12">
          <label className="form-label">Content</label> </div>
          
          <div className="col-md-12">
          <CustomQuillEditor 
content={det}
showEditor={showEditor} />
              </div>
      </div> : " "
        }
         <div className="row">
         <div className="col-md-3">
 
 <span style={{margin : "10px 0"}}>
 <input type="checkbox" style={{margin : "10px 0px"}} name="hide" checked = {stats} id="hide" onChange= {(e) => myLabel(e)}></input>
 <label htmlFor="hide" style={{margin : "10px"}}> Publish</label>
 </span>
 </div>
           </div>
         <div className="row">
            <div className="col-md-12">
            <button className="customBtn my-2">Submit</button> </div>
         </div>
         </form>
      </Container>
      </Layout>
    )
}
export default Editupdates;