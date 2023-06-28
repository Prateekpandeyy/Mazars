import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import RecordingEdit from "./RecordingEdit";
import ReactPlayer from "react-player";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import { baseUrl } from "../../../config/config";
import RecordingFilter from "../../../components/Search-Filter/RecordingFilter";
import { Link } from "react-router-dom";
import "./recording.css";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CustomHeading from "../../../components/Common/CustomHeading";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));

function Recording() {
  const userid = window.localStorage.getItem("tpkey");
  const [feedbackData, setFeedBackData] = useState([]);
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [videoid, setVideoId] = useState(null);
  const [records, setRecords] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);

  const [lastDown, setLastDown] = useState("");
  const [countNotification, setCountNotification] = useState("");
  const [defaultPage, setDefaultPage] = useState(["1"]);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [accend, setAccend] = useState(false);
  const [prev, setPrev] = useState("");


  const [editData, setEditData] = useState({
    participant: "",
    editMessage: "",
    assignid: "",
    id: "",
  });
  const openModal = (videoContent) => {
    setIsOpen(true);
    setVideoId(videoContent);
  };

  useEffect(() => {
    // getRecording(1);
    let localPage = Number(localStorage.getItem("tprecordingData"));
    if (!localPage) {
      localPage = 1;
    }
    let sortVal = JSON.parse(localStorage.getItem("recordingSorttp"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("recordingSorttp", JSON.stringify(sort));
    }
    setPage(localPage);
    setEnd(Number(localStorage.getItem("tp_record_per_page")));
    getRecording(localPage);
  }, []);
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getRecording = (e) => {
    let allEnd = Number(localStorage.getItem("tp_record_per_page"));
    let droppage = [];
    let sortVal = JSON.parse(localStorage.getItem("recordingSorttp"));
    let orderBy = 0;
    let fieldBy = 0;
    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let remainApiPath = "";
    let searchData = JSON.parse(localStorage.getItem(`searchDatatpQuery`));
    if (searchData) {
      remainApiPath = `tl/callRecordingPostlist?uid=${JSON.parse(
        userid
      )}&page=${e}&assign_id=${
        searchData.queryNo
      }&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    } else {
      remainApiPath = `tl/callRecordingPostlist?uid=${JSON.parse(
        userid
      )}&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    }

    axios
      .get(
        `${baseUrl}/${remainApiPath}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let data = res.data.result;
          setPage(e);
          let all = [];
          let customId = 1;
          if (e > 1) {
            customId = allEnd * (e - 1) + 1;
          }
          data.map((i) => {
            let data = {
              ...i,
              cid: customId,
            };
            customId++;
            all.push(data);
          });
          setFeedBackData(all);
          let end = e * allEnd;

          if (end > res.data.total) {
            end = res.data.total;
          }
          let dynamicPage = Math.ceil(res.data.total / allEnd);

          let rem = (e - 1) * allEnd;

          if (e === 1) {
            setBig(rem + e);
            setEnd(end);
          } else {
            setBig(rem + 1);
            setEnd(end);
          }
          for (let i = 1; i <= dynamicPage; i++) {
            droppage.push(i);
          }
          setDefaultPage(droppage);
          setRecords(res.data.total);
          setCountNotification(res.data.total);
        }
      });
  };
  const videoIcon = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };
  const modalBox = {
    display: "flex",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "auto",
    flexDirection: "column",
  };
  const canBtn = {
    display: "flex",
    width: "50vw",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: "20px",
    cursor: "pointer",
    color: "red",
  };
  const editRecording = (participants, assign_id, message, id) => {
    setShowEditModal(!showEditModal);
    setEditData({
      participant: participants,
      editMessage: message,
      assignid: assign_id,
      id: id,
    });
  };

  const sortMessage = (val, field) => {
    let sort = {
      orderBy: val,
      fieldBy: field,
    };

    localStorage.setItem("recordingSorttp", JSON.stringify(sort));

    let queryNo = JSON.parse(localStorage.getItem(`searchDatatpQuery`));
    // console.log(queryNo,"searchdata");
    let remainApiPath = "";
    if (queryNo) {
      remainApiPath = `tl/callRecordingPostlist?id=${JSON.parse(
        userid
      )}&assign_id=${queryNo.queryNo}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `tl/callRecordingPostlist?id=${JSON.parse(
        userid
      )}&orderby=${val}&orderbyfield=${field}`;
    }
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        setPage(1);
        setBig(1);

        let all = [];
        let sortId = 1;

        res.data.result.map((i) => {
          let data = {
            ...i,
            cid: sortId,
          };
          sortId++;
          all.push(data);
        });
        if (
          Number(all.length) <
          Number(localStorage.getItem("tp_record_per_page"))
        ) {
          setEnd(all.length);
        } else {
          setEnd(Number(localStorage.getItem("tp_record_per_page")));
        }
        setFeedBackData(all);
        setCountNotification(res.data.total);
      }
    });
  };
  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (localStorage.getItem("accendtprec") === column.dataField) {
      isActive = true;
      setPrev(column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("accendtprec") === column.dataField ? (
            <ArrowDropUpIcon
              className={isActive === true ? classes.isActive : ""}
            />
          ) : (
            < ArrowDropDownIcon
              className={isActive === true ? classes.isActive : ""}
            />
          )}
        </div>
      </div>
    );
  }

  const columns = [
    {
      text: "S.no",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return row.cid;
      },
      headerStyle: () => {
        return { width: "8px", padding: "9px 5px" };
      },
    },
    {
      text: "Date",
      dataField: "created_date",
      sort: true,
      headerFormatter: headerLabelFormatter,

      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtprec", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtprec");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },
      headerStyle: () => {
        return { width: "30px" };
      },
    },
    {
      text: "Query no",
      dataField: "",
      headerStyle: () => {
        return { width: "20px" };
      },
      formatter: function formatter(cell, row) {
        let a = row.assign_id.split("-")[row.assign_id.split("-").length - 1];
        return (
          <>
            <Link
              to={{
                pathname: `/taxprofessional_queries/${a}`,
                routes: "recording",
              }}
            >
              {row.assign_id}
            </Link>
          </>
        );
      },
    },

    {
      text: "Participants",
      dataField: "participants",
      sort: true,
      headerFormatter: headerLabelFormatter,

      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtprec", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtprec");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 3);
      },
      
      headerStyle: () => {
        return { width: "40px" };
      },
    },

    {
      text: "Summary of discussion",
      dataField: "message",
      headerStyle: () => {
        return { width: "80px" };
      },
    },
    {
      text: "Action",
      headerStyle: () => {
        return { width: "20px" };
      },
      formatter: function nameFormatter(cell, row) {
        var recording = row.file.split(",");
        let a = 1;
        return (
          <>
            <div>
              {row.record_by === JSON.parse(userid) && row.message === null ? (
                <i
                  className="fa fa-edit"
                  style={{
                    fontSize: 18,
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}
                  onClick={() =>
                    editRecording(
                      row.participants,
                      row.assign_id,
                      row.message,
                      row.id
                    )
                  }
                ></i>
              ) : (
                ""
              )}
            </div>
            <div>
              {recording.map((record) => {
                return (
                  <>
                    <p style={videoIcon}>
                      {record.length === 0 ? (
                        ""
                      ) : (
                        <>
                          <span>{a++}</span>{" "}
                          <i
                            className="material-icons"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontSize: "25px",
                            }}
                            onClick={() => openModal(record)}
                          >
                            play_circle_outline
                          </i>
                        </>
                      )}
                    </p>
                  </>
                );
              })}
            </div>
          </>
        );
      },
    },
  ];

  const resetPaging = () => {
    setPage(1);
    setBig(1);
    localStorage.removeItem("tprecording");
    localStorage.removeItem("accendtprecording");
    localStorage.removeItem("accendtprec");
    localStorage.removeItem("prevtprecording");
    localStorage.removeItem("recordingSorttp");
    getRecording(1);
  };

  return (
    <>
      <Layout TPDashboard="TPDashboard" TPuserId={userid}>
        <div
          style={{ position: "relative", height: "100vh", overflow: "scroll" }}
        >
          <Card>
            <CardHeader>
              <Row>
                <Col md="7">
                  <CustomHeading>Recording of Discussion</CustomHeading>
                </Col>
                <Col md="5"></Col>
              </Row>
            </CardHeader>
            <CardBody>
              <RecordingFilter
                setData={setFeedBackData}
                getData={getRecording}
                SearchQuery="tpQuery"
                setRecords={setRecords}
                records={records}
                userid={userid}
                getRecording={getRecording}
                page={page}
                big={big}
                end={end}
                setBig={setBig}
                setEnd={setEnd}
                setPage={setPage}
                defaultPage={defaultPage}
                setDefaultPage={setDefaultPage}
                countNotification={countNotification}
                setCountNotification={setCountNotification}
                resetPaging={resetPaging}
                pageValue="tprecording"
                localAccend="accendtprecording"
                localPrev="prevtprecording"
                localSorted="recordingSorttp"
                index="tprecording"
              />
              <DataTablepopulated
                bgColor="#42566a"
                keyField={"assign_no"}
                data={feedbackData}
                columns={columns}
              ></DataTablepopulated>
            </CardBody>
          </Card>
        </div>

        <RecordingEdit
          isOpen={showEditModal}
          recordingHandler={editRecording}
          participants={editData.participant}
          message={editData.editMessage}
          assignid={editData.assignid}
          editId={editData.id}
          recList={getRecording}
        />
        {isOpen === true ? (
          <div className="modalBox">
            <div className="boxContainer">
              <div className="canBtn" title="cancel">
                <h4>Recording Player</h4>
                <CloseIcon onClick={() => setIsOpen(false)} id="myBtn" />{" "}
              </div>

              <div className="my2">
                <ReactPlayer
                  url={videoid}
                  controls={true}
                  playing={true}
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </Layout>
    </>
  );
}

export default Recording;
