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
  const [client, setClient] = useState([])
  const [client2, setClient2] = useState([])
  const [email, setEmail] = useState([])
  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  const [item] = useState(current_date);
  const [startDate, setStartDate] = useState("")
  const [endDate , setEndDate] = useState("")
  const [fromMax, setFromMax] = useState(current_date)
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
const token = window.localStorage.getItem("tlToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }

  const { query, name, description, fixed_amount,
    due_date, installment_amount } = proposal;
 const getCompany = () => {
    axios.get(
      `${baseUrl}/tl/getcompany`, myConfig
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
    axios.get(`${baseUrl}/tl/getProposalDetail?id=${id}`, myConfig).then((res) => {

      if (res.data.code === 1) {
        setCompany2(res.data.result.company)
        setEmail(res.data.result.email)
        var  collectData = []
        let a = res.data.result.email.split(",")
       
        let email = {}
      a.map((i) => {
          console.log("iii", i)
          email = {
            label : i,
            value : i
          }
          collectData.push(email)
          console.log("aaa", collectData)
        })
        
        setClient(collectData)
        setProposal({
          name: res.data.result.name,
          query: res.data.result.assign_no,
          fixed_amount: res.data.result.amount,
          description: res.data.result.description,
          installment_amount: res.data.result.installment_amount,
          due_date: res.data.result.due_date,
          payment : res.data.result.installment_amount
        });
        setStore(res.data.result.payment_plan)
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
      const res = await axios.get(`${baseUrl}/customers/allname?id=${id}`, myConfig);
      setCustId(res.data.id);
    };
    getUser();
  }, [id]);

const getClient = () => {
    let collectData = []
    axios.get(
      `${baseUrl}/tl/querycustomers?query_id=${id}`, myConfig
    )
    .then((res) => {
      let email = {}
      console.log("response", res)
      res.data.result.map((i) => {
        console.log("iii", i)
        email = {
          label : i.email,
          value : i.email
        }
        collectData.push(email)
        
      })
      console.log("data", collectData)
      setClient2(collectData)
    })
  }
  useEffect(() => {
    getClient()
  }, [])


  const onSubmit = (value) => {
 
if(diserror && diserror.length > 0){
  return false
}
else if(dateError === true){
  Alerts.ErrorNormal("Date must be unique")
 }
else if(value2 && value2.length == 0){
  setScopeError(true)
}
else{
  var lumsum = value.p_inst_date
    if (store === "1") {
      setDate(lumsum)
    }

    let formData = new FormData();
    formData.append("emails", email)
    formData.append("assign_no", query);
    formData.append("name", name);
    formData.append("type", "tl");
    formData.append("id", JSON.parse(userid));
    formData.append("assign_id", id);
    formData.append("customer_id", custId);
    formData.append("description", value2);
    formData.append("amount_type", "fixed");
    formData.append("amount", value.p_fixed);
    formData.append("installment_amount", amount);
    formData.append("company", value.p_company)
    formData.append("payment_plan", store);
    formData.append("no_of_installment", installment.value);

    store === "1" ?
      formData.append("due_date", lumsum) :
      store === "2" ?
        formData.append("due_date", date) :
        formData.append("due_date", "")


    if (payment.length < 1) {
     
    } else
      if (store === "2" || store === "3") {
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
                  headers: {
                    uit : token
                  },
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
      } 
      else if (store === "1") {

        setLoading(true)
        axios({
          method: "POST",
          url: `${baseUrl}/tl/updateProposal`,
          headers: {
            uit : token
          },
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
const clientFun = (e) => {
  setClient(e)
  let a = []
  e.map((i) => {
    a.push(i.value)
  })
  console.log("eee", e)
  setEmail(a)
}
const startFun = (e) => {
 
  setFromMax(e.target.value)
  setStartDate(e.target.value)
}
const endFun = (e) => {
  
  setEndDate(e.target.value)
}
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
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label>Company</label>
                  <select
                    class="form-control"
                    ref={register}
                    name="p_company"
                  value={company2}
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
                  <label>Payment Plan </label>
                  <select
                    class="form-control"
                    ref={register}
                    name="p_type"
                    onChange={(e) => {
                      setInstallment([])
                      setFromMax("")
                      setStartDate("")
                        setEndDate("")
                      setStore(e.target.value)
                      if(e.target.value === "3"){
                        setFromMax(current_date)
                       
                      }
                    }}
                  >
                    <option value="1">Fixed Amount-Lumpsum payment</option>
                    <option value="2">Fixed Amount-Instalment plan</option>
                    <option value="3">Retainership plan-specified period</option>
                    <option value="4">Retainership plan-unspecified period</option>
                  </select>
                </div>

             
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
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label>Copy to</label>
                  <Select
                   isMulti={true}
                   onChange={(e) => clientFun(e)}
                   value={client}
                    options={client2}
                  />

                </div>
              

                {
                  store === "4" ? (
                    <div class="form-group">
                    <label>Start Date</label>  
                        <input
                            type="date"
                            className="form-control"
                           value = {startDate}
                             min = {item}
                           onChange={(e) => startFun(e)}
                        />
                    </div>
                  ) : " "
                }
             
                { store === "1" ? (
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
                  store === "2" ? (
                    <div class="form-group">
                      <label>No of Installments</label>
                      <Select
                        onChange={(e => installmentHandler(e))}
                        options={noInstallments}
                      />
                    </div>
                  )
                    : ""
                }
<div>
{
  store === "3" ? (
   

    <>
    {
      store === "3" ? (
     
     <>
         
   
     <div className="row">
     <div class="col-md-6 my-2">
                    <label>Start Date</label>  
                        <input
                            type="date"
                            className="form-control"
                             max={endDate}
                             value = {startDate}
                             min = {item}
                           onChange={(e) => startFun(e)}
                        />
                    </div>
                    <div class="col-md-6 my-2">
                    <label>End Date</label>  
                        <input
                            type="date"
                            value = {endDate}
                            className="form-control"
                           min={fromMax}
                           onChange = {(e) => endFun(e)}
                        />
                    </div>
     </div>
     <div class="form-group">
                      <label>No of Installments</label>
                      <Select
                        onChange={(e => installmentHandler(e))}
                        options={no_installmentRange}
                      />
                    </div>
     </>
      ) : " "
    }

    </>
    
             
  ) : " "
}
{
  store === "4" ? 
 <>
  <div class="form-group">
  <label>Due Date- Date of month
 </label>
  <select
    class="form-control"
    ref={register}
    name="date_month"
    
  >
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="1">5</option>
    <option value="2">6</option>
    <option value="3">7</option>
    <option value="4">8</option>
    <option value="1">9</option>
    <option value="2">10</option>
    <option value="3">11</option>
    <option value="4">12</option>
    <option value="1">13</option>
    <option value="2">14</option>
    <option value="3">15</option>
    <option value="4">16</option>
    <option value="1">17</option>
    <option value="2">18</option>
    <option value="3">19</option>
    <option value="4">20</option>
    <option value="1">21</option>
    <option value="2">22</option>
    <option value="3">23</option>
    <option value="4">24</option>
    <option value="1">25</option>
    <option value="2">26</option>
    <option value="3">27</option>
    <option value="4">28</option>
    <option value="1">29</option>
    <option value="2">30</option>
    <option value="3">31</option>
   
  </select>
</div> 

 </>

: " "
}
</div>
<div class="form-group">
                  <label>Amount<span className="declined">*</span></label>
                  <input
                    type="text"
                    name="p_fixed"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_fixed || diserror,
                    })}
                    ref={register({ required: true })}
                    placeholder="Enter Amount"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {
                   store === "2"
                   ?
                  
                   
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
                    : ""
                }
                                {
                   store === "3"
                   ?
                   <Payment
                   installment={installment.label}
                   paymentAmount={paymentAmount}
                   paymentDate={paymentDate}
                   installment_amount={installment_amount}
                   due_date={due_date}
                   getQuery={getQuery}
                   item={item}
                   clearValue={clearValue}
                 /> : ""
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
const no_installmentRange = [
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
  {
    value: "5",
    label: "5",
  },
  {
    value: "6",
    label: "6",
  },
  {
    value: "7",
    label: "7",
  },
  {
    value: "8",
    label: "8",
  },
  {
    value: "9",
    label: "9",
  },
  {
    value: "10",
    label: "10",
  },
  {
    value: "11",
    label: "11",
  },
  {
    value: "12",
    label: "12",
  },
  {
    value: "13",
    label: "13",
  },
  {
    value: "14",
    label: "14",
  },
  {
    value: "15",
    label: "15",
  },
  {
    value: "16",
    label: "16",
  },
  {
    value: "17",
    label: "17",
  },
  {
    value: "18",
    label: "18",
  },
  {
    value: "19",
    label: "19",
  },
  {
    value: "20",
    label: "20",
  },
  {
    value: "21",
    label: "21",
  },
  {
    value: "22",
    label: "22",
  },
  {
    value: "23",
    label: "23",
  },
  {
    value: "24",
    label: "24",
  },
  {
    value: "25",
    label: "25",
  },
  {
    value: "26",
    label: "26",
  },
  {
    value: "27",
    label: "27",
  },
  {
    value: "28",
    label: "28",
  },
  {
    value: "29",
    label: "29",
  },
  {
    value: "30",
    label: "30",
  },
  {
    value: "31",
    label: "31",
  },
  {
    value: "32",
    label: "32",
  },
  {
    value: "33",
    label: "33",
  },
  {
    value: "34",
    label: "34",
  },
  {
    value: "35",
    label: "35",
  },
  {
    value: "36",
    label: "36",
  },
 
];
