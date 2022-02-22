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
import Swal from "sweetalert2";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


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
  const [det, addDet] = useState()
  const [date, setDate] = useState();
  const [amount, setAmount] = useState();
  const [dateError, setDateError] = useState(false)
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
  

   if(diserror.length > 0 ){
     return false
   }
   else if(dateError === true){
    Alerts.ErrorNormal("Date must be unique")
   }
   else if(det.length == 0){
   return false
  }
   else{
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
    formData.append("description", det);
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
     
      setpaymentError("Please select at lease one")
    } else
      if (payment.value == "installment") {
        if (installment == "") {
          Alerts.ErrorNormal(`Please select no of installment .`)
        
        } 
        else if (!amount || !date) {
            Alerts.ErrorNormal(`Please enter all fields.`)
            
          } else if (amount && date) {
            
            if (installment.value > 0) {
              var a = Number(installment.value)
              for (let i = 0; i < a; i++) {
                // arrAmount.push(amount[i])
                // arrDate.push(date[i])
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
                  url: `${baseUrl}/tl/uploadProposal`,
                  data: formData,
                })
                  .then(function (response) {
               
                    if (response.data.code === 1) {
                      setLoading(false)
                      Alerts.SuccessNormal("Proposal created successfully")
                      history.push("/teamleader/proposal");
                    } else if (response.data.code === 0) {
                      setLoading(false)
                      Alerts.ErrorNormal(`${response.data.result}`)
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
          url: `${baseUrl}/tl/uploadProposal`,
          data: formData,
        })
          .then(function (response) {
          
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
          
          });
      }



   }
  };



  const paymentAmount = (data) => {
   

    var array1 = []
    Object.entries(data).map(([key, value]) => {
      array1.push(value)
    });
    setAmount(array1);
  };

  const paymentDate = (data) => {
  
   
    var array2 = []
    Object.entries(data).map(([key, value]) => {
      array2.push(value)
    });
    setDate(array2);
   
    if(new Set(array2).size !== array2.length){
      setDateError(true)
     Alerts.ErrorNormal("Date must be unique")
    }
    else{
      setDateError(false)
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
    setTotalAmount(e.target.value);
  };

  const installmentHandler = (key) => {
   
    setInstallment(key)
  }
console.log(props)
  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <Col md="5">
              <button
                class="autoWidthBtn ml-3"
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
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                      "is-invalid": errors.p_fixed || diserror,
                    })}
                    ref={register({ required: true })}
                    placeholder="Enter Fixed Price"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <p style={{ "color": "red" }}>{diserror}</p>
                <div class="form-group">
                  <label>Scope of Work<span className="declined">*</span></label>
                  {/* <textarea
                    className={classNames("form-control", {
                      "is-invalid": errors.description,
                    })}
                    id="textarea"
                    rows="3"
                    name="description"
                    ref={register({ required: true })}
                    placeholder="Enter Proposal Description"
                  ></textarea> */}
                  <CKEditor
                     editor={ ClassicEditor }
                     height  = "600px"
                     config = {{
                    
                      highlight: {
                        options: [
                            {
                                model: 'greenMarker',
                                class: 'marker-green',
                                title: 'Green marker',
                                color: 'var(--ck-highlight-marker-green)',
                                type: 'marker'
                            },
                            {
                                model: 'redPen',
                                class: 'pen-red',
                                title: 'Red pen',
                                color: 'var(--ck-highlight-pen-red)',
                                type: 'pen'
                            }
                        ]
                    },
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
                    
                    
                    className={classNames("form-control", {
                      "is-invalid": errors.p_fact,
                    })}
                    id="textarea22"
                    rows="6"
                   
                
                    onChange={ ( event, editor ) => {
                      addDet(editor.getData());
                     

                    
                  } }

                ></CKEditor>
                   
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label>Client Name</label>
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
                      dateError = {dateError}
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
