import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import Alerts from "../../../common/Alerts";
import { Spinner } from 'reactstrap';

const Schema = yup.object().shape({
  p_chat: yup.string().required(""),
});

function RejectedModal({
  addPaymentModal,
  rejectHandler,
  pay,
  getPendingforAcceptance,
}) {
  const userid = window.localStorage.getItem("tpkey");
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });
  const [loading, setLoading] = useState(false);
  const { id, allocation_id } = pay;

  

  const onSubmit = (value) => {
    console.log("value :", value);
    setLoading(true)

    let formData = new FormData();
    formData.append("set", 0);
    formData.append("tp_id", JSON.parse(userid));
    formData.append("assignment_id", id);
    formData.append("allocation_id", allocation_id);
    formData.append("reject_reason", value.p_chat);

    axios({
      method: "POST",
      url: `${baseUrl}/tp/AcceptRejectQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setLoading(false)
          Alerts.SuccessNormal("Query rejected successfully.")
          getPendingforAcceptance();
          rejectHandler();
        } else if (response.data.code === 0) {
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <div>
      <Modal isOpen={addPaymentModal} toggle={rejectHandler} size="md">
        <ModalHeader toggle={rejectHandler}>Rejected Reason</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <textarea
                className={classNames("form-control", {
                  "is-invalid": errors.p_chat,
                })}
                id="textarea"
                rows="4"
                name="p_chat"
                ref={register}
                placeholder="enter text here..."
              ></textarea>
            </div>

            <div class="modal-footer">
              {
                loading ?
                  <Spinner color="primary" />
                  :
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
              }
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default RejectedModal;
