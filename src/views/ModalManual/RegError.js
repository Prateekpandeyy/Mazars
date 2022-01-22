import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import style from  './manula.module.css';
import successregImg from "../ManualImg/successReg.jpeg";
import errorImg from "../ManualImg/errorMsg.jpeg";
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
    <Button variant="contained" className={classes.root2}>Submit</Button>
    <Button variant="contained" className={classes.root}>Send Otp</Button>
    <Typography variant='h5' variantMapping={{
        h5 : "span"
    }}>
    After clicking on Success message will appear. Click ok and enter the OTP to register & click on 
    </Typography>
    <div className={style.imgBox}>
<img src = {successregImg} className= {style.manualImg} />
</div>
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
}}>
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
</div>
   </>
)
}
export default RegError;