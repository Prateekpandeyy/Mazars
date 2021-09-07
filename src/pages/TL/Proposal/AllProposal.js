import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import ChatHistory from "./ChatHistory";
import DiscardReport from "../AssignmentTab/DiscardReport";





function AllProposal() {
    const userid = window.localStorage.getItem("tlkey");
    const [records, setRecords] = useState([]);
    const [proposal, setProposal] = useState([]);
    const [count, setCount] = useState("");
    const [id, setId] = useState(null);

    const [addPaymentModal, setPaymentModal] = useState(false);
    const chatHandler = (key) => {
        console.log(key);
        setPaymentModal(!addPaymentModal);
        setId(key.assign_no);
    };


    const [assignNo, setAssignNo] = useState('');
    const [ViewDiscussion, setViewDiscussion] = useState(false);
    const ViewDiscussionToggel = (key) => {
        setViewDiscussion(!ViewDiscussion);
        setAssignNo(key)
    }

    useEffect(() => {
        getProposalList();
    }, []);

    const getProposalList = () => {
        axios
            .get(`${baseUrl}/tl/getProposalTl?id=${JSON.parse(userid)}`)
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                    setProposal(res.data.result);
                    setCount(res.data.result.length);
                    setRecords(res.data.result.length);
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
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "60px" };
            },
        },
        {
            dataField: "query_date",
            text: "Date",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function dateFormat(cell, row) {
                console.log("dt", row.query_date);
                var oldDate = row.query_date;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
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

                        <Link
                            to={{
                                pathname: `/teamleader/queries/${row.id}`,
                                routes: "proposal",
                            }}
                        >
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
            text: "Date of acceptance / decline of Proposal",
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
                        <div>
                            {
                                row.status == "Inprogress" ?
                                    <div>
                                        {row.status}/
                                        <p className="inprogress">
                                            {row.statusdescription}
                                        </p>
                                    </div>
                                    :
                                    row.status == "Customer Declined; Proposal" ?
                                        <p className="declined">
                                            {row.status}
                                        </p> :
                                        row.status == "Accepted; Proposal" ?
                                            <p className="completed">
                                                {row.status}
                                            </p> :
                                            null
                            }
                        </div>
                    </>
                );
            },
        },
        {
            dataField: "ProposedAmount",
            text: "Proposed Amount",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
        {
            dataField: "accepted_amount",
            text: "Accepted Amount ",
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
                return { fontSize: "12px", width: "110px" };
            },
            formatter: function (cell, row) {
                return (
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                {row.status_code == "4" ? (
                                    <Link to={`/teamleader/edit-proposal/${row.id}`}>
                                        <i
                                            className="fa fa-edit"
                                            style={{
                                                fontSize: "16px",
                                                cursor: "pointer",
                                                color: "green",
                                            }}
                                        ></i>
                                    </Link>
                                ) : row.status_code == "2"&& row.work_by != "0" ? (
                                    <Link to={`/teamleader/sendproposal/${row.id}`}>
                                        <i
                                            class="fa fa-mail-forward"
                                            style={{
                                                fontSize: "14px",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    </Link>
                                ) : null}
                            </div>

                            {row.status_code > "3" || row.status_code == "10" ?
                                <div style={{ cursor: "pointer", marginLeft: "8px" }} title="View Proposal">

                                    <a
                                        href={`${baseUrl}/customers/dounloadpdf?id=${row.id}&viewpdf=1`}
                                        target="_blank"
                                    >
                                        <i
                                            class="fa fa-eye"
                                            style={{ color: "green", fontSize: "16px" }}
                                        />
                                    </a>
                                </div>
                                :
                                null
                            }


                            <div>
                                {
                                    row.status == "Customer Declined; Proposal" ?
                                        null
                                        :
                                        <div title="Send Message">
                                            <Link
                                                to={{
                                                    pathname: `/teamleader/chatting/${row.id}`,
                                                    obj: {
                                                        message_type: "2",
                                                        query_No: row.assign_no,
                                                        query_id: row.id,
                                                        routes: `/teamleader/proposal`
                                                    }
                                                }}
                                            >
                                                <i
                                                    class="fa fa-comments-o"
                                                    style={{
                                                        fontSize: 16,
                                                        cursor: "pointer",
                                                        marginLeft: "8px",
                                                        color: "blue"
                                                    }}
                                                ></i>
                                            </Link>
                                        </div>
                                }
                            </div>

                            <div title="View Discussion Message">
                                <i
                                    class="fa fa-comments-o"
                                    style={{
                                        fontSize: 16,
                                        cursor: "pointer",
                                        color: "orange"
                                    }}
                                    onClick={() => ViewDiscussionToggel(row.assign_no)}
                                ></i>
                            </div>
                        </div>
                    </>
                );
            },
        },
    ];

    return (
        <>
            <Card>
                <CardHeader>
                    <TeamFilter
                        setData={setProposal}
                        getData={getProposalList}
                        AllProposal="AllProposal"
                        setRecords={setRecords}
                        records={records}
                    />
                </CardHeader>
                <CardBody>
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={proposal}
                        columns={columns}
                        rowIndex
                    />

                    <ChatHistory
                        chatHandler={chatHandler}
                        addPaymentModal={addPaymentModal}
                        qno={id}
                    />
                    <DiscardReport
                        ViewDiscussionToggel={ViewDiscussionToggel}
                        ViewDiscussion={ViewDiscussion}
                        report={assignNo}
                        getData={getProposalList}
                    />
                </CardBody>
            </Card>
        </>
    );
}

export default AllProposal;




{/* <div>
                                {row.revised_text && (
                                    <div style={{ cursor: "pointer" }} title="View History">
                                        <i
                                            class="fa fa-comments-o"
                                            style={{ color: "green", fontSize: "16px", color: "light-blue", }}
                                            onClick={() => chatHandler(row)}
                                        ></i>
                                    </div>
                                )}
                            </div> */}