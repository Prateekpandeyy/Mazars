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
      

    }))
    const classes = useStyle()
    return (
        
        <>
        <section id="queryProcessing">
       <Box>
       <Container>
     
     <Card>
         <CardHeader title={
             <>
               <Typography variant="h4" align="center">
     Processing of query by Mazars Team.
     </Typography>
             <Typography variant="h5">
             Mazars Team will as quickly as possible allocate the query to a Team Leader for processing. 
             Before any query is allocated to Team Leader, following status and action buttons
              will be visible in the query tab (S.No. 1 of the list in the screenshot)
             </Typography>
             <Typography variant="h5">
             Once query is allocated to a Team leader, following status & action buttons will be visible 
             for the query in the query tab (S.No. 2 of the list in the screenshot)
                 </Typography>
              
             </>
         }/>
         <CardContent>
         <CardMedia component="img" src={processImg}/>
         <Typography variant="h4">
                        Query Tab: Action Buttons:
                        </Typography>
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
      <Typography variant="h6" align = "center  ">
          25
      </Typography>
           </Box>
      <Box>
          <Container>
              <Card>
                  <CardContent>
                  <Typography variant="h4">
                   Action Button: Upload Additional Documents
                    <Button variant="contained">
                    <CardMedia src={downloadImg} component="img" />
                    </Button>
                       </Typography>
                       <Typography variant="h4">
                        After clicking on upload additional documents icon,
                         upload documents message window will appear, click on ,
                         <Button variant="contained">Choose Files </Button> 
                         select the file(s) to be uploaded & click on
                         <Button variant="contained">Submit </Button> 
                            </Typography>
                        <CardMedia src={uploadMedia} component="img"  />
                        <Typography variant="h4">
                        After clicking on  <Button variant="contained">Submit </Button>  success message window
                         will appear, showing name of the file(s) & uploaded successfully message. Click ok
                        </Typography>
                  </CardContent>
              </Card>
          </Container>
          <Typography variant="h6" align = "center">
              26
          </Typography>
          </Box>
<Box>
    <Container>
        <Card>
            <CardContent>
            <CardMedia src={customerQuery} component="img"/>
            <Typography variant="h4">
                        In case of any attempt to upload any document/file,
                         already uploaded, following message will be displayed upon clicking 
                         on <Button variant="contained">Submit </Button> 
                      </Typography> 
                      <CardMedia src={uploadedImg} component="img"/>
                      <Typography variant="h4">
                   Action Button: Send Feedback
                    <Button variant="contained">
                    <CardMedia src={feedbackImg} component="img" />
                    </Button>
                       </Typography>
                       <Typography variant="h4">
                        After clicking on Feedback icon, Feedback message window will appear.
                         Provide your feedback and click on   <Button variant="contained">Submit </Button> 
                          . Feedback will be sent to the Mazars Team
                       
                            </Typography>
            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align = "center">
              27
          </Typography>
    </Box>

    <Box>
    <Container>
        <Card>
            <CardContent>
            <CardMedia src={customerQuery} component="img"/>
           
                            <Typography variant="h4">
                            The client can send feedback from different tabs/windows where
                             feedback icon is available.
                                </Typography>
                        <CardMedia src={feedbackImage} component="img"  />
                        <Typography varinat="h4">
              After clicking on <Button variant="contained">Submit </Button>  success message window will
               appear showing “Feedback sent successfully”. Click ok.
              </Typography>
              <CardMedia src={successFeedback} component="img"  /> 
            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align = "center">
              28
          </Typography>
    </Box>
        </section>
        
        </>
    )
}
export default QueryProcessing;