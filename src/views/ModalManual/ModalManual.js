import React from 'react';
import Layout from "../../components/Layout/Layout";
import Query from './Query';
import QueryProcessing  from './QueryProcessing';
import Proposal from './Proposal';
import Assignment from './Assignment';
import Payment from './Payment';
import Scheduler from './Scheduler';
import Feedback from './Feedback';
import Content from './Content';
import Login from './Login'
const ModalManual = ()  => {
    const userId = window.localStorage.getItem("userid");
  
    return(
        <Layout custDashboard="custDashboard" custUserId={userId}>
          
    
        
      <>
    
 <div style={{display: "flex", flexDirection : "column", maxWidth : "1920px",  width:"100%" , height: "600px", overflow: "scroll"}}>
 <Content />
 <Login />
<Query />
 <QueryProcessing />
 <Proposal />
 <Assignment />
 <Payment />
<Scheduler />
 <Feedback />

 </div>
                           

                       </>
            
        </Layout>
    )

}
export default ModalManual;