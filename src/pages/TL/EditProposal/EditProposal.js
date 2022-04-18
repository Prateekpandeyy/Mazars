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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Markup } from 'interweave';
import {Link} from "react-router-dom";
function EditComponent(props) {

  const alert = useAlert();
  const { register, handleSubmit, reset, errors } = useForm();
  const userid = window.localStorage.getItem("tlkey");
  const [loading, setLoading] = useState(false);

  const [custId, setCustId] = useState("");
  const [store, setStore] = useState(null);
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [load, setLoad] = useState(true);
  const [companyName, setCompanyName] = useState([])
  const[clearValue, setClearValue] = useState(true)
  const [payment, setPayment] = useState([]);
  const [installment, setInstallment] = useState([]);
  const [value2, setValue2] = useState('');
  const [diserror, setdiserror] = useState("")
  const history = useHistory();
  const { id } = useParams();
const [scopeError, setScopeError] = useState(false)
  const [dateError, setDateError] = useState(false)
  const [company2, setCompany2] = useState("")
  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  const [item] = useState(current_date);
  const [proposal, setProposal] = useState({
    query: "",
    name: "",
    fixed_amount: "",
    payable: "",
    description: "",
    installment_amount: "",
    due_date: "",
    payment : ""
  });
const wrong = {
  background: "blue",
  border: "3px solid red"
}

  const { query, name, description, fixed_amount,
    due_date, installment_amount } = proposal;
 const getCompany = () => {
    axios.get(
      `${baseUrl}/tl/getcompany`
    )
    .then((res) => {
      console.log("response", res)
      setCompanyName(res.data.result)
    })
  }
  useEffect(() => {
    getCompany()
    getQuery();
  }, []);


  const getQuery = () => {
    axios.get(`${baseUrl}/tl/getProposalDetail?id=${id}`).then((res) => {

      if (res.data.code === 1) {
        setCompany2(res.data.result.company)
        setProposal({
          name: res.data.result.name,
          query: res.data.result.assign_no,
          fixed_amount: res.data.result.amount,
          description: res.data.result.description,
          installment_amount: res.data.result.installment_amount,
          due_date: res.data.result.due_date,
          payment : res.data.result.installment_amount
        });
setValue2(res.data.result.description)
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
 
if(diserror.length > 0){
  return false
}
else if(dateError === true){
  Alerts.ErrorNormal("Date must be unique")
 }
else if(value2.length == 0){
  setScopeError(true)
}
else{
  var lumsum = value.p_inst_date
    if (payment.label == "lumpsum") {
      setDate(lumsum)
    }
console.log("value2", value2.length)
    let formData = new FormData();
    formData.append("assign_no", value.p_assingment);
    formData.append("name", value.p_name);
    formData.append("type", "tl");
    formData.append("id", JSON.parse(userid));
    formData.append("assign_id", id);
    formData.append("customer_id", custId);
    formData.append("description", value2);
    formData.append("amount_type", "fixed");
    formData.append("amount", value.p_fixed);
    formData.append("installment_amount", amount);
    formData.append("companyName", value.p_company)
    formData.append("payment_terms", payment.value);
    formData.append("no_of_installment", installment.value);

    payment.label == "lumpsum" ?
      formData.append("due_date", lumsum) :
      payment.label == "installment" ?
        formData.append("due_date", date) :
        formData.append("due_date", "")


    if (payment.length < 1) {
     
    } else
      if (payment.value == "installment") {
        if (installment == "") {
          Alerts.ErrorNormal(`Please select no of installment .`)
        } else
          if (!amount || !date) {
            Alerts.ErrorNormal(`Please enter all fields.`)
          } else if (amount && date) {

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

              } else {
               
                setLoading(true)
                axios({
                  method: "POST",
                  url: `${baseUrl}/tl/updateProposal`,
                  data: formData,
                })
                  .then(function (response) {

                    if (response.data.code === 1) {
                      setLoading(false)
                      var variable = "Proposal updated successfully"
                      Alerts.SuccessNormal(variable)
                      history.push("/teamleader/proposal");
                    } else if (response.data.code === 0) {
                      setLoading(false)
                    }
                  })
                  .catch((error) => {
                  
                  });
              }
            }
          }
      } else if (payment.label == "lumpsum") {

        setLoading(true)
        axios({
          method: "POST",
          url: `${baseUrl}/tl/updateProposal`,
          data: formData,
        })
          .then(function (response) {
         
            if (response.data.code === 1) {
              setLoading(false)
              var variable = "Proposal Updated Successfully "
              Alerts.SuccessNormal(variable)
              history.push("/teamleader/proposal");
            } else if (response.data.code === 0) {
              setLoading(false)
            }
          })
          .catch((error) => {
          
          });
      }
}
    
  };


  const handleChange = (e) => {

    if (isNaN(e.target.value)) {
      setdiserror("Please enter number only");
    }
    else if(e.target.value == "0"){
      setdiserror("Amount should be greater than zero")
    }
    else {
      setdiserror("");
    }
  };


  const paymentAmount = (data) => {
   

    var array1 = []
    Object.entries(data).map(([key, value]) => {
      array1.push(value)
    });
    setAmount(array1.slice(0, installment.value));
  };

  const paymentDate = (data) => {
   

    var array2 = []
    Object.entries(data).map(([key, value]) => {
      array2.push(value)
    });

    setDate(array2.slice(0, installment.value));
    if(new Set(array2).size !== array2.length){
      setDateError(true)
     Alerts.ErrorNormal("Date must be unique")
    }
    else{
      setDateError(false)
    }
  };

  const installmentHandler = (key) => {

    setInstallment(key)
    setClearValue(false)
  }
let a = <Markup content= {description} />

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="5">
            <Link
                  to={{
                    pathname: `/teamleader/${props.location.routes}`,
                    index: props.location.index,
                  }}
                >
                  <button class="autoWidthBtn ml-3">Go Back</button>
                </Link>
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
                  <label>Company</label>
                  <select
                    class="form-control"
                    ref={register}
                    name="p_company"
                   defaultValue={company2}
                   onChange= {(e) => setCompany2(e.target.value)}
                  >
{
  companyName.map((i) => (
    <option value={i.company_prefix}>{i.name}</option>
  ))
}
                  </select>
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
                      "is-invalid": errors.p_fixed || diserror,
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
                  <CKEditor
                     editor={ ClassicEditor }
                     height = "400px"
                     config = {{

                    
                      fontFamily: {
                        options: [
                            'default',
                            'Ubuntu, Arial, sans-serif',
                            'Ubuntu Mono, Courier New, Courier, monospace'
                        ]
                    },
                    fontColor: {
                      colors: [
                          {
                              color: 'hsl(0, 0%, 0%)',
                              label: 'Black'
                          },
                          {
                              color: 'hsl(0, 0%, 30%)',
                              label: 'Dim grey'
                          },
                          {
                              color: 'hsl(0, 0%, 60%)',
                              label: 'Grey'
                          },
                          {
                              color: 'hsl(0, 0%, 90%)',
                              label: 'Light grey'
                          },
                          {
                              color: 'hsl(0, 0%, 100%)',
                              label: 'White',
                              hasBorder: true
                          },

                          // ...
                      ]
                  },
                    toolbar: [
                   ' highlight', 'heading',  'bold', 'fontColor', 'italic',  'bulletedList', 'numberedList', 'undo', 'redo'
                    ],
                  
                    }}
                    
                    ref={register}
          
                  
                    id="textarea"
                    rows="3"
                    name="description"
                    data={description}
                    onChange={ ( event, editor ) => {
                      setValue2(editor.getData())
                      // setcustError("")
                    
                  } }
                    //ref={register({ required: true })}
                >
                  
                  </CKEditor>
                  {/* <textarea
                    className={classNames("form-control", {
                      "is-invalid": errors.description,
                    })}
                    id="textarea"
                    rows="3"
                    name="description"
                    defaultValue={description}
                    ref={register({ required: true })}
                  ></textarea> */}
                </div>
              </div>


              <div class="col-md-6">
                <div class="form-group">
                  <label>Client Name</label>
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
                      item={item}
                      clearValue={clearValue}
                    />
                }
              </div>
            </div>

            <div class="form-group col-md-6">
              {
                loading ?
                  <Spinner color="primary" />
                  :
                  <button type="submit" class="customBtn">
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

