import React from 'react';
import { NavLink } from "react-router-dom";
import {useState, useEffect} from 'react'
import axios from 'axios';
import { baseUrl } from "../../config/config";
function Submenu(props){
    const adminkey = window.localStorage.getItem("adminkey")
    const [open, setOpen] = useState(false)
    const [feedbackNumber2, setfeedbackNumber2] = useState();
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
      }, [props.adminDashboard])
      const getFeedback2 = () => {
        if(props.adminDashboard != undefined && open === false){
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
  
    var a; 
    if(a == 1){
        setOpen(true)
    }
    const show = () => {
        setOpen(true)
    }
return(
    <>
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
                <NavLink to={"/admin/schedule"} >
                  <i class="fa fa-rss-square"></i>
                  <span class="menu-title" data-i18n="">
                    Schedule
                  </span>
                 
                  <ul>
                    <li>
                    <NavLink to={"/admin/schedule"} onClick={() => show()}>
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
                  </NavLink>
                 
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
    </>
)
}
export default Submenu;