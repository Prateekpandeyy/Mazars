// import React, { useState, useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import axios from "axios";
// import { baseUrl } from "../../../config/config";
// import { useHistory } from "react-router-dom";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   Row,
//   Col,
//   Table,
//   Alert,
// } from "reactstrap";
// import classNames from "classnames";
// import Payment from "./Payment";
// import Select from "react-select";
// import Alerts from "../../../common/Alerts";
// import Mandatory from "../../../components/Common/Mandatory";
// import { Spinner } from 'reactstrap';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// function ProposalComponent(props) {
//   const { id } = props;
//   const history = useHistory();
//   const { handleSubmit, register, errors } = useForm();

//   const userid = window.localStorage.getItem("tpkey");
//   const [loading, setLoading] = useState(false);

//   const [custId, setCustId] = useState("");
//   const [custname, setCustName] = useState();
//   const [assignId, setAssignID] = useState("");
//   const [assingNo, setAssingNo] = useState("");
//   const [store, setStore] = useState(null);
//   const [diserror, setdiserror] = useState("")
//   const [payment, setPayment] = useState([]);
//   const [installment, setInstallment] = useState([]);
//   const [error, setError] = useState('');
//   const [totalAmount, setTotalAmount] = useState(null);
//   const [paymentError, setpaymentError] = useState();
//   const [det, addDet] = useState()
//   const [date, setDate] = useState();
//   const [amount, setAmount] = useState();
//   const [companyName, setCompanyName] = useState([])
//   const [company2, setCompany2] = useState("")
//   const [dateError, setDateError] = useState(false)
//   const [client, setClient] = useState([])
//   const [email, setEmail] = useState("")
//   var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
//   const [item] = useState(current_date);
//   const token = window.localStorage.getItem("tptoken")
//   const myConfig = {
//       headers : {
//        "uit" : token
//       }
//     }
//   const getQuery = () => {
//     axios
//       .get(
//         `${baseUrl}/tl/pendingTlProposal?tp_id=${JSON.parse(
//           userid
//         )}&assign_id=${id}`, myConfig
//       )
//       .then((res) => {
//         if (res.data.code === 1) {
//           if (res.data.result.length > 0) {
//             setAssingNo(res.data.result[0].assign_no);
//             setAssignID(res.data.result[0].id);
//           }
//         }
//       });
//   };
//   const getCompany = () => {
//     axios.get(
//       `${baseUrl}/tl/getcompany`, myConfig
//     )
//     .then((res) => {
//       console.log("response", res)
//       setCompanyName(res.data.result)
//     })
//   }
//   const getClient = () => {
//     let collectData = []
//     axios.get(
//       `${baseUrl}/tl/querycustomers?query_id=${id}`, myConfig
//     )
//     .then((res) => {
//       let email = {}
//       console.log("response", res)
//       res.data.result.map((i) => {
//         console.log("iii", i)
//         email = {
//           label : i.email,
//           value : i.email
//         }
//         collectData.push(email)

//       })
//       console.log("data", collectData)
//       setClient(collectData)
//     })
//   }

//   useEffect(() => {
//    getCompany()
//     getQuery();
//     getClient()
//   }, []);

//   useEffect(() => {
//     const getUser = async () => {
//       const res = await axios.get(`${baseUrl}/customers/allname?id=${id}`, myConfig);
//       setCustName(res.data.name);
//       setCustId(res.data.id);
//     };

//     getUser();
//   }, [id]);

//   const onSubmit = (value) => {
//     if(diserror.length > 0 ){
//       return false
//     }
//     else if(dateError === true){
//      Alerts.ErrorNormal("Date must be unique")
//     }
//     else if(det.length == 0){
//       return false
//      }
//     else{
//     var lumsum = value.p_inst_date
//     if (payment.label == "lumpsum") {
//       setDate(lumsum)
//     }

//     // var arrAmount = []
//     // var arrDate = []

//     let formData = new FormData();
//     formData.append("emails", email)
//     formData.append("assign_no", assingNo);
//     formData.append("name", value.p_name);
//     formData.append("type", "tp");
//     formData.append("id", JSON.parse(userid));
//     formData.append("assign_id", assignId);
//     formData.append("customer_id", custId);
//     formData.append("description", det);
//     formData.append("amount_type", "fixed");
//     formData.append("amount", value.p_fixed);
//     formData.append("installment_amount", amount);
//     formData.append("company", value.p_company)
//     formData.append("payment_terms", payment.value);
//     formData.append("no_of_installment", installment.value);

//     payment.label == "lumpsum" ?
//       formData.append("due_date", lumsum) :
//       payment.label == "installment" ?
//         formData.append("due_date", date) :
//         formData.append("due_date", "")

//     if (payment.length < 1) {

//       setpaymentError("Please select at lease one")
//     } else
//       if (payment.value == "installment") {
//         if (installment == "") {
//           Alerts.ErrorNormal(`Please select no of installment .`)
//           console.log("Please select no of installment --", installment)
//         } else
//           if (!amount || !date) {
//             Alerts.ErrorNormal(`Please enter all fields.`)
//             console.log("Please enter all fields")
//           } else if (amount && date) {
//             console.log("all deatils ** here --")

//             console.log("installment.value -", installment.value)

//             if (installment.value > 0) {
//               var a = Number(installment.value)
//               for (let i = 0; i < a; i++) {
//                 // arrAmount.push(amount[i])
//                 // arrDate.push(date[i])
//                 if (amount[i] == "" || amount[i] == undefined || amount[i] <= 0) {
//                   Alerts.ErrorNormal(`Please enter amount`)
//                   console.log("Please enter amount")
//                   return false
//                 }
//                 if (date[i] == "" || date[i] == undefined) {
//                   Alerts.ErrorNormal(`Please enter date`)
//                   console.log("Please enter date")
//                   return false
//                 }
//               }
//               var sum = amount.reduce(myFunction)
//               function myFunction(total, value) {
//                 return Number(total) + Number(value);
//               }
//               if (value.p_fixed != sum) {
//                 Alerts.ErrorNormal(`Sum of all installments should be equal to ${value.p_fixed}.`)
//                 console.log(`Sum of all installments should be equal to ${value.p_fixed}.`)
//               } else {
//                 console.log("call else fine api for installment")
//                 setLoading(true)
//                 axios({
//                   method: "POST",
//                   url: `${baseUrl}/tp/uploadProposal`,
//                   headers : {
//                     uit : token
//                   },
//                   data: formData,
//                 })
//                   .then(function (response) {
//                     console.log("res-", response);
//                     if (response.data.code === 1) {
//                       setLoading(false)
//                       Alerts.SuccessNormal("Proposal created successfully")
//                       history.push("/taxprofessional/proposal");
//                     } else if (response.data.code === 0) {
//                       setLoading(false)
//                       Alerts.ErrorNormal(`${response.data.result}`)

//                     }
//                   })
//                   .catch((error) => {
//                     console.log("erroror - ", error);
//                   });
//               }
//             }
//           }
//       } else if (payment.label == "lumpsum") {
//         console.log("call api for lumshum",)
//         setLoading(true)
//         axios({
//           method: "POST",
//           url: `${baseUrl}/tp/uploadProposal`,
//           headers : {
//             uit : token
//           },
//           data: formData,
//         })
//           .then(function (response) {
//             console.log("res-", response);
//             if (response.data.code === 1) {
//               setLoading(false)
//               var variable = "Proposal sent successfully. "
//               Alerts.SuccessNormal(variable)
//               history.push("/taxprofessional/proposal");
//             } else if (response.data.code === 0) {
//               setLoading(false)
//             }
//           })
//           .catch((error) => {
//             console.log("erroror - ", error);
//           });
//       }
//     }

//   };

//   const paymentAmount = (data) => {
//     console.log("paymentAmount", data)

//     var array1 = []
//     Object.entries(data).map(([key, value]) => {
//       array1.push(value)
//     });
//     setAmount(array1);
//   };

//   const paymentDate = (data) => {
//     console.log("paymentDate", data)

//     var array2 = []
//     Object.entries(data).map(([key, value]) => {
//       array2.push(value)
//     });
//     setDate(array2);
//     if(new Set(array2).size !== array2.length){
//       setDateError(true)
//      Alerts.ErrorNormal("Date must be unique")
//     }
//     else{
//       setDateError(false)
//     }
//   };

//   const handleChange = (e) => {
//     console.log("val-", e.target.value);
//     if (isNaN(e.target.value)) {
//       setdiserror("Please enter number only");
//     }
//     else if(e.target.value == "0"){
//       setdiserror("Amount should be greater than zero")
//     }
//     else {
//       setdiserror("");
//     }
//     setTotalAmount(e.target.value);
//   };

//   const installmentHandler = (key) => {
//     console.log("key", key)
//     setInstallment(key)
//   }
//   const clientFun = (e) => {
//     let a = []
//     e.map((i) => {
//       a.push(i.value)
//     })
//     console.log("eee", e)
//     setEmail(a)
//   }
//   return (
//     <>
//       <Card>
//         <CardHeader>
//           <Row>
//             <Col md="5">
//               <button
//                 class="autoWidthBtn ml-3"
//                 onClick={() => history.goBack()}
//               >

//                 Go Back
//               </button>
//             </Col>
//             <Col md="7">
//               <div>
//                 <h4>Prepare Proposal</h4>
//               </div>
//             </Col>
//           </Row>
//         </CardHeader>

//         <CardBody>
//           <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
//             <p style={{ color: "red" }}>{error}</p>
//             <div style={{ display: "flex" }}>
//               <div class="col-md-6">
//                 <div class="form-group">
//                   <label>Query No.</label>
//                   <input
//                     type="text"
//                     name="p_assingment"
//                     className="form-control"
//                     value={assingNo}
//                     ref={register}
//                   />
//                 </div>
//                 <div class="form-group">
//                   <label>Company</label>
//                   <select
//                     class="form-control"
//                     ref={register}
//                     name="p_company"

//                    onChange= {(e) => setCompany2(e.target.value)}
//                   >
// {
//   companyName.map((i) => (
//     <option value={i.company_prefix}>{i.name}</option>
//   ))
// }
//                   </select>
//                 </div>
//                 <div class="form-group">
//                   <label>Fee</label>
//                   <select
//                     class="form-control"
//                     ref={register}
//                     name="p_type"
//                     onChange={(e) => setStore(e.target.value)}
//                   >
//                     <option value="fixed">Fixed Price</option>
//                   </select>
//                 </div>

//                 <div class="form-group">
//                   <label>Fixed Price<span className="declined">*</span></label>
//                   <input
//                     type="text"
//                     name="p_fixed"
//                     className={classNames("form-control", {
//                       "is-invalid": errors.p_fixed,
//                     })}
//                     ref={register({ required: true })}
//                     placeholder="Enter Fixed Price"
//                     onChange={(e) => handleChange(e)}
//                   />
//                 </div>
//                 <p style={{ "color": "red" }}>{diserror}</p>
//                 <div class="form-group">
//                   <label>Scope of Work<span className="declined">*</span></label>
//                   <CKEditor
//                      editor={ ClassicEditor }
//                      config = {{

//                       highlight: {
//                         options: [
//                             {
//                                 model: 'greenMarker',
//                                 class: 'marker-green',
//                                 title: 'Green marker',
//                                 color: 'var(--ck-highlight-marker-green)',
//                                 type: 'marker'
//                             },
//                             {
//                                 model: 'redPen',
//                                 class: 'pen-red',
//                                 title: 'Red pen',
//                                 color: 'var(--ck-highlight-pen-red)',
//                                 type: 'pen'
//                             }
//                         ]
//                     },
//                       fontFamily: {
//                         options: [
//                             'default',
//                             'Ubuntu, Arial, sans-serif',
//                             'Ubuntu Mono, Courier New, Courier, monospace'
//                         ]
//                     },
//                     fontColor: {
//                       colors: [
//                           {
//                               color: 'hsl(0, 0%, 0%)',
//                               label: 'Black'
//                           },
//                           {
//                               color: 'hsl(0, 0%, 30%)',
//                               label: 'Dim grey'
//                           },
//                           {
//                               color: 'hsl(0, 0%, 60%)',
//                               label: 'Grey'
//                           },
//                           {
//                               color: 'hsl(0, 0%, 90%)',
//                               label: 'Light grey'
//                           },
//                           {
//                               color: 'hsl(0, 0%, 100%)',
//                               label: 'White',
//                               hasBorder: true
//                           },

//                           // ...
//                       ]
//                   },
//                     toolbar: [
//                    ' highlight', 'heading',  'bold', 'fontColor', 'italic',  'bulletedList', 'numberedList', 'undo', 'redo'
//                     ],

//                     }}

//                     className={classNames("form-control", {
//                       "is-invalid": errors.p_fact,
//                     })}
//                     id="textarea22"
//                     rows="6"

//                     onChange={ ( event, editor ) => {
//                       addDet(editor.getData());

//                   } }

//                 ></CKEditor>

//                 </div>
//               </div>

//               <div class="col-md-6">
//                 <div class="form-group">
//                   <label>Client Name</label>
//                   <input
//                     type="text"
//                     name="p_name"
//                     className="form-control"
//                     value={custname}
//                     ref={register}
//                   />
//                 </div>
//                 <div class="form-group">
//                   <label>Copy To</label>
//                   <Select
//                    isMulti={true}
//                    onChange={(e) => clientFun(e)}
//                     options={client}
//                   />

//                 </div>
//                 <div class="form-group">
//                   <label>Payment Terms<span className="declined">*</span></label>
//                   <Select
//                     className={paymentError ? "customError" : ""}
//                     onChange={(e) => {
//                       setPayment(e)
//                       setpaymentError("")
//                     }}
//                     options={payment_terms}
//                   />

//                 </div>

//                 {payment.label == "lumpsum" ? (
//                   <div class="form-group">
//                     <label>Due Dates</label>
//                     <input
//                       type="date"
//                       name="p_inst_date"
//                       className={classNames("form-control", {
//                         "is-invalid": errors.p_inst_date
//                       })}
//                       ref={register({ required: true })}
//                       placeholder="Enter Hourly basis"
//                       min={item}
//                     />
//                   </div>
//                 ) :
//                   payment.label == "installment" ? (
//                     <div class="form-group">
//                       <label>No of Installments</label>
//                       <Select
//                         onChange={(e => installmentHandler(e))}
//                         options={no_installments}
//                       />
//                     </div>
//                   )
//                     : ""
//                 }

//                 {
//                   payment.label == "lumpsum"
//                     ?
//                     ""
//                     :
//                     <Payment
//                       installment={installment.label}
//                       paymentAmount={paymentAmount}
//                       paymentDate={paymentDate}
//                       totalAmount={totalAmount}
//                       min={item}
//                       item={item}
//                     />
//                 }

//               </div>
//             </div>

//             <div class="form-group col-md-6">
//               {
//                 loading ?
//                   <Spinner color="primary" />
//                   :
//                   <button type="submit" className="customBtn">
//                     Submit
//                   </button>
//               }
//             </div>

//           </form>
//           <Mandatory />
//         </CardBody>
//       </Card>
//     </>
//   );
// }

// export default ProposalComponent;

// const payment_terms = [
//   {
//     value: "lumpsum",
//     label: "lumpsum",
//   },
//   {
//     value: "installment",
//     label: "installment",
//   },
// ];

// const no_installments = [
//   {
//     value: "2",
//     label: "2",
//   },
//   {
//     value: "3",
//     label: "3",
//   },
//   {
//     value: "4",
//     label: "4",
//   },
// ];

//     // if (amount) {
//         //   var sum = amount.reduce(myFunction)
//         //   function myFunction(total, value) {
//         //     return Number(total) + Number(value);
//         //   }
//         // }
//         // if (value.p_fixed != sum) {
//         //   Alerts.ErrorNormal(`Sum of all installments should be equal to ${value.p_fixed}.`)
//         // } else if (!date) {
//         //   console.log("call date")
//         //   Alerts.ErrorNormal(`Please date should be enter`)
//         // }

//  // var lumsum = value.p_inst_date
//     // setDate(lumsum)

//     // if (payment.length < 1) {
//     //   setpaymentError("Please select at lease one")
//     // }
//     // else {
//     //   setpaymentError("")
//     //   let formData = new FormData();

//     // formData.append("assign_no", assingNo);
//     // formData.append("name", value.p_name);
//     // formData.append("type", "tl");
//     // formData.append("id", JSON.parse(userid));
//     // formData.append("assign_id", assignId);
//     // formData.append("customer_id", custId);
//     // formData.append("description", value.description);

//     // formData.append("amount_type", "fixed");
//     // formData.append("amount", value.p_fixed);
//     // formData.append("installment_amount", amount);

//     // formData.append("payment_terms", payment.value);
//     // formData.append("no_of_installment", installment.value);

//     // payment.label == "lumpsum" ?
//     //   formData.append("due_date", lumsum) :
//     //   payment.label == "installment" ?
//     //     formData.append("due_date", date) :
//     //     formData.append("due_date", "")

//     //   console.log("payment -", payment.label)

//     //   if (payment.value == "installment") {
//     //     console.log("amount --", amount)
//     //     console.log("date --", date)

//     // if (!amount || !date) {
//     //   Alerts.ErrorNormal(`please enter all fields`)
//     // } else
//     // if (amount && date) {
//     //   if (installment.value > 0) {
//     //     console.log("installment** --")

//     //     var a = Number(installment.value)
//     //     for (let i = 0; i < a; i++) {
//     //       // console.log("call for loop", i, amount[i])
//     //       if (amount[i] == "" || amount[i] == undefined || amount[i] <= 0) {
//     //         console.log("amount --1", amount[i])
//     //         Alerts.ErrorNormal(`please insert all fields.`)
//     //         return false
//     //       }
//     //     }
//     //     var sum = amount.reduce(myFunction)
//     //     function myFunction(total, value) {
//     //       return Number(total) + Number(value);
//     //     }
//     //     if (value.p_fixed != sum) {
//     //       Alerts.ErrorNormal(`Sum of all installments should be equal to ${value.p_fixed}.`)
//     //     } else {
//     //       console.log("calll else fine api")
//     //     }
//     //   }
//     //       }
//     //       else {
//     //         console.log("call else")
//     //         return false
//     //         setLoading(true)
//     // axios({
//     //   method: "POST",
//     //   url: `${baseUrl}/tl/uploadProposal`,
//     //   data: formData,
//     // })
//     //   .then(function (response) {
//     //     console.log("res-", response);
//     //     if (response.data.code === 1) {
//     //       setLoading(false)
//     //       Alerts.SuccessNormal("Proposal sent successfully.")
//     //       history.push("/teamleader/proposal");
//     //     } else if (response.data.code === 0) {
//     //       setLoading(false)
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     console.log("erroror - ", error);
//     //   });
//     //       }
//     //   }
//     //   else {
//     // setLoading(true)
//     // axios({
//     //   method: "POST",
//     //   url: `${baseUrl}/tl/uploadProposal`,
//     //   data: formData,
//     // })
//     //   .then(function (response) {
//     //     console.log("res-", response);
//     //     if (response.data.code === 1) {
//     //       setLoading(false)

//     //       var variable = "Proposal sent successfully. "
//     //       Alerts.SuccessNormal(variable)
//     //       history.push("/teamleader/proposal");
//     //     } else if (response.data.code === 0) {
//     //       setLoading(false)
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     console.log("erroror - ", error);
//     //   });
//     //   }
//     // }
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
import { Spinner } from "reactstrap";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function ProposalComponent(props) {
  const { id } = props;
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const userid = window.localStorage.getItem("tpkey");
  const [loading, setLoading] = useState(false);
  const [custId, setCustId] = useState("");
  const [custname, setCustName] = useState("");
  const [assignId, setAssignID] = useState("");
  const [assingNo, setAssingNo] = useState("");
  const [store, setStore] = useState("1");
  const [diserror, setdiserror] = useState("");
  const [installment, setInstallment] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [det, addDet] = useState();
  const [date, setDate] = useState();
  const [amount, setAmount] = useState();
  const [companyName, setCompanyName] = useState([]);
  const [dateError, setDateError] = useState(false);
  const [company2, setCompany2] = useState("");
  const [startDate, setStartDate] = useState("");
  const [client, setClient] = useState([]);
  const [email, setEmail] = useState("");
  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);
  const [item] = useState(current_date);
  const [endDate, setEndDate] = useState("");
  const [dateMonth, setDateMonth] = useState("");
  const [invoice, setInvice] = useState("0");
  const [invoiceTl, setInvoicetl] = useState("0");
  const [invoiceAdmin, setInvoiceAdmin] = useState("");
  const [fromMax, setFromMax] = useState(current_date);
  const [tlDisable, setTlDisable] = useState(true);
  const [subPlan, setSubplan] = useState("0");
  const [allAmount, setAllAmount] = useState([]);
  const [clientDisable, setClientDisable] = useState(true);
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getQuery = () => {
    axios
      .get(
        `${baseUrl}/tl/pendingTlProposal?tp_id=${JSON.parse(
          userid
        )}&assign_id=${id}`,
        myConfig
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
  const getCompany = () => {
    axios.get(`${baseUrl}/tl/getcompany`, myConfig).then((res) => {
      setCompanyName(res.data.result);
    });
  };
  const getClient = () => {
    let collectData = [];
    axios
      .get(`${baseUrl}/tl/querycustomers?query_id=${id}`, myConfig)
      .then((res) => {
        let email = {};

        res.data.result.map((i) => {
          email = {
            label: i.email,
            value: i.email,
          };
          collectData.push(email);
        });

        setClient(collectData);
      });
  };

  useEffect(() => {
    getCompany();
    getQuery();
    getClient();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        `${baseUrl}/customers/allname?id=${id}`,
        myConfig
      );
      setCustName(res.data.name);
      setCustId(res.data.id);
    };

    getUser();
  }, [id]);

  const onSubmit = (value) => {
    if (addDet) {
      if (diserror.length > 0) {
        return false;
      } else if (dateError === true) {
        Alerts.ErrorNormal("Date must be unique");
      } else if (det && det.length == 0) {
        return false;
      } else {
        var lumsum = value.p_inst_date;
        if (store === "1") {
          setDate(lumsum);
        }

        // var arrAmount = []
        // var arrDate = []

        let formData = new FormData();
        formData.append("emails", email);
        formData.append("assign_no", assingNo);
        formData.append("name", custname);
        formData.append("type", "tp");
        formData.append("date_month", value.date_month);
        formData.append("id", JSON.parse(userid));
        formData.append("assign_id", assignId);
        formData.append("customer_id", custId);
        formData.append("description", det);
        formData.append("amount_type", "fixed");
        formData.append("amount", value.p_fixed);
        formData.append("installment_amount", allAmount);
        formData.append("payment_plan", store);
        formData.append("start_date", startDate);
        formData.append("end_date", endDate);
        // formData.append("payment_terms", payment.value);
        formData.append("no_of_installment", installment.value);
        formData.append("company", company2);
        formData.append("date_month", dateMonth);
        formData.append("tl_iba", invoiceTl);
        formData.append("tp_iba", invoice);
        formData.append("sub_payment_plane", subPlan);
        formData.append("admin_iba", invoiceAdmin);
        store === "1"
          ? formData.append("due_date", date)
          : store === "2" || store === "3"
          ? formData.append("due_date", date)
          : formData.append("due_date", "");

        if (
          (subPlan !== "2" && store === "2") ||
          (subPlan !== "2" && store === "3")
        ) {
          if (store === "2" || store === "3") {
            if (installment == "") {
              Alerts.ErrorNormal(`Please select no of installment .`);
            } else if (!allAmount || !date) {
              console.log("amounts", allAmount, date);
              Alerts.ErrorNormal(`Please enter all fields.`);
            } else if (allAmount && date) {
              if (installment.value > 0) {
                var a = Number(installment.value);
                for (let i = 0; i < a; i++) {
                  // arrAmount.push(amount[i])
                  // arrDate.push(date[i])
                  if (
                    allAmount[i] == "" ||
                    allAmount[i] == undefined ||
                    allAmount[i] <= 0
                  ) {
                    Alerts.ErrorNormal(`Please enter amount`);

                    return false;
                  }
                  if (date[i] == "" || date[i] == undefined) {
                    Alerts.ErrorNormal(`Please enter date`);

                    return false;
                  }
                }
                var sum = allAmount.reduce(myFunction);
                function myFunction(total, value) {
                  return Number(total) + Number(value);
                }
                if (value.p_fixed != sum) {
                  Alerts.ErrorNormal(
                    `Sum of all installments should be equal to ${value.p_fixed}.`
                  );
                } else {
                  setLoading(true);
                  axios({
                    method: "POST",
                    url: `${baseUrl}/tp/uploadProposal`,
                    headers: {
                      uit: token,
                    },
                    data: formData,
                  })
                    .then(function (response) {
                      if (response.data.code === 1) {
                        setLoading(false);
                        Alerts.SuccessNormal("Proposal created successfully");
                        history.push("/taxprofessional/proposal");
                      } else if (response.data.code === 0) {
                        setLoading(false);
                        Alerts.ErrorNormal(`${response.data.result}`);
                      }
                    })
                    .catch((error) => {});
                }
              }
            }
          }
        } else if (store === "1" || store === "4" || subPlan === "2") {
          setLoading(true);
          axios({
            method: "POST",
            url: `${baseUrl}/tp/uploadProposal`,
            headers: {
              uit: token,
            },
            data: formData,
          })
            .then(function (response) {
              if (response.data.code === 1) {
                setLoading(false);
                var variable = "Proposal sent successfully. ";
                Alerts.SuccessNormal(variable);
                history.push("/taxprofessional/proposal");
              } else if (response.data.code === 0) {
                setLoading(false);
              }
            })
            .catch((error) => {});
        }
      }
    } else {
      Swal.fire({
        title: "Error",
        html: "Scope of work could not be blank",
        icon: "error",
      });
    }
  };

  const paymentAmount = (data) => {
    var array1 = [];
    Object.entries(data).map(([key, value]) => {
      array1[key] = value;
    });
    setAllAmount(array1);
    setAmount(array1);
  };

  const paymentDate = (data) => {
    var array2 = [];
    Object.entries(data).map(([key, value]) => {
      array2.push(value);
    });
    setDate(array2);

    if (new Set(array2).size !== array2.length) {
      setDateError(true);
      Alerts.ErrorNormal("Date must be unique");
    } else {
      setDateError(false);
    }
  };

  const handleChange = (e) => {
    if (isNaN(e.target.value)) {
      setdiserror("Please enter number only");
    } else if (e.target.value == "0") {
      setdiserror("Amount should be greater than zero");
    } else {
      setdiserror("");
    }
    setTotalAmount(e.target.value);
    calculateAmount(e.target.value, installment.value);
  };

  const totalValue = (e) => {
    let amount = e;
    let a = Math.round(Number(e) / Number(installment.value));

    var dd = [];
    while (amount > a) {
      amount = amount - a;
      dd.push(a);
    }
    dd.push(amount);
    return dd;
  };
  const calculateAmount = (totalAmount, installment) => {
    console.log("totalAmount", totalAmount, installment);
    let totalInstallAmount = totalAmount;
    let actualInstallmentNumber = installment;
    let installmentAmount = 0;
    let boxAmount = [];

    let roundNum = 0;
    let adjustAmount = 0;

    if (totalInstallAmount < 1 || actualInstallmentNumber < 1) {
      installmentAmount = 0;
    } else {
      installmentAmount = parseInt(
        totalInstallAmount / actualInstallmentNumber
      );
      roundNum = actualInstallmentNumber * installmentAmount;
      adjustAmount = totalInstallAmount - roundNum;
      console.log("InstallmentAmount", installmentAmount);
    }

    for (let i = 0; i < installment; i++) {
      if (i === 0) {
        boxAmount.push(installmentAmount + adjustAmount);
      } else {
        boxAmount.push(installmentAmount);
      }
    }

    setAllAmount(boxAmount);
  };

  const installmentHandler = (key) => {
    calculateAmount(totalAmount, key.value);

    setInstallment(key);
  };
  const clientFun = (e) => {
    let a = [];
    e.map((i) => {
      a.push(i.value);
    });

    setEmail(a);
  };

  const startFun = (e) => {
    setFromMax(e.target.value);
    setStartDate(e.target.value);
  };
  const endFun = (e) => {
    setEndDate(e.target.value);
  };
  const myMonthValue = (e) => {
    setDateMonth(e.target.value);
  };
  const getInviceValue = (e) => {
    setInvice(e.target.value);
  };
  const getInvoiceAdmin = (e) => {
    setInvoiceAdmin(e.target.value);
  };
  const getInvoicetl = (e) => {
    setInvoicetl(e.target.value);
  };
  const getSubPlan = (e) => {
    setSubplan(e.target.value);
  };

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
                Go back
              </button>
            </Col>
            <Col md="7">
              <div>
                <h4>Prepare proposal</h4>
              </div>
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div style={{ display: "flex" }}>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Query no.</label>
                  <input
                    type="text"
                    name="p_assingment"
                    className="form-control"
                    value={assingNo}
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
                    onChange={(e) => setCompany2(e.target.value)}
                  >
                    {companyName.map((i) => (
                      <option value={i.company_prefix}>{i.name}</option>
                    ))}
                  </select>
                </div>

                <div class="form-group">
                  <label>Payment plan </label>
                  <select
                    class="form-control"
                    ref={register}
                    name="p_type"
                    onChange={(e) => {
                      setInstallment([]);
                      setFromMax("");
                      setStartDate("");
                      setEndDate("");
                      setStore(e.target.value);
                      if (e.target.value === "3") {
                        setFromMax(current_date);
                      }
                      if (e.target.value === "1") {
                        setClientDisable(true);
                      } else {
                        setClientDisable(false);
                      }
                    }}
                  >
                    <option value="1">Fixed Amount-Lumpsum payment</option>
                    <option value="2">Fixed Amount-Instalment plan</option>
                    <option value="3">
                      Retainership plan-specified period
                    </option>
                    <option value="4">
                      Retainership plan-unspecified period
                    </option>
                  </select>
                </div>

                <div className="myproposaloption">
                  <div class="form-group">
                    <label>
                      Whether invoice(s) can be issued before acceptance of
                      proposal by client
                    </label>
                    <div
                      onChange={(e) => getInviceValue(e)}
                      className="myporposalCheckBox"
                    >
                      <span className="d-flex mr-3">
                        <input
                          type="radio"
                          disabled={clientDisable}
                          className="spaceRadio"
                          value="1"
                          name="yesclient"
                        />
                        Yes
                      </span>
                      <span className="d-flex mr-3">
                        <input
                          type="radio"
                          disabled={clientDisable}
                          defaultChecked
                          className="spaceRadio"
                          value="0"
                          name="yesclient"
                        />
                        No
                      </span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>
                      Approval of Team Leader for such issue of invoice(s)
                    </label>
                    <div
                      onChange={(e) => getInvoicetl(e)}
                      className="myporposalCheckBox"
                    >
                      <span className="d-flex mr-3">
                        <input
                          type="radio"
                          className="spaceRadio"
                          disabled={tlDisable}
                          value="1"
                          name="yestl"
                        />
                        Yes
                      </span>
                      <span className="d-flex mr-3">
                        <input
                          type="radio"
                          className="spaceRadio"
                          defaultChecked
                          disabled={tlDisable}
                          value="0"
                          name="yestl"
                        />
                        No
                      </span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>
                      Approval of Admin for such issue of invoice(s)
                    </label>
                    <div
                      onChange={(e) => getInvoiceAdmin(e)}
                      className="myporposalCheckBox"
                    >
                      <span className="d-flex mr-3">
                        <input
                          type="radio"
                          className="spaceRadio"
                          disabled
                          value="1"
                          name="yesadmin"
                        />
                        Yes
                      </span>
                      <span className="d-flex mr-3">
                        <input
                          type="radio"
                          className="spaceRadio"
                          disabled
                          value="0"
                          name="yesadmin"
                        />
                        No
                      </span>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>
                    Scope of work<span className="declined">*</span>
                  </label>

                  <CKEditor
                    editor={ClassicEditor}
                    height="600px"
                    config={{
                      highlight: {
                        options: [
                          {
                            model: "greenMarker",
                            class: "marker-green",
                            title: "Green marker",
                            color: "var(--ck-highlight-marker-green)",
                            type: "marker",
                          },
                          {
                            model: "redPen",
                            class: "pen-red",
                            title: "Red pen",
                            color: "var(--ck-highlight-pen-red)",
                            type: "pen",
                          },
                        ],
                      },
                      fontFamily: {
                        options: [
                          "default",
                          "Ubuntu, Arial, sans-serif",
                          "Ubuntu Mono, Courier New, Courier, monospace",
                        ],
                      },
                      fontColor: {
                        colors: [
                          {
                            color: "hsl(0, 0%, 0%)",
                            label: "Black",
                          },
                          {
                            color: "hsl(0, 0%, 30%)",
                            label: "Dim grey",
                          },
                          {
                            color: "hsl(0, 0%, 60%)",
                            label: "Grey",
                          },
                          {
                            color: "hsl(0, 0%, 90%)",
                            label: "Light grey",
                          },
                          {
                            color: "hsl(0, 0%, 100%)",
                            label: "White",
                            hasBorder: true,
                          },

                          // ...
                        ],
                      },
                      toolbar: [
                        " highlight",
                        "heading",
                        "bold",
                        "fontColor",
                        "italic",
                        "bulletedList",
                        "numberedList",
                        "undo",
                        "redo",
                      ],
                    }}
                    className={classNames("form-control", {
                      "is-invalid": errors.p_fact,
                    })}
                    id="textarea22"
                    rows="6"
                    onChange={(event, editor) => {
                      addDet(editor.getData());
                    }}
                  ></CKEditor>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label>Client name</label>
                  <input
                    type="text"
                    name="p_name"
                    className="form-control"
                    value={custname}
                    ref={register}
                    disabled
                  />
                </div>
                <div class="form-group">
                  <label>Copy to</label>
                  <Select
                    isMulti={true}
                    onChange={(e) => clientFun(e)}
                    options={client}
                  />
                </div>
                <div class="form-group">
                  <label>
                    Amount<span className="declined">*</span>
                  </label>
                  <input
                    type="text"
                    name="p_fixed"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_fixed || diserror,
                    })}
                    ref={register({ required: true })}
                    placeholder="Enter Amount"
                    onChange={(e) => handleChange(e)}
                    value={totalAmount}
                  />
                </div>
                {store === "4" ? (
                  <div class="form-group">
                    <label>Start date</label>
                    <input
                      type="date"
                      name="start_date"
                      className="form-control"
                      ref={register({ required: true })}
                      value={startDate}
                      min={item}
                      onChange={(e) => startFun(e)}
                    />
                  </div>
                ) : (
                  " "
                )}

                {store === "1" ? (
                  <div class="form-group">
                    <label>Due dates</label>
                    <input
                      type="date"
                      name="p_inst_date"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_inst_date,
                      })}
                      onChange={(e) => setDate(e.target.value)}
                      ref={register({ required: true })}
                      placeholder="Enter Hourly basis"
                      min={item}
                    />
                  </div>
                ) : store === "2" ? (
                  <div class="form-group">
                    <label>No of installments</label>
                    <Select
                      onChange={(e) => installmentHandler(e)}
                      options={no_installments}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div>
                  {store === "3" ? (
                    <>
                      <div className="row">
                        <div class="col-md-6 my-2">
                          <label>Start date</label>
                          <input
                            type="date"
                            className="form-control"
                            name="start_todate"
                            ref={register({ required: true })}
                            max={endDate}
                            value={startDate}
                            min={item}
                            onChange={(e) => startFun(e)}
                          />
                        </div>
                        <div class="col-md-6 my-2">
                          <label>End date</label>
                          <input
                            type="date"
                            value={endDate}
                            name="end_toDate"
                            ref={register({ required: true })}
                            className="form-control"
                            min={fromMax}
                            onChange={(e) => endFun(e)}
                          />
                        </div>
                        <div
                          onChange={(e) => getSubPlan(e)}
                          className="subPaymentPlan"
                        >
                          <div className="col-md-6">
                            <span className="d-flex">
                              <input
                                type="radio"
                                className="spaceRadio"
                                value="1"
                                name="paymentPlan"
                              />
                              Installment payment
                            </span>
                          </div>
                          <div className="col-md-6">
                            <span className="d-flex">
                              <input
                                type="radio"
                                className="spaceRadio"
                                value="2"
                                name="paymentPlan"
                              />
                              Monthly payment
                            </span>
                          </div>
                        </div>
                      </div>

                      {subPlan === "1" ? (
                        <div class="form-group">
                          <label>No of installments</label>
                          <Select
                            onChange={(e) => installmentHandler(e)}
                            options={no_installmentRange}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {subPlan === "2" ? (
                        <div className="row">
                          <div className="col-md-12">
                            <div class="form-group d-flex justify-content-center">
                              <label
                                style={{
                                  whiteSpace: "nowrap",
                                  margin: "auto 5px",
                                }}
                              >
                                Due date- date of month
                              </label>
                              <select
                                class="form-control"
                                name="date_month"
                                ref={register({ required: true })}
                                onChange={(e) => myMonthValue(e)}
                                min={item}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    " "
                  )}

                  {store === "4" ? (
                    <>
                      <div class="form-group d-flex justify-content-center">
                        <label
                          style={{
                            whiteSpace: "nowrap",
                            margin: "auto 5px",
                          }}
                        >
                          Due Date- date of month
                        </label>
                        <select
                          class="form-control"
                          ref={register({ required: true })}
                          name="date_month"
                          onChange={(e) => myMonthValue(e)}
                          min={item}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                          <option value="24">24</option>
                          <option value="25">25</option>
                          <option value="26">26</option>
                          <option value="27">27</option>
                          <option value="28">28</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    " "
                  )}
                </div>

                {store === "2" ? (
                  <Payment
                    installment={installment.label}
                    paymentAmount={paymentAmount}
                    paymentDate={paymentDate}
                    installment_amount={allAmount}
                    totalAmount={totalAmount}
                    item={item}
                    dateError={dateError}
                    allAmount={allAmount}
                    min={item}
                    max={endDate}
                  />
                ) : (
                  ""
                )}

                {store === "3" ? (
                  <Payment
                    installment={installment.label}
                    installment_amount={allAmount}
                    paymentAmount={paymentAmount}
                    paymentDate={paymentDate}
                    totalAmount={totalAmount}
                    min={item}
                    max={endDate}
                    item={startDate}
                    dateError={dateError}
                    allAmount={allAmount}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>

            <div class="form-group col-md-6">
              {loading ? (
                <Spinner color="primary" />
              ) : (
                <button type="submit" class="customBtn">
                  Submit
                </button>
              )}
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
