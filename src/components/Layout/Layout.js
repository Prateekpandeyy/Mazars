import Sidebar from "../Admin-Sidebar/Admin-Sidebar";
import Header from "../Admin-Header/Admin-Header";
import Footer from "../Admin-Footer/Admin-Footer";



function Layout(props) {
  // console.log(props)
  const {
    custDashboard, adminDashboard, TLDashboard,
    TPDashboard,
    custUserId, adminUserId, TLuserId, TPuserId } = props
  return (
    <>
      <Header
        custUserId={custUserId}
        adminUserId={adminUserId}
        TLuserId={TLuserId}
        TPuserId={TPuserId}
      />

      <Sidebar
        custDashboard={custDashboard}
        adminDashboard={adminDashboard}
        TLDashboard={TLDashboard}
        TPDashboard={TPDashboard}
      />

      <div class="app-content content" style={{ marginTop: "100px" }}>
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
