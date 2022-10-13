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
import { useParams, Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CustomHeading from "../../../components/Common/CustomHeading";
import ViewPayment from "../../../components/ViewPayment/ViewPayment";
import Swal from 'sweetalert2';
import CreditCardIcon from '@mui/icons-material/CreditCard';
const PayDetails = (props) => {
    let history = useHistory();
    const userId = window.localStorage.getItem("tpkey");
    const { id } = useParams();
    const [paymentDetail, setPaymentDetail] = useState();
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState()
    const [showTable, setShowTable] = useState(null);
    const [invoiceData, setInvoiceData] = useState(null)
    const [showPayment, setShowPayment] = useState(false)
    const token = window.localStorage.getItem("tptoken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
    const paydetails2 = () => {
axios.get(`${baseUrl}/tl/getPaymentDetail?id=${id}`, myConfig)
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
           a.target = '_blank';
           a.click();
        }
      })
      }
      const paymentFun = (e) => {
    
        setShowPayment(!showPayment)
       
        if(e.id) {
         
            axios.get(`${baseUrl}/tp/creditpaymentview?id=${e.id}`, myConfig)
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
                return {  width: "50px" };
            },
        },
        {
            dataField: "assign_no",
            text: "Q.no",
           
           
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
                return { fontSize: "11px", width: "150px" };
            },
            formatter : function(cell, row){
                return(
                    <>
                    {row.invoice_generated == "0" ? "" : 
                    <p>{row.billno}</p>}
                    </>
                )
            }
        },
        {
            dataField: "due_date",
            text: "Due Date",
           sort : true,
           
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
           
        },
        {
            dataField : "tds_amount",
            text : "Tds deducted",
            
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
            text : "Amount paid",
            
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
           
            
            formatter: function dateFormat(cell, row) {
                return(
                   <>
                   {row.invoice_generated == "1" ? 
  <span onClick={() => downloadpdf(row.assign_no, row.id, row.installment_no)} style={{cursor : "pointer"}} title="Download Invoice">
  <DescriptionOutlinedIcon color="secondary" />
  </span> : ""}
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
            {row.is_paid == "1" ?  <a href={row.receipt_url} target="_blank">Payment receipt</a> 
            : <p style={{ padding: "5px", color : "red"}} className = "declined">Declined</p> }
            </>}
              </>
               : ""}
                </>
                  
                   
               )
           }
        },
        {
            dataField: "",
            text: "Manual Credit",
           
            
            formatter: function dateFormat(cell, row) {
                return(
                   <>
                 
                         <span onClick = {(e) => paymentFun(row)} title = "View payment">
                  <CreditCardIcon color="secondary" />
                  </span>
                   </>
                )
            },
           
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
          <Col md="4">
          <Link
                  to={{
                    pathname: `/taxprofessional/${props.location.routes}`,
                    index: props.location.index,
                  }}
                >
                  <button class="autoWidthBtn ml-3">Go Back</button>
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
          {/* <div className="tableFixHead">
  <BootstrapTable
  bootstrap4
  keyField="id"
  data={paymentDetail}
  columns={columns}
  classes="table-responsive"
/> 
</div> */}
<DataTablepopulated 
                   bgColor="#42566a"
                   keyField= {"assign_no"}
                   data={paymentDetail}
                   columns={columns}>
                    </DataTablepopulated>
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