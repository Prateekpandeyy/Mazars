import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Badge } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../config/config";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ima from "../../logo.jpeg"
import Collapse from '@mui/material/Collapse';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useHistory } from "react-router";
import './list.css';
import ScheduleIcon from '@material-ui/icons/Schedule';
function Sidebar({ adminDashboard, custDashboard, TLDashboard, TPDashboard , feedbackNumber}) {
  const [toggleState, setToggleState] = useState(false);
  const [feedbackNumber2, setfeedbackNumber2] = useState();
  const [feedbackNumbertl, setfeedbackNumbertl] = useState();
  const [feedbackNumbertp, setfeedbackNumbertp] = useState();
  const [open, setOpen] = useState(false)
  const [logo, setLogo] = useState("customer/dashboard")
  const tlkey= window.localStorage.getItem("tlkey");
  const tpkey = window.localStorage.getItem("tpkey");
  const adminkey = window.localStorage.getItem("adminkey")
  let history = useHistory()
  const toggleTab = (index) => {
  
    setToggleState(index);
  };
const feedNumber = {
  fontSize: "10.5px",
  height: "15px",
  backgroundColor: "green",
  color: "white",
  display: "inline-block",
  margin: "0px 0px 20px 0px",
  padding: "9px 10px",
    borderRadius: "50%"
}
useEffect(() => {
  getFeedback4();
}, [custDashboard])


useEffect(() => {
  getFeedback2();
}, [adminDashboard])

const getFeedback4 = () => {
  setLogo("/#/customer/dashboard")
}
const getFeedback2 = () => {
  if(adminDashboard != undefined){
    axios.get(`${baseUrl}/admin/getFeedback?uid=${JSON.parse(adminkey)}&&type=total`).then((res) => {
setLogo("admin/dashboard")
      if (res.data.code === 1) {
       
       if(res.data.result != undefined){
         setfeedbackNumber2(res.data.result[0].total)
         setLogo("/#/admin/dashboard")
       }
      }
    });
  }
  if(window.location.hash.split("/").slice(-1) == "recording" || window.location.hash.split("/").slice(-1) == "schedule"){
    setOpen(true)
  }

};
const getFeedbacktl = () => {
 if(TLDashboard != undefined){
  axios
  .get(`${baseUrl}/customers/getFeedback?tl_id=${JSON.parse(tlkey)}&&type=total`)
  .then((res) => {
    setLogo("teamleader/dashboard")
    if(res.data.result != undefined){
      setfeedbackNumbertl(res.data.result[0].total)
      setLogo("/#/teamleader/dashboard")
    }
  });
 }
 if(window.location.hash.split("/").slice(-1) == "recording" || window.location.hash.split("/").slice(-1) == "schedule"){
  setOpen(true)
}
};
useState(() => {
  getFeedbacktl();
}, [TLDashboard])

const getFeedbacktp = () => {
  if(TPDashboard != undefined){
    axios
    .get(`${baseUrl}/customers/getFeedback?tp_id=${JSON.parse(tpkey)}&&type=total`)
    .then((res) => {
      setLogo("taxprofessional/dashboard")
      if(res.data.result != undefined){
        setfeedbackNumbertp(res.data.result[0].total)
        setLogo("/#/taxprofessional/dashboard")
      }
    });
  }
  if(window.location.hash.split("/").slice(-1) == "recording" || window.location.hash.split("/").slice(-1) == "schedule"){
    setOpen(true)
  }
};
useState(() => {
  getFeedbacktp();
}, [TPDashboard])

const handleClick = () => {

  setOpen(!open);
};
  return (
    <>
      <div
        className="main-menu menu-fixed menu-light menu-accordion  menu-shadow "
        data-scroll-to-active="true"
        data-img="https://themeselection.com/demo/ chameleon-free-bootstrap-admin-template/theme-assets/images/backgrounds/02.jpg"
      >
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mr-auto">
              <a className="navbar-brand" href={logo}>
                <img
                style={{display : "flex", width:"75%", padding: "12px 30px 12px 8px"}}
                  className="brand-logo"
                  alt="Chameleon admin logo"
                  src={`${ima}`}
                />
               
              </a>
            </li>
            <li className="nav-item d-md-none">
              <a className="nav-link close-navbar">
                <i className="fa fa-times"></i>
              </a>
            </li>
          </ul>
        </div>

        <div className="main-menu-content">
          {custDashboard && (
            <ul
              className="navigation navigation-main"
              id="main-menu-navigation"
              data-menu="menu-navigation"
            >
              <li className="nav-item">
                <NavLink to={"/customer/dashboard"}>
                  <i className="fa fa-home"></i>
                  <span className="menu-title" data-i18n="">
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li className={toggleState && ""} onClick={() => toggleTab("active")}>
                <NavLink to={"/customer/queries"}>
                  <i className="fa fa-clone"></i>
                  <span className="menu-title" data-i18n="">
                    Queries
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/customer/proposal"}>
                  <i className="fa fa-envelope"></i>
                  <span className="menu-title" data-i18n="">
                    Proposal
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/customer/paymentstatus"}>
                  <i className="fa fa-file-text"></i>
                  <span className="menu-title" data-i18n="">
                    Payment Status
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/customer/assignment"}>
                  <i className="fa fa-file"></i>
                  <span className="menu-title" data-i18n="">
                    Assignments
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/customer/schedule"}>
                  <i className="fa fa-rss-square"></i>
                  <span className="menu-title" data-i18n="">
                    Schedule
                  </span>
                </NavLink>
              </li>


              <li className="nav-item">
                <NavLink to={"/customer/feedback-data"}>
                <i class="fa">
                  <FeedbackIcon />
                </i>
                  <span className="menu-title" data-i18n="">
                    Feedback
                  </span>
                </NavLink>
              </li>
              

              
              <li className="nav-item">
                <NavLink to={"/customer/contact"}>
                <i class="fa fa-address-book"></i>
                  <span className="menu-title" data-i18n="">
                   Contact Us
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/customer/about"}>
                <i class="fa fa-info"></i>
                  <span className="menu-title" data-i18n="">
                   About Us
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/customer/modalmanual"}>
                <i class="fa fa-question"></i>
                  <span className="menu-title" data-i18n="">
                   Help 
                  </span>
                </NavLink>
              </li>
            </ul>
          )}

          {adminDashboard && (
            <ul
              className="navigation navigation-main"
              id="main-menu-navigation"
              data-menu="menu-navigation"
            >
              <li className="nav-item">
                <NavLink to={"/admin/dashboard"}>
                  <i className="fa fa-home"></i>
                  <span className="menu-title" data-i18n="">
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/admin/queriestab"}>
                  <i className="fa fa-clone"></i>
                  <span className="menu-title" data-i18n="">
                    Queries
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/admin/proposal"}>
                  <i className="fa fa-envelope"></i>
                  <span className="menu-title" data-i18n="">
                    Proposals
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/admin/adinvoice"}>
                  <i className="fa fa-file-text"></i>
                  <span className="menu-title" data-i18n="">
                   Invoice
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/admin/paymentstatus"}>
                  <i className="fa fa-file-text"></i>
                  <span className="menu-title" data-i18n="">
                    Payment Status
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/admin/assignment"}>
                  <i className="fa fa-file"></i>
                  <span className="menu-title" data-i18n="">
                    Assignments
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                 
              <ListItemButton  onMouseEnter={() => handleClick()}>
        
      <span className="listStyle">
      <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>


                <span className="menu-title" data-i18n="">
                  Schedule
                </span>
                {open ? <ExpandLess /> : <ExpandMore />}
                </span>

      
       
      </ListItemButton>

      <Collapse in={open}  unmountOnExit>
        <List component="div" disablePadding>
        <ul>
                  <li>
                  <NavLink to={"/admin/schedule"}>
                  
                <span className="menu-title" data-i18n="">
                  Schedule
                </span>
                </NavLink>
                  </li>
                  <li>
                  <NavLink to={"/admin/recording"}>
                  
                <span className="menu-title" data-i18n="">
                Recording
                </span>
                </NavLink>
                  </li>
                </ul>
        </List>
      </Collapse>
              </li>

            

              <li className="nav-item">
                <NavLink to={"/admin/teamleaders"}>
                  <i className="fa fa-users"></i>
                  <span className="menu-title" data-i18n="">
                    Team Leaders
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/admin/taxprofessionals"}>
                <i class="fa fa-user-plus"></i>
                  <span className="menu-title" data-i18n="">
                    Tax Professionals
                  </span>
                </NavLink>
              </li>
               <li className ="nav-item">
                 <NavLink to={"/admin/customers"}>
                 <i class="fa fa-user"></i>
                   <span className="menu-title" data-i18n="">
                  Client
                  </span>
                 </NavLink>
               </li>
               <li className ="nav-item">
                 <NavLink to={"/admin/reportlist"}>
                 <i class="fa fa-address-book"></i>
                   <span className="menu-title" data-i18n="">
                   Report
                  </span>
                 </NavLink>
               </li>
              <li className="nav-item">
                <NavLink to={"/admin/feedback"}>
                  <i className="fa fa-file-text"></i>
                  <span className="menu-title" data-i18n="">
                 Feedback <sup style={feedNumber}>{feedbackNumber2}</sup> 
          
                  </span>
                  {/* Feedback  <span className="badge">{feedbackNumber2}</span> */}
                </NavLink>
              </li>
            </ul>
          )}

          {TLDashboard && (
            <ul
              className="navigation navigation-main"
              id="main-menu-navigation"
              data-menu="menu-navigation"
            >
              <li className="nav-item">
                <NavLink to={"/teamleader/dashboard"}>
                  <i className="fa fa-home"></i>
                  <span className="menu-title" data-i18n="">
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/teamleader/queriestab"}>
                  <i className="fa fa-clone"></i>
                  <span className="menu-title" data-i18n="">
                    Queries
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/teamleader/proposal"}>
                  <i className="fa fa-envelope"></i>
                  <span className="menu-title" data-i18n="">
                    Proposal
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/teamleader/tlinvoice"}>
                  <i className="fa fa-file-text"></i>
                  <span className="menu-title" data-i18n="">
                   Invoice
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/teamleader/paymentstatus"}>
                  <i className="fa fa-file-text"></i>
                  <span className="menu-title" data-i18n="">
                    Payment Status
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/teamleader/assignment"}>
                  <i className="fa fa-file"></i>
                  <span className="menu-title" data-i18n="">
                    Assignments
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                 
              <ListItemButton onMouseEnter={() => handleClick()}>
        
        <span className="listStyle">
        <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
  
  
                  <span className="menu-title" data-i18n="">
                    Schedule
                  </span>
                  {open ? <ExpandLess /> : <ExpandMore />}
                  </span>
  
        
         
        </ListItemButton>
  
      <Collapse in={open}  unmountOnExit>
        <List component="div" disablePadding>
        <ul>
                  <li>
                  <NavLink to={"/teamleader/schedule"}>
                 
                <span className="menu-title" data-i18n="">
                  Schedule
                </span>
                </NavLink>
                  </li>
                  <li>
                  <NavLink to={"/teamleader/recording"}>
                 
                <span className="menu-title" data-i18n="">
                Recording
                </span>
                </NavLink>
                  </li>
                </ul>
        </List>
      </Collapse>
              </li>
              <li className="nav-item">
                <NavLink to={"/teamleader/reports"}>
                <i class="fa fa-address-book"></i>
                  <span className="menu-title" data-i18n="">
                    Reports
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/teamleader/addteamprof"}>
                <i class="fa fa-user-plus"></i>
                  <span className="menu-title" data-i18n="">
                    View T.P
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/teamleader/feedback"}>
                  <i className="fa fa-file-text"></i>
                  <span className="menu-title" data-i18n="">
                  Feedback <sup style={feedNumber}>{feedbackNumbertl}</sup>
                  </span>
                </NavLink>
              </li>
              
            
            </ul>
          )}

          {TPDashboard && (
            <ul
              className="navigation navigation-main"
              id="main-menu-navigation"
              data-menu="menu-navigation"
            >
              <li className="nav-item">
                <NavLink to={"/taxprofessional/dashboard"}>
                  <i className="fa fa-clone"></i>
                  <span className="menu-title" data-i18n="">
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/taxprofessional/queriestab"}>
                  <i className="fa fa-clone"></i>
                  <span className="menu-title" data-i18n="">
                    Queries
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/taxprofessional/proposal"}>
                  <i className="fa fa-envelope"></i>
                  <span className="menu-title" data-i18n="">
                    Proposal
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/taxprofessional/tpinvoice"}>
                  <i className="fa fa-file-text"></i>
                  <span className="menu-title" data-i18n="">
                   Invoice
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/taxprofessional/paymentstatus"}>
                  <i className="fa fa-file-text"></i>
                  <span className="menu-title" data-i18n="">
                    Payment Status
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/taxprofessional/assignment"}>
                  <i className="fa fa-file"></i>
                  <span className="menu-title" data-i18n="">
                    Assignments
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                 
              <ListItemButton onMouseEnter={() => handleClick()}>
        
        <span className="listStyle">
        <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
  
  
                  <span className="menu-title" data-i18n="">
                    Schedule
                  </span>
                  {open ? <ExpandLess /> : <ExpandMore />}
                  </span>
  
        
         
        </ListItemButton>
  
      <Collapse in={open}  unmountOnExit>
        <List component="div" disablePadding>
        <ul>
                  <li>
                  <NavLink to={"/taxprofessional/schedule"}>
                 
                <span className="menu-title" data-i18n="">
                  Schedule
                </span>
                </NavLink>
                  </li>
                  <li>
                  <NavLink to={"/taxprofessional/recording"}>

                <span className="menu-title" data-i18n="">
                Recording
                </span>
                </NavLink>
                  </li>
                </ul>
        </List>
      </Collapse>
              </li>
              <li className="nav-item">
                <NavLink to={"/taxprofessional/reports"}>
                <i class="fa fa-address-book"></i>
                  <span className="menu-title" data-i18n="">
                    Reports
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/taxprofessional/feedback"}>
                  <i className="fa fa-file-text"></i>
                  <span className="menu-title" data-i18n="">
                  Feedback <sup style={feedNumber}>{feedbackNumbertp}</sup> 
                  </span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className="navigation-background"></div>
      </div>
    </>
  );
}

export default Sidebar;
