import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { baseUrl } from "../../config/config";
import axios from "axios";

function PaymentModal({
  addPaymentModal,
  readTerms,
  id
}) {
  const [url, setUrl] = useState("")
  const token = window.localStorage.getItem("clientToken")
  const myConfig = {
    headers : {
     "uit" : token
    },
    responseType: 'blob'
  }
useEffect(() => {
  axios.get(`${baseUrl}/customers/dounloadpdf?id=${id}&viewpdf=1` , myConfig)
  .then((res) => {
    console.log("res", res)
    if(res.status === 200){
     
      setUrl(URL.createObjectURL(res.data))
    }
  })
}, [])

  return (
    <div>
      <Modal isOpen={addPaymentModal} toggle={readTerms} size="lg" scrollable={true} style={{ height: "100%" }} >
        <ModalHeader toggle={readTerms}>Engagement Letter</ModalHeader>
        <ModalBody>
          <iframe src={url}
            height="100%" width="100%" />
        </ModalBody>
        <ModalFooter>
          <button className="customBtn" onClick={readTerms}>Close</button>
        </ModalFooter>

      </Modal>
    </div>
  );
}

export default PaymentModal;
