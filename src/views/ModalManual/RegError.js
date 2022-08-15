import React from 'react';
import {Box, Container, Typography, Button, Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import style from  './manula.module.css';
import errorImg from "../ManualImg/errorMsg.png";
import loginImage from '../ManualImg/login222.png';
import loginError from '../ManualImg/loginError.png';
import freshLogin from '../ManualImg/freshLogin.png';
import forgetImg from '../ManualImg/forget.png';
import forgetotpImg from '../ManualImg/forgetOtpImg.png';
import forgetFreshImg from '../ManualImg/forgetFresh.png';
import successLoginImg from '../ManualImg/successLoginImg.png';    
import errorLoginImg from '../ManualImg/errorLoginImg.png';
import successLogin from "../ManualImg/successlogin.png"
const useStyle = makeStyles(theme => ({
    root : {
        backgroundColor : "#0071ce", 
        color : "white",
        margin : "10px 5px",
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
    root2 : {
        backgroundColor : "#0071ce", 
        color : "white",
        margin : "10px 5px",
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
   
}))
const RegError = () => {
    const classes = useStyle()
return (
   <>
   <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  maxHeight : "500px", height : "100%", flexDirection : "column", padding: "10px 15px"}}>
       <Container maxWidth= "xl" style={{display : "flex", height : "100%"}}>
           <Card>
               <CardContent>
               
               
               <Typography variant='body1' className="modalText">
               Upon successful registration of a new client, a welcome email will be sent by the MAS team to the 
               client email address and all secondary email users added by the new client. 
</Typography>
<Typography variant='body1' className="modalText">
In these emails, for future log in by such users, the User Id (common to all), 
specific email id (client email id or the secondary email id) along with unique 
password will be informed to such client and the secondary email users. With such credentials they will be entitled to log in the MAS platform anytime & independently of each other.
 All users will have full capability to work on the queries under the common User Id.
            </Typography>
              
                   

</CardContent>
</Card>
</Container>
</Box>
<Typography variant="h6" align="center">
                       07
                   </Typography>
<Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
<Container>

<Card>

    <CardContent>
    <Typography variant='span' variantMapping={{
        h5 : "span"
    }} className="modalTextHeading">
For Existing Client (including secondary email users): Login with your registered
User Id, Email Id & Password.
</Typography>
    <ul className={style.registrationTable}>
  
  <li>
      <Typography variant="body1" color="primary">
      Enter your registered user id, email id and password, under “For existing client” and click on
          <Button variant="contained" className={classes.root}>Send Otp</Button>     </Typography>
          </li>
         
   <li>
       <Typography variant='body1' color="primary">
       The OTP will be sent to your registered email id, valid for 180 Seconds.
           </Typography> </li>
   <li> 
       <Typography variant='body1' color="primary">
       Enter the OTP so received and click on <Button variant="contained" className={classes.root}>Login</Button>   
       </Typography>
   </li>
   <li> 
       <Typography variant='body1' color="primary">
       Upon login, ‘Login successfully’ message will be displayed.
       </Typography>
   </li>
   <li> 
       <Typography variant='body1' color="primary">
       In case incorrect OTP has been entered, error message
        window of “Incorrect OTP” will appear.
       </Typography>
   </li>
   <li> 
       <Typography variant='body1' color="primary">
       In case the client or any secondary email users of a user id is
        already logged in, other users of the same user id will not be able to login.
       </Typography>
   </li>
</ul>
<CardMedia src={loginImage} style={{margin: "10px 0px"}} component="img" />

               </CardContent>
           </Card>
       </Container>
      
   </Box>
   <Typography variant="h6" align="center">
                       08
                   </Typography>
 <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
     <Container maxWidth= "xl">
         <Card>
             <CardContent>
             <Typography variant="body1">
After clicking <Button variant="contained" className={classes.root}>Send Otp</Button> on Success message will appear. Click ok and enter the OTP received on your 
 email id & click on 
<Button variant="contained" className={classes.root}>Login</Button>
</Typography>
<CardMedia component="img" src={successLogin}  style = {{margin : "10px 0px"}}/>

<Typography variant="body1">
If the OTP entered is incorrect then Error message window will appear showing “Incorrect OTP”
</Typography>
<CardMedia component="img" src={loginError} style = {{margin : "10px 0px"}}/>

                 </CardContent>
        
        
            
         </Card>
     </Container>
     
     </Box>
     <Typography variant="h6" align="center">
                       09
                   </Typography>
<Box style={{display : "flex",  maxWidth: "900px", margin: "auto", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
    <Container maxWidth= "xl">
        <Card>
            <CardContent>
            <CardHeader title={
                <Typography variant='span' variantMapping={{
                    h5 : "span"
                }} className="modalTextHeading" id="forgetPassword">
              
Forgot Password: If the client forgets the Password, then click on “Forgot Password” under “For existing client”
</Typography>
             }/>
                <CardMedia component="img" src={freshLogin} className="imgGap"/>
            <Typography variant="body1">
Forgot Password: Enter your User id & email id and click on <Button variant="contained" className={classes.root2}>Get OTP</Button>
</Typography>
<CardMedia src={forgetImg} component="img" />


            </CardContent>
        </Card>
    </Container>
    
    </Box>
    <Typography variant="h6" align="center">
                       10
                   </Typography>

<Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
    <Container maxWidth= "xl">
        <Card>
   
            <CardContent>
                     
<Typography variant="body1">
Forgot Password: After clicking on  <Button variant="contained" className={classes.root2}> Get OTP</Button>, success message window will appear & then click on OK.
</Typography>
<CardMedia src={forgetotpImg} component="img" style={{margin : "10px 0px"}} />

<Typography variant="body1">
Forgot Password: Enter new password that should be minimum of eight characters, including at least 
one upper case, lower case, special character and number along with the OTP
 received on the email id & click on Submit.
</Typography>
            <CardMedia src={forgetFreshImg} component="img" style={{margin : "10px 0px"}} />
            
            
            </CardContent>
        </Card>
    </Container>
    
    </Box>
    <Typography variant="h6" align="center">
                       11
                   </Typography>
<Box style={{display : "flex", maxWidth: "900px", margin: "auto",  height : "1400px", flexDirection : "column", padding: "10px 15px"}}>
    <Container maxWidth= "xl">
        <Card>
            <CardContent>
            <Typography variant="body1">
Password Forgot: After clicking on <Button className={classes.root2}> Submit </Button> Success message window will appear, showing password reset 
successfully. Now login with the new password.
</Typography>
<CardMedia src={successLoginImg} component="img" style={{margin : "10px 0px"}} />

            <Typography variant="body1">
            Incorrect User Id or Email Id: At the login page, if the user id or email id entered is 
            incorrect then Error message window will appear
             showing “Please register before sign-in”. Click Ok & login with the correct credentials.
</Typography>
<CardMedia src={errorLoginImg} component="img" style={{margin : "10px 0px"}}  />

            </CardContent>
        </Card>
    </Container>
    <Typography variant="h6" align="center">
                       12
                   </Typography>

    </Box>

  




  
   </>
)
}
export default RegError;