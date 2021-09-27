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
import CommonServices from "../../common/common";


function FeedbackData(props) {
    console.log("props", props.location.obj)

    const userId = window.localStorage.getItem("userid");
    const [query, setQuery] = useState([]);


    useEffect(() => {
        getMessage();
    }, []);


    const getMessage = () => {
        axios
            .get(
                `${baseUrl}/customers/getFeedback?uid=${JSON.parse(userId)}`
            )
            .then((res) => {
                console.log(res);
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
            formatter: function nameFormatter(cell, row) {
                console.log(row);
                return (
                    <>
                        {row.assign_no}

                    </>
                );
            },
        },
        {
            text: "Feedback",
            dataField: "feedback",
            headerStyle: () => {
                return { fontSize: "12px", width: "150px" };
            },
        },
    ];




    return (
        <Layout custDashboard="custDashboard" custUserId={userId}>
            <Card>
                <CardHeader>
                    <Row>
                        <Col md="9">
                            <CardTitle tag="h4">Feedback</CardTitle>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
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

export default FeedbackData;
        // {
        //     text: "Time",
        //     sort: true,
        //     headerStyle: () => {
        //         return { fontSize: "12px", width: "30px" };
        //     },
        //     formatter: function nameFormatter(cell, row) {
        //         console.log(row);
        //         return (
        //             <>
        //                 {CommonServices.removeDate(row.created)}
        //             </>
        //         );
        //     },
        // },