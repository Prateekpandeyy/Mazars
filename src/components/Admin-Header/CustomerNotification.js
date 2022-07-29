import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link , useHistory} from "react-router-dom";


function CustomerNotification({ tokenKey, name , panel}) {



   
    const [countNotification, setCountNotification] = useState("");
    
   const role = localStorage.getItem("role")
   let history = useHistory()

    useEffect(() => {
        getNotification();
       
    }, [tokenKey]);
   
  const custLogout = () => {
    const token = window.localStorage.getItem("clientToken")
            const myConfig = {
                headers : {
                 "uit" : token
                }
              }
            axios.get(`${baseUrl}/customers/logout`, myConfig)
            .then((res) => {
               
                  localStorage.removeItem("userid");
                  localStorage.removeItem("custEmail");
                  localStorage.removeItem("category");
                  localStorage.removeItem("clientToken")
                  history.push("/");
                
            })
   
  };

  const adminLogout = () => {
    const role = localStorage.getItem("role")
    // const token = window.localStorage.getItem("adminToken")
    //         const myConfig = {
    //             headers : {
    //              "uit" : token
    //             }
    //           }
    //      axios.get(`${baseUrl}/admin/logout`, myConfig)
    //      .then((res) => {
            
    //           localStorage.removeItem("adminkey");
    //           localStorage.removeItem("adminEmail");
    //           localStorage.removeItem("category");
    //           localStorage.removeItem("adminToken")
             
    //           history.push("/admin/login");
            
    //      })
    if (role === "admin"){
      const token = window.localStorage.getItem("adminToken")
      const myConfig = {
          headers : {
           "uit" : token
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
  }
  else if (role === "cms"){
      const token = window.localStorage.getItem("token")
      const myConfig = {
          headers : {
           "uit" : token
          }
        }
   axios.get(`${baseUrl}/cms/logout`, myConfig)
   .then((res) => {
      
        localStorage.removeItem("adminkey");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("category");
        localStorage.removeItem("token")
       
        history.push("/cms/login");
      
   })
  }
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
           
              localStorage.removeItem("tlkey");
              localStorage.removeItem("tlEmail");
              localStorage.removeItem("category");
              localStorage.removeItem("tlToken")
           
              history.push("/teamleader/login");
            
         })
  };

  const tpLogout = () => {
    const token = window.localStorage.getItem("tptoken")
  const myConfig = {
      headers : {
       "uit" : token
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

    const getNotification = () => {
        var timeStampInMs = Date.now()
       var previousLogin =  localStorage.getItem("loginTime")
       var nextLogin = Number(previousLogin) + Number(540000)
       var adminpreviousLogin =  localStorage.getItem("adminloginTime")
       var adminnextLogin = Number(adminpreviousLogin) + Number(540000)
       var tlpreviousLogin =  localStorage.getItem("tlloginTime")
       var tlnextLogin = Number(tlpreviousLogin) + Number(540000)
       var tppreviousLogin =  localStorage.getItem("tploginTime")
       var tpnextLogin = Number(tppreviousLogin) + Number(540000)
       if(nextLogin < timeStampInMs){
           localStorage.setItem("loginTime", timeStampInMs)
       }
       else if(adminnextLogin < timeStampInMs){
        localStorage.setItem("adminloginTime", timeStampInMs)
       }
       else if(tlnextLogin < tlpreviousLogin){
           localStorage.setItem("tlloginTime", timeStampInMs)
       }
       else if(tpnextLogin < tppreviousLogin){
        localStorage.setItem("tploginTime", timeStampInMs)
    }
        var token = ""
        var redir = ""
        if(panel === "taxprofessional"){
            token =  window.localStorage.getItem("tptoken")
            redir = "tl"
        }
        else if (panel === "teamleader"){
           token = window.localStorage.getItem("tlToken")
           redir = "tl"
        }
        else if (panel === "admin"){
            token = window.localStorage.getItem("adminToken")
            redir = "admin"
        }
        else if(panel === "client") {
           token = window.localStorage.getItem("clientToken")
           redir = "customers"
        }
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
      if(role === "cms" && window.location.hash.search("admin") == 2){
        console.log("cmsfixed", window.location.hash.search("admin"))
        history.push("/*")
    }
        else{
            axios
            .get(`${baseUrl}/${redir}/getNotification?id=${JSON.parse(tokenKey)}&type_list=uread`, myConfig)
            .then((res) => {
                console.log("resCode", res.data.code)
                if (res.data.code === 1) {
                   
                   if(res.data.result[0] != undefined){
                    setCountNotification(res.data.result[0].total);
                   }
                }
                else if (res.data.code !== 1){
                    
                   if(redir === "admin"){
                       adminLogout()
                   }
                   else if (redir === "tl"){
                       tlLogout()
                   }
                   else if (redir === "tp"){
                       tpLogout()
                   }
                }
            });
        }
    };




    return (
        <>
            <div style={{display : "flex", justifyContent : "center", alignItems : "flex-end", padding: "10px"}}>
                <li className="dropdown dropdown-notification nav-item">
                    {countNotification ? (
                     <>
                     {
                         name === "Team Leader" ?
                         <Link to={`/teamleader/message`} className="notification">
                         <h4 className="contentTitle">Inbox </h4>
                               <span className="badge">{countNotification}</span>
                               
                           </Link>
                       : ""
                     }
                     {
                         name === "Tax Professional" ?
                         <Link to={`/taxprofessional/message`} className="notification">
                         <h4 className="contentTitle">Inbox </h4>
                               <span className="badge">{countNotification}</span>
                               
                           </Link>
                       : ""
                     }
                         {
                             name === "customer" ?
                             <Link to={`/${name}/message`} className="notification">
                              <h4 className="contentTitle">Inbox </h4>
                                    <span className="badge">{countNotification}</span>
                                    
                                </Link> :""
                         }
                         {
                             name === "admin" && role === "admin" ?
                             <Link to={`/${name}/message`} className="notification">
                              <h4 className="contentTitle">Inbox </h4>
                                    <span className="badge">{countNotification}</span>
                                    
                                </Link> : ""
                         }
                           
                     </>
                           
                            
                         
                           
                                
                        
                    ) : null}
                </li>
            </div>
        </>
    );
}


export default CustomerNotification;
