import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import BootstrapTable from "react-bootstrap-table-next";
import TaxProfessionalFilter from "../../../components/Search-Filter/tpfilter";
 import DiscardReport from "../AssignmentTab/DiscardReport";




function DeclinedProposal() {
    const userid = window.localStorage.getItem("tpkey");
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
            .get(`${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(userid)}&status=3`)
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
                                pathname: `/taxprofessional/queries/${row.id}`,
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
                                row.status == "Customer Declined; Proposal" ?
                                    <p className="declined">
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
            dataField: "",
            text: "Proposed Amount",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('en-US')
                 var x = row.ProposedAmount;
                 console.log(nfObject.format(x))
                 return(
                   <p>{nfObject.format(x)}</p>
                 )
               }
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
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('en-US')
                 var x = row.accepted_amount;
                 console.log(nfObject.format(x))
                 return(
                   <p>{nfObject.format(x)}</p>
                 )
               }
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
                                    <Link to={`/taxprofessional/edit-proposal/${row.id}`}>
                                        <i
                                            className="fa fa-edit"
                                            style={{
                                                fontSize: "16px",
                                                cursor: "pointer",
                                                color: "green",
                                            }}
                                        ></i>
                                    </Link>
                                ) : row.status_code == "2" ? (
                                    <Link to={`/taxprofessional/sendproposal/${row.id}`}>
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

                            {row.status_code > "3" ?
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
                                                    pathname: `/taxprofessional/chatting/${row.id}`,
                                                    obj: {
                                                        message_type: "2",
                                                        query_No: row.assign_no,
                                                        query_id: row.id,
                                                        routes: `/taxprofessional/proposal`
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
                            {
                                    row.status == "Customer Declined; Proposal" ?
                                        null :
                            <div title="Send Message">
                                            <Link
                                                to={{
                                                    pathname: `/taxprofessional/chatting/${row.id}`,
                                                    obj: {
                                                        message_type: "2",
                                                        query_No: row.assign_no,
                                                        query_id: row.id,
                                                        routes: `/taxprofessional/proposal`
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
                    <TaxProfessionalFilter
                        setData={setProposal}
                        getData={getProposalList}
                        proposal="proposal"
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

export default DeclinedProposal;

