import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import CommonServices from "../../../common/common";
import Alerts from "../../../common/Alerts";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
function RecordingModal({
    isOpen,
    toggle,
    data,
    item, 
    allrecording,
    schId,
    uid,
    ownerId
}) {
   
    const history = useHistory();
    const { handleSubmit, register, errors } = useForm();
    const userId = window.localStorage.getItem("tpkey");

   

    const { assign_no, id, username, start } = item
  
    const onSubmit = (value) => {
        var serverResponse = data.serverResponse.fileList
        var completeRecording;
        if(allrecording === undefined || allrecording.length === 0){
            completeRecording =  serverResponse;
        }
        else if(allrecording != undefined || allrecording.length > 0){
            completeRecording = allrecording + "," + serverResponse;
        }
        else{
            completeRecording = serverResponse;
        }
                const { fileList } = serverResponse
             
        let formData = new FormData();
        formData.append("uid", JSON.parse(userId));
        formData.append("fileList", completeRecording);
        formData.append("message_type", value.msg_type);
        formData.append("message", value.p_message);
        formData.append("assign_id", assign_no);
        formData.append("participants", username);
        formData.append("schedule_id", id);

        axios.get(`${baseUrl}/tl/freeslottime?schedule_id=${id}&&uid=${JSON.parse(userId)}`)
        axios({
            method: "POST",
            url: `${baseUrl}/tl/callRecordingPost`,
            data: formData,
        })
            .then(function (response) {
              
                if (response.data.code === 1) {
                    toggle();
                    confirmation()
                   
                }
            })
            .catch((error) => {
               
            });
    };
    const exitBtn2 = () => {
        if(ownerId === JSON.parse(userId)){
            confirmation()
        }
        else{
            history.push('/teamleader/schedule');
        }
       

    }
    const confirmation = () => {
        console.log("done")
        Swal.fire({
         title: "Are you sure?",
         text: "It will permanently deleted !",
         type: "warning",
         showCancelButton : true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "End the call",
         cancelButtonText: "only, just leave the call",
        }).then((result) => {
         if (result.value) {
          console.log("donefixed", result)
          axios.get(`${baseUrl}/tl/setgetschedular?id=${schId}&rtc_id=${uid}&uid=${JSON.parse(userId)}`)
         .then((res) =>{
           if(res){
            history.push('/taxprofessional/schedule');
           }
         })
         }
         else{
            console.log("donefixed", result)
          history.push('/taxprofessional/schedule');
         }
       });
      }
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle} size="md">
                <ModalHeader toggle={toggle}>
                    Form
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="row" style={{ display: "flex", justifyContent: "center" }}>
                            <div class="col-md-10">
                                <div class="form-group">

                                    <div class="form-group">
                                        <label>Query No.</label>
                                        <input
                                            type="text"
                                            name="p_query"
                                            className="form-control"
                                            ref={register}
                                            value={assign_no}
                                            disabled
                                        />
                                    </div>

                                    <div class="form-group">
                                        <label>Participants</label>
                                        <input
                                            type="text"
                                            name="p_participants"
                                            className="form-control"
                                            ref={register}
                                            defaultValue={username}
                                        />
                                    </div>

                                    <label>Discussion Type</label>
                                    <select
                                        className="form-control"
                                        name="msg_type"
                                        ref={register}
                                        style={{ height: "33px" }}
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

                                <div class="form-group">
                                    <label>Summary of Discussion<span className="declined">*</span></label>
                                    <textarea
                                        className="form-control"
                                        placeholder="Message text here"
                                        rows="5"
                                        ref={register}
                                        name="p_message"
                                    ></textarea>
                                </div>
                                <button type="button" className="btn btn-danger mx-2" onClick={() => exitBtn2()}>Cancel </button>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
        </div >
    );
}

export default RecordingModal;