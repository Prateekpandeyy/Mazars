import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import { useHistory } from "react-router";
// import PaymentModal from "./PaymentModal";
import CommonServices from "../../../common/common";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CustomHeading from "../../../components/Common/CustomHeading";

function Message(props) {
    

    const userId = window.localStorage.getItem("adminkey");
    const [query, setQuery] = useState([]);
    const [data, setData] = useState(null);

const history = useHistory();
    useEffect(() => {
        getMessage();
    }, []);
    const token = window.localStorage.getItem("adminToken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }

    const getMessage = () => {
        axios
            .get(
                `${baseUrl}/admin/getNotification?id=${JSON.parse(userId)}&type_list=all`, myConfig
            )
            .then((res) => {
            
                if (res.data.code === 1) {
                    setQuery(res.data.result);
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
                return { fontSize: "12px", width: "20px" };
            },
        },
       
        {
            text: "Date",
            dataField: "setdate",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px", width: "60px" };
            },
        },
          
        {
            text: "Query No",
            dataField: "assign_no",
            headerStyle: () => {
                return { fontSize: "12px", width: "30px" };
            },
            formatter: function nameFormatter(cell, row) {
             
                return (
                    <>
                        {row.assign_no}

                    </>
                );
            },
        },
        {
            text: "Message",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px", width: "180px" };
            },
            formatter: function nameFormatter(cell, row) {
             
                return (
                    <>
                        <Link to={`/admin/view-notification/${row.id}`}>
                            {
                                row.is_read == "0" ?
                                    <div
                                        style={{
                                            cursor: "pointer",
                                            display : "flex",
                                            justifyContent : "space-between",
                                            wordBreak : "break-word"
                                          
                                        }}
                                        onClick={() => readNotification(row.id)}
                                        title="unread"
                                    >
                                        <p>{row.message}</p>
                                        <i className="fa fa-bullseye" style={{ color: "red" }}></i>
                                    </div>
                                    :
                                    <div
                                        style={{ 
                                            cursor: "pointer",
                                            display :"flex",
                                            justifyContent : "space-between",
                                            wordBreak : "break-word"
                                        }}
                                        title="read"
                                    >
                                        <p>{row.message}</p>
                                        <i className="fa fa-bullseye" style={{ color: "green" }}></i>
                                    </div>
                            }
                        </Link>

                    </>
                );
            },
        },
    ];


    // readnotification
    const readNotification = (id) => {

        
        axios
            .get(`${baseUrl}/admin/markReadNotification?id=${id}`, myConfig)
            .then(function (response) {
              
            })
            .catch((error) => {
                
            });
    };

    return (
        <Layout adminDashboard="adminDashboard" adminUserId={userId}>
            <Card>
            <CardHeader>
          <Row>
          <Col md="4">
          <button
                className="autoWidthBtn" 
                onClick={() => history.goBack()}
              >
               
                Go Back
              </button>
              
            </Col>
            <Col md="8">
            <CustomHeading>
                Message
            </CustomHeading>
            </Col>
          </Row>
        </CardHeader>
                <CardBody>
                <DataTablepopulated 
       bgColor="#42566a"
       keyField= {"assign_no"}
       data={query}
       columns={columns}>
        </DataTablepopulated>
                </CardBody>
            </Card>
        </Layout>
    );
}

export default Message;
