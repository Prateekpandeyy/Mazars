import React from 'react';
import {Paper, Box, Container, Typography, Button, Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";
import RegistrationInfo from "./RegistrationInfo";
import RegError from './RegError';
import loginImg from "../ManualImg/loginImg.jpeg";
import IgnologinImg from "../ManualImg/ignologinImg.jpeg";
import successregImg from "../ManualImg/successReg.jpeg";
import style from './manula.module.css';
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
const Login = () => {
    const classes = useStyle()
    return(
        <>
             <secton id="login">
           <Box id="onlyLogin">
           <Container>
            <Card> 
           <CardHeader  title={
               <>
             <span> visit :  </span>
               <a href="https://mazars.multitvsolution.com/#/" target="_blank">https://mazars.multitvsolution.com/#/
               </a>
               </>
           } subheader= "(To post a query, visit Mazar’s portal by clicking above link.)"/>
                <CardActionArea>
                   
               <CardContent>
               <CardMedia component="img" src={loginImg}/>
               </CardContent>
                </CardActionArea>
                </Card>
                </Container>
              
              
                <Container>
                <Card>
                    <CardHeader  title={
                        <>
                        <Typography variant="h4">
                        For New Client: Click on 
                        <Button variant="contained" className={classes.root}>Sign Up</Button>
                            </Typography>
                        </>
                    } subheader="(Click on sign up icon, mentioned below “For new client” to register.)"/>
                   <CardActionArea>
                   
                   <CardContent>
                   <CardMedia component="img" src={IgnologinImg}/>
                   </CardContent>
               </CardActionArea>
                    </Card>
        
                    </Container>
                   <Typography variant="h6" align="center">
                       02
                   </Typography>
               </Box>
        <Box>
        <Container>
                <Card>
                    <CardHeader  title={
                        <>
                        <Typography variant="h4">
                        Provide your basic information to complete the registration.
                       
                            </Typography>
                        </>
                    }  subheader="(On clicking sign up for registration, 
                    following screen will open to enter basic information.)"/>
                 
                   
                <CardContent>
                <table className="table table-bordered p-2">

<tbody>
    <tr>
        <th>Name <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li><Typography variant='body2'>
                Enter full name or any chosen name
                </Typography></li>
                <li>
                    <Typography variant='body2'>
                    For registration of business/entity, enter the legal name of the business/entity
                    </Typography>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Email Address <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Enter personal email address or the email address of any representative or authorized signatory of the business/entity
                    </Typography>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Occupation/Profession <sup className='declined'>*</sup></th>
       <td className='px-5'>
            <ul>
                <li>
                    <Typography variant="body2">
                    From drop down list, select your occupation/profession
                    </Typography>
                </li>
                <li>
                    <Typography variant='body2'>
                    In case of business/entity, select the occupation/ profession of the representative or authorized signatory, who is registering for query
                    </Typography>
                </li>
            </ul>
        </td> 
    </tr>
    <tr>
        <th>Country/State/City <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    From drop down list, select the Country/State/City. City or State may also be entered/typed
                    </Typography>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Mobile Number <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
               <li>
                   <Typography variant='body2'>
                   Enter the valid numeric mobile number
                   </Typography>
               </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Zip Code <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
               <li>
                   <Typography variant='body2'>
                   Enter the valid Zip Code or Pin Code
                   </Typography>
               </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>GST IN</th>
        <td className='px-5'>
            <ul>
               <li>
                   <Typography variant='body2'>
                   Enter the valid 15-digit, PAN based Alpha Numeric GST IN number of the business/entity, if applicable
                   </Typography>
               </li>
            </ul>
        </td>
    </tr>
    <tr>
    <th>Password <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
               <li>
                   <Typography variant='body2'>
                   Choose a password that should be minimum of eight characters, including at least one upper case, lower case, special character and number
                   </Typography>
               </li>
            </ul>
        </td>
    </tr>
   
</tbody>
</table>
                <RegistrationInfo />
                </CardContent>
              
                    </Card>
        
                    </Container>
        </Box>
       
        <Box>
           <Container id="onlyLogin">
            <Card> 
         
                   
               <CardContent>
               <Typography variant="h4">
        Provide your basic information to complete registration
        </Typography>
        <Typography variant='body1' color="primary">
        (Details of information to be provided.)                                                                
        </Typography>
        <Typography variant='body1' color="error">
        (*Mandatory Fields)
        </Typography>
        <Typography variant='h5' variantMapping={{
        h5 : "span"
    }}>
    After clicking on  <Button variant="contained" className={classes.root}>Send Otp</Button> Success message will appear.
     Click ok and enter the OTP to register & click on  <Button variant="contained" className={classes.root2}>Submit</Button>
    </Typography>
   
<CardMedia component="img"  src={successregImg}/>
<Typography variant='h5'>
If the OTP entered is incorrect then Error message window will appear showing “Incorrect OTP, please try again
</Typography>
       
               </CardContent>
             
                </Card>
                </Container>
              
                <Typography variant="h6" align="center">
                       04
                   </Typography>
               
               </Box>
               <RegError />
             </secton>
        
     
        
    </>
    )
}
export default Login;