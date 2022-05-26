import React, {useState, useEffect} from 'react';
import { Container } from '@material-ui/core';
import {  styled } from '@mui/material';
import axios from 'axios';
import { baseUrl , baseUrl3} from '../../../config/config';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './map.css';
import Swal from 'sweetalert2';
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useHistory, useParams } from 'react-router';
import {
  
  Row,
  Col,

} from "reactstrap";
import 'react-quill/dist/quill.snow.css';
import { Spinner } from 'reactstrap';
import CustomQuillEditor from './CustomQuillEditor';
import { Markup } from 'interweave';
const MyContainer = styled(Container)({

})
const CmsContent = () => {
    const userId = localStorage.getItem("adminkey")
    const { handleSubmit, register, errors, getValues } = useForm();
   
    const [stats, setStats] = useState(false)
    const [det, addDet] = useState("");
    const [heading, setHeading] = useState("")
    const [writer, setWriter] = useState("")
    const [date, setDate] = useState("")
    const [pageto, setTopage] = useState("direct")
    const [editData, setEditData] = useState();
    const [editorError, setEditorError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("")
    const [showDoc, setShowDoc] = useState(false)
    const [showEditor, setShowEditor] = useState(false)
    const [file, setFile] = useState("")
    let history  = useHistory()
    let getId = useParams()
    var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
    const [item] = useState(current_date);
    const Quill = require("quill");
    const token = localStorage.getItem("token")
    const myConfig = {
      headers : {
       "uit" : token
      }
    }
    useEffect(() => {
      getData()
    }, [])
    const getData = (e) => {
     
    
     if(getId.id !== undefined){
      axios.get(`${baseUrl}/cms/getallarticles?uid=${JSON.parse(userId)}&id=${getId.id}`, myConfig)
      .then((res) => {
      
       if(res.data.code === 1){
      res.data.result.map((i) => {
        if(i.id === getId.id){
         setTopage(i.type)
         setHeading(i.heading)
         setWriter(i.writer)
         setDate(i.publish_date);
         let a = myFun(i.content)
         console.log("aaaa", i)
        
        setEmail(i.email)
        setFile(i.file)
         if(i.status == 1){
          setStats(true)
         }
         else{
           setStats(false)
           addDet(i.content)
         }
         if(i.content_type === "1"){
           setShowDoc(true)
         }
         else {
          addDet(i.content)
            setShowDoc(false)
         
         }
        }
      })
       }
      })
     }
    }
   
    const myFun = (a) => {
   
      return(
        <Markup content={a} />
      )
    }
   const getToPage = (e) => {
       setTopage(e)
   }
   const onSubmit = (e) => {
     let message = "Content created successfully"
     setShowEditor(false)
     let formData = new FormData();
  setLoading(true)
  if(showDoc === true) {
    console.log("ffff", showDoc)
    var uploadImg = e.p_draft;
    console.log("ffff222", uploadImg.length)

    if (uploadImg.length > 0) {
      for (var i = 0; i < uploadImg.length; i++) {
        let file = uploadImg[i];
        formData.append("content", file);
        formData.append("content_type", 1)
      }
    }
    else if(file.length > 0) {
      formData.append("content", file);
      formData.append("content_type", 1)
    }
    else{
      formData.append("content", det);
      formData.append("content_type", 2)
    }
  }
  else {
    var myEditor = document.querySelector('#snow-container')
    var html = myEditor.children[0].innerHTML;
    addDet(html)
    formData.append("content", html);
    formData.append("content_type", 2)
  }
     
     
      formData.append("type", pageto)
     
   {
     stats === true ?
     formData.append("status", 1):
     formData.append("status", 0)
   }
      formData.append("heading", heading)
      formData.append("writer", writer);
      formData.append("publish_date", date);
      formData.append("email", email)
      if(getId.id !== undefined){
        formData.append("id", getId.id)
        message = "Content updated successfully"
      }
      axios({
          method : "POST", 
          url : `${baseUrl}/cms/setarticles`,
          headers: {
            uit : token
          },
          data : formData
      })
      .then((res) => {
         if(res.data.code === 1){
           setLoading(false)
             Swal.fire({
                 title : "success",
                 html : `${message}`,
                 icon : "success"
             })
             history.push("/cms/cms")
         }
      })
    
   }
   const myLabel = (e) => {
  
    setStats(!stats)
}
const getEditValue= (e) => {

  addDet(e)
  if(e){
    setEditorError(false)
  }
}

    return(
        <Layout adminDashboard="adminDashboard" adminUserId={userId}>
          
      <MyContainer>
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
              <h4>Articles</h4>
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
                      <option value = "Direct Tax">Direct Tax</option>
                      <option value = "Indirect Tax">Indirect Tax</option>I
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
         </div>
       
         <div className="row">
             <div className="col-md-4 col-sm-4">
                 
                 <label className="form-label">Writer</label>
                   <input 
                   type="text"
                   className={classNames("form-control", {
                    "is-invalid": errors.p_wirter,
                  })}
                  onChange={(e) => setWriter(e.target.value)}
                  value={writer}
                  ref={register({ required: true })}
                  name="p_wirter"
                   placeholder = "Please enter writer name"
                   />
                 </div>
                 <div className="col-md-4 col-sm-4">
                 
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
                   placeholder = "Please enter heading"
                  max={item}
                   />
                 </div>
                 <div className="col-md-4 col-sm-4">
                 
                 <label className="form-label">Email</label>
                   <input 
                   type="email"
                   className={classNames("form-control", {
                    "is-invalid": errors.p_email,
                  })}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={register({ required: true })}
                  name="p_email"
                   placeholder = "Please enter heading"
                   />
                 </div>
         </div>
        
          <div className="row">
          <div className="col-md-3 my-4">
          <input type="radio" value="Male" defaultChecked={showDoc === true ? true : false} name="gender" onChange={() => setShowDoc(true)}/> Upload Content
       </div>
       <div className="col-md-3 my-4">
         <input type="radio" value="Female" defaultChecked={showDoc === false ? true : false} name="gender" onChange= {() => {
         
           setShowDoc(false)
         }} /> Editor
            </div>
          </div> 

        {/* {
          showDoc === false ?
          <div className="row">
          <div className="col-md-3 my-4">
          <input type="radio" value="Male" name="gender" onChange={() => setShowDoc(true)}/> Upload Content
       </div>
       <div className="col-md-3 my-4">
         <input type="radio" value="Female" defaultChecked name="gender" onChange={() => setShowDoc(false)} /> Editor
            </div>
          </div> : ""
        } */}
         {showDoc === true ?
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
                     <span style={{ marginLeft: "10px" }}>Document</span>
                   </a>
                       </span>
        </form>
         : ""}
       {
         showDoc === false ?
         <div className="row">
         <div className="col-md-12">
         <label className="form-label">Content</label> </div>
         
         <div className="col-md-12" style={{display : "flex", flexDirection :"column"}}>
       <CustomQuillEditor 
content={det}
showEditor={showEditor} />
             </div>
     </div> : ""
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
            {
                      loading ?
                        <Spinner color="primary" />
                        :
            <button className="customBtn my-2">Submit</button> } </div>
         </div>
         </form>
      </MyContainer>
      </Layout>
    )
}
export default CmsContent;
