import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import CommonServices from "../../../common/common";
import Alerts from "../../../common/Alerts";
import { useHistory } from "react-router";

function RecordingModal({
    isOpen,
    toggle,
    data,
    item
}) {
    const history = useHistory();
    const { handleSubmit, register, errors } = useForm();
    const userId = window.localStorage.getItem("tlkey");

    console.log("item", item)

    const { assign_no, id, username, start } = item
    console.log("assign_no", assign_no)


    //submit
    const onSubmit = (value) => {
        console.log("value :", value);

        var serverResponse = data.serverResponse


        const { fileList } = serverResponse
        console.log("fileList +++ ", fileList);

        let formData = new FormData();
        formData.append("uid", JSON.parse(userId));
        formData.append("fileList", fileList);
        formData.append("message_type", value.msg_type);
        formData.append("message", value.p_message);
        formData.append("assign_id", assign_no);
        formData.append("participants", username);
        formData.append("schedule_id", id);


        axios({
            method: "POST",
            url: `${baseUrl}/tl/callRecordingPost`,
            data: formData,
        })
            .then(function (response) {
                console.log("res-", response);
                if (response.data.code === 1) {
                    toggle()
                    history.push('/teamleader/schedule');
                    // reset();
                    // setLoading(false)
                    // var variable = "Message sent successfully."
                    // Alerts.SuccessNormal(variable)
                    // props.history.push(routes);
                  
                }
               
            })
            .catch((error) => {
                console.log("erroror - ", error);
            });
    };

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