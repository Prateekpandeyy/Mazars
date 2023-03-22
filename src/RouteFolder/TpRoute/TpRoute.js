import React from "react";
import PrivateRouteTP from "../../Service/PrivateRouteTP";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TpStart from "../../pages/TP/Start/Start";
import TpLogin from "../../pages/TP/Login/Login";
import TpQueriesRecevied from "../../pages/TP/QueriesRecevied/QueriesRecevied";
import TpQueriesTab from "../../pages/TP/QueriesTab/QueriesTab";
import TpProposalTab from "../../pages/TP/Proposal/ProposalTab";
import TpSendProposal from "../../pages/TP/SendProposal/SendProposal";
import TpEditProposal from "../../pages/TP/EditProposal/EditProposal";
import TpChangePassword from "../../pages/TP/ChangePassword/ChangePassword";
import TpDashboard from "../../pages/TP/Dashboard/Dashboard";
import TpForgetPassword from "../../pages/TP/ForgetPassword/ForgetPassword";
import TpNewPassword from "../../pages/TP/NewPassword/NewPassword";
import TpPaymentStatus from "../../pages/TP/PaymentStatus/PaymentStatus";
import TpAssignmentTab from "../../pages/TP/AssignmentTab/AssignmentTab";
import TpSchedule from "../../pages/TP/Schedule/Schedule";
import TpMessage from "../../pages/TP/Message/Message";
import TpChatting from "../../pages/TP/Chatting/Chatting";
import TpAddAssingmentStages from "../../pages/TP/AddAssingmentStages/AddAssingmentStages";
import TpFeedbackTab from "../../pages/TP/FeedbackTab/FeedbackTab";
import TpMeetingComponent from "../../pages/TP/MeetingComponent/MeetingComponent";
import TpViewNotification from "../../pages/TP/ViewNotification/ViewNotification";
import TpRecording from "../../pages/TP/Recording/Recording";
import TpReport from "../../pages/TP/Report/Report";
import TpInvoice from "../../pages/TP/Invoice/Invoice.js";
import TppayDetails from "../../pages/TP/PaymentStatus/Paydetails";
import PublicRouteTP from "../../Service/PublicRouteTP";
const TpRoute = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRouteTP path="/taxprofessional/start" component={TpStart} />
        <PublicRouteTP path="/taxprofessional/login" component={TpLogin} />
        <PublicRouteTP
          path="/taxprofessional_new-password/:id"
          component={TpNewPassword}
        />
        <PublicRouteTP
          path="/taxprofessional/forget-password"
          component={TpForgetPassword}
        />

        <PrivateRouteTP
          path="/taxprofessional_queries/:id"
          component={TpQueriesRecevied}
        />
        <PrivateRouteTP
          path="/taxprofessional/queriestab"
          component={TpQueriesTab}
        />
        <PrivateRouteTP
          path="/taxprofessional/proposal"
          component={TpProposalTab}
        />
        <PrivateRouteTP
          path="/taxprofessional_sendproposal/:id"
          component={TpSendProposal}
        />
        <PrivateRouteTP
          path="/taxprofessional_edit-proposal/:id"
          component={TpEditProposal}
        />
        <PrivateRouteTP
          path="/taxprofessional/change-password"
          component={TpChangePassword}
        />
        <PrivateRouteTP
          path="/taxprofessional/dashboard"
          component={TpDashboard}
        />
        <PrivateRouteTP
          path="/taxprofessional_chatting/:id"
          component={TpChatting}
        />
        <PrivateRouteTP
          path="/taxprofessional_addassingment/:id"
          component={TpAddAssingmentStages}
        />
        <PrivateRouteTP
          path="/taxprofessional/paymentstatus"
          component={TpPaymentStatus}
        />
        <PrivateRouteTP
          path="/taxprofessional/assignment"
          component={TpAssignmentTab}
        />
        <PrivateRouteTP
          path="/taxprofessional/schedule"
          component={TpSchedule}
        />
        <PrivateRouteTP path="/taxprofessional/message" component={TpMessage} />
        <PrivateRouteTP
          path="/taxprofessional/feedback"
          component={TpFeedbackTab}
        />
        <PrivateRouteTP
          path="/taxprofessional_meeting/:id"
          component={TpMeetingComponent}
        />
        <PrivateRouteTP
          path="/taxprofessional_view-notification/:id"
          component={TpViewNotification}
        />
        <PrivateRouteTP
          path="/taxprofessional/recording"
          component={TpRecording}
        />
        <PrivateRouteTP path="/taxprofessional/reports" component={TpReport} />
        <PrivateRouteTP
          path="/taxprofessional/tpinvoice"
          component={TpInvoice}
        />
        <PrivateRouteTP
          path="/taxprofessional_paydetails/:id"
          component={TppayDetails}
        />
      </Switch>
    </BrowserRouter>
  );
};
export default TpRoute;
