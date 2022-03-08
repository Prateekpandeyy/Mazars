import { useRef, useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import './style.css';
import {Box} from "@material-ui/core";
import CloudImg from './images/cloud.png';
import PaperLess from './images/Paperless.png';
import whatp from './images/video.png';
import costEffective from './images/costEffective.png';
import servicesImg from './images/services.png';
import { styled , makeStyles} from "@material-ui/styles";
import { Markup } from "interweave";
import { useHistory, useParams } from "react-router";

const MyBox = styled(Box)({
  display: "flex", 
 width: "1000px",
 margin: "10px 0px",
  justifyContent : "space-between",
 
  padding : "10px"
})
const ImgBox = styled(Box)({
display: "flex",
width: "20%",
flexDirection: "column",
minHeight: "200px",
alignItems : "center",
padding : "10px"
})
const MyContainer = styled(Box)({
  display : "flex", 
  justifyContent : "center", 
  alignItems : "center", 
  width: "100%",
  flexDirection : "column"
})
const useStyle = makeStyles({
  imgResponsive : {
    display : "flex",
    maxWidth: "25%",
    height : "50px", 
    cursor : "pointer",
   alignItems : "space-between",
    justifyContent: "center",
    textAlign : "justify"
  }
})

function Updates() {
 

  const [linkData, setLinkData] = useState("myData")
  const [showData, setShowData] = useState(false)
 
  let history = useHistory()
  let id = useParams()
  const getId = history.location.index;
useEffect(() => {
  showLinkData()
}, [showData])
const showLinkData = () => {
  console.log(getId === 1)
 if(getId === 1){
   console.log("id", id)
   const myData = localStorage.getItem("myArticles")
  setLinkData(myData)
 }
 else  if(getId === 2){
  console.log("id", id)
  const myData = localStorage.getItem("myUpdates")
 setLinkData(myData)
}
else  if(getId === 3){
  console.log("id", id)
  const myData = localStorage.getItem("myLinks")
 setLinkData(myData)
}
else if (getId === 4){
  console.log("id", id)
  const myData = localStorage.getItem("myFaq")
  setLinkData(myData)
}
}


  
  if(window.location.origin === "http://mazars.multitvsolution.com" && window.location.protocol == 'http:'){
    window.location.href = window.location.href.replace('http:', 'https:')
  }
  
  

 

  
const classes = useStyle()

  return (
    <>
      <Header noSign="noSign" getData = {setShowData} />
     <MyContainer>
   
  
      <div className="StartPage">
        <div className="mainContent22">

     <Markup content = {linkData} />
        </div>
        <MyBox>
      <ImgBox>
      <img src = {servicesImg}
      className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0"}}>Services</h5>
      <p style={{textAlign : "center"}}>
      Caters to all direct & indirect tax queries related to compliance requirements (including transfer pricing), assessment proceedings, litigation matters, opinions and other advisory needs
      </p>
      </ImgBox>
      <ImgBox>
      <img src = {whatp} className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0"}}>Video Confrence</h5>
      <p style={{textAlign : "center"}}>
      Offers video conferencing facility to hold meetings with clients.
      </p>
      </ImgBox> 
      <ImgBox>
      <img src = {costEffective} className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0"}}>Cost Effective</h5>
      <p style={{textAlign : "center"}}>
      Provides cost effective solutions, designed exclusively for clients
      </p>
      </ImgBox>  
      <ImgBox>
      <img src = {CloudImg} className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0"}}>secure platform</h5>
      <p style={{textAlign : "center"}}>A secure platform that ensures total privacy of client’s data.</p>
      </ImgBox> <ImgBox>
      <img src = {PaperLess} className = {classes.imgResponsive} />
      <h5 style={{margin: "10px 0"}}>Paperless</h5>
      <p style={{textAlign : "center"}}>Operates completely in paperless environment.</p>
      </ImgBox>
      </MyBox>
      </div>
    
     </MyContainer>


      <Footer />
    </>
  );
}

export default Updates;
