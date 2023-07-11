import { Link, NavLink, useHistory } from "react-router-dom";
import "../../assets/css/style.css";
import mazars from "./../../assets/images/mazars-logo.png";
import { useState, useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Cookies from "js-cookie";
import CookieConsent from "react-cookie-consent";
import CloseIcon from "@material-ui/icons/Close";
import CustomTypography from "../Common/CustomTypography";
import SubHeading from "../Common/SubHeading";
import CustomHeading from "../Common/CustomHeading";
import { clientLogout } from "../Logout/ClientLogout";
import axios from "axios";
function Header({
  id,
  cust_sign,
  noAdminSign,
  noTlSign,
  noTpSign,
  admin,
  mtl,
  mtp,
  noSign,
  loginOTP,
  getData,
  showCook,
}) {
  const [logomin, setLogimin] = useState(false);
  let history = useHistory();

  const custLogout = () => {
    clientLogout(axios, history);
  };
  useEffect(() => {
    if (
      window.location.pathname.split("/")[1] === "customer" ||
      window.location.pathname.split("/")[1].length === 0
    ) {
      setLogimin(false);
    } else {
      setLogimin(true);
    }
    const handleScroll = (event) => {
      if (document.documentElement.scrollTop > 0) {
        setLogimin(true);
      } else if (
        window.location.pathname.split("/")[1] === "customer" ||
        window.location.pathname.split("/")[1].length === 0
      ) {
        setLogimin(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={
          window.location.pathname.split("/")[1] === "customer" ||
          window.location.pathname.split("/")[1].length === 0
            ? "header"
            : "headerMin"
        }
      >
        {id && (
          <div className={logomin === true ? "logomin" : "logo"}>
            <Link to="/customer/questionnaire-page">
              <img src={mazars} alt="mazar" />
            </Link>
          </div>
        )}

        {cust_sign && (
          <div className="noSignINBox">
            <div className={logomin === true ? "logomin" : "logo"}>
              <Link to="/">
                <img
                  src="https://www.mazars.co.in/extension/ezmazars_rwdesign/design/mazars2020/images/mazars-logo.png"
                  alt="mazar"
                />
              </Link>
            </div>
          </div>
        )}

        {noSign && (
          <div
            id="myP"
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className={logomin === true ? "logomin" : "logo"}>
              <Link to="/">
                <img
                  src={mazars}
                  alt="mazar"
                  style={{ display: "flex", maxWidth: "100%" }}
                />
              </Link>
            </div>

            <CmsCont getData={getData} showCook={showCook} />
          </div>
        )}

        {loginOTP && (
          <div>
            <img
              src={mazars}
              className={logomin === true ? "logomin" : "logo"}
              alt="mazar"
            />
          </div>
        )}

        {admin && (
          <div className="headerWrapper">
            <Link to="/admin/start">
              <img src={mazars} className="logomin" alt="mazar" />
            </Link>
          </div>
        )}

        {mtl && (
          <div className="headerWrapper">
            <Link to="/teamleader/start">
              <img src={mazars} className="logomin" alt="mazar" />
            </Link>
          </div>
        )}

        {mtp && (
          <div className="headerWrapper">
            <Link to="/taxprofessional/start">
              <img src={mazars} className="logomin" alt="mazar" />
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
              <Link
                className="SignUpLink"
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
              <Link
                className="SignUpLink"
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
              <Link
                className="SignUpLink"
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
              <Link
                className="SignUpLink"
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

export const CmsCont = (props) => {
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [showCookie, setShowCookie] = useState(false);
  const cookieEnable = Cookies.get("accept");

  let history = useHistory();
  const userId = window.localStorage.getItem("userid");
  useEffect(() => {
    if (
      history.location.pathname === "/" ||
      history.location.pathname === "/6b382b8c26" ||
      userId
    ) {
    } else if (cookieEnable) {
      setShowCookie(false);
    } else {
      setShowCookie(true);
    }
  }, []);
  const showCook = () => {
    setShowCookie(true);
  };

  const handleClickOn2 = () => {
    setOpen2(false);
  };
  const handleClickOff2 = () => {
    setOpen2(true);
  };
  const handleClickOn3 = () => {
    setOpen3(false);
  };
  const handleClickOff3 = () => {
    setOpen3(true);
  };
  const handleClickUpdateOpen = () => {
    setUpdateOpen(true);
  };
  const handleClickUpdateClose = () => {
    setUpdateOpen(false);
  };

  const myLink = (e) => {
    if (Cookies.get("accept") || localStorage.getItem("clientToken")) {
      if (e === "direct") {
        history.push("/customer/direct");
      } else if (e === "indirect") {
        history.push("/customer/indirect");
      } else if (e === "photo") {
        history.push("/customer/media");
      } else if (e === "video") {
        history.push("/customer/videolist");
      } else if (e === "mediacontent") {
        history.push("/customer/mediacontent");
      } else if (e === "faqlist") {
        history.push("/customer/faq-question");
      } else if (e === "linklist") {
        history.push("/customer/outerLinks");
      } else if (e === "updatelist") {
        history.push("/customer/updates");
      } else if (e === "updatedirect") {
        history.push("/customer/updatedirect");
      } else if (e === "updateindirect") {
        history.push("/customer/updateindirect");
      } else if (e === "updatemiscellaneous") {
        history.push("/customer/miscellaneous");
      } else if (e === "enquiry") {
        history.push("/customer/customerquery");
      } else if (e === "contactUs") {
        history.push("/customer/contact");
      } else if (e === "about") {
        history.push("/customer/about");
      }
    } else {
      props.showCook("showCookies");
    }
  };
  return (
    <>
      <div className="clientSubMenu">
        <li
          className="nav-item tabHoverLinksubMenu"
          onClick={() => myLink("direct")}
        >
          <ListItemButton style={{ backgroundColor: "#fff" }}>
            <span className="headerMenu">Articles</span>
          </ListItemButton>
        </li>

        <li
          className="nav-item tabHoverLinksubMenu"
          onMouseOver={() => handleClickUpdateOpen()}
          onMouseLeave={() => handleClickUpdateClose()}
        >
          <ListItemButton style={{ backgroundColor: "#fff" }}>
            <span className="headerMenu">Updates</span>
          </ListItemButton>

          <Collapse in={updateOpen} unmountOnExit>
            <List component="div" className="myLink22">
              <ul>
                <li
                  className="tabHover subMenuHeader"
                  onClick={() => myLink("updatedirect")}
                >
                  <span className="headerMenu">Direct tax</span>
                </li>

                <li
                  className="tabHover subMenuHeader"
                  onClick={() => myLink("updateindirect")}
                >
                  <span className="headerMenu">Indirect tax</span>
                </li>
                <li
                  className="tabHover subMenuHeader"
                  onClick={() => myLink("updatemiscellaneous")}
                >
                  <span className="headerMenu">Miscellaneous</span>
                </li>
              </ul>
            </List>
          </Collapse>
        </li>
        {props.position === "Inner" ? (
          ""
        ) : (
          <li
            className="nav-item tabHoverLinksubMenu"
            onClick={() => myLink("linklist")}
          >
            <ListItemButton style={{ backgroundColor: "#fff" }}>
              <span className="headerMenu">Important links</span>
            </ListItemButton>
          </li>
        )}
        <li
          className="nav-item tabHoverLinksubMenu"
          onMouseLeave={() => handleClickOn2()}
        >
          <ListItemButton
            style={{ backgroundColor: "#fff" }}
            onMouseOver={() => handleClickOff2()}
          >
            <span className="headerMenu">Media gallery</span>
          </ListItemButton>
          <Collapse in={open2} unmountOnExit>
            <List component="div" className="myLink22">
              <ul>
                <li
                  className="tabHover subMenuHeader"
                  onClick={() => myLink("photo")}
                >
                  <span className="headerMenu">Photo gallery</span>
                </li>

                <li
                  className="tabHover subMenuHeader"
                  onClick={() => myLink("video")}
                >
                  <span className="headerMenu">Video gallery</span>
                </li>

                <li
                  className="tabHover subMenuHeader"
                  onClick={() => myLink("mediacontent")}
                >
                  <span className="headerMenu">Media news</span>
                </li>
              </ul>
            </List>
          </Collapse>
        </li>
        {props.position === "Inner" ? (
          ""
        ) : (
          <>
            <li
              className="nav-item tabHoverLinksubMenu"
              onClick={() => myLink("faqlist")}
            >
              <ListItemButton style={{ backgroundColor: "#fff" }}>
                <span className="headerMenu">FAQs</span>
              </ListItemButton>
            </li>
            <li
              className="nav-item tabHoverLinksubMenu"
              onClick={() => myLink("about")}
            >
              <ListItemButton style={{ backgroundColor: "#fff" }}>
                <span className="headerMenu">About us</span>
              </ListItemButton>
            </li>
            <li
              className="nav-item tabHoverLinksubMenu"
              onMouseLeave={() => handleClickOn3()}
            >
              <ListItemButton
                style={{ backgroundColor: "#fff" }}
                onMouseOver={() => handleClickOff3()}
              >
                <span className="headerMenu">Contact us</span>
              </ListItemButton>
              <Collapse in={open3} unmountOnExit>
                <List component="div" className="myLink22">
                  <ul>
                    <li
                      className="tabHover subMenuHeader"
                      onClick={() => myLink("enquiry")}
                    >
                      <span className="headerMenu">Enquiry form</span>
                    </li>

                    <li
                      className="tabHover subMenuHeader"
                      onClick={() => myLink("contactUs")}
                    >
                      <span className="headerMenu">Our office</span>
                    </li>
                  </ul>
                </List>
              </Collapse>
            </li>
          </>
        )}
      </div>
      {showCookie === true ? (
        <div className="popup">
          <CookieConsent
            debug={true}
            declineButtonText={<CloseIcon />}
            onDecline={() => {
              setShowCookie(false);
              history.push("/");
            }}
            enableDeclineButton
            disableStyles
            location="none"
            buttonText="Agree"
            expires={1}
            overlay
            declineButtonClasses="myCookiesdecBtn"
            buttonStyle={{
              borderBottomLeftRadius: "1.75rem",

              backgroundColor: "#0071CE",
              border: "1px solid #0071CE",
              color: "#fff",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: 500,
              minWidth: "100px",
              minHeight: "3rem",
              textAlign: "center",
              display: "block",
              marginLeft: "auto",
            }}
            onAccept={(e) => {
              localStorage.setItem("myData", "outerLogin");
              Cookies.set("accept", "agree");
            }}
            overlayClasses="overlayclass"
          >
            <CustomHeading>Disclaimer</CustomHeading>

            <SubHeading>
              By clicking on the "Agree" button below, the user hereby
              acknowledges having read and understood the disclaimer below:
            </SubHeading>
            <ul>
              <li>
                <CustomTypography margin="5px">
                  The user on his own accord wishes to know more about Mazars
                  Advisory Solutions and any of its members for his own
                  information and use.
                </CustomTypography>
              </li>
              <li>
                <CustomTypography margin="5px">
                  The user acknowledges that there has been no solicitation,
                  invitation, or inducement of any sort whatsoever from Mazars
                  Advisory Solutions or any of its members to create an
                  Attorney/Consultant-Client relationship.
                </CustomTypography>
              </li>
              <li>
                <CustomTypography margin="5px">
                  The user acknowledges that Mazars Advisory Solutions makes
                  every effort to maintain updated and accurate information on
                  this website and cannot accept responsibility for any
                  prejudice, loss or damage which may occur from use of such
                  information. Mazars Advisory Solutions assumes no liability
                  for the interpretation or use of content or information
                  contained on this website, nor does it offer any warranty of
                  any kind, either express or implied in relation to such
                  content or information.
                </CustomTypography>
              </li>

              <li>
                <CustomTypography margin="5px">
                  The user acknowledges that Mazars Advisory Solutions does not
                  intend that links / URLs contained on this website
                  re-directing users to third party websites be considered as
                  referrals to, endorsements of, or affiliations with any such
                  third-party website operators. Mazars Advisory Solutions is
                  not responsible for, and makes no representation or warranty,
                  express or implied, about the content or information contained
                  on such third-party websites.
                </CustomTypography>
              </li>
            </ul>
          </CookieConsent>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
