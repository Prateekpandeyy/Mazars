import {  Typography, Button, Card, Container, CardHeader, CardActionArea, CardActions, CardMedia, CardContent , Box} from "@material-ui/core";
import React from "react";
import rightArrow from '../ManualImg/rightArrow.png';
import proposalView from '../ManualImg/proposalView.png';
import showProposal from '../ManualImg/showProposal.png';
import proposalView2 from '../ManualImg/proposalView2.png';
import message from '../ManualImg/message.png';
import messageHistory from '../ManualImg/messageHistory.png';
import viewProposalsign from '../ManualImg/viewProposalsign.png';
import showProposal22 from '../ManualImg/showProposal22.png';
import proposalSeen from '../ManualImg/proposalSeen.png';
import proposalSeen2 from '../ManualImg/proposalSeen2.png';
import acceptProposal from '../ManualImg/acceptProposal.png';
import acceptProposal22 from '../ManualImg/acceptProposal22.png';
import proposalConfirm from '../ManualImg/proposalConfirm.png';
import rejectProposal from '../ManualImg/rejectProposal.png';
import proposal221 from '../ManualImg/proposal221.png';
import rejectProposalView from '../ManualImg/rejectProposalView.png';
import restoredProposalView from '../ManualImg/restoredProposalView.png';
import restoredQueryView2 from '../ManualImg/restoredQueryView2.png';
import restoredQueryView3 from '../ManualImg/restoredQueryView3.png';
import restoredQueryView from '../ManualImg/restoredQueryView.png'
import {makeStyles } from '@material-ui/core/styles';
const Proposal = () => {
    const useStyle = makeStyles(theme => ({
        root: {
            backgroundColor: "green",
            color: "white",
            margin: "10px 0px",
            outline: "none",
            '&:hover': {
                backgroundColor: "green",
                color: "white",
                outline: "none"
            },
            '&:focus': {
                backgroundColor: "green",
                color: "white",
                outline: "none"
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
            backgroundColor: "red",
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
    return (
        <>
         <section id="proposal">
             <Box>
                 <Container>
                     <Card>
                     <CardHeader title={
                    <Typography variant="h5" align="center">
                    Processing of Proposal
                            </Typography>
        }/>
                        <CardContent>
                <Typography variant="body1">
                Mazars Team, after examining the query, will prepare a proposal & provide it to the client.
                 An email will also be sent to the client informing about the proposal sent
                </Typography>
                <Typography variant="body1">
                By selecting the Proposal Tab, on the left-hand side of the following screen, the client can 
                view the proposal, by clicking on the blue arrow facing rightwards
                <Button><CardMedia src={rightArrow} component="img" style={{width: "30px", height: "30px"}} /></Button>
                </Typography>
                <CardMedia src={proposalView} component="img" />
                <Typography variant="body1">
                After clicking on blue arrow facing rightwards (   <Button><CardMedia src={rightArrow} component="img" style={{width: "30px", height: "30px"}} /></Button>), 
                following window will appear:
             
                </Typography>
                <CardMedia src={showProposal} component="img" />
              
            </CardContent>
                     </Card>
                 </Container>
                 <Typography variant="h6" align="center">
                     29
                 </Typography>
                 </Box>
                 

                 <Box>
                     <Container>
                         <Card>
                             <CardContent>
                             <Typography variant="body1">
                Engagement letter box should be checked to view the engagement letter before accepting 
                or rejecting the proposal by pressing the    
                      <Button varinat="contained" className={classes.root}>Accept</Button>   or    
                      <Button varinat="contained" className={classes.root3}>Reject</Button>        
                       button respectively. The client can also take no action on the proposal by clicking on  
                       <Button varinat="contained" className={classes.root2}>Go Back</Button> button.
                </Typography>
                <Typography variant="body1">
                Upon checking the engagement letter box,
                 proposed engagement letter will be displayed.
                </Typography>
                <Typography variant="body1">
                Acceptance of proposal by the client will amount to acceptance
                 of Engagement letter.
                </Typography>
                <Typography variant="body1">
                Before deciding about the proposal, the client can send message to the Mazars Team for any discussion about the proposal and may accept or reject the proposal after such discussion. Conference can also be done by the Mazars Team with the client for any discussion. The Mazars 
                Team may amend the proposal and submit fresh proposal after such discussion/conference.
                </Typography>
                <Typography variant = "body1">
                Under Proposal Tab, various action buttons will appear as per the screen below:
                </Typography>
                <CardMedia src={proposalView2} component="img"/>
                <table className="table table-bordered p-2">

<tbody>
    
    
    <tr>
        <th><CardMedia  component="img"
        src={message} style={{height: "20px",  width : "20px"}} /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    By clicking on this icon, the client can send
                     message to the Mazars Team regarding any query
                </Typography>
                </li>
                
            </ul>
        </td>
    </tr>
    <tr>
        <th><CardMedia  component="img"
        src={messageHistory} style={{height: "20px",  width : "20px"}} /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    By clicking in this icon, the client can view the messages
                     history with the Mazars Team
                </Typography>
                </li>
                
            </ul>
        </td>
    </tr>
    <tr>
        <th><CardMedia  component="img"
        src={rightArrow} style={{height: "20px",  width : "20px"}} /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    By clicking on this icon, the client can view proposal and its details
                </Typography>
                </li>
                
            </ul>
        </td>
    </tr>
    <tr>
        <th><CardMedia  component="img"
        src={viewProposalsign} style={{height: "20px",  width : "20px"}} /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    By clicking on this icon, the client can view the Engagement letter
                </Typography>
                </li>
                
            </ul>
        </td>
    </tr>
    </tbody>
    </table>    
                             </CardContent>
                         </Card>
                     </Container>
                     <Typography variant="h6" align="center">
                         30
                     </Typography>
                     </Box>
        
        <Box>
            <Container>
                <Card>
                    <CardContent>
                   
           
           <table className="table table-bordered p-2">
       
       <tbody>
           
           
           <tr>
               <th>Status</th>
               <th>Interpretation</th>
               <th>Screenshot listing</th>
           </tr>
           <tr>
              <td>In-progress; Preparation</td>
              <td>Mazars Team is preparing the proposal</td>
              <td>At S.No. 1</td>
           </tr>
           <tr>
              <td>In-progress; Acceptance</td>
              <td>Mazars Team has sent the proposal to the client which is
                   awaiting acceptance.</td>
                   <td>At S.No.2</td>
           </tr>
           <tr>
               <td>Declined; Proposal</td>
               <td>Client has rejected the Proposal</td>
               <td>At S.No.3</td>
           </tr>
           <tr>
               <td>Accepted; Proposal</td>
               <td>Client has accepted the proposal.</td>
               <td>At S.No.4</td>
           </tr>
           </tbody>
           </table>        
           <CardMedia component="img" src={showProposal22}/>   
                    </CardContent>
                </Card>
            </Container>
            <Typography variant="h6" align="center">
                         31
                     </Typography>
            </Box>

<Box>
    <Container>
        <Card>
            <CardContent>
            <Typography variant="body1">
            By selecting the Engagement Letter checkbox, the proposal can be viewed and on
the basis of terms and conditions mentioned in the proposal, the client can make the decision by clicking on 
           <Button variant="container" className={classes.root}>Accept</Button>             or            
           <Button variant="contained" className={classes.root3}>Reject</Button>
                </Typography>
                <CardMedia  src={proposalSeen} component="img"/>
                <CardMedia src={proposalSeen2} component="img" />
            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align="center">
                         32
                     </Typography>
    </Box>
<Box>
    <Container>
        <Card>
           <CardContent>
           <Typography variant="body1">
            If the proposal is acceptable, click  <Button variant="container" className={classes.root}>Accept</Button>                 button. Upon acceptance,
             following success message window will appear showing “Proposal accepted successfully”.
                  or            
         
                </Typography>
                <CardMedia  src={acceptProposal} component="img"/>
                <Typography variant="body1">
            fter acceptance of proposal, action button right arrow (<CardMedia  component="img"
        src={rightArrow} style={{height: "20px",  width : "20px"}} />)
             will disappear & new eye button (<CardMedia  component="img"
        src={viewProposalsign} style={{height: "20px",  width : "20px"}} />) will appear to view the accepted proposal as below:
                </Typography>
                <CardMedia  src={acceptProposal22} component="img"/>
               </CardContent> 
        </Card>
    </Container>
    <Typography variant="h6" align="center">
                         33
                     </Typography>
    </Box>
<Box>
    <Container>
        <Card>
            <CardContent>
            <table className="table table-bordered p-2">
            <tr>
        <th><CardMedia  component="img"
        src={viewProposalsign} style={{height: "20px",  width : "20px"}} /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    By clicking on this icon, the client can view the Engagement letter as accepted 
                    by him. His acceptance is also recorded on such engagement letter electronically.
                </Typography>
                </li>
                
            </ul>
        </td>
    </tr>
            </table>
            <Typography variant="body1">
            If the proposal is not acceptable, click          
            <Button variant="contained" className={classes.root3}>Reject</Button>   button. Rejection message window will appear showing “Are you sure to reject Proposal?”    </Typography>
            <CardMedia  src={proposalConfirm} component="img"/>
            <Typography variant="body1">
            The client can still review the proposal & go back by clicking 
            <Button className={classes.root3}>Cancel</Button>         button. If sure to reject, click 
            <Button variant="contained" className={classes.root}>Yes Reject it</Button>  
                            . Upon such rejection following message will appear. Click ok  
                            </Typography>
                            <CardMedia  src={rejectProposal} component="img"/>
            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align="center">
                         34
                     </Typography>
    </Box>


<Box>
    <Container>
        <Card>
            <CardContent>
            <Typography variant="body1">
            Upon rejection of proposal, following screen will be visible in the Proposal tab details.  
                            </Typography> 
                            <CardMedia  src={proposal221} component="img"/>
                            <Typography variant="body1">
            In case of client inadvertently rejecting the proposal,
             he may send message to the Mazars Team for restoring the pending proposal status by clicking on 
             <Button> <CardMedia src={message}component="img"/></Button> icon.
(S.No. 1)   </Typography>
<CardMedia  src={rejectProposalView} component="img"/>
            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align="center">
                         35
                     </Typography>
    </Box>


<Box>
    <Container>
        <Card>
            <CardContent>
            <Typography variant="body1">
            After examining the request, Mazars Team may quickly restore the pending proposal status & 
            it will be visible to the client. An email will also be sent to the client .4
              </Typography>
              <CardMedia  src={restoredProposalView} component="img"/>
              <Typography variant="body1">
            After the acceptance of Proposal, Proposal tab under the Query Details will show the following information.
             The client can also download the proposal by clicking download button 
             <Button className={classes.root}>Download</Button></Typography>
             <CardMedia  src={restoredQueryView} component="img"/>
            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align = "center">
         36
    </Typography>
    </Box>
<Box>
    <Container>
        <Card>
            <CardContent>
            <CardMedia src={restoredQueryView2} component="img" />
                <CardMedia src={restoredQueryView3} component="img" />
             
            </CardContent>
        </Card>
    </Container>
    </Box>

<Box>
    <Container>
        <Card>
            <CardContent>
            <Typography variant="body1">
          Query Detail Page: Proposal
              </Typography>
          <table className="table table-bordered p-2">
              <tr>
                  <td>Date of allocation</td>
                  <td>Date of allocation of the query to a Team Leader.</td>
              </tr>
              <tr>
                  <td>Name of Team Leader</td>
                  <td>Shows the Post & Name of the Team Leader.</td>
              </tr>
              <tr>
                  <td>Date of Proposal</td>
                  <td>Date of online sending of proposal to the client by Mazars Team.</td>
              </tr>
              <tr>
                  <td>Scope of Work</td>
                  <td>Scope of work arising from the query.</td>
              </tr>
              <tr>
                  <td>Amount </td>
                  <td>Payment terms maybe fixed or monthly recurring payments.</td>
              </tr>
              <tr>
                  <td>Payment Terms</td>
                  <td>Shows the payment terms, instalment(s) amount(s) & their due dates, if any.</td>
              </tr>
              <tr>
                  <td>Proposed Amount</td>
                  <td>Amount proposed by the Mazars Team for execution of the query.</td>
              </tr>
              <tr>
                  <td>Proposal Status</td>
                  <td>After the proposal is sent to the client, status is shown as in progress & the status changes to accepted or
                       rejected upon acceptance or rejection of the proposal by the client.</td>
              </tr>
              <tr>
                  <td>Amount accepted</td>
                  <td>Amount accepted by the client for execution of the query.</td>
              </tr>
              <tr>
                  <td>Date of Acceptance / Decline</td>
                  <td>Date of acceptance or decline of the proposal by the client.</td>
              </tr>
              <tr>
                  <td>Payment History</td>
                  <td>Shows the details of payment made by the client.</td>
              </tr>
              <tr>
                  <td>Payment Received</td>
                  <td>Shows the total amount paid by the client.</td>
                  </tr>
                  <tr>
                      <td>Payment Outstanding</td>
                      <td>Shows the outstanding amount payable by the client.</td>
                  </tr>
                  <tr>
                      <td>Payment decline reason</td>
                      <td>In case client declines to make payment of outstanding amount, Team Leader can mark the query as payment declined by the client. In this situation, 
                          reasons recorded by the Team Leader for such marking are displayed here.</td>
                  </tr>
                  <tr>
                      <td>
                          <Typography variant="body1" color="primary">
                          (After accepting the proposal, the client can view progress of the query under the assignment tab)
                          </Typography>
                      </td>
                  </tr>
          </table>
            </CardContent>
        </Card>
    </Container>
    <Typography align="center" variant="h6" id="assignProcess">
         38
    </Typography>
</Box>
</section>
</>
    )
}
export default Proposal;