import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";

function AcceptModal({ acceptedModal, acceptedHandler, id,getProposalData}) {
    const { handleSubmit, register, reset } = useForm();
    const alert = useAlert();
// console.log("accept-id",id)

    const onSubmit = (value) => {
      console.log("value :", value);

      let formData = new FormData();
      formData.append("revised_text", value.p_text);
      formData.append("id", id);
    
      axios({
        method: "POST",
        url: `${baseUrl}/customers/updateRevisedText`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response); 
          if (response.data.code === 1) {
            alert.success("Revision Submitted!");
            getProposalData();
            acceptedHandler();        
          } 
                      
        })
        .catch((error) => {
          console.log("erroror - ", error);
       });
  };

    return (
        <div>
              <Modal isOpen={acceptedModal} toggle={acceptedHandler} size="md">
              <ModalHeader toggle={acceptedHandler}>Add message</ModalHeader>
              <ModalBody>
                   <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="p_text"
                      ref={register}
                      placeholder="enter message"
                    />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </ModalBody>
            </Modal>
        </div>
    );
}

export default AcceptModal;