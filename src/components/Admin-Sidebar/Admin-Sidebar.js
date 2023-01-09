import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ima from "./../../assets/images/mazars-logo.png";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useHistory } from "react-router";
import "./list.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { makeStyles } from "@material-ui/core";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import UnsubscribeOutlinedIcon from "@mui/icons-material/UnsubscribeOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import MissedVideoCallIcon from "@mui/icons-material/MissedVideoCall";
import MediaBluetoothOffIcon from "@mui/icons-material/MediaBluetoothOff";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
function Sidebar({
  adminDashboard,
  cmsDashboard,
  custDashboard,
  TLDashboard,
  TPDashboard,
  feedbackNumber,
}) {
  const [toggleState, setToggleState] = useState(false);
  const [feedbackNumber2, setfeedbackNumber2] = useState();
  const [feedbackNumbertl, setfeedbackNumbertl] = useState();
  const [feedbackNumbertp, setfeedbackNumbertp] = useState();
  const [open2, setOpen2] = useState(false);
  const [open, setOpen] = useState(false);
  const [logo, setLogo] = useState("customer/dashboard");
  const tlkey = window.localStorage.getItem("tlkey");
  const tpkey = window.localStorage.getItem("tpkey");
  const adminkey = window.localStorage.getItem("adminkey");
  const cmsToken = localStorage.getItem("token");
  let history = useHistory();
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const role = localStorage.getItem("role");
  const feedNumber = {
    fontSize: "10.5px",
    height: "15px",
    backgroundColor: "#464646",
    color: "white",
    display: "inline-block",
    margin: "0px 0px 20px 0px",
    padding: "9px 10px",
    borderRadius: "5px",
  };
  useEffect(() => {
    getFeedback4();
  }, [custDashboard]);

  const useStyle = makeStyles({
    myTeamleader: {
      fontSize: "30px !important",
      opacity: "0.6",
      fontWeight: 500,
      color: "#3B3B3B",
    },
    myClassHover: {
      "&:hover": {
        cursor: "pointer",

        "& $myTeamleader": {
          color: "#0071CE",
        },
      },
    },
    myTeamleader2: {
      fontSize: "30px !important",
      opacity: "0.6",
      fontWeight: 500,
      color: "#3B3B3B",
    },
    myClassHover: {
      "&:hover": {
        cursor: "pointer",

        "& $myTeamleader2": {
          color: "#0071CE",
        },
      },
    },
  });
  useEffect(() => {
    getFeedback2();
  }, [adminDashboard]);

  const getFeedback4 = () => {
    setLogo("/customer/dashboard");
  };
  const getFeedback2 = () => {
    if (role === "admin" && adminDashboard !== undefined) {
      const token = window.localStorage.getItem("adminToken");
      const myConfig = {
        headers: {
          uit: token,
        },
      };
      axios
        .get(
          `${baseUrl}/admin/getFeedback?uid=${JSON.parse(
            adminkey
          )}&&type=total`,
          myConfig
        )
        .then((res) => {
          if (role === "cms") {
            setLogo("/cms/cms");
          } else {
            setLogo("/admin/dashboard");
          }
          if (res.data.code === 1) {
            if (res.data.result != undefined) {
              setfeedbackNumber2(res.data.result[0].total);
              if (role === "cms") {
                setLogo("/cms/cms");
              } else {
                setLogo("/admin/dashboard");
              }
            }
          } else if (res.data.code === 102) {
            history.push("/admin/login");
          }
        });
    }
    if (
      window.location.pathname.split("/").slice(-1) === "recording" ||
      window.location.pathname.split("/").slice(-1) === "schedule"
    ) {
      setOpen(true);
    }
  };
  const getFeedbacktl = () => {
    if (TLDashboard !== undefined) {
      const token = window.localStorage.getItem("tlToken");
      const myConfig = {
        headers: {
          uit: token,
        },
      };
      axios
        .get(
          `${baseUrl}/tl/getFeedback?tl_id=${JSON.parse(tlkey)}&type=total`,
          myConfig
        )
        .then((res) => {
          setLogo("teamleader/dashboard");
          if (res.data.result != undefined) {
            if (res.data.result[0]) {
              setfeedbackNumbertl(res.data.result[0].total);
            }
            setLogo("/teamleader/dashboard");
          } else if (res.data.code === 102) {
            history.push("/teamleader/login");
          }
        });
    }
    if (
      window.location.pathname.split("/").slice(-1) === "recording" ||
      window.location.pathname.split("/").slice(-1) === "schedule"
    ) {
      setOpen(true);
    }
  };
  useEffect(() => {
    getFeedbacktl();
  }, [TLDashboard]);

  const getFeedbacktp = () => {
    const token = window.localStorage.getItem("tptoken");
    const myConfig = {
      headers: {
        uit: token,
      },
    };
    if (TPDashboard !== undefined) {
      axios
        .get(
          `${baseUrl}/tl/getFeedback?tp_id=${JSON.parse(tpkey)}&&type=total`,
          myConfig
        )
        .then((res) => {
          setLogo("taxprofessional/dashboard");
          if (res.data.result != undefined) {
            setfeedbackNumbertp(res.data.result[0].total);
            setLogo("/taxprofessional/dashboard");
          } else if (res.data.code === 102) {
            history.push("/taxprofessional/login");
          }
        });
    }
    if (
      window.location.pathname.split("/").slice(-1) === "recording" ||
      window.location.pathname.split("/").slice(-1) === "schedule"
    ) {
      setOpen(true);
    }
  };
  useEffect(() => {
    getFeedbacktp();
  }, [TPDashboard]);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickCms = () => {
    setOpen2(!open2);
  };

  const classes = useStyle();
  return (
    <>
      <div
        className="main-menu menu-fixed menu-light menu-accordion  menu-shadow "
        data-scroll-to-active="true"
        data-img="#"
      >
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mr-auto">
              <a
                className="navbar-brand"
                href={logo}
                style={{
                  display: "flex",
                  height: "75px",
                  padding: "4px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  className="brand-logo"
                  src={`${ima}`}
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "auto",
                    maxWidth: "100px",
                    objectFit: "contain",
                  }}
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
          {cmsDashboard && (
            <>
              <div
                className="main-menu menu-fixed menu-light menu-accordion  menu-shadow "
                data-scroll-to-active="true"
                data-img="#"
              >
                <div className="navbar-header">
                  <ul className="nav navbar-nav flex-row">
                    <li className="nav-item mr-auto">
                      <a
                        className="navbar-brand"
                        href={logo}
                        style={{
                          display: "flex",
                          height: "75px",
                          padding: "4px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className="brand-logo"
                          src={`${ima}`}
                          style={{
                            display: "flex",
                            width: "100%",
                            height: "auto",
                            maxWidth: "100px",
                            objectFit: "contain",
                          }}
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
                  <ul
                    className="navigation navigation-main"
                    id="main-menu-navigation"
                    data-menu="menu-navigation"
                  >
                    <li className="nav-item">
                      <NavLink to={"/cms/cms"} className={classes.myClassHover}>
                        <i className="">
                          <ArticleOutlinedIcon
                            className={classes.myTeamleader}
                          />
                        </i>
                        <span className="menu-title" data-i18n="">
                          Articles
                        </span>
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        to={"/cms/linklist"}
                        className={classes.myClassHover}
                      >
                        <i className="">
                          <LinkOutlinedIcon className={classes.myTeamleader} />
                        </i>
                        <span className="menu-title" data-i18n="">
                          Important links
                        </span>
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        to={"/cms/updates"}
                        className={classes.myClassHover}
                      >
                        <i className="">
                          <TipsAndUpdatesOutlinedIcon
                            className={classes.myTeamleader}
                          />
                        </i>
                        <span className="menu-title" data-i18n="">
                          Updates
                        </span>
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        to={"/cms/faqlist"}
                        className={classes.myClassHover}
                      >
                        <i className="">
                          <QuizOutlinedIcon className={classes.myTeamleader} />
                        </i>
                        <span className="menu-title" data-i18n="">
                          FAQ
                        </span>
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        to={"/cms/flash"}
                        className={classes.myClassHover}
                      >
                        <i className="">
                          <UnsubscribeOutlinedIcon
                            className={classes.myTeamleader}
                          />
                        </i>
                        <span className="menu-title" data-i18n="">
                          Flash updates
                        </span>
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        to={"/cms/imagelist"}
                        className={classes.myClassHover}
                      >
                        <i className="">
                          <PermMediaOutlinedIcon
                            className={classes.myTeamleader}
                          />
                        </i>
                        <span className="menu-title" data-i18n="">
                          Photo gallery
                        </span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to={"/cms/videolist"}
                        className={classes.myClassHover}
                      >
                        <i className="">
                          <MissedVideoCallIcon
                            className={classes.myTeamleader}
                          />
                        </i>
                        <span className="menu-title" data-i18n="">
                          Video gallery
                        </span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to={"/cms/contentlist"}
                        className={classes.myClassHover}
                      >
                        <i className="">
                          <MediaBluetoothOffIcon
                            className={classes.myTeamleader}
                          />
                        </i>
                        <span className="menu-title" data-i18n="">
                          Media news
                        </span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to={"/cms/uploadlink"}
                        className={classes.myClassHover}
                      >
                        <i className="">
                          <MediaBluetoothOffIcon
                            className={classes.myTeamleader}
                          />
                        </i>
                        <span className="menu-title" data-i18n="">
                          Upload document
                        </span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/cms/emaillist"
                        className={classes.myClassHover}
                      >
                        <i className="">
                          <HelpOutlineIcon className={classes.myTeamleader} />
                        </i>
                        <span className="menu-title" data-i18n="">
                          Emailer
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
          {custDashboard && (
            <ul
              className="navigation navigation-main"
              id="main-menu-navigation"
              data-menu="menu-navigation"
            >
              <li className="nav-item">
                <NavLink to={"/customer/dashboard"}>
                  <i className="fa">
                    {" "}
                    <span className="dashboardMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/customer/queries"}>
                  <i className="fa">
                    <span className="queryMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Queries
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/customer/proposal"}>
                  <i className="fa">
                    <span className="proposalMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Proposal
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/customer/paymentstatus"}>
                  <i className="fa">
                    <span className="paymentMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Payment status
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/customer/assignment"}>
                  <i className="fa">
                    <span className="assignmentMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Assignments
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/customer/schedule"}>
                  <i className="fa">
                    <span className="scheduleMenu"></span>
                  </i>

                  <span className="menu-title" data-i18n="">
                    Schedule
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/customer/feedback-data"}>
                  <i className="fa">
                    <span className="feedbackMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Feedback
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/customer/contact"}>
                  <i className="fa">
                    <span className="contactMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Contact us
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/customer/about"}>
                  <i className="fa">
                    <span className="aboutMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    About us
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/customer/modalmanual"}>
                  <i className="fa">
                    <span className="helpMenu"></span>
                  </i>
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
                  <i className="fa">
                    {" "}
                    <span className="dashboardMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/admin/queriestab"}>
                  <i className="fa">
                    <span className="queryMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Queries
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/admin/proposal"}>
                  <i className="fa">
                    <span className="proposalMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Proposal
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={"/admin/adinvoice"}
                  className={classes.myClassHover}
                >
                  <i className="fa">
                    <ContactPageOutlinedIcon
                      className={classes.myTeamleader2}
                    />
                  </i>
                  <span className="menu-title" data-i18n="">
                    Invoice
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/admin/paymentstatus"}>
                  <i className="fa">
                    <span className="paymentMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Payment status
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/admin/assignment"}>
                  <i className="fa">
                    <span className="assignmentMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Assignments
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <ListItemButton onMouseOver={() => handleClick()}>
                  <i className="listStyle">
                    <span className="scheduleMenu"></span>
                  </i>

                  <span className="menu-title" data-i18n="">
                    Schedule
                  </span>
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open} unmountOnExit>
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
                <NavLink
                  to={"/admin/teamleaders"}
                  className={classes.myClassHover}
                >
                  <i className="">
                    <PersonOutlineIcon className={classes.myTeamleader} />
                  </i>
                  <span className="menu-title" data-i18n="">
                    Team leaders
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={"/admin/taxprofessionals"}
                  className={classes.myClassHover}
                >
                  <i className="fa">
                    <GroupAddOutlinedIcon className={classes.myTeamleader} />
                  </i>
                  <span className="menu-title" data-i18n="">
                    Tax professionals
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/admin/customers"}
                  className={classes.myClassHover}
                >
                  <i className="fa">
                    <PersonAddAltIcon className={classes.myTeamleader} />
                  </i>
                  <span className="menu-title" data-i18n="">
                    Client
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/admin/reportlist"}>
                  <i className="fa">
                    <span className="reportMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Report
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/admin/feedback"}>
                  <i className="fa">
                    <span className="feedbackMenu"></span>
                  </i>
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
                  <i className="fa">
                    {" "}
                    <span className="dashboardMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/teamleader/queriestab"}>
                  <i className="fa">
                    <span className="queryMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Queries
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/teamleader/proposal"}>
                  <i className="fa">
                    <span className="proposalMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Proposal
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={"/teamleader/tlinvoice"}
                  className={classes.myClassHover}
                >
                  <i className="fa">
                    <ContactPageOutlinedIcon
                      className={classes.myTeamleader2}
                    />
                  </i>
                  <span className="menu-title" data-i18n="">
                    Invoice
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/teamleader/paymentstatus"}>
                  <i className="fa">
                    <span className="paymentMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Payment status
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/teamleader/assignment"}>
                  <i className="fa">
                    <span className="assignmentMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Assignments
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <ListItemButton onMouseOver={() => handleClick()}>
                  <i className="listStyle">
                    <span className="scheduleMenu"></span>
                  </i>

                  <span className="menu-title" data-i18n="">
                    Schedule
                  </span>
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open} unmountOnExit>
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
                  <i className="fa">
                    <span className="reportMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Reports
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/teamleader/addteamprof"}
                  className={classes.myClassHover}
                >
                  <i className="fa">
                    <GroupAddOutlinedIcon className={classes.myTeamleader} />
                  </i>
                  <span className="menu-title" data-i18n="">
                    View T.P
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/teamleader/feedback"}>
                  <i className="fa">
                    <span className="feedbackMenu"></span>
                  </i>
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
                  <i className="fa">
                    {" "}
                    <span className="dashboardMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/taxprofessional/queriestab"}>
                  <i className="fa">
                    <span className="queryMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Queries
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/taxprofessional/proposal"}>
                  <i className="fa">
                    <span className="proposalMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Proposal
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={"/taxprofessional/tpinvoice"}
                  className={classes.myClassHover}
                >
                  <i className="fa">
                    <ContactPageOutlinedIcon
                      className={classes.myTeamleader2}
                    />
                  </i>
                  <span className="menu-title" data-i18n="">
                    Invoice
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/taxprofessional/paymentstatus"}>
                  <i className="fa">
                    <span className="paymentMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Payment status
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/taxprofessional/assignment"}>
                  <i className="fa">
                    <span className="assignmentMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Assignments
                  </span>
                </NavLink>
              </li>

              <li className="nav-item">
                <ListItemButton onMouseOver={() => handleClick()}>
                  <i className="listStyle">
                    <span className="scheduleMenu"></span>
                  </i>

                  <span className="menu-title" data-i18n="">
                    Schedule
                  </span>
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open} unmountOnExit>
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
                  <i className="fa">
                    <span className="reportMenu"></span>
                  </i>
                  <span className="menu-title" data-i18n="">
                    Reports
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/taxprofessional/feedback"}>
                  <i className="fa">
                    <span className="feedbackMenu"></span>
                  </i>
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
