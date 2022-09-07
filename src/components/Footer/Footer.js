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
       window.open(MyPDF, "blank")
     }
   }
   else{
  
props.showCook("showCookies")
   }
  }
  return (
    <>
   
      <footer>
        <div style={{display: "flex", flexDirection: "column",  justifyContent: "space-evenly", textAlign: "center"}}>
        <SocialIcons />
        <div style={{display: "flex", justifyContent:"center"}}>
        <a onClick = {() => myLink("enquiry")}>
              
              
              Enquiry | &nbsp; 
            
           </a>
        <a onClick = {() => myLink("contactbasic")}>
              
              
              Contact us | &nbsp; 
            
           </a>
           
           
           
             <a onClick = {() => myLink("aboutbasic")}>
        
      
         About us | &nbsp;
      
      </a>
      <a onClick = {() => myLink("needhelp")}> Need help?</a>
  
     
           
        
             
          </div>
{`ISO 27001 certified | Copyright  @${date.getFullYear()} All right reserved`} 
        </div>
      
        <div style={{display : "flex", justifyContent : "center"}}>
      
         </div>

              
      </footer>
    </>
  );
}

export default Footer;
