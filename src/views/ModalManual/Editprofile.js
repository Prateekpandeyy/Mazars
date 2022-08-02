import React from 'react';
import { makeStyles, Box, Button, Typography, Card, Container, CardHeader,
     CardActionArea, CardActions, CardMedia, CardContent } from '@material-ui/core';
import iconProfile from "../ManualImg/profileIcon.png";
import userProfile from "../ManualImg/userProfile.png";
import EditProfileDash from "../ManualImg/editProDash.png";
import showEdit from "../ManualImg/showEdit.png";
import editProPage from "../ManualImg/editProPage.png";
import editProSuccess from "../ManualImg/editProSuccess.png";
import deleteIcon from '../ManualImg/deleteIcon.png';
import editUpdatepic from '../ManualImg/editUpdate.png';
import addEmail from "../ManualImg/addEmail.png";
import addedEmail from "../ManualImg/addedEmail.png";
import addedEmail2 from "../ManualImg/addedEmail2.png";
import deleteEmail from "../ManualImg/deleteEmail.png";
import deletedEmail from "../ManualImg/deleted.png"
const useStyle = makeStyles(theme => ({
    submitBtn : {
        backgroundColor: "#0071ce",
        color: "white",
        margin: "10px 5px",
        outline: "none",
    }
}))
     function Editprofile () {
         const classes = useStyle()
    return (
      <section id="editProfile">
<Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
    <Container maxWidth = "xl">
        <Card>
        <CardContent>
                        <Typography variant="body1">
                        Edit Profile: To view/edit the profile, click on
                        <CardMedia component="img" src={iconProfile}style={{display : "inline", width : "30px", margin : "0px 5px", height : "30px"}} /> 
                          located at top right side of the screen and further select 
                        <CardMedia component="img" src={userProfile}style={{display : "inline", width : "57px"}} /> 
                          </Typography>
                          <CardMedia component="img" src={EditProfileDash} />
                          <Typography variant="h6">
                          To edit the profile, click on
                         <Button variant="contained" className={classes.submitBtn}>Edit</Button> 
                         Except for user id & email id, all other information can be edited/amended. To save changes click on
                         <Button variant="contained" className={classes.submitBtn}>Save</Button> 
                            </Typography>
                            <CardMedia component="img" src={showEdit} /> 
                            </CardContent>

        </Card>
    </Container>
    <Typography variant="h6" align="center" id="changePassword">
                   17
                   </Typography>
</Box>
<Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
    <Container maxWidth="xl">
        <Card>
            <CardContent>
            <CardMedia component="img" src={editProPage} style={{margin : "10px 0px"}} /> 
            <CardMedia component="img" src={editProSuccess} /> 
            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align="center" id="changePassword">
                       18
                   </Typography>
</Box>
<Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
    <Container maxWidth="xl">
        <Card>
     
            <CardContent>
            <Typography variant="body1">
        To add secondary emails, click on 
        <Button variant="contained" className={classes.submitBtn}>Add</Button> 
        & enter a valid email address. A secondary email can be deleted by clicking  
                        <CardMedia component="img" src={deleteIcon} 
                        style={{display : "inline", width : "14px", margin : "0px 5px"}} /> 
        At any time, not more than 9 secondary emails can be entered
                          </Typography>
            <CardMedia component="img" src={editUpdatepic} style={{margin : "10px 0px"}} /> 
            <CardMedia component="img" src={addEmail} /> 
            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align="center" id="changePassword">
                       19
                   </Typography>
</Box>
<Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
    <Container maxWidth="xl">
        <Card>
     
            <CardContent>
          
            <CardMedia component="img" src={addedEmail} style={{margin : "10px 0px"}} /> 
            <CardMedia component="img" src={addedEmail2} /> 
            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align="center" id="changePassword">
                       20
                   </Typography>
</Box>
<Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
    <Container maxWidth="xl">
        <Card>
     
            <CardContent>
          
            <CardMedia component="img" src={deleteEmail} style={{margin : "10px 0px"}} /> 
            <CardMedia component="img" src={deletedEmail} /> 
            <Typography variant="body1">
            Note: Only the client email id user would be able to edit the profile and add/delete secondary email users.
             The secondary email users would only be able to view the profile.
                          </Typography>
            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align="center" id="changePassword">
                       21
                   </Typography>
</Box>
      </section>
    )
}
export default Editprofile;