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

function Recording() {
  const getId = useParams();
  const userid = window.localStorage.getItem("adminkey");
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
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
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
  const getRecording = () => {
    axios
      .get(
        `${baseUrl}/admin/callRecordingPostlist?uid=${JSON.parse(userid)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setFeedBackData(res.data.result);
          setRecords(res.data.result.length);
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
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Date",
      sort: true,
      dataField: "created_date",
    },
    {
      text: "Query No",
      dataField: "",

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
            />
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
