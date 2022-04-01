import React, {useState, useEffect} from 'react';
import { Container } from '@material-ui/core';
import {  styled } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../../config/config';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './map.css';
import Swal from 'sweetalert2';
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useHistory, useParams } from 'react-router';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Markup } from 'interweave';
import { Spinner } from 'reactstrap';
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
    let history  = useHistory()
    let getId = useParams()
    var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
    const [item] = useState(current_date);
  
   
    useEffect(() => {
      getData()
    }, [])
    const getData = (e) => {
   
     if(getId.id !== undefined){
      axios.get(`${baseUrl}/cms/getallarticles?uid=${JSON.parse(userId)}&id=${getId.id}`)
      .then((res) => {
      
       if(res.data.code === 1){
      res.data.result.map((i) => {
        if(i.id === getId.id){
         setTopage(i.type)
         setHeading(i.heading)
         setWriter(i.writer)
         setDate(i.publish_date);
        addDet(i.content) 
         console.log("imgData", i)
         if(i.status == 1){
          setStats(true)
         }
         else{
           setStats(false)
         }
        }
      })
       }
      })
     }
    }
   
   const getToPage = (e) => {
       setTopage(e)
   }
   const onSubmit = (e) => {
     let message = "Content created successfully"

  setLoading(true)
     if(det[0].search('\"<p><br></p>\"')){
        
      let formData = new FormData();
      formData.append("type", pageto)
      formData.append("content", det);
   {
     stats === true ?
     formData.append("status", 1):
     formData.append("status", 0)
   }
      formData.append("heading", heading)
      formData.append("writer", writer);
      formData.append("publish_date", date);
      if(getId.id !== undefined){
        formData.append("id", getId.id)
        message = "Content updated successfully"
      }
      axios({
          method : "POST", 
          url : `${baseUrl}/cms/setarticles`,
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
     else{
      setEditorError(true)
     }
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
                      <option value = "direct">Direct Tax</option>
                      <option value = "indirect">Indirect Tax</option>I
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
             <div className="col-md-4 col-sm-12">
                 
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
                   placeholder = "Please enter heading"
                  max={item}
                   />
                 </div>
         </div>
       
         <div className="row">
             <div className="col-md-12">
             <label className="form-label">Content</label> </div>
             
             <div className="col-md-12">
             {
                <ReactQuill
                ref={register}
               
                className={classNames({
                  "customInvalid" : editorError
                })}
                value={det}
                name="myEditor"
                modules={ {
                  toolbar: [
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                    [{size: []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, 
                     {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image', 'video'],
                    ['clean']
                  ],
                  clipboard: {
                    // toggle to add extra line breaks when pasting HTML:
                    matchVisual: false,
                  }}}
                formats={
                  [
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image', 'video'
                  ]
                  
                } theme="snow" value={det} onChange={getEditValue}/>}
                 </div>
         </div>
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