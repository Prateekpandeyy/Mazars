import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import Alerts from "../../common/Alerts";
import { Spinner } from 'reactstrap';


const Schema = yup.object().shape({
  p_chat: yup.string().required("required discussion"),
});

function RejectedModal({
  nestedModal,
  toggleNested,
  dataItem,
  docData,
  getData
}) {
  const userId = window.localStorage.getItem("userid");
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [loading, setLoading] = useState(false);

  console.log("dataItem :", dataItem);

  const onSubmit = (value) => {
    console.log("value :", value);
    setLoading(true)

    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("id", dataItem.assign_id);
    formData.append("query_no", dataItem.assign_no);
    formData.append("message", value.p_chat);
    formData.append("type", 2);
    formData.append("docid", docData.docid);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/draftAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("response-", response);
        if (response.data.code === 1) {
          setLoading(false)
          toggleNested();
          getData();
          var variable = "Submitted Successfully "
          Alerts.SuccessNormal(variable)
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
      <Modal isOpen={nestedModal} toggle={toggleNested} >
        <ModalHeader>Discussion</ModalHeader>
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
                placeholder="enter text here"
              ></textarea>

              {errors.p_chat && (
                <div className="invalid-feedback">{errors.p_chat.message}</div>
              )}
            </div>
            <div class="modal-footer">
              {
                loading ?
                  <Spinner color="primary" />
                  :
                  <div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    <Button color="primary" onClick={toggleNested}>Cancel</Button>
                  </div>
              }
            </div>
          </form>
        </ModalBody>
      </Modal >

    </div >
  );
}

export default RejectedModal;

