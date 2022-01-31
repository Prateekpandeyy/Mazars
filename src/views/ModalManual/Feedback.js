import React from 'react';
import { makeStyles, Button, Typography, Card, Container, CardHeader, CardActionArea, CardActions, CardMedia, CardContent } from '@material-ui/core';
import feedbackImageDetails from '../ManualImg/feedbackImageDetails.png'
import feedBackIcon from '../ManualImg/feedback.png';
import feedbackQueryDetails from '../ManualImg/feedbackQueryDetails.png';
const Feedback = () => {
    return(
        <>
          <section id= "feedback">
             <Container>
         <Card>
             <CardHeader title={
                 <>
                  <Typography variant="h4">
                  Feedback: On clicking feedback   <Button variant="contained"> <CardMedia src={feedBackIcon} component="img" style={{width: "20px", height: "20px" }}/></Button>    
                      following screen will display all the feedback messages sent chronologically.
                
                 
               
                      </Typography>
                 </>
             }/>
             <CardActionArea>
                 <CardContent>
                    <CardMedia src={feedbackImageDetails} component="img"/>
                    
                 </CardContent>
             </CardActionArea>
         </Card>
     </Container>
     <Container>
         <Card>
             <CardHeader title={
                 <>
                  <Typography variant="h4">
                  Individual feedback message of any query will also
                   be visible under the feedback tab in query details
                      </Typography>
                 </>
             }/>
             <CardActionArea>
                 <CardContent>
                    <CardMedia src={feedbackQueryDetails} component="img"/>
                    
                 </CardContent>
             </CardActionArea>
         </Card>
     </Container>
     </section>
        </>
    )
}
export default Feedback;