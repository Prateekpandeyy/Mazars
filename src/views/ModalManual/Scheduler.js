import React from 'react';
import {Box, makeStyles, Button, Typography, Card, Container, CardHeader, CardActionArea, CardActions, CardMedia, CardContent } from '@material-ui/core';
import scheduleImg from '../ManualImg/schedulerImg.png'
import schFormImg from '../ManualImg/schFormImg.png';
import schForm2 from '../ManualImg/schForm2.png';
import videoCallIcon from '../ManualImg/videoCallIcon.png';
import message from '../ManualImg/message.png';
const Scheduler = () => {
    const useStyle = makeStyles(theme => ({
        root : {
            backgroundColor : "skyblue", 
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
           <section>
               <Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
                   <Container maxWidth= "xl">
                       <Card>
                           <CardHeader  title={
                                 <Typography variant="h5">
                                 For organizing Video conferences or meetings with the client & the Mazars Team members,
                                  schedule facility may be used. Whenever, any meeting is organized by the Mazars Team 
                                  on the request of client or otherwise, it will be visible to the client as below.
                                  An email alert will also be sent to the client informing scheduling of the meeting.
                                 </Typography>
                           }/>
                           <CardContent>
                         
                     <CardMedia src={scheduleImg} component="img"/>
                     <Typography variant="body1">
                  Schedule: By double clicking on the meeting schedule other than 
                  the camera icon the client can view full details of the meeting
                   including the <Button variant="contained" className={classes.root}> Discussion on </Button>
                 participants as per the below screen. 
                      </Typography>
                      <CardMedia src={schFormImg} component="img"/>
                           </CardContent>
                       </Card>
                   </Container>
                   <Typography variant="h6" align = "center">
                       71
                   </Typography>
                   </Box>
    
    
<Box id= "schMeeting" style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
    <Container maxWidth= "xl">
        <Card>
            <CardContent>
            <Typography variant="body1">
                  The client may join the meeting by clicking on 
                  <Button variant="contained" className={classes.root}> <CardMedia src={videoCallIcon} component="img" style={{width: "20px", height: "20px" }}/></Button>     , at the scheduled date & time.
</Typography>
<CardMedia src={schForm2} component="img"/>
 
<Typography variant="body1">
                    The client can make request for meeting with the Mazars Team by 
                    sending message after clicking message icon  
                   <CardMedia component="img" src={message} style={{display : "inline", margin : "0px 10px", width : "20px"}}/>   
                    available in different tabs. During such meeting the client will 
                    be able to discuss and present documents for discussion in the meeting.

                    </Typography>
            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align = "center" id = "feedbackProcess">
                       72
                   </Typography>
    </Box>

   
     </section>
        </>
    )
}
export default Scheduler;