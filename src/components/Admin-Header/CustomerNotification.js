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
            <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
                <li class="dropdown dropdown-notification nav-item">
                    {countNotification ? (
                     
                           
                                <Link to={`/${name}/message`} style={{color : "white"}} class="notification">
                                Inbox
                                    <span class="badge">{countNotification}</span>
                                    
                                </Link>
                           
                         
                           
                                
                        
                    ) : null}
                </li>
            </div>
        </>
    );
}


export default CustomerNotification;
