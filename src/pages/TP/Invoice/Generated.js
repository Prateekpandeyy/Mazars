import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import BootstrapTable from "react-bootstrap-table-next";
import Tds from "./Tds";
import InvoiceFilter from "../../../components/Search-Filter/InvoiceFilter"
import moment from "moment";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
const Generated = () => {
    var rowStyle2 = {}
    const userid = window.localStorage.getItem("tpkey");
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
    const [copy, setCopy] = useState(0)
    const token = window.localStorage.getItem("tptoken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
 
    const addTdsToggle = (key) => {
        setTdsForm(!tdsForm)
    if(key){
        setGstinNo(key.gstin_no);
       
        setAssignNo(key.assign_no)
        setPaidAmount(key.paid_amount)
        setId(key.id)
        setInstallmentNo(key.installment_no)
        setBillNo(key.billno);
        setId2(key.id)
    }
    }
 
    useEffect(() => {
        getProposalList();
    }, []);

    const getProposalList = () => {
        axios
            .get(`${baseUrl}/tl/getPaymentDetail?tp_id=${JSON.parse(userid)}&invoice=1`, myConfig)
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
        axios.get(`${baseUrl}/tl/viewinvoicepdf?assign_no=${qno}&invoice_id=${id}` , myConfig2)
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
        //    a.download = "invoice"+{qno}+{installmentNumber}+'.pdf';
           a.target = '_blank';
           a.click();
        }
      })
      }
    const columns = [
        {
            text: "S.no",
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
            text: "Query no",
            dataField: "assign_no",
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" , width : "100px"};
            },
            formatter: function nameFormatter(cell, row) {
                
                return (
                    <>

                        <Link
                            to={{
                                pathname: `/taxprofessional/queries/${row.assign_id}`,
                                index : 0,
                                routes: "tpinvoice",
                            }}
                        >
                            {row.assign_no}
                        </Link>
                    </>
                );
            },
        },
        {
            text: "Installment no",
            dataField: "installment_no",
            sort: true,
            
            headerStyle: () => {
                return {  width :"50px"};
            },
        },
        {
            text: "Invoice no",
            dataField: "billno",
            sort: true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fwidth : "150px"};
            },
        },
        {
            text: "Due date",
            dataField: "due_date",
            sort: true,
            style: {
                fontSize: "11px",
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
            text: "Invoice amount",
            dataField: "invoice_amount",
            sort: true,
            
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('hi-IN')
                 var x = row.invoice_amount;
               
                 return(
                   <p className="rightAli">{nfObject.format(x)}</p>
                 )
               }
        },
        {
            text: "Tds deducted",
            dataField: "tds_amount",
            sort: true,
          
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
                    {row.is_paid == "1" ? <p>Paid</p> : <p style={{color : "red", fontSize: "11px"}}>Declined</p>}
                    </>}
                    </>
                )
            }
        }, 
       
        {
            text: "Action",
            dataField: "",
            headerStyle: () => {
                return { fontSize: "11px", width: "110px" };
            },
            formatter: function (cell, row) {
             
                return (
                    <>
                       <div style={{ display: "flex", justifyContent : "flex-start", alignItems:"center" }}>
                       <span onClick={() => downloadpdf(row.assign_no, row.id, row.installment_no)} style={{cursor : "pointer"}} title="Download Invoice">
                         <DescriptionOutlinedIcon color="secondary" />
                         </span>
                              {row.is_paid == "0" ? 
                        <i
                        class="fa fa-edit"
                        style={{
                            fontSize: "16px",
                            margin: "0 5px",
                            cursor: "pointer",
                            color : "blue",
                        }}
                       onClick = {() => addTdsToggle(row)} 
                    ></i> : ""
                        }
                         {row.is_paid == "0" && row.paymenturl !== null
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
                        </div>
                      
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
                     invoice="tpgenerated" 
                     panel = "taxprofessional"
                     setRec={setRecords}
                     records={records}
                     userid = {JSON.parse(userid)}/>
                    </CardHeader>

                <CardBody>
                {/* <div className="tableFixHead">
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={proposal}
                        columns={columns}
                        rowIndex
                        rowStyle={ rowStyle2 }
                        classes="table-responsive"
                    />
                    </div> */}
  <DataTablepopulated 
                   bgColor="#42566a"
                   keyField='id'
                   data={proposal}
                   columns={columns}>
                    </DataTablepopulated>
                   
                  
                  {
                      tdsForm === true ?
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
                      getProposalList ={getProposalList}
                      /> : ""
                  }
                </CardBody>
            </Card>
        </>
     
    );
}
export default Generated;