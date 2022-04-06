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
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
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
   
    const [expanded, setExpanded] = useState([]);
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
    const handleChange = (panel) => (event, isExpanded) => {
if(expanded.includes(panel)){
let k = expanded.filter((i) => {
  return panel !== i
})
setExpanded(k)
}
else{
  setExpanded((oldData) => {
    return([...oldData, panel])
  });
}
    };
  console.log("pdata", expanded)
    return(
        <>
         <Header noSign="noSign"/>
         <MyContainer>
    
   
         <div className={classes.articleContent}>
          {
        
             <div className={classes.articlesDetails}>
              <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
           
   <Link underline="hover" color="inherit" to = {`/customer/faq-question`}>
   {CommonServices.capitalizeFirstLetter("Faq")}
   </Link>
   
  
 </Breadcrumbs>
 
        
            
          {list && list.map((i) => (
                       <>
                             <Accordion  key = {i.id} expanded={expanded.includes(i.id) == true} onChange={handleChange(i.id)}>
        <AccordionSummary
       expandIcon={expanded.includes(i.id) == true ? <RemoveIcon /> : <AddIcon />}
          aria-controls={i.id}
          id={i.id}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }} variant="h6">
{i.question}
          </Typography>
        
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Markup content={i.answer} />
          </Typography>
        </AccordionDetails>
      </Accordion>
    

                       </>
               
          ))}
     
      
   
             </div>
         

          }
         </div>
       
        </MyContainer>
        <Footer />
        </>
   
     )
 }
export default FaqQuestion;