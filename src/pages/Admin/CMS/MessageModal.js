import React, {useState, useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from 'axios';
import { baseUrl } from '../../../config/config';
import Swal from 'sweetalert2';
import classNames from "classnames";
import { useForm } from "react-hook-form";
const MessageModal = (
    {
       messageBox,
       messageFun,
       edit, 
       editData,
       getList,
       isEdit,
       setMessageBox
      }
      
) => {
    const { handleSubmit, register, errors, getValues, reset } = useForm();
    const [news , setNews] = useState("")
    const [heading, setHeading] = useState("")
    const [stats, setStats] = useState(false)
    const userId = localStorage.getItem("adminkey")
    useEffect(() => {
        getEditData()
    }, [edit])

    const getEditData = (e) => {
       console.log("editData", editData)
       if(editData && editData.id !== undefined && edit === true){
        axios.get(`${baseUrl}/admin/getallnews?uid=${JSON.parse(userId)}&id=${editData.id}`)
        .then((res) => {
           console.log("res",editData)
           res.data.result.map((i) => {
               setHeading(i.heading)
               setNews(i.news)
               if(i.status == "1"){
                   setStats(true)
               }
               else{
                   setStats(false)
               }
           })
        })
       }
      
        // console.log("done",  editData)
        // if(edit === true){
        //     console.log("editData", editData)
        //     setNews(editData.news)
        //     setHeading(editData.heading)
        //    if(editData.status == "0"){
        //        setStats(true)
        //    }
        //    else{
        //        setStats(false)
        //    }
        // }
    }
    const onSubmit = (value) => {
        let formData = new FormData()
       if(edit === false){
        formData.append("news", news);
       {
      stats === true ?
      formData.append("status", 1):
      formData.append("status", 0)
    }
        formData.append("heading", value.p_heading)
       }
       else{
        formData.append("news", news);
        formData.append("heading", value.p_heading)
       {
      stats === true ?
      formData.append("status", 1):
      formData.append("status", 0)
    }
        formData.append("id", editData.id)
       }
     axios({

         method : "POST",
         url : `${baseUrl}/admin/setnews`,
         data : formData
     })
     .then((res) => {
         console.log("response", res)
         if(res.data.code === 1){
           setHeading("")
           setNews("")
           setStats(false)
             Swal.fire({
                 message : "success", 
                 html : "Message added successfully",
                 icon : "success"
             })
        setMessageBox(false)
         getList()
         isEdit(false)
     
        
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
    return(
      <>

        <Modal isOpen={messageBox} toggle={messageFun} size="md">
            <ModalHeader toggle={messageFun}> News </ModalHeader>
            <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="row">
<div className="col-md-12">
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
    <label>Message </label>
<textarea
                        className={classNames("form-control", {
                            "is-invalid": errors.p_message,
                          })}
                          ref={register({ required: true })}
                          name="p_message"
onChange = {(e) => setNews(e.target.value)}
value = {news}
style={{height: "200px"}}
>

</textarea>
    </div>
    <div className="col-md-3">
 
<span style={{margin : "10px 0"}}>
<input type="checkbox" style={{margin : "10px 0px"}} name="hide" checked = {stats} id="hide" onChange= {(e) => myLabel(e)}></input>
<label htmlFor="hide" style={{margin : "10px"}}> Visible</label>
</span>
         </div>
         <div className="col-md-12">
<button type="submit" className="customBtn my-2">Submit</button> </div>

</div>

</form>
 
            </ModalBody>
        </Modal>
      </>
    )
}
export default MessageModal;