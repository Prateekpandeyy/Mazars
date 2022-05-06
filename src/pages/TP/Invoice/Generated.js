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
    const token = window.localStorage.getItem("tptoken")
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
            .get(`${baseUrl}/tl/getPaymentDetail?tp_id=${JSON.parse(userid)}&invoice=1`, myConfig)
            .then((res) => {
              
                if (res.data.code === 1) {
                    setProposal(res.data.payment_detail);
                    setRecords(res.data.payment_detail.length)
                }
            });
    };

    const downloadpdf = (qno) => {
        const myConfig2 = {
            headers : {
             "uit" : token
            },
            responseType: 'blob'
          }
        axios.get(`${baseUrl}/tl/viewinvoicepdf?assign_no=${qno}&invoice_id=${JSON.parse(userid)}` , myConfig2)
      .then((res) => {
        console.log("res", res)
        if(res.status === 200){
           window.open(URL.createObjectURL(res.data));
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
            text: "Installment No",
            dataField: "installment_no",
            sort: true,
            
            headerStyle: () => {
                return {  width :"50px"};
            },
        },
        {
            text: "Invoice No",
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
            text: "Due Date",
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
            text: "Tds Deducted",
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
                console.log("row", row)
                return (
                    <>
                       <div style={{ display: "flex", justifyContent : "flex-start", alignItems:"center" }}>
                        {/* <a
                    href={`${baseUrl3}/${row.invoice}`}
                    target="_blank"
                  > */}
                  <span onClick={() => downloadpdf(row.assign_no, row.assign_id)}>
                         <DescriptionOutlinedIcon color="secondary" />
                         </span>
                              {/* </a> */}
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