import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import { baseUrl } from "../../config/config";
import { Typography } from '@mui/material';
const ShowProposal = ({setViewProposal, viewProposalModal, showProposalModal2 , proposalId}) => {
  
    return(
       
        <>
       
          <Modal isOpen={viewProposalModal} toggle={showProposalModal2}
           size="lg" scrollable={true} className="proposalModal">
            <ModalHeader toggle={showProposalModal2}>
<Typography variant="h6">
View Proposal
</Typography>
            </ModalHeader>
            <ModalBody>
          <iframe src={`${baseUrl}/customers/dounloadpdf?id=${proposalId}&viewpdf=1`}
            height="100%" width="100%" />
        </ModalBody>
           
        </Modal>
       
       
        </>
    )
}
export default ShowProposal;