import React from "react";
import logoImg from "../../images/PngImages/logo.png";
import documentImg from "../../images/PngImages/document.png";
import homeImg from "../../images/PngImages/home.png";
import bookImg from "../../images/PngImages/book.png";
import arrowImg from "../../images/PngImages/arrow.png";
import margin from "../../images/PngImages/margin.png";
import logout from "../../images/PngImages/logout.png";
import confirmationImg from "../../images/PngImages/confirmation.png";
import marginImg from "../../images/PngImages/margin.png";
import requestImg from "../../images/PngImages/request.png";
import cameraImg from "../../images/sideBarImages/Frame.svg";
import { styled, makeStyles } from "@mui/styles";
import { Link, useLocation } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const MobileSidebar = () => {
  let history = useNavigate();
  const logedout = (e) => {
    if (e == 3) {
      console.log("ee", e);
      localStorage.clear();
      history("/");
    }
  };
  const useStyle = makeStyles({
    button: {
      color: "red",
      marginLeft: "20px",
    },
    MyMenuName: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "27px",
      color: "#9B9B9B",
      margin: "0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    MyMenuLogo: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "25px",
      lineHeight: "38px",
      color: "#0085FF",
      margin: "0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    myNav: {
      display: "flex",
      width: "100%",
      height: "30px",
      margin: "15px 8px 15px 50px",
      padding: "5px",
      cursor: "pointer",
    },
    myNav: {
      display: "flex",
      width: "40px",
      height: "40px",
      margin: "15px 8px 15px 50px",
      padding: "5px",
      cursor: "pointer",
    },
    mainMenu: {
      listStyle: "none",
      display: "",
      flexDirection: "column",
      padding: "10px 5px",
      backgroundColor: "#ffffff",
      width: "100%",
      height: "100%",
      justifyContent: "space-between",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.12)",
    },
    myMobileSidebar: {
      display: "flex",
      width: "100%",
    },
    myNavMenu: {
      display: "flex",
      width: "100%",
    },
  });

  const classes = useStyle();
  const location = useLocation();
  const { pathname } = location;

  const splitLocation = pathname.split("/");

  return (
    <ul className={classes.mainMenu}>
      <li
        className={`${splitLocation[1] === "" ? "myMenuActive" : ""} ${
          classes.myMobileSidebar
        }`}
      >
        <Link to="/" className={classes.myNavMenu}>
          <img src={logoImg} className={classes.myNav} />
        </Link>
        <p className={classes.MyMenuLogo}>Logo</p>
      </li>
      <li
        className={`${splitLocation[2] === "holding" ? "myMenuActive" : ""} ${
          classes.myMobileSidebar
        }`}
      >
        <Link to="/tradeweb/trading" className={classes.myNavMenu}>
          <img src={homeImg} className={classes.myNav} />

          <p className={classes.MyMenuName}>Tradeweb</p>
        </Link>
      </li>
      <li
        className={`${splitLocation[2] === "holding" ? "myMenuActive" : ""} ${
          classes.myMobileSidebar
        }`}
      >
        <Link
          to="/tradeweb/holding"
          title="Holding"
          className={classes.myNavMenu}
        >
          <img src={cameraImg} className={classes.myNav} />

          <p className={classes.MyMenuName}>Holding</p>
        </Link>
      </li>
      <li
        className={`${splitLocation[2] === "trading" ? "myMenuActive" : ""} ${
          classes.myMobileSidebar
        }`}
      >
        <Link
          to="/tradeweb/trading"
          title="Trading"
          className={classes.myNavMenu}
        >
          <img src={documentImg} className={classes.myNav} />

          <p className={classes.MyMenuName}>Trading</p>
        </Link>
      </li>
      <li
        className={`${splitLocation[2] === "ledger" ? "myMenuActive" : ""} ${
          classes.myMobileSidebar
        }`}
      >
        <Link
          to="/tradeweb/ledger"
          title="Ledger"
          className={classes.myNavMenu}
        >
          <img src={bookImg} className={classes.myNav} />

          <p className={classes.MyMenuName}>Ledger</p>
        </Link>
      </li>
      <li
        className={`${
          splitLocation[2] === "transaction" ? "myMenuActive" : ""
        } ${classes.myMobileSidebar}`}
      >
        <Link
          to="/tradeweb/transaction"
          title="Transaction"
          className={classes.myNavMenu}
        >
          <img src={arrowImg} className={classes.myNav} />

          <p className={classes.MyMenuName}>Transaction</p>
        </Link>
      </li>
      <li
        className={`${
          splitLocation[2] === "confirmation" ? "myMenuActive" : ""
        } ${classes.myMobileSidebar}`}
      >
        <Link
          to="/tradeweb/confirmation"
          title="Transaction"
          className={classes.myNavMenu}
        >
          <img src={confirmationImg} className={classes.myNav} />

          <p className={classes.MyMenuName}>confirmation</p>
        </Link>
      </li>
      <li
        className={`${splitLocation[2] === "margin" ? "myMenuActive" : ""} ${
          classes.myMobileSidebar
        }`}
      >
        <Link
          to="/tradeweb/margin"
          title="Margin ShortFall"
          className={classes.myNavMenu}
        >
          <img src={marginImg} className={classes.myNav} />

          <p className={classes.MyMenuName}>Margin ShortFall</p>
        </Link>
      </li>
      <li
        className={`${splitLocation[2] === "profile" ? "myMenuActive" : ""} ${
          classes.myMobileSidebar
        }`}
      >
        <Link to="/tradeweb/profile" className={classes.myNavMenu}>
          <img src={margin} className={classes.myNav} />

          <p className={classes.MyMenuName}>Profile</p>
        </Link>
      </li>
         <li
        className={`${splitLocation[2] === "request" ? "myMenuActive" : ""} ${
          classes.myMobileSidebar
        }`}
      >
        <Link
          to="/tradeweb/request"
          title="Request" 
          className={classes.myNavMenu}
        >
          <img src={requestImg} className={classes.myNav} />

          <p className={classes.MyMenuName}>Request</p>
        </Link>
      </li> 
      <li>
        <img src={logout} className={classes.myNav} />
        <Button
          value={3}
          style={{ marginTop: "-100px", marginLeft: "90px", color: "red",cursor:"pointer"}}
          onClick={(e) => logedout(e.target.value)}
        >
          Logout
        </Button>
      </li>
    </ul>
  );
};
export default MobileSidebar;
