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
             <Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
             <Container maxWidth= "xl">
            <Card>
                <CardHeader title={
                    <Typography variant="h5">
                        Under Assignments Tab, the client can view the processing progress of the query.
                        </Typography>
                }/>
               
                    <CardContent>
                        <CardMedia src={assignmentImage} component="img" />
                       
                       
                    </CardContent>
                
            </Card>
        </Container>

                 </Box>
                 <Typography variant="h6" align = "center">
            52
        </Typography>
       <Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
       <Container maxWidth= "xl">
            <Card>
                    <CardContent>
                    <Typography variant="body1" style={{margin : "10px 0px"}}>
                        After the MAS Team has sent online draft reports for discussion with the client, following screen will be visible to the client. An email will also be sent
                         to the client every time any draft report is uploaded along with the draft report(s).
                        </Typography>
                        <Typography variant="body1" style={{margin : "10px 0px"}}>
                        The client can send a message specifying the secondary email users to whom draft reports may also be sent. Upon such request, email will be sent to such 
                        secondary email users along with copy of draft reports
                       </Typography>
                        <CardMedia src={assignmentImage2} component="img" style={{margin : "10px 0px"}} />
                       
                    </CardContent>
               
            </Card>
        </Container>
       
           </Box>
           <Typography variant="h6" align = "center">
            53
        </Typography>
        <Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
            <Container maxWidth= "xl">
                <Card>
                    <CardContent>
                    <Typography variant="body1">
                        Under the Deliverable, by clicking on the view all report icon
                    <CardMedia src={pdfIconImage} component="img" style={{display : "inline", width: "20px", height: "20px", margin : "0px 5px" }}/>
                      the draft reports can be viewed & 
                      downloaded by the client. Following screen will be visible to the client.
                        </Typography>
                        <CardMedia src={assignmentImage21} component="img" />
                        <Typography variant="body1">
                    After clicking on  <Button><CardMedia src={pdfIconImage} component="img" style={{width: "20px", height: "20px" }}/></Button>  
                      following screen will be visible
                        </Typography>
                        <CardMedia src={assignmentImage31} component="img" />
                     </CardContent>
                </Card>
            </Container>
            <Typography variant="h6" align = "center">
                54
            </Typography>
            </Box>
            <Typography variant="h6" align = "center">
            54
        </Typography>


<Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
    <Container maxWidth= "xl">
        <Card>
            <CardContent>
            <CardHeader title={
                    <Typography variant="h5">
                       
                       View all Reports: Action Buttons</Typography>
                }/>
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
            After the discussion on draft report(s) is completed, MAS Team will mark the 
            progress status of assignment as draft report completed & will move on to finalization of the report.
             At this stage, further discussion with the client may take place, if required.
                     </Typography>
                       <CardMedia src={finalAssignment} component="img" />
                   
           
                      <Typography variant="h6" align = "center">
            56
        </Typography>
                      <Typography variant="body1">
After clicking on   

<CardMedia src={pdfIconImage} component="img" style={{display : "inline", margin : "0px 10px", width: "30px", height: "30px" }} />
     following screen will be visible showing final report.
                       
                      </Typography>
                      <CardMedia src={fileProcessImg} component="img" />
            </CardContent>
        </Card>
    </Container>
   
    </Box>
    <Typography variant="h6" align = "center">
            55
        </Typography>
    <Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
        <Container maxWidth= "xl">
            <Card>
                <CardContent>
                <Typography variant="body1" style={{margin : "10px 0px"}}>
            After such discussion, final reports are uploaded by the MAS Team & are visible to the client under the deliverable’s icon
                        <CardMedia src={pdfIconImage} component="img" style={{display : "inline", margin : "0px 10px", width: "30px", height: "30px" }}/>  as below. An email alert will also
                        s below. An email will be sent to 
                        the client along with the final reports as & when uploaded by the MAS Team.
                      </Typography>
                      <Typography variant="body1" style={{margin : "10px 0px"}}>
                      The client can also specify the secondary email users by sending message to the MAS Team. An email will be sent to all such secondary email users along with the final reports as & when uploaded by the MAS Team.

                          </Typography>
                          <Typography variant="body1" style={{margin : "10px 0px"}}>
                          An email alert will also be sent to the client & all secondary email users confirming   uploading of all final reports.
                              </Typography>
                      <CardMedia src={pdfAssignmentImg} component="img" />
               
                </CardContent>
            </Card>
        </Container>
        
        </Box>   
        <Typography variant="h6" align = "center">
            56
        </Typography>
        <Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
        <Container maxWidth= "xl">
               <Card>
                   <CardContent>
                   <Typography variant="body1">
                After delivery of final reports, MAS Team will mark the progress status of assignment
                 as delivery of final report completed, below screen will be visible.
                    </Typography>
                        <CardMedia src={assignment3} component="img"/>
                       </CardContent>
               </Card>
           </Container>
           </Box>
           <Typography variant="h6" align = "center">
            57
        </Typography>
       <Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
           <Container maxWidth= "xl">
               <Card>
                   <CardContent>
                   <Typography variant="body1">
                        On receipt of full payment from the client, MAS Team will mark awaiting
                         completion as completed & following screen will be visible to the client.</Typography>
                   <CardMedia src={assignment4} component="img"/>
                  
                   <Typography variant="body1">
                    The Assignment tab under the query details will show following information.
                     </Typography>
                   
                   </CardContent>
               </Card>
           </Container>
          
           </Box>
           <Typography variant="h6" align = "center">
                58
            </Typography>

            <Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
           <Container maxWidth= "xl">
               <Card>
                   <CardContent>
                   <CardMedia src={assignmentQuery} component="img"/>
                   <CardHeader title={
                    <Typography variant="h5">
                        Query Detail Page: Assignment </Typography>
                }/>
               
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
          
           </Box>
           <Typography variant="h6" align = "center">
                59
            </Typography>
        <Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
            <Container maxWidth= "xl">
                <Card>
                    <CardContent>
                    <CardHeader title={
                    <Typography variant="h5">
                      Under Payment Status tab, following screen will be visible after acceptance of proposal.  
                       </Typography>
                }/>
                   
                    <CardMedia src={seeProposal} component="img"/>
                    <CardHeader title={
                    <Typography variant="h5">
                      Under Payment Status tab, following action buttons are visible
                       </Typography>
                }/>
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
                     Note: All actions for payment can be taken by any of the secondary email users along with the client.

                    </Typography>
                </Card>
            </Container>
           
            </Box>
            <Typography variant="h6" align = "center" id="paymentProcess">
                60
            </Typography>
        
        </section>
        </>
    )
}
export default Assignment