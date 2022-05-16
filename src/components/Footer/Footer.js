import React from "react";
import "../../assets/css/style.css";
import MyPDF from "../../views/dFile/LoginManual.pdf";
import { Link , useHistory} from "react-router-dom";
import Cookies from "js-cookie";
import SocialIcons from "../socialicon.js/SocialIcons";
function Footer(props) {
  let date = new Date()
  let history = useHistory();
  const userid = window.localStorage.getItem("userid")
  const cookieEnable = Cookies.get("accept")
  const myLink = (e) => {
   if(cookieEnable){
     if(e === "enquiry"){
      history.push("/customer/customerquery")
     }
     else if(e === "contactbasic"){
       history.push("/customer/contactbasic")
     }
     else if (e === "aboutbasic"){
       history.push("/customer/aboutbasic")
     }
     else if (e === "needhelp"){
       history.push(`${MyPDF}`)
     }
   }
   else{
  
props.showCook("showCookies")
   }
  }
  return (
    <>
     <SocialIcons />
      <footer>
        <div style={{display: "flex", flexDirection: "column",  justifyContent: "space-evenly", textAlign: "center"}}>
     
        <div style={{display: "flex", justifyContent:"center"}}>
        <a onClick = {() => myLink("enquiry")}>
              
              
              Enquiry | &nbsp; 
            
           </a>
        <a onClick = {() => myLink("contactbasic")}>
              
              
              Contact Us | &nbsp; 
            
           </a>
           
           
           
             <a onClick = {() => myLink("aboutbasic")}>
        
      
         About Us | &nbsp;
      
      </a>
      <a href={MyPDF}  target="_blank"> Need help?</a>
  
     
           
        
             
          </div>
{`Copyright  @${date.getFullYear()} All right reserved`} 
        </div>
      
        <div style={{display : "flex", justifyContent : "center"}}>
      
         </div>

              
      </footer>
    </>
  );
}

export default Footer;
