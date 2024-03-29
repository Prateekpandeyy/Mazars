import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
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
  ownerId,
}) {
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const userId = window.localStorage.getItem("adminkey");
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const { assign_no, id, username, start } = item;
  const [parti, setParti] = useState("");
  useEffect(() => {
    setParti(item.username);
  }, [isOpen === true]);
  //submit
  const onSubmit = (value) => {
    var serverResponse = data.serverResponse.fileList;
    var completeRecording;
    if (allrecording === undefined || allrecording.length === 0) {
      completeRecording = serverResponse;
    } else if (allrecording != undefined || allrecording.length > 0) {
      completeRecording = allrecording + "," + serverResponse;
    } else {
      completeRecording = serverResponse;
    }
    const { fileList } = serverResponse;

    let formData2 = new FormData();
    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("fileList", completeRecording);
    formData.append("message_type", value.msg_type);
    formData.append("message", value.p_message);
    formData.append("assign_id", assign_no);
    formData.append("participants", parti);
    formData.append("schedule_id", id);

    axios.get(
      `${baseUrl}/admin/freeslottime?schedule_id=${id}&&uid=${JSON.parse(
        userId
      )}`,
      myConfig
    );

    axios({
      method: "POST",
      url: `${baseUrl}/admin/callRecordingPost`,
      headers: {
        uit: token,
      },
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          toggle();
          history.push("/admin/schedule");
        }
      })
      .catch((error) => {});
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} size="md">
        <ModalHeader>Minutes of meeting</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="col-md-10">
                <div className="form-group">
                  <div className="form-group">
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

                  <div className="form-group">
                    <label>Participants</label>
                    <input
                      type="text"
                      name="p_participants"
                      className="form-control"
                      ref={register}
                      defaultValue={username}
                      onChange={(e) => setParti(e.target.value)}
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
                    <option value="Proposal Discussion">
                      Proposal Discussion
                    </option>
                    <option value="Payment Discussion">
                      Payment Discussion
                    </option>
                    <option value="Client Discussion">Client Discussion</option>
                    <option value="Draft Reports">Draft Reports</option>
                    <option value="Final Discussion">Final Discussion</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Summary of Discussion<span className="declined">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Message text here"
                    rows="5"
                    ref={register}
                    name="p_message"
                  ></textarea>
                </div>

                <button type="submit" className="customBtn">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
}

export default RecordingModal;
