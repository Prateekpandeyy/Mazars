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
import OutlinedInputIcons from "@mui/material/OutlinedInput";
import InvoiceFilter from "../../../components/Search-Filter/InvoiceFilter";
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
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
    const [billNo, setBillNo] = useState()
    const [id2, setId2] = useState()
    const [gstNo, setGstinNo] = useState();
 
   const addTdsToggle = (key) => {
      
     setGstinNo(key.gstin_no);
       setTdsForm(!tdsForm)
       setAssignNo(key.assign_no)
       setPaidAmount(key.paid_amount)
       setId(key.id)
       setInstallmentNo(key.installment_no)
       setBillNo(key.billno);
       setId2(key.id)
   }
    const ViewDiscussionToggel = (key) => {
      
        setViewDiscussion(!ViewDiscussion);
        
    }
    
    useEffect(() => {
        getProposalList();
    }, []);

    const getProposalList = () => {
        axios
            .get(`${baseUrl}/admin/getPaymentDetail?tl_id=${JSON.parse(userid)}&invoice=0`)
            .then((res) => {
               
                if (res.data.code === 1) {
                    setProposal(res.data.payment_detail);
                  
                  setRecords(res.data.payment_detail.length)
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
            text: "Query No",
            dataField: "assign_no",
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width : "200px" };
            },
            formatter: function nameFormatter(cell, row) {

                return (
                    <>

                        <Link
                            to={{
                                pathname: `/teamleader/queries/${row.assign_id}`,
                                index : 1,
                                routes: "tlinvoice",
                            }}
                        >
                            {row.assign_no}
                        </Link>
                    </>
                );
            },
        },
        {
            text: "Installment No",
            dataField: "installment_no",
            sort: true,
            style: {
                fontSize: "11px",
               textAlign : "center"
            },
            headerStyle: () => {
                return { fontSize: "11px" , width : "150px"};
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
                return { fontSize: "11px", width : "200px" };
            },
            formatter : function(cell, row){
                let dueDate=row.due_date.split("-").reverse().join("-")

                return(
                   
                    <>
              {dueDate}
                    </>
                )
            }
        }, 
        {
            text: "Amount",
            dataField: "paid_amount",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" , width : "200px"};
            },
            sortFunc: (a, b, order, dataField) => {
                if (order === 'asc') {
                  return b - a;
                }
                return a - b; // desc
              },
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('hi-IN')
                 var x = row.paid_amount;
                
                 return(
                   <p className="rightAli">{nfObject.format(x)}</p>
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
                        <i
                                            class="fa fa-mail-forward"
                                            style={{
                                                fontSize: "14px",
                                                cursor: "pointer",
                                                color : "blue",
                                            }}
                                            onClick = {() => addTdsToggle(row)} 
                                        ></i>
                           
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
                    <InvoiceFilter
                     setData={setProposal}
                     getData={getProposalList}
                     setRec={setRecords}
                     records={records}
                     invoice = "create" 
                     userid = {JSON.parse(userid)}/>
                    </CardHeader>

                <CardBody>
                <div className="tableFixHead">
                    <BootstrapTable
                        bootstrap4
                        keyField= {"id"}
                        data={proposal}
                        columns={columns}
                        rowIndex
                        classes="table-responsive"
                    />
</div>
                   
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
                    billNo = {billNo}
                    id = {id2}
                    gstNo = {gstNo}
                    tabIndex22 = {1}
                    />
                </CardBody>
            </Card>
        </>
     
    );
}
export default Invoice;