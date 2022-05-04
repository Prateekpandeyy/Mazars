// import React from 'react';
// import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
// import { baseUrl } from "../../config/config";
// import { Typography } from '@mui/material';
// const ShowProposal = ({setViewProposal, viewProposalModal, showProposalModal2 , proposalId}) => {
  
//     return(
       
//         <>
       
//           <Modal isOpen={viewProposalModal} toggle={showProposalModal2} size="lg" scrollable={true} style={{ height: "100%" }} >
//             <ModalHeader toggle={showProposalModal2}>
// <Typography variant="h6">
// View Proposal
// </Typography>
//             </ModalHeader>
//             <ModalBody>
//           <iframe src={`${baseUrl}/customers/dounloadpdf?id=${proposalId}&viewpdf=1`}
//             height="100%" width="100%" />
//         </ModalBody>
           
//         </Modal>
       
       
//         </>
//     )
// }
// export default ShowProposal;
import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { baseUrl } from "../../config/config";
import axios from "axios";
import { Typography } from '@mui/material';
function ShowProposal({setViewProposal, panel, viewProposalModal, showProposalModal2 , proposalId}) {
  const [url, setUrl] = useState("")
  const token = window.localStorage.getItem("clientToken")
  const myConfig = {
    headers : {
     "uit" : token
    },
    responseType: 'blob'
  }
useEffect(() => {
 
  axios.get(`${baseUrl}/customers/dounloadpdf?id=${proposalId}&viewpdf=1` , myConfig)
  .then((res) => {
   
    if(res.status === 200){
     
      setUrl(URL.createObjectURL(res.data))
    }
  })
}, [proposalId])

  return (
    
      <Modal isOpen={viewProposalModal} toggle={showProposalModal2} size="lg" scrollable={true} style={{ height: "100%" }}>
      <ModalHeader toggle={showProposalModal2}>
 <Typography variant="h6">
 View Proposal
 </Typography>
             </ModalHeader>
        <ModalBody>
          <iframe src={url}
            height="100%" width="100%" />
        </ModalBody>
        

      </Modal>
   
  );
}

export default ShowProposal;
