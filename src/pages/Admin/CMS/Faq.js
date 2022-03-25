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
const MyContainer = styled(Container)({

})
const Faq = () => {
    const [det, addDet] = useState();
    const [stats, setStats] = useState(false)
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
        axios.get(`${baseUrl}/cms/pagelist?uid=${JSON.parse(userId)}&id=${getId.id}`)
        .then((res) => {
        
         if(res.data.code === 1){
        res.data.result.map((i) => {
          if(i.id === getId.id){
           
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
       formData.append("id", 4)
    
        axios({
            method : "POST", 
            url : `${baseUrl}/cms/createpage`,
            data : formData
        })
        .then((res) => {
           if(res.data.code === 1){
               Swal.fire({
                   title : "success",
                   html : "Faq updated successfully",
                   icon : "success"
               })
               history.push("/cms/faqlist")
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
              <h4>Faq</h4>
            </Col>
            </Row>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          
         
        
         
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
export default Faq;