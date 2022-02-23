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
import { useHistory } from "react-router";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
function FeedbackTab() {
  const alert = useAlert();
const history = useHistory();
  const userid = window.localStorage.getItem("tlkey");
  const [feedbackData, setFeedBackData] = useState([]);

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = () => {
    axios
      .get(`${baseUrl}/customers/getFeedback?tl_id=${JSON.parse(userid)}`)
      .then((res) => {
      
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
        return { fontSize: "12px", width: "10px", border: "1px solid #081f8f", color:"#fff", backgroundColor:"#081f8f" };
      },
    },
    {
      text: "Date",
      dataField: "created",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px", width: "60px" , border: "1px solid #081f8f", color:"#fff", backgroundColor:"#081f8f"};
      },
    
    },
    {
      text: "Query No",
      dataField: "assign_no",
      headerStyle: () => {
        return { fontSize: "12px", width: "40px" , border: "1px solid #081f8f", color:"#fff", backgroundColor:"#081f8f"};
      },
    },
    {
      text: "Feedback",
      headerStyle: () => {
        return { fontSize: "12px", width: "150px" , border: "1px solid #081f8f", color:"#fff", backgroundColor:"#081f8f"};
      },
      formatter: function nameFormatter(cell, row) {
    
        return (
          <>
            <div>
              {
                row.tl_read == "0" ?
                  <div
                    style={{
                      cursor: "pointer", wordBreak : "break-word",
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
                    style={{ cursor: "pointer", wordBreak : "break-word", display: "flex", justifyContent: "space-between" }}
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

  
    let formData = new FormData();
    formData.append("id", id);
    formData.append("type", "tl");

    axios({
      method: "POST",
      url: `${baseUrl}/customers/markReadFeedback`,
      data: formData,
    })
      .then(function (response) {
       
        if (response.data.code === 1) {
          // alert.success("successfully read!");
          getFeedback()
          history.push("/teamleader/feedback")
        }
      })
      .catch((error) => {
       
      });
  };


  return (
    <>
      <Layout TLDashboard="TLDashboard" TLuserId={userid}>
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
          <DataTablepopulated 
                   bgColor="#42566a"
                   keyField= {"assign_no"}
                   data={feedbackData}
                   columns={columns}>
                    </DataTablepopulated>
          </CardBody>
        </Card>
      </Layout>
    </>
  );
}

export default FeedbackTab;
