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
  let history = useHistory()
  const handleClick = () => {

    setOpen(!open);
  };
  const getPageLink = (e) => {
   
     if(e === "direct"){
       axios.get(`${baseUrl}/customers/getarticles?type=${e}`)
       .then((res) => {
         console.log("response", res)
       })
      // localStorage.setItem("myArticles", res.data.result.content)
     }
     else if (e === 2){
      // localStorage.setItem("myUpdates", res.data.result.content)
     }
     else if (e === 3){
      // localStorage.setItem("myLinks", res.data.result.content)
     }
     else if (e === 5){
      // localStorage.setItem("myFaq", res.data.result.content)
     }
     else if (e === 4){
      // localStorage.setItem("myMediaGallery", res.data.result.content)
     }
  
    }
  return(
    <>
<div className="clientSubMenu">
{/* <Link to = {{
  pathname : "/customer/updates",
  index : 1
}} className="tabHoverLink" onClick={(e) => {getPageLink(1)}}>
     Articles
    </Link> */}
       <li className="nav-item" className="tabHoverLink" style={{listStyle : "none", height: "40px"}}>
                 
                 <ListItemButton 
                 onMouseEnter={() => handleClick()}>
           
       
   
   
   
                   <span className="menu-title" data-i18n="">
                     Articles
                   </span>
                   {open ? <ExpandLess /> : <ExpandMore />}
                
   
         
          
         </ListItemButton>
   
         <Collapse in={open}  unmountOnExit style={{textAlign: "center", zIndex: "99999", backgroundColor : "#fff"}}>
           <List component="div" disablePadding style={{backgroundColor : "#fff", zIndex: "99999"}}>
           <ul style={{listStyle : "none", textAlign : "left", padding: "10px 15px", backgroundColor : "#fff", zIndex: "99999"}}>
                     <li>
                     <Link to = "/customer/direct">
                     
                   <span className="menu-title" data-i18n="">
                  Direct Tax
                   </span>
                   </Link >
                     </li>
                     <li>
                     <Link to="/customer/indirect">
                     
                   <span className="menu-title" data-i18n="">
                Indirect Tax
                   </span>
                   </Link>
                     </li>
                   </ul>
           </List>
         </Collapse>
                 </li>
   
          
    <Link to = {{
  pathname : "/customer/updates",
  index : 2
}} className="tabHoverLink" onClick={(e) => {getPageLink(2)}}>
      Updates
    </Link>

    <Link 
    to = {{
  pathname : "/customer/updates",
  index : 3
}} className="tabHoverLink" onClick={(e) => {getPageLink(3)}}>
     Important Links
    </Link>
    <Link 
    to = {{
  pathname : "/customer/updates",
  index : 5
}} className="tabHoverLink" onClick={(e) => {getPageLink(4)}}>
     Media Gallery
    </Link>
    <Link 
    to = {{
  pathname : "/customer/updates",
  index : 4
}} className="tabHoverLink" onClick={(e) => {getPageLink(5)}}>
      FAQ
    </Link>
</div>
    </>
  )
}
