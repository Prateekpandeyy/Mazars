import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import Payment from "./Payment";
import Select from "react-select";
import Alerts from "../../../common/Alerts";
import classNames from "classnames";
import Mandatory from "../../../components/Common/Mandatory";
import { Spinner } from 'reactstrap';


function EditComponent() {

  const alert = useAlert();
  const { register, handleSubmit, reset, errors } = useForm();
  const userid = window.localStorage.getItem("tpkey");
  const [loading, setLoading] = useState(false);

  const [custId, setCustId] = useState("");
  const [store, setStore] = useState(null);
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [load, setLoad] = useState(true);


  const [payment, setPayment] = useState([]);
  const [installment, setInstallment] = useState([]);
  const [error, setError] = useState('');
  const [diserror, setdiserror] = useState("")
  const history = useHistory();
  const { id } = useParams();

  const [proposal, setProposal] = useState({
    query: "",
    name: "",
    fixed_amount: "",
    payable: "",
    description: "",
    installment_amount: "",
    due_date: "",
  });


  const { query, name, description, fixed_amount,
    due_date, installment_amount } = proposal;

  useEffect(() => {
    getQuery();
  }, []);


  const getQuery = () => {
    axios.get(`${baseUrl}/tl/getProposalDetail?id=${id}`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setProposal({
          name: res.data.result.name,
          query: res.data.result.assign_no,
          fixed_amount: res.data.result.amount,
          description: res.data.result.description,
          installment_amount: res.data.result.installment_amount,
          due_date: res.data.result.due_date,
        });

        var payment_terms = res.data.result.payment_terms
        var no_of_installment = res.data.result.no_of_installment

        const data1 = {
          label: payment_terms,
          value: payment_terms,
        }

        const data2 = {
          label: no_of_installment,
          value: no_of_installment,
        }

        // console.log("data1", data1)
        setPayment(data1);
        setInstallment(data2);
      }
    });
  };


  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${baseUrl}/customers/allname?id=${id}`);
      setCustId(res.data.id);
    };
    getUser();
  }, [id]);




  const onSubmit = (value) => {
    console.log(value);

    var lumsum = value.p_inst_date
    if (payment.label == "lumpsum") {
      setDate(lumsum)
    }

    let formData = new FormData();
    formData.append("assign_no", value.p_assingment);
    formData.append("name", value.p_name);
    formData.append("type", "tp");
    formData.append("id", JSON.parse(userid));
    formData.append("assign_id", id);
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
      // setpaymentError("Please select at lease one")
    } else
      if (payment.value == "installment") {
        if (installment == "") {
          Alerts.ErrorNormal(`Please select no of installment .`)
        } else
          if (!amount || !date) {
            Alerts.ErrorNormal(`Please enter all fields.`)
          } else if (amount && date) {
            console.log("all deatils ** here --")
            if (installment.value > 0) {
              var a = Number(installment.value)
              for (let i = 0; i < a; i++) {

                if (amount[i] == "" || amount[i] == undefined || amount[i] <= 0) {
                  Alerts.ErrorNormal(`Please enter amount`)
                  return false
                }
                if (date[i] == "" || date[i] == undefined) {
                  Alerts.ErrorNormal(`Please enter date`)
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
                  url: `${baseUrl}/tp/updateProposal`,
                  data: formData,
                })
                  .then(function (response) {
                    console.log("res-", response);
                    if (response.data.code === 1) {
                      setLoading(false)
                      var variable = "Proposal Updated Successfully "
                      Alerts.SuccessNormal(variable)
                      history.push("/taxprofessional/proposal");
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
          url: `${baseUrl}/tp/updateProposal`,
          data: formData,
        })
          .then(function (response) {
            console.log("res-", response);
            if (response.data.code === 1) {
              setLoading(false)
              var variable = "Proposal Updated Successfully "
              Alerts.SuccessNormal(variable)
              history.push("/taxprofessional/proposal");
            } else if (response.data.code === 0) {
              setLoading(false)
            }
          })
          .catch((error) => {
            console.log("erroror - ", error);
          });
      }
  };


  const handleChange = (e) => {
    console.log("val-", e.target.value);
    if (isNaN(e.target.value)) {
      setdiserror("Please enter digit only");
    }
    else {
      setdiserror("");
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

  const installmentHandler = (key) => {
    console.log("key", key)
    setInstallment(key)
  }


  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
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
              <div class="btn ml-3">
                <h4>Edit Proposal</h4>
              </div>
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div style={{ display: "flex" }}>
              <div class="col-md-6">

                <div class="form-group">
                  <label>Query No.</label>
                  <input
                    type="text"
                    name="p_assingment"
                    class="form-control"
                    value={query}
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
                    defaultValue={fixed_amount}
                    onChange={handleChange}
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
                    defaultValue={description}
                    ref={register({ required: true })}
                  ></textarea>
                </div>
              </div>


              <div class="col-md-6">
                <div class="form-group">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    name="p_name"
                    class="form-control"
                    value={name}
                    ref={register}
                  />
                </div>

                <div class="form-group">
                  <label>Payment Terms<span className="declined">*</span></label>
                  <Select
                    closeMenuOnSelect={true}
                    onChange={setPayment}
                    value={payment}
                    options={paymentsTerms}
                  />
                </div>

                {payment.label == "lumpsum" ? (
                  <div class="form-group">
                    <label>Due Dates</label>
                    <input
                      type="date"
                      name="p_inst_date"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_inst_date,
                      })}
                      ref={register({ required: true })}
                      placeholder="Enter Hourly basis"
                      defaultValue={due_date}
                    />
                  </div>
                ) :
                  payment.label == "installment" ? (
                    <div class="form-group">
                      <label>No of Installments</label>
                      <Select
                        closeMenuOnSelect={true}
                        onChange={(e => installmentHandler(e))}
                        value={installment}
                        options={noInstallments}
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
                    installment_amount && due_date &&
                    <Payment
                      installment={installment.label}
                      paymentAmount={paymentAmount}
                      paymentDate={paymentDate}
                      installment_amount={installment_amount}
                      due_date={due_date}
                      getQuery={getQuery}
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
    </Layout>
  );
}

export default EditComponent;

const paymentsTerms = [
  {
    value: "lumpsum",
    label: "lumpsum",
  },
  {
    value: "installment",
    label: "installment",
  },
];

const noInstallments = [
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



   // var lumsum = value.p_inst_date
    // setDate(lumsum)

    // let formData = new FormData();
    // formData.append("assign_no", value.p_assingment);
    // formData.append("name", value.p_name);
    // formData.append("type", "tl");
    // formData.append("id", JSON.parse(userid));
    // formData.append("description", value.description);
    // formData.append("customer_id", custId);
    // formData.append("assign_id", id);
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


    // if (payment.value == "installment") {
    //   if (amount) {
    //     console.log("amount --", amount)

    //     if (installment.value > 0) {
    //       console.log("installment** --")
    //       var a = Number(installment.value)
    //       for (let i = 0; i < a; i++) {
    //         if (amount[i] == "" || amount[i] == undefined || amount[i] <= 0) {
    //           console.log("amount --1", amount[i])
    //           Alerts.ErrorNormal(`please insert all fields.`)
    //           return false
    //         }
    //       }
    //     }
    //   }
    //   if (amount) {
    //     var sum = amount.reduce(myFunction)
    //     function myFunction(total, value) {
    //       return Number(total) + Number(value);
    //     }
    //   }
    //   if (value.p_fixed != sum) {
    //     Alerts.ErrorNormal(`Sum of all installments should be equal to ${value.p_fixed}.`)
    //   }
    //   else {
    //     axios({
    //       method: "POST",
    //       url: `${baseUrl}/tl/updateProposal`,
    //       data: formData,
    //     })
    //       .then(function (response) {
    //         console.log("res-", response);
    //         if (response.data.code === 1) {
    //           reset();
    //           var variable = "Proposal Successfully Sent "
    //           Alerts.SuccessNormal(variable)
    //           history.push("/teamleader/proposal");
    //         }
    //       })
    //       .catch((error) => {
    //         console.log("erroror - ", error);
    //       });
    //   }

    // }
    // else {
    //   axios({
    //     method: "POST",
    //     url: `${baseUrl}/tl/updateProposal`,
    //     data: formData,
    //   })
    //     .then(function (response) {
    //       console.log("res-", response);
    // if (response.data.code === 1) {
    //   var variable = "Proposal Updated Successfully "
    //   Alerts.SuccessNormal(variable)
    //   history.push("/teamleader/proposal");
    // }
    //     })
    //     .catch((error) => {
    //       console.log("erroror - ", error);
    //     });
    // }