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
import PaymentModal from "./PaymentModal";
import CommonServices from "../../../common/common";
import { useHistory } from "react-router";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
function Message(props) {
  
    const alert = useAlert();
const history = useHistory();
    const userId = window.localStorage.getItem("tlkey");
    const [query, setQuery] = useState([]);
    const [data, setData] = useState(null);

    const [addPaymentModal, setPaymentModal] = useState(false);
    const paymentHandler = (key) => {
       
        setPaymentModal(!addPaymentModal);
    };

    useEffect(() => {
        getMessage();
    }, []);


    const getMessage = () => {
        axios
            .get(
                `${baseUrl}/customers/getNotification?id=${JSON.parse(userId)}`
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
                return { width: "50px" };
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
                        {/* <Link to={`/customer/my-assingment/${row.id}`}> */}
                        {row.assign_no}
                        {/* </Link> */}
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
                        <Link to={`/teamleader/view-notification/${row.id}`}>
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
                                        <i class="fa fa-bullseye" style={{ color: "red" }}></i>
                                    </div>
                                    :
                                    <div
                                        style={{ cursor: "pointer",
                                        display :"flex",
                                        justifyContent : "space-between",
                                        wordBreak : "break-word"}}
                                        title="read"
                                    >
                                        <p>{row.message}</p>
                                        <i class="fa fa-bullseye" style={{ color: "green" }}></i>
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
            .get(`${baseUrl}/customers/markReadNotification?id=${id}`)
            .then(function (response) {
                
            })
            .catch((error) => {
              
            });
    };

    return (
        <Layout TLDashboard="TLDashboard" TLuserId={userId}>
            <Card>
            <CardHeader>
          <Row>
          <Col md="4">
          <button
                class="autoWidthBtn" 
                onClick={() => history.goBack()}
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
              
            </Col>
            <Col md="8">
              <h4>Message</h4>
            </Col>
          </Row>
        </CardHeader>
            
                <CardBody style={{display : "flex", height : "80vh", overflowY : "scroll"}}>
                <DataTablepopulated 
                   bgColor="#42566a"
                   keyField= {"assign_no"}
                   data={query}
                   columns={columns}>
                    </DataTablepopulated>
                    <PaymentModal
                        paymentHandler={paymentHandler}
                        addPaymentModal={addPaymentModal}
                    />
                </CardBody>
            </Card>
        </Layout>
    );
}

export default Message;