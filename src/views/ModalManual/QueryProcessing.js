import React from 'react';
import {Box, Container, Button, Typography,  Card, CardHeader, CardActionArea, CardContent, CardActions, CardMedia} from "@mui/material";
import processImg from "../ManualImg/processImg.png";
import img1234 from '../ManualImg/feedback.png';
import downloadImg from '../ManualImg/downloadImg.png';
import message from '../ManualImg/message.png';
import messageHistory from '../ManualImg/messageHistory.png';
import uploadMedia from '../ManualImg/uploadMedia.png';
import customerQuery from '../ManualImg/customerQuery.png';
import uploadedImg from "../ManualImg/uploadedImg.png";
import feedbackImg from '../ManualImg/feedback.png';
import feedbackImage from '../ManualImg/feedbackImage.png';
import successFeedback from '../ManualImg/successFeedback.png';
import { makeStyles } from '@material-ui/styles';
const QueryProcessing = () => {
    const useStyle = makeStyles(theme => ({
        root: {
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
      

    }))
    const classes = useStyle()
    return (
        
        <>
        <section id="queryProcessing">
       <Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
  
       <Container maxWidth= "xl">
     
     <Card>
     <CardHeader title={
                    <Typography variant="h5" align="center">
                   Processing of query by MAS Team
                            </Typography>
        }/>
         <CardContent>
       
         <Typography variant="body1">
         MAS Team will as quickly as possible allocate the query to a Team Leader for
processing. Before any query is allocated to Team Leader, following status and
action buttons will be visible in the query tab (S.No. 1 of the list in the screenshot). 
                </Typography>
                <Typography variant="body1">
                Once query is allocated to a Team leader, following status & action buttons will be
visible for the query in the query tab (S.No. 2 of the list in the screenshot).
                </Typography>
                <Typography variant="body1">
                The client can send a message to the MAS Team specifying the secondary email
user(s) to whom copy of proposal may also be sent along with the email message
confirming submission of proposal.
                   </Typography>
         <CardMedia component="img" src={processImg} style={{margin: "10px 0px"}}/>
         {/* <Typography variant="body1">
                        Query Tab: Action Buttons:
                        </Typography> */}
                                   <CardHeader title={
                <Typography variant='span' variantMapping={{
                    h5 : "span"
                }} className="modalTextHeading" id="forgetPassword">
    Query Tab: Action Buttons:                                      
</Typography>
             }/>
                        <table className="table table-bordered p-2">

<tbody>
    
    <tr>
        <th><CardMedia  component="img"
        src={img1234} style={{height: "30px",  width : "30px"}} /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Click to send feedback to Mazars Team
                </Typography>
                </li>
                
            </ul>
        </td>
    </tr>
    <tr>
        <th><CardMedia  component="img"
        src={downloadImg} style={{height: "30px",  width : "30px"}} /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Click to upload additional documents
                </Typography>
                </li>
                
            </ul>
        </td>
    </tr>
    <tr>
        <th><CardMedia  component="img"
        src={message} style={{height: "30px",  width : "30px"}} /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Click to send message to the Mazars Team
                </Typography>
                </li>
                
            </ul>
        </td>
    </tr>
    <tr>
        <th><CardMedia  component="img"
        src={messageHistory} style={{height: "30px",  width : "30px"}} /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Click to view history of messages exchanged with the Mazars Team
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
      
           </Box>
           <Typography variant="h6" align = "center  ">
          36
      </Typography>
      <Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
  
          <Container maxWidth= "xl">
              <Card>
                  <CardContent>
                  <CardHeader title={
                <Typography variant='span' variantMapping={{
                    h5 : "span"
                }} className="modalTextHeading" id="forgetPassword">
   Action Button: Upload Additional Documents
                    <Button variant="contained">
                    <CardMedia src={downloadImg} component="img" />
                    </Button>                                     
</Typography>
                  }/>
                       <Typography variant="body1">
                        After clicking on upload additional documents icon,
                         upload documents message window will appear, click on ,
                         <Button variant="contained">Choose Files </Button> 
                         select the file(s) to be uploaded & click on
                         <Button variant="contained">Submit </Button> 
                            </Typography>
                        <CardMedia src={uploadMedia} component="img" style={{margin : "10px 0px"}}  />
                        <Typography variant="body1">
                        After clicking on  <Button variant="contained">Submit </Button>  success message window
                         will appear, showing name of the file(s) & uploaded successfully message. Click ok
                        </Typography>
                        <CardMedia src={customerQuery} component="img" style={{margin : "10px 0px"}}/>
                  </CardContent>
              </Card>
          </Container>
         
          </Box>
          <Typography variant="h6" align = "center">
              37
          </Typography>
<Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
  
    <Container maxWidth= "xl">
        <Card>
            <CardContent>
           
            <Typography variant="body1">
                        In case of any attempt to upload any document/file,
                         already uploaded, following message will be displayed upon clicking 
                         on <Button variant="contained">Submit </Button> 
                      </Typography> 
                      <CardMedia src={uploadedImg} component="img" style={{margin : "10px 0px"}}/>
                     
            </CardContent>
        </Card>
    </Container>
   
    </Box>
    <Typography variant="h6" align = "center">
              38
          </Typography>
    <Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
  
    <Container maxWidth= "xl">
        <Card>
            <CardContent>
            <CardHeader title={
                <Typography variant='span' variantMapping={{
                    h5 : "span"
                }} className="modalTextHeading" id="forgetPassword">
    Action Button: Send Feedback
                    <Button variant="contained">
                    <CardMedia src={feedbackImg} component="img" />
                    </Button>                                     
</Typography>
                  }/>
            <Typography variant="body1">
                
                 
                       </Typography>
                      
                            <Typography variant="body1">
                            The client can send feedback from different tabs/windows where
                             feedback icon is available.
                                </Typography>
                        <CardMedia src={feedbackImage} component="img" style={{margin : "10px 0px"}} />
                        <Typography varinat="body1">
              After clicking on <Button variant="contained">Submit </Button>  success message window will
               appear showing “Feedback sent successfully”. Click ok.
              </Typography>
              <CardMedia src={successFeedback} component="img"  /> 
            </CardContent>
        </Card>
    </Container>

    </Box>
    <Typography variant="h6" align = "center" id="proposalProcessing">
              39
          </Typography>
        </section>
        
        </>
    )
}
export default QueryProcessing;