import React from "react";
import "../../assets/css/style.css";
import { Link, useHistory } from "react-router-dom";
import NavWrapper from "./NavWrapper";


function AdminHeader({ custUserId, adminUserId, TLuserId, TPuserId , feedbackNumber}) {
  let history = useHistory();

  const custLogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("custEmail");
    localStorage.removeItem("category");
    history.push("/");
  };

  const adminLogout = () => {
    localStorage.removeItem("adminkey");
    localStorage.removeItem("adminEmail");
    history.push("/admin/login");
  };

  const tlLogout = () => {
    localStorage.removeItem("tlkey");
    localStorage.removeItem("tlEmail");
    history.push("/teamleader/login");
  };

  const tpLogout = () => {
    localStorage.removeItem("tpkey");
    history.push("/taxprofessional/login");
  };

  const nm = window.localStorage.getItem("name");
 
  var name = JSON.parse(nm);
  


  const CustEmail = window.localStorage.getItem("custEmail");
  const adminEmail = window.localStorage.getItem("adminEmail");
  const tlEmail = window.localStorage.getItem("tlEmail");
  const tpEmail = window.localStorage.getItem("tpEmail")
 
  
  return (
   
      <nav
        className="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow navbar-semi-light"
        sty
      >
        {custUserId && (
          <NavWrapper 
         
          color="#fff" logout={custLogout}
            name="customer" email={CustEmail}
          />
        )}

        {adminUserId && (
          <NavWrapper color="#fff" logout={adminLogout}
            name="admin" email={adminEmail}
            feedbackNumber= {feedbackNumber}
          />
        )}

        {TLuserId && <NavWrapper color="#fff" logout={tlLogout}
          name="Team Leader" email={tlEmail}
        />}

        {TPuserId && <NavWrapper color="#fff" logout={tpLogout}
          name="Tax Professional" email={tpEmail}
        />}
      </nav>
   
  );
}

export default AdminHeader;
