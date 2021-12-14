import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import classNames from 'classnames';
import { baseUrl } from '../../../config/config';
import Swal from 'sweetalert2';
const RecordingEdit = ({isOpen, recordingHandler, participants, message, assignid, editId, recList}) => {
   const userid = localStorage.getItem("tlkey")
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = (value) => {
       let formData = new FormData();
       formData.append("uid", JSON.parse(userid))
       formData.append("message", value.p_message);
       formData.append("message_type", value.msg_type)
        formData.append("assign_id", assignid);
        formData.append("participants", value.p_participants);
        formData.append("id", editId)
        axios({
            method : "POST",
            url : `${baseUrl}/tl/callRecordingPostEdit`,
            data: formData,
        })
        .then((res) => {
            if(res.data.code === 1){
                recordingHandler()
                Swal.fire({
                    title : "success",
                    html : "Message edited successfully",
                    icon : "success"
                })
                recList()
            }
        })
    }
   
return (
 
    <>
    <Modal isOpen = {isOpen} toggle={recordingHandler}>
        <ModalHeader toggle={recordingHandler}>
        <h1>Recording Edit</h1>
        </ModalHeader>
        <ModalBody>
       <form onSubmit = {handleSubmit(onSubmit)}>
<div className="row">
    <div className="col-md-12">
        <label>Participants Name</label>
        <input 
        className="form-control"
        name="p_participants"
        ref = {register}
        defaultValue = {participants}/>
        </div>
        
</div>
<div className = "row">
<div className="col-md-12">
    <label>Message Type</label>
<select
                            className={classNames("form-control", {
                              "is-invalid": errors.msg_type,
                            })}
                            name="msg_type"
                            ref={register}
                            style={{ height: "33px" }}
                            required
                            
                          >
                            <option value="">--select--</option>
                                        <option value="Query Discussion">Query Discussion</option>
                                        <option value="Proposal Discussion">Proposal Discussion</option>
                                        <option value="Payment Discussion">Payment Discussion</option>
                                        <option value="Client Discussion">Client Discussion</option>
                                        <option value="Draft Reports">Draft Reports</option>
                                        <option value="Final Discussion">Final Discussion</option>
                                        <option value="Others">Others</option>
                          </select>
    </div>
    </div>
    <div className="row">
    <div className="col-md-12">
        <label>Message</label>
        <textarea 
           style={{height : "100px"}}
        className="form-control"
        name="p_message"
        ref = {register}
        defaultValue = {message}/>
        </div>
</div>
<button className="btn btn-primary my-2">
    Submit
</button>
       </form>
        </ModalBody>
    </Modal>
    
    </>
)
}
export default RecordingEdit;