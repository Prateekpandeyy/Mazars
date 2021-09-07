import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl, ReportUrl } from "../../config/config";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table,
} from "reactstrap";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import { Link, useHistory } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import * as Cookies from "js-cookie";
import { useAlert } from "react-alert";
import FeedbackIcon from '@material-ui/icons/Feedback';
import PaymentModal from "./PaymentModal";
import RejectedModal from "./RejectModal";
import ViewAllReportModal from "./ViewAllReport";
import Records from "../../components/Records/Records";
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Alerts from "../../common/Alerts";
import PaymentIcon from '@material-ui/icons/Payment';
import DiscardReport from "../AssignmentTab/DiscardReport";



function CustomerDeclinedPayment() {
    const history = useHistory();
    const alert = useAlert();
    const userId = window.localStorage.getItem("userid");
    const [assignmentDisplay, setAssignmentDisplay] = useState([]);
    const [assignmentCount, setAssignmentQueries] = useState("");
    const [records, setRecords] = useState([]);
    const [report, setReport] = useState();
    const [dataItem, setDataItem] = useState({});


    const [reportModal, setReportModal] = useState(false);
    const ViewReport = (key) => {
        console.log("key - ", key);
        setReportModal(!reportModal);
        setReport(key.assign_no);
        setDataItem(key)
    };


    const [assignNo, setAssignNo] = useState('');
    const [ViewDiscussion, setViewDiscussion] = useState(false);
    const ViewDiscussionToggel = (key) => {
        setViewDiscussion(!ViewDiscussion);
        setAssignNo(key)
    }

    useEffect(() => {
        getAssignmentData();
    }, []);


    const getAssignmentData = () => {
        axios
            .get(
                `${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}&status=3`
            )
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                    setAssignmentDisplay(res.data.result);
                    setAssignmentQueries(res.data.result.length);
                    setRecords(res.data.result.length);
                }
            });
    };

    const columns = [
        {
            dataField: "",
            text: "S.No",
            formatter: (cellContent, row, rowIndex) => {
                return rowIndex + 1;
            },
            headerStyle: () => {
                return { fontSize: "12px", width: "50px" };
            },
        },
        {
            dataField: "created",
            text: "Date",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px" };
            },
            formatter: function dateFormat(cell, row) {
                console.log("dt", row.created);
                var oldDate = row.created;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.toString().split("-").reverse().join("-");
            },
        },
        {
            dataField: "assign_no",
            text: "Query No",
            headerStyle: () => {
                return { fontSize: "12px" };
            },
            formatter: function nameFormatter(cell, row) {
                console.log(row);
                return (
                    <>
                        <Link to={`/customer/my-assingment/${row.id}`}>
                            {row.assign_no}
                        </Link>
                    </>
                );
            },
        },
        {
            dataField: "parent_id",
            text: "Category",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px" };
            },
        },
        {
            dataField: "cat_name",
            text: "Sub Category",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px" };
            },
        },
        {
            dataField: "status",
            text: "Status",
            headerStyle: () => {
                return { fontSize: "12px" };
            },
        },
        {
            dataField: "Exp_Delivery_Date",
            text: "Expected date of delivery",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px" };
            },
            formatter: function dateFormat(cell, row) {
                console.log("dt", row.created);
                var oldDate = row.created;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.toString().split("-").reverse().join("-");
            },
        },
        {
            dataField: "final_date",
            text: "Actual date of delivery",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px" };
            },
            formatter: function dateFormat(cell, row) {
                console.log("dt", row.final_date);
                var oldDate = row.final_date;
                if (oldDate == null || oldDate == "0000-00-00") {
                    return null;
                }
                return oldDate.toString().split("-").reverse().join("-");
            },
        },
        {
            dataField: "",
            text: "Deliverable",
            headerStyle: () => {
                return { fontSize: "12px" };
            },
            formatter: function (cell, row) {
                // console.log(row.final_report);
                return (
                    <>

                        {
                            row.status == "Payment decliend" ? null :
                                <div>
                                    {row.assignment_draft_report || row.final_report ?
                                        <div title="View All Report"
                                            style={{ cursor: "pointer", textAlign: "center" }}
                                            onClick={() => ViewReport(row)}
                                        >
                                            <DescriptionOutlinedIcon color="secondary" />
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                        }
                    </>
                );
            },
        },
        {
            dataField: "",
            text: "Team Leader name and contact number, email",
            headerStyle: () => {
                return { fontSize: "12px" };
            },
            formatter: priceFormatter,
        },
        {
            text: "Action",
            headerStyle: () => {
                return { fontSize: "12px", textAlign: "center", width: "70px" };
            },
            formatter: function (cell, row) {
                return (
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>

                            <div title="Send Message">
                                <Link
                                    to={{
                                        pathname: `/customer/chatting/${row.id}`,
                                        obj: {
                                            message_type: "4",
                                            query_No: row.assign_no,
                                            query_id: row.id,
                                            routes: `/customer/assignment`
                                        }
                                    }}
                                >
                                    <i
                                        class="fa fa-comments-o"
                                        style={{
                                            fontSize: 16,
                                            cursor: "pointer",
                                            color: "blue"
                                        }}
                                    ></i>
                                </Link>
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



    //tl,phone,email
    function priceFormatter(cell, row) {
        console.log("row", row);
        if (row) {
            return (
                <>
                    <p style={{ fontSize: "10px" }}>{row.tname} </p>
                    <p style={{ fontSize: "10px" }}>{row.phone}</p>
                    <p style={{ fontSize: "10px" }}>{row.email}</p>
                </>
            );
        }

        return null;
    }



    return (
        <>
            <Card>
                <CardHeader>
                    <CustomerFilter
                        setData={setAssignmentDisplay}
                        getData={getAssignmentData}
                        id={userId}
                        assignment="assignment"
                        records={records}
                        setRecords={setRecords}
                    />
                </CardHeader>

                <CardBody>
                    <Records records={records} />
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={assignmentDisplay}
                        columns={columns}
                    />


                    <ViewAllReportModal
                        ViewReport={ViewReport}
                        reportModal={reportModal}
                        report={report}
                        getPendingforAcceptance={getAssignmentData}
                        dataItem={dataItem}
                    />
                    <DiscardReport
                        ViewDiscussionToggel={ViewDiscussionToggel}
                        ViewDiscussion={ViewDiscussion}
                        report={assignNo}
                        getData={getAssignmentData}
                    />

                </CardBody>
            </Card>
        </>
    );
}

export default CustomerDeclinedPayment;