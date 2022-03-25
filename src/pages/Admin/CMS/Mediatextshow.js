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
const MyContainer = styled(Container)({

})
const Mediatextshow = () => {
    const userId = localStorage.getItem("adminkey")
    const { handleSubmit, register, errors, getValues } = useForm();
    const [pages, getPages] = useState([])
    const [det, addDet] = useState();
    const [pageto, setTopage] = useState([])
    const [heading, setHeading] = useState("")
    const [date, setDate] = useState("")
 let history = useHistory()
 let getId = useParams()
 var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
    const [item] = useState(current_date);
  
   
    useEffect(() => {
        getPageValue()
    }, [])
    const getPageValue = () => {
        axios.get(`${baseUrl}/cms/getallgalleryupdate?uid=${JSON.parse(userId)}&id=${getId.id}`)
        .then((res) =>{
           
          
            res.data.result.map((i) => {
              console.log(i.content)
              setHeading(i.heading)
              addDet(i.content)
              console.log("ress", i.publish_date.split(" ")[0])
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
       formData.append("content", det);
       formData.append("status", 1)
       formData.append("heading", heading)
       formData.append("publish_date", date);
      if(getId.id){
        formData.append("id", getId.id)
        message = "Media news updated successfully"
      }
       axios({
           method : "POST", 
           url : `${baseUrl}/cms/setgalleryupdate`,
           data : formData
       })
       .then((res) => {
          if(res.data.code === 1){
              Swal.fire({
                  title : "success",
                  html : `${message}`,
                  icon : "success"
              })
              history.push("/cms/mediatab")
          }
       })
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
                   min = {item}
                   />
                 </div>
         </div>
         <div className="row">
             <div className="col-md-12">
             <label className="form-label">Content</label> </div>
             
             <div className="col-md-12">
             <CKEditor
             id="test"
                     editor={ ClassicEditor }
                    
                    data={det}
                    rows="10"
                    name="p_fact"
                
                    onChange={ ( event, editor ) => {
                      addDet(editor.getData());
                     

                    
                  } }
           
                ></CKEditor>
                 </div>
         </div>
         <div className="row">
            <div className="col-md-12">
            <button className="customBtn my-2">Submit</button> </div>
         </div>
         </form>
      </MyContainer>
      </Layout>
    )
}
export default Mediatextshow;