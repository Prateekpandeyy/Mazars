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
const EditQuery = () =>{
  return(
    <i className="fa fa-edit editQuery" title="Update Query"></i>
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
export default MessageIcon;
export { EyeIcon , ViewDiscussionIcon, DiscussProposal, HelpIcon, FeedBackICon
, DeleteIcon, EditQuery, UploadDocument, Payment}