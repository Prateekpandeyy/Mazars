import React, { useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import PageNotFound from './components/PageNotFound/PageNotFound'



//user routes
import Login from './views/Login/Login'
import SignUp from './views/SignUpForm/SignUp'
import Dashboard from './views/Dashboard/Dashboard'
import MyAssingment from './views/MyAssingment/MyAssingment'
import AddFreshAssingment from './views/AddFressAssignment/AddFreshAssingment'
import SelectCategoryPage from './views/SelectCategoryPage/SelectCategoryPage'
import QueriesTab from './views/QueriesTab/QueriesTab'
import ProposalTab from './views/ProposalTab/ProposalTab'
import AssignmentTab from './views/AssignmentTab/AssignmentTab'
import ProposalReceived from './views/ProposalView/ProposalView'
import ForgetPassword from './views/ForgetPassword/ForgetPassword'
import NewPassword from './views/NewPassword/NewPassword'
import ChangePassword from './views/ChangePassword/ChangePassword'
import EditQuery from './views/EditQuery/EditQuery'
import VideoCall from './views/VideoCall/VideoCall'
import MeetingComponent from './views/MeetingComponent/MeetingComponent'
import schedule from './views/Schedule/schedule'
import ViewNotification from './views/ViewNotification/ViewNotification'
import Chatting from './views/Chatting/Chatting'
import Message from './views/Message/Message'
import ProposalView from './views/ProposalView/ProposalView'
import Feedback from './views/Feedback/Feedback'
import FeedbackData from './views/FeedbackData/FeedbackData'
import PaymentStatus from './views/PaymentStatus/PaymentStatus'




//admin routes
import AdminStart from './pages/Admin/Start/Start'
import AdminLogin from './pages/Admin/Login/Login'
import AdminDashboard from './pages/Admin/Dashboard/Dashboard'
import AdminNewTeamLeader from './pages/Admin/AddNewTeamLeader/AddNewTeamLeader'
import AdminNewTaxProf from './pages/Admin/AddNewTaxProf/AddNewTaxProf'
import AdminProposal from './pages/Admin/Proposal/Proposal'
import AdminQueriesRecevied from './pages/Admin/QueriesRecevied/QueriesRecevied'
import AdminQueryAssingment from './pages/Admin/QueryAssingment/QueryAssingment'
import AdminEditTL from './pages/Admin/EditTL/EditTL'
import AdminEditTP from './pages/Admin/EditTP/EditTP'
import AdminQueriesTab from './pages/Admin/QueriesTab/QueriesTab'
import AdminAssignmentTab from './pages/Admin/AssignmentTab/index'
import AdminPaymentStatusTab from './pages/Admin/PaymentStatusTab/PaymentStatusTab'
import AdminTeamLeaderTab from './pages/Admin/TeamLeaderTab/TeamLeaderTab'
import AdminTaxProfessionalsTab from './pages/Admin/TaxProfessionalsTab/TaxProfessionalsTab'
import AdminFeedbackTab from './pages/Admin/FeedbackTab/FeedbackTab'
import AdminPendingRecevived from './pages/Admin/PendingReceived/PendingRecevived'
import AdminForgetPassword from './pages/Admin/ForgetPassword/ForgetPassword'
import AdminNewPassword from './pages/Admin/NewPassword/NewPassword'
import AdminQueryRejection from './pages/Admin/QueryRejection/QueryRejection'
import AdminSchedule from './pages/Admin/Schedule/Schedule'
import AdminMeetingComponent from './pages/Admin/MeetingComponent/MeetingComponent'
import AdminChatting from './pages/Admin/Chatting/Chatting'
import AdminMessage from './pages/Admin/Message/Message'
import AdminViewNotification from './pages/Admin/ViewNotification/ViewNotification'
import AdminRecording from './pages/Admin/Recording/Recording'
import adMeetingComponent from './pages/Admin/MeetingComponent/MeetingComponent'


//TL routes
import TlStart from './pages/TL/Start/Start'
import TlLogin from './pages/TL/Login/Login'
import TlDashboard from './pages/TL/Dashboard/Dashboard'
import TlAddAssingmentStages from './pages/TL/AddAssingmentStages/AddAssingmentStages'
import TlAddNew from './pages/TL/AddNew/AddNew'
import TlAddTeamProf from './pages/TL/AddTeamProf/AddTeamProf'
import TlProposalTab from './pages/TL/Proposal/ProposalTab'
import TlQueriesRecevied from './pages/TL/QueriesRecevied/QueriesRecevied'
import TlQueryAssingment from './pages/TL/QueryAssingment/QueryAssingment'
import TlEditTP from './pages/TL/EditTP/EditTP'
import TlFeedbackTab from './pages/TL/FeedbackTab/FeedbackTab'
import TlPaymentStatus from './pages/TL/PaymentStatus/PaymentStatus'
import TlAssignmentTab from './pages/TL/AssignmentTab/AssignmentTab'
import TlSendProposal from './pages/TL/SendProposal/SendProposal'
import TlQueriesTab from './pages/TL/QueriesTab/QueriesTab'
import TlEditProposal from './pages/TL/EditProposal/EditProposal'
import TlPendingReceived from './pages/TL//PendingReceived/PendingReceived'
import TlAssignmentForm from './pages/TL/AssignmentForm/AssignmentForm'
import TlViewReport from './pages/TL/ViewReport/ViewReport'
import TlForgetPassword from './pages/TL/ForgetPassword/ForgetPassword'
import TlNewPassword from './pages/TL/NewPassword/NewPassword'
import TlViewNotification from './pages/TL/ViewNotification/ViewNotification'
import TlChatting from './pages/TL/Chatting/Chatting'
import TlMessage from './pages/TL/Message/Message'
import TlSchedule from './pages/TL/Schedule/Schedule'
import TlMeetingComponent from './pages/TL/MeetingComponent/MeetingComponent'
import TlRecording from './pages/TL/Recording/Recording'


// TP routes
import TpStart from './pages/TP/Start/Start'
import TpLogin from './pages/TP/Login/Login'
import TpQueriesRecevied from './pages/TP/QueriesRecevied/QueriesRecevied'
import TpQueriesTab from './pages/TP/QueriesTab/QueriesTab'
import TpProposalTab from './pages/TP/Proposal/ProposalTab'
import TpSendProposal from './pages/TP/SendProposal/SendProposal'
import TpEditProposal from './pages/TP/EditProposal/EditProposal'
import TpChangePassword from './pages/TP/ChangePassword/ChangePassword'
import TpDashboard from './pages/TP/Dashboard/Dashboard'
import TpForgetPassword from './pages/TP/ForgetPassword/ForgetPassword'
import TpNewPassword from './pages/TP/NewPassword/NewPassword'
import TpPaymentStatus from './pages/TP/PaymentStatus/PaymentStatus'
import TpAssignmentTab from './pages/TP/AssignmentTab/AssignmentTab'
import TpSchedule from './pages/TP/Schedule/Schedule'
import TpMessage from './pages/TP/Message/Message'
import TpChatting from './pages/TP/Chatting/Chatting'
import TpAddAssingmentStages from './pages/TP/AddAssingmentStages/AddAssingmentStages'
import TpFeedbackTab from './pages/TP/FeedbackTab/FeedbackTab'
import TpMeetingComponent from './pages/TP/MeetingComponent/MeetingComponent'
//private routes
import PrivateRouteUser from './Service/PrivateRouteUser'
import PrivateRouteAdmin from './Service/PrivateRouteAdmin'
import PrivateRouteTL from './Service/PrivateRouteTL'
import PrivateRouteTP from './Service/PrivateRouteTP'
import PublicRouteUser from './Service/PublicRouteUser'
import PublicRouteAdmin from './Service/PublicRouteAdmin'
import PublicRouteTL from './Service/PublicRouteTL'
import PublicRouteTP from './Service/PublicRouteTP'


const options = {
  timeout: 4000,
  position: positions.TOP_CENTER,
  offset: "80px",
  transition: transitions.SCALE,
};


function App() {
  return (
    <div>
      <Provider template={AlertTemplate} {...options}>
        <Router>
          <Switch>

            <PublicRouteUser exact path="/" component={Login} />
            <PublicRouteUser exact path="/customer/signup" component={SignUp} />
            <PublicRouteUser exact path="/customer/forget-password" component={ForgetPassword} />
            <PublicRouteUser exact path="/customer/new-password/:id" component={NewPassword} />

        
            <PrivateRouteUser exact path="/customer/select-category" component={SelectCategoryPage} />
            <PrivateRouteUser exact path="/customer/dashboard" component={Dashboard} />
            <PrivateRouteUser exact path="/customer/my-assingment/:id" component={MyAssingment} />
            <PrivateRouteUser exact path="/customer/addfresh" component={AddFreshAssingment} />
            <PrivateRouteUser exact path="/customer/queries" component={QueriesTab} />
            <PrivateRouteUser exact path="/customer/proposal" component={ProposalTab} />
            <PrivateRouteUser exact path="/customer/assignment" component={AssignmentTab} />
            <PrivateRouteUser exact path="/customer/proposal-received/:id" component={ProposalReceived} />
            <PrivateRouteUser exact path="/customer/change-password" component={ChangePassword} />
            <PrivateRouteUser exact path="/customer/edit-query/:id" component={EditQuery} />
            <PrivateRouteUser exact path="/customer/video-call" component={VideoCall} />
            <PrivateRouteUser exact path="/customer/meeting" component={MeetingComponent} />
            <PrivateRouteUser exact path="/customer/schedule" component={schedule} />
            <PrivateRouteUser exact path="/customer/view-notification/:id" component={ViewNotification} />
            <PrivateRouteUser exact path="/customer/proposal_view/:id" component={ProposalView} />
            <PrivateRouteUser exact path="/customer/message" component={Message} />
            <PrivateRouteUser exact path="/customer/chatting/:id" component={Chatting} />
            <PrivateRouteUser exact path="/customer/feedback/:id" component={Feedback} />
            <PrivateRouteUser exact path="/customer/feedback-data" component={FeedbackData} />
            <PrivateRouteUser exact path="/customer/paymentstatus" component={PaymentStatus} />


            <PublicRouteAdmin exact path="/admin/start" component={AdminStart} />
            <PublicRouteAdmin exact path="/admin/login" component={AdminLogin} />
            <PublicRouteAdmin exact path="/admin/forget-password" component={AdminForgetPassword} />
            <PublicRouteAdmin exact path="/admin/new-password/:id" component={AdminNewPassword} />

            <PrivateRouteAdmin exact path="/admin/dashboard" component={AdminDashboard} />
            <PrivateRouteAdmin exact path="/admin/addnewtl" component={AdminNewTeamLeader} />
            <PrivateRouteAdmin exact path="/admin/addnewtp" component={AdminNewTaxProf} />
            <PrivateRouteAdmin exact path="/admin/teamleaders" component={AdminTeamLeaderTab} />
            <PrivateRouteAdmin exact path="/admin/taxprofessionals" component={AdminTaxProfessionalsTab} />
            <PrivateRouteAdmin exact path="/admin/proposal" component={AdminProposal} />
            <PrivateRouteAdmin exact path="/admin/queries/:id" component={AdminQueriesRecevied} />
            <PrivateRouteAdmin exact path="/admin/queryassing/:id" component={AdminQueryAssingment} />
            <PrivateRouteAdmin exact path="/admin/queriestab" component={AdminQueriesTab} />
            <PrivateRouteAdmin exact path="/admin/feedback" component={AdminFeedbackTab} />
            <PrivateRouteAdmin exact path="/admin/paymentstatus" component={AdminPaymentStatusTab} />
            <PrivateRouteAdmin exact path="/admin/assignment" component={AdminAssignmentTab} />
            <PrivateRouteAdmin exact path="/admin/edittl/:id" component={AdminEditTL} />
            <PrivateRouteAdmin exact path="/admin/edittp/:id" component={AdminEditTP} />
            <PrivateRouteAdmin exact path="/admin/pending/:id" component={AdminPendingRecevived} />
            <PrivateRouteAdmin exact path="/admin/query_rejection/:id" component={AdminQueryRejection} />
            <PrivateRouteAdmin exact path="/admin/schedule" component={AdminSchedule} />
            <PrivateRouteAdmin exact path="/admin/meeting" component={AdminMeetingComponent} />
            <PrivateRouteAdmin exact path="/admin/chatting/:id" component={AdminChatting} />
            <PrivateRouteAdmin exact path="/admin/message" component={AdminMessage} />
            <PrivateRouteAdmin exact path="/admin/view-notification/:id" component={AdminViewNotification} />
            <PrivateRouteAdmin exact path="/admin/recording" component={AdminRecording} />
            <PrivateRouteTL exact path="/admin/meeting/:id" component={adMeetingComponent} />

            <PublicRouteTL exact path="/teamleader/start" component={TlStart} />
            <PublicRouteTL exact path="/teamleader/login" component={TlLogin} />
            <PublicRouteTL exact path="/teamleader/forget-password" component={TlForgetPassword} />
            <PublicRouteTL exact path="/teamleader/new-password/:id" component={TlNewPassword} />
          
                  
            <PrivateRouteTL exact path="/teamleader/dashboard" component={TlDashboard} />
            <PrivateRouteTL exact path="/teamleader/addnew" component={TlAddNew} />
            <PrivateRouteTL exact path="/teamleader/addteamprof" component={TlAddTeamProf} />
            <PrivateRouteTL exact path="/teamleader/proposal" component={TlProposalTab} />
            <PrivateRouteTL exact path="/teamleader/addassingment/:id" component={TlAddAssingmentStages} />
            <PrivateRouteTL exact path="/teamleader/queries/:id" component={TlQueriesRecevied} />
            <PrivateRouteTL exact path="/teamleader/queryassing/:id" component={TlQueryAssingment} />
            <PrivateRouteTL exact path="/teamleader/edittp/:id" component={TlEditTP} />
            <PrivateRouteTL exact path="/teamleader/feedback" component={TlFeedbackTab} />
            <PrivateRouteTL exact path="/teamleader/paymentstatus" component={TlPaymentStatus} />
            <PrivateRouteTL exact path="/teamleader/assignment" component={TlAssignmentTab} />
            <PrivateRouteTL exact path="/teamleader/sendproposal/:id" component={TlSendProposal} />
            <PrivateRouteTL exact path="/teamleader/queriestab" component={TlQueriesTab} />
            <PrivateRouteTL exact path="/teamleader/edit-proposal/:id" component={TlEditProposal} />
            <PrivateRouteTL exact path="/teamleader/pending/:id" component={TlPendingReceived} />
            <PrivateRouteTL exact path="/teamleader/assignment-form/:id" component={TlAssignmentForm} />
            <PrivateRouteTL exact path="/teamleader/meeting/:id" component={TlMeetingComponent} />
            <PrivateRouteTL exact path="/teamleader/view-report/:id" component={TlViewReport} />
            <PrivateRouteTL exact path="/teamleader/schedule" component={TlSchedule} />
            <PrivateRouteTL exact path="/teamleader/view-notification/:id" component={TlViewNotification} />
            <PrivateRouteTL exact path="/teamleader/chatting/:id" component={TlChatting} />
            <PrivateRouteTL exact path="/teamleader/message" component={TlMessage} />
            <PrivateRouteTL exact path="/teamleader/recording" component={TlRecording} />


            <PublicRouteTP exact path="/taxprofessional/start" component={TpStart} />
            <PublicRouteTP exact path="/taxprofessional/login" component={TpLogin} />
            <PublicRouteTP exact path="/taxprofessional/new-password/:id" component={TpNewPassword} />
            <PublicRouteTP exact path="/taxprofessional/forget-password" component={TpForgetPassword} />
            
            <PrivateRouteTP exact path="/taxprofessional/queries/:id" component={TpQueriesRecevied} />
            <PrivateRouteTP exact path="/taxprofessional/queriestab" component={TpQueriesTab} />
            <PrivateRouteTP exact path="/taxprofessional/proposal" component={TpProposalTab} />
            <PrivateRouteTP exact path="/taxprofessional/sendproposal/:id" component={TpSendProposal} />
            <PrivateRouteTP exact path="/taxprofessional/edit-proposal/:id" component={TpEditProposal} />
            <PrivateRouteTP exact path="/taxprofessional/change-password" component={TpChangePassword} />
            <PrivateRouteTP exact path="/taxprofessional/dashboard" component={TpDashboard} />
            <PrivateRouteTP exact path ="/taxprofessional/chatting/:id" component = {TpChatting} />
            <PrivateRouteTP exact path="/taxprofessional/addassingment/:id" component={TpAddAssingmentStages} />
            <PrivateRouteTP exact path="/taxprofessional/paymentstatus" component={TpPaymentStatus} />
            <PrivateRouteTP exact path="/taxprofessional/assignment" component={TpAssignmentTab} />
            <PrivateRouteTP exact path="/taxprofessional/schedule" component={TpSchedule} />
            <PrivateRouteTP exact path="/taxprofessional/message" component={TpMessage} />
            <PrivateRouteTP exact path="/taxprofessional/feedback" component={TpFeedbackTab} />
            <PrivateRouteTP exact path="/taxprofessional/meeting/:id" component={TpMeetingComponent} />
            <Route exact path="/*" component={PageNotFound} />

          </Switch>
        </Router>
      </Provider>
    </div>
  );
}


export default App;



// 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






