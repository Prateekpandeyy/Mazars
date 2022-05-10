import React, { useEffect, useState} from 'react';
import moment from 'moment'
import { IdleTimeOutModal } from './IdleTimeOutModal'
import { useHistory } from 'react-router';
const IdleTimeOutHandler = (props)=>{
    const[showModal,setShowModal]=useState(false)
    const[isLogout,setLogout]=useState(false)
    let history = useHistory()
    let timer=undefined;
    const events= ['click','load','keydown']
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
    const handleLogout = ()=>{
        
        removeEvents();
        clearTimeout(timer);
        setLogout(true)
        props.onLogout();
        setShowModal(false)
      if(props.custDashboard){
        localStorage.removeItem("userid");
        localStorage.removeItem("custEmail");
        localStorage.removeItem("category");
        localStorage.removeItem("clientToken")
        history.push("/");
      }
      else if (props.adminUserId){
        localStorage.removeItem("adminkey");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("category");
        localStorage.removeItem("adminToken")
        history.push("/admin/login");
      }
      else if(props.TLuserId){
        localStorage.removeItem("tlkey");
        localStorage.removeItem("tlEmail");
        localStorage.removeItem("category");
        localStorage.removeItem("tlToken")
        history.push("/teamleader/login");
      }
      else if(props.TPuserId){
        localStorage.removeItem("tpkey");
        localStorage.removeItem("tpEmail");
        localStorage.removeItem("category");
        localStorage.removeItem("tptoken")
        history.push("/taxprofessional/login");
      }
    }
    console.log("props", props)
    
    return(
        <div>
        
        <IdleTimeOutModal 
        showModal={showModal} 
        handleContinue={handleContinueSession}
        handleLogout={handleLogout}
        />
        
        </div>
        )
        
    }
    
    export default IdleTimeOutHandler;
