import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { baseUrl } from '../../../config/config';
import Swal from 'sweetalert2';
import classNames from "classnames";
import { useForm } from "react-hook-form";
import Layout from "../../../components/Layout/Layout";
import { Container } from '@material-ui/core';
import {  styled } from '@mui/material';
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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import AddEditor from './AddEditor';
import CustomQuillEditor from './CustomQuillEditor';
const MyContainer = styled(Container)({

})
const FlashContent = () => {
    const { handleSubmit, register, errors, getValues, reset } = useForm();
    const [news , setNews] = useState("")
    const [heading, setHeading] = useState("")
    const [det, addDet] = useState();
    const [stats, setStats] = useState(false)
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
         console.log("response", res)
         if(res.data.code === 1){
          
             Swal.fire({
                 message : "success", 
                 html : `${message}`,
                 icon : "success"
             })
             history.push("/cms/flash")
        
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
        console.log("eee", e.target.value)
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
            <Col md="4">
              <h4>Flash Updates</h4>
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
<div className="col-md-12">
    <label>Content</label>
    {/* <CKEditor
             id="test"
                     editor={ ClassicEditor }
                    
                    data={det}
                    rows="10"
                    name="p_fact"
                
                    onChange={ ( event, editor ) => {
                      addDet(editor.getData());
                     

                    
                  } }
           
                ></CKEditor> */}
               {
                   getId.id ? 
                   <CustomQuillEditor 
 content={det} />   :  <AddEditor />
               }
    </div>
    <div className="col-md-3">
 
<span style={{margin : "10px 0"}}>
<input type="checkbox" style={{margin : "10px 0px"}} name="hide" checked = {stats} id="hide" onChange= {(e) => myLabel(e)}></input>
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