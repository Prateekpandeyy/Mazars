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
  import AddEditor from './AddEditor';
import CustomQuillEditor from './CustomQuillEditor';

const Mediatextshow = () => {
    const userId = localStorage.getItem("adminkey")
    const { handleSubmit, register, errors, getValues } = useForm();
    const [stats, setStats] = useState(false)
    const [det, addDet] = useState();
    const [pageto, setTopage] = useState([])
    const [heading, setHeading] = useState("")
    const [date, setDate] = useState("")
 let history = useHistory()
 let getId = useParams()
 var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
    const [item] = useState(current_date);
    const token = window.localStorage.getItem("token")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
   
    useEffect(() => {
        getPageValue()
    }, [])
    const getPageValue = () => {
        axios.get(`${baseUrl}/cms/getallgalleryupdate?uid=${JSON.parse(userId)}&id=${getId.id}`, myConfig)
        .then((res) =>{
           
          
            res.data.result.map((i) => {
              console.log(i.content)
              setHeading(i.heading)
              addDet(i.content)
              if(i.status == 1){
                setStats(true)
               }
               else{
                 setStats(false)
               }
              setDate(i.publish_date.split(" ")[0])
            })
      
        })
    }
   const getToPage = (e) => {
       setTopage(e)
   }
   const onSubmit = (e) => {
      let message = "Media news added successfully"
       let formData = new FormData();
       var myEditor = document.querySelector('#snow-container')
       var html = myEditor.children[0].innerHTML;
       addDet(html)
       formData.append("content", html);
       formData.append("status", Number(stats))
       formData.append("heading", heading)
       formData.append("publish_date", date);
      if(getId.id){
        formData.append("id", getId.id)
        message = "Media news updated successfully"
      }
       axios({
           method : "POST", 
           url : `${baseUrl}/cms/setgalleryupdate`,
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
              history.push("/cms/contentlist")
          }
       })
   }
   const myLabel = (e) => {
  
    setStats(!stats)
}
    return(
        <Layout cmsDashboard="cmsDashboard" adminUserId={userId}>
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
              <h4>Media Content</h4>
            </Col>
            </Row>
        </div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        
       
        
       <div className="row">
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
                   getId.id ? 
                   <CustomQuillEditor 
 content={det} />   :  <AddEditor />
               }
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
            <button className="customBtn my-2">Submit</button> </div>
         </div>
         </form>
      </Container>
      </Layout>
    )
}
export default Mediatextshow;