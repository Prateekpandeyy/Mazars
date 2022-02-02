import React from 'react';
import {Paper, Container, Typography, Button, Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import style from  './manula.module.css';
import successregImg from "../ManualImg/successReg.jpeg";
import errorImg from "../ManualImg/errorMsg.jpeg";
import loginImage from '../ManualImg/Login22.jpeg';
import loginError from '../ManualImg/loginError.jpeg';
import freshLogin from '../ManualImg/freshLogin.jpeg';
import forgetImg from '../ManualImg/forget.jpeg';
import forgetotpImg from '../ManualImg/forgetOtpImg.jpeg';
import forgetFreshImg from '../ManualImg/forgetFresh.jpeg';
import successLoginImg from '../ManualImg/successLoginImg.jpeg';    
import errorLoginImg from '../ManualImg/errorLoginImg.jpeg';
import errorLoginImg2 from '../ManualImg/errorLoginImg2.jpeg';
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
    root2 : {
        backgroundColor : "blue", 
        color : "white",
        margin : "10px 0px",
        outline : "none",
        '&:hover': {
            backgroundColor : "blue",
            color : "white",
            outline : "none"
        },
        '&:focus': {
            backgroundColor : "blue",
            color : "white",
            outline : "none"
        }
    },
   
}))
const RegError = () => {
    const classes = useStyle()
return (
   <>
    <Typography variant='h5' variantMapping={{
        h5 : "span"
    }}>
    After clicking on  <Button variant="contained" className={classes.root}>Send Otp</Button> Success message will appear.
     Click ok and enter the OTP to register & click on  <Button variant="contained" className={classes.root2}>Submit</Button>
    </Typography>
    {/* <div className={style.imgBox}>
<img src = {successregImg} className= {style.manualImg} />
</div> */}
<CardMedia component="img"  src={successregImg}/>
<Typography variant='h5'>
If the OTP entered is incorrect then Error message window will appear showing “Incorrect OTP, please try again
</Typography>
<div className={style.imgBox}>
<img src = {errorImg} className= {style.manualImg} />
</div>
<div>
<Button variant="contained" className={classes.root}>Send Otp</Button>
<Typography variant='h5' variantMapping={{
    h5 : 'span'
}} id="existing">
For Existing Client: Login with your registered Email id & Password. 
    </Typography>
    <ul className={style.registrationTable}>
   <div>
   <li>
       <Typography variant="body2" color="primary">
       	Enter your registered email id and password, under “For existing client” and click on 
           </Typography>
           </li>
    <li>
        <Typography variant='body2' color="primary">
        <Button variant="contained" className={classes.root}>Send Otp</Button> The OTP will be sent to your registered email id, valid for 180 Seconds
            </Typography> </li>
    <li> 
        <Typography variant='body2' color="primary">
        Enter the OTP so received and click on
        </Typography>
    </li>
    <li> 
        <Typography variant='body2' color="primary">
        Upon login, ‘Login successfully’ message will be displayed.
        </Typography>
    </li>
    <li> 
        <Typography variant='body2' color="primary">
        In case incorrect OTP has been entered, error message window of “Incorrect OTP” will appear.

        </Typography>
    </li>
   </div>
</ul>
<div className={style.imgBox}>
<img src = {loginImage} className= {style.manualImg} />
</div>
<Typography variant="h4">
After clicking <Button variant="contained" className={classes.root}>Send Otp</Button> on Success message will appear. Click ok and enter the OTP received on your 
<Button variant="contained" className={classes.root}>Send Otp</Button> email id & click on 

</Typography>
<Typography variant="h4">
If the OTP entered is incorrect then Error message window will appear showing “Incorrect OTP”
</Typography>
<div className={style.imgBox}>
<img src = {loginError} className= {style.manualImg} />
</div>
<Typography variant="h4" id="forgetPassword">
Forgot Password: If the client forgets the Password, then click on “Forgot Password” under “For existing client”
</Typography>
<div className={style.imgBox}>
<img src = {freshLogin} className= {style.manualImg} />
</div>
<Typography variant="h4">
Forgot Password: Enter your email id and click on <Button variant="contained" className={classes.root2}>Get OTP</Button>
</Typography>
<div className={style.imgBox}>
<img src = {forgetImg} className= {style.manualImg} />
</div>
<Typography variant="h4">
Forgot Password: After clicking on  <Button variant="contained" className={classes.root2}> Get OTP</Button>, success message window will appear & then click on OK.
</Typography>
<div className={style.imgBox}>
<img src = {forgetotpImg} className= {style.manualImg} />
</div>
<Typography variant="h4">
Forgot Password: Enter new password that should be minimum of eight characters, including at least 
one upper case, lower case, special character and number along with the OTP
 received on the email id & click on Submit.
</Typography>
<div className={style.imgBox}>
<img src = {forgetFreshImg} className= {style.manualImg} />
</div>
<Typography variant="h4">
Password Forgot: After clicking on <Button className={classes.root2}> Submit </Button> Success message window will appear, showing password reset 
successfully. Now login with the new password.
</Typography>
<div className={style.imgBox}>
<img src = {successLoginImg} className= {style.manualImg} />
</div>
<Typography variant="h4">
Incorrect Email Id: At the login page, if the email id entered is incorrect then Error message window will appear showing “Please register before sign-in”.
 Click Ok & login with the correct credentials.
</Typography>
<div className={style.imgBox}>
<img src = {errorLoginImg} className= {style.manualImg} />
</div>
<Typography variant="h4">
Incorrect password: At the login page, if the password entered is incorrect then Error message window will appear showing “Incorrect email or password”. 
Click Ok & login with the correct credentials.
</Typography>
<div className={style.imgBox}>
<img src = {errorLoginImg2} className= {style.manualImg} />
</div>
</div>
  
   </>
)
}
export default RegError;