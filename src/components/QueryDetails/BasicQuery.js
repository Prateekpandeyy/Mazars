// import React, { useState, useEffect } from "react";
// import CommonServices from "../../common/common";
// import { useParams } from "react-router-dom";
// import { Markup } from "interweave";
// import axios from "axios";
// import { baseUrl } from "../../config/config";
// import "./queryStyle.css";
// import MainText from "../Common/MainText";
// import ShowFolder from "./Folder/ShowFolder";
// import styled from "styled-components";
// import FolderIcon from "@mui/icons-material/Folder";
// import ArticleIcon from "@mui/icons-material/Article";
// import Swal from "sweetalert2";
// import { Box } from "@mui/material";
// import { Modal, ModalHeader, ModalBody } from "reactstrap";
// import classNames from "classnames";
// import CreateFolder from "./Folder/CreateFolder";
// import Select from "react-select";
// import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
// import MultiLevelSelect from "react-multi-level-selector";
// import Form from "./MultiSelectCust";
// import { useForm } from "react-hook-form";
// const FolderWrapper = styled(Box)({
//   display: "flex",

//   alignItems: "flex-start",
//   flexWrap: "wrap",
//   margin: "0px 20px 0px 0px",
// });

// const FolderDetails = styled(Box)({
//   display: "flex",
//   width: "100%",
//   alignItems: "flex-start",
//   flexWrap: "wrap",
// });

// function BasicQuery({
//   qstatus,
//   panel,
//   p,
//   diaplaySpecific,
//   queryDocs,
//   year,
//   purpose,
//   declined2,
//   declinedStatus,
// }) {
//   const { handleSubmit, getValue, register, errors } = useForm();
//   const [isOpen, setIsOpen] = useState(false);
//   const [id, setId] = useState("");
//   const [createFoldernew, setCreateFolder] = useState(false);
//   const [folder, setFolder] = useState([]);
//   const [color, setColor] = useState(0);
//   const [move, setMove] = useState(false);
//   const [movedFolder, setMovedFolder] = useState([
//     {
//       label: "...(root)",
//       value: "0",
//     },
//   ]);
//   const [files, setFiles] = useState([]);
//   const [folderId, setFolderId] = useState("0");
//   const [fileId, setFileId] = useState("");
//   const [innerFiles, setInnerFiles] = useState([]);
//   const [clientFolder, setclientFolder] = useState([]);
//   const [clientFile, setclientFile] = useState([]);
//   const [leftFolder, setLeftFolder] = useState([]);
//   const [sub_folder, set_sub_folder] = useState([]);
//   const [isLeft, setIsLeft] = useState(true);
//   const [mFold, setMfold] = useState([]);
//   const [subFolder, setSubFolder] = useState([]);
//   const [subFile, setSubFile] = useState([]);
//   const [showSubfolderData, setShowSubFolderData] = useState(false);
//   const [showclientSubFolder, setClientSubFolder] = useState([]);
//   const [mainFoldName, setMainFoldName] = useState("");
//   const [folderName, setFolderName] = useState("");
//   const [clientInnerFile, setClientInnerFiles] = useState([]);
//   const [adminFolder, setadminFolder] = useState([]);
//   const [showadminSubFolder, setadminSubFolder] = useState([]);
//   const [adminFile, setadminFile] = useState([]);
//   const [adminInnerFile, setAdminInnerFiles] = useState([]);
//   const [adminFolder2, setadminFolder2] = useState([]);
//   const [clientFolder2, setClientFolder2] = useState([]);
//   const [showClientFolderdata, setShowClientShowFolderData] = useState(false);
//   const [showAdminFolderdata, setShowAdminShowFolderData] = useState(false);
//   const [foldError, setFoldError] = useState(false);
//   const token = window.localStorage.getItem("tlToken");
//   const uid = localStorage.getItem("tlkey");
//   const adminToken = window.localStorage.getItem("adminToken");
//   const clientToken = window.localStorage.getItem("clientToken");
//   const qid = useParams();
//   const myConfigAdmin = {
//     headers: {
//       uit: adminToken,
//     },
//   };
//   const myConfigClient = {
//     headers: {
//       uit: clientToken,
//     },
//   };
//   const myConfig = {
//     headers: {
//       uit: token,
//     },
//   };
//   useEffect(() => {
//     getFile();
//     showFolder();
//   }, [qid.id.length]);
//   useEffect(() => {
//     getAdminFile();
//   }, []);
//   useEffect(() => {
//     getClientFile();
//   }, []);
//   const getClientFiles2 = (e) => {
//     let id = [];
//     axios
//       .get(
//         `${baseUrl}/customers/documentlistbyfolder?q_id=${qid.id}`,
//         myConfigClient
//       )
//       .then((res) => {
//         if (res.data.code === 1) {
//           res.data.result.map((i) => {
//             if (id.includes(i.folder_id)) {
//             } else {
//               if (i.folder_id !== "0") {
//                 id.push(i.folder_id);
//               }
//               setclientFolder((oldData) => {
//                 return [...oldData, i];
//               });
//             }
//           });
//         }
//       });
//   };
//   const getClientFile = (e) => {
//     if (window.location.pathname.split("/")[1] === "customer") {
//       let id = [];

//       axios
//         .get(
//           `${baseUrl}/customers/foldersubfolder?q_id=${qid.id}`,
//           myConfigClient
//         )
//         .then((res) => {
//           if (res.data.code === 1) {
//             setClientFolder2(res.data.result);
//           }
//         })
//         .then((res) => {
//           getClientFiles2();
//         });
//     }
//   };
//   const getInnerFileFileclient = (e) => {
//     setClientInnerFiles([]);
//     setFolderName("");
//     setClientSubFolder(e.child);
//     setColor(e.id);
//     setShowClientShowFolderData(false);
//     let kk = [];
//     setMainFoldName(e.folder);
//     clientFolder.map((i) => {
//       if (e.id === i.folder_id) {
//         kk.push(i);
//       }
//     });
//     setclientFile(kk);
//   };
//   const getadminFiles2 = (e) => {
//     let id = [];
//     axios
//       .get(
//         `${baseUrl}/admin/documentlistbyfolder?q_id=${qid.id}`,
//         myConfigAdmin
//       )
//       .then((res) => {
//         if (res.data.code === 1) {
//           res.data.result.map((i) => {
//             if (id.includes(i.folder_id)) {
//             } else {
//               if (i.folder_id !== "0") {
//                 id.push(i.folder_id);
//               }
//               setadminFolder((oldData) => {
//                 return [...oldData, i];
//               });
//             }
//           });
//         }
//       });
//   };
//   const getAdminFile = (e) => {
//     if (window.location.pathname.split("/")[1] === "admin") {
//       let id = [];
//       axios
//         .get(`${baseUrl}/admin/foldersubfolder?q_id=${qid.id}`, myConfigAdmin)
//         .then((res) => {
//           if (res.data.code === 1) {
//             setadminFolder2(res.data.result);
//           }
//         })
//         .then((res) => {
//           getadminFiles2();
//         });
//     }
//   };
//   const getInnerFileFileadmin = (e) => {
//     setadminSubFolder(e.child);
//     setShowAdminShowFolderData(false);
//     setAdminInnerFiles([]);
//     setColor(e.id);
//     let kk = [];
//     adminFolder.map((i) => {
//       if (e.id === i.folder_id) {
//         kk.push(i);
//       }
//     });
//     setMainFoldName(e.folder);
//     setFolderName("");
//     setadminFile(kk);
//   };

//   const getFile = () => {
//     let pd = qid.id;

//     if (
//       window.location.pathname.split("/")[1] === "teamleader" ||
//       window.location.pathname.split("/")[1] === "taxprofessional"
//     ) {
//       axios
//         .get(
//           `${baseUrl}/tl/documentlistbyfolder?q_id=${pd}&uid=${JSON.parse(
//             uid
//           )}`,
//           myConfig
//         )
//         .then((res) => {
//           if (res.data.code === 1) {
//             setFiles(res.data.result);
//           }
//         });
//     }
//   };

//   const getMoveToList = () => {
//     let kk = [];
//     let pd = qid.id;
//     let movedFold = {};
//     let leftFold = [];
//     movedFold = {
//       label: "...(root)",
//       value: "0",
//     };
//     kk.push(movedFold);
//     axios
//       .get(`${baseUrl}/tl/foldersubfolder?q_id=${pd}`, myConfig)
//       .then((res) => {
//         if (res.data.code === 1) {
//           let ad = res.data.result;
//           setMfold(ad);
//           ad.map((i) => {
//             movedFold = {
//               label: i.folder,
//               value: i.id,
//             };
//             kk.push(movedFold);
//             leftFold.push(movedFold);
//           });

//           setMovedFolder(kk);
//           setLeftFolder(leftFold);
//         }
//       });
//   };

//   const showFolder = () => {
//     let pd = qid.id;
//     if (
//       window.location.pathname.split("/")[1] === "teamleader" ||
//       window.location.pathname.split("/")[1] === "taxprofessional"
//     ) {
//       axios
//         .get(
//           `${baseUrl}/tl/queryfolderlist?q_id=${pd}&uid=${JSON.parse(uid)}`,
//           myConfig
//         )
//         .then((res) => {
//           if (res.data.code === 1) {
//             setFolder(res.data.result);
//             getMoveToList();
//           }
//         });
//     }
//   };

//   const getFolder = (e) => {
//     setCreateFolder(!createFoldernew);
//   };
//   const handleFile = (e, i, isLeft) => {
//     if (e) {
//       e.preventDefault();
//     }
//     setIsLeft(isLeft);
//     if (i) {
//       setFileId(i.id);
//       setMove(!move);
//     } else {
//       setMove(!move);
//     }
//   };
//   const mapIcon = (e) => {
//     console.log("isLeft", isLeft, folderId);
//     if (isLeft === true && folderId === "0") {
//       setFoldError(true);
//     } else if (folderId.length > 0) {
//       setFoldError(false);
//       setSubFolder([]);
//       axios
//         .get(
//           `${baseUrl}/tl/folderfile?q_id=${qid.id}&folder_id=${folderId}&file_id=${fileId}`,
//           myConfig
//         )
//         .then((res) => {
//           if (res.data.code === 1) {
//             if (showSubfolderData === false) {
//               getSubFile({
//                 id: color,
//               });
//             } else {
//               setShowSubFolderData(false);
//             }
//             // if (showSubfolderData === true) {
//             //   get_sub_innerFile();
//             // } else {
//             // }
//             setFolderId("0");
//             handleFile();
//             showFolder();
//             getFile();
//             setInnerFiles([]);
//             setColor(0);
//             Swal.fire({
//               title: "success",
//               html: "File transfered successfully",
//               icons: "success",
//             });
//           } else if (res.data.code === 0) {
//             Swal.fire({
//               title: "error",
//               html: "Something went wrong, please try again",
//               icons: "error",
//             });
//           }
//         })
//         .catch((error) => {
//           Swal.fire({
//             title: "error",
//             html: error,
//             icons: "error",
//           });
//         });
//     } else {
//       setFoldError(true);
//     }
//   };
//   const getSubFile = (e) => {
//     axios
//       .get(
//         `${baseUrl}/tl/documentlistbyfolder?q_id=${qid.id}&folder_id=${
//           e.id
//         }&uid=${JSON.parse(uid)}`,
//         myConfig
//       )
//       .then((res) => {
//         if (res.data.code === 1) {
//           setColor(e.id);

//           setInnerFiles(res.data.result);
//         }
//       });
//   };
//   const get_sub_innerFile = (e) => {
//     if (
//       window.location.pathname.split("/")[1] === "teamleader" ||
//       window.location.pathname.split("/")[1] === "taxprofessional"
//     ) {
//       axios
//         .get(
//           `${baseUrl}/tl/documentlistbyfolder?q_id=${qid.id}&folder_id=${
//             e.id
//           }&uid=${JSON.parse(uid)}`,
//           myConfig
//         )
//         .then((res) => {
//           if (res.data.code === 1) {
//             setFolderName(e.folder);
//             setSubFile(res.data.result);
//             setShowSubFolderData(true);
//           } else {
//             setShowSubFolderData(false);
//           }
//         });
//     }
//   };
//   const getInnerFileFile = (e) => {
//     if (
//       window.location.pathname.split("/")[1] === "teamleader" ||
//       window.location.pathname.split("/")[1] === "taxprofessional"
//     ) {
//       axios
//         .get(
//           `${baseUrl}/tl/queryfolderlist?q_id=${qid.id}&folder_id=${
//             e.id
//           }&uid=${JSON.parse(uid)}`,
//           myConfig
//         )
//         .then((res) => {
//           if (res.data.code === 1) {
//             setShowSubFolderData(false);
//             setColor(e.id);
//             set_sub_folder(res.data.result);
//             setSubFile([]);
//             setMainFoldName(e.folder);
//             setFolderName("");
//             // setInnerFiles(res.data.result);
//           }
//         })
//         .then((res) => {
//           getSubFile(e);
//         });
//     }
//   };
//   const openFolder = (e) => {
//     setId(e);
//     setIsOpen(!isOpen);
//   };

//   const downloadpdf = (qno, qid, name) => {
//     let userId, token;
//     if (panel === "admin") {
//       userId = window.localStorage.getItem("adminkey");
//       token = window.localStorage.getItem("adminToken");
//       const myConfig2 = {
//         headers: {
//           uit: token,
//         },
//         responseType: "blob",
//       };
//       axios
//         .get(
//           `${baseUrl}/admin/viewdocument?assign_no=${qno}&id=${qid}`,
//           myConfig2
//         )
//         .then((res) => {
//           if (res.status === 200) {
//             window.URL = window.URL || window.webkitURL;
//             var url = window.URL.createObjectURL(res.data);
//             var a = document.createElement("a");
//             document.body.appendChild(a);
//             a.style = "display: none";
//             a.href = url;

//             a.download = name;
//             a.target = "_blank";
//             a.click();
//           }
//         });
//     } else if (panel === "teamleader") {
//       userId = window.localStorage.getItem("tlkey");
//       token = window.localStorage.getItem("tlToken");
//       const myConfig2 = {
//         headers: {
//           uit: token,
//         },
//         responseType: "blob",
//       };
//       axios
//         .get(`${baseUrl}/tl/viewdocument?assign_no=${qno}&id=${qid}`, myConfig2)
//         .then((res) => {
//           if (res.status === 200) {
//             window.URL = window.URL || window.webkitURL;
//             var url = window.URL.createObjectURL(res.data);
//             var a = document.createElement("a");
//             document.body.appendChild(a);
//             a.style = "display: none";
//             a.href = url;

//             a.download = name;
//             a.target = "_blank";
//             a.click();
//           }
//         });
//     } else if (panel === "taxprofessional") {
//       userId = window.localStorage.getItem("tpkey");
//       token = window.localStorage.getItem("tpToken");
//       const myConfig2 = {
//         headers: {
//           uit: token,
//         },
//         responseType: "blob",
//       };
//       axios
//         .get(`${baseUrl}/tl/viewdocument?assign_no=${qno}&id=${qid}`, myConfig2)
//         .then((res) => {
//           if (res.status === 200) {
//             window.URL = window.URL || window.webkitURL;
//             var url = window.URL.createObjectURL(res.data);
//             var a = document.createElement("a");
//             document.body.appendChild(a);
//             a.style = "display: none";
//             a.href = url;

//             a.download = name;
//             a.target = "_blank";
//             a.click();
//           }
//         });
//     } else if (panel === "client") {
//       userId = window.localStorage.getItem("userid");
//       token = window.localStorage.getItem("clientToken");
//       const myConfig2 = {
//         headers: {
//           uit: token,
//         },
//         responseType: "blob",
//       };
//       axios
//         .get(
//           `${baseUrl}/customers/viewdocument?assign_no=${qno}&id=${qid}`,
//           myConfig2
//         )
//         .then((res) => {
//           if (res.status === 200) {
//             window.URL = window.URL || window.webkitURL;
//             var url = window.URL.createObjectURL(res.data);
//             var a = document.createElement("a");
//             document.body.appendChild(a);
//             a.style = "display: none";
//             a.href = url;

//             a.download = name;
//             a.target = "_blank";
//             a.click();
//           }
//         });
//     }
//   };
//   const rightClick = (e, a, b, c) => {
//     downloadpdf(a, b, c);
//   };
//   const gSub = (e, dir) => {
//     setFolderId(e);
//     mFold.map((i) => {
//       if (i.id === e) {
//         setSubFolder(i.child);
//       }
//     });
//   };
//   const get_sub_innerFileClient = (e) => {
//     axios
//       .get(
//         `${baseUrl}/customers/documentlistbyfolder?q_id=${qid.id}&folder_id=${
//           e.id
//         }&uid=${JSON.parse(uid)}`,
//         myConfigClient
//       )
//       .then((res) => {
//         if (res.data.code === 1) {
//           setFolderName(e.folder);
//           setShowClientShowFolderData(true);
//           setClientInnerFiles(res.data.result);
//         } else {
//         }
//       });
//   };
//   const get_sub_innerFileAdmin = (e) => {
//     axios
//       .get(
//         `${baseUrl}/admin/documentlistbyfolder?q_id=${qid.id}&folder_id=${
//           e.id
//         }&uid=${JSON.parse(uid)}`,
//         myConfigAdmin
//       )
//       .then((res) => {
//         if (res.data.code === 1) {
//           setFolderName(e.folder);
//           setShowAdminShowFolderData(true);
//           setAdminInnerFiles(res.data.result);
//         } else {
//         }
//       });
//   };

//   return (
//     <>
//       <div className="queryBox">
//         <MainText align="center">Basic query information</MainText>
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th scope="col">Titles</th>
//               <th scope="col">Data</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th scope="row">Query no</th>
//               <td>{p.assign_no}</td>
//             </tr>
//             <tr>
//               <th scope="row">Query date</th>
//               <td>{CommonServices.changeFormateDate(p.created)}</td>
//             </tr>
//             <tr>
//               <th scope="row">Client id</th>
//               <td>{p.email}</td>
//             </tr>
//             <tr>
//               <th scope="row">Category</th>
//               <td>{p.cat_name}</td>
//             </tr>
//             <tr>
//               <th scope="row">Sub- category</th>
//               <td>{p.sub_cat_name}</td>
//             </tr>
//             <tr>
//               <th scope="row">Name of the case</th>
//               <td>{p.case_name}</td>
//             </tr>
//             <tr>
//               <th scope="row">Assessment year(s)</th>
//               <td>
//                 {year.map((p, i) => (
//                   <p key={i}>{p.value}</p>
//                 ))}
//               </td>
//             </tr>
//             <tr>
//               <th scope="row">Brief fact of the case</th>
//               <td className="tableStyle">
//                 {" "}
//                 <Markup content={p.fact_case} />
//               </td>
//             </tr>

//             {panel === "teamleader" || panel === "taxprofessional" ? (
//               <tr>
//                 <td
//                   scope="row"
//                   style={{ display: "flex", flexDirection: "column" }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       width: "100%",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <span style={{ fontSize: "16px", fontWeight: "300" }}>
//                       Uploaded documents
//                     </span>
//                     <button
//                       className="autoWidthBtn ml-auto"
//                       onClick={(e) => getFolder()}
//                     >
//                       Create folder
//                     </button>
//                   </div>
//                   <FolderWrapper>
//                     {folder.map((i) => (
//                       <div className="folderCreated">
//                         {color === i.id ? (
//                           <FolderIcon
//                             onClick={(e) => getInnerFileFile(i)}
//                             style={{
//                               fontSize: "50px",
//                               color: "#0000ff",
//                               cursor: "pointer",
//                             }}
//                           />
//                         ) : (
//                           <FolderIcon
//                             onClick={(e) => getInnerFileFile(i)}
//                             style={{
//                               fontSize: "50px",
//                               color: "#fccc77",
//                               cursor: "pointer",
//                             }}
//                           />
//                         )}
//                         <span
//                           style={{
//                             textAlign: "center",
//                             whiteSpace: "break-spaces",
//                             display: "flex",
//                             maxHeight: "60px",
//                             overflow: "hidden",
//                           }}
//                         >
//                           {i.folder}{" "}
//                         </span>
//                       </div>
//                     ))}
//                     {files.map((i) => (
//                       <>
//                         {i.folder_id === "0" ? (
//                           <div className="folderCreated">
//                             <ArticleIcon
//                               onContextMenu={(e) => handleFile(e, i, true)}
//                               onClick={(e) =>
//                                 rightClick(e, i.assign_no, i.id, i.name)
//                               }
//                               style={{
//                                 fontSize: "50px",
//                                 color: "#0000ff",
//                                 cursor: "pointer",
//                               }}
//                             />
//                             <span
//                               style={{
//                                 textAlign: "center",
//                                 whiteSpace: "break-spaces",
//                                 display: "flex",
//                                 maxHeight: "60px",
//                                 overflow: "hidden",
//                               }}
//                             >
//                               {i.name}
//                             </span>
//                           </div>
//                         ) : (
//                           ""
//                         )}
//                       </>
//                     ))}
//                   </FolderWrapper>
//                 </td>
//                 <td>
//                   <div className="d-flex">
//                     <FolderDetails>
//                       <div className="folderDetails">
//                         {mainFoldName.length > 0 && folderName.length > 0 ? (
//                           <span
//                             style={{ fontSize: "16px", fontWeight: "300" }}
//                             onClick={() => {
//                               setShowSubFolderData(false);
//                               setFolderName("");
//                             }}
//                           >
//                             {`${mainFoldName} ${
//                               folderName.length > 0 ? ">" : ""
//                             } ${folderName}`}
//                           </span>
//                         ) : (
//                           <>
//                             {mainFoldName.length > 0 ||
//                             folderName.length > 0 ? (
//                               <span
//                                 style={{ fontSize: "16px", fontWeight: "300" }}
//                                 onClick={() => {
//                                   setShowSubFolderData(false);
//                                   setFolderName("");
//                                 }}
//                               >
//                                 {`${mainFoldName} ${
//                                   folderName.length > 0 ? ">" : ""
//                                 } ${folderName}`}
//                               </span>
//                             ) : (
//                               <span
//                                 style={{ fontSize: "16px", fontWeight: "300" }}
//                               >
//                                 Folder content
//                               </span>
//                             )}
//                           </>
//                         )}

//                         {showSubfolderData === true ? (
//                           <>
//                             <div className="d-flex">
//                               <span className="folderCreated">
//                                 <FolderIcon
//                                   onClick={(e) => {
//                                     setSubFile([]);
//                                     setShowSubFolderData(false);
//                                     setFolderName("");
//                                   }}
//                                   style={{
//                                     fontSize: "50px",
//                                     color: "#fccc77",
//                                     cursor: "pointer",
//                                   }}
//                                 />
//                                 <span
//                                   style={{
//                                     textAlign: "center",
//                                     whiteSpace: "break-spaces",
//                                     display: "flex",
//                                     maxHeight: "60px",
//                                     overflow: "hidden",
//                                   }}
//                                 >
//                                   ...
//                                 </span>
//                               </span>
//                               {subFile.map((i) => (
//                                 <div className="folderCreated">
//                                   <ArticleIcon
//                                     onContextMenu={(e) =>
//                                       handleFile(e, i, false)
//                                     }
//                                     onClick={(e) =>
//                                       rightClick(e, i.assign_no, i.id, i.name)
//                                     }
//                                     style={{
//                                       fontSize: "50px",
//                                       color: "#0000ff",
//                                       cursor: "pointer",
//                                     }}
//                                   />
//                                   <span
//                                     style={{
//                                       textAlign: "center",
//                                       whiteSpace: "break-spaces",
//                                       display: "flex",
//                                       maxHeight: "60px",
//                                       overflow: "hidden",
//                                     }}
//                                   >
//                                     {i.name}
//                                   </span>
//                                 </div>
//                               ))}
//                             </div>
//                           </>
//                         ) : (
//                           <div className="d-flex">
//                             {sub_folder.map((i) => (
//                               <div className="folderCreated" key={i.id}>
//                                 <FolderIcon
//                                   onClick={(e) => get_sub_innerFile(i)}
//                                   style={{
//                                     fontSize: "50px",
//                                     color: "#fccc77",
//                                     cursor: "pointer",
//                                   }}
//                                 />
//                                 <span
//                                   style={{
//                                     textAlign: "center",
//                                     whiteSpace: "break-spaces",
//                                     display: "flex",
//                                     maxHeight: "60px",
//                                     overflow: "hidden",
//                                   }}
//                                 >
//                                   {i.folder}
//                                 </span>
//                               </div>
//                             ))}
//                             {innerFiles.map((i) => (
//                               <>
//                                 <div className="folderCreated">
//                                   <ArticleIcon
//                                     onContextMenu={(e) =>
//                                       handleFile(e, i, false)
//                                     }
//                                     onClick={(e) =>
//                                       rightClick(e, i.assign_no, i.id, i.name)
//                                     }
//                                     style={{
//                                       fontSize: "50px",
//                                       color: "#0000ff",
//                                       cursor: "pointer",
//                                     }}
//                                   />
//                                   <span
//                                     style={{
//                                       textAlign: "center",
//                                       whiteSpace: "break-spaces",
//                                       display: "flex",
//                                       maxHeight: "60px",
//                                       overflow: "hidden",
//                                     }}
//                                   >
//                                     {i.name}
//                                   </span>
//                                 </div>
//                               </>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </FolderDetails>
//                   </div>
//                   {move === true ? (
//                     <Modal isOpen={move} toggle={handleFile} size="xs">
//                       <ModalHeader toggle={handleFile}>Move to</ModalHeader>
//                       <ModalBody>
//                         {isLeft === true ? (
//                           <>
//                             <label>Folder</label>

//                             <select
//                               className={`${
//                                 foldError === true ? "validationError" : ""
//                               } form-control`}
//                               onChange={(e) => gSub(e.target.value, "left")}
//                             >
//                               <option value="">Please select folder</option>
//                               {mFold.map((i) => (
//                                 <option value={i.id}>{i.folder}</option>
//                               ))}
//                             </select>
//                             {subFolder.length > 0 ? (
//                               <>
//                                 <label>Sub folder</label>
//                                 <select
//                                   className="form-control"
//                                   onChange={(e) => setFolderId(e.target.value)}
//                                 >
//                                   <option value="">None</option>
//                                   {subFolder.map((i) => (
//                                     <option value={i.id}>{i.folder}</option>
//                                   ))}
//                                 </select>
//                               </>
//                             ) : (
//                               ""
//                             )}
//                           </>
//                         ) : (
//                           <>
//                             <label>Folder</label>
//                             <select
//                               className={`${
//                                 foldError === true ? "validationError" : ""
//                               } form-control`}
//                               onChange={(e) => gSub(e.target.value, "right")}
//                             >
//                               <option value="0">Root</option>
//                               {mFold.map((i) => (
//                                 <option value={i.id}>{i.folder}</option>
//                               ))}
//                             </select>
//                             {subFolder.length > 0 ? (
//                               <>
//                                 <label>Sub folder</label>
//                                 <select
//                                   className="form-control"
//                                   onChange={(e) => setFolderId(e.target.value)}
//                                 >
//                                   <option value="">None</option>
//                                   {subFolder.map((i) => (
//                                     <option value={i.id}>{i.folder}</option>
//                                   ))}
//                                 </select>
//                               </>
//                             ) : (
//                               ""
//                             )}
//                           </>
//                         )}
//                         <button
//                           type="button"
//                           onClick={(e) => mapIcon(e)}
//                           className="autoWidthBtn my-2"
//                         >
//                           Submit
//                         </button>
//                       </ModalBody>
//                     </Modal>
//                   ) : (
//                     " "
//                   )}
//                   {createFoldernew === true ? (
//                     <CreateFolder
//                       addPaymentModal={createFoldernew}
//                       id={qid.id}
//                       getList={showFolder}
//                       movedFolder={movedFolder}
//                       rejectHandler={getFolder}
//                     />
//                   ) : (
//                     ""
//                   )}
//                 </td>
//               </tr>
//             ) : (
//               ""
//             )}
//             {panel === "admin" ? (
//               <tr>
//                 <td
//                   scope="row"
//                   style={{ display: "flex", flexDirection: "column" }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       width: "100%",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <span style={{ fontSize: "16px", fontWeight: "300" }}>
//                       Uploaded documents
//                     </span>
//                   </div>
//                   <FolderWrapper>
//                     {adminFolder2.map((i) => (
//                       <>
//                         {color === i.id ? (
//                           <div className="folderCreated">
//                             <FolderIcon
//                               onClick={(e) => getInnerFileFileadmin(i)}
//                               style={{
//                                 fontSize: "50px",
//                                 color: "#0000ff",
//                                 cursor: "pointer",
//                               }}
//                             />
//                             <span
//                               style={{
//                                 textAlign: "center",
//                                 whiteSpace: "break-spaces",
//                                 display: "flex",
//                                 maxHeight: "60px",
//                                 overflow: "hidden",
//                               }}
//                             >
//                               {i.folder}{" "}
//                             </span>
//                           </div>
//                         ) : (
//                           <div className="folderCreated">
//                             <FolderIcon
//                               onClick={(e) => getInnerFileFileadmin(i)}
//                               style={{
//                                 fontSize: "50px",
//                                 color: "#fccc77",
//                                 cursor: "pointer",
//                               }}
//                             />
//                             <span
//                               style={{
//                                 textAlign: "center",
//                                 whiteSpace: "break-spaces",
//                                 display: "flex",
//                                 maxHeight: "60px",
//                                 overflow: "hidden",
//                               }}
//                             >
//                               {i.folder}{" "}
//                             </span>
//                           </div>
//                         )}
//                       </>
//                     ))}
//                     {adminFolder.map((i) => (
//                       <>
//                         {i.folder_id === "0" ? (
//                           <div className="folderCreated">
//                             <ArticleIcon
//                               style={{
//                                 fontSize: "50px",
//                                 color: "#0000ff",
//                                 cursor: "pointer",
//                               }}
//                             />
//                             <span
//                               style={{
//                                 textAlign: "center",
//                                 whiteSpace: "break-spaces",
//                                 display: "flex",
//                                 maxHeight: "60px",
//                                 overflow: "hidden",
//                               }}
//                             >
//                               {i.name}
//                             </span>
//                           </div>
//                         ) : (
//                           ""
//                         )}
//                       </>
//                     ))}
//                   </FolderWrapper>
//                 </td>
//                 <td>
//                   <div className="d-flex">
//                     <FolderDetails>
//                       <div className="folderDetails">
//                         {mainFoldName.length > 0 && folderName.length > 0 ? (
//                           <span
//                             style={{ fontSize: "16px", fontWeight: "300" }}
//                             onClick={() => {
//                               setShowSubFolderData(false);
//                               setShowAdminShowFolderData(false);
//                               setFolderName("");
//                             }}
//                           >
//                             {`${mainFoldName} ${
//                               folderName.length > 0 ? ">" : ""
//                             } ${folderName}`}
//                           </span>
//                         ) : (
//                           <>
//                             {mainFoldName.length > 0 ||
//                             folderName.length > 0 ? (
//                               <span
//                                 style={{ fontSize: "16px", fontWeight: "300" }}
//                                 onClick={() => {
//                                   setShowSubFolderData(false);
//                                   setFolderName("");
//                                 }}
//                               >
//                                 {`${mainFoldName} ${
//                                   folderName.length > 0 ? ">" : ""
//                                 } ${folderName}`}
//                               </span>
//                             ) : (
//                               <span
//                                 style={{ fontSize: "16px", fontWeight: "300" }}
//                               >
//                                 Folder content
//                               </span>
//                             )}
//                           </>
//                         )}

//                         {showAdminFolderdata === true ? (
//                           <>
//                             <div className="d-flex">
//                               <div className="folderCreated">
//                                 <FolderIcon
//                                   onClick={(e) => {
//                                     setFolderName("");
//                                     setShowAdminShowFolderData(false);
//                                     setAdminInnerFiles([]);
//                                   }}
//                                   style={{
//                                     fontSize: "50px",
//                                     color: "#fccc77",
//                                     cursor: "pointer",
//                                   }}
//                                 />
//                                 <span
//                                   style={{
//                                     textAlign: "center",
//                                     whiteSpace: "break-spaces",
//                                     display: "flex",
//                                     maxHeight: "60px",
//                                     overflow: "hidden",
//                                   }}
//                                 >
//                                   ...
//                                 </span>
//                               </div>
//                               {adminInnerFile.map((i) => (
//                                 <>
//                                   <div className="folderCreated">
//                                     <ArticleIcon
//                                       style={{
//                                         fontSize: "50px",
//                                         color: "#0000ff",
//                                         cursor: "pointer",
//                                       }}
//                                     />
//                                     <span
//                                       style={{
//                                         textAlign: "center",
//                                         whiteSpace: "break-spaces",
//                                         display: "flex",
//                                         maxHeight: "60px",
//                                         overflow: "hidden",
//                                       }}
//                                     >
//                                       {i.name}
//                                     </span>
//                                   </div>
//                                 </>
//                               ))}
//                             </div>
//                           </>
//                         ) : (
//                           <div className="d-flex">
//                             {showadminSubFolder.map((i) => (
//                               <>
//                                 <div className="folderCreated">
//                                   <FolderIcon
//                                     onClick={(e) => get_sub_innerFileAdmin(i)}
//                                     style={{
//                                       fontSize: "50px",
//                                       color: "#fccc77",
//                                       cursor: "pointer",
//                                     }}
//                                   />
//                                   <span
//                                     style={{
//                                       textAlign: "center",
//                                       whiteSpace: "break-spaces",
//                                       display: "flex",
//                                       maxHeight: "60px",
//                                       overflow: "hidden",
//                                     }}
//                                   >
//                                     {i.folder}{" "}
//                                   </span>
//                                 </div>
//                               </>
//                             ))}
//                             {adminFile.map((i) => (
//                               <>
//                                 <div className="folderCreated">
//                                   <ArticleIcon
//                                     style={{
//                                       fontSize: "50px",
//                                       color: "#0000ff",
//                                       cursor: "pointer",
//                                     }}
//                                   />
//                                   <span
//                                     style={{
//                                       textAlign: "center",
//                                       whiteSpace: "break-spaces",
//                                       display: "flex",
//                                       maxHeight: "60px",
//                                       overflow: "hidden",
//                                     }}
//                                   >
//                                     {i.name}
//                                   </span>
//                                 </div>
//                               </>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </FolderDetails>
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               ""
//             )}
//             {panel === "client" ? (
//               <tr>
//                 <td
//                   scope="row"
//                   style={{ display: "flex", flexDirection: "column" }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       width: "100%",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <span style={{ fontSize: "16px", fontWeight: "300" }}>
//                       Uploaded documents
//                     </span>
//                   </div>
//                   <FolderWrapper>
//                     {clientFolder2.map((i) => (
//                       <>
//                         {color === i.id ? (
//                           <div className="folderCreated">
//                             <FolderIcon
//                               onClick={(e) => getInnerFileFileclient(i)}
//                               style={{
//                                 fontSize: "50px",
//                                 color: "#0000ff",
//                                 cursor: "pointer",
//                               }}
//                             />
//                             <span
//                               style={{
//                                 textAlign: "center",
//                                 whiteSpace: "break-spaces",
//                                 display: "flex",
//                                 maxHeight: "60px",
//                                 overflow: "hidden",
//                               }}
//                             >
//                               {i.folder}{" "}
//                             </span>
//                           </div>
//                         ) : (
//                           <div className="folderCreated">
//                             <FolderIcon
//                               onClick={(e) => getInnerFileFileclient(i)}
//                               style={{
//                                 fontSize: "50px",
//                                 color: "#fccc77",
//                                 cursor: "pointer",
//                               }}
//                             />
//                             <span
//                               style={{
//                                 textAlign: "center",
//                                 whiteSpace: "break-spaces",
//                                 display: "flex",
//                                 maxHeight: "60px",
//                                 overflow: "hidden",
//                               }}
//                             >
//                               {i.folder}{" "}
//                             </span>
//                           </div>
//                         )}
//                       </>
//                     ))}
//                     {clientFolder.map((i) => (
//                       <>
//                         {i.folder_id === "0" ? (
//                           <div className="folderCreated">
//                             <ArticleIcon
//                               style={{
//                                 fontSize: "50px",
//                                 color: "#0000ff",
//                                 cursor: "pointer",
//                               }}
//                             />
//                             <span
//                               style={{
//                                 textAlign: "center",
//                                 whiteSpace: "break-spaces",
//                                 display: "flex",
//                                 maxHeight: "60px",
//                                 overflow: "hidden",
//                               }}
//                             >
//                               {i.name}
//                             </span>
//                           </div>
//                         ) : (
//                           ""
//                         )}
//                       </>
//                     ))}
//                   </FolderWrapper>
//                 </td>
//                 <td>
//                   <div className="d-flex">
//                     <FolderDetails>
//                       <div className="folderDetails">
//                         {mainFoldName.length > 0 && folderName.length > 0 ? (
//                           <span
//                             style={{ fontSize: "16px", fontWeight: "300" }}
//                             onClick={() => {
//                               setClientInnerFiles([]);
//                               setFolderName("");
//                               setShowClientShowFolderData(false);
//                             }}
//                           >
//                             {`${mainFoldName} ${
//                               folderName.length > 0 ? ">" : ""
//                             } ${folderName}`}
//                           </span>
//                         ) : (
//                           <>
//                             {mainFoldName.length > 0 ||
//                             folderName.length > 0 ? (
//                               <span
//                                 style={{ fontSize: "16px", fontWeight: "300" }}
//                                 onClick={() => {
//                                   setClientInnerFiles([]);
//                                   setFolderName("");
//                                 }}
//                               >
//                                 {`${mainFoldName} ${
//                                   folderName.length > 0 ? ">" : ""
//                                 } ${folderName}`}
//                               </span>
//                             ) : (
//                               <span
//                                 style={{ fontSize: "16px", fontWeight: "300" }}
//                               >
//                                 Folder content
//                               </span>
//                             )}
//                           </>
//                         )}
//                         {showClientFolderdata === true ? (
//                           <>
//                             <div className="d-flex">
//                               <div className="folderCreated">
//                                 <FolderIcon
//                                   onClick={(e) => {
//                                     setFolderName("");
//                                     setShowClientShowFolderData(false);
//                                     setClientInnerFiles([]);
//                                   }}
//                                   style={{
//                                     fontSize: "50px",
//                                     color: "#fccc77",
//                                     cursor: "pointer",
//                                   }}
//                                 />
//                                 <span
//                                   style={{
//                                     textAlign: "center",
//                                     whiteSpace: "break-spaces",
//                                     display: "flex",
//                                     maxHeight: "60px",
//                                     overflow: "hidden",
//                                   }}
//                                 >
//                                   ...
//                                 </span>
//                               </div>
//                               {clientInnerFile.map((i) => (
//                                 <>
//                                   <div className="folderCreated">
//                                     <ArticleIcon
//                                       style={{
//                                         fontSize: "50px",
//                                         color: "#0000ff",
//                                         cursor: "pointer",
//                                       }}
//                                     />
//                                     <span
//                                       style={{
//                                         textAlign: "center",
//                                         whiteSpace: "break-spaces",
//                                         display: "flex",
//                                         maxHeight: "60px",
//                                         overflow: "hidden",
//                                       }}
//                                     >
//                                       {i.name}
//                                     </span>
//                                   </div>
//                                 </>
//                               ))}
//                             </div>
//                           </>
//                         ) : (
//                           <div className="d-flex">
//                             {showclientSubFolder.map((i) => (
//                               <>
//                                 <div className="folderCreated">
//                                   <FolderIcon
//                                     onClick={(e) => get_sub_innerFileClient(i)}
//                                     style={{
//                                       fontSize: "50px",
//                                       color: "#fccc77",
//                                       cursor: "pointer",
//                                     }}
//                                   />
//                                   <span
//                                     style={{
//                                       textAlign: "center",
//                                       whiteSpace: "break-spaces",
//                                       display: "flex",
//                                       maxHeight: "60px",
//                                       overflow: "hidden",
//                                     }}
//                                   >
//                                     {i.folder}{" "}
//                                   </span>
//                                 </div>
//                               </>
//                             ))}
//                             {clientFile.map((i) => (
//                               <>
//                                 <div className="folderCreated">
//                                   <ArticleIcon
//                                     style={{
//                                       fontSize: "50px",
//                                       color: "#0000ff",
//                                       cursor: "pointer",
//                                     }}
//                                   />
//                                   <span
//                                     style={{
//                                       textAlign: "center",
//                                       whiteSpace: "break-spaces",
//                                       display: "flex",
//                                       maxHeight: "60px",
//                                       overflow: "hidden",
//                                     }}
//                                   >
//                                     {i.name}
//                                   </span>
//                                 </div>
//                               </>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </FolderDetails>
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               ""
//             )}
//             <tr>
//               <th scope="row">Specific questions</th>
//               <td>
//                 {diaplaySpecific.map((p, i) => (
//                   <div>
//                     {i + 1}. {p.text}
//                   </div>
//                 ))}
//               </td>
//             </tr>
//             <tr>
//               <th scope="row">Purpose of the query</th>
//               <td colspan="1">
//                 {purpose.map((p, i) => (
//                   <p key={i}>{p.value}</p>
//                 ))}
//               </td>
//             </tr>
//             <tr>
//               <th scope="row">Format in which opinion is required</th>
//               <td colspan="1">
//                 <p>{p.softcopy_word === "1" && "Softcopy - Word/ Pdf"}</p>
//                 <p>
//                   {p.softcopy_digitally_assigned === "1" &&
//                     "SoftCopy- Digitally Signed"}
//                 </p>

//                 <p>
//                   {p.printout_physically_assigned === "1" &&
//                     "Printout- Physically Signed"}
//                 </p>
//               </td>
//             </tr>
//             <tr>
//               <th scope="row">Timelines within which opinion is required</th>
//               <td colspan="1">{p.Timelines}</td>
//             </tr>
//             {qstatus == "-1" || p.is_delete == "1" ? (
//               <tr>
//                 <th scope="row">Date of decline</th>
//                 <td>
//                   {qstatus == "-1" || p.is_delete == "1" ? declined2 : ""}
//                 </td>
//               </tr>
//             ) : (
//               ""
//             )}
//             {p.query_status == "-1" ? (
//               <tr>
//                 <th scope="row">Reasons for admin decline query</th>
//                 <td colspan="1">{p.decline_notes}</td>
//               </tr>
//             ) : null}
//             {p.is_delete == "1" ? (
//               <tr>
//                 <th scope="row">Reasons for client decline query</th>
//                 <td colspan="1">{p.decline_notes}</td>
//               </tr>
//             ) : null}
//           </tbody>
//         </table>
//       </div>
//       <ShowFolder rejectHandler={openFolder} id={id} addPaymentModal={isOpen} />
//     </>
//   );
// }

// export default BasicQuery;

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
import { useForm } from "react-hook-form";
import { FileIcon } from "../Common/MessageIcon";
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
  const { handleSubmit, getValue, register, errors } = useForm();
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
  const [rename, setRename] = useState("");
  const [renameValue, setRenameValue] = useState("");
  const token = window.localStorage.getItem("tlToken");
  const uid = localStorage.getItem("tlkey");
  const adminToken = window.localStorage.getItem("adminToken");
  const clientToken = window.localStorage.getItem("clientToken");
  const tokentp = window.localStorage.getItem("tptoken");
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
  console.log("done");
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
  const getClientFiles2 = (e) => {
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
    setColor(e.id);
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
  const getAdminFile = (e) => {
    if (window.location.pathname.split("/")[1] === "admin") {
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
    setColor(e.id);
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
            if (showSubfolderData === false) {
              getSubFile({
                id: color,
              });
            } else {
              setShowSubFolderData(false);
            }
            // if (showSubfolderData === true) {
            //   get_sub_innerFile();
            // } else {
            // }
            setFolderId("0");
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
    } else {
      setFoldError(true);
    }
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
          setShowSubFolderData(true);
        } else {
          setShowSubFolderData(false);
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
          setColor(e.id);
          set_sub_folder(res.data.result);
          setSubFile([]);
          setMainFoldName(e.folder);
          setFolderName("");
          // setInnerFiles(res.data.result);
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
                          <div className="folderCreated">
                            <span
                              onContextMenu={(e) => handleFile(e, i, true)}
                              onClick={(e) =>
                                rightClick(e, i.assign_no, i.id, i.name)
                              }
                            >
                              <FileIcon
                                name={i.name}
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
                        {mainFoldName.length > 0 && folderName.length > 0 ? (
                          <div>
                            <span
                              className="tabHover"
                              style={{ fontSize: "16px", fontWeight: "300" }}
                              onClick={() => {
                                setShowSubFolderData(false);
                                setFolderName("");
                              }}
                            >
                              {`${mainFoldName}`}
                            </span>
                            <span>
                              {`${
                                folderName.length > 0 ? ">" : ""
                              } ${folderName}`}
                            </span>
                          </div>
                        ) : (
                          <>
                            {mainFoldName.length > 0 ||
                            folderName.length > 0 ? (
                              <div>
                                <span
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "300",
                                  }}
                                  onClick={() => {
                                    setShowSubFolderData(false);
                                    setFolderName("");
                                  }}
                                >
                                  {`${mainFoldName}`}
                                </span>
                                <span>
                                  {folderName.length > 0 ? ">" : ""}
                                  {folderName}
                                </span>
                              </div>
                            ) : (
                              <span
                                style={{ fontSize: "16px", fontWeight: "300" }}
                              >
                                Folder content
                              </span>
                            )}
                          </>
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
                                  <span
                                    onContextMenu={(e) =>
                                      handleFile(e, i, false)
                                    }
                                    onClick={(e) =>
                                      rightClick(e, i.assign_no, i.id, i.name)
                                    }
                                  >
                                    <FileIcon
                                      name={i.name}
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
                                <div className="folderCreated">
                                  <span
                                    onContextMenu={(e) =>
                                      handleFile(e, i, false)
                                    }
                                    onClick={(e) =>
                                      rightClick(e, i.assign_no, i.id, i.name)
                                    }
                                  >
                                    <FileIcon
                                      name={i.name}
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
                                  </span>
                                </div>
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
                      setColor={setColor}
                      setInnerFiles={setInnerFiles}
                      setShowSubFolderData={setShowSubFolderData}
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
                      <>
                        {i.folder_id === "0" ? (
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
                        {mainFoldName.length > 0 && folderName.length > 0 ? (
                          <div>
                            <span
                              className="tabHover"
                              style={{ fontSize: "16px", fontWeight: "300" }}
                              onClick={() => {
                                setShowSubFolderData(false);
                                setFolderName("");
                              }}
                            >
                              {`${mainFoldName}`}
                            </span>
                            <span>
                              {`${
                                folderName.length > 0 ? ">" : ""
                              } ${folderName}`}
                            </span>
                          </div>
                        ) : (
                          <>
                            {mainFoldName.length > 0 ||
                            folderName.length > 0 ? (
                              <div>
                                <span
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "300",
                                  }}
                                  onClick={() => {
                                    setShowSubFolderData(false);
                                    setFolderName("");
                                  }}
                                >
                                  {`${mainFoldName}`}
                                </span>
                                <span>
                                  {folderName.length > 0 ? ">" : ""}
                                  {folderName}
                                </span>
                              </div>
                            ) : (
                              <span
                                style={{ fontSize: "16px", fontWeight: "300" }}
                              >
                                Folder content
                              </span>
                            )}
                          </>
                        )}

                        {showAdminFolderdata === true ? (
                          <>
                            <div className="d-flex">
                              <div className="folderCreated">
                                <FolderIcon
                                  onClick={(e) => {
                                    setFolderName("");
                                    setShowAdminShowFolderData(false);
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
                                      {i.name}
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
                      <>
                        {i.folder_id === "0" ? (
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
                        {mainFoldName.length > 0 && folderName.length > 0 ? (
                          <div>
                            <span
                              className="tabHover"
                              style={{ fontSize: "16px", fontWeight: "300" }}
                              onClick={() => {
                                setShowSubFolderData(false);
                                setFolderName("");
                              }}
                            >
                              {`${mainFoldName}`}
                            </span>
                            <span>
                              {`${
                                folderName.length > 0 ? ">" : ""
                              } ${folderName}`}
                            </span>
                          </div>
                        ) : (
                          <>
                            {mainFoldName.length > 0 ||
                            folderName.length > 0 ? (
                              <div>
                                <span
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "300",
                                  }}
                                  onClick={() => {
                                    setShowSubFolderData(false);
                                    setFolderName("");
                                  }}
                                >
                                  {`${mainFoldName}`}
                                </span>
                                <span>
                                  {folderName.length > 0 ? ">" : ""}
                                  {folderName}
                                </span>
                              </div>
                            ) : (
                              <span
                                style={{ fontSize: "16px", fontWeight: "300" }}
                              >
                                Folder content
                              </span>
                            )}
                          </>
                        )}

                        {showClientFolderdata === true ? (
                          <>
                            <div className="d-flex">
                              <div className="folderCreated">
                                <FolderIcon
                                  onClick={(e) => {
                                    setFolderName("");
                                    setShowClientShowFolderData(false);
                                    setClientInnerFiles([]);
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
