import React, { useState, useEffect } from "react";
import CommonServices from "../../common/common";
import { ReportUrl } from "../../config/config";
import { baseUrl } from "../../config/config";
import axios from "axios";
import MainText from "../Common/MainText";
import CreateFolder from "./Folder/CreateFolder";
import Select from "react-select";
import styled from "styled-components";
import FolderIcon from "@mui/icons-material/Folder";
import ArticleIcon from "@mui/icons-material/Article";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ShowFolder from "./Folder/ShowFolder";
import Swal from "sweetalert2";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const FolderWrapper = styled(Box)({
  display: "flex",

  alignItems: "flex-start",
  flexWrap: "wrap",
  margin: "0px 20px 0px 0px",
});

const FolderDetails = styled(Box)({
  display: "flex",
  width: "100%",
  alignItems: "flex-start",
  flexWrap: "wrap",
});

function AssignmentDetails({
  p,
  panel,
  finalDate,
  submitData,
  customerQuery,
  diaplayAssignment,
  diaplayProposal,
  reports,
  assingNo,
}) {
  const { assignment_number, assignment_date, date_of_delivery } =
    diaplayAssignment;

  const { cust_accept_date } = diaplayProposal;
  const [createFoldernew, setCreateFolder] = useState(false);
  const [folder, setFolder] = useState([]);
  const [color, setColor] = useState(0);
  const [innerFiles, setInnerFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [fileId, setFileId] = useState("");
  const [move, setMove] = useState(false);
  const [movedFolder, setMovedFolder] = useState([]);
  const [folderId, setFolderId] = useState([]);
  const [clientAssign, setClientAssign] = useState(null);
  const [leftFolder, setLeftFolder] = useState([]);
  const [isLeft, setIsLeft] = useState(true);
  const qid = useParams();
  const uid = localStorage.getItem("tlkey");
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const timeTaken = (a, b) => {
    var date2 = CommonServices.removeTime(a);
    var date1 = CommonServices.removeTime(b);

    var difference = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
  };
  const showFolder = () => {
    if (window.location.pathname.split("/")[1] === "teamleader") {
      let kk = [];
      let leftFold = [];
      let movedFold = {};
      movedFold = {
        label: "...(root)",
        value: "0",
      };
      kk.push(movedFold);
      axios
        .get(
          `${baseUrl}/tl/queryfolderlistreport?q_id=${qid.id}&uid=${JSON.parse(
            uid
          )}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setFolder(res.data.result);
            res.data.result.map((i) => {
              movedFold = {
                label: i.folder,
                value: i.id,
              };
              kk.push(movedFold);
              leftFold.push(movedFold);
            });
            setMovedFolder(kk);
            setLeftFolder(leftFold);
          }
        });
    }
  };
  const getFile = () => {
    if (window.location.pathname.split("/")[1] === "teamleader") {
      axios
        .get(
          `${baseUrl}/tl/documentlistbyfolderreport?q_id=${
            qid.id
          }&uid=${JSON.parse(uid)}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setFiles(res.data.result);
          }
        });
    }
  };
  const mapIcon = (e) => {
    let fold = "folder_id";
    if (clientAssign === "clientFolder") {
      fold = "customer_files_folder";
    } else {
      fold = "folder_id";
    }
    axios
      .get(
        `${baseUrl}/tl/folderfileReport?q_id=${qid.id}&${fold}=${folderId.value}&file_id=${fileId}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          handleFile();
          showFolder();
          getFile();
          setInnerFiles([]);
          setColor(0);
          Swal.fire({
            title: "success",
            html: "File transfered successfully",
            icons: "success",
          });
        } else if (res.data.code === 0) {
          Swal.fire({
            title: "error",
            html: "Something went wrong, please try again",
            icons: "error",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "error",
          html: error,
          icons: "error",
        });
      });
  };
  const rightClick = (e, a, b, c) => {
    e.preventDefault();
    downloadpdf(a, b, c);
  };
  const getInnerFileFile = (e) => {
    axios
      .get(
        `${baseUrl}/tl/documentlistbyfolderreport?q_id=${qid.id}&folder_id=${
          e.id
        }&uid=${JSON.parse(uid)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setColor(e.id);
          setInnerFiles(res.data.result);
        }
      });
  };
  const downloadpdf = (qno, qid, name) => {
    let userId, token;
    if (panel === "admin") {
      userId = window.localStorage.getItem("adminkey");
      token = window.localStorage.getItem("adminToken");
      const myConfig2 = {
        headers: {
          uit: token,
        },
        responseType: "blob",
      };
      axios
        .get(
          `${baseUrl}/admin/viewreportdocument?assign_no=${qno}&id=${qid}`,
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
    } else if (panel === "teamleader") {
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
          `${baseUrl}/tl/viewreportdocument?assign_no=${qno}&id=${qid}`,
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
    } else if (panel === "taxprofessional") {
      userId = window.localStorage.getItem("tpkey");
      token = window.localStorage.getItem("tptoken");
      const myConfig2 = {
        headers: {
          uit: token,
        },
        responseType: "blob",
      };
      axios
        .get(
          `${baseUrl}/tl/viewreportdocument?assign_no=${qno}&id=${qid}`,
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
    } else if (panel === "client") {
      userId = window.localStorage.getItem("userid");
      token = window.localStorage.getItem("clientToken");
      const myConfig2 = {
        headers: {
          uit: token,
        },
        responseType: "blob",
      };
      axios
        .get(
          `${baseUrl}/customers/viewreportdocument?assign_no=${qno}&id=${qid}`,
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
    }
  };
  const getFolder = (e) => {
    setCreateFolder(!createFoldernew);
  };
  const handleFile = (e, i, isLeft, b) => {
    e.preventDefault();
    setIsLeft(isLeft);
    if (i) {
      setFileId(i.id);
      setMove(!move);
    } else {
      setMove(!move);
    }
    if (b === "clientFiles") {
      setClientAssign(b);
    }
  };
  useEffect(() => {
    getFile();
    showFolder();
  }, []);
  console.log("leftFolder", leftFolder, movedFolder);
  return (
    <>
      <div className="queryBox">
        <MainText align="center">Assignment details</MainText>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Titles</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Assignment number</th>
              <td>{assignment_number}</td>
            </tr>
            <tr>
              <th scope="row">Assignment date</th>
              <td>{CommonServices.removeTime(assignment_date)}</td>
            </tr>
            <tr>
              <th scope="row">Proposed date of completion</th>
              <td>
                {p.query_status >= 9 ? (
                  <p>{CommonServices.removeTime(p.Exp_Delivery_Date)}</p>
                ) : null}
              </td>
            </tr>
            {/* {p.query_status >= 9 ? ( */}
            <tr>
              <th scope="row">Assignment status</th>
              <td>
                <tr style={{ display: "flex" }}>
                  <th style={{ display: "flex", width: "200px" }}>
                    Assignment stage
                  </th>
                  <th style={{ display: "flex", width: "200px" }}>Status</th>
                </tr>
                <tr style={{ display: "flex" }}>
                  <td style={{ display: "flex", width: "200px" }}>
                    Client discussion
                  </td>
                  <td style={{ display: "flex", width: "200px" }}>
                    {CommonServices.capitalizeFirstLetter(p.client_discussion)}
                  </td>
                </tr>
                <tr style={{ display: "flex" }}>
                  <td style={{ display: "flex", width: "200px" }}>
                    Draft reports
                  </td>
                  <td style={{ display: "flex", width: "200px" }}>
                    {CommonServices.capitalizeFirstLetter(p.draft_report)}
                  </td>
                </tr>
                <tr style={{ display: "flex" }}>
                  <td style={{ display: "flex", width: "200px" }}>
                    Final discussion
                  </td>
                  <td style={{ display: "flex", width: "200px" }}>
                    {CommonServices.capitalizeFirstLetter(p.final_discussion)}
                  </td>
                </tr>
                <tr style={{ display: "flex" }}>
                  <td style={{ display: "flex", width: "200px" }}>
                    Delivery of final reports
                  </td>
                  <td style={{ display: "flex", width: "200px" }}>
                    {CommonServices.capitalizeFirstLetter(p.delivery_report)}
                  </td>
                </tr>
                <tr style={{ display: "flex" }}>
                  <td style={{ display: "flex", width: "200px" }}>
                    Awaiting completion
                  </td>
                  <td style={{ display: "flex", width: "200px" }}>
                    {CommonServices.capitalizeFirstLetter(p.other_stage)}
                  </td>
                </tr>
              </td>
            </tr>
            {/* ) : null} */}
            <tr>
              <th scope="row">Time taken to complete the assignment</th>
              <td>
                {p.client_discussion == "completed" &&
                p.delivery_report == "completed" &&
                p.draft_report == "completed" &&
                p.final_discussion == "completed"
                  ? finalDate + " Days"
                  : null}
              </td>
            </tr>
            {panel == "teamleader" ? (
              <tr>
                <td
                  scope="row"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "16px", fontWeight: "300" }}>
                      Uploaded documents
                    </span>
                    <button
                      className="autoWidthBtn ml-auto"
                      onClick={(e) => getFolder()}
                    >
                      Create folder
                    </button>
                  </div>
                  <FolderWrapper>
                    {folder.map((i) => (
                      <div className="folderCreated">
                        {color === i.id ? (
                          <FolderIcon
                            onClick={(e) => getInnerFileFile(i)}
                            style={{
                              fontSize: "50px",
                              color: "#0000ff",
                              cursor: "pointer",
                            }}
                          />
                        ) : (
                          <FolderIcon
                            onClick={(e) => getInnerFileFile(i)}
                            style={{
                              fontSize: "50px",
                              color: "#fccc77",
                              cursor: "pointer",
                            }}
                          />
                        )}
                        <span
                          style={{
                            textAlign: "center",
                            whiteSpace: "break-spaces",
                            display: "flex",
                            maxHeight: "60px",
                            overflow: "hidden",
                          }}
                        >
                          {i.folder}{" "}
                        </span>
                      </div>
                    ))}
                    {files.map((i) => (
                      <>
                        {i.folder_id === "0" ? (
                          <>
                            {i.customer_files === null ? (
                              <div className="folderCreated">
                                <ArticleIcon
                                  onContextMenu={(e) => handleFile(e, i, true)}
                                  onClick={(e) =>
                                    rightClick(e, i.assign_no, i.id, i.document)
                                  }
                                  style={{
                                    fontSize: "50px",
                                    color: "#0000ff",
                                    cursor: "pointer",
                                  }}
                                />
                                <span
                                  style={{
                                    textAlign: "center",
                                    whiteSpace: "break-spaces",
                                    display: "flex",
                                    maxHeight: "60px",
                                    overflow: "hidden",
                                  }}
                                >
                                  {i.document}
                                </span>
                              </div>
                            ) : (
                              <>
                                {i.customer_files_folder === "0" ? (
                                  <div className="folderCreated">
                                    <ArticleIcon
                                      onContextMenu={(e) =>
                                        handleFile(e, i, true, "clientFolder")
                                      }
                                      onClick={(e) =>
                                        rightClick(
                                          e,
                                          i.assign_no,
                                          i.id,
                                          i.customer_files
                                        )
                                      }
                                      style={{
                                        fontSize: "50px",
                                        color: "#0000ff",
                                        cursor: "pointer",
                                      }}
                                    />
                                    <span
                                      style={{
                                        textAlign: "center",
                                        whiteSpace: "break-spaces",
                                        display: "flex",
                                        maxHeight: "60px",
                                        overflow: "hidden",
                                      }}
                                    >
                                      {i.customer_files}
                                    </span>
                                  </div>
                                ) : (
                                  " "
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ))}
                  </FolderWrapper>
                </td>
                <td>
                  <div className="d-flex">
                    <FolderDetails>
                      <div className="folderDetails">
                        <span style={{ fontSize: "16px", fontWeight: "300" }}>
                          Folder content
                        </span>
                        <div className="d-flex">
                          {innerFiles.map((i) => (
                            <>
                              <div className="folderCreated">
                                <ArticleIcon
                                  onContextMenu={(e) => handleFile(e, i, false)}
                                  onClick={(e) =>
                                    rightClick(e, i.assign_no, i.id, i.document)
                                  }
                                  style={{
                                    fontSize: "50px",
                                    color: "#0000ff",
                                    cursor: "pointer",
                                  }}
                                />
                                <span
                                  style={{
                                    textAlign: "center",
                                    whiteSpace: "break-spaces",
                                    display: "flex",
                                    maxHeight: "60px",
                                    overflow: "hidden",
                                  }}
                                >
                                  {i.document}
                                </span>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </FolderDetails>
                  </div>
                  {move === true ? (
                    <Modal isOpen={move} toggle={handleFile} size="xs">
                      <ModalHeader toggle={handleFile}>Move to</ModalHeader>
                      <ModalBody>
                        {isLeft === true ? (
                          <Select
                            onChange={(e) => setFolderId(e)}
                            options={leftFolder}
                            placeholder="Please select folder"
                          ></Select>
                        ) : (
                          <Select
                            onChange={(e) => setFolderId(e)}
                            options={movedFolder}
                            placeholder="Please select folder"
                          ></Select>
                        )}
                        <button
                          type="button"
                          onClick={(e) => mapIcon(e)}
                          className="autoWidthBtn my-2"
                        >
                          Submit
                        </button>
                      </ModalBody>
                    </Modal>
                  ) : (
                    " "
                  )}
                  <CreateFolder
                    addPaymentModal={createFoldernew}
                    id={qid.id}
                    getList={showFolder}
                    rejectHandler={getFolder}
                    tab="assignment"
                  />
                </td>
              </tr>
            ) : (
              <tr>
                <th scope="row">Reports</th>
                <td>
                  {reports.map((p, i) => (
                    <>
                      {customerQuery == "customerQuery" &&
                      submitData[0].paid_status == "2" ? null : (
                        <tr style={{ display: "flex", width: "500px" }}>
                          <td style={{ display: "flex", width: "50px" }}>
                            {i + 1}
                          </td>
                          <td style={{ display: "flex", width: "200px" }}>
                            <span
                              onClick={() =>
                                downloadpdf(assingNo, p.docid, p.document)
                              }
                            >
                              <i className="fa fa-photo"></i> {p.document}
                            </span>
                          </td>
                          <td
                            style={{
                              display: "flex",
                              width: "150px",
                              color: "green",
                            }}
                          >
                            {(p.stages_type == 2 &&
                              p.revise_report == null &&
                              "Draft Report") ||
                              (p.stages_type == 3 &&
                                p.revise_report == null &&
                                "Final Report") ||
                              (p.revise_report != null && "Draft Report")}
                          </td>
                          {p.status == "3" ? (
                            <td style={{ display: "flex", width: "100px" }}>
                              <p className="declined">Discarded</p>
                            </td>
                          ) : (
                            <td
                              style={{ display: "flex", width: "200px" }}
                            ></td>
                          )}
                        </tr>
                      )}
                    </>
                  ))}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AssignmentDetails;
