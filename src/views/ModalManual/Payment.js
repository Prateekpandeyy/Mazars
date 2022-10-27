import React from 'react';
import {Box , makeStyles, Button, Typography, Card, Container, CardHeader, CardActionArea, CardActions, CardMedia, CardContent } from '@material-ui/core';
import paymentHistory from "../ManualImg/paymentHistory.png";
import mazars from '../ManualImg/mazars.png';
import pdfIconImage from '../ManualImg/pdfIcon.png';
import paymentView from '../ManualImg/paymentView.png';
import paymentWeek from '../ManualImg/paymentWeek.png';
import invoiceOne from '../ManualImg/invoiceOne.png';
import invoiceTwo from '../ManualImg/invoiceTwo.png';
import paymentModal from '../ManualImg/paymentModal.png';
import paymentModal2 from "../ManualImg/paymentmodal2.png";
import payReceiptImage from '../ManualImg/payReceiptImg.png'
import rightClickIcon from '../ManualImg/rightClick.png';
import uipReceipt from '../ManualImg/upiReceiptImg.png';
import successPaymentReceipt from '../ManualImg/successPaymentReceipt.png';
import successPaymentReceipt2 from '../ManualImg/payReceipt2.png';
import successPayment from '../ManualImg/successPayment.png';
import { Link } from '@mui/material';
import paymentDashboard from '../ManualImg/paymentDashboard.png';
import inboxDesign from '../ManualImg/inboxDesign.png';
import inboxDetails from '../ManualImg/inboxDetails.png';
const Payment = () => {
    const useStyle = makeStyles(theme => ({
        root : {
            backgroundColor : "#0071ce", 
            color : "white",
            margin : "10px 0px",
            outline : "none",
            '&:hover': {
                backgroundColor : "#0071ce",
                color : "white",
                outline : "none"
            },
            '&:focus': {
                backgroundColor : "#0071ce",
                color : "white",
                outline : "none"
            }
        },
        root2: {
            backgroundColor: "#0071ce",
            color: "white",
            margin: "10px 0px",
            outline: "none",
            '&:hover': {
                backgroundColor: "#0071ce",
                color: "white",
                outline: "none"
            },
            '&:focus': {
                backgroundColor: "#0071ce",
                color: "white",
                outline: "none"
            }
        },
        root3: {
            backgroundColor: "#0071ce",
            color: "white",
            margin: "10px 0px",
            outline: "none",
            '&:hover': {
                backgroundColor: "#0071ce",
                color: "white",
                outline: "none"
            },
            '&:focus': {
                backgroundColor: "#0071ce",
                color: "white",
                outline: "none"
            }
        },
        root3: {
            backgroundColor: "black",
            color: "white",
            margin: "10px 0px",
            outline: "none",
            '&:hover': {
                backgroundColor: "#0071ce",
                color: "white",
                outline: "none"
            },
            '&:focus': {
                backgroundColor: "#0071ce",
                color: "white",
                outline: "none"
            }
        },
    }))
    const classes = useStyle()
    return(
        <>
          <section id="payment">
          <Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
  
                  <Container maxWidth= "xl">
                     <Card>
                         <CardHeader title={
                              <Typography variant="h5">
                              Under Payment Status tab, click on pay amount icon   
                           
                                  <CardMedia src={paymentHistory} component="img" style={{display : "inline" , width: "20px", height:"20px", margin: "0px 10px" }}/>
                                       to view invoice and make the payment.
                                  </Typography>
                         } />
                             
                         <CardContent>

                     
                   
                        <CardMedia src={mazars} component="img"/>
                        <Typography variant="body1">
                    To view Invoice, click on icon
                   
                        <CardMedia src={pdfIconImage} component="img" style={{display : "inline" , width: "20px", height:"20px", margin: "0px 10px" }}/>
                        appearing in the Invoice/pay column.
                     </Typography>
                     <CardMedia src={paymentView} component="img"/>
                         </CardContent>
                     </Card>
                     
                  </Container>

                  </Box>
                  <Typography variant="h6" align = "center">
                      61
                  </Typography>
<Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
  
    <Container maxWidth= "xl">
        <Card>
            <CardContent>
            <CardMedia src={invoiceOne} component="img" />
                 <CardMedia src={invoiceTwo} component="img"/>
                 <Typography variant="body1">
                 The Invoice can be downloaded/printed by the client.
                 </Typography>
            </CardContent>
        </Card>
    </Container>

    </Box>
    <Typography variant="h6" align = "center">
                      62
                  </Typography>
<Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
  
    <Container maxWidth= "xl">
        <Card>
            <CardContent>
            <Typography variant="body1">
                    For making payment, click on   
                    <Button>
                        <CardMedia src={rightClickIcon} component="img" style={{widht: "20px", height:"20px" }}/></Button> 
    icon in the invoice/pay column.
                                         
                     </Typography>
                     <CardMedia src={paymentModal} component="img" style={{margin : "10px 0px"}} />
               
               <Typography variant="body1">
               After clicking on   <Button>
                      <CardMedia src={rightClickIcon} component="img" style={{widht: "20px", height:"20px" }}/></Button>    following window opens.
                                      
                   </Typography>
                   <CardMedia src={paymentModal2} component="img" style={{margin : "10px 0px"}} />

                
            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align = "center">
            63
        </Typography>
    </Box>

       <Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
  
           <Container maxWidth= "xl">
               <Card>
                   <CardContent>
                   <Typography variant="body1" style={{margin : "10px 0px"}}>
                   The rate of TDS is indicated in the invoice and the payment window. However, the client may choose the 
                   rate of TDS. The tax will be appropriately deducted & balance amount will be payable.
               </Typography>
                    <Typography variant="body1" style={{margin : "10px 0px"}}>
                    After Clicking on ,<Button variant="contained" className={classes.root}>
                        Pay Now
                        </Button> following screen will
                     appear enabling payment of the payable amount. To make payment, click on Pay.                       
                     </Typography>
<Typography variant="body1" style={{margin : "10px 0px"}}>
In case, client desires to make the payment later on, he may close the “Mobilpay Bill Payment” tab.
</Typography>
                 <CardMedia src={payReceiptImage} component="img"/>
               
                   </CardContent>
               </Card>
           </Container>
           
           </Box>
           <Typography align="center" variant="h6">
        64
    </Typography>

        <Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
  
            <Container maxWidth= "xl">
                <Card>
                    <CardContent>
                    <Typography variant="body1">
              After clicking pay button, several payment methods become available for making the payment.
               Select the preferred method and proceed to pay by following the instructions.
               </Typography>
               <CardMedia src={uipReceipt} component="img"/>
               <Typography variant="h5">
               Following payment methods are available to make payment:
               </Typography>
               <ol className="ml-2">
                    <li>
                        <Typography variant="body1">
                        UPI 
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                        Net Banking
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                        Wallet: Paytm, Amazon Pay, Phone Pe, Mobi Kwik, Ola Money & Jio Money
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                        Credit Card
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                        Debit Card
                        </Typography>
                    </li>
                </ol>
                    </CardContent>
                </Card>
            </Container>
           
            </Box>
       
            <Typography align="center" variant="h6">
        65
    </Typography>
       <Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
  
           <Container maxWidth= "xl">
               <Card>
                   <CardContent>
                   <Typography variant="body1">
                    After successful payment, following payment receipt page will open.
                    </Typography>
                    <CardMedia src={successPaymentReceipt} component="img"/>
                 <CardMedia src={successPaymentReceipt2} component="img"/>
                 <Typography variant="body1">
                 An email will be sent to the client confirming successful payment
                 </Typography>
                 <Typography variant="body1">
                 To take a printout of the receipt, click on 
                 <Button variant="contained" className={classes.root2}>Print </Button>             icon. Receipt can also be saved in the pdf format.
                 </Typography>
                 <Typography variant="body1">
                 URL link of the receipt can also be sent as a Whatsapp message by clicking on
                
                 </Typography>
                 <Link to = "" style={{ color: "skyblue", display : "block", weight: "1000" }}>
                     SendToSelf
                   
                 </Link>
                   </CardContent>
               </Card>
               </Container>
       <Typography variant="h6" align = "center">
                66
            </Typography>
           </Box>
           


           <Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
  
           <Container maxWidth= "xl">
               <Card>
                   <CardContent>
                   <Typography variant="body1">
                   
                  
                   After successful payment of any Invoice, payment status tab will immediately display the updated position of the payments made in respect of the query.
                    The client can verify such payment by clicking on           and thereafter, clicking on
                    </Typography>
                    <CardMedia src={successPayment} component="img"/>
                 <Typography variant="body1">
                 In case, the client desires to make payment without logging in to the Mazars
                  facility, he may request the Mazars team to provide URL for making payment. The Mazars team will provide the URL via email or Whatsapp message. 
                   </Typography>
                   </CardContent>
               </Card>
               </Container>
  
               </Box>
               <Typography variant="h6" align = "center" id= "mazarDashboard">
                67
            </Typography>  
       <Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
  
           <Container maxWidth= "xl">
               <Card>
                   <CardHeader title={
                        <Typography variant="h5">
                        Dashboard: By clicking dashboard icon, the client may see the summary of processing progress
                         of all queries raised him. Such summary is organized in four parts namely, All Queries, All Proposals, All Assignments &
                         All Payments. Their further sub categorization is displayed below such heads.
                      
                       </Typography>
                   }/>
                   <CardContent>
                  
                   <CardMedia src={paymentDashboard} component="img"/>
                   </CardContent>
               </Card>
               </Container>
      
           </Box>
           <Typography variant="h6" align = "center" id="showMessage">
                68
            </Typography> 
       
<Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
  
    <Container maxWidth= "xl">
        <Card>
            <CardHeader title={
                 <Typography variant="h5">
                 Dashboard: At the right-hand side of the window, Inbox icon 
                 <Button variant="contained" className={classes.root4}>Inbox</Button>                will show the messages received.

                </Typography>
            }/>
            <CardContent>
           
                   <CardMedia src={paymentDashboard} component="img"/>
                   <Typography variant="body1">
                    By clicking on inbox icon, following screen will
                     appear displaying all the messages received chronologically.
                                    </Typography>
                                    <CardMedia src={inboxDesign} component="img"/>
            </CardContent>
        </Card>
        </Container>

    </Box>
    <Typography variant="h6" align = "center">
                69
            </Typography>
  <Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
  
  <Container maxWidth= "xl">
    <Card>
        <CardContent>
        <Typography variant="body1">
                    After clicking on any specific message, 
                    full details of such message will be displayed as below
                                     </Typography> 
                                     <CardMedia src={inboxDetails} component="img"/>
                <table className="table table-bordered p-2">
<tr>
    <th>Query No.</th>
    <td>Concerned query number</td>
</tr>
<tr>
    <th>Sender</th>
    <td>Sender of message, namely: Admin, Team Leader, Tax Professional 
        or system generated for automatic messages</td>
    </tr>
<tr>
    <th>Date</th>
    <td>Date of message</td>
</tr>
<tr>
    <th>Message</th>
    <td>Contents of message</td>
</tr>
<tr>
    <th>Type</th>
    <td>Query discussion/Proposal discussion/Assignment discussion/Payment discussion
         for messages sent during these stages  of processing of query & 
        ‘others’ for remaining type of messages.</td>
</tr>
                </table>  
        </CardContent>
    </Card>
    </Container>
    

    
          
          </Box>
       
          <Typography variant="h6" align="center" id="seceduler">
              70
          </Typography>
        </section>
        </>
        
    )
}
export default Payment;