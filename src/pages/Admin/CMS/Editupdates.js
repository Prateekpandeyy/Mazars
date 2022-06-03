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
  import CustomQuillEditor from './CustomQuillEditor';
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
              if(i.status == 1){
                setStats(true)
               }
               else{
                 setStats(false)
               }
            })
      
        })
    }
   const getToPage = (e) => {
       setTopage(e)
   }
   const onSubmit = (e) => {
    var myEditor = document.querySelector('#snow-container')
    var html = myEditor.children[0].innerHTML;
    addDet(html)
       let message = "Updates created successfully"
       let formData = new FormData();
       formData.append("content", html);
       formData.append("status", Number(stats))
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
         </div>
         <div className="row">
             <div className="col-md-12">
             <label className="form-label">Content</label> </div>
             
             <div className="col-md-12">
             <CustomQuillEditor 
 content={det} />
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
export default Editupdates;