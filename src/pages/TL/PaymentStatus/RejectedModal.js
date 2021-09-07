import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
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
  assignNo,
  getPaymentStatus,
}) {

  const userId = window.localStorage.getItem("tlkey");
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (value) => {
    console.log("value :", value);
    setLoading(true)

    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("assign_no", assignNo);
    formData.append("notes", value.p_chat);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/declinePayment`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setLoading(false)
          Alerts.SuccessNormal("Marked as customer declined payment.")
          getPaymentStatus();
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
        <ModalHeader toggle={rejectHandler}>Decline Payment</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <textarea
                className={classNames("form-control", {
                  "is-invalid": errors.p_chat,
                })}
                id="textarea"
                rows="6"
                name="p_chat"
                ref={register}
                placeholder="Enter text here..."
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
