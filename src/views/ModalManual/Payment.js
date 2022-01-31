import React from 'react';
import { makeStyles, Button, Typography, Card, Container, CardHeader, CardActionArea, CardActions, CardMedia, CardContent } from '@material-ui/core';
import paymentHistory from "../ManualImg/paymentHistory.png";
import mazars from '../ManualImg/mazars.png';
import pdfIconImage from '../ManualImg/pdfIcon.png';
import paymentView from '../ManualImg/paymentView.png';
import paymentWeek from '../ManualImg/paymentWeek.png';
import invoiceOne from '../ManualImg/invoiceOne.png';
import invoiceTwo from '../ManualImg/invoiceTwo.png';
import paymentModal from '../ManualImg/paymentModal.png';
import payReceiptImage from '../ManualImg/payReceiptImg.png'
import rightClickIcon from '../ManualImg/rightClick.png';
import uipReceipt from '../ManualImg/upiReceiptImg.png';
import successPaymentReceipt from '../ManualImg/successPaymentReceipt.png';
import successPaymentReceipt2 from '../ManualImg/payReceipt2.png';
import successPayment from '../ManualImg/successPayment.png';
import { Link } from '@mui/material';
import WhatsappRoundedIcon from '@mui/icons-material/WhatsappRounded';
import paymentDashboard from '../ManualImg/paymentDashboard.png';
import inboxDesign from '../ManualImg/inboxDesign.png';
import inboxDetails from '../ManualImg/inboxDetails.png';
const Payment = () => {
    const useStyle = makeStyles(theme => ({
        root : {
            backgroundColor : "green", 
            color : "white",
            margin : "10px 0px",
            outline : "none",
            '&:hover': {
                backgroundColor : "green",
                color : "white",
                outline : "none"
            },
            '&:focus': {
                backgroundColor : "green",
                color : "white",
                outline : "none"
            }
        },
        root2: {
            backgroundColor: "blue",
            color: "white",
            margin: "10px 0px",
            outline: "none",
            '&:hover': {
                backgroundColor: "blue",
                color: "white",
                outline: "none"
            },
            '&:focus': {
                backgroundColor: "blue",
                color: "white",
                outline: "none"
            }
        },
        root3: {
            backgroundColor: "blue",
            color: "white",
            margin: "10px 0px",
            outline: "none",
            '&:hover': {
                backgroundColor: "blue",
                color: "white",
                outline: "none"
            },
            '&:focus': {
                backgroundColor: "blue",
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
                backgroundColor: "blue",
                color: "white",
                outline: "none"
            },
            '&:focus': {
                backgroundColor: "blue",
                color: "white",
                outline: "none"
            }
        },
    }))
    const classes = useStyle()
    return(
        <>
          <section id="payment">
          <Container>
            <Card>
                <CardHeader title={
                    <>
                    <Typography variant="h4">
                    TL name column displays the name of Team Leader.
                    </Typography>
                    <Typography variant="h4">
                    Under Payment Status tab, click on pay amount icon   
                    <Button>
                        <CardMedia src={paymentHistory} component="img" style={{widht: "20px", height:"20px" }}/></Button>     to view invoice and make the payment.
                        </Typography>
                    </>
                }/>
                <CardActionArea>
                    <CardContent>
                 <CardMedia src={mazars} component="img"/>
               
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
        <Container>
            <Card>
                <CardHeader title={
                    <>

                    <Typography variant="h4">
                    To view Invoice, click on icon
                    <Button>
                        <CardMedia src={pdfIconImage} component="img" style={{widht: "20px", height:"20px" }}/></Button> 
                        appearing in the Invoice/pay column.
                     </Typography>
                    </>
                }/>
                <CardActionArea>
                    <CardContent>
                 <CardMedia src={paymentView} component="img"/>
                 <CardMedia src={invoiceOne} component="img" />
                 <CardMedia src={invoiceTwo} component="img"/>
                 <Typography variant="h4">
                 The Invoice can be downloaded/printed by the client.
                 </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
        <Container>
            <Card>
                <CardHeader title={
                    <>

                    <Typography variant="h4">
                    For making payment, click on   
                    <Button>
                        <CardMedia src={rightClickIcon} component="img" style={{widht: "20px", height:"20px" }}/></Button> 
    icon in the invoice/pay column.
                                         
                     </Typography>
                    </>
                }/>
                <CardActionArea>
                    <CardContent>
                 <CardMedia src={paymentWeek} component="img"/>
               
                 <Typography variant="h4">
                 After clicking on   <Button>
                        <CardMedia src={rightClickIcon} component="img" style={{widht: "20px", height:"20px" }}/></Button>    following window opens.
                                        
                     </Typography>
                     <CardMedia src={paymentModal} component="img"/>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
        <Container>
            <Card>
                <CardHeader title={
                    <>
              <Typography variant="h4">
              The rate of TDS is indicated in the invoice and the payment window. However, the client may choose the rate of TDS,
               the tax will be appropriately deducted & balance amount will be payable.
                  </Typography>
                    <Typography variant="h4">
                    After Clicking on ,<Button variant="contained" className={classes.root}>
                        Pay Now
                        </Button> following screen will
                     appear enabling payment of the payable amount. To make payment, click on Pay.                       
                     </Typography>
                     <Typography variant="h4">
                     In case, client desires to make the payment later on, 
                     he may close the “Mobilpay Bill Payment” tab.
                         </Typography>
                    </>
                }/>
                <CardActionArea>
                    <CardContent>
                 <CardMedia src={payReceiptImage} component="img"/>
               
                
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
        <Container>
            <Card>
                <CardHeader title={
                    <>
              <Typography variant="h4">
              After clicking pay button, several payment methods become available for making the payment.
               Select the preferred method and proceed to pay by following the instructions.
               </Typography>
                  
                    </>
                }/>
                <CardActionArea>
                    <CardContent>
                 <CardMedia src={uipReceipt} component="img"/>
               <Typography variant="h4">
               Following payment methods are available to make payment:
               </Typography>
                <ol>
                    <li>
                        <Typography variant="h4">
                        UPI 
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="h4">
                        Net Banking
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="h4">
                        Wallet: Paytm, Amazon Pay, Phone Pe, Mobi Kwik, Ola Money & Jio Money
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="h4">
                        Credit Card
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="h4">
                        Debit Card
                        </Typography>
                    </li>
                </ol>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>

        <Container>
            <Card>
                <CardHeader title={
                    <>
                    <Typography variant="h4">
                    After successful payment, following payment receipt page will open.
                    </Typography>
                    
                    </>
                }/>
                <CardActionArea>
                    <CardContent>
                 <CardMedia src={successPaymentReceipt} component="img"/>
                 <CardMedia src={successPaymentReceipt2} component="img"/>
                 <Typography variant="h4">
                 An email will be sent to the client confirming successful payment
                 </Typography>
                 <Typography variant="h4">
                 To take a printout of the receipt, click on 
                 <Button variant="contained" className={classes.root2}>Print </Button>             icon. Receipt can also be saved in the pdf format.
                 </Typography>
                 <Typography variant="h4">
                 URL link of the receipt can also be sent as a Whatsapp message by clicking on
                
                 </Typography>
                 <Link to = "" style={{ color: "skyblue", weight: "1000" }}>
                     SendToSelf
                     <WhatsappRoundedIcon />
                 </Link>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
        <Container>
            <Card>
                <CardHeader title={
                    <>
                    <Typography variant="h4">
                   
                  
                    After successful payment of any Invoice, payment status tab will immediately display the updated position of the payments made in respect of the query.
                     The client can verify such payment by clicking on           and thereafter, clicking on
                     </Typography>
                    </>
                }/>
                <CardActionArea>
                    <CardContent>
                 <CardMedia src={successPayment} component="img"/>
                 <Typography variant="h4">
                 In case, the client desires to make payment without logging in to the Mazars
                  facility, he may request the Mazars team to provide URL for making payment. The Mazars team will provide the URL via email or Whatsapp message. 
                   </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>

        <Container>
            <Card>
                <CardHeader title={
                    <>
                    <Typography variant="h4">
                    Dashboard: By clicking dashboard icon, the client may see the summary of processing progress
                     of all queries raised him. Such summary is organized in four parts namely, All Queries, All Proposals, All Assignments &
                     All Payments. Their further sub categorization is displayed below such heads.
                  
                   </Typography>
                    </>
                }/>
                <CardActionArea>
                    <CardContent>
                 <CardMedia src={paymentDashboard} component="img"/>
                
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
        <Container>
            <Card>
                <CardHeader title={
                    <>
                    <Typography variant="h4">
                    Dashboard: At the right-hand side of the window, Inbox icon 
                    <Button variant="contained" className={classes.root4}>Inbox</Button>                will show the messages received.

                   </Typography>
                    </>
                }/>
                <CardActionArea>
                    <CardContent>
                 <CardMedia src={paymentDashboard} component="img"/>
                
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
        <Container>
            <Card>
                <CardHeader title={
                    <>
                    <Typography variant="h4">
                    By clicking on inbox icon, following screen will
                     appear displaying all the messages received chronologically.
                                    </Typography>
                    </>
                }/>
                <CardActionArea>
                    <CardContent>
                 <CardMedia src={inboxDesign} component="img"/>
                
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
        <Container>
            <Card>
                <CardHeader title={
                    <>
                    <Typography variant="h4">
                    After clicking on any specific message, 
                    full details of such message will be displayed as below
                                     </Typography>
                    </>
                }/>
                <CardActionArea>
                    <CardContent>
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
                </CardActionArea>
            </Card>
        </Container>
        </section>
        </>
        
    )
}
export default Payment;