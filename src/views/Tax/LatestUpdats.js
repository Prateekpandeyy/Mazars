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
import Cookies from "js-cookie";
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
import CookieConsent from "react-cookie-consent";
import CloseIcon from '@material-ui/icons/Close';
import CustomHeading from "../../components/Common/CustomHeading";
const LatestUpdates = () => {
    const [news, getNews] = useState([])
    const [pos,setPos] = useState(1920);   
    const [run, setRun] = useState(true);
    const [showCookie, setShowCookie] = useState(false)
    const [description, setDescription] = useState({})
    const cookieEnable = Cookies.get("accept")
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
      const showCook = () => {
 
        setShowCookie(true)
      }
      const myCookie2 = () => {
 
        if(cookieEnable){
      history.push("/customer/signup")
        }
        else{
         showCook()
        }
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
      
       {
 showCookie === true ?
 <div className="popup">

 <CookieConsent
 debug = {true}
 declineButtonText = {<CloseIcon />}
 onDecline={() => {
   setShowCookie(false)
 }}
 enableDeclineButton 
   disableStyles
   location="none"
   buttonText="Agree"
   expires={1}
   overlay
   declineButtonClasses = "myCookiesdecBtn"
   buttonStyle = {{borderBottomLeftRadius: "1.75rem", 
  
backgroundColor : "#0071CE", border: "1px solid #0071CE", color: "#fff"
, cursor : "pointer", fontSize : "1rem", fontWeight: 500,
minWidth: "100px", minHeight: "3rem", textAlign: "center", display: "block", marginLeft: "auto"}}
onAccept={(e) => {

 Cookies.set("accept", "agree")
}}
   overlayClasses="overlayclass"
  
 >
 <CustomHeading>
 Disclaimer
 </CustomHeading>
 <SubHeading>
 By clicking on the "Agree" button below, the user hereby acknowledges having read and understood the disclaimer below:
 </SubHeading>
<ul>
  <li>
    <CustomTypography>
    The user on his own accord wishes to know more about Mazars Advisory Solutions (MAS) and any of its members for his own information and use.
    </CustomTypography>
  </li>
<li>
  <CustomTypography>
  The user acknowledges that there has been no solicitation, invitation, or inducement of any sort whatsoever from MAS or any of its members to create an Attorney/Consultant-Client relationship.
    </CustomTypography>
    </li>
  <li>

    <CustomTypography>
    The user acknowledges that MAS makes every effort to maintain updated and accurate information on this website and cannot accept responsibility for any prejudice, loss or damage which may occur from use of such information. MAS assumes no liability for the interpretation or use of content or information contained on this website, nor does it offer any warranty of any kind,
   either express or implied in relation to such content or information.
      </CustomTypography>
  </li>

<li>    
  <CustomTypography>
  The user acknowledges that MAS does not intend that links / URLs contained on this website re-directing users to third party websites be considered as referrals to, endorsements of, or affiliations with any such third-party website operators. MAS is not responsible for, and makes no representation or warranty, express or implied, about the content or information contained on such third-party websites.
  </CustomTypography>
</li>
</ul>
 </CookieConsent>
</div>
: 
<MyContainer>
{news.length > 0 ?
<FlashSection>



{
cookieEnable ? 

<span style={{padding: "0px 20px", fontSize: "16px", color: "#464646"}}> 
<marquee id = "scroll_news" onMouseOver={(e) => {
document.getElementById('scroll_news').stop()
}} 
onMouseOut={(e) => {
document.getElementById('scroll_news').start()
}}>
<span style={styles}>
{
news.map((k) => (

<Link className="tabHoverflash mx-2 my-0" to = {{
pathname : `/customer/latestupdates/${k.id}`,
index : k.id
                }}>
{`${k.heading}  |     `}
</Link>
))
}
</span>
</marquee>
</span>
: 

<span style={{padding: "0px 20px", fontSize: "16px", color: "#464646"}}> 
<marquee id = "scroll_news_disale" onMouseOver={(e) => {
document.getElementById('scroll_news_disale').stop()
}} 
onMouseOut={(e) => {
document.getElementById('scroll_news_disale').start()
}}>
<span style={styles}>
{
news.map((k) => (

<p className="tabHoverflash mx-2 my-0" onClick = {() => myCookie2("contactbasic")}>
{`${k.heading}  |      `}
</p>
))
}
</span>
</marquee>
</span>

}



</FlashSection> : ""}
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

}
       <Footer />
       </OuterloginContainer>
      
       </>
  
    )
}
export default LatestUpdates;