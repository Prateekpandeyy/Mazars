import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "reactstrap";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";
import CommonServices from "../../../common/common";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import PaymentIcon from '@material-ui/icons/Payment';
import RejectedModal from "./RejectedModal";




function AllPayment() {
    const alert = useAlert();
    const { id } = useParams();
    const userid = window.localStorage.getItem("tlkey");
    const cust_id = window.localStorage.getItem("userid");
    const [records, setRecords] = useState([]);

    const [pay, setPay] = useState([]);
    const [count, setCount] = useState("");
    const [payment, setPayment] = useState([]);
    const [modal, setModal] = useState(false);

    const [assignNo, setAssignNo] = useState("");


    const [addPaymentModal, setPaymentModal] = useState(false);
    const rejectHandler = (key) => {
        console.log("key", key);
        setPaymentModal(!addPaymentModal);
        setAssignNo(key.assign_no)
    };


    useEffect(() => {
        getPaymentStatus();
    }, []);

    const getPaymentStatus = () => {
        axios.get(`${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(userid)}&status=2`).then((res) => {
            console.log(res);
            if (res.data.code === 1) {
                setPayment(res.data.result);
                setCount(res.data.result.length);
                setRecords(res.data.result.length);

            }
        });
    };


    const toggle = (key) => {
        console.log("key", key);
        setModal(!modal);

        fetch(`${baseUrl}//admin/getPaymentDetail?id=${key}`, {
            method: "GET",
            headers: new Headers({
                Accept: "application/vnd.github.cloak-preview",
            }),
        })
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
                setPay(response.payment_detail);
            })
            .catch((error) => console.log(error));
    };


    const columns = [
        {
            dataField: "",
            text: "S.No",
            formatter: (cellContent, row, rowIndex) => {
                return rowIndex + 1;
            },
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
        {
            dataField: "query_created_date",
            text: "Date",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function dateFormat(cell, row) {
                console.log("dt", row.query_created_date);
                var oldDate = row.query_created_date;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
            },
        },
        {
            dataField: "assign_no",
            text: "Query No",
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
                        {/* <Link to={`/teamleader/queries/${row.assign_id}`}>
              {row.assign_no}
            </Link> */}

                        <Link
                            to={{
                                pathname: `/teamleader/queries/${row.assign_id}`,
                                routes: "paymentstatus",
                            }}
                        >
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
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
        {
            dataField: "cat_name",
            text: "Sub Category",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
        {
            text: "Date of acceptance of Proposal",
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
            dataField: "status",
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
            text: "Amount Paid",
            dataField: "paid_amount",
            sort: true,
            style: {
                fontSize: "11px",
                color: "#064606",
            },
            headerStyle: () => {
                return { fontSize: "11px", color: "#064606" };
            },
        },

        {
            text: "Amount Outstanding",
            dataField: "",
            sort: true,
            style: {
                fontSize: "11px",
                color: "darkred",
            },
            headerStyle: () => {
                return { fontSize: "11px", color: "darkred" };
            },
            formatter: function amountOutstading(cell, row) {
                console.log("dt", row.paid_amount);
                console.log("dt", row.accepted_amount);
                var p = row.paid_amount;
                var a = row.accepted_amount;
                return a - p;
            },
        },
        {
            text: "Date of Payment",
            dataField: "cust_paid_date",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function dateFormat(cell, row) {
                console.log("dt", row.cust_paid_date);
                var oldDate = row.cust_paid_date;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
            },
        },
        // {
        //     text: "Action",
        //     style: {
        //         fontSize: "11px",
        //     },
        //     headerStyle: () => {
        //         return { fontSize: "11px" };
        //     },
        //     formatter: function (cell, row) {
        //         return (
        //             <>

        //                 <div style={{ display: "flex", justifyContent: "space-between", width: "60px" }}>
        //                     {
        //                         row.paid_status == "0" ? null :
        //                             <div title="Payment History"
        //                                 onClick={() => toggle(row.assign_id)}
        //                                 style={{ color: "green", fontSize: "16px", cursor: "pointer" }}
        //                             >
        //                                 <ChangeHistoryIcon />
        //                             </div>
        //                     }

        //                     {
        //                         (row.paid_status == "0") ?
        //                             <div title="Payment decline"
        //                                 onClick={() => rejectHandler(row)}
        //                                 style={{ color: "red", fontSize: "16px", cursor: "pointer" }}
        //                             >
        //                                 <PaymentIcon />
        //                             </div>
        //                             :
        //                             null
        //                     }

        //                     <div title="Send Message">
        //                         <Link
        //                             to={{
        //                                 pathname: `/teamleader/chatting/${row.assign_id}`,
        //                                 obj: {
        //                                     message_type: "2",
        //                                     query_No: row.assign_no,
        //                                     query_id: row.assign_id,
        //                                     routes: `/teamleader/proposal`
        //                                 }
        //                             }}
        //                         >
        //                             <i
        //                                 class="fa fa-comments-o"
        //                                 style={{
        //                                     fontSize: 16,
        //                                     cursor: "pointer",
        //                                     marginLeft: "8px",
        //                                     color: "blue"
        //                                 }}
        //                             ></i>
        //                         </Link>
        //                     </div>
        //                 </div>
        //             </>
        //         );
        //     },
        // },
    ];


    return (
        <>
            <Card>             
                <CardHeader>
                    <TeamFilter
                        setData={setPayment}
                        getData={getPaymentStatus}
                        Paid="Paid"
                        setRecords={setRecords}
                        records={records}
                    />
                </CardHeader>

                <CardBody>
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={payment}
                        columns={columns}
                        classes="table-responsive"
                    />


                    <RejectedModal
                        rejectHandler={rejectHandler}
                        addPaymentModal={addPaymentModal}
                        assignNo={assignNo}
                        getPaymentStatus={getPaymentStatus}
                    />

                    <Modal isOpen={modal} fade={false} toggle={toggle}>
                        <ModalHeader toggle={toggle}>History</ModalHeader>
                        <ModalBody>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="row">S.No</th>
                                        <th scope="row">Date</th>
                                        <th scope="row">Amount</th>
                                    </tr>
                                </thead>
                                {pay.length > 0
                                    ? pay.map((p, i) => (
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{CommonServices.removeTime(p.payment_date)}</td>
                                                <td>{p.paid_amount}</td>
                                            </tr>
                                        </tbody>
                                    ))
                                    : null}
                            </table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>


                </CardBody>
            </Card>

        </>
    );
}

export default AllPayment;
