import React , {useState} from 'react';
import Sidebar from "../Admin-Sidebar/Admin-Sidebar";
import Header from "../Admin-Header/Admin-Header";
import Footer from "../Admin-Footer/Admin-Footer";
import $ from 'jquery';
import IdleTimeOutHandler from "../IdleTimeOutHandler";

function Layout(props) {
  const[isActive,setIsActive]=useState(true)
  const[isLogout,setLogout]=useState(false)
  const {
    custDashboard, adminDashboard, TLDashboard,
    TPDashboard,
    custUserId, adminUserId, TLuserId, TPuserId, feedbackNumber } = props
    var $sortable = $('.sortable');

$sortable.on('click', function(){
  
  var $this = $(this);
  var asc = $this.hasClass('asc');
  var desc = $this.hasClass('desc');
  $sortable.removeClass('asc').removeClass('desc');
  if (desc || (!asc && !desc)) {
    $this.addClass('asc');
  } else {
    $this.addClass('desc');
  }
  
});
  return (
   
    <>
  
  <IdleTimeOutHandler 
    onActive={()=>{setIsActive(true)}} 
    onIdle={()=>{setIsActive(false)}}
    onLogout={()=>{setLogout(true)}}
    custDashboard = {custDashboard}
    adminUserId = {adminDashboard}
    TLuserId = {TLDashboard}
    TPuserId = {TPDashboard}
    />

   
      <Header
        custUserId={custUserId}
        adminUserId={adminUserId}
        TLuserId={TLuserId}
        TPuserId={TPuserId}
        feedbackNumber = {feedbackNumber}
      />

<div style={{display : "flex", flexDirection : "row"}}>
<Sidebar
        custDashboard={custDashboard}
        adminDashboard={adminDashboard}
        TLDashboard={TLDashboard}
        TPDashboard={TPDashboard}
        feedbackNumber = {feedbackNumber}
      />

      <div className="app-content content" style={{display : 'flex', width : "100%"}}>
        
          <div className="content-body" style={{display : 'flex', width : "100%", flexDirection : "column"}}>
            {props.children}
        
        </div>
      </div>

</div>
  
     
      
    </>
  );
}

export default Layout;
