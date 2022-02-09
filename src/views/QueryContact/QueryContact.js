import React from 'react';
import { AppBar, Toolbar, Button, Typography, TextField, Grid, Box, Container, Card, Paper } from '@material-ui/core';
import useForm from 'react-hook-form';
import { Link } from 'react-router-dom';
import mazars from "../../assets/images/mazars-logo.png";
import Select from "react-select";
import style from './QueryStyle.module.css';
const QueryContact = () => {
    const category = [{
        label: "Dirct tax",
        value: "1"
    },
    {
        label: "Indirect tax",
        value: "2"
    }, {
        label: "Others",
        value: "3"
    }]
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
            <Grid container style={{ display: "flex" }}>
               <Container maxWidth = "md" style={{ paddingTop: "30px", paddingBottom : "30px"}}>
                   <h2>Lorem Heading Lorem Heading Loren </h2>
               <Grid item sm={12} style={{ display: "flex"}}>
                    <Typography variant="h6" align="justify">
                        Lorem Ipsum is simply dummy text of the printing and
                         typesetting industry. Lorem Ipsum has been the industry's 
                         standard dummy text ever since the 1500s, when an unknown 
                         printer took a galley of type and scrambled it to make a type
                          specimen book. It has survived not only five centuries, but also 
                          the leap into electronic typesetting, remaining essentially unchanged. 
                          It was popularised in the 1960s with the release of Letraset sheets
                    </Typography>
                </Grid>
               </Container>

            </Grid>

            <Container maxWidth="md" style={{margin: "10px auto"}}>
                <Grid container justify="center">
                    <Grid item lg={6} sm={12}>
                        <Paper style={{ display: "flex", height: "100%", backgroundColor: "rgba(10, 31, 143, 1)"}}>
                            <Box className={style.leftSide} p={4}>
                                <Typography variant="h4" className={style.whiteTextTypography}>
                                    Contact Us
                                </Typography>
                                <div className={style.contactDetails}>
                                    <div className={style.info_wrap}>
                                    <i className="fa fa-map-marker"></i>
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
                                       <i className="fa fa-phone"></i>
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
                                        <i className="fa fa-paper-plane"></i>
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
                                       <i className="fa fa-globe"></i>
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
                            <Box p={4}>
                                <Typography variant="h4">
                                    Query Contact
                                </Typography>

                                <div className={style.contactDetails2}>
                                    <Grid item sm={12} style={{ paddingTop: "20px" }}>
                                        <TextField placeholder="Please enter your email"
                                            className={style.whiteTextTypography}

                                            fullWidth
                                            variant="outlined"
                                            label="Your Email" />
                                    </Grid>
                                    <Grid item sm={12} style={{ paddingTop: "20px", backgroundColor: "#fff", zIndex: "99999" }}>
                                        <Select options={category} style={{ backgroundColor: "#fff", zIndex: "99999" }}>
                                        </Select>
                                    </Grid>
                                    <Grid item sm={12} style={{ paddingTop: "20px" }}>
                                        <TextField placeholder="Please enter your query"
                                            className={style.whiteTextTypography}
                                            label="Query"
                                            fullWidth
                                            variant="outlined"
                                            multiline
                                            rows={9}
                                            label="Your query" />
                                    </Grid>
                                    <Grid item sm={6} style={{ paddingTop: "30px" }}>
                                        <Button variant="contained" style={{ backgroundColor: "rgba(10, 31, 143 , 1)", color: "#fff" }}>Submit</Button>
                                    </Grid>
                                </div>

                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Grid container style={{ display: "flex" }}>
               <Container maxWidth = "md" style={{ paddingTop: "30px"}}>
                   <h2>Lerem heading Lorem Heading Lorem </h2>
               <Grid item sm={12} style={{ display: "flex"}}>
                    <Typography variant="h6" align="justify">
                        Lorem Ipsum is simply dummy text of the printing and 
                        typesetting industry. Lorem Ipsum has been the industry's 
                        standard dummy text ever since the 1500s, when an unknown 
                        printer took a galley of type and scrambled it to make a type
                         specimen book. It has survived not only five centuries, but 
                         also the leap into electronic typesetting, remaining essentially 
                         unchanged. It was popularised in the 1960s with the release of Letraset
                          sheets containing Lorem Ipsum passages, and more recently with desktop
                       
                    </Typography>
                </Grid>
               </Container>

            </Grid>

        </>
    )
}
export default QueryContact;