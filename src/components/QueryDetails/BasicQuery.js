import React, { useState, useEffect } from "react";
import CommonServices from "../../common/common";
import { useParams } from "react-router-dom";
import { Markup } from "interweave";
import axios from "axios";
import { baseUrl } from "../../config/config";
import "./queryStyle.css";
import MainText from "../Common/MainText";
import ShowFolder from "./Folder/ShowFolder";
import styled from "styled-components";
import FolderIcon from "@mui/icons-material/Folder";
import ArticleIcon from "@mui/icons-material/Article";
import Swal from "sweetalert2";
import { Box } from "@mui/material";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateFolder from "./Folder/CreateFolder";
import Select from "react-select";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
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

function BasicQuery({
  qstatus,
  panel,
  p,
  diaplaySpecific,
  queryDocs,
  year,
  purpose,
  declined2,
  declinedStatus,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [createFoldernew, setCreateFolder] = useState(false);
  const [folder, setFolder] = useState([]);
  const [color, setColor] = useState(0);
  const [move, setMove] = useState(false);
  const [movedFolder, setMovedFolder] = useState([]);
  const [files, setFiles] = useState([]);
  const [folderId, setFolderId] = useState([]);
  const [fileId, setFileId] = useState("");
  const [innerFiles, setInnerFiles] = useState([]);
  const [adminFolder, setAdminFolder] = useState([]);
  const [adminFile, setadminFile] = useState([]);
  const [clientFolder, setclientFolder] = useState([]);
  const [clientFile, setclientFile] = useState([]);
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
  const getClientFile = (e) => {
    if (window.location.pathname.split("/")[1] === "customer") {
      let id = [];

      axios
        .get(
          `${baseUrl}/customers/documentlistbyfolder?q_id=${qid.id}`,
          myConfigClient
        )
        .then((res) => {
          if (res.data.code === 1) {
            res.data.result.map((i) => {
              if (id.includes(i.folder_id)) {
                console.log("trie", id);
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
    }
  };
  const getAdminFile = (e) => {
    if (window.location.pathname.split("/")[1] === "admin") {
      let id = [];
      let data = [];
      axios
        .get(
          `${baseUrl}/admin/documentlistbyfolder?q_id=${qid.id}`,
          myConfigAdmin
        )
        .then((res) => {
          if (res.data.code === 1) {
            res.data.result.map((i) => {
              if (id.includes(i.folder_id)) {
                console.log("trie", id);
              } else {
                if (i.folder_id !== "0") {
                  id.push(i.folder_id);
                }
                setAdminFolder((oldData) => {
                  return [...oldData, i];
                });
              }
              console.log("iii", i);
            });
          }
        });
    }
  };
  const getInnerFileFileclient = (e) => {
    axios
      .get(
        `${baseUrl}/customers/documentlistbyfolder?q_id=${qid.id}&folder_id=${e.folder_id}`,
        myConfigClient
      )
      .then((res) => {
        if (res.data.code === 1) {
          setColor(e.id);
          setclientFile(res.data.result);
        }
      });
  };
  const getInnerFileFileadmin = (e) => {
    axios
      .get(
        `${baseUrl}/admin/documentlistbyfolder?q_id=${qid.id}&folder_id=${e.folder_id}`,
        myConfigAdmin
      )
      .then((res) => {
        if (res.data.code === 1) {
          setColor(e.id);
          setadminFile(res.data.result);
        }
      });
  };
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getFile = () => {
    let pd = qid.id;

    if (
      window.location.pathname.split("/")[1] === "teamleader" &&
      pd &&
      JSON.parse(uid)
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
  const showFolder = () => {
    let kk = [];
    let pd = qid.id;
    let movedFold = {};
    movedFold = {
      label: "...(root)",
      value: "0",
    };
    kk.push(movedFold);
    if (
      window.location.pathname.split("/")[1] === "teamleader" &&
      pd.length > 0
    ) {
      axios
        .get(
          `${baseUrl}/tl/queryfolderlist?q_id=${pd}&uid=${JSON.parse(uid)}`,
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
            });
            setMovedFolder(kk);
          }
        });
    }
  };

  const getFolder = (e) => {
    setCreateFolder(!createFoldernew);
  };
  const handleFile = (e) => {
    if (e) {
      setFileId(e.id);
      setMove(!move);
    } else {
      setMove(!move);
    }
  };
  const mapIcon = (e) => {
    axios
      .get(
        `${baseUrl}/tl/folderfile?q_id=${qid.id}&folder_id=${folderId.value}&file_id=${fileId}`,
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
  const getInnerFileFile = (e) => {
    if (window.location.pathname.split("/")[1] === "teamleader") {
      axios
        .get(
          `${baseUrl}/tl/documentlistbyfolder?q_id=${qid.id}&folder_id=${
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
    }
  };
  const openFolder = (e) => {
    setId(e);
    setIsOpen(!isOpen);
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
          `${baseUrl}/admin/viewdocument?assign_no=${qno}&id=${qid}`,
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
        .get(`${baseUrl}/tl/viewdocument?assign_no=${qno}&id=${qid}`, myConfig2)
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
      token = window.localStorage.getItem("tpToken");
      const myConfig2 = {
        headers: {
          uit: token,
        },
        responseType: "blob",
      };
      axios
        .get(`${baseUrl}/tl/viewdocument?assign_no=${qno}&id=${qid}`, myConfig2)
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
          `${baseUrl}/customers/viewdocument?assign_no=${qno}&id=${qid}`,
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
  const rightClick = (e, a, b, c) => {
    e.preventDefault();
    downloadpdf(a, b, c);
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

            {panel === "teamleader" ? (
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
                          <div className="folderCreated">
                            <ArticleIcon
                              onContextMenu={(e) => handleFile(i)}
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
                              {i.name}
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
                        <span style={{ fontSize: "16px", fontWeight: "300" }}>
                          Folder content
                        </span>
                        <div className="d-flex">
                          {innerFiles.map((i) => (
                            <>
                              <div className="folderCreated">
                                <ArticleIcon
                                  onContextMenu={(e) => handleFile(i)}
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
                                  {i.name}
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
                        <Select
                          onChange={(e) => setFolderId(e)}
                          options={movedFolder}
                          placeholder="Please select folder"
                        ></Select>
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
                  />
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
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "300",
                      }}
                    >
                      Uploaded documents
                    </span>
                  </div>
                  <FolderWrapper>
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
                              {i.name}
                            </span>
                          </>
                        ) : (
                          <>
                            {color === i.id ? (
                              <FolderIcon
                                onClick={(e) => getInnerFileFileadmin(i)}
                                style={{
                                  fontSize: "50px",
                                  color: "#0000ff",
                                  cursor: "pointer",
                                }}
                              />
                            ) : (
                              <FolderIcon
                                onClick={(e) => getInnerFileFileadmin(i)}
                                style={{
                                  fontSize: "50px",
                                  color: "#fccc77",
                                  cursor: "pointer",
                                }}
                              />
                            )}
                          </>
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
                  </FolderWrapper>
                </td>
                <td>
                  <div className="d-flex">
                    <FolderDetails>
                      <div className="folderDetails">
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: "300",
                            textAlign: "left",
                          }}
                        >
                          Folder content
                        </span>
                        <div className="d-flex">
                          {adminFile.map((i) => (
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
                      </div>
                    </FolderDetails>
                  </div>
                  {move === true ? (
                    <Modal isOpen={move} toggle={handleFile} size="xs">
                      <ModalHeader toggle={handleFile}>Move to</ModalHeader>
                      <ModalBody>
                        <Select
                          onChange={(e) => setFolderId(e)}
                          options={movedFolder}
                          placeholder="Please select folder"
                        ></Select>
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
                  />
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
                          <>
                            {color === i.id ? (
                              <FolderIcon
                                onClick={(e) => getInnerFileFileclient(i)}
                                style={{
                                  fontSize: "50px",
                                  color: "#0000ff",
                                  cursor: "pointer",
                                }}
                              />
                            ) : (
                              <FolderIcon
                                onClick={(e) => getInnerFileFileclient(i)}
                                style={{
                                  fontSize: "50px",
                                  color: "#fccc77",
                                  cursor: "pointer",
                                }}
                              />
                            )}
                          </>
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
                      </div>
                    </FolderDetails>
                  </div>
                  {move === true ? (
                    <Modal isOpen={move} toggle={handleFile} size="xs">
                      <ModalHeader toggle={handleFile}>Move to</ModalHeader>
                      <ModalBody>
                        <Select
                          onChange={(e) => setFolderId(e)}
                          options={movedFolder}
                          placeholder="Please select folder"
                        ></Select>
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
                  />
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
            {qstatus == "-1" || p.is_delete == "1" ? (
              <tr>
                <th scope="row">Date of decline</th>
                <td>
                  {qstatus == "-1" || p.is_delete == "1" ? declined2 : ""}
                </td>
              </tr>
            ) : (
              ""
            )}
            {p.query_status == "-1" ? (
              <tr>
                <th scope="row">Reasons for admin decline query</th>
                <td colspan="1">{p.decline_notes}</td>
              </tr>
            ) : null}
            {p.is_delete == "1" ? (
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
