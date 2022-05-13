import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
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
import CommonServices from "../../common/common";
import { useHistory } from "react-router";

function Message(props) {
    

    const userId = window.localStorage.getItem("userid");
    const [query, setQuery] = useState([]);
    const [data, setData] = useState(null);

    const [addPaymentModal, setPaymentModal] = useState(false);
    let history = useHistory();
    const token = window.localStorage.getItem("clientToken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
    const paymentHandler = (key) => {
      
        setPaymentModal(!addPaymentModal);
    };

  


    useEffect(() => {
        getMessage();
    }, []);


    const getMessage = () => {
        axios
            .get(
                `${baseUrl}/customers/getNotification?id=${JSON.parse(userId)}
                &type_list=all`, myConfig
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
          
            formatter: (cellContent, row, rowIndex) => {
                return rowIndex + 1;
            },
            headerStyle: () => {
                return { fontSize: "12px", width: "10px" , backgroundColor: "rgb(61, 131, 117)", color: "#fff", border: "1px solid rgb(61, 131, 117)"};
            },
        },
        
 {
    text: "Date",
    dataField: "setdate",
    sort: true,
    headerStyle: () => {
        return { fontSize: "12px", width: "60px",  backgroundColor: "rgb(61, 131, 117)", color: "#fff", border: "1px solid rgb(61, 131, 117)" };
    },

},
        {
            text: "Query No",
            dataField: "assign_no",      
            headerStyle: () => {
                return { fontSize: "12px", width: "30px" ,  backgroundColor: "rgb(61, 131, 117)", color: "#fff", border: "1px solid rgb(61, 131, 117)"};
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
            headerStyle: () => {
                return { fontSize: "12px", width: "180px",  backgroundColor: "rgb(61, 131, 117)", color: "#fff", border: "1px solid rgb(61, 131, 117)" };
            },
            formatter: function nameFormatter(cell, row) {
               
                return (
                    <>
                        <Link to={`/customer/view-notification/${row.id}`}>
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
                                        style={{
                                            cursor: "pointer",
                                            display :"flex",
                                            justifyContent : "space-between",
                                            wordBreak : "break-word"
                                        }}
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
            .get(`${baseUrl}/customers/markReadNotification?id=${id}`, myConfig)
            .then(function (response) {
               
            })
            .catch((error) => {
                
            });
    };


    return (
        <Layout custDashboard="custDashboard" custUserId={userId}>
            <Card>
                
                {/* <CardHeader>
                    <Row>
                        <Col md="9">
                            <CardTitle tag="h4">Message</CardTitle>
                        </Col>
                        <Col md="3">
                        <button
                class="btn btn-success ml-auto" style={{float : "right"}}
                onClick={() => history.goBack()}
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
                        </Col>
                    </Row>
                </CardHeader> */}
                        <CardHeader>
          <Row>
          <Col md="4">
          <button
                className="autoWidthBtn" 
                onClick={() => history.goBack()}
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
              
            </Col>
            <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontSize: "20px" }}>Message</p>
            </Col>
            <Col
              md="4"
              style={{ display: "flex", justifyContent: "flex-end" }}
            ></Col>
          </Row>
        </CardHeader>
                <CardBody style={{display : "flex", height : "80vh", overflowY : "scroll"}}>
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={query}
                        columns={columns}
                        rowIndex
                    />

                    <PaymentModal
                        paymentHandler={paymentHandler}
                        addPaymentModal={addPaymentModal}
                    // data={data}
                    // getProposalData={getAssignmentData}
                    />
                </CardBody>
            </Card>
        </Layout>
    );
}

export default Message;