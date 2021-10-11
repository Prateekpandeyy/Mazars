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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DiscardReport from "../AssignmentTab/DiscardReport";
import Tds from "./Tds";
import InvoiceFilter from "../../../components/Search-Filter/InvoiceFilter";

const Invoice = () => {
    const userid = window.localStorage.getItem("tlkey");
    const [records, setRecords] = useState([]);
    const [proposal, setProposal] = useState([]);
    const [count, setCount] = useState("");


    const [id, setId] = useState();
  
    const [tds, setTds] = useState(false)
  
    const [assignNo, setAssignNo] = useState('');  
    const [ViewDiscussion, setViewDiscussion] = useState(false);
    const [tdsForm , setTdsForm] = useState(false)
    const [paidAmount, setPaidAmount] = useState()
    const [installmentNo, setInstallmentNo] = useState();
    
 
   const addTdsToggle = (key) => {
     
       setTdsForm(!tdsForm)
       setAssignNo(key.assign_no)
       setPaidAmount(key.paid_amount)
       setId(key.id)
       setInstallmentNo(key.installment_no)
   }
    const ViewDiscussionToggel = (key) => {
        console.log(key)
        setViewDiscussion(!ViewDiscussion);
        
    }
    
    useEffect(() => {
        getProposalList();
    }, []);

    const getProposalList = () => {
        axios
            .get(`${baseUrl}/admin/getPaymentDetail?tl_id=${JSON.parse(userid)}&invoice=0`)
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                    setProposal(res.data.payment_detail);
                   
                }
            });
    };

console.log("tds22", tds)
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
            text: "Bill No",
            dataField: "billno",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
        {
            text: "Due Date",
            dataField: "due_date",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        }, 
        {
            text: "Paid Amount",
            dataField: "paid_amount",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        }, 
        {
            text: "Installment No",
            dataField: "installment_no",
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
            dataField: "",
            headerStyle: () => {
                return { fontSize: "12px", width: "110px" };
            },
            formatter: function (cell, row) {
                return (
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <AccountBalanceIcon
                              onClick = {() => addTdsToggle(row)} />
                        </div>
                    </>
                );
            },
        },
    ];

    return (

        <>
            <Card>
                {/* <CardHeader>
                    <TeamFilter
                        setData={setProposal}
                        getData={getProposalList}
                        AllProposal="AllProposal"
                        setRecords={setRecords}
                        records={records}
                    />
                </CardHeader> */}
                <CardHeader>
                    <InvoiceFilter />
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
                    <Tds 
                    tdsForm = {tdsForm}
                    addTdsToggle = {addTdsToggle}
                    id={id}
                    paidAmount={paidAmount}
                    report = {assignNo}
                    installmentNo = {installmentNo}
                    />
                </CardBody>
            </Card>
        </>
     
    );
}
export default Invoice;