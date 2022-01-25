import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import PaymentIcon from '@mui/icons-material/Payment';
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
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
import { baseUrl2, baseUrl3 } from "../../../config/config";
import { useParams, Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { Typography } from "antd";

const PayDetails = (props) => {
    console.log("props", props)
    let history = useHistory();
    const userId = window.localStorage.getItem("tpkey");
    const { id } = useParams();
    const [paymentDetail, setPaymentDetail] = useState();
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState()
    const [showTable, setShowTable] = useState(null);
    const [paymentUrlcopy, setPaymentUrlCopy] = useState(false)
    const paydetails2 = () => {
axios.get(`${baseUrl}//admin/getPaymentDetail?id=${id}`)
.then((res) => {
    if(res.data.code === 1){
       
        setPaymentDetail(res.data.payment_detail)
       
       if(res.data.payment_detail.length > 0){
           setShowTable(true)
       }
       else {
           setShowTable(false)
       }
    }
   
})
    }
    useEffect(() => {
        paydetails2()
    }, [])
 const openModal = (key) => {
   if(key){
       setModalData(key)
   
   }
setModal(!modal)

    }
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
                return { fontSize: "11px", width: "90px" };
            },
        },
        {
            dataField: "assign_no",
            text: "Q.No",
            
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "120px" };
            },
        },
        {
            dataField: "installment_no",
            text: "Installment No",
           
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "80px" };
            },
           
           
        },
        {
            dataField: "billno",
            text: "Invoice No",
           
            
            headerStyle: () => {
                return { fontSize: "11px", width: "150px" };
            },
            formatter : function(cell, row){
                return(
                    <>
                    {row.invoice_generated == "0" ? "" : 
                    <p style={{fontSize : "11px"}}>{row.billno}</p>}
                    </>
                )
            }
        },
        {
            dataField: "due_date",
            text: "Due Date",
           sort : true,
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "120px" };
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
            dataField: "invoice_amount",
            text: "Invoice Amount",
           
            style: {
                fontSize: "11px" , textAlign : "right"
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "120px" };
            },
        },
        {
            dataField : "tds_amount",
            text : "Tds Deducted",
            style : {
                fontSize : "11px", textAlign : "right"
            }, 
            headerStyle : () => {
                return { fontSize : "11px", width : "100px"}
            },
            formatter : function(cell, row){
                return(
                    <>
                    {row.is_paid == "1" ? 
                    <p>{row.tds_amount}</p> : ""}
                    </>
                )
            }
        },
        {
            dataField : "amount",
            text : "Amount Paid",
            style : {
                fontSize : "11px", textAlign : "right"
            }, 
            headerStyle : () => {
                return { fontSize : "11px", width : "100px"}
            },
            formatter: function (cell,row){
                return(
                    <>
                    {row.is_paid == "1" ? 
                    <p>{row.amount}</p> : ""}
                    </>
                )
            }
        },
        
        {
            dataField: "invoice",
            text: "Invoice",
           
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "90px" };
            },
            formatter: function dateFormat(cell, row) {
                return(
                   <>
                   {row.invoice_generated == "1" ? 
                    <a href={`${baseUrl3}/${row.invoice}`} target="_blank">
                          <DescriptionOutlinedIcon color="secondary" /></a> : ""}
                   </>
                )
            },
           
        },
        
       
        {
            dataField: "",
            text: "Payment Details",
           
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "90px" };
            },
           
           formatter: function dateFormat(cell, row){
           
               return(
                <>
                {row.invoice_generated == "1" ? 
              <>
              {row.is_paid == "0" ? 
                "" :   <>
            {row.is_paid == "1" ?  <a href={row.receipt_url} target="_blank">Payment receipt</a> 
            : <p style={{fontWieght: "800", fontSize: "16px", padding: "5px", color : "red"}}>Declined</p> }
            </>}
              </>
               : ""}
                </>
                  
                   
               )
           }
        },
           
      ];
    
      const copyFun = (e)  =>{
   
        navigator.clipboard.writeText(e)
       
      }
      const Container = styled.div `
      dispaly : flex;
      width : 100%;
      height : 100%;
      justify-content : center;
      align-items : center;
      color: red`
return(
   <>
        <Layout TPDashboard="TPDashboard" TPuserId={userId}>
    {paymentDetail === undefined ? "" : 
  <Card>
      <CardHeader>
         <Row>
        
     
             <h2>
             <Link
                  to={{
                    pathname: `/taxprofessional/${props.location.routes}`,
                    index: props.location.index,
                  }}
                >
                  <button class="btn btn-success ml-3">Go Back</button>
                </Link>
                 </h2>
             
          
         <Col md="8">
              <h4>Payment Details</h4>
              </Col>
     <Col md= "4">

     </Col>
         </Row>
          </CardHeader>
          <CardBody>
          <div className="tableFixHead">
  <BootstrapTable
  bootstrap4
  keyField="id"
  data={paymentDetail}
  columns={columns}
  classes="table-responsive"
/> 
</div>
</CardBody>
</Card>}
</Layout>                  
   </>
)
}
export default PayDetails;