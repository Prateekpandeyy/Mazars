import React from "react";
import "../../assets/css/style.css";
import MyPDF from "../../views/dFile/LoginManual.pdf"
import MyPDF2 from "../../views/dFile/Manual.docx"
import { Link } from "react-router-dom";
function Footer() {
  const userid = window.localStorage.getItem("userid")
  return (
    <>
      <footer>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", textAlign: "center"}}>
          <p>Copyright @ 2021. All right reserved.</p>
        <div style={{display: "flex", justifyContent:"center"}}>
        <Link to={"/customer/contactbasic"}>
              
              
              Contact Us | &nbsp; 
            
           </Link>
           
           
           
             <Link to={"/customer/aboutbasic"}>
        
      
         About Us | &nbsp;
      
      </Link>
        <a href={MyPDF}
  download> Need help?</a>
  
     
           
           
             
          </div>
        </div>
      
  

              
      </footer>
    </>
  );
}

export default Footer;
