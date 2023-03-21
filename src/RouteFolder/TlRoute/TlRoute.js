import React from "react";
import PrivateRouteTL from "../../Service/PrivateRouteTL";
import PublicRouteTL from "../../Service/PublicRouteTL";
import { BrowserRouter, Switch } from "react-router-dom";
import TlStart from "../..//pages/TL/Start/Start";
import TlLogin from "../..//pages/TL/Login/Login";
import TlDashboard from "../..//pages/TL/Dashboard/Dashboard";
import TlAddAssingmentStages from "../..//pages/TL/AddAssingmentStages/AddAssingmentStages";
import TlAddNew from "../..//pages/TL/AddNew/AddNew";
import TlAddTeamProf from "../..//pages/TL/AddTeamProf/AddTeamProf";
import TlProposalTab from "../..//pages/TL/Proposal/ProposalTab";
import TlQueriesRecevied from "../..//pages/TL/QueriesRecevied/QueriesRecevied";
import TlQueryAssingment from "../..//pages/TL/QueryAssingment/QueryAssingment";
import TlFeedbackTab from "../..//pages/TL/FeedbackTab/FeedbackTab";
import TlPaymentStatus from "../..//pages/TL/PaymentStatus/PaymentStatus";
import TlAssignmentTab from "../..//pages/TL/AssignmentTab/AssignmentTab";
import TlSendProposal from "../..//pages/TL/SendProposal/SendProposal";
import TlQueriesTab from "../..//pages/TL/QueriesTab/QueriesTab";
import TlEditProposal from "../..//pages/TL/EditProposal/EditProposal";
import TlForgetPassword from "../..//pages/TL/ForgetPassword/ForgetPassword";
import TlNewPassword from "../..//pages/TL/NewPassword/NewPassword";
import TlViewNotification from "../..//pages/TL/ViewNotification/ViewNotification";
import TlChatting from "../..//pages/TL/Chatting/Chatting";
import TlMessage from "../..//pages/TL/Message/Message";
import TlSchedule from "../..//pages/TL/Schedule/Schedule";
import TlMeetingComponent from "../..//pages/TL/MeetingComponent/MeetingComponent";
import TlRecording from "../..//pages/TL/Recording/Recording";
import TlReport from "../..//pages/TL/Report/Report";
import TlInvoice from "../..//pages/TL/Proposal/Invoice";
import TlInvoiceTab from "../..//pages/TL/Proposal/InvoiceTab";
import TlpayDetails from "../..//pages/TL/PaymentStatus/Paydetails";
import Custompay from "../../pages/TL/Custompay/Custompay";
const TlRoute = () => {
  <BrowserRouter>
    <Switch>
      <PublicRouteTL path="/teamleader/start" component={TlStart} />
      <PublicRouteTL path="/teamleader/login" component={TlLogin} />
      <PublicRouteTL
        path="/teamleader/forget-password"
        component={TlForgetPassword}
      />
      <PublicRouteTL
        path="/teamleader_new-password/:id"
        component={TlNewPassword}
      />

      <PrivateRouteTL path="/teamleader/dashboard" component={TlDashboard} />
      <PrivateRouteTL path="/teamleader/addnew" component={TlAddNew} />
      <PrivateRouteTL
        path="/teamleader/addteamprof"
        component={TlAddTeamProf}
      />
      <PrivateRouteTL path="/teamleader/proposal" component={TlProposalTab} />
      <PrivateRouteTL
        path="/teamleader_addassingment/:id"
        component={TlAddAssingmentStages}
      />
      <PrivateRouteTL
        path="/teamleader_queries/:id"
        component={TlQueriesRecevied}
      />
      <PrivateRouteTL
        path="/teamleader_queryassing/:id"
        component={TlQueryAssingment}
      />

      <PrivateRouteTL path="/teamleader/feedback" component={TlFeedbackTab} />
      <PrivateRouteTL
        path="/teamleader/paymentstatus"
        component={TlPaymentStatus}
      />
      <PrivateRouteTL
        path="/teamleader/assignment"
        component={TlAssignmentTab}
      />
      <PrivateRouteTL
        path="/teamleader_sendproposal/:id"
        component={TlSendProposal}
      />
      <PrivateRouteTL path="/teamleader/queriestab" component={TlQueriesTab} />
      <PrivateRouteTL
        path="/teamleader_edit-proposal/:id"
        component={TlEditProposal}
      />

      <PrivateRouteTL
        path="/teamleader_meeting/:id"
        component={TlMeetingComponent}
      />

      <PrivateRouteTL path="/teamleader/schedule" component={TlSchedule} />
      <PrivateRouteTL
        path="/teamleader_view-notification/:id"
        component={TlViewNotification}
      />
      <PrivateRouteTL path="/teamleader_chatting/:id" component={TlChatting} />
      <PrivateRouteTL path="/teamleader/message" component={TlMessage} />
      <PrivateRouteTL path="/teamleader/recording" component={TlRecording} />
      <PrivateRouteTL path="/teamleader/reports" component={TlReport} />
      <PrivateRouteTL path="/teamleader/invoice" component={TlInvoice} />
      <PrivateRouteTL path="/teamleader/tlinvoice" component={TlInvoiceTab} />
      <PrivateRouteTL
        path="/teamleader_paydetails/:id"
        component={TlpayDetails}
      />
      <PrivateRouteTL path="/teamleader/custompay" component={Custompay} />
    </Switch>
  </BrowserRouter>;
};
export default TlRoute;
