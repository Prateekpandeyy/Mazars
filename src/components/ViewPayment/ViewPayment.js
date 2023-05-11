import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { baseUrl } from "../../config/config";
import axios from "axios";

function ViewPayment({ showPayment, paymentFun, data, panel }) {
  const [url, setUrl] = useState("");

  return (
    <>
      {data && (
        <Modal isOpen={showPayment} toggle={paymentFun} size="xl" scrollable>
          <ModalHeader toggle={paymentFun}>
            Manual credit of payment
          </ModalHeader>
          <ModalBody>
            <div
              className="row"
              id="payDetails"
              style={{
                border: "1px solid #ccc",
                padding: "10px 0px",
                borderRadius: "6px",
                margin: "10px 0px",
              }}
            >
              <div className="col-md-6">
                <table>
                  <tr>
                    <td>Client name</td>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <td>Query no</td>
                    <td>{data.assign_no}</td>
                  </tr>
                  <tr>
                    <td>Payable amount</td>
                    <td>{data.payable_amount}</td>
                  </tr>
                  <tr>
                    <td>Paid in bank account number</td>
                    <td>{data.bank_name}</td>
                  </tr>
                  <tr>
                    <td>Payment receipt date</td>
                    <td>
                      {data.payment_recived_date &&
                        data.payment_recived_date
                          .split("-")
                          .reverse()
                          .join("-")}
                    </td>
                  </tr>

                  <tr>
                    <td>Payment information</td>
                    <td>{data.payment_information}</td>
                  </tr>
                </table>
              </div>
              <div className="col-md-6">
                <table>
                  <tr>
                    <td>Invoice no</td>
                    <td>{data.billno}</td>
                  </tr>
                  <tr>
                    <td>Installment no</td>
                    <td>{data.installment_no}</td>
                  </tr>

                  <tr>
                    <td>Amount credited</td>
                    <td>{data.receive_amount}</td>
                  </tr>
                  <tr>
                    <td>Payment type</td>
                    <td>{data.bpayment_by}</td>
                  </tr>
                  <tr>
                    <td>Credit date</td>
                    <td>
                      {data.created_date &&
                        data.created_date
                          .split(" ")[0]
                          .split("-")
                          .reverse()
                          .join("-")}
                    </td>
                  </tr>

                  {panel === "client" ? (
                    ""
                  ) : (
                    <tr>
                      <td>Other information</td>
                      <td>{data.note}</td>
                    </tr>
                  )}
                </table>
              </div>
            </div>
            <button
              className="customBtn d-flex  my-4"
              onClick={(e) => paymentFun()}
            >
              Close
            </button>
          </ModalBody>
        </Modal>
      )}
    </>
  );
}

export default ViewPayment;
