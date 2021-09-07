import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import Payment from "./Payment";
import Select from "react-select";


const Schema = yup.object().shape({
  misc_1: yup.string().required("required misc_1"),
  misc_2: yup.string().required("required proposal description"),
  p_payable: yup.string().required("required payable"),
});


function ProposalComponent(props) {
  const { id } = props;
  console.log(id);

  const alert = useAlert();
  const history = useHistory();
  const { handleSubmit, register, reset } = useForm();


  const userid = window.localStorage.getItem("tlkey");
  const [custId, setCustId] = useState("");
  const [custname, setCustName] = useState();
  const [assignId, setAssignID] = useState("");
  const [assingNo, setAssingNo] = useState("");
  const [store, setStore] = useState(null);


  const [payment, setPayment] = useState([]);
  const [installment, setInstallment] = useState([]);

  const [amount, setAmount] = useState();
  const [date, setDate] = useState();


  useEffect(() => {
    const getQuery = () => {
      axios
        .get(
          `${baseUrl}/tl/pendingTlProposal?tl_id=${JSON.parse(
            userid
          )}&assign_id=${id}`
        )
        .then((res) => {
          console.log(res);
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
      console.log("res", res);
      setCustName(res.data.name);
      setCustId(res.data.id);
    };

    getUser();
  }, [id]);


  const onSubmit = (value) => {
    console.log(value);

    var lumsum = value.p_inst_date
    setDate(lumsum)
    console.log("date --=", date)

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
    // formData.append("amount_hourly", value.p_hourly);
    formData.append("installment_amount", amount);

    formData.append("payment_terms", JSON.stringify(payment));
    formData.append("no_of_installment", JSON.stringify(installment));

    payment.label == "Lumpsum" ?
      formData.append("due_date", lumsum) :
      formData.append("due_date", date)

    axios({
      method: "POST",
      url: `${baseUrl}/tl/uploadProposal`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          reset();
          alert.success(<Msg />);
          history.push("/teamleader/proposal");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


  //alert msg
  const Msg = () => {
    return (
      <>
        <p style={{ fontSize: "10px" }}>proposal successfully sent</p>
      </>
    );
  };


  const paymentAmount = (data) => {
    console.log("paymentAmount", data)

    var array1 = []
    Object.entries(data).map(([key, value]) => {
      console.log("val", value);
      array1.push(value)
    });
    console.log("array1", array1);

    setAmount(array1);
  };

  const paymentDate = (data) => {
    console.log("paymentDate", data)

    var array2 = []
    Object.entries(data).map(([key, value]) => {
      console.log("val", value);
      array2.push(value)
    });
    console.log("array2", array2);
    setDate(array2);
  };


  // console.log("amount", amount)
  console.log("installment", installment)


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
                    {/* <option value="">--select type--</option> */}
                    <option value="fixed">Fixed Price</option>
                    {/* <option value="hourly">Hourly basis</option>
                    <option value="mixed">Mixed</option> */}
                  </select>
                </div>

                {/* {store == "fixed" && ( */}

                <div class="form-group">
                  <label>Fixed Price</label>
                  <input
                    type="text"
                    name="p_fixed"
                    className="form-control"
                    ref={register}
                    placeholder="Enter Fixed Price"
                  />
                </div>

                {/* )} */}


                <div class="form-group">
                  <label>Scope of Work</label>
                  <textarea
                    className="form-control"
                    id="textarea"
                    rows="3"
                    name="description"
                    ref={register}
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
                  <label>Payment Terms</label>
                  <Select
                    onChange={setPayment}
                    options={payment_terms}
                  />

                  {/* <select
                    className="form-control"
                    name="p_payment_terms"
                    aria-label="Default select example"
                    ref={register}
                    onChange={(e) => setPayment(e.target.value)}
                  >
                    <option value="">--select--</option>
                    <option value="Lumpsum">Lumpsum</option>
                    <option value="Installment">Installment</option>
                  </select> */}
                </div>

                {payment.label == "Lumpsum" ? (
                  <div class="form-group">
                    <label>Due Dates</label>
                    <input
                      type="date"
                      name="p_inst_date"
                      className="form-control"
                      ref={register}
                      placeholder="Enter Hourly basis"
                    />
                  </div>
                ) :
                  payment.label == "Installment" ? (
                    <div class="form-group">
                      <label>No of Installments</label>
                      <Select
                        onChange={setInstallment}
                        options={no_installments}
                      />
                      {/* <select
                        className="form-control"
                        name="p_no_installments"
                        aria-label="Default select example"
                        ref={register}
                        onChange={(e) => setInstallment(e.target.value)}
                      >
                        <option value="">--select--</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select> */}
                    </div>
                  )
                    : ""
                }

                {
                  payment.label == "Lumpsum"
                    ?
                    ""
                    :
                    <Payment
                      installment={installment.label}
                      paymentAmount={paymentAmount}
                      paymentDate={paymentDate}
                    />
                }


              </div>

            </div>


            <div class="form-group col-md-6">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>

          </form>
        </CardBody>
      </Card>
    </>
  );
}

export default ProposalComponent;


const payment_terms = [
  {
    value: "Lumpsum",
    label: "Lumpsum",
  },
  {
    value: "Installment",
    label: "Installment",
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


{/* {store == "hourly" && (
                  <div class="form-group">
                    <label>Hourly basis</label>
                    <input
                      type="text"
                      name="p_hourly"
                      className="form-control"
                      ref={register}
                      placeholder="Enter Hourly basis"
                    />
                  </div>
                )}
                {store == "mixed" && (
                  <div>
                    <div class="form-group">
                      <label>Mixed</label>
                      <input
                        type="text"
                        name="p_fixed"
                        className="form-control"
                        ref={register}
                        placeholder="Enter Fixed Price"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        name="p_hourly"
                        className="form-control"
                        ref={register}
                        placeholder="Enter Hourly basis"
                      />
                    </div>
                  </div>
                )} */}



// var date = value.p_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
// var todaysDate = new Date();


{
  /* <select
                    class="form-control"
                    ref={register}
                    name="p_assingment"
                    onChange={(e) => getID(e.target.value)}
                  >
                    <option value="">--select--</option>
                    {incompleteData.map((p, index) => (
                      <option key={index} value={p.id}>
                        {p.assign_no}
                      </option>
                    ))}
                  </select> */
}

// const getID = (key) => {
//     setId(key);
//     incompleteData.filter((data) => {
//       if (data.id == key) {
//         console.log("assingNo", data.assign_no);
//         setAssingNo(data.assign_no);
//         setAssignID(data.id);
//       }
//     });
//   };
