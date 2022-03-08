import React, {useState, useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from 'axios';
import { baseUrl } from '../../../config/config';
import Swal from 'sweetalert2';
const MessageModal = (
    {
       messageBox,
       messageFun,
       edit, 
       editData,
       getList
      }
      
) => {
    const [news , setNews] = useState("")
    const [stats, setStats] = useState(false)
    useEffect(() => {
        getEditData()
    }, [edit])

    const getEditData = (e) => {
        console.log("done",  editData)
        if(edit === true){
            console.log("editData", editData)
            setNews(editData.news)
           if(editData.status == "0"){
               setStats(true)
           }
           else{
               setStats(false)
           }
        }
    }
    const submitData = () => {
        let formData = new FormData()
       if(edit === false){
        formData.append("news", news);
        formData.append("status", stats)
       }
       else{
        formData.append("news", news);
        formData.append("status", stats)
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
             Swal.fire({
                 message : "success", 
                 html : "Message added successfully",
                 icon : "success"
             })
             messageFun();
             getList()
         }
         else{
             Swal.fire({
                 message : "error",
                 html : "Something went wrong, please try again",
                 icon : "error"
             })
             messageFun()
             getList()
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
            <ModalHeader toggle={messageFun}> Message</ModalHeader>
            <ModalBody>
            <div className="row">
<div className="col-md-12"> Messages </div>
<div className="col-md-12">
<textarea
className="form-control"
onChange = {(e) => setNews(e.target.value)}
value = {news}
style={{height: "200px"}}
>

</textarea>
    </div>
</div>

<div className="row">
<div className="col-md-3">
 
<span style={{margin : "10px 0"}}>
<input type="checkbox" style={{margin : "10px 0px"}} name="hide" checked = {stats} id="hide" onChange= {(e) => myLabel(e)}></input>
<label htmlFor="hide" style={{margin : "10px"}}> Visible</label>
</span>
         </div>
     </div>
    
<div className="row">
<div className="col-md-12">
<button onClick = {(e) => submitData()} className="customBtn my-2">Submit</button> </div>
</div>
            </ModalBody>
        </Modal>
      </>
    )
}
export default MessageModal;