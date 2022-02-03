import React from 'react';
import {Box, makeStyles, Button, Typography,  Card, Container, CardHeader, CardActionArea, CardActions, CardMedia, CardContent } from '@material-ui/core';
import feedbackImageDetails from '../ManualImg/feedbackImageDetails.png'
import feedBackIcon from '../ManualImg/feedback.png';
import feedbackQueryDetails from '../ManualImg/feedbackQueryDetails.png';
const Feedback = () => {
    return(
        <>
          <section id= "feedback">
              <Box>
                  <Container>
                      <Card>
                          <CardHeader title={
  <Typography variant="h5">
  Feedback: On clicking feedback   <Button variant="contained"> <CardMedia src={feedBackIcon} component="img" style={{width: "20px", height: "20px" }}/></Button>    
      following screen will display all the feedback messages sent chronologically.
      </Typography>
                          }/>
                          <CardContent>
                        
                      <CardMedia src={feedbackImageDetails} component="img"/>
                          </CardContent>
                      </Card>
                  </Container>
                  <Typography variant="h6" align ="center">
                      58
                  </Typography>
                  </Box>
            
<Box>
    <Container>
        <Card>
            <CardContent>
            <Typography variant="body1">
                  Individual feedback message of any query will also
                   be visible under the feedback tab in query details
                      </Typography>
                      <CardMedia src={feedbackQueryDetails} component="img"/>
            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align ="center">
                      59
                  </Typography>
    </Box>

   
     </section>
        </>
    )
}
export default Feedback;