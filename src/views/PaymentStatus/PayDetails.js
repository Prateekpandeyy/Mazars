import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Layout from "../../components/Layout/Layout";
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
import BootstrapTable from "react-bootstrap-table-next";
import { useParams, Link, useHistory } from "react-router-dom";
const PayDetails = () => {
    const userId = window.localStorage.getItem("userid");
    const { id } = useParams();
    const [paymentDetail, setPaymentDetail] = useState();
    const paydetails2 = () => {
axios.get(`${baseUrl}/admin/getPaymentDetail?id=${id}`)
.then((res) => {
    if(res.data.code === 1){
        console.log(res.data.payment_detail[0])
        setPaymentDetail(res.data.payment_detail)
    }
   
})
    }
    useEffect(() => {
        paydetails2()
    }, [])
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
            dataField: "assign_no",
            text: "Q.No",
            
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
        {
            dataField: "billno",
            text: "Bill No",
           
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
        {
            dataField: "due_date",
            text: "Due Date",
           
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
        },
        {
            dataField: "invoice",
            text: "Invoice",
           
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px" };
            },
            formatter: function dateFormat(cell, row) {
                return(
                    <a href={`http://13.232.121.233/mazarsapi/${row.invoice}`}>Invoice</a>
                )
            },
           
        },
       
       
       
        
       
      
        
      ];
      
return(
   <>
    <Layout custDashboard="custDashboard" custUserId={userId}>
    {paymentDetail === undefined ? "" : 
    <BootstrapTable
    bootstrap4
    keyField="id"
    data={paymentDetail}
    columns={columns}
    classes="table-responsive"
/>}
</Layout>                  
   </>
)
}
export default PayDetails;