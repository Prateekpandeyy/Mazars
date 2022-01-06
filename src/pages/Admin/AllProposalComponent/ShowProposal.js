import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import { Typography } from '@mui/material';
const ShowProposal = ({setViewProposal, viewProposalModal, showProposalModal2 }) => {
    console.log("done")
    return(
       
        <>
           <Modal isOpen={viewProposalModal} toggle={showProposalModal2}>
            <ModalHeader toggle={showProposalModal2}>
<Typography variant="h6">
    Please provide the reason
</Typography>
            </ModalHeader>
            <ModalBody>
 

            </ModalBody>
           
        </Modal>
       
        </>
    )
}
export default ShowProposal;