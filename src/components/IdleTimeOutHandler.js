import React, { useEffect, useState} from 'react';
import moment from 'moment'
import { IdleTimeOutModal } from './IdleTimeOutModal'
import { useHistory } from 'react-router';
import axios from 'axios';
import { baseUrl } from '../config/config';
const IdleTimeOutHandler = (props)=>{
    const[showModal,setShowModal]=useState(false)
    const[isLogout,setLogout]=useState(false)
    let history = useHistory()
    let timer=undefined;
    const events= ['click','load','keydown']
    const role = localStorage.getItem("role")
    const eventHandler =(eventType)=>{
        
        
        if(!isLogout){
            localStorage.setItem('lastInteractionTime',moment() )
            if(timer){
                props.onActive();
                startTimer();
            }
        }
        
    };
    
    useEffect(()=>{
        addEvents();
        
        return (()=>{
            
            removeEvents();
            clearTimeout(timer);
        })
    },[])
    
    const startTimer=()=>{
        
        if(timer){
            clearTimeout(timer)
        }
        timer=setTimeout(()=>{
            
            let lastInteractionTime=localStorage.getItem('lastInteractionTime')
            const diff = moment.duration(moment().diff(moment(lastInteractionTime)));
            let timeOutInterval=props.timeOutInterval?props.timeOutInterval:600000;
            var timeStampInMs = Date.now()
            localStorage.setItem("loginTime", timeStampInMs)
            // var ms = timeStampInMs;
            // var d = new Date(1000*Math.round(ms/1000)); // round to nearest second
            // function pad(i) { return ('0'+i).slice(-2); }
            // var str = d.getUTCHours() + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
            // console.log(str); // 0:04:59
            if(isLogout){
                clearTimeout(timer)
            }else{
                if(diff._milliseconds<timeOutInterval){
                    startTimer();
                    props.onActive();
                }else{
                    props.onIdle();
                    setShowModal(true)
                }
            }
            
        },props.timeOutInterval?props.timeOutInterval:6000)
        
        
        
        
        
    }
    const addEvents=()=>{
        
        events.forEach(eventName=>{
            window.addEventListener(eventName,eventHandler)
        })
        
        startTimer();
    }
    
    const removeEvents=()=>{
        events.forEach(eventName=>{
            window.removeEventListener(eventName,eventHandler)
        })
    };
    
    const handleContinueSession = ()=>{
        setShowModal(false)
        setLogout(false)
    }
    const handleLogout2 = ()=>{
        removeEvents();
        clearTimeout(timer);
        setLogout(true)
        props.onLogout();
        setShowModal(false)
        if(props.custDashboard){
            axios.get(`${baseUrl}/customers/logout`)
            .then((res) => {
                if(res.data.code === 1){
                  setShowModal(false)
                  localStorage.removeItem("userid");
                  localStorage.removeItem("custEmail");
                  localStorage.removeItem("category");
                  localStorage.removeItem("clientToken")
                  history.push("/");
                }
            })
        
        }
        else if (props.adminUserId){
         axios.get(`${baseUrl}/admin/logout`)
         .then((res) => {
             if(res.data.code === 1){
              localStorage.removeItem("adminkey");
              localStorage.removeItem("adminEmail");
              localStorage.removeItem("category");
              localStorage.removeItem("adminToken")
              setShowModal(false)
              history.push("/admin/login");
             }
         })
        }
        else if(props.TLuserId){
         axios.get(`${baseUrl}/tl/logout`)
         .then((res) => {
             if(res.data.code === 1){
              localStorage.removeItem("tlkey");
              localStorage.removeItem("tlEmail");
              localStorage.removeItem("category");
              localStorage.removeItem("tlToken")
              setShowModal(false)
              history.push("/teamleader/login");
             }
         })
        }
        else if(props.TPuserId){
        axios.get(`${baseUrl}/tp/logout`)
        .then((res) => {
            if(res.data.code === 1){
              localStorage.removeItem("tpkey");
              localStorage.removeItem("tpEmail");
              localStorage.removeItem("category");
              localStorage.removeItem("tptoken");
              setShowModal(false);
              history.push("/taxprofessional/login");
            }
        })
        }
    }
    const handleLogout = ()=>{
        if(showModal === true){
            removeEvents();
        clearTimeout(timer);
        setLogout(true)
        props.onLogout();
        setShowModal(false)
        if(props.custDashboard){
            const token = window.localStorage.getItem("clientToken")
            const myConfig = {
                headers : {
                 "uit" : token
                }
              }
            axios.get(`${baseUrl}/customers/logout`, myConfig)
            .then((res) => {
                if(res.data.code === 1){
                  setShowModal(false)
                  localStorage.removeItem("userid");
                  localStorage.removeItem("custEmail");
                  localStorage.removeItem("category");
                  localStorage.removeItem("clientToken")
                  history.push("/");
                }
            })
        
        }
        else if (props.adminUserId){
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
              setShowModal(false)
              history.push("/admin/login");
             }
         })
        }
        else if(props.TLuserId){
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
              setShowModal(false)
              history.push("/teamleader/login");
             }
         })
        }
        else if(props.TPuserId){
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
              setShowModal(false);
              history.push("/taxprofessional/login");
            }
        })
        }
        }
    }
    
    
    return(
        <div>
        
    {
        showModal === true ?
        <IdleTimeOutModal 
        showModal={showModal} 
        handleContinue={handleContinueSession}
        handleLogout={handleLogout}
        handleLogout2 = {handleLogout2}
        setShowModal={setShowModal}
        /> : ""
    }
        
        </div>
        )
        
    }
    
    export default IdleTimeOutHandler;