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
import { useHistory } from "react-router";
const Schema = yup.object().shape({
  p_chat: yup.string().required(""),
});

function RejectedModal22({
    showRejectedBox,
    rejectedBox,
    deleteCliente,
    getQueriesData,
    assignNo
}) {
let history = useHistory()
  const userId = window.localStorage.getItem("userid");
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (value) => {
 setLoading(true)

    let formData = new FormData();
    formData.append("id", assignNo);
    formData.append("status", 6);
    formData.append("notes", value.p_chat);
    axios({
      method: "POST",
      url: `${baseUrl}/customers/ProposalAccept`,
      data: formData,
    })
      .then(function (response) {
       
        if (response.data.code === 1) {
          setLoading(false)
          Swal.fire("Rejected!", "", "success");
          history.push({
            pathname: `/customer/proposal`,
            index: 0,
          });
        } else {
          setLoading(false)
          Swal.fire("Oops...", "Errorr ", "error");
        }
      })
      .catch((error) => {
     
      });
  };

  return (
    <div>
      <Modal isOpen={rejectedBox} toggle={deleteCliente} size="md">
        <ModalHeader toggle={deleteCliente}>Please Provide the reason</ModalHeader>
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

export default RejectedModal22;
