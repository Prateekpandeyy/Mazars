import React from "react";
import { Link, useHistory } from "react-router-dom";
import CustomerNotification from "./CustomerNotification";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import './index.css'
import {CgProfile} from 'react-icons/cg'
import CommonServices from "../../common/common";

function NavWrapper(props) {
  const { color, logout, name, email, feedbackNumber} = props;
const clName = JSON.parse(localStorage.getItem("clientLoginId"))
  const history = useHistory();
  const userId = window.localStorage.getItem("userid");
  const adminkey = window.localStorage.getItem("adminkey");
  const tlkey = window.localStorage.getItem("tlkey");
  const tpkey = window.localStorage.getItem("tpkey")
  const cmsKey = window.localStorage.getItem("token")


  return (
    <>
      <div className="navbar-wrapper">
        <div className="navbar-container" style={{ background: color, borderBottom: "2px solid #787878" }}>
          <div className="collapse navbar-collapse show" id="navbar-mobile">
            <ul className="nav navbar-nav mr-auto float-left">
              <li className="nav-item d-block d-md-none">
                <a
                  className="nav-link nav-menu-main menu-toggle hidden-xs is-active"
                  href="#"
                >
                  <i className="fa fa-bars"></i>
                </a>
              </li>

              <li className="nav-item dropdown navbar-search">
                <ul className="dropdown-menu">
                  <li className="arrow_box">
                    <form>
                      <div className="input-group search-box">
                        <div className="position-relative has-icon-right full-width">
                          <input
                            className="form-control"
                            id="search"
                            type="text"
                            placeholder="Search here..."
                          />
                          <div className="form-control-position navbar-search-close">
                            <i className="fa fa-times"> </i>
                          </div>
                        </div>
                      </div>
                    </form>
                  </li>
                </ul>
              </li>

              <li style={{zIndex: 99, margin: "auto"}}>
                <h4 className="contentTitle">{name == "customer" ? `Client :  ${clName} `  : CommonServices.capitalizeFirstLetter(name)}:  {JSON.parse(email)} </h4>
              </li>
             
            </ul>

            <ul className="nav navbar-nav float-right" style={{display: "flex", flexDirection: "row"}}>

              {name == "customer" && (
                <CustomerNotification panel="client" tokenKey={userId} name={name} />
              )}

              {name == "admin" && (
                <CustomerNotification  panel="admin" tokenKey={adminkey} name={name} />
              )}
               {name == "cms" && (
                <CustomerNotification  panel="Cms" tokenKey={cmsKey} name={name} />
              )}

              {name == "Team Leader" && (
                <CustomerNotification panel="teamleader" tokenKey={tlkey} name={name} />
              )}
               {name == "Tax Professional" && (
                <CustomerNotification panel="taxprofessional" tokenKey={tpkey} name={name} />
              )}


              <li className="dropdown dropdown-user nav-item">
                <a
                  className="dropdown-toggle nav-link dropdown-user-link"
                  href="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="avatar avatar-online">
                    <img
                      src="https://cdn1.vectorstock.com/i/1000x1000/40/30/user-glyph-icon-web-and-mobile-admin-sign-vector-18444030.jpg"
                      alt="avatar"
                    />
                    <i style={{ paddingLeft: "6px" }}></i>
                  </span>
                </a>

                <div className="dropdown-menu dropdown-menu-right changePassword">
                  <div className="arrow_box_right">

                    {name == "customer" && (
                     <>
                      
                      <Link to="/customer/change-password">
                        <div className="dropdown-item" 
                          style={{ cursor: "pointer" }}>
                           <VpnKeyIcon style ={{fontSize : "20px"}}/>
                          <span style={{ marginLeft: "6px" }}>Change Password</span>
                        </div>
                      </Link>
                       <Link to="/customer/profile">
                       <div className="dropdown-item" 
                         style={{ cursor: "pointer" }}>
                            <CgProfile style ={{fontSize : "20px"}} />
                       
                         <span style={{ marginLeft: "6px" }}>Profile</span>
                       </div>
                     </Link>
                     </>
                    )}

                    <div
                      className="dropdown-item"
                      onClick={logout}
                      style={{ cursor: "pointer" }}
                    >
                      <LockOpenIcon style ={{fontSize : "20px"}}/>
                      <span style={{ marginLeft: "6px" }}>Logout</span>
                    </div>

                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavWrapper;


