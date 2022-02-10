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
      <Header
        custUserId={custUserId}
        adminUserId={adminUserId}
        TLuserId={TLuserId}
        TPuserId={TPuserId}
        feedbackNumber = {feedbackNumber}
      />

      <Sidebar
        custDashboard={custDashboard}
        adminDashboard={adminDashboard}
        TLDashboard={TLDashboard}
        TPDashboard={TPDashboard}
        feedbackNumber = {feedbackNumber}
      />

      <div className="app-content content" style={{display: 'block', marginTop: "75px", backgroundColor : "#fff"}}>
        <div className="content-wrapper">
          <div className="content-body">
            {props.children}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Layout;
