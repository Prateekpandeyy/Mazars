import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import Tds from "./Tds";
import InvoiceFilter from "../../../components/Search-Filter/InvoiceFilter"
import moment from "moment";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
const Generated = () => {
    var rowStyle2 = {}
    const userid = window.localStorage.getItem("adminkey");
    const [records, setRecords] = useState([]);
    const [proposal, setProposal] = useState([]);
    const [id, setId] = useState();
    const [assignNo, setAssignNo] = useState('');  
    const [tdsForm , setTdsForm] = useState(false)
    const [paidAmount, setPaidAmount] = useState()
    const [installmentNo, setInstallmentNo] = useState();
    const [billNo, setBillNo] = useState()
    const [id2, setId2] = useState()
    const [gstNo, setGstinNo] = useState();
    const [copy, setCopy] = useState(0)
    const [showCopyUrl, setShowCopyUrl] = useState("click")
 let copyTitle = ""
 const token = window.localStorage.getItem("adminToken")
 const myConfig = {
     headers : {
      "uit" : token
     }
   }
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
            .get(`${baseUrl}/admin/getPaymentDetail?&invoice=1`, myConfig)
            .then((res) => {
              
                if (res.data.code === 1) {
                    setProposal(res.data.payment_detail);
                    setRecords(res.data.payment_detail.length)
                }
            });
    };
    const downloadpdf = (qno, id, installmentNumber) => {
        const myConfig2 = {
            headers : {
             "uit" : token
            },
            responseType: 'blob'
          }
        axios.get(`${baseUrl}/admin/viewinvoicepdf?assign_no=${qno}&invoice_id=${id}` , myConfig2)
      .then((res) => {
        console.log("res", res)
        if(res.status === 200){
        //    window.open(URL.createObjectURL(res.data));
           console.log(URL.createObjectURL(res.data))
           window.URL = window.URL || window.webkitURL;
           var url = window.URL.createObjectURL(res.data);
           var a = document.createElement("a");
           document.body.appendChild(a);
           a.style = "display: none";
           a.href = url;
           a.download = `invoice_${qno}_${installmentNumber}.pdf`
           a.target = '_blank';
           a.click();
        }
      })
      }

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
            sortFunc: (a, b, order, dataField, rowA, rowB) => {
                console.log("myValue", a, b, order, dataField, rowA, rowB)
                if (order === 'asc') {
                  return b - a;
                }
                return a - b; // desc
              }
        },
        {
            text: "Invoice No",
            dataField: "billno",
         
        },
        {
            text: "Due Date",
            dataField: "due_date",
            sort: true,
            sortFunc: (a, b, order) => {
                if (order === "asc") {
                  return Date.parse(a) - Date.parse(b);
                } else if (order === "desc") {
                  return Date.parse(b) - Date.parse(a);
                }
              }
            
            // formatter : function(cell, row){
            //     let dueDate=row.due_date.split("-").reverse().join("-")

            //     return(
                   
            //         <>
            //   {dueDate}
            //         </>
            //     )
            // }
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
                console.log("aaaa", a)
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
                                                    <span onClick={() => downloadpdf(row.assign_no, row.id, row.installment_no)} style={{cursor : "pointer"}} title="Download Invoice">
                         <DescriptionOutlinedIcon color="secondary" />
                         </span>
                            
                          
                              {row.is_paid == "0" 
                ?   
               
                  
                <span title={row.paymenturl}>
                {
                    copy == row.id ?
                    <span style={{color: 'red'}}>Copied</span>
                    
                     : 
                     <FileCopyIcon id={row.id} onClick={() => {copyFun(row.paymenturl, row.id)}} style={noPointer} />
                }
           
               </span>
                
                   
              
                    : "" }
                        </div> : ""}
                       
                    </>
                );
            },
        },
    ];
    
    const noPointer = {cursor: 'pointer', color : "blue"};
    const copyFun = (e, id)  =>{
       
        setCopy(id)
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
                   keyField= "id"
                   data={proposal}
                   rowStyle2 = {rowStyle2}
                   columns={columns}>
                    </DataTablepopulated>
                   
                  
                  {tdsForm && (
                        <Tds 
                        tdsForm = {tdsForm}
                        addTdsToggle = {addTdsToggle}
                        id={id}
                        paidAmount={paidAmount}
                        report = {assignNo}
                        installmentNo = {installmentNo}
                        billNo = {billNo}
                     
                        generated = {"edited"}
                        gstNo = {gstNo}
                        />
                  )}
                </CardBody>
            </Card>
        </>
     
    );
}
export default Generated;