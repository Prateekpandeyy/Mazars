import React , {useState, useEffect} from 'react';
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
import { baseUrl } from '../../config/config';
import { Markup } from 'interweave';
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
    const [list, setList] = useState([])
    const [heading, setHeading] = useState("")
    const getList = () => {
      axios.get(`${baseUrl}/customers/getfaq`)
      .then((res) => {
       
      if(res.data.code === 1){
        console.log("response", res.data.result)
        setList(res.data.result)
      
      }
      })
    }
    useEffect(() => {
      getList()
    }, [])
    console.log("faqList", list)
    return(
        <>
         <Header noSign="noSign"/>
         <MyContainer>
    
   
         <div className={classes.articleContent}>
          {
        
             <div className={classes.articlesDetails}>
              <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
              <Link underline="hover" color="inherit" to="/customer/direct">
   Articles
   </Link>
   <Link underline="hover" color="inherit" to = {`/customer/faq-questions`}>
   {CommonServices.capitalizeFirstLetter("Faq") + " Question"}
   </Link>
   
   <Typography color="text.primary"> FAQs</Typography>
 </Breadcrumbs>
 
            <div>
            
          {list && list.map((i) => (
             <Accordion key={i.id}>
             <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               aria-controls="panel1a-content"
               id="panel1a-header"
             >
               <Typography variant="h6">{i.question}</Typography>
             </AccordionSummary>
             <AccordionDetails>
             <Markup content={i.answer} />
             </AccordionDetails>
           </Accordion>
          ))}
     
              </div>
      
   
             </div>
         

          }
         </div>
       
        </MyContainer>
        <Footer />
        </>
   
     )
 }
export default FaqQuestion;