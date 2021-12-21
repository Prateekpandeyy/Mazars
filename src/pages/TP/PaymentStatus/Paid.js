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
import TaxProfessionalFilter from "../../../components/Search-Filter/tpfilter";
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import PaymentIcon from '@material-ui/icons/Payment';
import RejectedModal from "./RejectedModal";
import DiscardReport from "../AssignmentTab/DiscardReport";




function AllPayment() {
    const alert = useAlert();
    const { id } = useParams();
    const userid = window.localStorage.getItem("tpkey");
    const cust_id = window.localStorage.getItem("userid");
    const [records, setRecords] = useState([]);

    const [pay, setPay] = useState([]);
    const [count, setCount] = useState("");
    const [payment, setPayment] = useState([]);
    const [modal, setModal] = useState(false);

    const [assignNo, setAssignNo] = useState("");


    const [addPaymentModal, setPaymentModal] = useState(false);
    const rejectHandler = (key) => {
   
        setPaymentModal(!addPaymentModal);
        setAssignNo(key.assign_no)
    };


    useEffect(() => {
        getPaymentStatus();
    }, []);
    const [ViewDiscussion, setViewDiscussion] = useState(false);
    const ViewDiscussionToggel = (key) => {
        setViewDiscussion(!ViewDiscussion);
        setAssignNo(key)
    }
    const getPaymentStatus = () => {
        axios.get(`${baseUrl}/tl/getUploadedProposals?tp_id=${JSON.parse(userid)}&status=2`).then((res) => {
          
            if (res.data.code === 1) {
                setPayment(res.data.result);
                setCount(res.data.result.length);
                setRecords(res.data.result.length);

            }
        });
    };


    const toggle = (key) => {
     
        setModal(!modal);

        fetch(`${baseUrl}//admin/getPaymentDetail?id=${key}`, {
            method: "GET",
            headers: new Headers({
                Accept: "application/vnd.github.cloak-preview",
            }),
        })
            .then((res) => res.json())
            .then((response) => {
              
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
               
                return (
                    <>
                   

                   <Link
                            to={{
                                pathname: `/taxprofessional/queries/${row.assign_id}`,
                                index : 2,
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
            sortFunc: (a, b, order, dataField) => {
              if (order === 'asc') {
                return b - a;
              }
              return a - b; // desc
            },
            headerStyle: () => {
              return { fontSize: "11px", color: "#21a3ce" };
            },
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('en-US')
                 var x = row.accepted_amount;

                 return(
                   <p className="rightAli">{nfObject.format(x)}</p>
                 )
               }
        },
        {
            text: "Amount Paid",
            dataField: "paid_amount",
            sort: true,
            style: {
              fontSize: "11px",
              color: "#064606",
            },
            sortFunc: (a, b, order, dataField) => {
              if (order === 'asc') {
                return b - a;
              }
              return a - b; // desc
            },
            headerStyle: () => {
              return { fontSize: "11px", color: "#064606" };
            },
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('en-US')
                 var x = row.paid_amount;

                 return(
                   <p className="rightAli">{nfObject.format(x)}</p>
                 )
               }
        },

        {
            text : "Outstanding Amount",
            dataField: "amount_outstanding",
            sort: true,
            style: {
              fontSize: "11px",
              color: "darkred",
            },
            sortFunc: (a, b, order, dataField) => {
              if (order === 'asc') {
                return b - a;
              }
              return a - b; // desc
            },
            headerStyle: () => {
              return { fontSize: "11px", color: "darkred" };
            },
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('en-US')
                 var x = row.amount_outstanding;

                 return(
                   <p className="rightAli">{nfObject.format(x)}</p>
                 )
               }
        },        {
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

                var oldDate = row.cust_paid_date;
                if (oldDate == null) {
                    return null;
                }
                return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
            },
        },
        {
            text: "Action",
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function (cell, row) {
                return (
                    <>

                        <div style={{ display: "flex", justifyContent: "space-between", width: "60px" }}>
                            {
                                row.paid_status == "0" ? null :
                                    <div title="Payment History"
                                      
                                        style={{ color: "green", fontSize: "16px", cursor: "pointer" }}
                                    >
                                         <Link
                                to={{
                                    pathname: `/taxprofessional/chatting/${row.assign_id}`,
                                    obj: {
                                        message_type: "5",
                                        query_No: row.assign_no,
                                        query_id: row.assign_id,
                                        routes: `/taxprofessional/paymentstatus`
                                    }
                                }}
                            >
                                <i
                                    class="fa fa-comments-o"
                                    style={{
                                        fontSize: 18,
                                        cursor: "pointer",
                                        color: "blue"
                                    }}
                                ></i>
                            </Link>
                                    </div>
                            }

                            {
                                (row.paid_status == "0") ?
                                    <div title="Payment decline"
                                        onClick={() => rejectHandler(row)}
                                        style={{ color: "red", fontSize: "16px", cursor: "pointer" }}
                                    >
                                        <PaymentIcon />
                                    </div>
                                    :
                                    null
                            }

                            <div title="Send Message">
                                <Link
                                    to={{
                                        pathname: `/teamleader/chatting/${row.assign_id}`,
                                        obj: {
                                            message_type: "5",
                                            query_No: row.assign_no,
                                            query_id: row.assign_id,
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
                        setData={setPayment}
                        getData={getPaymentStatus}
                        Paid="Paid"
                        setRecords={setRecords}
                        records={records}
                    />
                </CardHeader>

                <CardBody>
                <div className="tableFixHead">
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={payment}
                        columns={columns}
                        classes="table-responsivepayment"
                    />
</div>

                    <RejectedModal
                        rejectHandler={rejectHandler}
                        addPaymentModal={addPaymentModal}
                        assignNo={assignNo}
                        getPaymentStatus={getPaymentStatus}
                    />
 <DiscardReport
                        ViewDiscussionToggel={ViewDiscussionToggel}
                        ViewDiscussion={ViewDiscussion}
                        report={assignNo}
                        getData={getPaymentStatus}
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
