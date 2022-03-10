import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import './style.css';
import {Box} from "@material-ui/core";
import { styled , makeStyles} from "@material-ui/styles";
import { Markup } from "interweave";
import { useHistory, useParams } from "react-router";
import axios from 'axios';
import {baseUrl} from '../../config/config';
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
 

  const [linkData, setLinkData] = useState([])
  const [showData, setShowData] = useState(false)
 
  let history = useHistory()
  let id = useParams()
  const getId = history.location.index;
useEffect(() => {
  showLinkData()
}, [])
const showLinkData = () => {
 
 if(getId === 2){
  axios.get(`${baseUrl}/customers/getupdated`)
  .then((res) => {
   
    setLinkData(res.data.result)
  })
 }
 else if(getId === 3){
  axios.get(`${baseUrl}/customers/getpage?page=${getId}`)
  .then((res) => {
   console.log("res", res)
    setLinkData([res.data.result])
  })
 }
 else if (getId === 4){
  axios.get(`${baseUrl}/customers/getpage?page=${getId}`)
  .then((res) => {
    console.log("res", res)
    setLinkData([res.data.result])
  })
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

     {
       linkData.map((i) => (
        <Markup content = {i.content} />
       ))
     }
        </div>

      </div>
    
     </MyContainer>


      <Footer />
    </>
  );
}

export default Updates;
