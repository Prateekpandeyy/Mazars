import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Swal from "sweetalert2";
import { Spinner } from 'reactstrap';
import ShowError from "../../components/LoadingTime/LoadingTime";
function AdditionalQueryModal({
  additionalQuery,
  additionalHandler,
  assignNo,
  getQueriesData,
  setLoading2,
  loading2
}) {
  const { handleSubmit, register } = useForm();
  
 // const [loading, setLoading] = useState(false);

  const onSubmit = (value) => {
 
    setLoading2(true)

    let formData = new FormData();
    var uploadImg = value.p_upload;
    if (uploadImg) {
      for (var i = 0; i < uploadImg.length; i++) {
        let file = uploadImg[i];
        formData.append("upload[]", file);
      }
    }
    formData.append("assign_no", assignNo);
    axios({
      method: "POST",
      url: `${baseUrl}/customers/PostAdditionalQuery`,
      data: formData,
    })
      .then(function (response) {
    
        if (response.data.code === 1 && loading2 === true) {
          setLoading2(false)
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
              title: 'Success !',
              html: `<p class="text-danger">${message.faill}</p>`,
              icon: 'success',
            })
          }
          additionalHandler();
          getQueriesData();
        } else if (response.data.code === 0) {
          setLoading2(false)
        }
      })
      .catch((error) => {
        ShowError.LoadingError(setLoading2)
       });
  };


  return (
    <div>
      <Modal isOpen={additionalQuery} toggle={additionalHandler} size="md">
        <ModalHeader toggle={additionalHandler}>UPLOAD DOCUMENTS</ModalHeader>
        <ModalBody>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Upload Your Document</label>
              <input
                type="file"
                name="p_upload"
                ref={register}
                className="form-control-file"
                multiple
              />
            </div>

            <div class="modal-footer">
              {
                loading2 ?
                  <Spinner color="primary" />
                  :
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
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

export default AdditionalQueryModal;
