import React from "react";
import PublicRouteAdmin from "../../Service/PublicRouteAdmin";
import PrivateRouteAdmin from "../../Service/PrivateRouteAdmin";
import AdminStart from "../../pages/Admin/Start/Start";
import AdminLogin from "../../pages/Admin/Login/Login";
import AdminDashboard from "../../pages/Admin/Dashboard/Dashboard";
import AdminNewTeamLeader from "../../pages/Admin/AddNewTeamLeader/AddNewTeamLeader";
import AdminNewTaxProf from "../../pages/Admin/AddNewTaxProf/AddNewTaxProf";
import AdminProposal from "../../pages/Admin/Proposal/Proposal";
import AdminQueriesRecevied from "../../pages/Admin/QueriesRecevied/QueriesRecevied";
import AdminQueryAssingment from "../../pages/Admin/QueryAssingment/QueryAssingment";
import AdminEditTL from "../../pages/Admin/EditTL/EditTL";
import AdminEditTP from "../../pages/Admin/EditTP/EditTP";
import AdminQueriesTab from "../../pages/Admin/QueriesTab/QueriesTab";
import AdminAssignmentTab from "../../pages/Admin/AssignmentTab/index";
import AdminPaymentStatusTab from "../../pages/Admin/PaymentStatusTab/PaymentStatusTab";
import AdminTeamLeaderTab from "../../pages/Admin/TeamLeaderTab/TeamLeaderTab";
import AdminTaxProfessionalsTab from "../../pages/Admin/TaxProfessionalsTab/TaxProfessionalsTab";
import AdminFeedbackTab from "../../pages/Admin/FeedbackTab/FeedbackTab";
import AdminPendingRecevived from "../../pages/Admin/PendingReceived/PendingRecevived";
import AdminForgetPassword from "../../pages/Admin/ForgetPassword/ForgetPassword";
import AdminNewPassword from "../../pages/Admin/NewPassword/NewPassword";
import AdminQueryRejection from "../../pages/Admin/QueryRejection/QueryRejection";
import AdminSchedule from "../../pages/Admin/Schedule/Schedule";
import AdminMeetingComponent from "../../pages/Admin/MeetingComponent/MeetingComponent";
import AdminChatting from "../../pages/Admin/Chatting/Chatting";
import AdminMessage from "../../pages/Admin/Message/Message";
import AdminViewNotification from "../../pages/Admin/ViewNotification/ViewNotification";
import AdminRecording from "../../pages/Admin/Recording/Recording";
import adMeetingComponent from "../../pages/Admin/MeetingComponent/MeetingComponent";
import Customer from "../../pages/Admin/customer/Customer";
import adminReport from "../../pages/Admin/Report/Report";
import AdminInvoice from "../../pages/Admin/Invoice/Invoice";
import EnqiuryReport from "../../pages/Admin/Report/EnquiryReport";
import AdpayDetails from "../../pages/Admin/PaymentStatusTab/Paydetails";
import ReportList from "../../pages/Admin/Report/ReportList";
import Consalation from "../../pages/Admin/Report/Consalation";
import AdminEnquiry from "../../pages/Admin/AdminEnquiry/AdminEnquiry";

import {
  BrowserRouter,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
const AdminRoute = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRouteAdmin path="/admin/start" component={AdminStart} />
        <PublicRouteAdmin path="/admin/login" component={AdminLogin} />
        <PublicRouteAdmin
          path="/admin/forget-password"
          component={AdminForgetPassword}
        />
        <PublicRouteAdmin
          path="/admin_new-password/:id"
          component={AdminNewPassword}
        />
        <PrivateRouteAdmin
          path="/admin/enquiry_reports"
          component={EnqiuryReport}
        />
        <PrivateRouteAdmin path="/admin/dashboard" component={AdminDashboard} />
        <PrivateRouteAdmin
          path="/admin/addnewtl"
          component={AdminNewTeamLeader}
        />
        <PrivateRouteAdmin path="/admin/addnewtp" component={AdminNewTaxProf} />
        <PrivateRouteAdmin
          path="/admin/teamleaders"
          component={AdminTeamLeaderTab}
        />
        <PrivateRouteAdmin
          path="/admin/taxprofessionals"
          component={AdminTaxProfessionalsTab}
        />
        <PrivateRouteAdmin path="/admin/proposal" component={AdminProposal} />
        <PrivateRouteAdmin
          path="/admin_queries/:id"
          component={AdminQueriesRecevied}
        />
        <PrivateRouteAdmin
          path="/admin_queryassing/:id"
          component={AdminQueryAssingment}
        />
        <PrivateRouteAdmin
          path="/admin/queriestab"
          component={AdminQueriesTab}
        />
        <PrivateRouteAdmin
          path="/admin/feedback"
          component={AdminFeedbackTab}
        />
        <PrivateRouteAdmin
          path="/admin/paymentstatus"
          component={AdminPaymentStatusTab}
        />
        <PrivateRouteAdmin
          path="/admin/assignment"
          component={AdminAssignmentTab}
        />
        <PrivateRouteAdmin path="/admin_edittl/:id" component={AdminEditTL} />
        <PrivateRouteAdmin path="/admin_edittp/:id" component={AdminEditTP} />

        <PrivateRouteAdmin
          path="/admin_query_rejection/:id"
          component={AdminQueryRejection}
        />
        <PrivateRouteAdmin path="/admin/schedule" component={AdminSchedule} />
        <PrivateRouteAdmin
          path="/admin/meeting"
          component={AdminMeetingComponent}
        />
        <PrivateRouteAdmin
          path="/admin_chatting/:id"
          component={AdminChatting}
        />
        <PrivateRouteAdmin path="/admin/message" component={AdminMessage} />
        <PrivateRouteAdmin
          path="/admin_view-notification/:id"
          component={AdminViewNotification}
        />
        <PrivateRouteAdmin path="/admin/recording" component={AdminRecording} />
        <PrivateRouteAdmin
          path="/admin_meeting/:id"
          component={adMeetingComponent}
        />
        <PrivateRouteAdmin path="/admin/customers" component={Customer} />
        <PrivateRouteAdmin path="/admin/reports" component={adminReport} />
        <PrivateRouteAdmin path="/admin/adinvoice" component={AdminInvoice} />
        <PrivateRouteAdmin
          path="/admin_paydetails/:id"
          component={AdpayDetails}
        />
        <PrivateRouteAdmin path="/admin/reportlist" component={ReportList} />
        <PrivateRouteAdmin path="/admin/consalation" component={Consalation} />
        <PrivateRouteAdmin
          path="/admin/adminenquiry"
          component={AdminEnquiry}
        />
      </Switch>
    </BrowserRouter>
  );
};
export default AdminRoute;
