import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import Alerts from "../../common/Alerts";
import { Spinner } from 'reactstrap';
import Swal from 'sweetalert2';

function AddAdditionalQuery({ addHandler, addModal, assingNo, getQuery }) {

 

 
  const { handleSubmit, register, reset } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (value) => {
  
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
       
        if (response.data.code === 1) {
          setLoading(false)
        
          Swal.fire({
            title : "success",
            html : "File uploaded successfully.",
            icon : "success"
          })
       
          reset();
          getQuery();
        } else if (response.data.code === 0) {
          Swal.fire({
            title : "error",
            html : "Something went wrong, please try again",
            icon : "error"
          })
          setLoading(false)
        }
      })
      .catch((error) => {

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

            <div className="modal-footer">
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
