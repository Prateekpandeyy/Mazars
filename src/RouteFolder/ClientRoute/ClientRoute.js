import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import ModalMaual from "../../views/ModalManual/ModalManual";
import Login from "../../views/Login/Login";
import SignUp from "../../views/SignUpForm/SignUp";
import Dashboard from "../../views/Dashboard/Dashboard";
import MyAssingment from "../../views/MyAssingment/MyAssingment";
import AddFreshAssingment from "../../views/AddFressAssignment/AddFreshAssingment";
import SelectCategoryPage from "../../views/SelectCategoryPage/SelectCategoryPage";
import QueriesTab from "../../views/QueriesTab/QueriesTab";
import ProposalTab from "../../views/ProposalTab/ProposalTab";
import AssignmentTab from "../../views/AssignmentTab/AssignmentTab";
import ProposalReceived from "../../views/ProposalView/ProposalView";
import ForgetPassword from "../../views/ForgetPassword/ForgetPassword";
import NewPassword from "../../views/NewPassword/NewPassword";
import ChangePassword from "../../views/ChangePassword/ChangePassword";
import EditQuery from "../../views/EditQuery/EditQuery";
import VideoCall from "../../views/VideoCall/VideoCall";
import MeetingComponent from "../../views/MeetingComponent/MeetingComponent";
import schedule from "../../views/Schedule/schedule";
import ViewNotification from "../../views/ViewNotification/ViewNotification";
import Chatting from "../../views/Chatting/Chatting";
import Message from "../../views/Message/Message";
import ProposalView from "../../views/ProposalView/ProposalView";
import Feedback from "../../views/Feedback/Feedback";
import FeedbackData from "../../views/FeedbackData/FeedbackData";
import PaymentStatus from "../../views/PaymentStatus/PaymentStatus";
import PaymentGateway from "../../views/PaymentGateway.js/PaymentGateway";
import payDetails from "../../views/PaymentStatus/PayDetails";
import Contact from "../../views/Contact/Contact";
import About from "../../views/About/About";
import Media from "../../views/Tax/Media";
import FaqQuestion from "../../views/Tax/FaqQuestion";
import LinklistUser from "../../views/Login/Linklist";
import OuterMeetingJoin from "../../views/outerMeeting/index";
import Profile from "../../views/Profile/Profile";
import AboutOuter from "../../views/About/AboutOuter";
import ContactOuter from "../../views/Contact/ContactOuter";
import QueryContact from "../../views/QueryContact/QueryContact";
import Updates from "../../views/Login/Updates";
import FlashMessage from "../../pages/Admin/CMS/FlashMessage";
import CmsContent from "../../pages/Admin/CMS/CmsContent";
import Direct from "../../views/Tax/Direct";
import Indirect from "../../views/Tax/Indirect";
import Details from "../../views/Tax/Details";
import LatestUpdates from "../../views/Tax/LatestUpdats";
import MediaContentCustomer from "../../views/Tax/MediaContentCustomer";
import GalleryVideo from "../../views/Tax/GalleryVideo";
import VideoList from "../../views/Tax/VideoList";
import GroupVideo from "../../views/Tax/GroupVideo";
import UpdateDirect from "../../views/Tax/UpdateDirect";
import UpdateIndirect from "../../views/Tax/UpdateIndirect";
import UpdateMiscellenous from "../../views/Tax/UpdateMiscellenous";
import UpdateDetails from "../../views/Tax/UpdateDetails";
import OuterLinkVideo from "../../views/outerLinkVideo.js/OuterLinkVideo";
import EditProfile from "../../views/EditProfile/EditProfile";
import PublicRouteUser from "../../Service/PublicRouteUser";
import PrivateRouteUser from "../../Service/PrivateRouteUser";
import PageNotFound from "../../components/PageNotFound/PageNotFound";
import Videogallery from "../../views/Tax/VideoGallary";
import GetEmail from "../../views/GetEmail/GetEmail";
const ClientRoute = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRouteUser exact path="/" component={Login} />
        <PublicRouteUser exact path="/:id" component={Login} />
        <PublicRouteUser exact path="/customer/signup" component={SignUp} />
        <PublicRouteUser
          exact
          path="/customer/outerLinks"
          component={LinklistUser}
        />
        <PublicRouteUser
          exact
          path="/customer/forget-password"
          component={ForgetPassword}
        />
        <PublicRouteUser
          exact
          path="/customer_new-password/:id"
          component={NewPassword}
        />
        <PublicRouteUser exact path="/customer/about" component={AboutOuter} />
        <PublicRouteUser exact path="/customer/direct" component={Direct} />
        <PublicRouteUser exact path="/customer/indirect" component={Indirect} />
        <PublicRouteUser
          exact
          path="/customer/mediacontent"
          component={MediaContentCustomer}
        />
        <PublicRouteUser exact path="/customer/media" component={Media} />
        <PublicRouteUser
          exact
          path="/customer/imagegallery"
          component={GalleryVideo}
        />
        <PublicRouteUser path="/customer/videolist" component={VideoList} />
        <PublicRouteUser
          exact
          path="/customer/videogallery"
          component={Videogallery}
        />
        <PublicRouteUser exact path="/customer/details" component={Details} />
        <PublicRouteUser
          exact
          path="/customer/groupvideo"
          component={GroupVideo}
        />
        <PublicRouteUser
          exact
          path="/customer/customerquery"
          component={QueryContact}
        />
        <PublicRouteUser
          exact
          path="/customer_latestupdates/:id"
          component={LatestUpdates}
        />
        <PublicRouteUser exact path="/customer/updates" component={Updates} />
        <PublicRouteUser
          exact
          path="/customer/contact"
          component={ContactOuter}
        />
        <PublicRouteUser
          exact
          path="/customer/faq-question"
          component={FaqQuestion}
        />
        <PublicRouteUser
          exact
          path="/customer/updatedirect"
          component={UpdateDirect}
        />

        <PublicRouteUser
          exact
          path="/customer/updateindirect"
          component={UpdateIndirect}
        />
        <PublicRouteUser
          exact
          path="/customer_meetingouter/:id"
          component={OuterMeetingJoin}
        />

        <PublicRouteUser
          exact
          path="/customer/miscellaneous"
          component={UpdateMiscellenous}
        />
        <PublicRouteUser
          exact
          path="/customer/videocall"
          component={OuterLinkVideo}
        />
        <PublicRouteUser
          exact
          path="/customer_update-details/:id"
          component={UpdateDetails}
        />
        <PublicRouteUser
          exact
          path="/customer/questinlinklist"
          component={LinklistUser}
        />
        <PrivateRouteUser
          exact
          path="/customer/select-category"
          component={SelectCategoryPage}
        />
        <PrivateRouteUser path="/customer/dashboard" component={Dashboard} />
        <PrivateRouteUser
          exact
          path="/customer_my-assingment/:id"
          component={MyAssingment}
        />
        <PrivateRouteUser
          exact
          path="/customer/addfresh"
          component={AddFreshAssingment}
        />
        <PrivateRouteUser
          exact
          path="/customer/queries"
          component={QueriesTab}
        />
        <PrivateRouteUser
          exact
          path="/customer/proposal"
          component={ProposalTab}
        />
        <PrivateRouteUser
          exact
          path="/customer/assignment"
          component={AssignmentTab}
        />
        <PrivateRouteUser
          exact
          path="/customer_proposal-received/:id"
          component={ProposalReceived}
        />
        <PrivateRouteUser
          exact
          path="/customer/change-password"
          component={ChangePassword}
        />
        <PrivateRouteUser
          exact
          path="/customer_edit-query/:id"
          component={EditQuery}
        />
        <PrivateRouteUser
          exact
          path="/customer/video-call"
          component={VideoCall}
        />
        <PrivateRouteUser
          exact
          path="/customer_meeting/:id"
          component={MeetingComponent}
        />
        <PrivateRouteUser path="/customer/schedule" component={schedule} />
        <PrivateRouteUser
          exact
          path="/customer_view-notification/:id"
          component={ViewNotification}
        />
        <PrivateRouteUser
          exact
          path="/customer_proposal_view/:id"
          component={ProposalView}
        />
        <PrivateRouteUser exact path="/customer/message" component={Message} />
        <PrivateRouteUser
          exact
          path="/customer_chatting/:id"
          component={Chatting}
        />
        <PrivateRouteUser
          exact
          path="/customer_feedback/:id"
          component={Feedback}
        />
        <PrivateRouteUser
          exact
          path="/customer/feedback-data"
          component={FeedbackData}
        />
        <PrivateRouteUser
          exact
          path="/customer/paymentstatus"
          component={PaymentStatus}
        />
        <PrivateRouteUser
          exact
          path="/customer/payment"
          component={PaymentGateway}
        />

        <PrivateRouteUser
          exact
          path="/customer_paydetails/:id"
          component={payDetails}
        />
        <PrivateRouteUser
          exact
          path="/customer/modalmanual"
          component={ModalMaual}
        />
        <PrivateRouteUser exact path="/customer/contact" component={Contact} />
        <PrivateRouteUser exact path="/customer/content" component={Contact} />
        <PrivateRouteUser exact path="/customer/about" component={About} />
        <PrivateRouteUser exact path="/customer/profile" component={Profile} />

        <PrivateRouteUser
          exact
          path="/customer/editprofile"
          component={EditProfile}
        />

        <Route path="/*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};
export default ClientRoute;
