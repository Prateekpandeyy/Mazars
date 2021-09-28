import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import TermsConditions from "./TermsConditions";
import CommonServices from "../../common/common";
import Alerts from "../../common/Alerts";
import classNames from "classnames";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";



function ProposalView(props) {
  const { handleSubmit, register } = useForm();

  const [loading, setLoading] = useState(false);

  const userId = window.localStorage.getItem("userid");
  const [queryStatus, setQueryStatus] = useState(null);
  const [custcheckError, setCheckerror] = useState(null);
  const [valueCheckBox, setValueCheckBox] = useState(false);


  const { id } = useParams();
  const history = useHistory();

  const [diaplayProposal, setDisplayProposal] = useState({
    amount: "",
    proposal_date: "",
    name: "",
    description: "",

    amount_type: "",
    amount_fixed: "",
    amount_hourly: "",

    payment_terms: "",
    no_of_installment: "",
    installment_amount: "",
    due_date: "",
  });

  const { amount, proposal_date,
    name, description,
    amount_type, amount_fixed, amount_hourly,
    payment_terms,
    no_of_installment,
    installment_amount,
    due_date,
  } = diaplayProposal


  useEffect(() => {
    getProposalDetails();
  }, []);

  const getProposalDetails = () => {
    axios
      .get(
        `${baseUrl}/customers/getQueryDetails?id=${id}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          console.log(res.data.result[0].query_status);

          if (res.data.result[0].query_status) {
            setQueryStatus(res.data.result[0].query_status);
          }
          if (res.data.proposal_queries.length > 0) {
            setDisplayProposal({
              accepted_amount: res.data.proposal_queries[0].accepted_amount,
              payment_received: res.data.proposal_queries[0].paid_amount,
              amount: res.data.proposal_queries[0].amount,
              proposal_date: res.data.proposal_queries[0].created,
              name: res.data.proposal_queries[0].tlname,
              description: res.data.proposal_queries[0].description,
              amount_type: res.data.proposal_queries[0].amount_type,
              amount_fixed: res.data.proposal_queries[0].amount_fixed,
              amount_hourly: res.data.proposal_queries[0].amount_hourly,

              payment_terms: res.data.proposal_queries[0].payment_terms,
              no_of_installment: res.data.proposal_queries[0].no_of_installment,
              installment_amount: res.data.proposal_queries[0].installment_amount,
              due_date: res.data.proposal_queries[0].due_date,
            });
          }

        }
      });
  };

  const [addPaymentModal, setPaymentModal] = useState(false);
  const readTerms = () => {
    console.log("key");
    setPaymentModal(!addPaymentModal);
  };


  const updateCheckbox = ({ checked }) => {
    setValueCheckBox(checked)
    setPaymentModal(checked);
    setCheckerror("")
  }


  const onSubmit = (value) => {
    console.log("value :", value);

    if (valueCheckBox === false) {
      console.log("catch")
      setCheckerror("Please , You have to select")
    }
    else {
      setLoading(true)
      let formData = new FormData();
      formData.append("id", id);
      formData.append("status", 5);
      formData.append("terms_condition", Number(value.p_terms_condition));

      axios({
        method: "POST",
        url: `${baseUrl}/customers/ProposalAccept`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            setLoading(false)
            var variable = "Proposal accepted successfully."
            Alerts.SuccessNormal(variable)
            history.push({
              pathname: `/customer/proposal`,
              index: 0,
            });
          } if (response.data.code === 0) {
            setLoading(false)
          }

        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }

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


  //rejected
  const rejected = (id) => {
    console.log("del", id);
    if (valueCheckBox === false) {
      console.log("catch")
      setCheckerror("Please , You have to select")
    } else {
      Swal.fire({
        title: "Are you sure to reject proposal?",
        // text: "Want to reject proposal ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, rejected it!",
      }).then((result) => {
        if (result.value) {
          deleteCliente(id);
        }
      });
    }
  };


  // delete data
  const deleteCliente = (key) => {
    setLoading(true)
    let formData = new FormData();
    formData.append("id", key);
    formData.append("status", 6);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/ProposalAccept`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setLoading(false)
          Swal.fire("Rejected!", "Proposal rejected successfully.", "success");
          history.push({
            pathname: `/customer/proposal`,
            index: 0,
          });
        } else {
          setLoading(false)
          Swal.fire("Oops...", "Errorr ", "error");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button class="btn btn-success" onClick={() => history.goBack()}>
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </Col>
            <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontSize: "20px" }}>Proposal Details</p>
            </Col>
            <Col
              md="4"
              style={{ display: "flex", justifyContent: "flex-end" }}
            ></Col>
          </Row>
        </CardHeader>
        <CardBody>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th scope="row">Name of Team Leader</th>
                <td>{name}</td>
              </tr>
              <tr>
                <th scope="row">Date of Allocation</th>
                <td>{CommonServices.removeTime(proposal_date)}</td>
              </tr>
              <tr>
                <th scope="row">Proposed Amount</th>
                <td>{amount}</td>
              </tr>
              <tr>
                <th scope="row">Scope of Work</th>
                <td>{description}</td>
              </tr>
              <tr>
                <th scope="row">Amount</th>
                <td>
                  <tr>
                    <th>Amount Type</th>
                    <th>Price</th>
                  </tr>
                  <tr>
                    <td>{CommonServices.capitalizeFirstLetter(amount_type)}</td>
                    <td>
                      {
                        amount_type == "fixed" ?
                          amount
                          :
                          amount_type == "hourly" ?
                            amount_hourly
                            :
                            amount_type == "mixed" ?
                              <div>
                                <p>Fixed : {amount}</p>
                                <p>Hourly : {amount_hourly}</p>
                              </div>
                              :
                              ""
                      }
                    </td>
                  </tr>
                </td>
              </tr>

              <tr>
                <th scope="row">Payment Terms</th>
                {
                  payment_terms == "lumpsum" ?
                    <td>
                      <tr>
                        <th>Payment Type</th>
                        <th>Due Dates</th>
                      </tr>
                      <tr>
                        <td>{CommonServices.capitalizeFirstLetter(payment_terms)}</td>
                        <td>
                          {CommonServices.removeTime(due_date)}
                        </td>
                      </tr>
                    </td>
                    :
                    payment_terms == "installment" ?
                      <td>
                        <tr>
                          <th>Payment Type</th>
                          <th>No of Installments</th>
                          <th>Installment Amount</th>
                          <th>Due Dates</th>
                        </tr>
                        <tr>
                          <td>{payment_terms}</td>
                          <td>{no_of_installment}</td>
                          <td>{installAmount(installment_amount)}</td>
                          <td>{installAmount(due_date)}</td>
                        </tr>
                      </td>
                      :
                      ""
                }


              </tr>
              <tr>
                <th scope="row">Proposal Status</th>
                <td>
                  {queryStatus == "4" && "Inprogress"}
                  {queryStatus == "6" && "Declined"}
                  {(queryStatus == "5" || queryStatus > 6) && "Accepted"}
                </td>
              </tr>
            </tbody>

          </table>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-6">
              <div className="mb-3">
                <div className="form-check">
                  <input
                    id="terms_condition"
                    className="form-check-input"
                    type="checkbox"
                    name="p_terms_condition"
                    ref={register}
                    onChange={(e) => updateCheckbox(e.target)}
                  />
                  <label
                    htmlFor="terms_condition"
                    className="form-check-label"
                    title="Read"
                    style={{ cursor: "pointer" }}
                  >
                    Engagement Letter
                  </label>
                  <p className="declined">{custcheckError}</p>
                </div>
                <br />

                {
                  loading ?
                    <Loader />
                    :
                    <>
                      <div className="form-check">
                        {
                          valueCheckBox ?
                            <div>
                              <button type="submit" className="btn btn-primary">
                                Accept
                              </button>
                              <button type="button" className="btn btn-danger ml-2" onClick={() => rejected(id)}>
                                Reject
                              </button>
                            </div>
                            :
                            <div>
                              <button type="submit" className="btn btn-primary" disabled>
                                Accept
                              </button>
                              <button type="button" className="btn btn-danger ml-2" disabled>
                                Reject
                              </button>
                            </div>
                        }
                      </div>
                    </>
                }
              </div>
            </div>

          </form>


        </CardBody>

        <TermsConditions
          readTerms={readTerms}
          addPaymentModal={addPaymentModal}
          id={id}
        />
      </Card>
    </Layout>
  );
}

export default ProposalView;
