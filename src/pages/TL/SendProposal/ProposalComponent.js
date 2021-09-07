import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Alert,
} from "reactstrap";
import classNames from "classnames";
import Payment from "./Payment";
import Select from "react-select";
import Alerts from "../../../common/Alerts";
import Mandatory from "../../../components/Common/Mandatory";
import { Spinner } from 'reactstrap';



function ProposalComponent(props) {
  const { id } = props;
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();

  const userid = window.localStorage.getItem("tlkey");
  const [loading, setLoading] = useState(false);

  const [custId, setCustId] = useState("");
  const [custname, setCustName] = useState();
  const [assignId, setAssignID] = useState("");
  const [assingNo, setAssingNo] = useState("");
  const [store, setStore] = useState(null);
  const [diserror, setdiserror] = useState("")
  const [payment, setPayment] = useState([]);
  const [installment, setInstallment] = useState([]);
  const [error, setError] = useState('');
  const [totalAmount, setTotalAmount] = useState(null);
  const [paymentError, setpaymentError] = useState();

  const [date, setDate] = useState();
  const [amount, setAmount] = useState();

  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  const [item] = useState(current_date);


  useEffect(() => {
    const getQuery = () => {
      axios
        .get(
          `${baseUrl}/tl/pendingTlProposal?tl_id=${JSON.parse(
            userid
          )}&assign_id=${id}`
        )
        .then((res) => {
          if (res.data.code === 1) {
            if (res.data.result.length > 0) {
              setAssingNo(res.data.result[0].assign_no);
              setAssignID(res.data.result[0].id);
            }
          }
        });
    };
    getQuery();
  }, []);


  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${baseUrl}/customers/allname?id=${id}`);
      setCustName(res.data.name);
      setCustId(res.data.id);
    };

    getUser();
  }, [id]);


  const onSubmit = (value) => {
    console.log(value);

    console.log("amount --", amount)
    console.log("date --", date)

    var lumsum = value.p_inst_date
    if (payment.label == "lumpsum") {
      setDate(lumsum)
    }
    
    // var arrAmount = []
    // var arrDate = []

    let formData = new FormData();
    formData.append("assign_no", assingNo);
    formData.append("name", value.p_name);
    formData.append("type", "tl");
    formData.append("id", JSON.parse(userid));
    formData.append("assign_id", assignId);
    formData.append("customer_id", custId);
    formData.append("description", value.description);
    formData.append("amount_type", "fixed");
    formData.append("amount", value.p_fixed);
    formData.append("installment_amount", amount);

    formData.append("payment_terms", payment.value);
    formData.append("no_of_installment", installment.value);

    payment.label == "lumpsum" ?
      formData.append("due_date", lumsum) :
      payment.label == "installment" ?
        formData.append("due_date", date) :
        formData.append("due_date", "")

    if (payment.length < 1) {
      console.log("please select payments terms --")
      setpaymentError("Please select at lease one")
    } else
      if (payment.value == "installment") {
        if (installment == "") {
          Alerts.ErrorNormal(`Please select no of installment .`)
          console.log("Please select no of installment --", installment)
        } else
          if (!amount || !date) {
            Alerts.ErrorNormal(`Please enter all fields.`)
            console.log("Please enter all fields")
          } else if (amount && date) {
            console.log("all deatils ** here --")

            console.log("installment.value -", installment.value)

            if (installment.value > 0) {
              var a = Number(installment.value)
              for (let i = 0; i < a; i++) {
                // arrAmount.push(amount[i])
                // arrDate.push(date[i])
                if (amount[i] == "" || amount[i] == undefined || amount[i] <= 0) {
                  Alerts.ErrorNormal(`Please enter amount`)
                  console.log("Please enter amount")
                  return false
                }
                if (date[i] == "" || date[i] == undefined) {
                  Alerts.ErrorNormal(`Please enter date`)
                  console.log("Please enter date")
                  return false
                }
              }
              var sum = amount.reduce(myFunction)
              function myFunction(total, value) {
                return Number(total) + Number(value);
              }
              if (value.p_fixed != sum) {
                Alerts.ErrorNormal(`Sum of all installments should be equal to ${value.p_fixed}.`)
                console.log(`Sum of all installments should be equal to ${value.p_fixed}.`)
              } else {
                console.log("call else fine api for installment")
                setLoading(true)
                axios({
                  method: "POST",
                  url: `${baseUrl}/tl/uploadProposal`,
                  data: formData,
                })
                  .then(function (response) {
                    console.log("res-", response);
                    if (response.data.code === 1) {
                      setLoading(false)
                      Alerts.SuccessNormal("Proposal sent successfully.")
                      history.push("/teamleader/proposal");
                    } else if (response.data.code === 0) {
                      setLoading(false)
                    }
                  })
                  .catch((error) => {
                    console.log("erroror - ", error);
                  });
              }
            }
          }
      } else if (payment.label == "lumpsum") {
        console.log("call api for lumshum",)
        setLoading(true)
        axios({
          method: "POST",
          url: `${baseUrl}/tl/uploadProposal`,
          data: formData,
        })
          .then(function (response) {
            console.log("res-", response);
            if (response.data.code === 1) {
              setLoading(false)
              var variable = "Proposal sent successfully. "
              Alerts.SuccessNormal(variable)
              history.push("/teamleader/proposal");
            } else if (response.data.code === 0) {
              setLoading(false)
            }
          })
          .catch((error) => {
            console.log("erroror - ", error);
          });
      }



  };



  const paymentAmount = (data) => {
    console.log("paymentAmount", data)

    var array1 = []
    Object.entries(data).map(([key, value]) => {
      array1.push(value)
    });
    setAmount(array1);
  };

  const paymentDate = (data) => {
    console.log("paymentDate", data)

    var array2 = []
    Object.entries(data).map(([key, value]) => {
      array2.push(value)
    });
    setDate(array2);
  };


  const handleChange = (e) => {
    console.log("val-", e.target.value);
    if (isNaN(e.target.value)) {
      setdiserror("Please enter number only.");
    }
    else {
      setdiserror("");
    }
    setTotalAmount(e.target.value);
  };

  const installmentHandler = (key) => {
    console.log("key", key)
    setInstallment(key)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <Col md="5">
              <button
                class="btn btn-success ml-3"
                onClick={() => history.goBack()}
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </Col>
            <Col md="7">
              <div>
                <h4>Prepare Proposal</h4>
              </div>
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p style={{ color: "red" }}>{error}</p>
            <div style={{ display: "flex" }}>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Query No.</label>
                  <input
                    type="text"
                    name="p_assingment"
                    className="form-control"
                    value={assingNo}
                    ref={register}
                  />
                </div>
                <div class="form-group">
                  <label>Fee</label>
                  <select
                    class="form-control"
                    ref={register}
                    name="p_type"
                    onChange={(e) => setStore(e.target.value)}
                  >
                    <option value="fixed">Fixed Price</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Fixed Price<span className="declined">*</span></label>
                  <input
                    type="text"
                    name="p_fixed"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_fixed,
                    })}
                    ref={register({ required: true })}
                    placeholder="Enter Fixed Price"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <p style={{ "color": "red" }}>{diserror}</p>
                <div class="form-group">
                  <label>Scope of Work<span className="declined">*</span></label>
                  <textarea
                    className={classNames("form-control", {
                      "is-invalid": errors.description,
                    })}
                    id="textarea"
                    rows="3"
                    name="description"
                    ref={register({ required: true })}
                    placeholder="Enter Proposal Description"
                  ></textarea>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    name="p_name"
                    className="form-control"
                    value={custname}
                    ref={register}
                  />
                </div>

                <div class="form-group">
                  <label>Payment Terms<span className="declined">*</span></label>
                  <Select
                    className={paymentError ? "customError" : ""}
                    onChange={(e) => {
                      setPayment(e)
                      setpaymentError("")
                    }}
                    options={payment_terms}
                  />

                </div>

                {payment.label == "lumpsum" ? (
                  <div class="form-group">
                    <label>Due Dates</label>
                    <input
                      type="date"
                      name="p_inst_date"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_inst_date
                      })}
                      ref={register({ required: true })}
                      placeholder="Enter Hourly basis"
                      min={item}
                    />
                  </div>
                ) :
                  payment.label == "installment" ? (
                    <div class="form-group">
                      <label>No of Installments</label>
                      <Select
                        onChange={(e => installmentHandler(e))}
                        options={no_installments}
                      />
                    </div>
                  )
                    : ""
                }

                {
                  payment.label == "lumpsum"
                    ?
                    ""
                    :
                    <Payment
                      installment={installment.label}
                      paymentAmount={paymentAmount}
                      paymentDate={paymentDate}
                      totalAmount={totalAmount}
                      min={item}
                      item={item}
                    />
                }

              </div>
            </div>


            <div class="form-group col-md-6">
              {
                loading ?
                  <Spinner color="primary" />
                  :
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
              }
            </div>

          </form>
          <Mandatory />
        </CardBody>
      </Card>
    </>
  );
}

export default ProposalComponent;


const payment_terms = [
  {
    value: "lumpsum",
    label: "lumpsum",
  },
  {
    value: "installment",
    label: "installment",
  },
];

const no_installments = [
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
];


    // if (amount) {
        //   var sum = amount.reduce(myFunction)
        //   function myFunction(total, value) {
        //     return Number(total) + Number(value);
        //   }
        // }
        // if (value.p_fixed != sum) {
        //   Alerts.ErrorNormal(`Sum of all installments should be equal to ${value.p_fixed}.`)
        // } else if (!date) {
        //   console.log("call date")
        //   Alerts.ErrorNormal(`Please date should be enter`)
        // }

 // var lumsum = value.p_inst_date
    // setDate(lumsum)

    // if (payment.length < 1) {
    //   setpaymentError("Please select at lease one")
    // }
    // else {
    //   setpaymentError("")
    //   let formData = new FormData();

    // formData.append("assign_no", assingNo);
    // formData.append("name", value.p_name);
    // formData.append("type", "tl");
    // formData.append("id", JSON.parse(userid));
    // formData.append("assign_id", assignId);
    // formData.append("customer_id", custId);
    // formData.append("description", value.description);

    // formData.append("amount_type", "fixed");
    // formData.append("amount", value.p_fixed);
    // formData.append("installment_amount", amount);

    // formData.append("payment_terms", payment.value);
    // formData.append("no_of_installment", installment.value);

    // payment.label == "lumpsum" ?
    //   formData.append("due_date", lumsum) :
    //   payment.label == "installment" ?
    //     formData.append("due_date", date) :
    //     formData.append("due_date", "")

    //   console.log("payment -", payment.label)

    //   if (payment.value == "installment") {
    //     console.log("amount --", amount)
    //     console.log("date --", date)

    // if (!amount || !date) {
    //   Alerts.ErrorNormal(`please enter all fields`)
    // } else
    // if (amount && date) {
    //   if (installment.value > 0) {
    //     console.log("installment** --")

    //     var a = Number(installment.value)
    //     for (let i = 0; i < a; i++) {
    //       // console.log("call for loop", i, amount[i])
    //       if (amount[i] == "" || amount[i] == undefined || amount[i] <= 0) {
    //         console.log("amount --1", amount[i])
    //         Alerts.ErrorNormal(`please insert all fields.`)
    //         return false
    //       }
    //     }
    //     var sum = amount.reduce(myFunction)
    //     function myFunction(total, value) {
    //       return Number(total) + Number(value);
    //     }
    //     if (value.p_fixed != sum) {
    //       Alerts.ErrorNormal(`Sum of all installments should be equal to ${value.p_fixed}.`)
    //     } else {
    //       console.log("calll else fine api")
    //     }
    //   }
    //       }
    //       else {
    //         console.log("call else")
    //         return false
    //         setLoading(true)
    // axios({
    //   method: "POST",
    //   url: `${baseUrl}/tl/uploadProposal`,
    //   data: formData,
    // })
    //   .then(function (response) {
    //     console.log("res-", response);
    //     if (response.data.code === 1) {
    //       setLoading(false)
    //       Alerts.SuccessNormal("Proposal sent successfully.")
    //       history.push("/teamleader/proposal");
    //     } else if (response.data.code === 0) {
    //       setLoading(false)
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("erroror - ", error);
    //   });
    //       }
    //   }
    //   else {
    // setLoading(true)
    // axios({
    //   method: "POST",
    //   url: `${baseUrl}/tl/uploadProposal`,
    //   data: formData,
    // })
    //   .then(function (response) {
    //     console.log("res-", response);
    //     if (response.data.code === 1) {
    //       setLoading(false)

    //       var variable = "Proposal sent successfully. "
    //       Alerts.SuccessNormal(variable)
    //       history.push("/teamleader/proposal");
    //     } else if (response.data.code === 0) {
    //       setLoading(false)
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("erroror - ", error);
    //   });
    //   }
    // }
