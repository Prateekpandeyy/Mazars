import React from 'react';
import { AppBar, Toolbar, Button, Typography, TextField, Grid, Box, Container, Card, Paper } from '@material-ui/core';
import useForm from 'react-hook-form';
import { Link } from 'react-router-dom';
import mazars from "../../assets/images/mazars-logo.png";
import Select from "react-select";
import style from './QueryStyle.module.css';


const QueryContact = () => {
  
    return (
        <>

            <Grid container style={{ display: "flex", borderBottom: "1px solid #1089ff" }}>
                <Grid item sm={4} style={{ display: "flex", padding: "20px" }}>
                    <Link to="/">
                        <img src={mazars} className="logo" alt="mazar" />
                    </Link>
                </Grid>
                <Grid item sm={8} style={{ display: "flex", padding: "20px" }}>
                    <Grid item sm={4}>
                        <TextField
                            placeholder="Please enter email" />
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            placeholder="Please enter your password" />
                    </Grid>

                    <Grid item sm={2}>
                    <Button variant="contained" style={{ backgroundColor: "rgba(10, 31, 143 , 1)", color: "#fff" }}>Login</Button>
                    </Grid>
                </Grid>
            </Grid>
           

            <Container maxWidth="lg">
                <Grid container justify="center">
                    <Grid item lg={12} sm={12}>

                       <Box style={{margin: "10px 0"}}>
                       <h4 className="contentTitle">Enquiry form</h4>
                           </Box>
                       
                         <form>
                         <Grid item lg={12}>
                               <Box className={style.myFormBox}>
                               <label>
                               Your information
                               </label>
                              <select 
                              className={style.mySelectBox}>
                                  <option>General enquiries - Mazars in India</option>
                                  <option>Business Advisory Services - Mazars in India</option>
                              </select>
                               </Box>
                              </Grid> 
                              <Grid item lg={12}>
                              <Box className={style.myFormBox}>
                              <input 
                             placeholder = "Type here your name"
                             className={style.myNameBox}
                             type = "text" />
                                  </Box>
                            
                              </Grid> 
                              <Grid item lg={12}>
                              <Box className={style.myFormBox}>
                              <input 
                             placeholder = "Type here your e-mail address"
                             className={style.myNameBox}
                             type = "text" />
                                  </Box>
                            
                              </Grid>  
                              <Grid item lg={12}>
                               <Box className={style.myFormBox}>
                               <label>
                            Your message*

                               </label>
                             <textarea 
                             placeholder="Type your message here"
                             className={style.myMessageBox}>

                             </textarea>
                               </Box>
                              </Grid> 
                              <Grid item lg={12}>
                               <Box className={style.myFormBox}>
                               <div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
  <label className="form-check-label" for="flexCheckDefault">
I accept that Mazars will process my personal data for the purpose of handling my request
  </label>
  </div>
                               </Box>
                              </Grid>
                              <Grid item lg={12}>
                               <Box className={style.myFormBox}>
                          <button className="customBtn">Send</button>
                               </Box>
                              </Grid> 
                         </form>
                       
                    </Grid>
                    
                </Grid>
            </Container>
          
        </>
    )
}
export default QueryContact;