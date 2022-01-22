import React from 'react';
import { ModalBody } from 'react-bootstrap';
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';
import loginImg from "../ManualImg/loginImg.jpeg";
import IgnologinImg from "../ManualImg/ignologinImg.jpeg";
import style from './manula.module.css';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/styles";
import RegistrationInfo from "./RegistrationInfo";
import RegError from './RegError';
import { Typography } from '@material-ui/core';
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
const ModalManual = ({showManual, openManual})  => {
    const classes = useStyle()
    return(
        <div>
          <Modal isOpen={openManual}  size="lg" scrollable>
        <ModalHeader toggle={showManual}>Manual Modal </ModalHeader>
        <ModalBody>
<b>Visit: </b><a href=": https://mazars.multitvsolution.com/#/">: https://mazars.multitvsolution.com/#/</a>
<p>(To post a query, visit Mazar’s portal by clicking above link.)</p>
<section>
<div className={style.imgBox}>
<img src = {loginImg} className= {style.manualImg} />
</div>
<Button variant="contained" className={classes.root}>Sign Up</Button>
<h4>For New Client: Click on </h4>
<p>(Click on sign up icon, mentioned below “For new client” to register.) </p>
<div className={style.imgBox}>
<img src = {IgnologinImg} className= {style.manualImg} />
</div>
<h4>Provide your basic information to complete the registration.</h4>
<p>(On clicking sign up for registration, following screen will open to enter basic information.)</p>
<RegistrationInfo />
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
</section>
        </ModalBody>


      </Modal >

        </div>
    )

}
export default ModalManual;