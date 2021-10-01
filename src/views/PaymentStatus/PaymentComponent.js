import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import Alerts from "../../common/Alerts";
import CommonServices from "../../common/common";
import Loader from "../../components/Loader/Loader";



function PaymentModal({
  addPaymentModal,
  paymentHandler,
  pay,
  getPaymentStatus,
}) {
  const { handleSubmit, register } = useForm();
  const alert = useAlert();
  const history = useHistory();

  const { assign_id, amount, accepted_amount, paid_amount,
    payment_terms, no_of_installment, installment_amount,
    due_date, amount_type, amount_fixed, amount_hourly
  } = pay;

  const [loading, setLoading] = useState(false);


  const onSubmit = (value) => {
    console.log("value :", value);

    setLoading(true)
    let formData = new FormData();
    formData.append("id", assign_id);
    formData.append("status", 8);
    formData.append("amount", value.p_amount);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/PaymentPartialAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setLoading(false)
          var variable = "Payment made successfully."
          Alerts.SuccessNormal(variable)
          getPaymentStatus();
          paymentHandler();
        } else if (response.data.code === 0) {
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  const installAmount = (data) => {
    var item = data.split(',')
    console.log("item", item);

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
        {
          loading ?
            <Loader />
            :
            <>
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
                      payment_terms == "lumpsum" ?
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
                        payment_terms == "installment" ?
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
                  {+accepted_amount == +paid_amount ? null : (
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
            </>
        }
      </Modal>
    </div>
  );
}

export default PaymentModal;
