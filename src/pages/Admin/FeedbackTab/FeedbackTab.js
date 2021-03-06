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
import BootstrapTable from "react-bootstrap-table-next";
// import FeedbackService from "../../../config/services/QueryDetails";
import CommonServices from "../../../common/common";
import { useAlert } from "react-alert";
import { useHistory } from "react-router";

function FeedbackTab() {
  const alert = useAlert();
  const history = useHistory();
  const userid = window.localStorage.getItem("adminkey");
  const [feedbackData, setFeedBackData] = useState([]);
  const [feedbackNumber, setfeedbackNumber] = useState();
  useEffect(() => {
    getFeedback();
  }, [userid]);

  const getFeedback = () => {
    axios.get(`${baseUrl}/customers/getFeedback`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setFeedBackData(res.data.result);
       if(res.data.result != undefined){
         setfeedbackNumber(res.data.result.length)
       }
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
      dataField: "created",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px", width: "60px" };
      },
     
    },

    {
      text: "Query No",
      dataField: "assign_no",
      headerStyle: () => {
        return { fontSize: "12px", width: "40px" };
      },
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return <>{row.assign_no}</>;
      },
    },
    {
      text: "Feedback",
      dataField: "feedback",
   
      headerStyle: () => {
        return { fontSize: "12px", width: "150px" };
      },
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return (
          <>
            <div>
              {
                row.admin_read == "0" ?
                  <div
                    style={{
                      cursor: "pointer",
                      display: "flex", justifyContent: "space-between"
                    }}
                   
                    title="unread"
                  >
                    <p  onClick={() => readNotification(row.id)}>{row.feedback}  - By {row.name}</p>
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
    formData.append("type", "admin");

    axios({
      method: "POST",
      url: `${baseUrl}/customers/markReadFeedback`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response)
        if (response.data.code === 1) {
       
          getFeedback();
          history.push("/admin/feedback")
        }
    
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <>
      <Layout adminDashboard="adminDashboard" adminUserId={userid} feedbackNumber = {feedbackNumber}>
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
