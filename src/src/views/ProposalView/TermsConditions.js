import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { baseUrl } from "../../config/config";


function PaymentModal({
  addPaymentModal,
  readTerms,
  id
}) {

  return (
    <div>
      <Modal isOpen={addPaymentModal} toggle={readTerms} size="lg" scrollable={true} style={{ height: "100%" }} >
        <ModalHeader toggle={readTerms}>Engagement Letter</ModalHeader>
        <ModalBody>
          <iframe src={`${baseUrl}/customers/dounloadpdf?id=${id}&viewpdf=1`}
            height="100%" width="100%" />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={readTerms}>Ok</Button>
        </ModalFooter>

      </Modal>
    </div>
  );
}

export default PaymentModal;
