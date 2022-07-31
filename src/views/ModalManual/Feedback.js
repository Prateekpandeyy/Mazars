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
                  <Container maxWidth= "xl">
                      <Card>
                          <CardHeader title={
  <Typography variant="h5">
  Feedback: On clicking feedback  <CardMedia src={feedBackIcon} component="img" style={{display : "inline", margin : "0px 10px",  width: "20px", height: "20px" }}/>
      following screen will display all the feedback messages sent chronologically.
      </Typography>
                          }/>
                          <CardContent>
                        
                      <CardMedia src={feedbackImageDetails} component="img"/>
                          </CardContent>
                      </Card>
                  </Container>
                  <Typography variant="h6" align ="center">
                      73
                  </Typography>
                  </Box>
            
<Box>
    <Container maxWidth= "xl">
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
                      74
                  </Typography>
    </Box>

   
     </section>
        </>
    )
}
export default Feedback;