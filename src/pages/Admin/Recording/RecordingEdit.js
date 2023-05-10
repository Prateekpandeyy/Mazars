import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import classNames from "classnames";
import { baseUrl } from "../../../config/config";
import Swal from "sweetalert2";
import CustomHeading from "../../../components/Common/CustomHeading";
const RecordingEdit = ({
  isOpen,
  recordingHandler,
  participants,
  message,
  assignid,
  editId,
  recList,
}) => {
  const userid = localStorage.getItem("adminkey");
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (value) => {
    let formData = new FormData();
    formData.append("uid", JSON.parse(userid));
    formData.append("message", value.p_message);
    formData.append("message_type", value.msg_type);
    formData.append("assign_id", assignid);
    formData.append("participants", value.p_participants);
    formData.append("id", editId);
    axios({
      method: "POST",
      url: `${baseUrl}/tl/callRecordingPostEdit`,
      headers: {
        uit: token,
      },
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        recordingHandler();
        Swal.fire({
          title: "success",
          html: "Message edited successfully",
          icon: "success",
        });
        recList();
      }
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={recordingHandler}>
        <ModalHeader toggle={recordingHandler}>
          <CustomHeading>Recording Edit</CustomHeading>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-12">
                <label>Participants Name</label>
                <input
                  className="form-control"
                  name="p_participants"
                  ref={register}
                  defaultValue={participants}
                />
              </div>
            </div>
            <div className="row">
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
                  <option value="Query Discussion">Query discussion</option>
                  <option value="Proposal Discussion">
                    Proposal discussion
                  </option>
                  <option value="Payment Discussion">Payment discussion</option>
                  <option value="Client Discussion">Client discussion</option>
                  <option value="Draft Reports">Draft reports</option>
                  <option value="Final Discussion">Final discussion</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label>Message</label>
                <textarea
                  className="form-control"
                  style={{ height: "100px" }}
                  name="p_message"
                  ref={register}
                  defaultValue={message}
                />
              </div>
            </div>
            <button className="customBtn my-2">Submit</button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default RecordingEdit;
