import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import Swal from "sweetalert2";
import { Spinner } from 'reactstrap';
import Select from "react-select";

function DraftReport({ des, qno, loading, setFinalModal, setLoading, fianlModal, uploadFinalReport, id, getAssignmentList }) {
  const alert = useAlert();
  const { handleSubmit, register, reset } = useForm();
  const token = window.localStorage.getItem("tlToken")
  const [client, setClient] = useState([])
  const [email, setEmail] = useState("")
  const [copyUser, setCopyUser] = useState([])
  const myConfig = {
    headers : {
     "uit" : token
    }
  }
  const getClient = () => {
    let collectData = []
    axios.get(
      `${baseUrl}/tl/querycustomers?query_id=${qno}`, myConfig
    )
    .then((res) => {
      let email = {}
      console.log("response", res)
      res.data.result.map((i) => {
        console.log("iii", i)
        email = {
          label : i.email,
          value : i.email
        }
        collectData.push(email)
        
      })
      console.log("data", collectData)
      setClient(collectData)
    })
  }
const selectedUser = () => {
  let collectData = []
  axios.get(`${baseUrl}/tl/getreportemail?id=${qno}`, myConfig)
  .then((res) => {
    let email = {}
    console.log("response", res)
    res.data.result.map((i) => {
      console.log("iii", i)
      email = {
        label : i.email,
        value : i.email
      }
      collectData.push(email)
      
    })
    setCopyUser(collectData)
  })
}
  useEffect(() => {
    getClient()
    selectedUser()
  }, [fianlModal]);

  const onSubmit = (value) => {
    des = false;
    setLoading(true)

    let formData = new FormData();
    formData.append("emails", email)
    var uploadImg = value.p_final;
    if (uploadImg) {
      for (var i = 0; i < uploadImg.length; i++) {
        let file = uploadImg[i];
        formData.append("final_report[]", file);
      }
    }


    formData.append("id", id.id);
    formData.append("q_id", id.q_id);
    axios
      .post(`${baseUrl}/tl/UploadReport`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          uit : token
        },
      })
      .then((response) => {
   
        if (response.data.code === 1  && des === false) {
          
          setLoading(false)
          des = true
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
          uploadFinalReport();
          
        } else if (response.data.code === 0) {
          setLoading(false)
        }
      });
  };

  const clientFun = (e) => {
    setCopyUser(e)
    let a = []
    e.map((i) => {
      a.push(i.value)
    })
    console.log("eee", e)
    setEmail(a)
  }

  return (
    <div>
      <Modal isOpen={fianlModal} toggle={uploadFinalReport} size="md">
        <ModalHeader toggle={uploadFinalReport}>Final Report</ModalHeader>
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
                name="p_final"
                ref={register}
                className="form-control-file manage_file"
                multiple
              />
            </div>
            <div>
              {
                loading ?
                  <Spinner color="primary" />
                  :
                  <button type="submit" className="customBtn mr-auto">
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

 // formData.append("final_report", value.p_final[0]);