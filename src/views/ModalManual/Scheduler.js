import React from 'react';
import { makeStyles, Button, Typography, Card, Container, CardHeader, CardActionArea, CardActions, CardMedia, CardContent } from '@material-ui/core';
import scheduleImg from '../ManualImg/schedulerImg.png'
import schFormImg from '../ManualImg/schFormImg.png';
import schForm2 from '../ManualImg/schForm2.png';
import videoCallIcon from '../ManualImg/videoCallIcon.png';
import message from '../ManualImg/message.png';
const Scheduler = () => {
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
           <section id="seceduler">
     <Container>
         <Card>
             <CardHeader title={
                 <>
                  <Typography variant="h4">
                     For organizing Video conferences or meetings with the client & the Mazars Team members,
                      schedule facility may be used. Whenever, any meeting is organized by the Mazars Team 
                      on the request of client or otherwise, it will be visible to the client as below.
                      An email alert will also be sent to the client informing scheduling of the meeting.
                     </Typography>
                 </>
             }/>
             <CardActionArea>
                 <CardContent>
                    <CardMedia src={scheduleImg} component="img"/>
                 </CardContent>
             </CardActionArea>
         </Card>
     </Container>
     <Container>
         <Card>
             <CardHeader title={
                 <>
                  <Typography variant="h4">
                  Schedule: By double clicking on the meeting schedule other than 
                  the camera icon the client can view full details of the meeting
                   including the <Button variant="contained" className={classes.root}> Discussion on </Button>
                 participants as per the below screen. 
                      </Typography>
                 </>
             }/>
             <CardActionArea>
                 <CardContent>
                    <CardMedia src={schFormImg} component="img"/>
                 </CardContent>
             </CardActionArea>
         </Card>
     </Container>
     <Container>
         <Card>
             <CardHeader title={
                 <>
                  <Typography variant="h4">
                  The client may join the meeting by clicking on 
                  <Button variant="contained" className={classes.root}> <CardMedia src={videoCallIcon} component="img" style={{width: "20px", height: "20px" }}/></Button>     , at the scheduled date & time.
                 
               
                      </Typography>
                 </>
             }/>
             <CardActionArea>
                 <CardContent>
                    <CardMedia src={schForm2} component="img"/>
                    <Typography variant="h4">
                    The client can make request for meeting with the Mazars Team by 
                    sending message after clicking message icon  
                    <Button><CardMedia component="img" src={message} /></Button>    
                    available in different tabs. During such meeting the client will 
                    be able to discuss and present documents for discussion in the meeting.

                    </Typography>
                 </CardContent>
             </CardActionArea>
         </Card>
     </Container>
     </section>
        </>
    )
}
export default Scheduler;