import React from "react";
import mazars from "./../../assets/images/mazars-logo.png";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { clientLogout } from "../Logout/ClientLogout";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LogoutHeader = (props) => {
  let history = useHistory();
  const logout = () => {
    clientLogout(axios, history);
  };
  return (
    <>
      <Grid fluid>
        <Grid item lg={12}>
          <div className="headerMin">
            <Link to="/customer/dashboard">
              <img src={mazars} alt="mazar" className="logo" />
            </Link>
            <div
              className="dropdown-item"
              onClick={logout}
              style={{ cursor: "pointer" }}
            >
              <LockOpenIcon style={{ fontSize: "20px" }} />
              <span style={{ marginLeft: "6px" }}>Logout</span>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default LogoutHeader;
