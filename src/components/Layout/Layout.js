import Sidebar from "../Admin-Sidebar/Admin-Sidebar";
import Header from "../Admin-Header/Admin-Header";
import Footer from "../Admin-Footer/Admin-Footer";



function Layout(props) {
  // console.log(props)
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

      <div class="app-content content" style={{ marginTop: "70px" }}>
        <div class="content-wrapper">
          <div class="content-body">
            {props.children}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Layout;
