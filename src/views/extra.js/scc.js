import * as React from "react";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
  Resources,
  EditRecurrenceMenu,
} from "@devexpress/dx-react-scheduler-material-ui";


import axios from "axios";
import { baseUrl } from "../../config/config";

const userId = window.localStorage.getItem("userid");

const getData = (setData, setLoading) => {
  axios
    .get(
      `${baseUrl}/customers/videoScheduler?customer_id=${JSON.parse(userId)}`
    )
    .then((res) => {
      console.log("res -", res);
      console.log("result -", res.data.result.items);
      setData(res.data.result.items);
      setLoading(false);
    });
};

const styles = {
  toolbarRoot: {
    position: "relative",
  },
  progress: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
  },
};

const ToolbarWithLoading = withStyles(styles, { name: "Toolbar" })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  )
);

const mapAppointmentData = (appointment) => ({
  id: appointment.id,
  startDate: appointment.start,
  endDate: appointment.end,
  title: appointment.title,
  gg: appointment.summary,
  question_id: appointment.question_id,
  summary: appointment.summary,
});

var date = new Date();
console.log("date-", convert(date));

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

const initialState = {
  data: [],
  loading: false,
  currentDate: convert(date),
  currentViewName: "Day",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setData":
      return { ...state, data: action.payload.map(mapAppointmentData) };
    case "setCurrentViewName":
      return { ...state, currentViewName: action.payload };
    case "setCurrentDate":
      return { ...state, currentDate: action.payload };
    default:
      return state;
  }
};

export default () => {
  const [assignmentdata, setAssignmentData] = React.useState([]);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { data, loading, currentViewName, currentDate } = state;

  const setCurrentViewName = React.useCallback(
    (nextViewName) =>
      dispatch({
        type: "setCurrentViewName",
        payload: nextViewName,
      }),
    [dispatch]
  );

  const setCurrentDate = React.useCallback(
    (nextDate) =>
      dispatch({
        type: "setCurrentDate",
        payload: nextDate,
      }),
    [dispatch]
  );

  const setData = React.useCallback(
    (nextData) =>
      dispatch({
        type: "setData",
        payload: nextData,
      }),
    [dispatch]
  );

  const setLoading = React.useCallback(
    (nextLoading) =>
      dispatch({
        type: "setLoading",
        payload: nextLoading,
      }),
    [dispatch]
  );

  const changeFormat = (d) => {
    console.log(d);
    return (
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getDate() +
      " " +
      d.toString().split(" ")[4]
    );
  };
  
  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      console.log("added - ", added);
      var startDate = added.startDate;
      var endDate = added.endDate;

      let formData = new FormData();
      formData.append("customer_id", JSON.parse(userId));
      formData.append("question_id", added.question_id);
      formData.append("time", changeFormat(startDate));
      formData.append("endtime", changeFormat(endDate));
      formData.append("title", added.title);
      formData.append("notes", added.notes);
      axios({
        method: "POST",
        url: `${baseUrl}/customers/PostCallSchedule`,
        data: formData,
      })
        .then(function (response) {
          console.log("res post-", response);
          getData(setData, setLoading);
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }

    if (changed) {
      console.log("changed", changed);

      let valuesArray = Object.entries(changed);
      const obj = {
        id: "",
        title: "",
        notes: "",
        startDate: "",
        endDate: "",
        question_id: "",
      };

      for (let value of valuesArray) {
        // console.log("value", value);
        obj.id = value[0];
        obj.title = value[1].title;
        obj.notes = value[1].notes;
        obj.question_id = value[1].question_id;
        obj.startDate = value[1].startDate;
        obj.endDate = value[1].endDate;
      }

      let formData = new FormData();
      formData.append("customer_id", JSON.parse(userId));
      formData.append("question_id", obj.question_id);
      formData.append("id", obj.id);
      formData.append("time", obj.startDate);
      formData.append("endtime", obj.endDate);
      formData.append("title", obj.title);
      formData.append("notes", obj.notes);

      axios({
        method: "POST",
        url: `${baseUrl}/customers/PostCallSchedule`,
        data: formData,
      })
        .then(function (response) {
          console.log("res post-", response);
          getData(setData, setLoading);
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }

    // if (deleted !== undefined) {
    //   console.log("deleted f", deleted);
    //   axios.get(`${baseUrl}/customers/freeslot?id=${deleted}`).then((res) => {
    //     console.log("res -", res);
    //     getData(setData, setLoading);
    //   });
    // }
  };

  React.useEffect(() => {
    getData(setData, setLoading);
    getAssignmentNo();
  }, [setData, currentViewName, currentDate]);

  const getAssignmentNo = () => {
    axios
      .get(
        `${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          var data = res.data.result;
          const newArrayOfObj = data.map(({ assign_no: text, ...rest }) => ({
            text,
            ...rest,
          }));
          console.log("dt--", newArrayOfObj);
          setAssignmentData(newArrayOfObj);
        }
      });
  };

  const resources = [
    {
      fieldName: "question_id",
      title: "Assignment No",
      instances: assignmentdata,
    },
  ];

  return (
    <Paper>
      <Scheduler data={data} height={660}>
        <ViewState
          currentDate={currentDate}
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
          onCurrentDateChange={setCurrentDate}
        />
        <EditingState onCommitChanges={commitChanges} />
        <EditRecurrenceMenu />

        <IntegratedEditing />
        <DayView startDayHour={10} endDayHour={24} />
        <WeekView startDayHour={7.5} endDayHour={17.5} />
        <Appointments />
        <Toolbar
          {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
        />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />

        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />

        <Resources data={resources} />
      </Scheduler>
    </Paper>
  );
};
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
import { FileIcon } from "../Common/MessageIcon";

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
  const [clientSubFold, setClientSubFold] = useState(false);
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
    setClientSubFold(false);
    setClientSubFolder(e.child);
    setColor(e.id);
    let kk = [];
    setClientSubFold(false);
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
          setClientSubFold(true);
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
          html: res.data.message,
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
                              <span
                                onContextMenu={(e) => handleFile(e, i, true)}
                                onClick={(e) =>
                                  rightClick(e, i.assign_no, i.id, i.document)
                                }
                              >
                                <FileIcon
                                  name={i.document}
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
                              </span>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        {i.customer_files !== null &&
                        i.customer_files_folder === "0" ? (
                          <div className="folderCreated">
                            <span
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
                            >
                              <FileIcon
                                name={i.customer_files}
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
                              onClick={(e) => {
                                setShowSubFolderData(false);
                                setFolderName("");
                              }}
                            >
                              {`${mainFoldName}`}
                            </span>
                            <span>
                              {`${
                                folderName.length > 0 ? " > " : ""
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
                                  onClick={(e) => {
                                    setShowSubFolderData(false);
                                    setFolderName("");
                                  }}
                                >
                                  {`${mainFoldName}`}
                                </span>
                                <span>
                                  {folderName.length > 0 ? " > " : ""}
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
                            <div className="d-flex flex-wrap">
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
                                      name={i.document}
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
                                  </span>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="d-flex flex-wrap">
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
                                    <span
                                      onContextMenu={(e) =>
                                        handleFile(e, i, false)
                                      }
                                      onClick={(e) =>
                                        rightClick(e, i.assign_no, i.id, i.name)
                                      }
                                    >
                                      <FileIcon
                                        style={{
                                          fontSize: "50px",
                                          color: "#0000ff",
                                          cursor: "pointer",
                                        }}
                                        name={i.document}
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
                                    </span>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {color === i.customer_files_folder ? (
                                  <div className="folderCreated">
                                    <span
                                      onContextMenu={(e) =>
                                        handleFile(e, i, false, "clientFiles")
                                      }
                                      onClick={(e) =>
                                        rightClick(e, i.assign_no, i.id, i.name)
                                      }
                                    >
                                      <FileIcon
                                        name={i.customer_files}
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
                            <span
                              onClick={(e) =>
                                rightClick(e, i.assign_no, i.id, i.name)
                              }
                            >
                              <FileIcon
                                name={i.document}
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
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                        {i.customer_files !== null &&
                        i.customer_files_folder === "0" ? (
                          <>
                            <span
                              onClick={(e) =>
                                rightClick(e, i.assign_no, i.id, i.name)
                              }
                            >
                              <FileIcon
                                name={i.customer_files}
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
                          <div>
                            <span
                              className="tabHover"
                              style={{ fontSize: "16px", fontWeight: "300" }}
                              onClick={(e) => {
                                setShowAdSubFolder(false);
                                setAdminInnerFiles([]);
                                setFolderName("");
                              }}
                            >
                              {`${mainFoldName}`}
                            </span>
                            <span>
                              {`${
                                folderName.length > 0 ? " > " : ""
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
                                  onClick={(e) => {
                                    setShowAdSubFolder(false);
                                    setAdminInnerFiles([]);
                                    setFolderName("");
                                  }}
                                >
                                  {`${mainFoldName}`}
                                </span>
                                <span>
                                  {folderName.length > 0 ? " > " : ""}
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

                        {adSubFolder === true ? (
                          <>
                            <div className="d-flex flex-wrap">
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
                                    <span
                                      onClick={(e) =>
                                        rightClick(e, i.assign_no, i.id, i.name)
                                      }
                                    >
                                      <FileIcon
                                        name={i.document}
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
                                    </span>
                                  </div>
                                </>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="d-flex flex-wrap">
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
                                    <span
                                      onClick={(e) =>
                                        rightClick(e, i.assign_no, i.id, i.name)
                                      }
                                    >
                                      <FileIcon
                                        name={i.document}
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
                                    </span>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {color === i.customer_files_folder ? (
                                  <div className="folderCreated">
                                    <span
                                      onClick={(e) =>
                                        rightClick(e, i.assign_no, i.id, i.name)
                                      }
                                    >
                                      <FileIcon
                                        name={i.customer_files}
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
                            <span
                              onClick={(e) =>
                                rightClick(e, i.assign_no, i.id, i.name)
                              }
                            >
                              <FileIcon
                                name={i.document}
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
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                        {i.customer_files !== null &&
                        i.customer_files_folder === "0" ? (
                          <>
                            <span
                              onClick={(e) =>
                                rightClick(e, i.assign_no, i.id, i.name)
                              }
                            >
                              <FileIcon
                                name={i.customer_files}
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
                          <div>
                            <span
                              className="tabHover"
                              style={{ fontSize: "16px", fontWeight: "300" }}
                              onClick={() => {
                                setClientInnerFiles([]);
                                setFolderName("");
                                setClientSubFold(false);
                              }}
                            >
                              {`${mainFoldName}`}
                            </span>
                            <span>
                              {`${
                                folderName.length > 0 ? " > " : ""
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
                                    setClientInnerFiles([]);
                                    setFolderName("");
                                    setClientSubFold(false);
                                  }}
                                >
                                  {`${mainFoldName}`}
                                </span>
                                <span>
                                  {folderName.length > 0 ? " > " : ""}
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

                        {clientSubFold === true ? (
                          <>
                            <div className="d-flex flex-wrap">
                              <div className="folderCreated">
                                <FolderIcon
                                  onClick={(e) => {
                                    setClientInnerFiles([]);
                                    setFolderName("");
                                    setClientSubFold(false);
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
                                    <span
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
                          </>
                        ) : (
                          <div className="d-flex flex-wrap">
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
                                {color === i.folder_id ? (
                                  <div className="folderCreated">
                                    <span
                                      onClick={(e) =>
                                        rightClick(e, i.assign_no, i.id, i.name)
                                      }
                                    >
                                      <FileIcon
                                        name={i.document}
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
                                    </span>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {color === i.customer_files_folder ? (
                                  <div className="folderCreated">
                                    <span
                                      onClick={(e) =>
                                        rightClick(e, i.assign_no, i.id, i.name)
                                      }
                                    >
                                      <FileIcon
                                        name={i.customer_files}
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
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AssignmentDetails;
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
// import FolderWrapper from "../FolderWrapper/FolderWrapper";
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
                                folderName.length > 0 ? " > " : ""
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
                                  {folderName.length > 0 ? " > " : ""}
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
                            <div className="d-flex flex-wrap">
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
                          <div className="d-flex flex-wrap">
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
