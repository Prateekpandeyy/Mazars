import React from "react";
import { BroadcastChannel } from 'broadcast-channel';
// import history from 'history/browser';
import "../../assets/css/style.css";
import { Link, useHistory } from "react-router-dom";
import NavWrapper from "./NavWrapper";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { WindowSharp } from "@mui/icons-material";
import {CustLogout} from "./CustLogout";



function AdminHeader({ custUserId, adminUserId, TLuserId, TPuserId, cmsDashboard, feedbackNumber }) {
  let history = useHistory();
  const logoutChannel =new BroadcastChannel('logout')

  // const custLogout = () => {
  //   const token = window.localStorage.getItem("clientToken")
  //   const myConfig = {
  //     headers: {
  //       "uit": token
  //     }
  //   }
  //   axios.get(`${baseUrl}/customers/logout`, myConfig)
  //     .then((res) => {
  //       logoutChannel.postMessage("Logout")
  //       localStorage.removeItem("userid");
  //       localStorage.removeItem("custEmail");
  //       localStorage.removeItem("category");
  //       localStorage.removeItem("clientToken")
  //       history.push("/");
  //       // window.addEventListner('storage',storageChange,false);

  //     })

  // };

   

  const adminLogout = () => {

    const token = window.localStorage.getItem("adminToken")
    const myConfig = {
      headers: {
        "uit": token
      }
    }
    axios.get(`${baseUrl}/admin/logout`, myConfig)
      .then((res) => {

        localStorage.removeItem("adminkey");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("category");
        localStorage.removeItem("adminToken")

        history.push("/admin/login");

      })


  };
  const cmsLogout = () => {
    const token = window.localStorage.getItem("token")
    const myConfig = {
      headers: {
        "uit": token
      }
    }
    axios.get(`${baseUrl}/cms/logout`, myConfig)
      .then((res) => {


        localStorage.removeItem("token")

        history.push("/cms/login");

      })
  }

  const tlLogout = () => {
    const token = window.localStorage.getItem("tlToken")
    const myConfig = {
      headers: {
        "uit": token
      }
    }
    axios.get(`${baseUrl}/tl/logout`, myConfig)
      .then((res) => {

        localStorage.removeItem("tlkey");
        localStorage.removeItem("tlEmail");
        localStorage.removeItem("category");
        localStorage.removeItem("tlToken");
        history.push("/teamleader/login");
        if (localStorage.getItem(`searchDataAs1`) !== null){
          localStorage.removeItem(`searchDataAs1`);
        }
          if (localStorage.getItem(`searchDataAs2` ) !== null){ 
          localStorage.removeItem(`searchDataAs2`);
        }
          if (localStorage.getItem(`searchDataAs3` ) !== null){ 
          localStorage.removeItem(`searchDataAs3`);
        }
          if (localStorage.getItem(`searchDataAs4` ) !== null){ 
          localStorage.removeItem(`searchDataAs4`);
        }
          if (localStorage.getItem(`searchDataI1` ) !== null){ 
          localStorage.removeItem(`searchDataI1`);
        }
          if (localStorage.getItem(`searchDataI2` ) !== null){ 
          localStorage.removeItem(`searchDataI2`);
        }
          if (localStorage.getItem(`searchDataQ1` ) !== null){ 
          localStorage.removeItem(`searchDataQ1`);
        }
          if (localStorage.getItem(`searchDataQ2` ) !== null){ 
          localStorage.removeItem(`searchDataQ2`);
        }
          if (localStorage.getItem(`searchDataQ3` ) !== null){ 
          localStorage.removeItem(`searchDataQ3`);
        }
          if (localStorage.getItem(`searchDataQ4` ) !== null){ 
          localStorage.removeItem(`searchDataQ4`);
        }
          if (localStorage.getItem(`searchDataA1` ) !== null){ 
          localStorage.removeItem(`searchDataA1`);
        }
          if (localStorage.getItem(`searchDataA2` ) !== null){ 
          localStorage.removeItem(`searchDataA2`);
        }
          if (localStorage.getItem(`searchDataA3` ) !== null){ 
          localStorage.removeItem(`searchDataA3`);
        }
          if (localStorage.getItem(`searchDataA4` ) !== null){ 
          localStorage.removeItem(`searchDataA4`);
        }
          if (localStorage.getItem(`searchDataP1` ) !== null){ 
          localStorage.removeItem(`searchDataP1`);
        }
          if (localStorage.getItem(`searchDataP2` ) !== null){ 
          localStorage.removeItem(`searchDataP2`);
        }
          if (localStorage.getItem(`searchDataP3` ) !== null){ 
          localStorage.removeItem(`searchDataP3`);
        }
          if (localStorage.getItem(`searchDataP4` ) !== null){ 
          localStorage.removeItem(`searchDataP4`);
        }
          if (localStorage.getItem(`searchDataY1` ) !== null){ 
          localStorage.removeItem(`searchDataY1`);
        }
          if (localStorage.getItem(`searchDataY2` ) !== null){ 
          localStorage.removeItem(`searchDataY2`);
        }
          if (localStorage.getItem(`searchDataY3` ) !== null){ 
          localStorage.removeItem(`searchDataY3`);
        }
      })
  };

  const tpLogout = () => {
    const token = window.localStorage.getItem("tptoken")
    const myConfig = {
      headers: {
        "uit": token
      }
    }
    axios.get(`${baseUrl}/tp/logout`, myConfig)
      .then((res) => {

        localStorage.removeItem("tpkey");
        localStorage.removeItem("tpEmail");
        localStorage.removeItem("category");
        localStorage.removeItem("tptoken");

        history.push("/taxprofessional/login");

      })

  };

  const nm = window.localStorage.getItem("name");

  var name = JSON.parse(nm);



  const CustEmail = window.localStorage.getItem("custEmail");
  const adminEmail = window.localStorage.getItem("adminEmail");
  const tlEmail = window.localStorage.getItem("tlEmail");
  const tpEmail = window.localStorage.getItem("tpEmail")
  const cmsEmail = window.localStorage.getItem("cmsName")


  return (

    <nav
      className="header-navbar navbar-expand-lg navbar navbar-with-menu navbar-without-dd-arrow navbar-semi-light"

    >
      {custUserId && (
        <NavWrapper
          color="#fff" logout={CustLogout}
          name="customer" email={CustEmail}
        />
      )}

      {adminUserId && (
        <NavWrapper color="#fff" logout={adminLogout}
          name="admin" email={adminEmail}
          feedbackNumber={feedbackNumber}
        />
      )}
      {
        cmsDashboard &&
        <NavWrapper color="#fff" logout={cmsLogout}
          name="cms" email={cmsEmail}

        />
      }
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
