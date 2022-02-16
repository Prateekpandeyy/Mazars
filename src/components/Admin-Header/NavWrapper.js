import React from "react";
import { Link, useHistory } from "react-router-dom";
import CustomerNotification from "./CustomerNotification";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import './index.css'
import CommonServices from "../../common/common";

function NavWrapper(props) {
  const { color, logout, name, email, feedbackNumber} = props;

  const history = useHistory();
  const userId = window.localStorage.getItem("userid");
  const adminkey = window.localStorage.getItem("adminkey");
  const tlkey = window.localStorage.getItem("tlkey");
  const tpkey = window.localStorage.getItem("tpkey")


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

              <li style={{zIndex: 99}}>
                <h4 style={{display:"flex", margin: "0 0 5px 0"}}>{name == "customer" ? CommonServices.capitalizeFirstLetter("client") : CommonServices.capitalizeFirstLetter(name)}: {JSON.parse(email)} </h4>
              </li>
             
            </ul>

            <ul className="nav navbar-nav float-right">

              {name == "customer" && (
                <CustomerNotification tokenKey={userId} name={name} />
              )}

              {name == "admin" && (
                <CustomerNotification tokenKey={adminkey} name={name} />
              )}

              {name == "teamleader" && (
                <CustomerNotification tokenKey={tlkey} name={name} />
              )}
               {name == "taxprofessional" && (
                <CustomerNotification tokenKey={tpkey} name={name} />
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
                      <Link to="/customer/change-password">
                        <div className="dropdown-item" 
                          style={{ cursor: "pointer" }}>
                          <VpnKeyIcon />
                          <span style={{ marginLeft: "3px" }}>Change Password</span>
                        </div>
                      </Link>
                    )}

                    <div
                      className="dropdown-item"
                      onClick={logout}
                      style={{ cursor: "pointer" }}
                    >
                      <LockOpenIcon />
                      <span style={{ marginLeft: "10px" }}>Logout</span>
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


