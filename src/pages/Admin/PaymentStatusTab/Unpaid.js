import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
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
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import AdminFilter from "../../../components/Search-Filter/AdminFilter";
import CommonServices from "../../../common/common";
import Records from "../../../components/Records/Records";



function Unpaid() {

    const [payment, setPayment] = useState([]);

    const [paymentcount, setPaymentCount] = useState("");
    const [pay, setPay] = useState([]);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        getPaymentStatus();
    }, []);

    const getPaymentStatus = () => {
        axios.get(`${baseUrl}/tl/getUploadedProposals?status=2`).then((res) => {
            console.log(res);
            if (res.data.code === 1) {
                setPayment(res.data.result);
                setPaymentCount(res.data.result.length);
                setRecords(res.data.result.length);

            }
        });
    };

    const [modal, setModal] = useState(false);
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
                        <Link
                            to={{
                                pathname: `/admin/queries/${row.assign_id}`,
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
        {
            dataField: "tl_name",
            text: "TL name",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
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
                        <div style={{ display: "flex" }}>


                            <div style={{ cursor: "pointer" }} title="Payment History">
                                <i
                                    class="fa fa-credit-card"
                                    style={{ color: "green", fontSize: "16px" }}
                                    onClick={() => toggle(row.assign_id)}
                                ></i>
                            </div>

                            {/* <div title="Send Message">
                <Link
                  to={{
                    pathname: `/admin/chatting/${row.id}`,
                    obj: {
                      message_type: "5",
                      query_No: row.assign_no,
                      query_id: row.id,
                      routes: `/admin/paymentstatus`
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
              </div> */}

                        </div>
                    </>
                );
            },
        },
    ];


    return (
        <div>
            <Card>

                <CardHeader>
                    <AdminFilter
                        setData={setPayment}
                        getData={getPaymentStatus}
                        unpaid="unpaid"
                        setRecords={setRecords}
                        records={records}
                    />
                </CardHeader>
                <CardBody>
                    <Records records={records} />
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={payment}
                        columns={columns}
                        classes="table-responsive"
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
        </div>
    );
}

export default Unpaid;
