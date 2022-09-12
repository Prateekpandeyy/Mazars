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
import CustomHeading from "../../../components/Common/CustomHeading";
function FeedbackTab() {
  const alert = useAlert();
const history = useHistory();
  const userid = window.localStorage.getItem("tpkey");
  const [feedbackData, setFeedBackData] = useState([]);
  const token = window.localStorage.getItem("tptoken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }


  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = () => {
    axios
      .get(`${baseUrl}/tl/getFeedback?tp_id=${JSON.parse(userid)}` , myConfig)
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
        return {width: "10px" };
      },
    },
    {
      text: "Date",
      dataField: "created",
      sort: true,
      headerStyle: () => {
        return {  width: "60px" };
      },
     
    },
    {
      text: "Query no",
      dataField: "assign_no",
      headerStyle: () => {
        return {  width: "40px" };
      },
    },
    {
      text: "Feedback",
      headerStyle: () => {
        return {  width: "150px" };
      },
      formatter: function nameFormatter(cell, row) {
      
        return (
          <>
            <div>
              {
                row.tp_read == "0" ?
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
    formData.append("type", "tp");

    axios({
      method: "POST",
      url: `${baseUrl}/tl/markReadFeedback`,
      headers: {
        uit : token
      },
      data: formData,
    })
      .then(function (response) {
        
        if (response.data.code === 1) {
          // alert.success("successfully read!");
          getFeedback()
         
        }
      })
      .catch((error) => {
        
      });
  };


  return (
    <>
     <Layout TPDashboard="TPDashboard" TPuserId={userid}>
        <Card>
          <CardHeader>
            <Row>
              <Col md="7">
             <CustomHeading>
             Feedback
             </CustomHeading>
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
