import React, {useState, useEffect} from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, styled } from '@mui/material';
import Select from "react-select";
import axios from 'axios';
import { baseUrl } from '../../../config/config';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './map.css';
import Swal from 'sweetalert2';
const MyContainer = styled(Container)({

})
const CmsContent = () => {
    const userId = localStorage.getItem("adminkey")
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
   const submitData = (e) => {
       console.log("done")
       let formData = new FormData();
       formData.append("content", det);
       formData.append("id", pageto);
       formData.append("uid", JSON.parse(userId))
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
      <MyContainer>

         <div className="row">
             <div className="col-md-4 col-sm-12">
                 
                 <label className="form-label">Pages</label>
                      <select
                     onChange={(e) => getToPage(e.target.value)}
                      value={pageto}
                      multiple = {false}
                       className="form-control"
                      >
                       
                       {
                           pages.map((i) => (
                               <option value={i.id} key={i.id}> {i.page} </option>
                           ))
                       } 
                          </select>
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
             sx = {{display: "block", height: "400px"}}
                ></CKEditor>
                 </div>
         </div>
         <div className="row">
            <div className="col-md-12">
            <button onClick = {(e) => submitData()} className="customBtn my-2">Submit</button> </div>
         </div>
      </MyContainer>
    )
}
export default CmsContent;