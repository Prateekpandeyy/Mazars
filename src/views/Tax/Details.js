import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import Footer from '../../components/Footer/Footer';
import { useHistory, useParams  } from 'react-router';
import axios from 'axios';
import { baseUrl, baseUrl3 } from '../../config/config';
import { Markup } from 'interweave';
import {Breadcrumbs, Box, Typography } from "@material-ui/core";
import CommonServices from '../../common/common.js';
import {  VscFilePdf} from "react-icons/vsc";
import classes from './design.module.css';
import ima from "../../mazars_logo.png";
import { OuterloginContainer } from '../../components/Common/OuterloginContainer';

import { Link } from 'react-router-dom';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

const MyContainer = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    alignItems : "center", 
    width: "100%",
    flexDirection : "column"
  })
  const Disclamair = styled(Box)({
display: "flex",
flexDirection: "column",
width:"100%",
padding: "20px"
  })
  const ArticleWrapper = styled(Box)({
    display: "flex", 
    flexDirection: "column",
  maxWidth: "758px",
  justifyContent : "center",
  alignItems : "center",
  margin: "auto",
    padding: "5px"
  })
  const ArticleHeader = styled(Box)({
    display : "flex",
    width: "100%",
    justifyContent: "space-between",
   
    backgroundColor: "#e4f0fa",
  
    padding: "10px 5px",
    margin: "8px 0px"
  })
  const MyLogo = styled(Box)({
    display : "flex",
    width: "100%",
    height: "auto",
    maxWidth: "100px",
    objectFit: "contain"
  })
  const MyHeading = styled(Box)({
    display : "flex",
    justifyContent: "space-between"
  })
  const RightContent = styled(Box)({
    display: "flex",
    flexDirection: "column"
  })
const Details = () => {
  let history = useHistory();
  let getId = useParams();
  const [data, setData] = useState([])
  const [linkdata, setLinkData] = useState("direct")
 const [docren, setDocren] = useState("")
  useEffect(() => {
    getData()
    readDoc()
  }, [])
  const readDoc = () => {
  //   var mammoth = require("mammoth");
  //   var options = {
  //     styleMap: [
  //         "p[style-name='Section Title'] => h1:fresh",
  //         "p[style-name='Subsection Title'] => h2:fresh"
  //     ]
  // };
  //   fetch(worddoc).then(res => res.arrayBuffer()).then(ab => 
  //     mammoth.convertToHtml({arrayBuffer: ab}, options).then(function(result){
  //     var html = result.value; 
  //    setDocren(html)
  // })
  // .done()
  // )

  }
  const getData = (e) => {
   
   if(history.location.index !== undefined){
    axios.get(`${baseUrl}/customers/getarticles?id=${history.location.index}`)
    .then((res) => {
     console.log("result", res.data.result)
      setData(res.data.result)
      if(history.location.hash == "#direct"){
        setLinkData("direct")
      }
      else if(history.location.hash == "#indirect"){
        setLinkData("indirect")
      }
    })
  }
}

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
             <Link underline="hover" color="inherit" to="/customer/direct">
  Articles
  </Link>
  <Link underline="hover" color="inherit" to = {`/customer/${linkdata}`}>
  {CommonServices.capitalizeFirstLetter(linkdata) + " tax"}
  </Link>
  
 
</Breadcrumbs>
<ArticleWrapper>

  {
    i.content_type === "2" ?
    <>
    <ArticleHeader>
<MyLogo>
<Link to = "/">
<img className={classes.myLogo} src={`${ima}`}/>
</Link>

</MyLogo>
<RightContent>
<h4 style={{color: "#081f8f", fontWeight: 600, letterSpacing: "0.1rem"}}>Mazars Advisory Solutions (MAS)</h4>
<span style={{color: "#0071ce", fontSize: "18px"}}>Building Lasting Relationships</span>
<a href="https://www.masindia.live" target="_blank">www.masindia.live</a>
</RightContent>
  </ArticleHeader>
                <div style={{display : "flex", width: "100%", flexDirection : "column"}}>
           <MyHeading>
           <h5>  {CommonServices.capitalizeFirstLetter(i.heading)}</h5>
         
          <a href={`${baseUrl3}/${i.file}`} target="_blank">
          <VscFilePdf style={{display: "flex", width: "40px", height: "40px"}} />
          </a>
         
         
           </MyHeading>
            <h6>Writer :  {i.writer} </h6>
            <h6> Email : {i.email} </h6>
           <h6>Date of publishing :   {i.publish_date.split("-").reverse().join("-")} </h6>
         
            
             </div> 
     <div id="artContent">
     <Markup content={i.content} /> 
 
  
    </div>
    </> : 
    ""  }
        
     
    
   
    </ArticleWrapper>
    {
      i.content_type === "1" ?
      <div id="artContent">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
    <Viewer fileUrl={`${baseUrl3}/${i.file}`}>
      </Viewer>
      </Worker>
    {/* <iframe src={`${baseUrl3}/${i.file}#toolbar=0`} width="100%" height="500px" /> */}

    </div>
 : ""
    }
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
export default Details;