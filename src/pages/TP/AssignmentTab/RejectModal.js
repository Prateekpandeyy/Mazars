import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import Alerts from "../../../common/Alerts";
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
  const userId = window.localStorage.getItem("tpkey");
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });


  const [loading, setLoading] = useState(false);
 

  const onSubmit = (value) => {
   console.log(value)
    setLoading(true)

    let formData = new FormData();
    formData.append("tp_id", JSON.parse(userId));
    formData.append("id", dataItem.q_id);
    formData.append("query_no", dataItem.assign_no);
    formData.append("message", value.p_chat);
    formData.append("type", 1);
    formData.append("docid", docData.docid);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/draftDiscussion`,
      data: formData,
    })
      .then(function (response) {
        
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
                    <Button color="primary"className="btn btn-danger ml-2" onClick={toggleNested}>Cancel</Button>
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

