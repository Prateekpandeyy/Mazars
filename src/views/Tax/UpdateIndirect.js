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
import worddoc from './convertpdf.pdf';
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
const UpdateIndirect = () => {
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
        
            <div className={classes.articlesDetails}>
             <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
             <Link underline="hover" color="inherit" to="/customer/direct">
  Updates
  </Link>
  <Link underline="hover" color="inherit" to = {`/customer`}>
Indirect Updates
  </Link>
  
 
</Breadcrumbs>
<h4>Indirect Updates</h4>
            </div>
        
       
        </div>
      
       </MyContainer>
       <Footer />
       </OuterloginContainer>
       </>
  
    )
}
export default UpdateIndirect;