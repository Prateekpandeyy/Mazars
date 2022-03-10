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
import { useHistory } from 'react-router';
import classNames from "classnames";
const MyContainer = styled(Container)({

})
const UpdatesContent = () => {
    const userId = localStorage.getItem("adminkey")
    const { handleSubmit, register, errors, getValues } = useForm();
    const [pages, getPages] = useState([])
    const [det, addDet] = useState();
    const [pageto, setTopage] = useState([])
 let history = useHistory()
    useEffect(() => {
        getPageValue()
    }, [])
    const getPageValue = () => {
        axios.get(`${baseUrl}/admin/pagelist?uid=${JSON.parse(userId)}`)
        .then((res) =>{
            console.log("ress", res.data.result)
       getPages(res.data.result)
        })
    }
   const getToPage = (e) => {
       setTopage(e)
   }
   const onSubmit = (e) => {
       console.log("done")
       let formData = new FormData();
       formData.append("content", det);
       formData.append("status", 1)
     
      
       axios({
           method : "POST", 
           url : `${baseUrl}/admin/setupdate`,
           data : formData
       })
       .then((res) => {
          if(res.data.code === 1){
              Swal.fire({
                  title : "success",
                  html : "content created successfully",
                  icon : "success"
              })
              history.push("/admin/updates")
          }
       })
   }
    return(
        <Layout adminDashboard="adminDashboard" adminUserId={userId}>
      <MyContainer>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        
       
        
       
         <div className="row">
             <div className="col-md-12">
             <label className="form-label">Pages</label> </div>
             
             <div className="col-md-12">
             <CKEditor
             id="test"
                     editor={ ClassicEditor }
                    
                    
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
export default UpdatesContent;