import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import Alerts from "../../common/Alerts";
import { Spinner } from 'reactstrap';
import Swal from "sweetalert2";
const Schema = yup.object().shape({
  p_chat: yup.string().required(""),
});

function RejectedModal({
    showRejectedBox,
    rejectedBox,
    deleteCliente,
    getQueriesData,
    assignNo
}) {
  const token = window.localStorage.getItem("clientToken")
  const userId = window.localStorage.getItem("userid");
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (value) => {
 
    setLoading(true)

   let formData = new FormData();
   formData.append("uid", JSON.parse(userId));
   formData.append("id", assignNo);
   formData.append("notes" , value.p_chat);

   axios({
       method: "POST",
       url: `${baseUrl}/customers/deleteQuery`,
       headers: {
         uit : token
       },
       data: formData,
   })
       .then(function (response) {
         
           if (response.data.code === 1) {
            deleteCliente()
               setLoading(false)
               Swal.fire("", "Query deleted successfully.", "success");
               getQueriesData();
           } else if (response.data.code === 0) {
               setLoading(false)
               Swal.fire("Oops...", "Query not deleted ", "error");
           }
       })
       .catch((error) => {
          
      });
  };

  return (
    <div>
      <Modal isOpen={rejectedBox} toggle={deleteCliente} size="md">
        <ModalHeader toggle={deleteCliente}>Please provide the reason</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} style={{display  : "flex", flexDirection : "column", width : "100%"}}>
            <div className="row">
            <div className="col-lg-12">
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
