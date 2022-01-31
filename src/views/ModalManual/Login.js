import React from 'react';
import {Paper, Container, Typography, Button, Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions } from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";
import RegistrationInfo from "./RegistrationInfo";
import RegError from './RegError';
import loginImg from "../ManualImg/loginImg.jpeg";
import IgnologinImg from "../ManualImg/ignologinImg.jpeg";
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
             <Container>
            <Card variant="outlined"> 
           <CardHeader  title={
               <>
             <span> visit :  </span>
               <a href="https://mazars.multitvsolution.com/#/" target="_blank">https://mazars.multitvsolution.com/#/
               </a>
               </>
           } subheader= "(To post a query, visit Mazar’s portal by clicking above link.)"/>
                <CardActionArea>
                   
                    <CardMedia component="img" src={loginImg}/>
                </CardActionArea>
                </Card>
                </Container>
              
              
                <Container>
                <Card variant="outlined">
                    <CardHeader  title={
                        <>
                        <Typography variant="h4">
                        For New Client: Click on 
                        <Button variant="contained" className={classes.root}>Sign Up</Button>
                            </Typography>
                        </>
                    } subheader="(Click on sign up icon, mentioned below “For new client” to register.)"/>
                   <CardActionArea>
                   
                   <CardMedia component="img" src={IgnologinImg}/>
               </CardActionArea>
                    </Card>
        
                    </Container>
                   
        
        <Container>
                <Card variant="outlined">
                    <CardHeader  title={
                        <>
                        <Typography variant="h4">
                        Provide your basic information to complete the registration.
                       
                            </Typography>
                        </>
                    }  subheader="(On clicking sign up for registration, 
                    following screen will open to enter basic information.)"/>
                   <CardActionArea>
                   
                <CardContent>
                <RegistrationInfo />
                </CardContent>
               </CardActionArea>
                    </Card>
        
                    </Container>
        
        <Container>
        <Typography variant="h4">
        Provide your basic information to complete registration
        </Typography>
        <Typography variant='body1' color="primary">
        (Details of information to be provided.)                                                                
        </Typography>
        <Typography variant='body1' color="error">
        (*Mandatory Fields)
        </Typography>
        <RegError />
        </Container>
             </secton>
        
     
        
    </>
    )
}
export default Login;