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
                return { fontSize: "12px", width: "10px", border: "1px solid #081f8f", color:"#fff", backgroundColor:"#081f8f" };
            },
        },
        {
            text: "Date",
            dataField: "created",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px", width: "60px", border: "1px solid #081f8f", color:"#fff", backgroundColor:"#081f8f" };
            },
          
        },

        {
            text: "Query No",
            dataField: "assign_no",
            headerStyle: () => {
                return { fontSize: "12px", width: "40px", border: "1px solid #081f8f", color:"#fff", backgroundColor:"#081f8f" };
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
            text: "Feedback",
            dataField: "feedback",
            headerStyle: () => {
                return { fontSize: "12px", width: "150px" , border: "1px solid #081f8f", color:"#fff", backgroundColor:"#081f8f"};
            },
        },
    ];




    return (
        <Layout custDashboard="custDashboard" custUserId={userId}>
            <Card>
                <CardHeader>
                    <Row>
                        <Col md="9">
                            <CardTitle tag="h4" className="contentTitle">Feedback</CardTitle>
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
       