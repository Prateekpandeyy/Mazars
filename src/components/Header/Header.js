import { Link, NavLink, useHistory } from "react-router-dom";
import "../../assets/css/style.css";
import mazars from "../../mazars_logo.png";
import { baseUrl } from "../../config/config";
import axios from "axios";
import {useState} from 'react';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
function Header({ id, cust_sign, noAdminSign, noTlSign, 
  noTpSign, admin, mtl, mtp, noSign, loginOTP, getData }) {
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
          <div>
        <CmsCont getData= {getData} />
            </div>
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

const CmsCont = () => {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  let history = useHistory()
  const handleClick = () => {

    setOpen(!open);
  };
  const handleClick2 = () => {

    setOpen2(!open2);
  };
 
  return(
    <>
<div className="clientSubMenu">

       <li className="nav-item" className="tabHoverLinksubMenu" style={{listStyle : "none",
        height: "20px", minWidth: "100px", display: "flex", justifyContent : "center",
        alignItems : "center", flexDirection : "column"}}  onMouseLeave = {() => handleClick()}>
                 
                 <ListItemButton 
                
                 onMouseEnter={() => handleClick()}>
           
       
   
   
   
                   <span className="nav-item">
                     Articles
                   </span>
                   {open ? <ExpandLess /> : <ExpandMore />}
                
   
         
          
         </ListItemButton>
   
         <Collapse in={open}  unmountOnExit>
           <List component="div" className="myLink22">
           <ul style={{listStyle : "none", textAlign : "center", 
           display: "flex", padding: "4px", width: "100px", flexDirection:"column",  zIndex: "99999"}}>
                
                     <NavLink to = "/customer/direct">
                     <li className="tabHover">
                   <span className="menu-title" data-i18n="">
                  Direct Tax
                   </span>
                   </li>
                   </NavLink>
                   
                    
                     <NavLink to="/customer/indirect">
                     <li className="tabHover">
                   <span className="menu-title" data-i18n="">
                Indirect Tax
                   </span>
                   </li>
                   </NavLink>
                    
                   </ul>
           </List>
         </Collapse>
                 </li>
   
          
    <NavLink to = {{
  pathname : "/customer/updates",
  index : 2
}} className="tabHoverLink">
      Updates
    </NavLink>

    <NavLink 
    to = {{
  pathname : "/customer/updates",
  index : 3
}} className="tabHoverLink">
     Important Links
    </NavLink>
   
      <li className="nav-item" className="tabHoverLinksubMenu" style={{listStyle : "none",
        height: "20px", minWidth: "100px", display: "flex", justifyContent : "center",
        alignItems : "center", flexDirection : "column"}} onMouseLeave = {() => handleClick2()}>
                 
                 <ListItemButton 
                 onMouseEnter={() => handleClick2()}>
           
       
   
   
   
                   <span className="nav-item">
                  Media Gallery
                   </span>
                   {open2 ? <ExpandLess /> : <ExpandMore />}
                
   
         
          
         </ListItemButton>
   
         <Collapse in={open2}  unmountOnExit>
           <List component="div" className="myLink22">
           <ul style={{listStyle : "none", textAlign : "center", 
           display: "flex", padding: "4px", width: "120px", 
           flexDirection:"column",  zIndex: "99999"}}>
                
                      <NavLink 
    to = {{
  pathname : "/customer/media",
  index : 5
}} className="tabHoverLink">
     Media Gallery
    </NavLink> 
                   
                    
                     <NavLink to="/customer/videogallery">
                     <li className="tabHover">
                   <span className="menu-title" data-i18n="">
              Video Gallery
                   </span>
                   </li>
                   </NavLink>
                   <NavLink to="/customer/mediacontent">
                     <li className="tabHover">
                   <span className="menu-title" data-i18n="">
                       Media Content
                   </span>
                   </li>
                   </NavLink>
                    
                   </ul>
           </List>
         </Collapse>
                 </li>
   
          
    <NavLink 
    to = {{
  pathname : "/customer/updates",
  index : 4
}} className="tabHoverLink">
      FAQ
    </NavLink>
</div>
    </>
  )
}
