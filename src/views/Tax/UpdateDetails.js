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
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import MyContainer from "../../components/Common/MyContainer";
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
   
  
  axios.get(`${baseUrl}/customers/getupdated?id=${id.id}`)
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
            {
              history.location.index && (
                <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to="/customer/updatedirect">
   Update
     </Link>
    
     {
       history.location.index === "miscellaneous" ? 
       <Link underline="hover" color="inherit" to = {`/customer/${history.location.index}`}>
    Miscellaneous
       </Link> 
       :
       <Link underline="hover" color="inherit" to = {`/customer/update${history.location.index}`}>
       {CommonServices.capitalizeFirstLetter(history.location.index) + " tax"}
       </Link>
     }
    
   </Breadcrumbs>
              )
            }
<ArticleWrapper>

<h5 className="updatesHeding">  {CommonServices.capitalizeFirstLetter(i.heading)}</h5>
<h6>Date of publishing :   {i.publish_date.split("-").reverse().join("-")} </h6>
         
{
  i.content_type === "2" ?
  <div id="artContent" className="updatesContent">
     
  <Markup content={i.content} /> 


 </div> : " "
}
   {
      i.content_type === "0" || i.content_type === "1" ?
      <div id="artContent">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
    <Viewer fileUrl={`${baseUrl3}/${i.file}`}>
      </Viewer>
      </Worker>
  
    </div>
 : ""
    }
        
        {
       i.content_type === "3" ?
       <div id="artContent">
      <iframe
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${baseUrl3}/${i.file}`}
        width="100%"
        height="600px"
        frameBorder="0"
        title="slides"
      ></iframe>
  
    </div>
 : ""
    }

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