import React from "react";
import "../../assets/css/style.css";
import { Link, useHistory } from "react-router-dom";
import NavWrapper from "./NavWrapper";


function AdminHeader({ custUserId, adminUserId, TLuserId, TPuserId }) {
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
  console.log(name);
  var name = JSON.parse(nm);
  // const nm = name.split("")[1].toUpperCase();
  // var a = res[1].toUpperCase()
  // console.log(nm)



  const CustEmail = window.localStorage.getItem("custEmail");
  const adminEmail = window.localStorage.getItem("adminEmail");
  const tlEmail = window.localStorage.getItem("tlEmail");
  const tpEmail = window.localStorage.getItem("tpEmail")
 
  
  return (
    <div>
      <nav
        class="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light"
        sty
      >
        {custUserId && (
          <NavWrapper color="#5E96AE" logout={custLogout}
            name="customer" email={CustEmail}
          />
        )}

        {adminUserId && (
          <NavWrapper color="#262d47" logout={adminLogout}
            name="admin" email={adminEmail}
          />
        )}

        {TLuserId && <NavWrapper color="#BC85A3" logout={tlLogout}
          name="teamleader" email={tlEmail}
        />}

        {TPuserId && <NavWrapper color="#9799BA" logout={tpLogout}
          name="taxprofessional" email={tpEmail}
        />}
      </nav>
    </div>
  );
}

export default AdminHeader;
