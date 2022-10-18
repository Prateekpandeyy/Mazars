import React, {useEffect, useState} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import PageNotFound from './components/PageNotFound/PageNotFound'
import { useHistory } from "react-router";


//user routes
import ModalMaual from './views/ModalManual/ModalManual';
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
import PaymentGateway from "./views/PaymentGateway.js/PaymentGateway";
import ThankYou from "./views/ThankYou/Thankyou";
import payDetails from "./views/PaymentStatus/PayDetails";
import Contact from "./views/Contact/Contact";
import About from './views/About/About';
import Media from './views/Tax/Media';
import FaqQuestion from "./views/Tax/FaqQuestion";
import LinklistUser from "./views/Login/Linklist";
import OuterMeetingJoin from "./views/outerMeeting/index";
import Profile from './views/Profile/Profile';

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
import Customer from "./pages/Admin/customer/Customer";
import adminReport from "./pages/Admin/Report/Report";
import AdminInvoice from "./pages/Admin/Invoice/Invoice";
import AdpayDetails from "./pages/Admin/PaymentStatusTab/Paydetails";
import ReportList from "./pages/Admin/Report/ReportList"
import Consalation from './pages/Admin/Report/Consalation';
import Cms from  './pages/Admin/CMS/CMS';
import AdminUpdates from './pages/Admin/CMS/Updates';
import UpdatesContent from "./pages/Admin/CMS/UpdatesContent";
import Linklist from "./pages/Admin/CMS/Linklist";
import FaqList from "./pages/Admin/CMS/FaqList";
import CmsLogin from './pages/Admin/cmslogin/Login';
import GroupImage from "./pages/Admin/CMS/GroupImage";
import UploadLink from "./pages/Admin/CMS/UploadLink";
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
import TlReport from "./pages/TL/Report/Report";
import TlInvoice from "./pages/TL/Proposal/Invoice"
import TlInvoiceTab from "./pages/TL/Proposal/InvoiceTab";
import TlpayDetails from "./pages/TL/PaymentStatus/Paydetails";
import Custompay from "./pages/TL/Custompay/Custompay";
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
import TpViewNotification from './pages/TP/ViewNotification/ViewNotification'
import TpRecording from './pages/TP/Recording/Recording'
import TpReport from "./pages/TP/Report/Report";
import TpInvoice from "./pages/TP/Invoice/Invoice.js";
import TppayDetails from "./pages/TP/PaymentStatus/Paydetails";
//private routes
import PrivateRouteUser from './Service/PrivateRouteUser'
import PrivateRouteAdmin from './Service/PrivateRouteAdmin'
import PrivateRouteTL from './Service/PrivateRouteTL'
import PrivateRouteTP from './Service/PrivateRouteTP'
import PublicRouteUser from './Service/PublicRouteUser'
import PublicRouteAdmin from './Service/PublicRouteAdmin'
import PublicRouteTL from './Service/PublicRouteTL'
import PublicRouteTP from './Service/PublicRouteTP'
import PrivateRouteCms from "./Service/PrivateRouteCms";
import AboutOuter from "./views/About/AboutOuter";
import ContactOuter from "./views/Contact/ContactOuter";
import QueryContact from "./views/QueryContact/QueryContact";
import Updates from "./views/Login/Updates";
import FlashMessage from "./pages/Admin/CMS/FlashMessage";
import CmsContent from "./pages/Admin/CMS/CmsContent";
import Direct from "./views/Tax/Direct";
import Indirect from "./views/Tax/Indirect";
import Details from "./views/Tax/Details";
import LatestUpdates from "./views/Tax/LatestUpdats";
import Links from "./pages/Admin/CMS/Links";
import Faq from "./pages/Admin/CMS/Faq";
import FlashContent from "./pages/Admin/CMS/FlashContent";
import MediaGallery from "./pages/Admin/CMS/MediaGallery";
import MediaContent from "./pages/Admin/CMS/MediaContent";
import MediaTab from "./pages/Admin/CMS/MediaTab";
import VideoContent from "./pages/Admin/CMS/VideoContent";
import Mediatextshow from "./pages/Admin/CMS/Mediatextshow";
import MediaContentCustomer from "./views/Tax/MediaContentCustomer";
import GalleryVideo from "./views/Tax/GalleryVideo";
import VideoList from "./views/Tax/VideoList";
import EditImage from "./pages/Admin/CMS/EditImage";
import EditVideo from "./pages/Admin/CMS/EditVideo";
import Groupvideo from "./pages/Admin/CMS/Groupvideo";
import Videogallery from "./views/Tax/VideoGallary";
import GroupVideo from "./views/Tax/GroupVideo";
import EditFaq from "./pages/Admin/CMS/EditFaq";
import VideoMedia from "./pages/Admin/CMS/VideoMedia";
import MediaText from "./pages/Admin/CMS/MediaText";
import AddCmsContent from "./pages/Admin/CMS/AddCmsContent";
import Editupdates from "./pages/Admin/CMS/Editupdates";
import UpdateDirect from "./views/Tax/UpdateDirect";
import UpdateIndirect from "./views/Tax/UpdateIndirect";
import UpdateMiscellenous from "./views/Tax/UpdateMiscellenous";
import UpdateDetails from "./views/Tax/UpdateDetails";
import OuterLinkVideo from "./views/outerLinkVideo.js/OuterLinkVideo";
import EditProfile from "./views/EditProfile/EditProfile";
import Drag from "./components/Drag";
import UploadLinkContent from "./pages/Admin/CMS/UploadLInkContent";
import CommingSoon from "./views/ComingSoon/CommingSoon";
import PublicCms from "./Service/PublicCms";

// import PayDetails from "./views/PaymentStatus/PayDetails";


const options = {
  timeout: 4000,
  position: positions.TOP_CENTER,
  offset: "80px",
  transition: transitions.SCALE,
};

function WebRoutes() {

  return (
   <>
  
    
<BrowserRouter>

          <Switch>

            <PublicRouteUser exact path="/customer/coming-soon" component={CommingSoon} />
            <PublicRouteUser exact path="/" component={Login} />
            <PublicRouteUser exact path="/customer/signup" component={SignUp} />
            <PublicRouteUser exact path="/customer/outerLinks" component={LinklistUser} />
            <PublicRouteUser exact path="/customer/forget-password" component={ForgetPassword} />
            <PublicRouteUser exact path="/customer/new-password/:id" component={NewPassword} />
             <PublicRouteUser exact path = "/customer/aboutbasic" component={AboutOuter} />
             <PublicRouteUser exact path = "/customer/direct" component={Direct} />
             <PublicRouteUser exact path = "/customer/indirect" component={Indirect} />
             <PublicRouteUser exact path = "/customer/mediacontent" component={MediaContentCustomer} />
             <PublicRouteUser exact path = "/customer/media" component = {Media} />
             <PublicRouteUser exact path = "/customer/imagegallery" component = {GalleryVideo} />
             <PublicRouteUser exact path = "/customer/videolist" component = {VideoList} />
             <PublicRouteUser exact path = "/customer/videogallery" component = {Videogallery} />
         <PublicRouteUser exact path = "/customer/details" component={Details} />
         <PublicRouteUser exact path = "/customer/groupvideo" component = {GroupVideo} />
     <PublicRouteUser exact path = "/customer/customerquery" component={QueryContact} />
     <PublicRouteUser exact path = "/customer/latestupdates/:id" component={LatestUpdates} />
     <PublicRouteUser exact path = "/customer/updates" component={Updates} />
        <PublicRouteUser exact path = "/customer/contactbasic" component = {ContactOuter} />
       <PublicRouteUser exact path = "/customer/faq-question" component={FaqQuestion} />
       <PublicRouteUser exact path = "/customer/updatedirect" component={UpdateDirect} />
       <PublicRouteUser exact path = "/customer/drag" component = {Drag} />
       <PublicRouteUser exact path = "/customer/updateindirect" component={UpdateIndirect} />
       <PublicRouteUser exact path="/customer/meetingouter/:id" component={OuterMeetingJoin} />
       <PublicRouteUser exact path = "/customer/miscellaneous" component={UpdateMiscellenous} />
          <PublicRouteUser exact path = "/customer/videocall" component = {OuterLinkVideo} />
           <PublicRouteUser exact path ="/customer/update-details/:id" component={UpdateDetails} />
           <PublicRouteAdmin exact path = "/customer/questinlinklist" component = {LinklistUser} />
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
            <PrivateRouteUser exact path="/customer/meeting/:id" component={MeetingComponent} />
            <PrivateRouteUser exact path="/customer/schedule" component={schedule} />
            <PrivateRouteUser exact path="/customer/view-notification/:id" component={ViewNotification} />
            <PrivateRouteUser exact path="/customer/proposal_view/:id" component={ProposalView} />
            <PrivateRouteUser exact path="/customer/message" component={Message} />
            <PrivateRouteUser exact path="/customer/chatting/:id" component={Chatting} />
            <PrivateRouteUser exact path="/customer/feedback/:id" component={Feedback} />
            <PrivateRouteUser exact path="/customer/feedback-data" component={FeedbackData} />
            <PrivateRouteUser exact path="/customer/paymentstatus" component={PaymentStatus} />
            <PrivateRouteUser exact path="/customer/payment" component={PaymentGateway} />
            <PrivateRouteUser exact path="/customer/thankyou" component={ThankYou} />  
            <PrivateRouteUser exact path="/customer/paydetails/:id" component={payDetails} />
             <PrivateRouteUser exact path = "/customer/modalmanual" component = {ModalMaual} />
             <PrivateRouteUser exact path = "/customer/contact" component = {Contact} />
             <PrivateRouteUser exact path = "/customer/mediacontent" component = {Contact} />
            <PrivateRouteUser exact path = "/customer/about" component = {About} />
            <PrivateRouteUser exact path = "/customer/profile" component = {Profile} />
            
           <PrivateRouteUser exact path = "/customer/editprofile" component = {EditProfile} />
            
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
            <PrivateRouteAdmin exact path="/admin/meeting/:id" component={adMeetingComponent} />
            <PrivateRouteAdmin exact path="/admin/customers" component={Customer} />
            <PrivateRouteAdmin exact path="/admin/reports" component={adminReport} />
            <PrivateRouteAdmin exact path= "/admin/adinvoice" component={AdminInvoice}/>
            <PrivateRouteAdmin exact path="/admin/paydetails/:id" component={AdpayDetails} />
            <PrivateRouteAdmin exact path = "/admin/reportlist" component = {ReportList} />
            <PrivateRouteAdmin exact path = "/admin/consalation" component = {Consalation} />
          
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
            <PrivateRouteTL exact path="/teamleader/reports" component={TlReport}/>
            <PrivateRouteTL exact path="/teamleader/invoice" component={TlInvoice}/>
            <PrivateRouteTL exact path="/teamleader/tlinvoice" component={TlInvoiceTab}/>
            <PrivateRouteTL exact path="/teamleader/paydetails/:id" component={TlpayDetails} />
             <PrivateRouteTL exact path = "/teamleader/custompay" component={Custompay} />
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
            <PrivateRouteTP exact path="/taxprofessional/view-notification/:id" component={TpViewNotification} />
            <PrivateRouteTP exact path="/taxprofessional/recording" component={TpRecording} />
            <PrivateRouteTP exact path="/taxprofessional/reports" component={TpReport}/>
            <PrivateRouteTP exact path="/taxprofessional/tpinvoice" component={TpInvoice}/>
            <PrivateRouteTP exact path="/taxprofessional/paydetails/:id" component={TppayDetails} />
           
           
            <PublicCms exact path = "/cms/login" component = {CmsLogin} />
            <PrivateRouteCms exact path="/cms/cms" component={Cms} />
            <PrivateRouteCms exact path = "/cms/flash" component = {FlashMessage} />
            <PrivateRouteCms exact path = "/cms/articles" component = {CmsContent} />
            <PrivateRouteCms exact path = "/cms/updates" component = {AdminUpdates} />
            <PrivateRouteCms exact path = "/cms/articlesedit/:id" component = {CmsContent} />
            <PrivateRouteCms exact path = "/cms/updatecontent" component = {UpdatesContent} />
            <PrivateRouteCms exact path = "/cms/editupdates/:id" component = {Editupdates} />
            <PrivateRouteCms exact path = "/cms/links" component = {Links} />
            <PrivateRouteCms exact path = "/cms/linksedit/:id" component = {Links} />
            <PrivateRouteCms exact path = "/cms/linklist" component = {Linklist} />
            <PrivateRouteCms exact path = "/cms/faqlist" component = {FaqList} />
            <PrivateRouteCms exact path = "/cms/mediagallery" component = {MediaGallery} />
            <PrivateRouteCms exact path = "/cms/mediacontent" component = {MediaContent} />
            <PrivateRouteCms exact path = "/cms/flashcontent" component = {FlashContent} />
            <PrivateRouteCms exact path = "/cms/flashcontent/:id" component = {FlashContent} />
            <PrivateRouteCms exact path = "/cms/faqedit/:id" component = {Faq} />
            <PrivateRouteCms exact path = "/cms/faq" component = {Faq} />
            <PrivateRouteCms exact path = "/cms/mediatab" component = {MediaTab} />
            <PrivateRouteCms exact path = "/cms/videocontent" component = {VideoContent} />
            <PrivateRouteCms exact path = "/cms/mediatext" component = {Mediatextshow} />
            <PrivateRouteCms exact path = "/cms/mediatext/:id" component = {Mediatextshow} />
            <PrivateRouteCms exact path = "/cms/imagegallery" component = {GroupImage} />
            <PrivateRouteCms exact path = "/cms/videogallery" component = {Groupvideo} />
            <PrivateRouteCms exact path = "/cms/editimage/:id" component = {EditImage} />
            <PrivateRouteCms exact path = "/cms/editvideo/:id" component = {EditVideo} />
             <PrivateRouteCms exact path = "/cms/editfaq/:id" component = {EditFaq} />
             <PrivateRouteCms exact path = "/cms/videolist" component = {VideoMedia} />
             <PrivateRouteCms exact path = "/cms/addarticles" component = {AddCmsContent} />
             <PrivateRouteCms exact path = "/cms/contentlist" component = {MediaText} />
             <PrivateRouteCms exaxt path = "/cms/imagelist" component = {MediaContent} />
             <PrivateRouteCms exaxt path = "/cms/uploadlink" component = {UploadLink} />
             <PrivateRouteCms exaxt path = "/cms/uploadlinkcontent" component = {UploadLinkContent} />
          
            <Route exact path="/*" component={PageNotFound} />

          </Switch>
          </BrowserRouter>
     
  
   </>
  );
}


export default WebRoutes;



// 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






