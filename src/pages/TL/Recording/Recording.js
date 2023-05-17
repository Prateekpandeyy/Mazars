import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import RecordingEdit from "./RecordingEdit";
import CloseIcon from "@material-ui/icons/Close";
import ReactPlayer from "react-player";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import RecordingFilter from "../../../components/Search-Filter/RecordingFilter";
import { Link } from "react-router-dom";
import "./recording.css";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 10px",
  },
}));
function Recording() {
  const classes = useStyles();
  const userid = window.localStorage.getItem("tlkey");
  const [feedbackData, setFeedBackData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [videoid, setVideoId] = useState(null);
  const [records, setRecords] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    participant: "",
    editMessage: "",
    assignid: "",
    id: "",
  });

  const [lastDown, setLastDown] = useState("");
  const [countNotification, setCountNotification] = useState("");
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [accend, setAccend] = useState(false);
  const [prev, setPrev] = useState("");


  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState('');
  const [sortField, setSortField] = useState('');
  const [defaultPage, setDefaultPage] = useState(["1"]);
  const openModal = (videoContent) => {
    setIsOpen(true);
    setVideoId(videoContent);
  };

  useEffect(() => {
    getRecording();
  }, []);
  const videoIcon = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getRecording = (e) => {
    axios
      .get(
        `${baseUrl}/tl/callRecordingPostlist?page=${e}&uid=${JSON.parse(userid)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setFeedBackData(res.data.result);
          setRecords(res.data.result.length);
        }
      });
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
  const sortMessage = (e) => {
    console.log("eee", e);
  };
  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("accendtlpay1") === column.dataField ||
      localStorage.getItem("prevtlpay1") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevtlpay1", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("accendtlpay1") === column.dataField ? (
            <ArrowDropUpIcon
              className={isActive === true ? classes.isActive : ""}
            />
          ) : (
            <ArrowDropUpIcon
              className={isActive === true ? classes.isActive : ""}
            />
          )}
        </div>
      </div>
    );
  }
  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "8px", padding: "9px 5px" };
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
          localStorage.setItem("accendtlpay1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlpay1");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "30px" };
      },
    },
    {
      text: "Query No",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px", width: "20px" };
      },
      formatter: function formatter(cell, row) {
        let a = row.assign_id.split("-")[row.assign_id.split("-").length - 1];
        return (
          <>
            <Link
              to={{
                pathname: `/teamleader_queries/${a}`,
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
      headerStyle: () => {
        return { fontSize: "12px", width: "40px" };
      },
      sort: true,
      headerFormatter: headerLabelFormatter,

      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtlpay1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlpay1");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },
      formatter: function formatterName(cell, row) {
        return <p>{row.participants}</p>;
      },
    },

    {
      text: "Summary of Discussion",
      dataField: "message",
      headerStyle: () => {
        return { fontSize: "12px", width: "80px" };
      },
      sort: true,
      headerFormatter: headerLabelFormatter,

      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtlpay1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlpay1");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },
    },
    {
      text: "Action",
      headerStyle: () => {
        return { fontSize: "12px", width: "20px" };
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

  return (
    <>
      <Layout TLDashboard="TLDashboard" TLuserId={userid}>
        <div
          style={{ position: "relative", height: "100vh", overflow: "scroll" }}
        >
          <Card>
            <CardHeader>
              <Row>
                <Col md="7">
                  <CardTitle tag="h4">Recording of Discussion</CardTitle>
                </Col>
                <Col md="5"></Col>
              </Row>
            </CardHeader>
            <CardBody>
              <RecordingFilter
                setData={setFeedBackData}
                //    getData={getInCompleteAssingment}
                SearchQuery="tlQuery"
                setRecords={setRecords}
                records={records}
                userid={userid}
                getRecording={getRecording}
                page={page}
                getData={getRecording}
                big={big}
                end={end}
                setBig={setBig}
                setEnd={setEnd}
                setPage={setPage}
                defaultPage={defaultPage}
                setDefaultPage={setDefaultPage}
                pageValue="tlrecording"
                localAccend="accendtlrecording"
                localPrev="prevtlrecording"
                localSorted="sortedValuetlrecording"
                index="tlrecording"
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
