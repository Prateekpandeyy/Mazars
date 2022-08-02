import React from 'react';
import {Paper, Box, Container, Typography, Button, Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";
import RegistrationInfo from "./RegistrationInfo";
import RegError from './RegError';
import loginImg from "../ManualImg/loginImg.png";
import IgnologinImg from "../ManualImg/ignologinImg.png";
import successregImg from "../ManualImg/successReg.png";
import logo2 from '../ManualImg/logo2.png';
import logo22 from "../ManualImg/logo22.png";
import style from './manula.module.css';
const useStyle = makeStyles(theme => ({
    root : {
        backgroundColor : "#0071ce", 
        color : "white",
        margin : "10px",
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
const Login = () => {
    const classes = useStyle()
    const goToRow = (e) => {
        console.log("e3", e)
            const anchor = document.querySelector(e)
            console.log("an", anchor)
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
         
    }
    return(
        <>
       
             <secton id="login">
           <Box id="onlyLogin" style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
           <Container maxWidth= "xl">
            <Card> 
           <CardHeader  title={
               <>
               <h4 style = {{fontWeight : "800", color : "#4472c4"}}>Mazars Advisory Solutions (MAS) </h4>
             <span className="modalTextHeading"> visit :  </span>
               <a href="https://masindia.live/#/" target="_blank">https://masindia.live/#/
               </a>
               </>
           } subheader= "(To post a query, visit MAS portal by clicking above link.)"/>
                <CardActionArea>
                   
               <CardContent>
               <CardMedia component="img" src={loginImg}/>
               </CardContent>
                </CardActionArea>
                </Card>
                </Container>
               
              
                <Container maxWidth= "xl">
                <Card>
                    <CardHeader  title={
                        <>
                        <span className="modalTextHeading">
                        For New Client: Click on 
                        </span>
                        <Button variant="secondary"
                        onClick = {() => goToRow("#signUp2")}
                         className={classes.root}>Sign Up</Button>
                       
    
                            
                        </>
                    } subheader="(Click on sign up icon, mentioned below “For new client” to register.)"/>
                   <CardActionArea>
                   
                   <CardContent>
                   <CardMedia component="img" src={IgnologinImg}/>
                   </CardContent>
               </CardActionArea>
                    </Card>
        
                    </Container>
                
               </Box>
               <Typography variant="h6" align="center">
                       03
                   </Typography>
        <Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
        <Container maxWidth= "xl">
                <Card>
                    <CardHeader  title={
                        <>
                        
                        </>
                    }  subheader=""/>
                 
                   
                <CardContent>
                <span className="modalTextHeading">
                Provide your basic information to complete the registration.
                            </span>
                            <Typography variant="body2">
                            (On clicking sign up for registration, following screen will open to enter basic information.)
                                </Typography>
                                <div style={{display : "flex", margin : "30px 0px"}}> 
                            <CardMedia component="img" src={logo2} />
                            </div>
                          
                            <CardMedia component="img" src={logo22} />
                           
     
               
                </CardContent>
              
                    </Card>
        
                    </Container>
        </Box>
             
<Typography variant="h6" align="center">
                       04
                   </Typography>
        <RegistrationInfo />
        <Box style={{display : "flex", minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
           <Container maxWidth= "xl" id="onlyLogin">
            <Card> 
         
                   
               <CardContent>
       
        <Typography variant='h5' variantMapping={{
        h5 : "span"
    }}>
    After clicking on  <Button variant="contained" className={classes.root}>Send Otp</Button> Success message will appear.
     Click ok and enter the OTP to register & click on  <Button variant="contained" className={classes.root}>Submit</Button>
    </Typography>
   
<CardMedia component="img"  src={successregImg}/>
<Typography variant='h5'>
If the OTP entered is incorrect then Error message window will appear showing “Incorrect OTP, please try again
</Typography>
       
               </CardContent>
             
                </Card>
                </Container>
              
                
               
               </Box>
            
               <RegError />
             </secton>
        
     
           
    </>
    )
}
export default Login;