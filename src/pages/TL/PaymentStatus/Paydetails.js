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
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";

import { Typography } from "antd";

const PayDetails = (props) => {
    let history = useHistory();
    const userId = window.localStorage.getItem("tlkey");
    const { id } = useParams();
    const [paymentDetail, setPaymentDetail] = useState();
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState()
    const [paymentUrlcopy, setPaymentUrlCopy] = useState(false)
    const [showTable, setShowTable] = useState(null);
    const token = window.localStorage.getItem("tlToken")
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
    const columns = [
        {
            dataField: "",
            text: "S.No",
            formatter: (cellContent, row, rowIndex) => {
                return rowIndex + 1;
            },
          
            headerStyle: () => {
                return { width: "90px" };
            },
        },
        {
            dataField: "assign_no",
            text: "Query.No",
            
         
        },
        {
            dataField: "installment_no",
            text: "Installment No",
           
            
           
           
        },
        {
            dataField: "billno",
            text: "Invoice No",
           
           
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
           
           
        },
        {
            dataField : "tds_amount",
            text : "Tds Deducted",
            
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
                    <a href={`${baseUrl3}/${row.invoice}`} target="_blank">
                          <DescriptionOutlinedIcon color="secondary" /></a> : ""}
                   </>
                )
            },
           
        },
        
       
         
       
          
        {
            dataField: "",
            text: "Payment Details",
           
           
           
           formatter: function dateFormat(cell, row){
           
               return(
                <>
                {row.invoice_generated == "1" ? 
              <>
              {row.is_paid == "0" ? 
                "" :   <>
            {row.is_paid == "1" ?  <a href={row.receipt_url} target = "_blank">Payment receipt</a> 
            : <p style={{fontWieght: "800", fontSize: "14px", padding: "5px", color : "red"}} className="declined">Declined</p> }
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
         <Layout TLDashboard="TLDashboard" TLuserId={userId}>
    {paymentDetail === undefined ? "" : 
  <Card>
                  <CardHeader>
          <Row>
          <Col md="4">
          <Link
                  to={{
                    pathname: `/teamleader/${props.location.routes}`,
                    index: props.location.index,
                  }}
                >
                  <button class="autoWidthBtn ml-3">Go Back</button>
                </Link>
            </Col>
            <Col md="8">
              <h4>Payment Details</h4>
            </Col>
          </Row>
        </CardHeader>
          <CardBody>
          <DataTablepopulated 
                   bgColor="#2b5f55"
                   keyField= {"assign_no"}
                   data={paymentDetail}
                   columns={columns}>
                    </DataTablepopulated>

</CardBody>
</Card>}
</Layout>                  
   </>
)
}
export default PayDetails;