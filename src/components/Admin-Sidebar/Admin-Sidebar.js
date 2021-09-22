import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Badge } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../config/config";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ScheduleIcon from '@material-ui/icons/Schedule';
function Sidebar({ adminDashboard, custDashboard, TLDashboard, TPDashboard , feedbackNumber}) {
  const [toggleState, setToggleState] = useState(false);
  const [feedbackNumber2, setfeedbackNumber2] = useState();
  const [feedbackNumbertl, setfeedbackNumbertl] = useState();
  const [feedbackNumbertp, setfeedbackNumbertp] = useState();
  const [open, setOpen] = useState(false)
  const tlkey= window.localStorage.getItem("tlkey");
  const tpkey = window.localStorage.getItem("tpkey");
  const adminkey = window.localStorage.getItem("adminkey")
  const toggleTab = (index) => {
    console.log(index);
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
  getFeedback2();
}, [adminDashboard])
const getFeedback2 = () => {
  if(adminDashboard != undefined){
    axios.get(`${baseUrl}/customers/getFeedback?uid=${JSON.parse(adminkey)}&&type=total`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        // setFeedBackData(res.data.result);
       if(res.data.result != undefined){
         setfeedbackNumber2(res.data.result[0].total)
       
       }
      }
    });
  }
};
const getFeedbacktl = () => {
 if(TLDashboard != undefined){
  axios
  .get(`${baseUrl}/customers/getFeedback?tl_id=${JSON.parse(tlkey)}&&type=total`)
  .then((res) => {
    console.log(res);
    if(res.data.result != undefined){
      setfeedbackNumbertl(res.data.result[0].total)
    
    }
  });
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
      console.log(res);
      if(res.data.result != undefined){
        setfeedbackNumbertp(res.data.result[0].total)
      
      }
    });
  }
};
useState(() => {
  getFeedbacktp();
}, [TPDashboard])
const show = () => {
  console.log("done")
    setOpen(true);
}
const handleClick = () => {
  setOpen(!open);
};
  return (
    <>
      <div
        class="main-menu menu-fixed menu-light menu-accordion  menu-shadow "
        data-scroll-to-active="true"
        data-img="https://themeselection.com/demo/ chameleon-free-bootstrap-admin-template/theme-assets/images/backgrounds/02.jpg"
      >
        <div class="navbar-header">
          <ul class="nav navbar-nav flex-row">
            <li class="nav-item mr-auto">
              <a class="navbar-brand" href="questionnaire.html">
                <img
                  class="brand-logo"
                  alt="Chameleon admin logo"
                  src="https://themeselection.com/demo/chameleon-free-bootstrap-admin-template/theme-assets/images/logo/logo.png"
                />
                <h3 class="brand-text">Mazars</h3>
              </a>
            </li>
            <li class="nav-item d-md-none">
              <a class="nav-link close-navbar">
                <i class="fa fa-times"></i>
              </a>
            </li>
          </ul>
        </div>

        <div class="main-menu-content">
          {custDashboard && (
            <ul
              class="navigation navigation-main"
              id="main-menu-navigation"
              data-menu="menu-navigation"
            >
              <li class="nav-item active">
                <NavLink to={"/customer/dashboard"}>
                  <i class="fa fa-home"></i>
                  <span class="menu-title" data-i18n="">
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li class={toggleState && ""} onClick={() => toggleTab("active")}>
                <NavLink to={"/customer/queries"}>
                  <i class="fa fa-clone"></i>
                  <span class="menu-title" data-i18n="">
                    Queries
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/customer/proposal"}>
                  <i class="fa fa-envelope"></i>
                  <span class="menu-title" data-i18n="">
                    Proposal
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/customer/paymentstatus"}>
                  <i class="fa fa-file-text"></i>
                  <span class="menu-title" data-i18n="">
                    Payment Status
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/customer/assignment"}>
                  <i class="fa fa-file"></i>
                  <span class="menu-title" data-i18n="">
                    Assignments
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/customer/schedule"}>
                  <i class="fa fa-rss-square"></i>
                  <span class="menu-title" data-i18n="">
                    Schedule
                  </span>
                </NavLink>
              </li>


              <li class="nav-item">
                <NavLink to={"/customer/feedback-data"}>
                  <i class="fa fa-rss-square"></i>
                  <span class="menu-title" data-i18n="">
                    Feedback
                  </span>
                </NavLink>
              </li>

            </ul>
          )}

          {adminDashboard && (
            <ul
              class="navigation navigation-main"
              id="main-menu-navigation"
              data-menu="menu-navigation"
            >
              <li class="active nav-item">
                <NavLink to={"/admin/dashboard"}>
                  <i class="fa fa-home"></i>
                  <span class="menu-title" data-i18n="">
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/admin/queriestab"}>
                  <i class="fa fa-clone"></i>
                  <span class="menu-title" data-i18n="">
                    Queries
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/admin/proposal"}>
                  <i class="fa fa-envelope"></i>
                  <span class="menu-title" data-i18n="">
                    Proposals
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/admin/paymentstatus"}>
                  <i class="fa fa-file-text"></i>
                  <span class="menu-title" data-i18n="">
                    Payment Status
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/admin/assignment"}>
                  <i class="fa fa-file"></i>
                  <span class="menu-title" data-i18n="">
                    Assignments
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                 
               <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>
        {/* <ListItemText primary="Inbox" /> */}
        {/* <NavLink to={"/admin/schedule"}> */}
                 
                <span class="menu-title" data-i18n="">
                  Schedule
                </span>
                {/* </NavLink> */}
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ul>
                  <li>
                  <NavLink to={"/admin/schedule"}>
                  <i class="fa fa-rss-square"></i>
                <span class="menu-title" data-i18n="">
                  Schedule
                </span>
                </NavLink>
                  </li>
                  <li>
                  <NavLink to={"/admin/recording"}>
                  <i class="fa fa-rss-square"></i>
                <span class="menu-title" data-i18n="">
                Recording
                </span>
                </NavLink>
                  </li>
                </ul>
        </List>
      </Collapse>
              </li>

            

              <li class="nav-item">
                <NavLink to={"/admin/teamleaders"}>
                  <i class="fa fa-users"></i>
                  <span class="menu-title" data-i18n="">
                    Team Leaders
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/admin/taxprofessionals"}>
                  <i class="fa fa-users"></i>
                  <span class="menu-title" data-i18n="">
                    Tax Professionals
                  </span>
                </NavLink>
              </li>
               <li class ="nav-item">
                 <NavLink to={"/admin/customers"}>
                   <i class="fa fa-users"></i>
                   <span class="menu-title" data-i18n="">
                   Customers
                  </span>
                 </NavLink>
               </li>
               <li class ="nav-item">
                 <NavLink to={"/admin/reports"}>
                   <i class="fa fa-users"></i>
                   <span class="menu-title" data-i18n="">
                   Report
                  </span>
                 </NavLink>
               </li>
              <li class="nav-item">
                <NavLink to={"/admin/feedback"}>
                  <i class="fa fa-file-text"></i>
                  <span class="menu-title" data-i18n="">
                 Feedback <sup style={feedNumber}>{feedbackNumber2}</sup> 
          
                  </span>
                  {/* Feedback  <span class="badge">{feedbackNumber2}</span> */}
                </NavLink>
              </li>
            </ul>
          )}

          {TLDashboard && (
            <ul
              class="navigation navigation-main"
              id="main-menu-navigation"
              data-menu="menu-navigation"
            >
              <li class="active nav-item">
                <NavLink to={"/teamleader/dashboard"}>
                  <i class="fa fa-home"></i>
                  <span class="menu-title" data-i18n="">
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/teamleader/queriestab"}>
                  <i class="fa fa-clone"></i>
                  <span class="menu-title" data-i18n="">
                    Queries
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/teamleader/proposal"}>
                  <i class="fa fa-envelope"></i>
                  <span class="menu-title" data-i18n="">
                    Proposal
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/teamleader/paymentstatus"}>
                  <i class="fa fa-file-text"></i>
                  <span class="menu-title" data-i18n="">
                    Payment Status
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/teamleader/assignment"}>
                  <i class="fa fa-file"></i>
                  <span class="menu-title" data-i18n="">
                    Assignments
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                 
               <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>
        {/* <ListItemText primary="Inbox" /> */}
        {/* <NavLink to={"/teamleader/schedule"}> */}
                 
                <span class="menu-title" data-i18n="">
                  Schedule
                </span>
                {/* </NavLink> */}
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ul>
                  <li>
                  <NavLink to={"/teamleader/schedule"}>
                  <i class="fa fa-rss-square"></i>
                <span class="menu-title" data-i18n="">
                  Schedule
                </span>
                </NavLink>
                  </li>
                  <li>
                  <NavLink to={"/teamleader/recording"}>
                  <i class="fa fa-rss-square"></i>
                <span class="menu-title" data-i18n="">
                Recording
                </span>
                </NavLink>
                  </li>
                </ul>
        </List>
      </Collapse>
              </li>
              <li class="nav-item">
                <NavLink to={"/teamleader/reports"}>
                  <i class="fa fa-users"></i>
                  <span class="menu-title" data-i18n="">
                    Reports
                  </span>
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink to={"/teamleader/addteamprof"}>
                  <i class="fa fa-users"></i>
                  <span class="menu-title" data-i18n="">
                    View T.P
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/teamleader/feedback"}>
                  <i class="fa fa-file-text"></i>
                  <span class="menu-title" data-i18n="">
                  Feedback <sup style={feedNumber}>{feedbackNumbertl}</sup>
                  </span>
                </NavLink>
              </li>
              
             
            </ul>
          )}

          {TPDashboard && (
            <ul
              class="navigation navigation-main"
              id="main-menu-navigation"
              data-menu="menu-navigation"
            >
              <li class="nav-item">
                <NavLink to={"/taxprofessional/dashboard"}>
                  <i class="fa fa-clone"></i>
                  <span class="menu-title" data-i18n="">
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/taxprofessional/queriestab"}>
                  <i class="fa fa-clone"></i>
                  <span class="menu-title" data-i18n="">
                    Queries
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/taxprofessional/proposal"}>
                  <i class="fa fa-envelope"></i>
                  <span class="menu-title" data-i18n="">
                    Proposal
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/taxprofessional/paymentstatus"}>
                  <i class="fa fa-file-text"></i>
                  <span class="menu-title" data-i18n="">
                    Payment Status
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                <NavLink to={"/taxprofessional/assignment"}>
                  <i class="fa fa-file"></i>
                  <span class="menu-title" data-i18n="">
                    Assignments
                  </span>
                </NavLink>
              </li>

              <li class="nav-item">
                 
               <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>
        {/* <ListItemText primary="Inbox" /> */}
        {/* <NavLink to={"/taxprofessional/schedule"}> */}
                 
                <span class="menu-title" data-i18n="">
                  Schedule
                </span>
                {/* </NavLink> */}
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ul>
                  <li>
                  <NavLink to={"/taxprofessional/schedule"}>
                  <i class="fa fa-rss-square"></i>
                <span class="menu-title" data-i18n="">
                  Schedule
                </span>
                </NavLink>
                  </li>
                  <li>
                  <NavLink to={"/taxprofessional/recording"}>
                  <i class="fa fa-rss-square"></i>
                <span class="menu-title" data-i18n="">
                Recording
                </span>
                </NavLink>
                  </li>
                </ul>
        </List>
      </Collapse>
              </li>
              <li class="nav-item">
                <NavLink to={"/taxprofessional/reports"}>
                  <i class="fa fa-users"></i>
                  <span class="menu-title" data-i18n="">
                    Reports
                  </span>
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink to={"/taxprofessional/feedback"}>
                  <i class="fa fa-file-text"></i>
                  <span class="menu-title" data-i18n="">
                  Feedback <sup style={feedNumber}>{feedbackNumbertp}</sup> 
                  </span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div class="navigation-background"></div>
      </div>
    </>
  );
}

export default Sidebar;
