import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import DiscardReport from "../AssignmentTab/DiscardReport";
import Tds from "./Tds";
import InvoiceFilter from "../../../components/Search-Filter/InvoiceFilter";
import Records from "../../../components/Records/Records";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
const CreateInvoice = () => {
    const userid = window.localStorage.getItem("adminkey");
    const [proposal, setProposal] = useState([]);
    const [id, setId] = useState();
    const [assignNo, setAssignNo] = useState('');  
    const [ViewDiscussion, setViewDiscussion] = useState(false);
    const [tdsForm , setTdsForm] = useState(false)
    const [paidAmount, setPaidAmount] = useState()
    const [installmentNo, setInstallmentNo] = useState();
    const [billNo, setBillNo] = useState()
    const [id2, setId2] = useState()
    const [gstNo, setGstinNo] = useState();
    const [records, setRecords] = useState([]);
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
    const ViewDiscussionToggel = (key) => {
      
        setViewDiscussion(!ViewDiscussion);
        
    }
    
    useEffect(() => {
        getProposalList();
    }, []);

    const getProposalList = () => {
        axios
            .get(`${baseUrl}/admin/getPaymentDetail?&invoice=0`, myConfig)
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
                return {  width: "50px" };
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
                                index : 1,
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
            text: "Amount",
            dataField: "paid_amount",
            sort: true,
           
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
                     invoice = "admincreate" 
                     userid = {JSON.parse(userid)}/>
                    </CardHeader>

                <CardBody>
             
                <DataTablepopulated 
                   bgColor="#42566a"
                   keyField= "id"
                   data={proposal}
                   columns={columns}>
                    </DataTablepopulated>

                   
                    <DiscardReport
                        ViewDiscussionToggel={ViewDiscussionToggel}
                        ViewDiscussion={ViewDiscussion}
                        report={assignNo}
                        getData={getProposalList}
                    />
                   {
                       tdsForm && (
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
                        />
                       )
                   }
                </CardBody>
            </Card>
        </>
     
    );
}
export default CreateInvoice;