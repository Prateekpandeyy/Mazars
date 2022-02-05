import React from "react";
import "../../assets/css/style.css";
import MyPDF from "../../views/ManualImg/newUser.pdf";

import { Link } from "react-router-dom";
function Footer() {
  const userid = window.localStorage.getItem("userid")
  return (
    <>
      <footer style={{backgroundColor : "rgb(158, 164, 128)"}}>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", textAlign: "center"}}>
          <p style={{ color: "#464B4B"}}>Copyright @ 2021. All right reserved.</p>
        <div style={{display: "flex", justifyContent:"center"}}>
        <Link to={"/customer/contactbasic"}>
              
              
              Contact Us | &nbsp; 
            
           </Link>
           
           
           
             <Link to={"/customer/aboutbasic"}>
        
      
         About Us | &nbsp;
      
      </Link>
        <a href={MyPDF} target="_blank"> Need help?</a>
  
     
           
           
             
          </div>
        </div>
      
  

              
      </footer>
    </>
  );
}

export default Footer;
