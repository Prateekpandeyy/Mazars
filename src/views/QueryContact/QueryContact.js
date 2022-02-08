import React from 'react';
import {AppBar, Toolbar, Button, Typography, TextField, Grid, Box, Container, Card, Paper } from '@material-ui/core';
import useForm from 'react-hook-form';
import {Link} from 'react-router-dom';
import mazars from "../../assets/images/mazars-logo.png";
import  Select  from 'react-select';
import style from './QueryStyle.module.css';
const QueryContact = () => {
    const category = [{
        label: "Dirct tax",
        value : "1"
    }, 
{
    label: "Indirect tax",
    value :"2"
}, {
    label: "Others",
    value : "3"
}]
    return(
        <>
       
        <Grid container style={{display: "flex", borderBottom : "1px solid #1089ff"}}>
            <Grid item sm = {6} style={{display: "flex", padding: "20px"}}>
            <Link to="/">
              <img src={mazars} className="logo" alt="mazar" />
            </Link>
                </Grid>
                <Grid item sm ={6} style={{display: "flex", padding: "20px"}}>
                    <Grid item sm ={4}>
                    <TextField 
                  placeholder="Please enter name" />
                        </Grid>
                <Grid item sm = {4}>
                <TextField 
                  placeholder="Please enter your password"/>
                    </Grid>

               <Grid item sm = {2}>
               <Button variant="contained" style={{backgroundColor: "#1089ff", color:"#fff"}}>Login</Button>
                   </Grid>
                    </Grid>
            </Grid>
       
<Container maxWidth= "md" style={{margin: "80px auto"}}>
    <Grid container justify="center">
<Grid item lg={6} sm={12}>
    <Paper style={{display : "flex", height: "100%"}}>
   <Box className={style.leftSide}  p = {6}>
   <Typography variant="h4" className={style.whiteTextTypography}>
       Contact Us
    </Typography>
    <div className={style.contactDetails}>
<div className={style.info_wrap}>
<span className="fa fa-paper-plane"></span>
</div>
<Typography variant="h5" className={style.whiteTextTypography}>
   Address:
</Typography>
<Typography variant="subtitle1" className={style.whiteTextTypography}>
mazars@gmail.com 
</Typography>
   
    </div>
    <div className={style.contactDetails}>
<div className={style.info_wrap}>
<span className="fa fa-phone"></span>
</div>
<Typography variant="h5" className={style.whiteTextTypography}>
   Phone:
</Typography>
<Typography variant="subtitle1" className={style.whiteTextTypography}>
+ 91 12345 69919
</Typography>
   
    </div>
    <div className={style.contactDetails}>
<div className={style.info_wrap}>
<span className="fa fa-paper-plane"></span>
</div>
<Typography variant="h5" className={style.whiteTextTypography}>
   Email:
</Typography>
<Typography variant="subtitle1" className={style.whiteTextTypography}>
mazars@gmail.com
</Typography>
   
    </div>
    <div className={style.contactDetails}>
<div className={style.info_wrap}>
<span className="fa fa-globe"></span>
</div>
<Typography variant="h5" className={style.whiteTextTypography}>
   Website:
</Typography>
<Typography variant="subtitle1" className={style.whiteTextTypography}>
<a href="https://www.mazars.co.in" target="_blank">www.mazars.com</a>
</Typography>
   
    </div>
   </Box>
        </Paper>
    </Grid>
    <Grid lg={6} sm={12}>
       <Paper>
           <Box  p={6}>
           <Typography variant="h4">
        Query Contact
        </Typography>
       
          <div className={style.contactDetails2}>
          <Grid item sm={12} style={{paddingTop: "20px"}}>
               <TextField placeholder="Please enter your email"
               className={style.whiteTextTypography}
        
               fullWidth
               variant="outlined"
               label="Your Email" />
                </Grid>
                <Grid item sm={12} style={{paddingTop: "20px"}}>
            <Select options={category}>

            </Select>
                </Grid>
                <Grid item sm={12} style={{paddingTop: "20px"}}>
               <TextField placeholder="Please enter your query"
               className={style.whiteTextTypography}
               label="Query" 
               fullWidth
               variant="outlined"
               multiline
               rows={6}
               label="Your query" />
                </Grid>
               <Grid item sm={6} style={{paddingTop : "10px"}}>
               <Button variant="contained" style={{backgroundColor: "#1089ff", color: "#fff"}}>Send Message</Button>
               </Grid>
          </div>
        
           </Box>
       </Paper>
        </Grid>
    </Grid>
</Container>
        </>
    )
}
export default QueryContact;