import React from "react";
import "../../assets/css/style.css";
import { Link, useHistory } from "react-router-dom";
import NavWrapper from "./NavWrapper";
import axios from "axios";
import { baseUrl } from "../../config/config";


function AdminHeader({ custUserId, adminUserId, TLuserId, TPuserId , feedbackNumber}) {
  let history = useHistory();

  const custLogout = () => {
    const token = window.localStorage.getItem("clientToken")
            const myConfig = {
                headers : {
                 "uit" : token
                }
              }
            axios.get(`${baseUrl}/customers/logout`, myConfig)
            .then((res) => {
                if(res.data.code === 1){
                  
                  localStorage.removeItem("userid");
                  localStorage.removeItem("custEmail");
                  localStorage.removeItem("category");
                  localStorage.removeItem("clientToken")
                  history.push("/");
                }
            })
   
  };

  const adminLogout = () => {
    const token = window.localStorage.getItem("adminToken")
            const myConfig = {
                headers : {
                 "uit" : token
                }
              }
         axios.get(`${baseUrl}/admin/logout`, myConfig)
         .then((res) => {
             if(res.data.code === 1){
              localStorage.removeItem("adminkey");
              localStorage.removeItem("adminEmail");
              localStorage.removeItem("category");
              localStorage.removeItem("adminToken")
             
              history.push("/admin/login");
             }
         })
  };

  const tlLogout = () => {
    const token = window.localStorage.getItem("tlToken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
         axios.get(`${baseUrl}/tl/logout`, myConfig)
         .then((res) => {
             if(res.data.code === 1){
              localStorage.removeItem("tlkey");
              localStorage.removeItem("tlEmail");
              localStorage.removeItem("category");
              localStorage.removeItem("tlToken")
           
              history.push("/teamleader/login");
             }
         })
  };

  const tpLogout = () => {
    const token = window.localStorage.getItem("tptoken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
        axios.get(`${baseUrl}/tl/logout`, myConfig)
        .then((res) => {
            if(res.data.code === 1){
              localStorage.removeItem("tpkey");
              localStorage.removeItem("tpEmail");
              localStorage.removeItem("category");
              localStorage.removeItem("tptoken");
           
              history.push("/taxprofessional/login");
            }
        })
        
  };

  const nm = window.localStorage.getItem("name");
 
  var name = JSON.parse(nm);
  


  const CustEmail = window.localStorage.getItem("custEmail");
  const adminEmail = window.localStorage.getItem("adminEmail");
  const tlEmail = window.localStorage.getItem("tlEmail");
  const tpEmail = window.localStorage.getItem("tpEmail")
 
  
  return (
   
      <nav
        className="header-navbar navbar-expand-lg navbar navbar-with-menu navbar-without-dd-arrow navbar-semi-light"
        
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
