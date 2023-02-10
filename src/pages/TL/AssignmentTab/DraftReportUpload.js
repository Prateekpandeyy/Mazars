import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Swal from "sweetalert2";
import { Spinner } from "reactstrap";
import Select from "react-select";

function DraftReport({
  loading,
  qno,
  setDraftModal,
  setLoading,
  draftModal,
  uploadDraftReport,
  id,
  getAssignmentList,
  des,
}) {
  const { handleSubmit, register, reset } = useForm();
  const [client, setClient] = useState([]);
  const [email, setEmail] = useState("");
  const [copyUser, setCopyUser] = useState([]);
  const token = window.localStorage.getItem("tlToken");

  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getClient = () => {
    let collectData = [];
    if (qno) {
      axios
        .get(`${baseUrl}/tl/querycustomers?query_id=${qno}`, myConfig)
        .then((res) => {
          let email = {};
          console.log("response", res);
          res.data.result.map((i) => {
            console.log("iii", i);
            email = {
              label: i.email,
              value: i.email,
            };
            collectData.push(email);
          });
          console.log("data", collectData);
          setClient(collectData);
        });
    }
  };
  const selectedUser = () => {
    let collectData = [];
    if (qno) {
      axios
        .get(`${baseUrl}/tl/getreportemail?id=${qno}`, myConfig)
        .then((res) => {
          let email = {};
          console.log("response", res);
          res.data.result.map((i) => {
            console.log("iii", i);
            email = {
              label: i.email,
              value: i.email,
            };
            collectData.push(email);
          });
          setCopyUser(collectData);
        });
    }
  };
  useEffect(() => {
    getClient();
    selectedUser();
  }, [draftModal]);

  const onSubmit = (value) => {
    setLoading(true);
    des = false;
    let formData = new FormData();
    var uploadImg = value.p_draft;
    formData.append("emails", email);

    if (uploadImg) {
      for (var i = 0; i < uploadImg.length; i++) {
        let file = uploadImg[i];
        formData.append("draft_report[]", file);
      }
    }

    formData.append("id", id);
    axios
      .post(`${baseUrl}/tl/UploadReport`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          uit: token,
        },
      })
      .then((response) => {
        if (response.data.code === 1 && des === false) {
          des = true;
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
              title: "Success",
              html: `<p class="text-danger">${message.faill}</p>`,
              icon: "success",
            });
          }
          getAssignmentList();
          setDraftModal(!draftModal);
        } else if (response.data.code === 0) {
          setLoading(false);
        }
      });
  };
  const clientFun = (e) => {
    setCopyUser(e);
    let a = [];
    e.map((i) => {
      a.push(i.value);
    });
    console.log("eee", e);
    setEmail(a);
  };

  return (
    <div>
      <Modal isOpen={draftModal} toggle={uploadDraftReport} size="md">
        <ModalHeader toggle={uploadDraftReport}>Draft Report</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-group">
              <label>Copy to</label>
              <Select
                isMulti={true}
                onChange={(e) => clientFun(e)}
                options={client}
                value={copyUser}
              />
            </div>
            <div className="mb-3">
              <label>Upload multiple report</label>
              <input
                type="file"
                name="p_draft"
                ref={register}
                className="form-control-file manage_file"
                multiple
              />
            </div>
            <div>
              {loading ? (
                <Spinner color="primary" />
              ) : (
                <button type="submit" className="customBtn mr-auto">
                  Upload
                </button>
              )}
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DraftReport;
