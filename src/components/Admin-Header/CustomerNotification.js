import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link, useHistory } from "react-router-dom";
import { components } from "react-select";


function CustomerNotification({ tokenKey, name }) {

    // const userId = window.localStorage.getItem("userid");

    const [notification, setNotification] = useState([]);
    const [countNotification, setCountNotification] = useState("");
   

    useEffect(() => {
        getNotification();
       
    }, [tokenKey]);
   
    const getNotification = () => {
        axios
            .get(`${baseUrl}/customers/getNotification?id=${JSON.parse(tokenKey)}&type_list=uread`)
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {
                    setNotification(res.data.result);
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
                     
                           
                                <a href="#" class="notification">
                                <Link to ={`/${name}/message`} style={{color : "white"}}>Inbox</Link>
                                    <span class="badge">{countNotification}</span>
                                    
                                </a>
                           
                         
                           
                                
                        
                    ) : null}
                </li>
            </div>
        </>
    );
}


export default CustomerNotification;
