import React from "react";
import "../../assets/css/style.css";
import MyPDF from "../../views/ManualImg/newUser.pdf";

import { Link } from "react-router-dom";
function Footer() {
  let date = new Date()
  const userid = window.localStorage.getItem("userid")
  return (
    <>
      <footer>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", textAlign: "center"}}>
        
        <div style={{display: "flex", justifyContent:"center"}}>
        <Link to={"/customer/customerquery"}>
              
              
              Enquiry | &nbsp; 
            
           </Link>
        <Link to={"/customer/contactbasic"}>
              
              
              Contact Us | &nbsp; 
            
           </Link>
           
           
           
             <Link to={"/customer/aboutbasic"}>
        
      
         About Us | &nbsp;
      
      </Link>
        <a href={MyPDF} target="_blank"> Need help?</a>
  
     
           
           
             
          </div>
{`Copyright  @${date.getFullYear()} All right reserved`} 
        </div>
      
  

              
      </footer>
    </>
  );
}

export default Footer;
