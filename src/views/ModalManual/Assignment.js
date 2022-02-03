import React from 'react';
import {Box, Container, Card, CardHeader, CardActionArea, CardMedia, CardContent, CardActions, Typography, Button} from '@material-ui/core';
import { makeStyles } from '@mui/material/styles';
import assignmentImage from '../ManualImg/assignmentImage.png';
import assignmentImage2 from '../ManualImg/assignment2.png'
import pdfIconImage from '../ManualImg/pdfIcon.png';
import assignmentImage21 from '../ManualImg/assignmentImage21.png';
import assignmentImage31 from '../ManualImg/assignmentImage31.png';
import rightClickIcon from '../ManualImg/rightClick.png';
import downloadIcon from '../ManualImg/downloadIcon.png';
import finalAssignment from '../ManualImg/finalAssignment.png';
import pdfAssignmentImg from '../ManualImg/pdfAssignmentImg.png';
import fileProcessImg from '../ManualImg/fileProcessImg.png';
import assignment3 from '../ManualImg/assignment3.png';
import assignment4 from '../ManualImg/assignment4.png';
import assignmentQuery from '../ManualImg/assignmentQuery.png';
import seeProposal from '../ManualImg/seeProposal.png';
import paymentHistory from "../ManualImg/paymentHistory.png";
import message from '../ManualImg/message.png';
import messageHistory from '../ManualImg/messageHistory.png';

const Assignment = () => {
    return(
        <>
         <section id="assignment">
             <Box>
             <Container>
            <Card>
                <CardHeader title={
                    <Typography variant="h5">
                        Under Assignments Tab, the client can view the processing progress of the query.
                        </Typography>
                }/>
               
                    <CardContent>
                        <CardMedia src={assignmentImage} component="img" />
                        <Typography variant="body1">
                       After the Mazars Team has sent online draft reports for discussion with the client, following screen will be visible to the client.
                        An email will also be sent to the client every time any draft report is uploaded
                        </Typography>
                        <CardMedia src={assignmentImage2} component="img" />
                    </CardContent>
                
            </Card>
        </Container>
        <Typography variant="h6" align = "center">
            39
        </Typography>
                 </Box>
       
       <Box>
       <Container>
            <Card>
                    <CardContent>
                        <Typography variant="body1">
                      Under the Deliverable, by clicking on the view all report icon  
                      <Button><CardMedia src={pdfIconImage} component="img" style={{width: "20px", height: "20px" }}/></Button>   the draft reports can be viewed & 
                      downloaded by the client. Following screen will be visible to the client.
                        </Typography>
                        <CardMedia src={assignmentImage21} component="img" />
                        <Typography variant="body1">
                    After clicking on  <Button><CardMedia src={pdfIconImage} component="img" style={{width: "20px", height: "20px" }}/></Button>    following screen will be visible
                        </Typography>
                        <CardMedia src={assignmentImage31} component="img" />
                    </CardContent>
               
            </Card>
        </Container>
        <Typography variant="h6" align = "center">
            40
        </Typography>
           </Box>
        
        <Box>
            <Container>
                <Card>
                    <CardContent>
                    <table className="table table-bordered p-2">
                <tr>
        <th><CardMedia  component="img"
        src={rightClickIcon} style={{height: "20px",  width : "20px"}} /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Client can accept the draft report by clicking on this icon. </Typography>
                </li>
                
            </ul>
        </td>
    </tr>
            <tr>
        <th><CardMedia  component="img"
        src={message} style={{height: "20px",  width : "20px"}} /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    In case client wants amendment in the draft report, he can send his suggestion(s) by clicking this icon. The client can also seek meeting
                     with the Mazars Team for discussion on the draft report by sending the message. 
                      </Typography>
                </li>
                
            </ul>
        </td>
    </tr>
    <tr>
        <th><CardMedia  component="img"
        src={downloadIcon} style={{height: "20px",  width : "20px"}} /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    The client can also himself make changes in the draft report incorporating his suggestion & upload it for review by
                     the Mazars Team. Only one file can be uploaded against each draft report.</Typography>
                </li>
                
            </ul>
        </td>
    </tr>
            </table>
            <Typography variant="body1">
                      After the discussion on draft report(s) is completed, Mazars Team will mark the progress status of assignment as draft report completed & will move on to finalization of the report. 
                      At this stage, further discussion with the client may take place, if required.</Typography>
                      <CardMedia src={finalAssignment} component="img" />
                    </CardContent>
                </Card>
            </Container>
            <Typography variant="h6" align = "center">
                41
            </Typography>
            </Box>



<Box>
    <Container>
        <Card>
            <CardContent>
            <Typography variant="body1">
                        After such discussion, final reports are uploaded by the Mazars Team & are visible to the client under the deliverable’s icon   
                        <CardMedia src={pdfIconImage} component="img" style={{width: "30px", height: "30px" }}/>  as below. An email alert will also
                         be sent to the client confirming such uploading of final reports
                      </Typography>
                      <CardMedia src={pdfAssignmentImg} component="img" />
                      <Typography variant="body1">
After clicking on   
<Button>
<CardMedia src={pdfIconImage} component="img" style={{widht: "30px", height: "30px" }} />
    </Button>     following screen will be visible showing final report.
                       
                      </Typography>
                      <CardMedia src={fileProcessImg} component="img" />
            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align = "center">
                42
            </Typography>
    </Box>
     
    <Box>
        <Container>
            <Card>
                <CardContent>
                <Typography variant="body1">
                    After delivery of final reports, Mazars Team will mark the progress status of 
                    assignment as delivery of final report completed, below screen will be visible
                        </Typography>
                        <CardMedia src={assignment3} component="img"/>
                        <Typography variant="body1">
                    On receipt of full payment from the client, Mazars Team will mark 
                    awaiting completion as completed & following screen will be visible to the client
                   </Typography>
                   <CardMedia src={assignment4} component="img"/>
                </CardContent>
            </Card>
        </Container>
        <Typography variant="h6" align = "center">
                43
            </Typography>
        </Box>   
       
        
       <Box>
           <Container>
               <Card>
                   <CardContent>
                   <Typography variant="body1">
                    The Assignment tab under the query details will show following information.
                     </Typography>
                     <CardMedia src={assignmentQuery} component="img"/>
                     <Typography variant="body1">
                 Query Detail Page: Assignment
                 </Typography>
                 <table className="table table-bordered p-2">
                     <tr>
                         <td>Assignment Number</td>
                         <td>Shows the unique assignment number allotted to the query for ease of tracking.</td>
                     </tr>
                     <tr>
                         <td>Assignment date</td>
                         <td>Shows the date on which the assignment has been created, i.e., date of acceptance of proposal. </td>
                     </tr>
                     <tr>
                         <td>Proposed date of completion</td>
                         <td>Shows the expected date of completion of assignment.</td>
                     </tr>
                     <tr>
                         <td>Assignment Status</td>
                         <td>Shows different stages of progress of the assignment.</td>
                     </tr>
                     <tr>
                         <td>Time taken to complete the assignment </td>
                         <td>Shows the number of days taken to complete the assignment.</td>
                     </tr>
                     </table>
                   </CardContent>
               </Card>
           </Container>
           <Typography variant="h6" align = "center">
                44
            </Typography>
           </Box>
        <Box>
            <Container>
                <Card>
                    <CardContent>
                    <Typography variant="body1">
                    Under Payment Status tab, following screen will be visible after acceptance of proposal.  </Typography>
                    <CardMedia src={seeProposal} component="img"/>
                    <Typography variant="body1">
                 Under Payment Status tab, following action buttons are visible
                 </Typography>
                    </CardContent>
                    <table className="table table-bordered p-2">
                     <tr>
                         <td><CardMedia component="img" src={paymentHistory} style={{width: "20px", height: "20px" }}/></td>
                         <td>By clicking on this icon, the client can view the invoice and make the payment.</td>
                     </tr>
                     <tr>
                     <td><CardMedia component="img" src={message} style={{width: "20px", height: "20px" }}/></td>
                         <td>Shows the date on which the assignment has been created, i.e., date of acceptance of proposal. </td>
                     </tr>
                     <tr>
                     <td><CardMedia component="img" src={messageHistory} style={{width: "20px", height: "20px" }}/></td>
                         <td>By clicking on this icon, the client can view the history of messages exchanged with the Mazars Team.</td>
                     </tr>
                   
                     </table>
                     <Typography variant="body1">
                    TL name column displays the name of Team Leader.
                    </Typography>
                </Card>
            </Container>
            <Typography variant="h6" align = "center" id="paymentProcess">
                45
            </Typography>
            </Box>
       
        
        </section>
        </>
    )
}
export default Assignment