import React , {useState} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import {Breadcrumbs, Box, Typography } from "@material-ui/core";
import CommonServices from '../../common/common.js';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import classes from './design.module.css';
const MyContainer = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    alignItems : "center", 
    width: "100%",
    flexDirection : "column"
  })

const FaqQuestion = () => {
    const [data, setData] = useState(["1"])
    return(
        <>
         <Header noSign="noSign"/>
         <MyContainer>
    
   
         <div className={classes.articleContent}>
          {
            data.map((i) => (
             <div className={classes.articlesDetails}>
              <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
              <Link underline="hover" color="inherit" to="/customer/direct">
   Articles
   </Link>
   <Link underline="hover" color="inherit" to = {`/customer/faq-questions`}>
   {CommonServices.capitalizeFirstLetter("Faq") + " Question"}
   </Link>
   
   <Typography color="text.primary"> {i.heading}</Typography>
 </Breadcrumbs>
 
            <div>
            
           <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Who can we refer to during the internship?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          During your internship, you can directly refer to either your mentor or line manager 
          if you have any questions related to your internship or assignments.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>What is the working atmosphere like?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          During your internship, you can directly refer to either your mentor or line manager if you have any questions 
          related to your internship or assignments.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>What kind of profiles does mazars recruit?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
         
During your internship, you can directly refer to either your mentor or line manager if 
you have any questions related to your internship or assignments.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Is the recruitment process the same for positions in every asia pacific country?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          During your internship, you can directly refer to either your mentor or line manager if you 
          have any questions related to your internship or assignments.
          </Typography>
        </AccordionDetails>
      </Accordion>
     
             
              </div>
      
   
             </div>
         
            ))
          }
         </div>
       
        </MyContainer>
        <Footer />
        </>
   
     )
 }
export default FaqQuestion;