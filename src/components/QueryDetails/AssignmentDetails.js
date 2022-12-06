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
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
  const [movedFolder, setMovedFolder] = useState([
    {
      label: "...(root)",
      value: "0",
    },
  ]);
  const [folderId, setFolderId] = useState("0");
  const [clientAssign, setClientAssign] = useState(null);
  const [leftFolder, setLeftFolder] = useState([]);
  const [isLeft, setIsLeft] = useState(true);
  const [sub_folder, set_sub_folder] = useState([]);
  const [subFile, setSubFile] = useState([]);
  const [showSubfolderData, setShowSubFolderData] = useState(false);
  const [mainFoldName, setMainFoldName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [mFold, setMfold] = useState([]);
  const [foldError, setFoldError] = useState(false);
  const [subFolder, setSubFolder] = useState([]);
  const [adminFolder, setadminFolder] = useState([]);
  const [adminFolder2, setadminFolder2] = useState([]);
  const [adSubFolder, setShowAdSubFolder] = useState(false);
  const [showadminSubFolder, setadminSubFolder] = useState([]);
  const [adminInnerFile, setAdminInnerFiles] = useState([]);
  const [adminFile, setadminFile] = useState([]);
  const [clientFolder2, setClientFolder2] = useState([]);
  const [clientFolder, setclientFolder] = useState([]);
  const [clientFile, setclientFile] = useState([]);
  const [clientInnerFile, setClientInnerFiles] = useState([]);
  const [showclientSubFolder, setClientSubFolder] = useState([]);
  const [renameValue, setRenameValue] = useState("");
  const [rename, setRename] = useState("");
  const qid = useParams();
  const uid = localStorage.getItem("tlkey");
  const token = window.localStorage.getItem("tlToken");
  const adminToken = window.localStorage.getItem("adminToken");
  const clientToken = window.localStorage.getItem("clientToken");

  const myConfigAdmin = {
    headers: {
      uit: adminToken,
    },
  };
  const myConfigClient = {
    headers: {
      uit: clientToken,
    },
  };
  const timeTaken = (a, b) => {
    var date2 = CommonServices.removeTime(a);
    var date1 = CommonServices.removeTime(b);

    var difference = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
  };
  const showFolder = () => {
    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (window.location.pathname.split("/")[1] === "taxprofessional") {
      confToken = window.localStorage.getItem("tptoken");
    }
    const myConfig = {
      headers: {
        uit: confToken,
      },
    };
    if (
      window.location.pathname.split("/")[1] === "teamleader" ||
      window.location.pathname.split("/")[1] === "taxprofessional"
    ) {
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
            getMoveToList();
          }
        });
    }
  };
  const getMoveToList = () => {
    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (window.location.pathname.split("/")[1] === "taxprofessional") {
      confToken = window.localStorage.getItem("tptoken");
    }
    const myConfig = {
      headers: {
        uit: confToken,
      },
    };

    let kk = [];
    let pd = qid.id;
    let movedFold = {};
    let leftFold = [];
    movedFold = {
      label: "...(root)",
      value: "0",
    };
    kk.push(movedFold);
    axios
      .get(`${baseUrl}/tl/foldersubfolderreport?q_id=${pd}`, myConfig)
      .then((res) => {
        if (res.data.code === 1) {
          let ad = res.data.result;
          setMfold(ad);
          ad.map((i) => {
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
  };

  const getFile = () => {
    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (window.location.pathname.split("/")[1] === "taxprofessional") {
      confToken = window.localStorage.getItem("tptoken");
    }
    const myConfig = {
      headers: {
        uit: confToken,
      },
    };
    if (
      window.location.pathname.split("/")[1] === "teamleader" ||
      window.location.pathname.split("/")[1] === "taxprofessional"
    ) {
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
    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (window.location.pathname.split("/")[1] === "taxprofessional") {
      confToken = window.localStorage.getItem("tptoken");
    }
    const myConfig = {
      headers: {
        uit: confToken,
      },
    };
    let foldi = folderId;
    console.log("clientAssign", clientAssign);
    if (clientAssign === "clientFiles") {
      fold = "customer_files_folder";
    } else {
      fold = "folder_id";
    }
    if (isLeft === true && folderId === 0) {
      foldi = mFold[0].id;
    }
    axios
      .get(
        `${baseUrl}/tl/folderfileReport?q_id=${qid.id}&${fold}=${foldi}&file_id=${fileId}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          handleFile();
          showFolder();
          getFile();
          setInnerFiles([]);
          setFolderId(0);
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
  const getSubFile = (e) => {
    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (window.location.pathname.split("/")[1] === "taxprofessional") {
      confToken = window.localStorage.getItem("tptoken");
    }
    const myConfig = {
      headers: {
        uit: confToken,
      },
    };

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
  const getInnerFileFile = (e) => {
    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (window.location.pathname.split("/")[1] === "taxprofessional") {
      confToken = window.localStorage.getItem("tptoken");
    }
    const myConfig = {
      headers: {
        uit: confToken,
      },
    };
    if (
      window.location.pathname.split("/")[1] === "teamleader" ||
      window.location.pathname.split("/")[1] === "taxprofessional"
    ) {
      axios
        .get(
          `${baseUrl}/tl/queryfolderlistreport?q_id=${qid.id}&folder_id=${
            e.id
          }&uid=${JSON.parse(uid)}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setShowSubFolderData(false);
            setColor(e.id);
            set_sub_folder(res.data.result);
            setSubFile([]);
            setMainFoldName(e.folder);

            // setInnerFiles(res.data.result);
          }
        })
        .then((res) => {
          getSubFile(e);
        });
    }
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
    setIsLeft(isLeft);
    if (i) {
      setFileId(i.id);
      setMove(!move);
    } else {
      setMove(!move);
    }
    if (b === "clientFiles") {
      setClientAssign(b);
    } else {
      setClientAssign("");
    }
    if (e) {
      e.preventDefault();
    }
  };
  const get_sub_innerFile = (e) => {
    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (window.location.pathname.split("/")[1] === "taxprofessional") {
      confToken = window.localStorage.getItem("tptoken");
    }
    const myConfig = {
      headers: {
        uit: confToken,
      },
    };
    if (
      window.location.pathname.split("/")[1] === "teamleader" ||
      window.location.pathname.split("/")[1] === "taxprofessional"
    ) {
      axios
        .get(
          `${baseUrl}/tl/documentlistbyfolderreport?q_id=${qid.id}&folder_id=${
            e.id
          }&uid=${JSON.parse(uid)}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setFolderName(e.folder);
            setSubFile(res.data.result);
            setShowSubFolderData(true);
          } else {
            setShowSubFolderData(false);
          }
        });
    }
  };
  const gSub = (e, dir) => {
    setFolderId(e);
    mFold.map((i) => {
      if (i.id === e) {
        setSubFolder(i.child);
      }
    });
  };
  // Admin file
  const getAdminFile = (e) => {
    if (window.location.pathname.split("/")[1] === "admin") {
      let id = [];
      axios
        .get(
          `${baseUrl}/admin/foldersubfolderreport?q_id=${qid.id}`,
          myConfigAdmin
        )
        .then((res) => {
          if (res.data.code === 1) {
            setadminFolder2(res.data.result);
          }
        })
        .then((res) => {
          getadminFiles2();
        });
    }
  };
  const getadminFiles2 = (e) => {
    let id = [];
    axios
      .get(
        `${baseUrl}/admin/documentlistbyfolderreport?q_id=${qid.id}`,
        myConfigAdmin
      )
      .then((res) => {
        if (res.data.code === 1) {
          res.data.result.map((i) => {
            if (id.includes(i.folder_id)) {
            } else {
              if (i.folder_id !== "0") {
                id.push(i.folder_id);
              }
              setadminFolder((oldData) => {
                return [...oldData, i];
              });
            }
          });
        }
      });
  };
  const getInnerFileFileadmin = (e) => {
    setadminSubFolder(e.child);
    setAdminInnerFiles([]);

    setColor(e.id);
    let kk = [];
    adminFolder.map((i) => {
      if (e.id === i.folder_id) {
        kk.push(i);
      }
    });
    setShowAdSubFolder(false);
    setMainFoldName(e.folder);
    setFolderName("");
    setadminFile(kk);
  };
  const get_sub_innerFileAdmin = (e) => {
    axios
      .get(
        `${baseUrl}/admin/documentlistbyfolderreport?q_id=${qid.id}&folder_id=${
          e.id
        }&uid=${JSON.parse(uid)}`,
        myConfigAdmin
      )
      .then((res) => {
        if (res.data.code === 1) {
          setFolderName(e.folder);
          setAdminInnerFiles(res.data.result);
          setShowAdSubFolder(true);
        } else {
        }
      });
  };
  // Client file

  const getClientFiles2 = (e) => {
    let id = [];
    axios
      .get(
        `${baseUrl}/customers/documentlistbyfolderreport?q_id=${qid.id}`,
        myConfigClient
      )
      .then((res) => {
        if (res.data.code === 1) {
          res.data.result.map((i) => {
            if (id.includes(i.folder_id)) {
            } else {
              if (i.folder_id !== "0") {
                id.push(i.folder_id);
              }
              setclientFolder((oldData) => {
                return [...oldData, i];
              });
            }
          });
        }
      });
  };
  const getClientFile = (e) => {
    if (window.location.pathname.split("/")[1] === "customer") {
      let id = [];

      axios
        .get(
          `${baseUrl}/customers/foldersubfolderreport?q_id=${qid.id}`,
          myConfigClient
        )
        .then((res) => {
          if (res.data.code === 1) {
            setClientFolder2(res.data.result);
          }
        })
        .then((res) => {
          getClientFiles2();
        });
    }
  };
  const getInnerFileFileclient = (e) => {
    setClientInnerFiles([]);
    setFolderName("");
    setClientSubFolder(e.child);
    setColor(e.id);
    let kk = [];
    setMainFoldName(e.folder);
    clientFolder.map((i) => {
      if (e.id === i.folder_id) {
        kk.push(i);
      }
    });
    setclientFile(kk);
  };
  const get_sub_innerFileClient = (e) => {
    axios
      .get(
        `${baseUrl}/customers/documentlistbyfolderreport?q_id=${
          qid.id
        }&folder_id=${e.id}&uid=${JSON.parse(uid)}`,
        myConfigClient
      )
      .then((res) => {
        if (res.data.code === 1) {
          setFolderName(e.folder);
          setClientInnerFiles(res.data.result);
        } else {
        }
      });
  };
  const renameFolder = (e, fold) => {
    let foldName;
    if (renameValue.length > 0) {
      foldName = renameValue;
    } else {
      foldName = e.folder;
    }
    let formData = new FormData();
    formData.append("folder", foldName);
    formData.append("folder_id", fold);
    formData.append("q_id", e.q_id);
    formData.append("id", e.id);
    axios({
      method: "POST",
      url: `${baseUrl}/tl/createqfolder`,
      headers: {
        uit: localStorage.getItem("tlToken"),
      },
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        closeModal();
        if (fold === "0") {
          showFolder();
        } else {
          let kk = {
            id: fold,
            folder: foldName,
          };
          getInnerFileFile(kk);
        }

        Swal.fire({
          title: "success",
          html: "Folder renamed successfullly",
          icon: "success",
        });
      } else if (res.data.code === 0) {
        Swal.fire({
          title: "error",
          html: "Something went wrong, please try again",
          icon: "error",
        });
      }
    });
  };
  const closeModal = () => {
    setRename("");
  };
  useEffect(() => {
    getFile();
    showFolder();
  }, []);
  useEffect(() => {
    getAdminFile();
  }, []);
  useEffect(() => {
    getClientFile();
  }, []);
  console.log("files", files);
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
            {panel == "teamleader" || panel === "taxprofessional" ? (
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
                        {rename !== i.folder ? (
                          <span
                            onDoubleClick={(e) => setRename(i.folder)}
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
                        ) : (
                          <div>
                            <Popup
                              open={true}
                              onClose={closeModal}
                              position="right center"
                            >
                              <div className="renameBtn">
                                <input
                                  placeholder="Please enter folder name"
                                  defaultValue={i.folder}
                                  onChange={(e) =>
                                    setRenameValue(e.target.value)
                                  }
                                  className="form-control my-2"
                                  type="text"
                                />
                                <button
                                  onClick={(e) => renameFolder(i, "0")}
                                  className="customBtn"
                                >
                                  Rename
                                </button>
                              </div>
                            </Popup>
                          </div>
                        )}
                      </div>
                    ))}
                    {files.map((i) => (
                      <>
                        {i.folder_id === "0" ? (
                          <>
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
                          </>
                        ) : (
                          ""
                        )}
                        {i.customer_files !== null &&
                        i.customer_files_folder === "0" ? (
                          <div className="folderCreated">
                            <ArticleIcon
                              onContextMenu={(e) =>
                                handleFile(e, i, true, "clientFiles")
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
                        {mainFoldName.length > 0 || folderName.length > 0 ? (
                          <span style={{ fontSize: "16px", fontWeight: "300" }}>
                            {`${mainFoldName} ${
                              folderName.length > 0 ? ">" : ""
                            } ${folderName}`}
                          </span>
                        ) : (
                          <span style={{ fontSize: "16px", fontWeight: "300" }}>
                            Folder content
                          </span>
                        )}
                        {showSubfolderData === true ? (
                          <>
                            <div className="d-flex">
                              <span className="folderCreated">
                                <FolderIcon
                                  onClick={(e) => {
                                    setSubFile([]);
                                    setShowSubFolderData(false);
                                    setFolderName("");
                                  }}
                                  style={{
                                    fontSize: "50px",
                                    color: "#fccc77",
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
                                  ...
                                </span>
                              </span>
                              {subFile.map((i) => (
                                <div className="folderCreated">
                                  <ArticleIcon
                                    onContextMenu={(e) =>
                                      handleFile(e, i, false)
                                    }
                                    onClick={(e) =>
                                      rightClick(e, i.assign_no, i.id, i.name)
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
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="d-flex">
                            {sub_folder.map((i) => (
                              <div className="folderCreated" key={i.id}>
                                <FolderIcon
                                  onClick={(e) => get_sub_innerFile(i)}
                                  style={{
                                    fontSize: "50px",
                                    color: "#fccc77",
                                    cursor: "pointer",
                                  }}
                                />
                                {rename !== i.folder ? (
                                  <span
                                    onDoubleClick={(e) => setRename(i.folder)}
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
                                ) : (
                                  <div>
                                    <Popup
                                      open={true}
                                      onClose={closeModal}
                                      position="right center"
                                    >
                                      <div className="renameBtn">
                                        <input
                                          placeholder="Please enter folder name"
                                          defaultValue={i.folder}
                                          onChange={(e) =>
                                            setRenameValue(e.target.value)
                                          }
                                          className="form-control my-2"
                                          type="text"
                                        />
                                        <button
                                          onClick={(e) =>
                                            renameFolder(i, i.parent_id)
                                          }
                                          className="customBtn"
                                        >
                                          Rename
                                        </button>
                                      </div>
                                    </Popup>
                                  </div>
                                )}
                              </div>
                            ))}

                            {innerFiles.map((i) => (
                              <>
                                {color === i.folder_id ? (
                                  <div className="folderCreated">
                                    <ArticleIcon
                                      onContextMenu={(e) =>
                                        handleFile(e, i, false)
                                      }
                                      onClick={(e) =>
                                        rightClick(e, i.assign_no, i.id, i.name)
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
                                  ""
                                )}
                                {color === i.customer_files_folder ? (
                                  <div className="folderCreated">
                                    <ArticleIcon
                                      onContextMenu={(e) =>
                                        handleFile(e, i, false, "clientFiles")
                                      }
                                      onClick={(e) =>
                                        rightClick(e, i.assign_no, i.id, i.name)
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
                                  ""
                                )}
                              </>
                            ))}
                          </div>
                        )}
                      </div>
                    </FolderDetails>
                  </div>
                  {move === true ? (
                    <Modal isOpen={move} toggle={handleFile} size="xs">
                      <ModalHeader toggle={handleFile}>Move to</ModalHeader>
                      <ModalBody>
                        {isLeft === true ? (
                          <>
                            <label>Folder</label>

                            <select
                              className={`${
                                foldError === true ? "validationError" : ""
                              } form-control`}
                              onChange={(e) => gSub(e.target.value, "left")}
                            >
                              {mFold.map((i) => (
                                <option value={i.id}>{i.folder}</option>
                              ))}
                            </select>
                            {subFolder.length > 0 ? (
                              <>
                                <label>Sub folder</label>
                                <select
                                  className="form-control"
                                  onChange={(e) => setFolderId(e.target.value)}
                                >
                                  <option value="">Please select folder</option>
                                  {subFolder.map((i) => (
                                    <option value={i.id}>{i.folder}</option>
                                  ))}
                                </select>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <>
                            <label>Folder</label>
                            <select
                              className={`${
                                foldError === true ? "validationError" : ""
                              } form-control`}
                              onChange={(e) => gSub(e.target.value, "right")}
                            >
                              <option value="0">Root</option>
                              {mFold.map((i) => (
                                <option value={i.id}>{i.folder}</option>
                              ))}
                            </select>
                            {subFolder.length > 0 ? (
                              <>
                                <label>Sub folder</label>
                                <select
                                  className="form-control"
                                  onChange={(e) => setFolderId(e.target.value)}
                                >
                                  <option value="">None</option>
                                  {subFolder.map((i) => (
                                    <option value={i.id}>{i.folder}</option>
                                  ))}
                                </select>
                              </>
                            ) : (
                              ""
                            )}
                          </>
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
                    movedFolder={movedFolder}
                    set_sub_folder={set_sub_folder}
                    setColor={setColor}
                    setInnerFiles={setInnerFiles}
                    setShowSubFolderData={setShowSubFolderData}
                  />
                </td>
              </tr>
            ) : (
              " "
            )}
            {panel === "admin" ? (
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
                  </div>
                  <FolderWrapper>
                    {adminFolder2.map((i) => (
                      <>
                        {color === i.id ? (
                          <div className="folderCreated">
                            <FolderIcon
                              onClick={(e) => getInnerFileFileadmin(i)}
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
                              {i.folder}{" "}
                            </span>
                          </div>
                        ) : (
                          <div className="folderCreated">
                            <FolderIcon
                              onClick={(e) => getInnerFileFileadmin(i)}
                              style={{
                                fontSize: "50px",
                                color: "#fccc77",
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
                              {i.folder}{" "}
                            </span>
                          </div>
                        )}
                      </>
                    ))}
                    {adminFolder.map((i) => (
                      <div className="folderCreated">
                        {i.folder_id === "0" ? (
                          <>
                            <ArticleIcon
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
                          </>
                        ) : (
                          ""
                        )}
                        {i.customer_files !== null &&
                        i.customer_files_folder === "0" ? (
                          <>
                            <ArticleIcon
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
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </FolderWrapper>
                </td>
                <td>
                  <div className="d-flex">
                    <FolderDetails>
                      <div className="folderDetails">
                        {mainFoldName.length > 0 && folderName.length > 0 ? (
                          <span
                            style={{ fontSize: "16px", fontWeight: "300" }}
                            onClick={(e) => {
                              setShowAdSubFolder(false);
                              setAdminInnerFiles([]);
                            }}
                          >
                            {`${mainFoldName} ${
                              folderName.length > 0 ? ">" : ""
                            } ${folderName}`}
                          </span>
                        ) : (
                          <>
                            {mainFoldName.length > 0 ||
                            folderName.length > 0 ? (
                              <span
                                style={{ fontSize: "16px", fontWeight: "300" }}
                                onClick={(e) => {
                                  setShowAdSubFolder(false);
                                  setAdminInnerFiles([]);
                                }}
                              >
                                {`${mainFoldName} ${
                                  folderName.length > 0 ? ">" : ""
                                } ${folderName}`}
                              </span>
                            ) : (
                              <span
                                style={{ fontSize: "16px", fontWeight: "300" }}
                              >
                                Folder content
                              </span>
                            )}
                          </>
                        )}

                        {adSubFolder === true ? (
                          <>
                            <div className="d-flex">
                              <div className="folderCreated">
                                <FolderIcon
                                  onClick={(e) => {
                                    setShowAdSubFolder(false);
                                    setAdminInnerFiles([]);
                                  }}
                                  style={{
                                    fontSize: "50px",
                                    color: "#fccc77",
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
                                  ...
                                </span>
                              </div>
                              {adminInnerFile.map((i) => (
                                <>
                                  <div className="folderCreated">
                                    <ArticleIcon
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
                          </>
                        ) : (
                          <div className="d-flex">
                            {showadminSubFolder.map((i) => (
                              <>
                                <div className="folderCreated">
                                  <FolderIcon
                                    onClick={(e) => get_sub_innerFileAdmin(i)}
                                    style={{
                                      fontSize: "50px",
                                      color: "#fccc77",
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
                                    {i.folder}{" "}
                                  </span>
                                </div>
                              </>
                            ))}
                            {adminFile.map((i) => (
                              <>
                                {color === i.folder_id ? (
                                  <div className="folderCreated">
                                    <ArticleIcon
                                      onContextMenu={(e) =>
                                        handleFile(e, i, false)
                                      }
                                      onClick={(e) =>
                                        rightClick(e, i.assign_no, i.id, i.name)
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
                                  ""
                                )}
                                {color === i.customer_files_folder ? (
                                  <div className="folderCreated">
                                    <ArticleIcon
                                      onContextMenu={(e) =>
                                        handleFile(e, i, false, "clientFiles")
                                      }
                                      onClick={(e) =>
                                        rightClick(e, i.assign_no, i.id, i.name)
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
                                  ""
                                )}
                              </>
                            ))}
                          </div>
                        )}
                      </div>
                    </FolderDetails>
                  </div>
                </td>
              </tr>
            ) : (
              ""
            )}
            {panel === "client" ? (
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
                  </div>
                  <FolderWrapper>
                    {clientFolder2.map((i) => (
                      <>
                        {color === i.id ? (
                          <div className="folderCreated">
                            <FolderIcon
                              onClick={(e) => getInnerFileFileclient(i)}
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
                              {i.folder}{" "}
                            </span>
                          </div>
                        ) : (
                          <div className="folderCreated">
                            <FolderIcon
                              onClick={(e) => getInnerFileFileclient(i)}
                              style={{
                                fontSize: "50px",
                                color: "#fccc77",
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
                              {i.folder}{" "}
                            </span>
                          </div>
                        )}
                      </>
                    ))}
                    {clientFolder.map((i) => (
                      <div className="folderCreated">
                        {i.folder_id === "0" ? (
                          <>
                            <ArticleIcon
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
                              {i.name}
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </FolderWrapper>
                </td>
                <td>
                  <div className="d-flex">
                    <FolderDetails>
                      <div className="folderDetails">
                        {mainFoldName.length > 0 && folderName.length > 0 ? (
                          <span
                            style={{ fontSize: "16px", fontWeight: "300" }}
                            onClick={() => {
                              setClientInnerFiles([]);
                              setFolderName("");
                            }}
                          >
                            {`${mainFoldName} ${
                              folderName.length > 0 ? ">" : ""
                            } ${folderName}`}
                          </span>
                        ) : (
                          <>
                            {mainFoldName.length > 0 ||
                            folderName.length > 0 ? (
                              <span
                                style={{ fontSize: "16px", fontWeight: "300" }}
                                onClick={() => {
                                  setClientInnerFiles([]);
                                  setFolderName("");
                                }}
                              >
                                {`${mainFoldName} ${
                                  folderName.length > 0 ? ">" : ""
                                } ${folderName}`}
                              </span>
                            ) : (
                              <span
                                style={{ fontSize: "16px", fontWeight: "300" }}
                              >
                                Folder content
                              </span>
                            )}
                          </>
                        )}

                        {clientInnerFile.length > 0 ? (
                          <>
                            <div className="d-flex">
                              <div className="folderCreated">
                                <FolderIcon
                                  onClick={(e) => {
                                    setClientInnerFiles([]);
                                    setFolderName("");
                                  }}
                                  style={{
                                    fontSize: "50px",
                                    color: "#fccc77",
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
                                  ...
                                </span>
                              </div>
                              {clientInnerFile.map((i) => (
                                <>
                                  <div className="folderCreated">
                                    <ArticleIcon
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
                                      {i.name}
                                    </span>
                                  </div>
                                </>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="d-flex">
                            {showclientSubFolder.map((i) => (
                              <>
                                <div className="folderCreated">
                                  <FolderIcon
                                    onClick={(e) => get_sub_innerFileClient(i)}
                                    style={{
                                      fontSize: "50px",
                                      color: "#fccc77",
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
                                    {i.folder}{" "}
                                  </span>
                                </div>
                              </>
                            ))}
                            {clientFile.map((i) => (
                              <>
                                <div className="folderCreated">
                                  <ArticleIcon
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
                                    {i.name}
                                  </span>
                                </div>
                              </>
                            ))}
                          </div>
                        )}
                      </div>
                    </FolderDetails>
                  </div>
                </td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AssignmentDetails;
