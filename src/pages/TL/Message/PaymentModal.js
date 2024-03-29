import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useHistory, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
function PaymentModal({
  addPaymentModal,
  paymentHandler,
  data,
  // getProposalData,
}) {
  const { handleSubmit, register, reset } = useForm();
 
  const history = useHistory();
  const { id } = useParams();

  const userId = window.localStorage.getItem("tlkey");


  const onSubmit = (value) => {


    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("assign_id", id);
    formData.append("message_type","information");
    formData.append("message", value.p_message);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/messageSent`,
      data: formData,
    })
      .then(function (response) {
      
        if (response.data.code === 1) {
          reset();
          Swal.fire({
            tilte : "success",
            html : "message successfully send!",
            icon : "success"
          })
         
          paymentHandler()
        }
      })
      .catch((error) => {
       
      });
  };


  return (
    <div>
      <Modal isOpen={addPaymentModal} toggle={paymentHandler} size="md">
        <ModalHeader toggle={paymentHandler}>Message</ModalHeader>
        <ModalBody>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <textarea
                    class="form-control"
                    placeholder="Message text here"
                    rows="5"
                    ref={register}
                    name="p_message"
                  ></textarea>

                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PaymentModal;
