import Sidebar from "../Admin-Sidebar/Admin-Sidebar";
import Header from "../Admin-Header/Admin-Header";
import styleLayout from './LayoutWrapper.module.css';



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

      <div className={styleLayout.layoutCssDashboard}>
      <Sidebar
        custDashboard={custDashboard}
        adminDashboard={adminDashboard}
        TLDashboard={TLDashboard}
        TPDashboard={TPDashboard}
        feedbackNumber = {feedbackNumber}
      />

      <div className={`${styleLayout.content_width} app-content content`}>
        <div className={`${styleLayout.content_width} content-wrapper`}>
          <div className={`${styleLayout.content_width} content-body`}>
            {props.children}
          </div>
        </div>
      </div>
      </div>

    </>
  );
}

export default Layout;
