import Sidebar from "../Admin-Sidebar/Admin-Sidebar";
import Header from "../Admin-Header/Admin-Header";
import Footer from "../Admin-Footer/Admin-Footer";



function Layout(props) {

  const {
    custDashboard, adminDashboard, TLDashboard,
    TPDashboard,
    custUserId, adminUserId, TLuserId, TPuserId, feedbackNumber } = props
    
  return (
   
    <>
  <div style={{display : "flex", flexDirection : "column"}}>


   
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
        
          <div className="content-body" style={{display : 'flex', width : "100%"}}>
            {props.children}
        
        </div>
      </div>

</div>
  </div>
     
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
