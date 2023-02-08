import React from "react";
import "../../assets/css/style.css";
import MyPDF from "../../views/dFile/LoginManual.pdf";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import SocialIcons from "../socialicon.js/SocialIcons";
import CustomTypography from "../Common/CustomTypography";
function Footer(props) {
  let date = new Date();
  let history = useHistory();
  const userid = window.localStorage.getItem("userid");
  const cookieEnable = Cookies.get("accept");
  const myLink = (e) => {
    if (cookieEnable) {
      if (e === "enquiry") {
        history.push("/customer/customerquery");
      } else if (e === "contactbasic") {
        history.push("/customer/contactbasic");
      } else if (e === "aboutbasic") {
        history.push("/customer/aboutbasic");
      } else if (e === "needhelp") {
        window.open(MyPDF, "blank");
      }
    } else {
      props.showCook("showCookies");
    }
  };
  return (
    <>
      <footer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            textAlign: "center",
          }}
        >
          <SocialIcons />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CustomTypography>
              <a className="tabHover" onClick={() => myLink("enquiry")}>
                Enquiry &nbsp;|
              </a>
            </CustomTypography>
            <CustomTypography>
              <a onClick={() => myLink("contactbasic")}>
                &nbsp;Contact us &nbsp;|
              </a>
            </CustomTypography>

            <CustomTypography>
              <a onClick={() => myLink("aboutbasic")}>&nbsp;About us &nbsp;|</a>
            </CustomTypography>
            <CustomTypography>
              &nbsp;<a onClick={() => myLink("needhelp")}>Need help?</a>
            </CustomTypography>
          </div>
          <CustomTypography>
            {`ISO 27001 certified | Copyright  @2023 All right reserved`}
          </CustomTypography>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}></div>
      </footer>
    </>
  );
}

export default Footer;
