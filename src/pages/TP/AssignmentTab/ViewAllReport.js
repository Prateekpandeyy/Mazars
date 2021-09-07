import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl, ReportUrl } from "../../../config/config";
import * as yup from "yup";
import CommonServices from "../../../common/common";
import RejectedModal from "./RejectModal";
import Alerts from "../../../common/Alerts";
import Swal from "sweetalert2";
import DiscardReport from "./DiscardReport";


const Schema = yup.object().shape({
  p_chat: yup.string().required("required discussion"),
});

function ViewReport({
  reportModal,
  ViewReport,
  report,
  dataItem
}) {
  const userId = window.localStorage.getItem("tpkey");
  const [data, setData] = useState([]);
  const [docData, setDocData] = useState({});


  const [nestedModal, setNestedModal] = useState(false);
  const toggleNested = (key) => {
    setNestedModal(!nestedModal);
    setDocData(key)
  }

  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    // setDocData(report)
  }


  //check
  const toggleDiscard = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to discard ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, discarted it!",
    }).then((result) => {
      if (result.value) {
        deleteCliente(id);
      }
    });
  };

  const deleteCliente = (id) => {
    console.log(id)
    let formData = new FormData();
    formData.append("tp_id", JSON.parse(userId));
    formData.append("id", dataItem.q_id);
    formData.append("query_no", dataItem.assign_no);
    formData.append("type", 2);
    formData.append("docid", id.docid);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/draftDiscussion`,
      data: formData,
    })
      .then(function (response) {
        console.log("response-", response);
        if (response.data.code === 1) {
          getData()
          Alerts.SuccessNormal("Discarded Successfully")
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


  useEffect(() => {
    getData();
  }, [report]);

  const getData = () => {
    let formData = new FormData();
    formData.append("assign_no", report);
    formData.append("uid", JSON.parse(userId));
    formData.append("stages_type", 2);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/getstagesinfo`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setData(response.data.result)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  }


  return (
    <div>
      <Modal isOpen={reportModal} toggle={ViewReport} size="lg" scrollable>
        <ModalHeader toggle={ViewReport}>
          <div style={{display:"flex",justifyContent:"space-between",width:"55vw"}}>
            <span>View All Reports</span>
            <span>
              <button class="btn btn-success" onClick={() => ViewDiscussionToggel()}>
                View Discussion
              </button>
            </span>
          </div>
        </ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="row">S.No</th>
                <th scope="row">Date</th>
                <th scope="row">Document</th>
                <th scope="row">Report Type</th>
                <th scope="row">Action</th>
              </tr>
            </thead>

            {data.length > 0
              ? data.map((p, i) => (
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{CommonServices.removeTime(p.created_date)}</td>
                    <td>
                      <tr>
                      {p.document && (
                        <p style={{ display: "flex" }}>
                          <a
                            href={`${ReportUrl}/${report}/${p.document}`}
                            target="_blank"
                          >
                            <i class="fa fa-photo"></i>
                          </a>
                          <p style={{ marginLeft: "15px" }}>{p.document}</p>
                        </p>
                      )}
                      </tr>
                     {p.customer_files && 
                      <tr>
                    
                      <a
                            href={`${ReportUrl}/${report}/${p.customer_files}`}
                            target="_blank"
                          >
                            <i class="fa fa-photo"></i> 
                          </a> &nbsp; &nbsp; &nbsp;{p.customer_files}
                    </tr> }
                    </td>
                  
                    <td>
                     <p> {p.stages_type == 2 && "Draft Report" || p.stages_type == 3 && "Final Report"}</p>
                 <br></br> 
                 {p.customer_files === null ?  "" : <p>   Reviewed Report </p> }  </td>
                    <td>
                      {
                        p.stages_type == "2" ?
                          <div>
                            {
                              p.status == "0" ?
                                <p style={{ color: "red" }}>Pending</p>
                                :
                                p.status == "1" ?
                                  <div style={{ cursor: "pointer" }} title="Customer Accepted">
                                    <i
                                      class="fa fa-check"
                                      style={{
                                        color: "blue",
                                        fontSize: "16px",
                                        marginLeft: "10px"
                                      }}
                                    ></i>
                                  </div> :
                                  p.status == "2" ?
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                      <div title="Discussion">
                                        <i
                                          class="fa fa-comments-o"
                                          style={{
                                            fontSize: 16,
                                            cursor: "pointer",
                                            marginLeft: "8px",
                                            color: "green"
                                          }}
                                          onClick={() => toggleNested(p)}
                                        ></i>
                                      </div>
                                      <div title="Discard">
                                        <i
                                          class="fa fa-times"
                                          style={{
                                            fontSize: 16,
                                            cursor: "pointer",
                                            marginLeft: "8px",
                                            color: "red"
                                          }}
                                          onClick={() => toggleDiscard(p)}
                                        ></i>
                                      </div>
                                    </div>
                                    :
                                    p.status == "3" ?
                                      <p style={{ color: "red" }}>Discarded</p> :
                                      null
                            }
                          </div>
                          :
                          null
                      }
                    </td>
                  </tr>
                </tbody>
              ))
              : null}
          </table>
        </ModalBody>
      </Modal>

      <RejectedModal
        toggleNested={toggleNested}
        nestedModal={nestedModal}
        dataItem={dataItem}
        docData={docData}
        getData={getData}
      />


      <DiscardReport
        ViewDiscussionToggel={ViewDiscussionToggel}
        ViewDiscussion={ViewDiscussion}
        report={report}
        getData={getData}
      />

    </div>
  );
}

export default ViewReport;
