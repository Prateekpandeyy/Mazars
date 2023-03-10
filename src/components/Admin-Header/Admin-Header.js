import React from "react";
import "../../assets/css/style.css";
import { Link, useHistory } from "react-router-dom";
import NavWrapper from "./NavWrapper";
import axios from "axios";
import { baseUrl } from "../../config/config";

function AdminHeader({
  custUserId,
  adminUserId,
  TLuserId,
  TPuserId,
  cmsDashboard,
  feedbackNumber,
}) {
  let history = useHistory();

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
  const cmsLogout = () => {
    const token = window.localStorage.getItem("token");
    const myConfig = {
      headers: {
        uit: token,
      },
    };
    axios.get(`${baseUrl}/cms/logout`, myConfig).then((res) => {
      localStorage.removeItem("token");

      history.push("/cms/login");
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

  const nm = window.localStorage.getItem("name");

  var name = JSON.parse(nm);

  const CustEmail = window.localStorage.getItem("custEmail");
  const adminEmail = window.localStorage.getItem("adminEmail");
  const tlEmail = window.localStorage.getItem("tlEmail");
  const tpEmail = window.localStorage.getItem("tpEmail");
  const cmsEmail = window.localStorage.getItem("cmsName");

  return (
    <nav className="header-navbar navbar-expand-lg navbar navbar-with-menu navbar-without-dd-arrow navbar-semi-light">
      {custUserId && (
        <NavWrapper
          color="#fff"
          logout={custLogout}
          name="customer"
          email={CustEmail}
        />
      )}

      {adminUserId && (
        <NavWrapper
          color="#fff"
          logout={adminLogout}
          name="admin"
          email={adminEmail}
          feedbackNumber={feedbackNumber}
        />
      )}
      {cmsDashboard && (
        <NavWrapper
          color="#fff"
          logout={cmsLogout}
          name="cms"
          email={cmsEmail}
        />
      )}
      {TLuserId && (
        <NavWrapper
          color="#fff"
          logout={tlLogout}
          name="Team Leader"
          email={tlEmail}
        />
      )}

      {TPuserId && (
        <NavWrapper
          color="#fff"
          logout={tpLogout}
          name="Tax Professional"
          email={tpEmail}
        />
      )}
    </nav>
  );
}

export default AdminHeader;
