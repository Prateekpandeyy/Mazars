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
            .get(`${baseUrl}/admin/getPaymentDetail?tp_id=${JSON.parse(userid)}&invoice=1`)
            .then((res) => {
              
                if (res.data.code === 1) {
                    setProposal(res.data.payment_detail);
                   
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
                return { fontSize: "11px" };
            },
            formatter: function nameFormatter(cell, row) {
                
                return (
                    <>

                        <Link
                            to={{
                                pathname: `/taxprofessional/queries/${row.id}`,
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
            text: "Invoice No",
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
                        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <a
                    href={`${baseUrl3}/${row.invoice}`}
                    target="_blank"
                  >
                         <DescriptionOutlinedIcon color="secondary" />
                              </a>
                              {row.is_paid == "0" ? 
                        <i
                        class="fa fa-edit"
                        style={{
                            fontSize: "14px",
                            cursor: "pointer",
                            color : "blue",
                        }}
                       onClick = {() => addTdsToggle(row)} 
                    ></i> : ""
                        }
                        </div>
                      
                    </>
                );
            },
        },
    ];

    rowStyle2 = (row, index) => {
        const style = {}
        var warningDate = moment(row.Exp_Delivery_Date).add(5, 'day').toDate();
        // var warnformat = warningDate.format("YYYY-MM-DD");
        var aa = moment().toDate();
       
    
        if(row.paid_status != "2" && row.status != "Complete" && warningDate < aa)  {
          style.backgroundColor = "#c1d8f2";
          style.color = "#000111"
        }
        else if(row.paid_status != "2" && warningDate > aa){
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
                     userid = {JSON.parse(userid)}/>
                    </CardHeader>

                <CardBody>
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={proposal}
                        columns={columns}
                        rowIndex
                        rowStyle={ rowStyle2 }
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