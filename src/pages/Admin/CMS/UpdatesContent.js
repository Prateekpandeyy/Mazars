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
const MyContainer = styled(Container)({

})
const UpdatesContent = () => {
    const userId = localStorage.getItem("adminkey")
    const { handleSubmit, register, errors, getValues } = useForm();
    const [pages, getPages] = useState([])
    const [det, addDet] = useState();
    const [pageto, setTopage] = useState([])
    const options22 = 
       [
        {
            label : 22,
             value : "onelejlk"
          }
    , {
        label : 112,
         value : "onelejlk"
      }
    
       ]
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
       formData.append("id", 2);
       formData.append("uid", JSON.parse(userId));
       formData.append("heading", e.p_heading)
       formData.append("writer", e.p_wirter);
       formData.append("publisher", e.p_publisher);
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
          }
       })
   }
    return(
        <Layout adminDashboard="adminDashboard" adminUserId={userId}>
      <MyContainer>
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
                      <option>Direct Tax</option>
                      <option>Indirect Tax</option>I
                          </select>
                 </div>
                 <div className="col-md-4 col-sm-12">
                 
                 <label className="form-label">Heading</label>
                   <input 
                   type="text"
                   className={classNames("form-control", {
                    "is-invalid": errors.p_heading,
                  })}
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
                  ref={register({ required: true })}
                  name="p_wirter"
                   placeholder = "Please enter heading"
                   />
                 </div>
                 <div className="col-md-4 col-sm-12">
                 
                 <label className="form-label">Publisher</label>
                   <input 
                   type="date"
                   className={classNames("form-control", {
                    "is-invalid": errors.p_publisher,
                  })}
                  ref={register({ required: true })}
                  name="p_publisher"
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