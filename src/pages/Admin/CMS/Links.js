import React, {useState, useEffect} from 'react';
import { Container , Box, Paper} from '@material-ui/core';
import {  styled } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../../config/config';
import './map.css';
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useHistory, useParams } from 'react-router';
import {
    Row,
    Col,
  } from "reactstrap";
  import CustomHeading from '../../../components/Common/CustomHeading';
  import Swal from 'sweetalert2';
const MyContainer = styled(Container)({

})
const MyBox = styled(Box)({
  display: "flex",
  width: "100%", 
  height: "500px",
  justifyContent: "center",
  alignItems: "center"
})
const InnerBox = styled(Paper)({
  display :"flex",
  flexDirection: "column",
  padding: "20px",
  minHeight: "300px",
  width: "400px",
  lineHeight : "30px",
  borderRadius: "10px"
})
const Links = () => {
    const [det, addDet] = useState();
    const [stats, setStats] = useState(false)
    const [heading, setHeading] = useState("")
    const [writer, setWriter] = useState("")
    const [error, setError] = useState(false)
    const [dd, setDd] = useState({
      direct: [],
     
    });
    const token = localStorage.getItem("token")
    const myConfig = {
      headers : {
       "uit" : token
      }
    }
    let history = useHistory()
    let getId = useParams()
    const userId = localStorage.getItem("adminkey")
    const { handleSubmit, register, errors, getValues } = useForm();
    useEffect(() => {
        getData()
      }, [])
      const getData = (e) => {
      
       if(getId.id !== undefined){
        axios.get(`${baseUrl}/cms/getalllinks?uid=${JSON.parse(userId)}&id=${getId.id}`, myConfig)
        .then((res) => {
        
         if(res.data.code === 1){
        res.data.result.map((i) => {
          if(i.id === getId.id){
            setHeading(i.heading)
            setWriter(i.url)
           
          }
        })
         }
        })
       }
      }
    const onSubmit = (e) => {
   
     
    
        let formData = new FormData();
       

        let message = "Link created successfully"
  formData.append("heading", heading)
  formData.append("position", dd)
  formData.append("url", writer);
if(getId.id){
 formData.append("id", getId.id)
 message = "Link updated successfully"
}

   axios({
       method : "POST", 
       url : `${baseUrl}/cms/setlinks`,
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
          history.push("/cms/linklist")
      }
      else if (res.data.code === 102){
        history.push("/cms/login")
      }
   })

    }
    const myLabel = (e) => {
   
     setStats(!stats)
 }
 function ValidURL(link) {
 
  var regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
  if(!regex.test(link)) {
    
    return false;
  } else {
     if(link.includes("https://www")){
      setError(false)
     }
     else{
       setError(true)
     }
  }
}

const myOrder = (e) => {
  setDd({
    direct: e.target.value,
  
  })
}
    return(
      <Layout cmsDashboard="cmsDashboard">
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
            <Col md="4" align = "center">
              <CustomHeading>
                Important link
              </CustomHeading>

             
            </Col>
            </Row>
        </div>
       <MyBox>
       <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          

         <InnerBox>
           <h4 style={{textAlign: "center"}}>Link </h4>
         <div className="row">
         <div className="col-md-12 col-sm-12">
                  
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
                <div className="col-md-12 col-sm-12">
                  
                  <label className="form-label">Link</label>
                    <input 
                    type="text"
                    className={classNames("form-control", {
                     "is-invalid": errors.p_wirter || error,
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
               <button className="customBtn mt-5">Submit</button> </div>
               </div>
         </InnerBox>
          
         
          
           
          
            </form>
       </MyBox>
        </MyContainer>
        </Layout>
    )
}
export default Links;