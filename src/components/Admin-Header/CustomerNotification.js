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
   
    const getNotification = () => {
        var timeStampInMs = Date.now()
       var previousLogin =  localStorage.getItem("loginTime")
       var nextLogin = Number(previousLogin) + Number(600000)
       var adminpreviousLogin =  localStorage.getItem("adminloginTime")
       var adminnextLogin = Number(adminpreviousLogin) + Number(600000)
       if(nextLogin < timeStampInMs){
           localStorage.setItem("loginTime", timeStampInMs)
       }
       else if(adminnextLogin < timeStampInMs){
        localStorage.setItem("adminloginTime", timeStampInMs)
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
        axios
            .get(`${baseUrl}/${redir}/getNotification?id=${JSON.parse(tokenKey)}&type_list=uread`, myConfig)
            .then((res) => {
                console.log("roleAdmin", window.location.hash.search("admin"))
                if(role === "cms" && window.location.hash.search("admin") == 2){
                    console.log("cmsfixed")
                    history.push("/*")
                }
               
           
                if (res.data.code === 1) {
                   
                   if(res.data.result[0] != undefined){
                    setCountNotification(res.data.result[0].total);
                   }
                }
            });
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
