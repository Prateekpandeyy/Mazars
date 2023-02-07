import React, { useState, useEffect } from "react";
import CommonServices from "../../common/common";
import { useParams } from "react-router-dom";
import { Markup } from "interweave";
import axios from "axios";
import { baseUrl } from "../../config/config";
import "./queryStyle.css";
import MainText from "../Common/MainText";
import ShowFolder from "./Folder/ShowFolder";
import Swal from "sweetalert2";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateFolder from "./Folder/CreateFolder";
import FolderWrapper from "../FolderWrapper/FolderWrapper";
import FolderBredcrumb from "../FolderWrapper/FolderBredcrumb";

function BasicQuery({
  qstatus,
  panel,
  p,
  diaplaySpecific,
  year,
  purpose,
  declined2,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [createFoldernew, setCreateFolder] = useState(false);
  const [folder, setFolder] = useState([]);
  const [color, setColor] = useState(0);
  const [move, setMove] = useState(false);
  const [movedFolder, setMovedFolder] = useState([
    {
      label: "...(root)",
      value: "0",
    },
  ]);
  const [files, setFiles] = useState([]);
  const [folderId, setFolderId] = useState("0");
  const [fileId, setFileId] = useState("");
  const [innerFiles, setInnerFiles] = useState([]);
  const [clientFolder, setclientFolder] = useState([]);
  const [clientFile, setclientFile] = useState([]);
  const [leftFolder, setLeftFolder] = useState([]);
  const [sub_folder, set_sub_folder] = useState([]);
  const [isLeft, setIsLeft] = useState(true);
  const [mFold, setMfold] = useState([]);
  const [subFolder, setSubFolder] = useState([]);
  const [subFile, setSubFile] = useState([]);
  const [showSubfolderData, setShowSubFolderData] = useState(false);
  const [showclientSubFolder, setClientSubFolder] = useState([]);
  const [mainFoldName, setMainFoldName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [clientInnerFile, setClientInnerFiles] = useState([]);
  const [adminFolder, setadminFolder] = useState([]);
  const [showadminSubFolder, setadminSubFolder] = useState([]);
  const [adminFile, setadminFile] = useState([]);
  const [adminInnerFile, setAdminInnerFiles] = useState([]);
  const [adminFolder2, setadminFolder2] = useState([]);
  const [clientFolder2, setClientFolder2] = useState([]);
  const [showClientFolderdata, setShowClientShowFolderData] = useState(false);
  const [showAdminFolderdata, setShowAdminShowFolderData] = useState(false);
  const [foldError, setFoldError] = useState(false);
  const [subFolderId, setSubFolderId] = useState(null);
  const [rename, setRename] = useState("");
  const [renameValue, setRenameValue] = useState("");
  const token = window.localStorage.getItem("tlToken");
  const uid = localStorage.getItem("tlkey");
  const adminToken = window.localStorage.getItem("adminToken");
  const clientToken = window.localStorage.getItem("clientToken");
  const qid = useParams();
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

  useEffect(() => {
    getFile();
    showFolder();
  }, [qid.id.length]);
  useEffect(() => {
    getAdminFile();
  }, []);
  useEffect(() => {
    getClientFile();
  }, []);
  const closeModal = () => {
    setRename("");
  };
  const renameFolder = (e, fold) => {
    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader_queries") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (
      window.location.pathname.split("/")[1] === "taxprofessional_queries"
    ) {
      confToken = window.localStorage.getItem("tptoken");
    }
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
        uit: confToken,
      },
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        closeModal();
        if (fold === "0") {
          setMainFoldName(foldName);
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
          html: "Folder name already exits",
          icon: "error",
        });
      }
    });
  };
  const getClientFiles2 = (e) => {
    let id = [];
    axios
      .get(
        `${baseUrl}/customers/documentlistbyfolder?q_id=${qid.id}`,
        myConfigClient
      )
      .then((res) => {
        if (res.data.code === 1) {
          setclientFolder(res.data.result);
        }
      });
  };
  const getClientFile = (e) => {
    if (window.location.pathname.split("/")[1] === "customer_my-assingment") {
      let id = [];

      axios
        .get(
          `${baseUrl}/customers/foldersubfolder?q_id=${qid.id}`,
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
    setColor(Number(e.id));
    setShowClientShowFolderData(false);
    let kk = [];
    setMainFoldName(e.folder);
    clientFolder.map((i) => {
      if (e.id === i.folder_id) {
        kk.push(i);
      }
    });
    setclientFile(kk);
  };
  const getadminFiles2 = (e) => {
    let id = [];
    axios
      .get(
        `${baseUrl}/admin/documentlistbyfolder?q_id=${qid.id}`,
        myConfigAdmin
      )
      .then((res) => {
        if (res.data.code === 1) {
          setadminFolder(res.data.result);
        }
      });
  };
  const getAdminFile = (e) => {
    if (window.location.pathname.split("/")[0] === "admin") {
      let id = [];
      axios
        .get(`${baseUrl}/admin/foldersubfolder?q_id=${qid.id}`, myConfigAdmin)
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
  const getInnerFileFileadmin = (e) => {
    setadminSubFolder(e.child);
    setShowAdminShowFolderData(false);
    setAdminInnerFiles([]);
    setColor(Number(e.id));
    let kk = [];
    adminFolder.map((i) => {
      if (e.id === i.folder_id) {
        kk.push(i);
      }
    });
    setMainFoldName(e.folder);
    setFolderName("");
    setadminFile(kk);
  };

  const getFile = () => {
    let pd = qid.id;
    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader_queries") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (
      window.location.pathname.split("/")[1] === "taxprofessional_queries"
    ) {
      confToken = window.localStorage.getItem("tptoken");
    }
    const myConfig = {
      headers: {
        uit: confToken,
      },
    };
    if (
      window.location.pathname.split("/")[1] === "teamleader_queries" ||
      window.location.pathname.split("/")[1] === "taxprofessional_queries"
    ) {
      axios
        .get(
          `${baseUrl}/tl/documentlistbyfolder?q_id=${pd}&uid=${JSON.parse(
            uid
          )}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setFiles(res.data.result);
          }
        });
    }
  };

  const getMoveToList = () => {
    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader_queries") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (
      window.location.pathname.split("/")[1] === "taxprofessional_queries"
    ) {
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
      .get(`${baseUrl}/tl/foldersubfolder?q_id=${pd}`, myConfig)
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

  const showFolder = () => {
    let pd = qid.id;
    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader_queries") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (
      window.location.pathname.split("/")[1] === "taxprofessional_queries"
    ) {
      confToken = window.localStorage.getItem("tptoken");
    }
    const myConfig = {
      headers: {
        uit: confToken,
      },
    };
    if (
      window.location.pathname.split("/")[1] === "teamleader_queries" ||
      window.location.pathname.split("/")[1] === "taxprofessional_queries"
    ) {
      axios
        .get(
          `${baseUrl}/tl/queryfolderlist?q_id=${pd}&uid=${JSON.parse(uid)}`,
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

  const getFolder = (e) => {
    setCreateFolder(!createFoldernew);
  };
  const handleFile = (e, i, isLeft) => {
    if (e) {
      e.preventDefault();
    }
    setIsLeft(isLeft);
    if (i) {
      setFileId(i.id);
      setMove(!move);
    } else {
      setMove(!move);
    }
  };
  const mapIcon = (e) => {
    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader_queries") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (
      window.location.pathname.split("/")[1] === "taxprofessional_queries"
    ) {
      confToken = window.localStorage.getItem("tptoken");
    }
    const myConfig = {
      headers: {
        uit: confToken,
      },
    };
    if (isLeft === true && folderId === "0") {
      setFoldError(true);
    } else if (folderId.length > 0) {
      setFoldError(false);
      setSubFolder([]);
      axios
        .get(
          `${baseUrl}/tl/folderfile?q_id=${qid.id}&folder_id=${folderId}&file_id=${fileId}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setFolderId("0");
            if (color === 0) {
              handleFile();
              showFolder();
              getFile();
            } else if (showSubfolderData === false) {
              handleFile();
              getFile();

              getSubFile({
                id: color,
              });
            } else if (showSubfolderData === true) {
              handleFile();
              getFile();
              get_sub_innerFile(subFolderId);
            }

            // // setInnerFiles([]);
            // setColor(0);
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
    } else {
      setFoldError(true);
    }
  };
  const getSubFile = (e) => {
    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader_queries") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (
      window.location.pathname.split("/")[1] === "taxprofessional_queries"
    ) {
      confToken = window.localStorage.getItem("tptoken");
    }
    const myConfig = {
      headers: {
        uit: confToken,
      },
    };
    axios
      .get(
        `${baseUrl}/tl/documentlistbyfolder?q_id=${qid.id}&folder_id=${
          e.id
        }&uid=${JSON.parse(uid)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setColor(Number(e.id));

          setInnerFiles(res.data.result);
        }
      });
  };
  const get_sub_innerFile = (e) => {
    setSubFolderId(e);

    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader_queries") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (
      window.location.pathname.split("/")[1] === "taxprofessional_queries"
    ) {
      confToken = window.localStorage.getItem("tptoken");
    }
    const myConfig = {
      headers: {
        uit: confToken,
      },
    };
    axios
      .get(
        `${baseUrl}/tl/documentlistbyfolder?q_id=${qid.id}&folder_id=${
          e.id
        }&uid=${JSON.parse(uid)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setFolderName(e.folder);
          setSubFile(res.data.result);
          if (showSubfolderData === false) {
            setShowSubFolderData(true);
          }
        } else {
          setShowSubFolderData(false);
        }
      });
  };
  const getInnerFileFile = (e) => {
    var confToken = "";
    if (window.location.pathname.split("/")[1] === "teamleader_queries") {
      confToken = window.localStorage.getItem("tlToken");
    } else if (
      window.location.pathname.split("/")[1] === "taxprofessional_queries"
    ) {
      confToken = window.localStorage.getItem("tptoken");
    }
    const myConfig = {
      headers: {
        uit: confToken,
      },
    };
    axios
      .get(
        `${baseUrl}/tl/queryfolderlist?q_id=${qid.id}&folder_id=${
          e.id
        }&uid=${JSON.parse(uid)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setShowSubFolderData(false);
          setColor(Number(e.id));
          set_sub_folder(res.data.result);
          setSubFile([]);
          setMainFoldName(e.folder);
          setFolderName("");
        }
      })
      .then((res) => {
        getSubFile(e);
      });
  };
  const openFolder = (e) => {
    setId(e);
    setIsOpen(!isOpen);
  };

  const downloadpdf = (qno, qid, name) => {
    let userId, token, apiPath;
    if (panel === "admin") {
      userId = window.localStorage.getItem("adminkey");
      token = window.localStorage.getItem("adminToken");
      apiPath = "admin";
    } else if (panel === "teamleader") {
      userId = window.localStorage.getItem("tlkey");
      token = window.localStorage.getItem("tlToken");
      apiPath = "tl";
    } else if (panel === "taxprofessional") {
      userId = window.localStorage.getItem("tpkey");
      token = window.localStorage.getItem("tpToken");
      apiPath = "tl";
    } else if (panel === "client") {
      userId = window.localStorage.getItem("userid");
      token = window.localStorage.getItem("clientToken");
      apiPath = "customers";
    }
    const myConfig2 = {
      headers: {
        uit: token,
      },
      responseType: "blob",
    };

    axios
      .get(
        `${baseUrl}/${apiPath}/viewdocument?assign_no=${qno}&id=${qid}`,
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
  const rightClick = (e, a, b, c) => {
    downloadpdf(a, b, c);
  };
  const gSub = (e, dir) => {
    setFolderId(e);
    mFold.map((i) => {
      if (i.id === e) {
        setSubFolder(i.child);
      }
    });
  };
  const get_sub_innerFileClient = (e) => {
    axios
      .get(
        `${baseUrl}/customers/documentlistbyfolder?q_id=${qid.id}&folder_id=${
          e.id
        }&uid=${JSON.parse(uid)}`,
        myConfigClient
      )
      .then((res) => {
        if (res.data.code === 1) {
          setFolderName(e.folder);
          setShowClientShowFolderData(true);
          setClientInnerFiles(res.data.result);
        } else {
        }
      });
  };
  const get_sub_innerFileAdmin = (e) => {
    axios
      .get(
        `${baseUrl}/admin/documentlistbyfolder?q_id=${qid.id}&folder_id=${
          e.id
        }&uid=${JSON.parse(uid)}`,
        myConfigAdmin
      )
      .then((res) => {
        if (res.data.code === 1) {
          setFolderName(e.folder);
          setShowAdminShowFolderData(true);
          setAdminInnerFiles(res.data.result);
        } else {
        }
      });
  };
  const goBackFun = () => {
    setSubFile([]);
    setShowSubFolderData(false);
    setFolderName("");
    getInnerFileFile({
      id: color,
      folder: mainFoldName,
    });
  };
  const goBackFunAdmin = () => {
    setFolderName("");
    setShowAdminShowFolderData(false);
    setAdminInnerFiles([]);
  };
  const goBackFunClient = () => {
    setFolderName("");
    setShowClientShowFolderData(false);
    setClientInnerFiles([]);
  };
  return (
    <>
      <div className="queryBox">
        <MainText align="center">Basic query information</MainText>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Titles</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Query no</th>
              <td>{p.assign_no}</td>
            </tr>
            <tr>
              <th scope="row">Query date</th>
              <td>{CommonServices.changeFormateDate(p.created)}</td>
            </tr>
            <tr>
              <th scope="row">Client id</th>
              <td>{p.email}</td>
            </tr>
            <tr>
              <th scope="row">Category</th>
              <td>{p.cat_name}</td>
            </tr>
            <tr>
              <th scope="row">Sub- category</th>
              <td>{p.sub_cat_name}</td>
            </tr>
            <tr>
              <th scope="row">Name of the case</th>
              <td>{p.case_name}</td>
            </tr>
            <tr>
              <th scope="row">Assessment year(s)</th>
              <td>
                {year.map((p, i) => (
                  <p key={i}>{p.value}</p>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Brief fact of the case</th>
              <td className="tableStyle">
                {" "}
                <Markup content={p.fact_case} />
              </td>
            </tr>

            {panel === "teamleader" || panel === "taxprofessional" ? (
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
                  <FolderWrapper
                    folder={folder}
                    color={color}
                    getFolerSubFile={getInnerFileFile}
                    file={files}
                    downloadFile={rightClick}
                    moveTo={handleFile}
                    basePath={true}
                    isSubFolder={false}
                    panel="tl"
                    rename={rename}
                    setRename={setRename}
                    setRenameValue={setRenameValue}
                    renameValue={renameValue}
                    closeModal={closeModal}
                    renameFolder={renameFolder}
                  />
                </td>
                <td>
                  <div className="d-flex flex-column">
                    <FolderBredcrumb
                      mainFoldName={mainFoldName}
                      folderName={folderName}
                      goBack={goBackFun}
                    />
                    {showSubfolderData === true ? (
                      <FolderWrapper
                        getFolerSubFile={goBackFun}
                        file={subFile}
                        downloadFile={rightClick}
                        moveTo={handleFile}
                        basePath={false}
                        isSubFolder={true}
                        rename={rename}
                        setRename={setRename}
                        setRenameValue={setRenameValue}
                        renameValue={renameValue}
                        closeModal={closeModal}
                        renameFolder={renameFolder}
                        panel="tl"
                      />
                    ) : (
                      <FolderWrapper
                        folder={sub_folder}
                        getFolerSubFile={get_sub_innerFile}
                        file={innerFiles}
                        downloadFile={rightClick}
                        moveTo={handleFile}
                        basePath={false}
                        isSubFolder={false}
                        rename={rename}
                        setRename={setRename}
                        setRenameValue={setRenameValue}
                        renameValue={renameValue}
                        closeModal={closeModal}
                        renameFolder={renameFolder}
                        panel="tl"
                      />
                    )}
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
                              <option value="">Please select folder</option>
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
                        ) : (
                          <>
                            <label>Folder</label>
                            <select
                              className={`${
                                foldError === true ? "validationError" : ""
                              } form-control`}
                              onChange={(e) => gSub(e.target.value, "right")}
                            >
                              <option value="0">...root</option>
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
                  {createFoldernew === true ? (
                    <CreateFolder
                      addPaymentModal={createFoldernew}
                      id={qid.id}
                      getList={showFolder}
                      movedFolder={movedFolder}
                      rejectHandler={getFolder}
                      set_sub_folder={set_sub_folder}
                      getInnerFileFile={getInnerFileFile}
                      setColor={setColor}
                      setInnerFiles={setInnerFiles}
                      setShowSubFolderData={setShowSubFolderData}
                      getMoveToList={getMoveToList}
                      color={color}
                    />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ) : (
              ""
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
                  <FolderWrapper
                    folder={adminFolder2}
                    color={color}
                    getFolerSubFile={getInnerFileFileadmin}
                    file={adminFolder}
                    downloadFile={rightClick}
                    basePath={true}
                    isSubFolder={false}
                  />
                </td>
                <td>
                  <div className="d-flex flex-column">
                    <FolderBredcrumb
                      mainFoldName={mainFoldName}
                      folderName={folderName}
                      goBack={goBackFunAdmin}
                    />

                    {showAdminFolderdata === true ? (
                      <FolderWrapper
                        getFolerSubFile={goBackFunAdmin}
                        file={adminInnerFile}
                        downloadFile={rightClick}
                        basePath={false}
                        isSubFolder={true}
                      />
                    ) : (
                      <FolderWrapper
                        folder={showadminSubFolder}
                        getFolerSubFile={get_sub_innerFileAdmin}
                        file={adminFile}
                        downloadFile={rightClick}
                        basePath={false}
                        isSubFolder={false}
                      />
                    )}
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
                  <FolderWrapper
                    folder={clientFolder2}
                    color={color}
                    getFolerSubFile={getInnerFileFileclient}
                    file={clientFolder}
                    downloadFile={rightClick}
                    basePath={true}
                    isSubFolder={false}
                  />
                </td>
                <td>
                  <div className="d-flex flex-column">
                    <FolderBredcrumb
                      mainFoldName={mainFoldName}
                      folderName={folderName}
                      goBack={goBackFunClient}
                    />
                    {showClientFolderdata === true ? (
                      <FolderWrapper
                        getFolerSubFile={goBackFunClient}
                        file={clientInnerFile}
                        downloadFile={rightClick}
                        basePath={false}
                        isSubFolder={true}
                      />
                    ) : (
                      <FolderWrapper
                        folder={showclientSubFolder}
                        getFolerSubFile={get_sub_innerFileClient}
                        file={clientFile}
                        downloadFile={rightClick}
                        basePath={false}
                        isSubFolder={false}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              ""
            )}

            <tr>
              <th scope="row">Specific questions</th>
              <td>
                {diaplaySpecific.map((p, i) => (
                  <div>
                    {i + 1}. {p.text}
                  </div>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Purpose of the query</th>
              <td colspan="1">
                {purpose.map((p, i) => (
                  <p key={i}>{p.value}</p>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Format in which opinion is required</th>
              <td colspan="1">
                <p>{p.softcopy_word === "1" && "Softcopy - Word/ Pdf"}</p>
                <p>
                  {p.softcopy_digitally_assigned === "1" &&
                    "SoftCopy- Digitally Signed"}
                </p>

                <p>
                  {p.printout_physically_assigned === "1" &&
                    "Printout- Physically Signed"}
                </p>
              </td>
            </tr>
            <tr>
              <th scope="row">Timelines within which opinion is required</th>
              <td colspan="1">{p.Timelines}</td>
            </tr>
            {qstatus === "-1" || p.is_delete === "1" ? (
              <tr>
                <th scope="row">Date of decline</th>
                <td>
                  {qstatus === "-1" || p.is_delete === "1" ? declined2 : ""}
                </td>
              </tr>
            ) : (
              ""
            )}
            {p.query_status === "-1" ? (
              <tr>
                <th scope="row">Reasons for admin decline query</th>
                <td colspan="1">{p.decline_notes}</td>
              </tr>
            ) : null}
            {p.is_delete === "1" ? (
              <tr>
                <th scope="row">Reasons for client decline query</th>
                <td colspan="1">{p.decline_notes}</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <ShowFolder rejectHandler={openFolder} id={id} addPaymentModal={isOpen} />
    </>
  );
}

export default BasicQuery;
