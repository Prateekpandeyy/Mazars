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
import { baseUrl2 } from "../../config/config";
import { useParams, Link, useHistory } from "react-router-dom";
import PayModal from "./PayModal";
const PayDetails = () => {
    let history = useHistory();
    const userId = window.localStorage.getItem("userid");
    const { id } = useParams();
    const [paymentDetail, setPaymentDetail] = useState();
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState()
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
 const openModal = (key) => {
   if(key){
       setModalData(key)
    console.log("row", key)
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
                return { fontSize: "11px", width: "90px" };
            },
        },
        {
            dataField: "billno",
            text: "Bill No",
           
            
            headerStyle: () => {
                return { fontSize: "11px", width: "90px" };
            },
        },
        {
            dataField: "due_date",
            text: "Due Date",
           
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "90px" };
            },
        },
        {
            dataField: "city",
            text: "City",
           
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "90px" };
            },
        },
        {
            dataField: "gstin",
            text: "Gstin",
           
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "90px" };
            },
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
                    <a href={`${baseUrl2}/mazarsapi/${row.invoice}`} target="_blank">
                          <DescriptionOutlinedIcon color="secondary" /></a> : ""}
                   </>
                )
            },
           
        },
        {
            dataField: "email",
            text: "Email",
           
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "90px" };
            },
           
           
        },
        {
            dataField: "installment_no",
            text: "Installment No",
           
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "90px" };
            },
           
           
        },
       
        {
            dataField: "",
            text: "Pay",
           
            style: {
                fontSize: "11px",
            },
            headerStyle: () => {
                return { fontSize: "11px", width: "90px" };
            },
           
           formatter: function dateFormat(cell, row){
               console.log("roww", row)
               return(
                <>
                {row.invoice_generated == "1" ? 
                 <PaymentIcon  onClick={() => openModal(row)}/> : ""}
                </>
                  
                   
               )
           }
        },
       
       
        
       
      
        
      ];
      
return(
   <>
    <Layout custDashboard="custDashboard" custUserId={userId}>
    {paymentDetail === undefined ? "" : 
  <Card>
      <CardHeader>
         <Row>
         <Col md="8">
              <h4>Payment Details</h4>
              </Col>
      <Col md="4">
              <button class="btn btn-success" onClick={() => history.goBack()}>
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </Col>
         </Row>
          </CardHeader>
          <CardBody>
        <BootstrapTable
    bootstrap4
    keyField="id"
    data={paymentDetail}
    columns={columns}
    classes="table-responsive"
/>
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