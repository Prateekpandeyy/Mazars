import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import Swal from "sweetalert2";
import { Spinner } from 'reactstrap';




function DraftReport({ draftModal, uploadDraftReport, id, getAssignmentList }) {
  const alert = useAlert();
  const { handleSubmit, register, reset } = useForm();
  const [loading, setLoading] = useState(false);



  const onSubmit = (value) => {
    console.log("value :", value);
    setLoading(true)

    let formData = new FormData();
    var uploadImg = value.p_draft;
    console.log("uploadImg", uploadImg);

    if (uploadImg) {
      for (var i = 0; i < uploadImg.length; i++) {
        let file = uploadImg[i];
        formData.append("draft_report[]", file);
      }
    }

    formData.append("id", id);
    axios.post(`${baseUrl}/tl/UploadReport`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response)
      if (response.data.code === 1) {
        setLoading(false)
        var message = response.data.message
        if (message.invalid) {
          Swal.fire({
            title: 'Error !',
            html: `<p class="text-danger">${message.invalid}</p>`,
          })
        } else if (message.faill && message.success) {
          Swal.fire({
            title: 'Success',
            html: `<p class="text-danger">${message.faill}</p> <br/> <p>${message.success}</p> `,
            icon: 'success',
          })
        } else if (message.success) {
          Swal.fire({
            title: 'Success',
            html: `<p>${message.success}</p>`,
            icon: 'success',
          })
        }
        else if (message.faill) {
          Swal.fire({
            title: 'Success',
            html: `<p class="text-danger">${message.faill}</p>`,
            icon: 'success',
          })
        }
        getAssignmentList();
        uploadDraftReport();
      } else if (response.data.code === 0) {
        setLoading(false)
      }

    });
  };


  return (
    <div>
      <Modal isOpen={draftModal} toggle={uploadDraftReport} size="md">
        <ModalHeader toggle={uploadDraftReport}>Draft Report</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label>Upload Multiple Report</label>
              <input
                type="file"
                name="p_draft"
                ref={register}
                className="form-control-file manage_file"
                multiple
              />
            </div>
            <div class="modal-footer">
              {
                loading ?
                  <Spinner color="primary" />
                  :
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Upload
                  </button>
              }
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DraftReport;


