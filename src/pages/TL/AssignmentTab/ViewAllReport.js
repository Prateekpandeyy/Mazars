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
import { Typography } from "@material-ui/core";

const Schema = yup.object().shape({
  p_chat: yup.string().required("required discussion"),
});

function ViewReport({ reportModal, ViewReport, report, headColor, dataItem }) {
  const userId = window.localStorage.getItem("tlkey");
  const [data, setData] = useState([]);
  const [docData, setDocData] = useState({});
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const token = window.localStorage.getItem("tlToken");

  const toggleNested = (key) => {
    setNestedModal(!nestedModal);
    setDocData(key);
  };

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    // setDocData(report)
  };

  //check
  const toggleDiscard = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to discard ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, discard it!",
    }).then((result) => {
      if (result.value) {
        deleteCliente(id);
      }
    });
  };
  const downloadpdf = (qid, name) => {
    let userId, token;

    userId = window.localStorage.getItem("tlkey");
    token = window.localStorage.getItem("tlToken");
    const myConfig2 = {
      headers: {
        uit: token,
      },
      responseType: "blob",
    };
    axios
      .get(
        `${baseUrl}/tl/viewreportdocument?assign_no=${report}&id=${qid}`,
        myConfig2
      )
      .then((res) => {
        if (res.status === 200) {
          window.URL = window.URL || window.webkitURL;
          var url = window.URL.createObjectURL(res.data);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = url;

          a.download = name;
          a.target = "_blank";
          a.click();
        }
      });
  };
  const downloadpdfclient = (qid, name) => {
    let userId, token;

    userId = window.localStorage.getItem("tlkey");
    token = window.localStorage.getItem("tlToken");
    const myConfig2 = {
      headers: {
        uit: token,
      },
      responseType: "blob",
    };
    axios
      .get(
        `${baseUrl}/tl/viewreportdocument?assign_no=${report}&id=${qid}&document=2`,
        myConfig2
      )
      .then((res) => {
        if (res.status === 200) {
          window.URL = window.URL || window.webkitURL;
          var url = window.URL.createObjectURL(res.data);
          var a = document.createElement("a");
          document.body.appendChild(a);

          a.style = "display: none";
          a.href = url;
          a.download = name;
          a.target = "_blank";
          a.click();
        }
      });
  };
  const deleteCliente = (id) => {
    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("id", dataItem.q_id);
    formData.append("query_no", dataItem.assign_no);
    formData.append("type", 2);
    formData.append("docid", id.docid);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/draftDiscussion`,
      headers: {
        uit: token,
      },
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          getData();

          Alerts.SuccessNormal("Discarded Successfully");
          ViewReport();
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getData();
  }, [report]);

  const getData = () => {
    if (report && report.length > 0) {
      let formData = new FormData();
      formData.append("assign_no", report);
      formData.append("uid", JSON.parse(userId));
      formData.append("stages_type", 2);

      axios({
        method: "POST",
        url: `${baseUrl}/tl/getstagesinfo`,
        headers: {
          uit: token,
        },
        data: formData,
      })
        .then(function (response) {
          if (response.data.code === 1) {
            setData(response.data.result);
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <div>
      <Modal isOpen={reportModal} toggle={ViewReport} size="lg" scrollable>
        <ModalHeader toggle={ViewReport}>
          <Typography variant="h6">View all report</Typography>
          <button class="autoWidthBtn" onClick={() => ViewDiscussionToggel()}>
            View discussion
          </button>
        </ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th
                  style={{
                    border: `1px solid ${headColor}`,
                    color: "#fff",
                    backgroundColor: `${headColor}`,
                  }}
                >
                  S.No
                </th>
                <th
                  style={{
                    border: `1px solid ${headColor}`,
                    color: "#fff",
                    backgroundColor: `${headColor}`,
                    width: "120px",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    border: `1px solid ${headColor}`,
                    color: "#fff",
                    backgroundColor: `${headColor}`,
                  }}
                >
                  Document
                </th>
                <th
                  style={{
                    border: `1px solid ${headColor}`,
                    color: "#fff",
                    backgroundColor: `${headColor}`,
                    width: "150px",
                  }}
                >
                  Report type
                </th>
                <th
                  style={{
                    border: `1px solid ${headColor}`,
                    color: "#fff",
                    backgroundColor: `${headColor}`,
                    width: "100px",
                  }}
                >
                  Action
                </th>
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
                              <span
                                onClick={() => downloadpdf(p.docid, p.document)}
                                style={{ display: "flex", cursor: "pointer" }}
                              >
                                <i className="fa fa-photo"></i>

                                <p style={{ marginLeft: "15px" }}>
                                  {p.document}
                                </p>
                              </span>
                            </p>
                          )}
                        </tr>
                        {p.customer_files && (
                          <tr>
                            <span
                              onClick={() =>
                                downloadpdfclient(p.docid, p.customer_files)
                              }
                              style={{ display: "flex", cursor: "pointer" }}
                            >
                              <i className="fa fa-photo"></i>
                              &nbsp; &nbsp; &nbsp;{p.customer_files}
                            </span>
                          </tr>
                        )}
                      </td>

                      <td>
                        <p>
                          {" "}
                          {(p.stages_type == 2 && "Draft Report") ||
                            (p.stages_type == 3 && "Final Report")}
                        </p>
                        <br></br>
                        {p.customer_files === null ? (
                          ""
                        ) : (
                          <p> Reviewed Report </p>
                        )}{" "}
                      </td>
                      <td>
                        {p.stages_type === "2" ? (
                          <>
                            {p.status === "3" ? (
                              <p className="declined"> Discarded</p>
                            ) : null}
                            {p.status === "1" ? (
                              <div
                                style={{ cursor: "pointer" }}
                                title="Client Accepted"
                              >
                                <i
                                  class="fa fa-check"
                                  style={{
                                    color: "blue",
                                    fontSize: "16px",
                                    marginLeft: "10px",
                                  }}
                                ></i>
                              </div>
                            ) : null}
                            {p.status === "0" || p.status === "2" ? (
                              <>
                                {p.tlstatus === "0" ? (
                                  <p className="declined">Pending</p>
                                ) : (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-around",
                                    }}
                                  >
                                    <div title="Discussion">
                                      <i
                                        class="fa fa-comments-o"
                                        style={{
                                          fontSize: 16,
                                          cursor: "pointer",
                                          marginLeft: "8px",
                                          color: "green",
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
                                          color: "red",
                                        }}
                                        onClick={() => toggleDiscard(p)}
                                      ></i>
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : null}
                          </>
                        ) : null}
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
        headColor={headColor}
      />
    </div>
  );
}

export default ViewReport;
