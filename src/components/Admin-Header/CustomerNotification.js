import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link, useHistory } from "react-router-dom";

function CustomerNotification({ tokenKey, name, panel }) {
  const [countNotification, setCountNotification] = useState("");

  const role = localStorage.getItem("role");
  let history = useHistory();

  useEffect(() => {
    getNotification();
  }, [tokenKey]);

  const custLogout = () => {
    const token = window.localStorage.getItem("clientToken");
    const myConfig = {
      headers: {
        uit: token,
      },
    };

    axios.get(`${baseUrl}/customers/logout`, myConfig).then((res) => {
      localStorage.removeItem("userid");
      localStorage.removeItem("custEmail");
      localStorage.removeItem("category");
      localStorage.removeItem("clientToken");
      history.push("/");
    });
  };

  const adminLogout = () => {
    const token = window.localStorage.getItem("adminToken");
    const myConfig = {
      headers: {
        uit: token,
      },
    };
    axios.get(`${baseUrl}/admin/logout`, myConfig).then((res) => {
      localStorage.removeItem("adminkey");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("category");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("searchDataadquery1");
      localStorage.removeItem("searchDataadquery2");
      localStorage.removeItem("searchDataadquery3");
      localStorage.removeItem("searchDataadquery4");
      localStorage.removeItem("searchDataadproposal1");
      localStorage.removeItem("searchDataadproposal2");
      localStorage.removeItem("searchDataadproposal3");
      localStorage.removeItem("searchDataadproposal4");
      localStorage.removeItem("searchDataadpayment1");
      localStorage.removeItem("searchDataadpayment2");
      localStorage.removeItem("searchDataadpayment3");
      localStorage.removeItem("searchDataadAssignment1");
      localStorage.removeItem("searchDataadAssignment2");
      localStorage.removeItem("searchDataadAssignment3");
      localStorage.removeItem("searchDataadAssignment4");
      localStorage.removeItem("admincreate");
      localStorage.removeItem("admingenerated");
      axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
        if (res.data.code === 1) {
          localStorage.removeItem("admincategoryData");
          let data = res.data.result;
          data.map((i) => {
            localStorage.removeItem(`admin${i.details}`);
          });
        }
      });
      history.push("/admin/login");
    });
  };

  const tlLogout = () => {
    const token = window.localStorage.getItem("tlToken");
    const myConfig = {
      headers: {
        uit: token,
      },
    };
    axios.get(`${baseUrl}/tl/logout`, myConfig).then((res) => {
      localStorage.removeItem("tlkey");
      localStorage.removeItem("tlEmail");
      localStorage.removeItem("category");
      localStorage.removeItem("tlToken");
      localStorage.removeItem("searchDatatlquery1");
      localStorage.removeItem("searchDatatlquery2");
      localStorage.removeItem("searchDatatlquery3");
      localStorage.removeItem("searchDatatlquery4");
      localStorage.removeItem("searchDatatlproposal1");
      localStorage.removeItem("searchDatatlproposal2");
      localStorage.removeItem("searchDatatlproposal3");
      localStorage.removeItem("searchDatatlproposal4");
      localStorage.removeItem("searchDatatlpayment1");
      localStorage.removeItem("searchDatatlpayment2");
      localStorage.removeItem("searchDatatlpayment3");
      localStorage.removeItem("searchDatatlAssignment1");
      localStorage.removeItem("searchDatatlAssignment2");
      localStorage.removeItem("searchDatatlAssignment3");
      localStorage.removeItem("searchDatatlAssignment4");
      localStorage.removeItem("tlcreate");
      localStorage.removeItem("tlgenerated");
      axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
        if (res.data.code === 1) {
          localStorage.removeItem("tlcategoryData");
          let data = res.data.result;
          data.map((i) => {
            localStorage.removeItem(`tl${i.details}`);
          });
        }
      });
      history.push("/teamleader/login");

      history.push("/teamleader/login");
    });
  };

  const tpLogout = () => {
    const token = window.localStorage.getItem("tptoken");
    const myConfig = {
      headers: {
        uit: token,
      },
    };
    axios.get(`${baseUrl}/tp/logout`, myConfig).then((res) => {
      localStorage.removeItem("tpkey");
      localStorage.removeItem("tpEmail");
      localStorage.removeItem("category");
      localStorage.removeItem("tptoken");
      localStorage.removeItem("searchDatatpquery1");
      localStorage.removeItem("searchDatatpquery2");
      localStorage.removeItem("searchDatatpquery3");
      localStorage.removeItem("searchDatatpquery4");
      localStorage.removeItem("searchDatatpproposal1");
      localStorage.removeItem("searchDatatpproposal2");
      localStorage.removeItem("searchDatatpproposal3");
      localStorage.removeItem("searchDatatpproposal4");
      localStorage.removeItem("searchDatatppayment1");
      localStorage.removeItem("searchDatatppayment2");
      localStorage.removeItem("searchDatatppayment3");
      localStorage.removeItem("searchDatatpAssignment1");
      localStorage.removeItem("searchDatatpAssignment2");
      localStorage.removeItem("searchDatatpAssignment3");
      localStorage.removeItem("searchDatatpAssignment4");
      localStorage.removeItem("tpcreate");
      localStorage.removeItem("tpgenerated");
      history.push("/taxprofessional/login");
    });
  };

  const getNotification = () => {
    var timeStampInMs = Date.now();
    var previousLogin = localStorage.getItem("loginTime");
    var nextLogin = Number(previousLogin) + Number(540000);
    var adminpreviousLogin = localStorage.getItem("adminloginTime");
    var adminnextLogin = Number(adminpreviousLogin) + Number(540000);
    var tlpreviousLogin = localStorage.getItem("tlloginTime");
    var tlnextLogin = Number(tlpreviousLogin) + Number(540000);
    var tppreviousLogin = localStorage.getItem("tploginTime");
    var tpnextLogin = Number(tppreviousLogin) + Number(540000);
    if (nextLogin < timeStampInMs) {
      localStorage.setItem("loginTime", timeStampInMs);
    } else if (adminnextLogin < timeStampInMs) {
      localStorage.setItem("adminloginTime", timeStampInMs);
    } else if (tlnextLogin < tlpreviousLogin) {
      localStorage.setItem("tlloginTime", timeStampInMs);
    } else if (tpnextLogin < tppreviousLogin) {
      localStorage.setItem("tploginTime", timeStampInMs);
    }
    var token = "";
    var redir = "";
    if (panel === "taxprofessional") {
      token = window.localStorage.getItem("tptoken");
      redir = "tl";
    } else if (panel === "teamleader") {
      token = window.localStorage.getItem("tlToken");
      redir = "tl";
    } else if (panel === "admin") {
      token = window.localStorage.getItem("adminToken");
      redir = "admin";
    } else if (panel === "Cms") {
      token = window.localStorage.getItem("token");
      redir = "cms";
    } else if (panel === "client") {
      token = window.localStorage.getItem("clientToken");
      redir = "customers";
    }
    const myConfig = {
      headers: {
        uit: token,
      },
    };

    if (redir !== "cms") {
      axios
        .get(
          `${baseUrl}/${redir}/getNotification?id=${JSON.parse(
            tokenKey
          )}&type_list=uread`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            if (res.data.result[0] != undefined) {
              setCountNotification(res.data.result[0].total);
            }
          } else if (res.data.code === 102) {
            if (redir === "admin") {
              adminLogout();
            } else if (redir === "tl") {
              tlLogout();
            } else if (redir === "tp") {
              tpLogout();
            } else if (redir === "customers") {
              custLogout();
            }
          }
        });
    } else {
      return false;
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          padding: "10px",
        }}
      >
        <li className="dropdown dropdown-notification nav-item">
          {countNotification ? (
            <>
              {name === "Team Leader" ? (
                <Link to={`/teamleader/message`} className="notification">
                  <h4 className="contentTitle">Inbox </h4>
                  <span className="badge">{countNotification}</span>
                </Link>
              ) : (
                ""
              )}
              {name === "Tax Professional" ? (
                <Link to={`/taxprofessional/message`} className="notification">
                  <h4 className="contentTitle">Inbox </h4>
                  <span className="badge">{countNotification}</span>
                </Link>
              ) : (
                ""
              )}
              {name === "customer" ? (
                <Link to={`/${name}/message`} className="notification">
                  <h4 className="contentTitle">Inbox </h4>
                  <span className="badge">{countNotification}</span>
                </Link>
              ) : (
                ""
              )}
              {name === "admin" ? (
                <Link to={`/${name}/message`} className="notification">
                  <h4 className="contentTitle">Inbox </h4>
                  <span className="badge">{countNotification}</span>
                </Link>
              ) : (
                ""
              )}
            </>
          ) : null}
        </li>
      </div>
    </>
  );
}

export default CustomerNotification;
