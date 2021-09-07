import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import Alerts from "../../common/Alerts";
import { Spinner } from 'reactstrap';


function AddAdditionalQuery({ addHandler, addModal, assingNo, getQuery }) {

  console.log("assingNo :", assingNo);

  const alert = useAlert();
  const { handleSubmit, register, reset } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (value) => {
    console.log("value :", value);
    setLoading(true)

    let formData = new FormData();
    formData.append("assign_no", assingNo);
    formData.append("upload", value.p_upload[0]);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/PostAdditionalQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setLoading(false)
          var variable = "File uploaded successfully."
          Alerts.SuccessNormal(variable)
          reset();
          getQuery();
        } else if (response.data.code === 0) {
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };



  return (
    <>
      <Modal isOpen={addModal} toggle={addHandler} size="md">
        <ModalHeader toggle={addHandler}>
          UPLOAD DOCUMENTS
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-3">
              <label className="form-label">Upload Your Document</label>
              <input
                type="file"
                name="p_upload"
                ref={register}
                className="form-control-file"
              />
            </div>

            <div class="modal-footer">
              {
                loading ?
                  <Spinner color="primary" />
                  :
                  <button
                    type="submit"
                    onClick={addHandler}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
              }
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

export default AddAdditionalQuery;
