import React from 'react';
import {Paper, Box, Container, Typography, Button, Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions }from "@mui/material";
import style from "./manula.module.css";
import {makeStyles} from "@material-ui/styles";
import regImg from "../ManualImg/registrationImage.jpeg";
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
   
}))
const RegistrationInfo = () => {
    const classes = useStyle() 
    return (
        <>
         <Box>
         <Paper>
           <Card>
               
                
<CardActions>
    <Container>
    <ul className={style.registrationTable}>
   <div>
   <li>
       <Typography variant="body2">
       After filling the above information, click on the <Button variant="contained" className={classes.root}>Send Otp</Button> icon.
           </Typography>
           </li>
    <li>
        <Typography variant='body2'>
        An OTP will be sent to the above provided email address, valid for 180 seconds.
            </Typography> </li>
    <li> 
        <Typography variant='body2'>
        <Button variant="contained" className={classes.root}>Submit</Button> On entering the OTP, click on icon to complete the registration
        </Typography>
    </li>
   </div>
</ul>
    </Container>
    </CardActions>
    <CardMedia component="img" src={regImg}/>

            </Card>
           </Paper>
           <Typography variant="h6" align="right">
                       03
                   </Typography>
         </Box>
        </>
    )
}
export default RegistrationInfo;