import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";

import { useHistory } from "react-router-dom";

import CommonServices from "../../common/common";
import Loader from "../../components/Loader/Loader";


function PaymentModal({
  addPaymentModal,
  paymentHandler,
  pay,
  getPaymentStatus,
  pay3
}) {
  const { handleSubmit, register } = useForm();

  const history = useHistory();

  const { assign_id, amount, accepted_amount, paid_amount,
    payment_terms, no_of_installment, installment_amount,
    due_date, amount_type, amount_fixed, amount_hourly
  } = pay;

  const [loading, setLoading] = useState(false);


  const onSubmit = (value) => {
  
    setLoading(true)
    let formData = new FormData();
    formData.append("id", assign_id);
    formData.append("status", 8);
    formData.append("amount", value.p_amount);

  
    axios.get(`${baseUrl}/admin/getPaymentDetail?id=${assign_id}`)
      .then(function (response) {
      
        if (response.data.code === 1) {
         
          window.location.href= (`${response.data.payment_detail[0].paymenturl}`)
         
        } else if (response.data.code === 0) {
          setLoading(false)
        }
      })
      .catch((error) => {
     
      });
  };

  const installAmount = (data) => {
    var item = data.split(',')

    const dataItem = item.map((p, i) =>
    (
      <>
        <p>{CommonServices.removeTime(p)}</p>
      </>
    ))
    return dataItem;
  }
if(addPaymentModal === true){
  var kk = pay.installment_amount.split(",")
}

  return (
    <div>
      <Modal isOpen={addPaymentModal}  toggle={paymentHandler} size="md">
        <ModalHeader toggle={paymentHandler}>Payment</ModalHeader>
        {
          loading ?
            <Loader />
            :
            <>
              <ModalBody>
                <table class="table table-bordered">
                  <tr>
                    <th>Paid Amount</th>
                    <th>Due Date</th>
                    <th>Pay</th>
                  </tr>
                  {kk?.map((i, e) => (
                    <tr>
                    <td>{i ===  "0" ? pay.amount : i }</td>
                    <td> {CommonServices.removeTime(due_date)}</td>
                    <td><form onSubmit={handleSubmit(onSubmit)}>
                  {+accepted_amount ===  +paid_amount ? <p>paid</p> : (
                   <button type="submit" className="btn btn-primary">
                      Pay
                   </button>
                    
                
                  )}
                </form></td>
                  </tr>
                 ))}
                 
                
                </table>
                
              </ModalBody>
            </>
        }
      </Modal>
    </div>
  );
}

export default PaymentModal;
