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
// import ChatComponent from "./ChatComponent";
import "./index.css";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import BootstrapTable from "react-bootstrap-table-next";
import FeedbackIcon from '@material-ui/icons/Feedback';
import Records from "../../components/Records/Records";



function DeclinedProposal() {
    const alert = useAlert();

    const userId = window.localStorage.getItem("userid");
    const [proposalDisplay, setProposalDisplay] = useState([]);
    const [proposalCount, setCountProposal] = useState("");
    const [records, setRecords] = useState([]);

    const [id, setId] = useState(null);
    const [reject, setRejected] = useState(true);

    // const [addPaymentModal, setPaymentModal] = useState(false);
    // const chatHandler = (key) => {
    //     console.log(key);
    //     setPaymentModal(!addPaymentModal);
    //     setId(key.q_id);
    // };

    useEffect(() => {
        getProposalData();
    }, []);

    const getProposalData = () => {
        axios
            .get(`${baseUrl}/customers/getProposals?uid=${JSON.parse(userId)}&status=3`)
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                    setProposalDisplay(res.data.result);
                    setCountProposal(res.data.result.length);
                    setRecords(res.data.result.length);

                }
            });
    };




    const columns = [
        {
            text: "S.No",
            dataField: "",
            style: {
                fontSize: "11px",
            },
            formatter: (cellContent, row, rowIndex) => {
                return rowIndex + 1;
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "50px" };
            },
        },
        {
            text: "Date",
            dataField: "created",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function (cell, row) {
                console.log("dt", row.created);
                var oldDate = row.created;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.toString().split("-").reverse().join("-");
            },
        },
        {
            text: "Query No",
            dataField: "assign_no",
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function nameFormatter(cell, row) {
                console.log(row);
                return (
                    <>
                        <Link to={`/customer/my-assingment/${row.q_id}`}>
                            {row.assign_no}
                        </Link>
                    </>
                );
            },
        },
        {
            text: "Category",
            dataField: "parent_id",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
        {
            text: "Sub Category",
            dataField: "cat_name",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
        {
            text: "Date of Proposal",
            dataField: "DateofProposal",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function dateFormat(cell, row) {
                console.log("dt", row.DateofProposal);
                var oldDate = row.DateofProposal;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.toString().split("-").reverse().join("-");
            },
        },
        {
            text: "Date of Decline of Proposal",
            dataField: "cust_accept_date",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function dateFormat(cell, row) {
                console.log("dt", row.cust_accept_date);
                var oldDate = row.cust_accept_date;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
            },
        },
        {
            text: "Status",
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function nameFormatter(cell, row) {
                return (
                    <>
                        <div className="declined">
                            {row.status}
                        </div>
                    </>
                );
            },
        },
        {
            text: "Proposed Amout",
            dataField: "ProposedAmount",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
        {
            text: "Accepted Amount",
            dataField: "accepted_amount",
            sort: true,
            style: {
                fontSize: "11px",
                color: "#21a3ce",
            },
            headerStyle: () => {
                return { fontSize: "11px", color: "#21a3ce" };
            },
        },
        {
            text: "Action",
            dataField: "",
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        }
    ];

    return (
        <div>
            <Card>
                <CardHeader>
                    <CustomerFilter
                        setData={setProposalDisplay}
                        getData={getProposalData}
                        id={userId}
                        declinedProposal="declinedProposal"
                        records={records}
                        setRecords={setRecords}
                    />
                </CardHeader>
                <CardBody>
                    <Records records={records} />

                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={proposalDisplay}
                        columns={columns}
                        classes="table-responsive"
                    />
                    {/* <ChatComponent
                        chatHandler={chatHandler}
                        addPaymentModal={addPaymentModal}
                        id={id}
                        getProposalData={getProposalData}
                    /> */}
                </CardBody>
            </Card>
        </div>
    );
}

export default DeclinedProposal;
