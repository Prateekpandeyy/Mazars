import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Alerts from "../../common/Alerts";
import CommonServices from "../../common/common";



function PaymentModal({
  addPaymentModal,
  paymentHandler,
  pay,
  getProposalData,
}) {
  const { handleSubmit, register } = useForm();
 

  const { id,  accepted_amount, paid_amount,
    payment_terms,  installment_amount,
    due_date
  } = pay;



  const onSubmit = (value) => {
 

    let formData = new FormData();
    formData.append("id", id);
    formData.append("status", 8);
    formData.append("amount", value.p_amount);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/PaymentPartialAccept`,
      data: formData,
    })
      .then(function (response) {
     
        if (response.data.code === 1) {

          var variable = "Payment Done Successfully "
          Alerts.SuccessNormal(variable)

          getProposalData();
          paymentHandler();
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


  return (
    <div>
      <Modal isOpen={addPaymentModal} toggle={paymentHandler} size="md">
        <ModalHeader toggle={paymentHandler}>Payment</ModalHeader>
        <ModalBody>
          <table class="table table-bordered">
            <tr>
              <th>Accepted Amount</th>
              <td>{accepted_amount}</td>
            </tr>
            <tr>
              <th>Paid Amount</th>
              <td>{paid_amount}</td>
            </tr>
            <tr>
              <th scope="row">Payment Terms</th>
              {
                payment_terms === "lumpsum" ?
                  <td>
                    <tr>

                      <th>Due Dates</th>
                    </tr>
                    <tr>
                      <td>
                        {CommonServices.removeTime(due_date)}
                      </td>
                    </tr>
                  </td>
                  :
                  payment_terms === "installment" ?
                    <td>
                      <tr>
                        <th>Installment Amount</th>
                        <th>Due Dates</th>
                      </tr>
                      <tr>
                        <td>{installAmount(installment_amount)}</td>
                        <td>{installAmount(due_date)}</td>
                      </tr>
                    </td>
                    :
                    ""
              }
            </tr>

          </table>
          <form onSubmit={handleSubmit(onSubmit)}>
            {+accepted_amount === +paid_amount ? null : (
              <div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="p_amount"
                    ref={register}
                    className="form-control"
                    defaultValue={accepted_amount - paid_amount}
                    placeholder="enter amount"
                  />
                </div>
                <div class="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Pay
                  </button>
                </div>
              </div>
            )}
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PaymentModal;

