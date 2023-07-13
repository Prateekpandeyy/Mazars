import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import axios from "axios";
import ShowError from "../../components/LoadingTime/LoadingTime"
import { baseUrl } from "../../config/config";
import BootstrapTable from "react-bootstrap-table-next";
import ReactPlayer from "react-player";
import CloseIcon from "@material-ui/icons/Close";
import MainText from "../Common/MainText";

function QueryRecording(assingNo) {
  // const userid = window.localStorage.getItem("tlkey");
  const [feedbackData, setFeedBackData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [videoid, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    var confToken = "";
    let apipath = "";
    if (window.location.pathname.split("/")[1] === "teamleader_queries") {
      apipath = "tl";
      confToken = window.localStorage.getItem("tlToken");
    } else if (
      window.location.pathname.split("/")[1] === "taxprofessional_queries"
    ) {
      confToken = window.localStorage.getItem("tptoken");
      apipath = "tl";
    } else if (window.location.pathname.split("/")[1] === "admin_queries") {
      confToken = window.localStorage.getItem("adminToken");
      apipath = "admin";
    }
    const myConfig = {
      headers: {
        uit: confToken,
      },
    };
    axios
      .get(
        `${baseUrl}/${apipath}/callRecordingPostlist?assign_id=${assingNo.assingNo}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setFeedBackData(res.data.result);
        }
      }).catch((error) => {
        ShowError.LoadingError(setLoading);
      });
  };

  const columns = [
    {
      text: "S.no",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { width: "8px", padding: "9px 5px" };
      },
    },
    {
      text: "Date",
      sort: true,
      dataField: "created_date",
      headerStyle: () => {
        return { width: "30px" };
      },
    },
    {
      text: "Query no",
      dataField: "assign_id",
      headerStyle: () => {
        return { width: "20px" };
      },
    },

    {
      text: "Participants",
      dataField: "participants",
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
        return { fontSize: "12px", width: "20px" };
      },
      formatter: function nameFormatter(cell, row) {
        var recording = row.file.split(",");
        let a = 1;
        return (
          <>
            <div>
              {recording.map((record) => {
                return (
                  <>
                    <p style={videoIcon}>
                      <span>{a++}</span>
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
    <div className="queryBox">
      <Card>
        <Row>
          <Col md="12">
            <MainText align="center">Recording of discussion</MainText>
          </Col>
        </Row>

        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={feedbackData}
            columns={columns}
            rowIndex
          />
        </CardBody>
      </Card>
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
    </div>
  );
}

export default QueryRecording;
