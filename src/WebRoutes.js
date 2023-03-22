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

    if (window.location.pathname.split("/")[1] === "taxprofessional") {
      comp = <TpRoute />;
    } else if (window.location.pathname.split("/")[1] === "teamleader") {
      comp = <TlRoute />;
    } else if (window.location.pathname.split("/")[1] === "admin") {
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
