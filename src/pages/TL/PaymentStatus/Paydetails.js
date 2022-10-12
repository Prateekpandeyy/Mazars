import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import {
  Card,
  CardHeader,
  CardBody,
 
  Row,
  Col,
 
} from "reactstrap";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useParams, Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CustomHeading from "../../../components/Common/CustomHeading";
import {SiApplepay} from "react-icons/si";

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
            text: "Query no",
            
         
        },
        {
            dataField: "installment_no",
            text: "Installment no",
           
            
           
           
        },
        {
            dataField: "billno",
            text: "Invoice no",
           
           
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
            text: "Due date",
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
                {row.invoice_generated == "1" ? 
              <>
              {row.is_paid == "0" ? 
                "" :   <>
            {row.is_paid == "1" ?  
            <>
            {
                row.pyment_gateway_type == "1" ?
                <a href={row.receipt_url} target = "_blank">Payment receipt</a>  : 
                <p>Manual collection</p>
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
        // {
        //     dataField: "payment_mode",
        //     text: "Collection type",
              
        //     formatter: function dateFormat(cell, row) {
        //         return(
        //            <>
        //            {row.is_paid === "1" && row.pyment_gateway_type == "1" ? 
        //          <p>Pay u mode</p>
        //                  : ""}
                       
        //            {row.is_paid === "1" && row.pyment_gateway_type == "2" ? 
        //          <p>Manual collection</p>
        //                  : ""}
                         
        //            </>
        //         )
        //     },
           
        // },
        {
            dataField: "",
            text: "Action",
           
            
            formatter: function dateFormat(cell, row) {
                return(
                   <>
                   {row.is_paid !== "1" && row.invoice_generated == "1" ? 
                    <span title = "Manual collection">
 <Link
                 to = {{
                    pathname : "/teamleader/custompay",
                    routes : "teamleader",
                   data : {
                    id : row.id
                   }
                 }}
                 >
                 
                  {/* <SiApplepay style={{fontSize : "30px"}} /> */}
                  <CreditCardIcon color="secondary" />
                   </Link>
                    </span>
                 
                         : ""}
                   </>
                )
            },
           
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
          <CustomHeading>
          Payment details
          </CustomHeading>
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