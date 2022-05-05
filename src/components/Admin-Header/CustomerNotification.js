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
        var token = ""
        var redir = ""
        if(panel === "taxprofessional"){
            token =  window.localStorage.getItem("tptoken")
            redir = "tl"
        }
        else if (token === "teamleader"){
           token = window.localStorage.getItem("tlToken")
           redir = "tl"
        }
        else if (token === "admin"){
            token = window.localStorage.getItem("admintoken")
            redir = "admin"
        }
        else {
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
