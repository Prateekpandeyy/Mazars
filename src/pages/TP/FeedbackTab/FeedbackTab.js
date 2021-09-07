import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import CommonServices from "../../../common/common";
import BootstrapTable from "react-bootstrap-table-next";
import { useAlert } from "react-alert";

function FeedbackTab() {
  const alert = useAlert();

  const userid = window.localStorage.getItem("tpkey");
  const [feedbackData, setFeedBackData] = useState([]);

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = () => {
    axios
      .get(`${baseUrl}/customers/getFeedback?tl_id=${JSON.parse(userid)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setFeedBackData(res.data.result);
        }
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
        return { fontSize: "12px", width: "10px" };
      },
    },
    {
      text: "Date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px", width: "60px" };
      },
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return (
          <>
            <div style={{ display: "flex" }}>
              <p>{CommonServices.removeTime(row.created)}</p>
              <p style={{ marginLeft: "15px" }}>{CommonServices.removeDate(row.created)}</p>
            </div>
          </>
        );
      },
    },
    {
      text: "Query No",
      dataField: "assign_no",
      headerStyle: () => {
        return { fontSize: "12px", width: "40px" };
      },
    },
    {
      text: "Feedback",
      headerStyle: () => {
        return { fontSize: "12px", width: "150px" };
      },
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return (
          <>
            <div>
              {
                row.tl_read == "0" ?
                  <div
                    style={{
                      cursor: "pointer",
                      display: "flex", justifyContent: "space-between"
                    }}
                    onClick={() => readNotification(row.id)}
                    title="unread"
                  >
                    <p>{row.feedback}  - By {row.name}</p>
                    <i class="fa fa-bullseye" style={{ color: "red" }}></i>
                  </div>

                  :
                  <div
                    style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}
                    title="read"
                  >
                    <p>{row.feedback}  - By {row.name}</p>
                    <i class="fa fa-bullseye" style={{ color: "green" }}></i>
                  </div>
              }
            </div>
          </>
        );
      },
    },
  ];


  // readnotification
  const readNotification = (id) => {

    console.log("call", id)
    let formData = new FormData();
    formData.append("id", id);
    formData.append("type", "tl");

    axios({
      method: "POST",
      url: `${baseUrl}/customers/markReadFeedback`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response)
        if (response.data.code === 1) {
          // alert.success("successfully read!");
          getFeedback()
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


  return (
    <>
     <Layout TPDashboard="TPDashboard" TPuserId={userid}>
        <Card>
          <CardHeader>
            <Row>
              <Col md="7">
                <CardTitle tag="h4">Feedback</CardTitle>
              </Col>
              <Col md="5"></Col>
            </Row>
          </CardHeader>
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
      </Layout>
    </>
  );
}

export default FeedbackTab;
