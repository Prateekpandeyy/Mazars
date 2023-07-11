import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import RecordingFilter from "../../../components/Search-Filter/RecordingFilter";
import RecordingEdit from "./RecordingEdit";
import "./recording.css";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
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
  const getId = useParams();
  const userid = window.localStorage.getItem("adminkey");
  const [feedbackData, setFeedBackData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [videoid, setVideoId] = useState(null);
  const [records, setRecords] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [prev, setPrev] = useState("");
  const [accend, setAccend] = useState(false);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const [editData, setEditData] = useState({
    participant: "",
    editMessage: "",
    assignid: "",
    id: "",
  });
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    let localPage = Number(localStorage.getItem("adminRecording"));
    if (!localPage) {
      localPage = 1;
    }
    let sortVal = JSON.parse(localStorage.getItem("sortedrecording"));
    setPrev(localStorage.getItem("prevrecord"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("sortedRecording", JSON.stringify(sort));
    }
    setAccend(localStorage.getItem("recordingData"));
    setPage(localPage);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    getRecording(localPage);
  }, []);
  function headerLabelFormatter(column, colIndex) {
    let isActive = null;

    if (
      localStorage.getItem("accendrecording") === column.dataField ||
      localStorage.getItem("prevrecord") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevrecord", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("accendrecording") === column.dataField ? (
            <ArrowDropDownIcon
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
  const openModal = (videoContent) => {
    setIsOpen(true);
    setVideoId(videoContent);
  };

  useEffect(() => {
    let localPage = Number(localStorage.getItem("adminRecording"));
    if (!localPage) {
      localPage = 1;
    }
    setAccend(localStorage.getItem("accendrecording"));
    let sortVal = JSON.parse(localStorage.getItem("sortedValuepay1"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("sortedValuePay1", JSON.stringify(sort));
    }
    setPage(localPage);

    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    getRecording(localPage);
  }, []);
  const videoIcon = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getRecording(1);
    localStorage.setItem("adminRecording", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getRecording(page - 1);
    localStorage.setItem("adminRecording", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    getRecording(page + 1);
    localStorage.setItem("adminRecording", Number(page) + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getRecording(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("adminRecording", defaultPage.at(-1));
  };
  const getRecording = (e) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    let sortVal = JSON.parse(localStorage.getItem("sortedRecording"));
    let orderBy = 0;
    let fieldBy = 0;

    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let remainApiPath = "";
    let searchData = JSON.parse(localStorage.getItem(`recordingData`));

    if (searchData?.queryNo) {
      remainApiPath = `admin/callRecordingPostlist?uid=${JSON.parse(
        userid
      )}&page=${e}&assign_id=${searchData.queryNo}`;
    } else {
      remainApiPath = `admin/callRecordingPostlist?uid=${JSON.parse(
        userid
      )}&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    }
    if (e) {
      axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
        let droppage = [];
        if (res.data.code === 1) {
          let data = res.data.result;
          setRecords(res.data.total);
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
          setCountNotification(res.data.total);
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
        }
        // if (res.data.code === 1) {
        //   setFeedBackData(res.data.result);
        //   setRecords(res.data.result.length);
        // }
      });
    }
  };
  const sortMessage = (val, field) => {
    let remainApiPath = "";

    let sort = {
      orderBy: val,
      fieldBy: field,
    };
    localStorage.setItem("adminRecording", 1);
    localStorage.setItem("sortedRecording", JSON.stringify(sort));
    let searchData = JSON.parse(localStorage.getItem(`recordingData`));
    if (searchData) {
      remainApiPath = `admin/callRecordingPostlist?uid=${JSON.parse(
        userid
      )}&assign_id=${searchData.queryNo}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `admin/callRecordingPostlist?uid=${JSON.parse(
        userid
      )}&orderby=${val}&orderbyfield=${field}`;
    }
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        setPage(1);
        setBig(1);
        setEnd(Number(localStorage.getItem("admin_record_per_page")));
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

        setFeedBackData(all);
      }
    });
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

  const columns = [
    {
      text: "S.No",
      dataField: "cid",

      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Date",
      sort: true,
      dataField: "created_date",
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendrecording", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendrecording");
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
      text: "Query No",
      dataField: "assign_id",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendrecording", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendrecording");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }

        sortMessage(val, 2);
      },
      formatter: function formatter(cell, row) {
        let a = row.assign_id.split("-")[row.assign_id.split("-").length - 1];
        return (
          <>
            <Link
              to={{
                pathname: `/admin_queries/${a}`,
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
    },

    {
      text: "Summary of discussion",
      dataField: "message",
    },
    {
      text: "Action",

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

    // localStorage.removeItem("adminpayt3");
    // localStorage.removeItem("sortedValuepay3");
    // localStorage.removeItem("accendpay3");
    // localStorage.removeItem("prevpay3");
    localStorage.removeItem("sortedrecording");
    localStorage.removeItem("accendrecording");
    localStorage.removeItem("adminRecording");
    localStorage.removeItem("prevrecord");
    localStorage.removeItem("recordingData");
    getRecording(1);
  };
  return (
    <>
      <Layout adminDashboard="adminDashboard" adminUserId={userid}>
        <Card>
          <CardHeader>
            <Row>
              <Col md="7">
                <CardTitle tag="h4">Recording of discussion</CardTitle>
              </Col>
              <Col md="5"></Col>
            </Row>
          </CardHeader>
          <CardBody>
            <RecordingFilter
              setData={setFeedBackData}
              SearchQuery="adminQuery"
              setRecords={setRecords}
              records={records}
              userid={userid}
              getRecording={getRecording}
              setDefaultPage={setDefaultPage}
              resetPaging={resetPaging}
              big={big}
              end={end}
              setBig={setBig}
              setEnd={setEnd}
              setPage={setPage}
              defaultPage={defaultPage}
              setCountNotification={setCountNotification}
              countNotification={countNotification}
              page={page}
            />
            {/* <Row>
              <Col md="12" align="right">
                <div className="customPagination">
                  <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                    <span className="customPaginationSpan">
                      {big}-{end} of {countNotification}
                    </span>
                    <span className="d-flex">
                      {page > 1 ? (
                        <>
                          <button
                            className="navButton"
                            onClick={(e) => firstChunk()}
                          >
                            <KeyboardDoubleArrowLeftIcon />
                          </button>
                          <button
                            className="navButton"
                            onClick={(e) => prevChunk()}
                          >
                            <KeyboardArrowLeftIcon />
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                      <div className="navButtonSelectDiv">
                        <select
                          value={page}
                          onChange={(e) => {
                            setPage(Number(e.target.value));
                            getRecording(Number(e.target.value));
                            localStorage.setItem(
                              "adminRecording",
                              Number(e.target.value)
                            );
                          }}
                          className="form-control"
                        >
                          {defaultPage.map((i) => (
                            <option value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                      {defaultPage.length > page ? (
                        <>
                          <button
                            className="navButton"
                            onClick={(e) => nextChunk()}
                          >
                            <KeyboardArrowRightIcon />
                          </button>
                          <button
                            className="navButton"
                            onClick={(e) => lastChunk()}
                          >
                            <KeyboardDoubleArrowRightIcon />
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </div>
              </Col>
            </Row> */}
            <DataTablepopulated
              bgColor="#42566a"
              keyField={"assign_no"}
              data={feedbackData}
              columns={columns}
            ></DataTablepopulated>
          </CardBody>
        </Card>

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
