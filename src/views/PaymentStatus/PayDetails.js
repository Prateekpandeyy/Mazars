import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Layout from "../../components/Layout/Layout";
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
import { baseUrl2, baseUrl3 } from "../../config/config";
import { useParams, Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import PayModal from "./PayModal";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
import  { DiscussProposal} from "../../components/Common/MessageIcon";

import './index.css';
const PayDetails = (props) => {
    let history = useHistory();
    const userId = window.localStorage.getItem("userid");
    const { id } = useParams();
    const [paymentDetail, setPaymentDetail] = useState();
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState()
    const [showTable, setShowTable] = useState(null);
    const paydetails2 = () => {
axios.get(`${baseUrl}/customers/getPaymentDetail?id=${id}`)
.then((res) => {
    if(res.data.code === 1){
       
        setPaymentDetail(res.data.payment_detail)
        //console.log(res.data.payment_detail.length)
       // setShowTable(res.data.payment_detail[0].invoice_generated)
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
           
        },
        {
            dataField: "assign_no",
            text: "Q.No",
            
            formatter: function nameFormatter(cell, row) {
         
                return (
                    <>
                           <Link
                                to={{
                                    pathname: `/customer/my-assingment/${row.assign_id}`,
                                  
                                    routes: "paymentstatus",
                                }}
                            >
                                {row.assign_no}
                            </Link>
                    </>
                );
            },
        },
        {
            dataField: "installment_no",
            text: "Installment No",
           
            style: {
                fontSize: "11px",
                textAlign : "center"
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
                fontSize: "11px",
                textAlign : "right"
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "120px" };
            },
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('hi-IN')
                 var x = row.invoice_amount;
                 console.log(nfObject.format(x))
                 return(
                   <p>{nfObject.format(x)}</p>
                 )
               }
        },
        {
            dataField : "tds_amount",
            text : "Tds Deducted",
            style: {
                fontSize: "11px",
                textAlign : "right"
            }, 
            headerStyle : () => {
                return { fontSize : "11px", width : "100px"}
            },
           
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('hi-IN')
                 var x = row.tds_amount;
                 console.log(nfObject.format(x))
                 return(
                  <>
                  {row.is_paid == "1" ?
                   <p>{nfObject.format(x)}</p> : ""}
                  </>
                 )
               }
        },
        {
            dataField : "amount",
            text : "Amount Paid",
            style: {
                fontSize: "11px",
                textAlign : "right"
            }, 
            headerStyle : () => {
                return { fontSize : "11px", width : "100px"}
            },
            formatter: function nameFormatter(cell, row){
                var nfObject = new Intl.NumberFormat('hi-IN')
                 var x = row.amount;
                 console.log(nfObject.format(x))
                 return(
                  <>
                  {row.is_paid == "1" ?
                   <p>{nfObject.format(x)}</p> : ""}
                  </>
                 )
               }
        },
        
        {
            dataField: "invoice",
            text: "Invoice / Pay",
           
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "90px" };
            },
            formatter: function dateFormat(cell, row) {
                return(
                   <>
                  <div style={{display : "flex", alignItems: "center", justifyContent : "space-between"}}>
                  {row.invoice_generated == "1" ? 
                    <a href={`${baseUrl3}/${row.invoice}`} target="_blank">
                          <DescriptionOutlinedIcon color="secondary" /></a> : ""}
                          
                          {row.is_paid == "0" ? 

           <div onClick={() => openModal(row)}>
                <DiscussProposal titleName ="Pay"/>
               </div>
                : ""}
                  </div>
                   </>
                )
            },
           
        },
        
       
       
        {
            dataField: "",
            text: "Payment Receipt",
           
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "90px" };
            },
           
           formatter: function dateFormat(cell, row){
           
               return(
                <>
                
             
            {row.is_paid == "1" ?  <a href={row.receipt_url} target="_blank">Payment receipt</a> 
            : ""}
           {row.is_paid == "2" ? 
           <p style={{ fontSize: "14px", padding: "5px", color : "red"}}>Declined</p>  : ""}
                </>
                  
                   
               )
           }
        },
           
      ];
    
      const Container = styled.div `
      dispaly : flex;
      width : 100%;
      height : 100%;
      justify-content : center;
      align-items : center;
      color: red`
return(
   <>
    <Layout custDashboard="custDashboard" custUserId={userId}>
    {paymentDetail === undefined ? "" : 
  <Card>
             <CardHeader>
          <Row>
          <Col md="4">
            <Link
                  to={{
                    pathname: `/customer/${props.location.routes}`,
                    index: props.location.index,
                  }}
                >
                  <button class="customBtn ml-3">Go Back</button>
                </Link>
              
            </Col>
            <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontSize: "20px" }}>Payment Details</p>
            </Col>
            <Col
              md="4"
              style={{ display: "flex", justifyContent: "flex-end" }}
            ></Col>
          </Row>
        </CardHeader>
          <CardBody>
   {showTable == true ? 

<DataTablepopulated 
                   bgColor="#2b5f55"
                   keyField={"assign_no"}
                   data={paymentDetail}
  columns={columns}>
                    </DataTablepopulated> : 
<Container>
    <p className="declined">Invoice not generated</p>
    </Container>}
<PayModal 
showModal = {modal}
modalToggle = {openModal}
modalData = {modalData}/>
</CardBody>
</Card>}
</Layout>                  
   </>
)
}
export default PayDetails;