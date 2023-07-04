import React from "react";
import "./App.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import TpRoute from "./RouteFolder/TpRoute/TpRoute";
import TlRoute from "./RouteFolder/TlRoute/TlRoute";
import AdminRoute from "./RouteFolder/AdminRoute/AdminRoute";
import CmsRoute from "./RouteFolder/CmsRoute/CmsRoute";
import ClientRoute from "./RouteFolder/ClientRoute/ClientRoute";
function WebRoutes() {
  const getLayout = () => {
    let comp;
    console.log("window", window.location.pathname.split("/"));
    if (
      window.location.pathname.split("/")[1] === "taxprofessional" ||
      window.location.pathname.split("/")[1] === "taxprofessional_queries" ||
      window.location.pathname.split("/")[1] === "taxprofessional_chatting" ||
      window.location.pathname.split("/")[1] === "taxprofessional_paydetails" ||
      window.location.pathname.split("/")[1] ===
        "taxprofessional_sendproposal" ||
      window.location.pathname.split("/")[1] ===
        "taxprofessional_edit-proposal" ||
      window.location.pathname.split("/")[1] === "taxprofessional_queries"
    ) {
      comp = <TpRoute />;
    } else if (
      window.location.pathname.split("/")[1] === "teamleader" ||
      window.location.pathname.split("/")[1] === "teamleader_queries" ||
      window.location.pathname.split("/")[1] === "teamleader_chatting" ||
      window.location.pathname.split("/")[1] === "teamleader_paydetails" ||
      window.location.pathname.split("/")[1] === "teamleader_sendproposal" ||
      window.location.pathname.split("/")[1] === "teamleader_edit-proposal" ||
      window.location.pathname.split("/")[1] === "teamleader_queries"
    ) {
      comp = <TlRoute />;
    } else if (
      window.location.pathname.split("/")[1] === "admin" ||
      window.location.pathname.split("/")[1] === "admin_chatting" ||
      window.location.pathname.split("/")[1] === "admin_paydetails" ||
      window.location.pathname.split("/")[1] === "admin_edittl" ||
      window.location.pathname.split("/")[1] === "admin_queries" ||
      window.location.pathname.split("/")[1] === "admin_edittp"
    ) {
      comp = <AdminRoute />;
    } else if (window.location.pathname.split("/")[1] === "cms") {
      comp = <CmsRoute />;
    } else if (window.location.pathname.split("/")[1] === "customer") {
      comp = <ClientRoute />;
    } else {
      comp = <ClientRoute />;
    }
    return comp;
  };
  return <>{getLayout()}</>;
}

export default WebRoutes;

// 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
