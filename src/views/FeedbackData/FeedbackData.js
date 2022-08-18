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
    Modal ,
    ModalBody, 
    ModalHeader, 
} from "reactstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import CommonServices from "../../common/common";
import  {HelpIcon} from "../../components/Common/MessageIcon";
import ModalManual from "../ModalManual/AllComponentManual";
function FeedbackData(props) {


    const userId = window.localStorage.getItem("userid");
    const [query, setQuery] = useState([]);
    const [openManual, setManual] = useState(false)
    const token = window.localStorage.getItem("clientToken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
    useEffect(() => {
        getMessage();
    }, []);


    const getMessage = () => {
        axios
            .get(
                `${baseUrl}/customers/getFeedback?uid=${JSON.parse(userId)}`, myConfig
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



    const needHelp = () => {
        
        setManual(!openManual)
    }
    return (
        <Layout custDashboard="custDashboard" custUserId={userId}>
            <Card>
                <CardHeader>
                    <Row>
                        <Col md="7">
                            <CardTitle tag="h4" className="contentTitle">Feedback</CardTitle>
                        </Col>
                        <Col md="5">
            <span onClick= {(e) => needHelp()}> <HelpIcon /></span>
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
            <Modal isOpen={openManual} toggle={needHelp} size="lg">
                        <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
                        <ModalBody>
                            <ModalManual tar= {"feedback"} />
                        </ModalBody>
                    </Modal>
        </Layout>
    );
}

export default FeedbackData;
       