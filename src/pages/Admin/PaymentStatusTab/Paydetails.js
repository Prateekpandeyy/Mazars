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
  Row,
  Col,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { baseUrl2, baseUrl3 } from "../../../config/config";
import { useParams, Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import CustomHeading from "../../../components/Common/CustomHeading";
import ViewPayment from "../../../components/ViewPayment/ViewPayment";
import Swal from 'sweetalert2';
import CreditCardIcon from '@mui/icons-material/CreditCard';
const PayDetails = (props) => {
    let history = useHistory();
    const userId = window.localStorage.getItem("adminkey");
    const { id } = useParams();
    const [paymentDetail, setPaymentDetail] = useState();
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState(false)
    const [showTable, setShowTable] = useState(null);
    const [invoiceData, setInvoiceData] = useState(null)
    const [showPayment, setShowPayment] = useState(false)
    const token = window.localStorage.getItem("adminToken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
    const paydetails2 = () => {
          console.log("done22")
axios.get(`${baseUrl}/admin/getPaymentDetail?id=${id}`, myConfig)

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
      const paymentFun = (e) => {
    
        setShowPayment(!showPayment)
       
        if(e.id) {
         
            axios.get(`${baseUrl}/admin/creditpaymentview?id=${e.id}`, myConfig)
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
           
            headerStyle: () => {
                return { width: "90px" };
            },
        },
        {
            dataField: "assign_no",
            text: "Q.no",
            headerStyle: () => {
                return {  width: "120px" };
            },
              
      formatter: function nameFormatter(cell, row) {
      
        return (
          <>
            <Link
              to={{
                pathname: `/admin_queries/${row.assign_id}`,
                index: 1,
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
           
            
            headerStyle: () => {
                return {  width: "80px" };
            },
           
           
        },
        {
            dataField: "billno",
            text: "Invoice no",
           
            
            headerStyle: () => {
                return {  width: "150px" };
            },
            formatter : function(cell, row){
                return(
                    <>
                    {row.invoice_generated ===  "0" ? "" : 
                    <p>{row.billno}</p>}
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
        },
        {
            dataField : "tds_amount",
            text : "TDS deducted",
            style : {
             textAlign : "right"
            }, 
            headerStyle : () => {
                return { width : "100px"}
            },
            formatter : function(cell, row){
                return(
                    <>
                    {row.is_paid ===  "1" ? 
                    <p>{row.tds_amount}</p> : ""}
                    </>
                )
            }
        },
        {
            dataField : "amount",
            text : "Amount paid",
            style : {
                 textAlign : "right"
            }, 
            headerStyle : () => {
                return {  width : "100px"}
            },
            formatter: function (cell,row){
                return(
                    <>
                    {row.is_paid ===  "1" ? 
                    <p>{row.amount}</p> : ""}
                    </>
                )
            }
        },
        
        {
            dataField: "invoice",
            text: "Invoice",
           
            
            headerStyle: () => {
                return {  width: "90px" };
            },
            formatter: function dateFormat(cell, row) {
                return(
                   <>
                   {row.invoice_generated ===  "1" ? 
                      <span onClick={() => downloadpdf(row.assign_no, row.id, row.installment_no)} style={{cursor : "pointer"}} title="Download Invoice">
                      <DescriptionOutlinedIcon color="secondary" />
                      </span>
                          : ""}
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
                {row.invoice_generated ===  "1" ? 
              <>
              {row.is_paid ===  "0" ? 
                "" :   <>
            {row.is_paid ===  "1" ?  
            <>
            {
                row.payment_gateway_type ===  "1" ?
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
       <Layout adminDashboard="adminDashboard" adminUserId={userId}>
    {paymentDetail === undefined ? "" : 
  <Card>
      <CardHeader>
          <Row>
          <Col md="4">
          <Link
                  to={{
                    pathname: `/admin/${props.location.routes}`,
                    index: props.location.index,
                  }}
                >
                  <button className="autoWidthBtn ml-3">Go Back</button>
                </Link>
            </Col>
            <Col md="8">
         <CustomHeading>
         Payment details
         </CustomHeading>
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
<ViewPayment
                    paymentFun = {paymentFun}
                    showPayment = {showPayment}
                    data = {invoiceData} />
</CardBody>
</Card>}
</Layout>                  
   </>
)
}
export default PayDetails;