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
  const myData = localStorage.getItem("myMediaGallery")
  setLinkData(myData)
}
else if (getId === 5){
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
   
  
     <div className="StartPageDetails">
          <div className="mainContent222">

     <Markup content = {linkData} />
        </div>

      </div>
    
     </MyContainer>


      <Footer />
    </>
  );
}

export default Updates;
