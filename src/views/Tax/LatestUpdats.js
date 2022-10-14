import React , {useState, useEffect} from 'react';
import Header from "../../components/Header/Header";
import { styled , makeStyles} from "@material-ui/styles";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl , baseUrl3} from '../../config/config';
import { Box } from "@material-ui/core";
import { useHistory } from 'react-router';
import { Markup } from 'interweave';
import Footer from '../../components/Footer/Footer';
import classes from './design.module.css';
import FlashSection from "../../components/Common/FlashSection";
import { OuterloginContainer } from '../../components/Common/OuterloginContainer';
import MyContainer from "../../components/Common/MyContainer";
import SubHeading from "../../components/Common/SubHeading";
import CustomTypography from "../../components/Common/CustomTypography";
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import {
  Presentation, Slide, Text,
  Shape, Image, render
} from "react-pptx";
import { useParams } from 'react-router';
const LatestUpdates = () => {
    const [news, getNews] = useState([])
    const [pos,setPos] = useState(1920);   
    const [run, setRun] = useState(true);
    const [description, setDescription] = useState({})
    let history = useHistory()
    let getId = useParams()
  
    let  width = 1920
    useEffect(() => {
        latestNews()
      }, [])
      const latestNews = () => {
        axios.get(`${baseUrl}/customers/getnews`)
        .then((res) =>{
        let pp = []
        console.log("getId", getId.id)
          if(res.data.code === 1){
            res.data.result.map((i) => {
             pp.push(i)
             if(i.id == getId.id){
              
               setDescription(i)
             }
            })
            getNews(pp)
          }
        })
      }
      const scrollEff = () => {
        if(run) setPos(p=>p<width? p+1: -width);        
      }
      
      useEffect(() => {
        const tm = setTimeout(scrollEff, 10);
        return () => clearTimeout(tm);
      },[pos]);
      
      const onMouseEnter = (e) => {
        // console.log("mouse enter");
        setRun(false);
      }
      
      const onMouseLeave = (e) => {
        // console.log("mouse leave");
        setRun(true);
        setPos(pos+1); // to trigger useEffect 
      }
      const styles = {
        position: "relative", 
       display: "flex",
        fontSize: "1em",
        justifyContent : "center",
        right: pos + "px",
       
      };
      console.log()
    return(
       <>
       <OuterloginContainer>
       <Header noSign="noSign" />
        <MyContainer>
   
        <FlashSection>
 <h1 style={styles} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave} 
        >
  {
     news.map((i, e) => (
<>

  <span style={{display : "flex"}}>
  <span style={{padding: "0px 20px", fontSize: "16px", color: "464b4b"}}> 

<Link className="tabHoverflash" to = {{
  pathname : `/customer/latestupdates/${i.id}`,
 index : i.id
                       }}>
{i.heading} 
</Link> </span>

{e < news.length - 1 === true ? <span> | </span> : ""}
 </span>
  
</> 

     ))
   }
   
  </h1>
  </FlashSection>
   
    <div className={classes.articleContent}>
    <div className={classes.articlesDetails}>
        <CustomTypography>
        {description.heading}
        </CustomTypography>
  {
    description.content_type === "2" ?
    <Markup content={description.news} /> : ""
  }

   {
      description.content_type === "0" || description.content_type === "1" ?
      <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
    <Viewer fileUrl={`${baseUrl3}/${description.file}`}>
      </Viewer>
      </Worker>
  
    </div>
 : ""
    }
        
        {
       description.content_type === "3" ?
       <div id="artContent">
      <iframe
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${baseUrl3}/${description.file}`}
        width="100%"
        height="600px"
        frameBorder="0"
        title="slides"
      ></iframe>
  
    </div>
 : ""
    }
          </div>
      
        </div>
      
       </MyContainer>
       <Footer />
       </OuterloginContainer>
      
       </>
  
    )
}
export default LatestUpdates;