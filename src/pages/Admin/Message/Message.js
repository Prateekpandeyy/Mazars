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


function Message(props) {
    

    const userId = window.localStorage.getItem("adminkey");
    const [query, setQuery] = useState([]);
    const [data, setData] = useState(null);

const history = useHistory();
    useEffect(() => {
        getMessage();
    }, []);


    const getMessage = () => {
        axios
            .get(
                `${baseUrl}/customers/getNotification?id=${JSON.parse(userId)}&type_list=all`
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
                                          
                                        }}
                                        onClick={() => readNotification(row.id)}
                                        title="unread"
                                    >
                                        <p>{row.message}</p>
                                        <i class="fa fa-bullseye" style={{ color: "red" }}></i>
                                    </div>
                                    :
                                    <div
                                        style={{ cursor: "pointer"}}
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
        <Layout adminDashboard="adminDashboard" adminUserId={userId}>
            <Card>
            <CardHeader>
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
                </CardHeader>
                <CardBody style={{display : "flex", height : "80vh", overflowY : "scroll"}}>
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={query}
                        columns={columns}
                        rowIndex
                    />
                </CardBody>
            </Card>
        </Layout>
    );
}

export default Message;

{/* <Col md="3">
                            <div style={{ display: "flex", justifyContent: "space-around" }}
                                class="btn btn-primary"
                            // onClick={() => paymentHandler()}
                            >
                                <Link
                                    to={{
                                        pathname: `/customer/chatting`,
                                        obj: props.location.obj
                                    }}

                                >
                                    Add Message
                                </Link>
                            </div>
                        </Col> */}