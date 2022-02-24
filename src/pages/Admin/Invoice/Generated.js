import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import Tds from "./Tds";
import InvoiceFilter from "../../../components/Search-Filter/InvoiceFilter"
import moment from "moment";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import Records from "../../../components/Records/Records";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
const Generated = () => {
    var rowStyle2 = {}
    const userid = window.localStorage.getItem("adminkey");
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
    const [showCopyUrl, setShowCopyUrl] = useState("click")
 let copyTitle = ""
 
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
 
    useEffect(() => {
        getProposalList();
    }, []);

    const getProposalList = () => {
        axios
            .get(`${baseUrl}/admin/getPaymentDetail?&invoice=1`)
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
                                pathname: `/admin/queries/${row.assign_id}`,
                                index : 0,
                                routes: "adinvoice",
                                
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
                var nfObject = new Intl.NumberFormat('hi-IN')
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
                var nfObject = new Intl.NumberFormat('hi-IN')
                var x = row.tds_amount;
                
                 
                 return(
                     <>
                     {row.is_paid == "0" ?
                     <p className="rightAli">0</p> :   <p className="rightAli">{nfObject.format(x)}</p>}
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
                    {row.is_paid == "1" ? <p>Paid</p> : <p style={{color : "red"}}>Declined</p>}
                    </>}
                    </>
                )
            }
        }, 
      
          
       
        {
            text: "Action",
            dataField: "",
           
            formatter: function (cell, row) {
                copyTitle = row.paymenturl
                return (
                    <>
                       {showCopyUrl === "click" ? 
                        <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <a
                    href={`${baseUrl3}/${row.invoice}`}
                    target="_blank"
                  >
                         <DescriptionOutlinedIcon color="secondary" />
                              </a>
                            
                          
                              {row.is_paid == "0" 
                ?   
               
                  
                    <span title={row.paymenturl}>
                    <FileCopyIcon onClick={() => {copyFun(row.paymenturl)}}  style={noPointer} />
                                   </span> 
                  
                
                   
              
                    : "" }
                        </div> : ""}
                       
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
                     invoice="admingenerated" 
                     setRec={setRecords}
                     records={records}
                     userid = {JSON.parse(userid)}/>
                    </CardHeader>

                <CardBody>
              
                <DataTablepopulated 
                   bgColor="#42566a"
                   keyField= {"assign_no"}
                   data={proposal}
                   columns={columns}>
                    </DataTablepopulated>
                   
                  
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