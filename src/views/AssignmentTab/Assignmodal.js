import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Swal from "sweetalert2";
import { Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import ShowError from "../../components/LoadingTime/LoadingTime";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
function Assignmodal({
  additionalQuery,
  additionalHandler,
  assignNo,
  modaldoc,
}) {
  const { handleSubmit, register } = useForm();
  const token = window.localStorage.getItem("clientToken");
  const [loading, setLoading] = useState(false);
  const [isFile, setIsFile] = useState(true);
  const [file, setFile] = useState("");
  let history = useHistory();
  const onSubmit = (value) => {
    if (file?.name?.length > 0) {
      setIsFile(true);
      setLoading(true);

      let formData = new FormData();
      var uploadImg = value.p_upload;
      if (uploadImg) {
        for (var i = 0; i < uploadImg.length; i++) {
          let file = uploadImg[i];
          formData.append("upload", file);
        }
      }
      formData.append("uid", assignNo);
      formData.append("doc_id", modaldoc);
      // formData.append("assign_no", assignNo);

      axios({
        method: "POST",
        url: `${baseUrl}/customers/documentAttach`,
        headers: {
          uit: token,
        },
        data: formData,
      })
        .then(function (response) {
          if (response.data.code === 1) {
            setLoading(false);
            var message = response.data.message;
            if (message.invalid) {
              Swal.fire({
                title: "Error !",
                html: `<p class="text-danger">${message.invalid}</p>`,
              });
            } else if (message.faill && message.success) {
              Swal.fire({
                title: "Success",
                html: `<p class="text-danger">${message.faill}</p> <br/> <p>${message.success}</p> `,
                icon: "success",
              });
            } else if (message.success) {
              Swal.fire({
                title: "Success",
                html: `<p>${message.success}</p>`,
                icon: "success",
              });
            } else if (message.faill) {
              Swal.fire({
                title: "Success !",
                html: `<p class="text-danger">${message.faill}</p>`,
                icon: "success",
              });
            }

            history.push("/customer/assignment");
          } else if (response.data.code === 0) {
            setLoading(false);
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading);
        });
    } else {
      setIsFile(false);
    }
  };

  return (
    <div>
      <Modal isOpen={additionalQuery} toggle={additionalHandler} size="md">
        <ModalHeader toggle={additionalHandler}>Upload document</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Upload Your Document</label>
              <input
                type="file"
                name="p_upload"
                ref={register()}
                className="form-control-file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setIsFile(true);
                }}
              />
              {isFile === false ? (
                <ErrorMessage>Please upload file</ErrorMessage>
              ) : (
                ""
              )}
            </div>

            <div class="modal-footer">
              {loading ? (
                <Spinner color="primary" />
              ) : (
                <button type="submit" className="customBtn">
                  Submit
                </button>
              )}
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Assignmodal;
