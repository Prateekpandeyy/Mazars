import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link } from "react-router-dom";


function CustomerNotification({ tokenKey, name }) {



   
    const [countNotification, setCountNotification] = useState("");
   

    useEffect(() => {
        getNotification();
       
    }, [tokenKey]);
   
    const getNotification = () => {
        axios
            .get(`${baseUrl}/customers/getNotification?id=${JSON.parse(tokenKey)}&type_list=uread`)
            .then((res) => {
              
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
                         <h4 className="contentTitle" style={{display:"flex", margin: "0 0 5px 0"}}>Inbox </h4>
                               <span className="badge">{countNotification}</span>
                               
                           </Link>
                       : ""
                     }
                     {
                         name === "Tax Professional" ?
                         <Link to={`/taxprofessional/message`} className="notification">
                         <h4 className="contentTitle" style={{display:"flex", margin: "0 0 5px 0"}}>Inbox </h4>
                               <span className="badge">{countNotification}</span>
                               
                           </Link>
                       : ""
                     }
                         {
                             name === "customer" ?
                             <Link to={`/${name}/message`} className="notification">
                              <h4 className="contentTitle" style={{display:"flex", margin: "0 0 5px 0"}}>Inbox </h4>
                                    <span className="badge">{countNotification}</span>
                                    
                                </Link> :""
                         }
                         {
                             name === "admin" ?
                             <Link to={`/${name}/message`} className="notification">
                              <h4 className="contentTitle" style={{display:"flex", margin: "0 0 5px 0"}}>Inbox </h4>
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
