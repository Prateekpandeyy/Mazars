import React from 'react';
import FeedbackIcon from '@material-ui/icons/Feedback';
import PublishIcon from '@material-ui/icons/Publish';
import PaymentIcon from '@material-ui/icons/Payment';
const ViewDiscussionIcon = () => {
return(
  <i title="View Discussion Message"
  className="fa fa-comments-o discussionMessage"
></i>
)
}
const EyeIcon = () => {
  return(
    <i title="View Proposal"  className="fa fa-eye viewDiscusion"
  />

  )
}
const MessageIcon = () => {
    return(
        <>
         <i title="Message" className="fa fa-comments-o messageIcon"></i>
        </>
    )
   
}
const DiscussProposal = (props) => {
 return(
  <i title={props.titleName} class="fa fa-share discussProposal"></i>
 )
}
const HelpIcon = () => {
  return(
    <i title="Help" class="fa fa-question-circle helpIcon"></i>
    
  )
}
const FeedBackICon = () => {
  return(
    <>
    <i title="Send Feedback" className="feedbackIcon">
    <FeedbackIcon />
    </i>
   
    </>
  )
}
const DeleteIcon = (props) => {
  return(
    <>
     <i className="fa fa-trash deleteIcon" title={props.titleName}></i>
    </>
  )
}
const EditQuery = (props) =>{
  return(
    <i className="fa fa-edit editQuery" title={props.titleName}></i>
  )
}
const UploadDocument = () => {
 return(
   <>
    <i title="Upload Additional Documents" className="uploadIcon">
  <PublishIcon color="secondary" />
  </i>
   </>
 )
}
const Payment = () => {
  return(
    <>
    <i title="Pay Amount" className="payment">
      <PaymentIcon />
    </i>
    </>
  )
}
const PaymentDecline = () => {
  return(
    <>
    <i title="Payment Decline" className="paymentDeclined">
      <PaymentIcon />
    </i>
    </>
  )
}
const DraftReportUploadIcon = () => {
  return(
    <>
       <i title="Upload Additional Documents" className="draftReport">
  <PublishIcon color="secondary" style={{color: "green"}} />
  </i>
    </>
  )
}
const FinalReportUploadIcon = () => {
  return(
    <>
    <i title="Upload Additional Documents" className="finalReport">
  <PublishIcon/>
  </i>
    </>
  )
}
const Accept = (props) => {
  return(
    <i
    class="fa fa-check acceptIcon" title= {props.titleName} 
  ></i>
  )
}
const Reject = (props) => {
  return(<i
    class="fa fa-times rejectIcon" title= {props.titleName}
   
  ></i>)
}
const ActionIcon = (props) => {
  return(
   <i title={props.titleName} class="fa fa-share discussProposal"></i>
  )
 }
export default MessageIcon;
export { EyeIcon , ViewDiscussionIcon, DiscussProposal, HelpIcon, FeedBackICon
, DeleteIcon, EditQuery, UploadDocument, Payment, PaymentDecline, DraftReportUploadIcon, 
FinalReportUploadIcon, Accept, Reject, ActionIcon}