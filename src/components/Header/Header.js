import { Link, NavLink, useHistory } from "react-router-dom";
import "../../assets/css/style.css";
import mazars from "../../mazars_logo.png";
import { baseUrl } from "../../config/config";
import axios from "axios";
import {useState, useEffect} from 'react';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Cookies from "js-cookie";
function Header({ id, cust_sign, noAdminSign, noTlSign, 
  noTpSign, admin, mtl, mtp, noSign, loginOTP, getData, showCook }) {
  let history = useHistory();

  const custLogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("name");
    localStorage.removeItem("uid");
    localStorage.removeItem("category");
    history.push("/customer/signin");
  }



  return (
    <>
      <div className="header">
        {id && (
         
            <Link to="/customer/questionnaire-page">
              <img src={mazars} className="logo" alt="mazar" />
            </Link>
         
        )}

        {cust_sign && (
          <div className="noSignINBox">
            <Link to="/">
              <img className="logo" src="https://www.mazars.co.in/extension/ezmazars_rwdesign/design/mazars2020/images/mazars-logo.png" className="logo" alt="mazar" />
            </Link>
          </div>
        )}

        {noSign && (
          <div style = {{display : "flex", width: "100%", alignItems: "center",  justifyContent: "space-between"}}>
              <Link to="/">
              <img src={mazars} className="logo" alt="mazar"/>
            </Link>
         
        <CmsCont getData= {getData} showCook = {showCook}/>
           
          </div>
        )}


        {loginOTP && (
          <div>
            <img src={mazars} className="logo" alt="mazar"/>
          </div>
        )}

        {admin && (
          <div>
            <Link to="/admin/start">
              <img src={mazars} className="logo" alt="mazar" />
            </Link>
          </div>
        )}

        {mtl && (
          <div>
            <Link to="/teamleader/start">
              <img src={mazars} className="logo" alt="mazar" />
            </Link>
          </div>
        )}

        {mtp && (
          <div>
            <Link to="/taxprofessional/start">
              <img src={mazars} className="logo" alt="mazar" />
            </Link>
          </div>
        )}

        <div className="noSignINBox">
          {id && (
            <ul className="menu">
              <li style={{ color: "#fff" }}>{id}</li>
              <li onClick={custLogout} style={{ color: "#fff" }}>
                <i className="fa fa-sign-out">logout</i>
              </li>
            </ul>
          )}

          {cust_sign && (
            <button className="customBtn">
            <Link className="SignUpLink"
              to={{
                pathname: "/",
              }}
            >
              Sign In
            </Link>
          </button>
           
          
           
          )}
         
          {admin && !noAdminSign && (
             <button className="customBtn">
             <Link className="SignUpLink"
               to={{
                 pathname: "/admin/login",
               }}
             >
               Sign In
             </Link>
           </button>
          )}

          {mtl && !noTlSign && (
  <button className="customBtn">
  <Link className="SignUpLink"
    to={{
      pathname: "/teamleader/login",
    }}
  >
    Sign In
  </Link>
</button>
          )}

          {mtp && !noTpSign && (
             <button className="customBtn">
             <Link className="SignUpLink"
               to={{
                 pathname: "/taxprofessional/login",
               }}
             >
               Sign In
             </Link>
           </button>
          )}



        </div>
      </div>
    </>
  );
}

export default Header;

const CmsCont = (props) => {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  useEffect(() => {
    let comming = sessionStorage.getItem("commingSoon")
console.log("coing",comming)
    if(comming) {
      
    }
    else {
      history.push("/customer/comming-soon")
    }
  }, [])
  let history = useHistory()
  const handleClickOn = () => {
    setOpen(false);
  };
  const handleClickOff = () => {

    setOpen(true);
  };
  const handleClickOn2 = () => {

    setOpen2(false);
  };
  const handleClickOff2 = () => {

    setOpen2(true);
  };
  const handleClickOn3 = () => {

    setOpen3(false);
  };
  const handleClickOff3 = () => {

    setOpen3(true);
  };
  const handleClickUpdateOpen = () => {
    setUpdateOpen(true)
  }
  const handleClickUpdateClose = () => {
    setUpdateOpen(false)
  }
  const cookieEnable = Cookies.get("accept")
  const myLink = (e) => {
   if(cookieEnable){
     if(e === "direct"){
      history.push("/customer/direct")
     }
     else if(e === "indirect"){
       history.push("/customer/indirect")
     }
     else if (e === "photo"){
       history.push("/customer/media")
     }
     else if (e === "video"){
      history.push("/customer/videolist")
    }
    else if (e === "mediacontent"){
      history.push("/customer/mediacontent")
    }
    else if (e === "faqlist"){
      history.push("/customer/faq-question")
    }
    else if (e === "linklist"){
      history.push("/customer/link")
    }
     
    else if (e === "updatelist"){
      history.push("/customer/updates")
    }
    else if (e === "updatedirect"){
      history.push("/customer/updatedirect")
    }
    else if (e === "updateindirect") {
      history.push("/customer/updateindirect")
    }
    else if (e === "updatemiscellaneous"){
      history.push("/customer/miscellaneous")
    }
    else if (e === "enquiry"){
      history.push("/customer/customerquery")
    }
    else if (e === "contactUs"){
      history.push("/customer/contactbasic")
    }
   }
   else{
    
props.showCook("showCookies")
   }
  }
  return(
    <>
<div className="clientSubMenu">
  {/* <li className="nav-item tabHoverLinksubMenu"  onMouseEnter={() => handleClickOff()}  onMouseLeave = {() => handleClickOn()}>
       <ListItemButton>
       <span className="nav-item">
                     Articles
                   </span>
</ListItemButton>
   
         <Collapse in={open}  unmountOnExit>
           <List component="div" className="myLink22">
           <ul>
                
                  
                     <li className="tabHover mx-1" onClick = {() => myLink("direct")}>
                   <span className="menu-title" data-i18n="">
                  Direct Tax
                   </span>
                   </li>
                 
                   
                    
                    
                     <li className="tabHover mx-1" onClick = {() => myLink("indirect")}>
                   <span className="menu-title" data-i18n="">
                Indirect Tax
                   </span>
                   </li>
                  
                    
                   </ul>
           </List>
         </Collapse>
                 </li>
    */}

<li className="nav-item tabHoverLinksubMenu" onClick = {() => myLink("direct")}> 
      <ListItemButton>
     Articles
    </ListItemButton>
</li>

                 <li className="nav-item tabHoverLinksubMenu"  onMouseEnter={() => handleClickUpdateOpen()}  onMouseLeave = {() => handleClickUpdateClose()}>
       <ListItemButton>
       <span className="nav-item">
                    Updates
                   </span>
</ListItemButton>
   
         <Collapse in={updateOpen}  unmountOnExit>
           <List component="div" className="myLink22">
           <ul>
                
                  
                     <li className="tabHover mx-1" onClick = {() => myLink("updatedirect")}>
                   <span className="menu-title" data-i18n="">
                  Direct Tax
                   </span>
                   </li>
                 
                   
                    
                    
                     <li className="tabHover mx-1" onClick = {() => myLink("updateindirect")}>
                   <span className="menu-title" data-i18n="">
                Indirect Tax
                   </span>
                   </li>
                   <li className="tabHover mx-1" onClick = {() => myLink("updatemiscellaneous")}>
                   <span className="menu-title" data-i18n="">
                   Miscellaneous
                   </span>
                   </li>
                  
                    
                   </ul>
           </List>
         </Collapse>
                 </li>
   
       

      <li className="nav-item tabHoverLinksubMenu" onClick = {() => myLink("linklist")}> 
      <ListItemButton>
       Important Links
    </ListItemButton>
</li>
      <li className="nav-item tabHoverLinksubMenu" 
         onMouseLeave = {() => handleClickOn2()}>
                 
                 <ListItemButton 
                 onMouseEnter={() => handleClickOff2()}>
   <span className="nav-item">
                  Media Gallery
                   </span>
         </ListItemButton>  
         <Collapse in={open2}  unmountOnExit>
           <List component="div" className="myLink22">
           <ul>
                
               
   <li className="tabHover mx-1" onClick = {() => myLink("photo")}>
                   <span className="menu-title" data-i18n="">
               Photo Gallery
                   </span>
                   </li>
   
                   
                    
                   
                     <li className="tabHover mx-1" onClick = {() => myLink("video")}>
                   <span className="menu-title" data-i18n="">
              Video Gallery
                   </span>
                   </li>
                   
                  
                     <li className="tabHover mx-1" onClick = {() => myLink("mediacontent")}>
                   <span className="menu-title" data-i18n="">
                       Media news
                   </span>
                   </li>
                   
                    
                   </ul>
           </List>
         </Collapse>
                 </li>
   
                 <li className="nav-item tabHoverLinksubMenu" onClick = {() => myLink("faqlist")}> 
    {/* <NavLink 
    to = {{
  pathname : "/customer/updates",
  index : 4
}} > */}
 <ListItemButton>
      FAQs
   </ListItemButton>
    </li>
    <li className="nav-item tabHoverLinksubMenu" 
         onMouseLeave = {() => handleClickOn3()}>
                 
                 <ListItemButton 
                 onMouseEnter={() => handleClickOff3()}>
   <span className="nav-item">
                  Contact Us
                   </span>
         </ListItemButton>  
         <Collapse in={open3}  unmountOnExit>
           <List component="div" className="myLink22">
           <ul>
                
                  
           <li className="tabHover mx-1" onClick = {() => myLink("contactUs")}>
                   <span className="menu-title" data-i18n="">
              Our Office
                   </span>
                   </li>
   <li className="tabHover mx-1" onClick = {() => myLink("enquiry")}>
                   <span className="menu-title" data-i18n="">
               Enquiry Form
                   </span>
                   </li>
   
                   
                    
                
                   
                  
                  
                   
                    
                   </ul>
           </List>
         </Collapse>
                 </li>
</div>
    </>
  )
}
