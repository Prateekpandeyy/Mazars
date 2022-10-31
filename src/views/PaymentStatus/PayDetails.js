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
import CustomHeading from "../../components/Common/CustomHeading";
import ViewPayment from "../../components/ViewPayment/ViewPayment";
import './index.css';
import Swal from 'sweetalert2';
const PayDetails = (props) => {
    let history = useHistory();
    const userId = window.localStorage.getItem("userid");
    const { id } = useParams();
    const [paymentDetail, setPaymentDetail] = useState();
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState()
    const [showTable, setShowTable] = useState(null);
    const [showPayment, setShowPayment] = useState(false)
    const [invoiceData, setInvoiceData] = useState(null)
    const token = window.localStorage.getItem("clientToken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
    const paydetails2 = () => {
axios.get(`${baseUrl}/customers/getPaymentDetail?id=${id}`, myConfig)
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
    const downloadpdf = (qno, id, installmentNumber) => {
        const myConfig2 = {
            headers : {
             "uit" : token
            },
            responseType: 'blob'
          }
        axios.get(`${baseUrl}/customers/viewinvoicepdf?assign_no=${qno}&invoice_id=${id}` , myConfig2)
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
      const paymentFun = (e) => {
    
        setShowPayment(!showPayment)
       
        if(e.id) {
         
            axios.get(`${baseUrl}/customers/creditpaymentview?id=${e.id}`, myConfig)
            .then((res) => {
               
                if(res.data.code === 1){
                    setInvoiceData(res.data.result[0])
                }
                else{
                    Swal.fire({
                        title : "error",
                        html : "Something went wrong, please try again",
                        icon : "error"
                    })
                    setInvoiceData(null)
                }
            })
        }
        else{
            setInvoiceData([])
        }
      }
    const columns = [
        {
            dataField: "",
            text: "S.no",
            formatter: (cellContent, row, rowIndex) => {
                return rowIndex + 1;
            },
           
        },
        {
            dataField: "assign_no",
            text: "Q.no",
            
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
            text: "Installment no",
           
            style: {
                
                textAlign : "center"
            },
            headerStyle: () => {
                return {  width: "80px" };
            },
           
           
        },
        {
            dataField: "billno",
            text: "Invoice no",
           
            
            headerStyle: () => {
                return { width: "150px" };
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
            text: "Due date",
           sort : true,
           
            headerStyle: () => {
                return {  width: "120px" };
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
            text: "Invoice amount",
           
            style: {
              
                textAlign : "right"
            },
            headerStyle: () => {
                return {  width: "120px" };
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
            text : "Tds deducted",
            style: {
              
                textAlign : "right"
            }, 
            headerStyle : () => {
                return {  width : "100px"}
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
            text : "Amount paid",
            style: {
              
                textAlign : "right"
            }, 
            headerStyle : () => {
                return {  width : "100px"}
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
            headerStyle: () => {
                return { width: "90px" };
            },
            formatter: function dateFormat(cell, row) {
                return(
                   <>
                  <div style={{display : "flex", alignItems: "center", justifyContent : "space-between"}}>
                  {row.invoice_generated == "1" ? 
                       <span onClick={() => downloadpdf(row.assign_no, row.id, row.installment_no)} style={{cursor : "pointer"}} title="Download Invoice">
                       <DescriptionOutlinedIcon color="secondary" />
                       </span> : ""}
                          
                          {row.is_paid == "0" && row.paymenturl !== null ? 

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
            text: "Payment details",
           
           
           
           formatter: function dateFormat(cell, row){
           
               return(
                <>
                {row.invoice_generated == "1" ? 
              <>
              {row.is_paid == "0" ? 
                "" :   <>
            {row.is_paid == "1" ?  
            <>
            {
                row.payment_gateway_type == "1" ?
                <a href={row.receipt_url} target = "_blank">Payment receipt</a>  : 
               
                <span style = {{cursor : "pointer",  color : "#3D4775"}} onClick = {(e) => paymentFun(row)} title = "View payment">
              Manual credit
                </span> 
            }
           
            </>
            : <p style={{padding: "5px", color : "red"}} className="declined">Declined</p> }
            </>}
              </>
               : ""}
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
            <CustomHeading>
          Payment details
          </CustomHeading>
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
  {
                    showPayment === true ?
                    <ViewPayment
                    paymentFun = {paymentFun}
                    showPayment = {showPayment}
                    panel = "client"
                    data = {invoiceData} /> : ""
                   }
</CardBody>
</Card>}
</Layout>                  
   </>
)
}
export default PayDetails;