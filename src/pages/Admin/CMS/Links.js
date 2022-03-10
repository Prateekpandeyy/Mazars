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
const MyContainer = styled(Container)({

})
const Links = () => {
    const [det, addDet] = useState();
    const [stats, setStats] = useState(false)
    const [heading, setHeading] = useState("")
    const [writer, setWriter] = useState("")
    let history = useHistory()
    let getId = useParams()
    const userId = localStorage.getItem("adminkey")
    const { handleSubmit, register, errors, getValues } = useForm();
    useEffect(() => {
        getData()
      }, [])
      const getData = (e) => {
        console.log("getId", getId.id)
       if(getId.id !== undefined){
        axios.get(`${baseUrl}/admin/pagelist?uid=${JSON.parse(userId)}&id=${getId.id}`)
        .then((res) => {
        
         if(res.data.code === 1){
        res.data.result.map((i) => {
          if(i.id === getId.id){
            setHeading(i.heading)
            setWriter(i.writer)
           addDet(i.content)
          }
        })
         }
        })
       }
      }
    const onSubmit = (e) => {
      
        let formData = new FormData();
       
        formData.append("content", det);
        formData.append("heading", heading)
       formData.append("writer", writer);
       formData.append("id", 3)
    
        axios({
            method : "POST", 
            url : `${baseUrl}/admin/createpage`,
            data : formData
        })
        .then((res) => {
           if(res.data.code === 1){
               Swal.fire({
                   title : "success",
                   html : "content created successfully",
                   icon : "success"
               })
               history.push("/admin/linklist")
           }
        })
    }
    const myLabel = (e) => {
   
     setStats(!stats)
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
              <h4>Links</h4>
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
                   placeholder = "Please enter heading"
                   />
                 </div>
           </div>
        
         
           <div className="row">
               <div className="col-md-12">
               <label className="form-label">Pages</label> </div>
               
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
export default Links;