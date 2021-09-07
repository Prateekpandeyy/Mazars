import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link, useHistory } from "react-router-dom";
import CustomerNotification from "./CustomerNotification";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import './index.css'
import CommonServices from "../../common/common";

function NavWrapper(props) {
  const { color, logout, name, email } = props;

  const history = useHistory();
  const userId = window.localStorage.getItem("userid");
  const adminkey = window.localStorage.getItem("adminkey");
  const tlkey = window.localStorage.getItem("tlkey");
  const tpkey = window.localStorage.getItem("tpkey")

  // const CustEmail = window.localStorage.getItem("email");


  return (
    <>
      <div class="navbar-wrapper">
        <div class="navbar-container" style={{ background: color }}>
          <div class="collapse navbar-collapse show" id="navbar-mobile">
            <ul class="nav navbar-nav mr-auto float-left">
              <li class="nav-item d-block d-md-none">
                <a
                  class="nav-link nav-menu-main menu-toggle hidden-xs is-active"
                  href="#"
                >
                  <i class="fa fa-bars"></i>
                </a>
              </li>

              <li class="nav-item dropdown navbar-search">
                <ul class="dropdown-menu">
                  <li class="arrow_box">
                    <form>
                      <div class="input-group search-box">
                        <div class="position-relative has-icon-right full-width">
                          <input
                            class="form-control"
                            id="search"
                            type="text"
                            placeholder="Search here..."
                          />
                          <div class="form-control-position navbar-search-close">
                            <i class="fa fa-times"> </i>
                          </div>
                        </div>
                      </div>
                    </form>
                  </li>
                </ul>
              </li>

              <li>
                <h4 class="brand-text text-white">{CommonServices.capitalizeFirstLetter(name)}: {JSON.parse(email)} </h4>
              </li>
            </ul>

            <ul class="nav navbar-nav float-right">

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


              <li class="dropdown dropdown-user nav-item">
                <a
                  class="dropdown-toggle nav-link dropdown-user-link"
                  href="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="avatar avatar-online">
                    <img
                      src="https://cdn1.vectorstock.com/i/1000x1000/40/30/user-glyph-icon-web-and-mobile-admin-sign-vector-18444030.jpg"
                      alt="avatar"
                    />
                    <i style={{ paddingLeft: "6px" }}></i>
                  </span>
                </a>

                <div class="dropdown-menu dropdown-menu-right">
                  <div class="arrow_box_right">

                    {name == "customer" && (
                      <Link to="/customer/change-password">
                        <div class="dropdown-item"
                          style={{ cursor: "pointer" }}>
                          <VpnKeyIcon />
                          <span style={{ marginLeft: "3px" }}>Change Password</span>
                        </div>
                      </Link>
                    )}

                    <div
                      class="dropdown-item"
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



