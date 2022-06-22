import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { baseUrl, baseUrl3 } from '../../config/config';
import { Markup } from 'interweave';
import {Breadcrumbs, Box, Typography } from "@material-ui/core";
import CommonServices from '../../common/common.js';
import classes from './design.module.css';
import { OuterloginContainer } from '../../components/Common/OuterloginContainer';
import { Link , useParams, useHistory} from 'react-router-dom';
import {  VscFilePdf} from "react-icons/vsc";
const MyContainer = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    alignItems : "center", 
    width: "100%",
    flexDirection : "column"
  })
 
  const ArticleWrapper = styled(Box)({
    display: "flex", 
    flexDirection: "column",
  
    padding: "5px"
  })

const UpdateDetails = () => {
 
  
  const [data, setData] = useState([])
 let id = useParams()
 let history = useHistory()
 console.log(history)
 const getData = (e) => {
   
  
  axios.get(`${baseUrl}/customers/getupdated?type=${history.location.index}&id=${id.id}`)
  .then((res) => {
   console.log("result", res.data.result)
    setData(res.data.result)
    
  })

}
useEffect(() => {
  getData()
}, [])
    return(
       <>
     
       <OuterloginContainer>
       <Header noSign="noSign"/>
        <MyContainer>
   
  
        <div className={classes.articleContent}>
         {
           data.map((i) => (
            <div className={classes.articlesDetails}>
             <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
             <Link underline="hover" color="inherit" to="/customer/updatedirect">
Update
  </Link>
  {/* <Link underline="hover" color="inherit" to = {`/customer/${history.location.index}`}>
 {history.location.index}
  </Link> */}
  {
    history.location.index === "miscellaneous" ? 
    <Link underline="hover" color="inherit" to = {`/customer/${history.location.index}`}>
 Miscellaneous
    </Link> 
    :
    <Link underline="hover" color="inherit" to = {`/customer/update${history.location.index}`}>
    {CommonServices.capitalizeFirstLetter(history.location.index) + " Tax"}
    </Link>
  }
 
</Breadcrumbs>
<ArticleWrapper>

<h5 className="updatesHeding">  {CommonServices.capitalizeFirstLetter(i.heading)}</h5>
<h6>Date of publishing :   {i.publish_date.split("-").reverse().join("-")} </h6>
         
     <div id="artContent" className="updatesContent">
     
     <Markup content={i.content} /> 
 
  
    </div>
  
        
     

    </ArticleWrapper>
    <a href={`${baseUrl3}/${i.file}`} target="_blank" 
    className={classes.myLink}>

    <button className="downloadBtnPdf"> Download  <VscFilePdf style={{display: "flex",
     margin: "0 10px", color: "#e4f0fa", width: "20px", height: "20px"}} /></button>
    </a>
            </div>
        
           ))
         }
        </div>
      
       </MyContainer>
       <Footer />
       </OuterloginContainer>
       </>
  
    )
}
export default UpdateDetails;