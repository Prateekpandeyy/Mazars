import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import ChatHistory from "./ChatHistory";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DiscardReport from "../AssignmentTab/DiscardReport";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import Tds from "./Tds";
import InvoiceFilter from "../../../components/Search-Filter/InvoiceFilter"
import moment from "moment";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {EyeIcon, ViewDiscussionIcon, DiscussProposal, HelpIcon, EditQuery, ActionIcon} from "../../../components/Common/MessageIcon";

const Generated = () => {
    var rowStyle2 = {}
    const userid = window.localStorage.getItem("tlkey");
    const [records, setRecords] = useState([]);
    const [proposal, setProposal] = useState([]);
    const [count, setCount] = useState("");
    const [id, setId] = useState();
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
            .get(`${baseUrl}/admin/getPaymentDetail?tl_id=${JSON.parse(userid)}&invoice=1`)
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
                return { width: "50px" };
            },
        },
       
        {
            text: "Query No",
            dataField: "assign_no",
            
            formatter: function nameFormatter(cell, row) {
                
                return (
                    <>

                        <Link
                            to={{
                                pathname: `/teamleader/queries/${row.assign_id}`,
                                index : 0,
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
            
        },
        {
            text: "Invoice No",
            dataField: "billno",
            sort: true,
           
        },
        {
            text: "Due Date",
            dataField: "due_date",
            sort: true,
           
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
            text: "Invoice amount",
            dataField: "invoice_amount",
            sort: true,
            
            sortFunc: (a, b, order, dataField) => {
                if (order === 'asc') {
                  return b - a;
                }
                return a - b; // desc
              },
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('en-IN')
                 var x = row.invoice_amount;
                 
                 return(
                   <p className="rightAli">{nfObject.format(x)}</p>
                 )
               }
        },
        {
            text: "Tds Deducted",
            dataField: "tds_amount",
            sort: true,

            sortFunc: (a, b, order, dataField) => {
                if (order === 'asc') {
                  return b - a;
                }
                return a - b; // desc
              },
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('en-IN')
                 var x = row.tds_amount;
                 
                 return(
                     <>
                     {row.is_paid == "0" ?
                     <p className="rightAli"></p> :   <p className="rightAli">{nfObject.format(x)}</p>}
                     </>
                 
                 )
               }
        }, 
        
        {
            text: "Status",
            dataField: "is_paid",
            sort: true,
           
            formatter : function(cell, row) {
                return(
                    <>
                    {row.is_paid == "0" ? <p>Unpaid</p> : 
                    <>
                    {row.is_paid == "1" ? <p>Paid</p> : <p className="declined">Declined</p>}
                    </>}
                    </>
                )
            }
        }, 
        
        {
            text: "Action",
            dataField: "",
           
            formatter: function (cell, row) {
                return (
                    <>
                       <div style={{ display: "flex", justifyContent: "flex-start", alignItems : "center" }}>
                        <a
                    href={`${baseUrl3}/${row.invoice}`}
                    target="_blank"
                  >
                         <DescriptionOutlinedIcon color="secondary" />
                              </a>
                              {row.is_paid == "0" ? 
                      
                      <div  className="mx-1" onClick = {() => addTdsToggle(row)}>
                  <EditQuery title="Edit Invoice"/> 
                  </div> : ""
                        }
                          {row.is_paid == "0" 
                ?   
                <span title={row.paymenturl}>
                 <FileCopyIcon onClick={() => {copyFun(row.paymenturl)}} style={noPointer}/>
                   </span>
              
                    : "" }
                        </div>
                      
                    </>
                );
            },
        },
    ];
    const noPointer = {cursor: 'pointer', color : "blue"};
    const copyFun = (e)  =>{
   
        navigator.clipboard.writeText(e)
       
      }
    rowStyle2 = (row, index) => {
        const style = {}
        var warningDate = moment(row.due_date).subtract(5, 'day').toDate();
        // var warnformat = warningDate.format("YYYY-MM-DD");
        var aa = moment().toDate();
         var cc = moment(row.due_date).toDate();
         if(row.is_paid === "2"){
            style.backgroundColor = "#fff";
            style.color = "#000"
        }
        else if(row.paid_status != "2" && row.is_paid != "1" && cc < aa){
            style.backgroundColor = "#bfdfd2";
          style.color = "#000111"
        }
       else if(row.paid_status != "2" && row.is_paid != "1" && row.status != "Complete" && warningDate < aa)  {
          style.backgroundColor = "#c1d8f2";
          style.color = "#000111"
        }
       
        else if(row.paid_status != "2" && row.is_paid != "1" && warningDate > aa){
          style.backgroundColor = "#fff";
          style.color = "#000"
        }
      
        return style;
      }
  
    
    return (

        <>
            <Card>
              
             <CardHeader>
                    <InvoiceFilter
                     setData={setProposal}
                     getData={getProposalList}
                     invoice="generated" 
                     setRec={setRecords}
                     records={records}
                     userid = {JSON.parse(userid)}/>
                    </CardHeader>

                <CardBody>
                    
                    
                <DataTablepopulated 
                   bgColor="#42566a"
                   keyField= {"assign_no"}
                   rowStyle2= {rowStyle2}
                   data={proposal}
                   columns={columns}>
                    </DataTablepopulated>


                   
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
                    generated = {"edited"}
                    gstNo = {gstNo}
                    />
                </CardBody>
            </Card>
        </>
     
    );
}
export default Generated;