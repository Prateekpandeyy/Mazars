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
import Swal from 'sweetalert2'
function EditComponent(props) {

  const alert = useAlert();
  const { register, handleSubmit, reset, errors } = useForm();
  const userid = window.localStorage.getItem("tlkey");
  const [loading, setLoading] = useState(false);

  const [custId, setCustId] = useState("");
  const [store, setStore] = useState("1");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
 
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
  const [totalAmount, setTotalAmount] = useState("")
  const [dateMonth, setDateMonth] = useState("")
  const [fromMax, setFromMax] = useState(current_date)
  const [invoice, setInvice] = useState("")
  const [invoiceTl, setInvoicetl] = useState("")
  const [invoiceAdmin, setInvoiceAdmin] = useState("")
  const [tlDisable, setTlDisable] = useState(true);
  const [tpDisable, setTpDisable] = useState("")
  const [adminValue, setAdminValue] = useState(null)
  const [freeze2, setFreeze] = useState([])
  const [allAmount, setAllAmount] = useState({
    remainAmount : [],
    freezeAmount : [],
    completeAmount : []
  })
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
  const [subPlan, setSubplan] = useState("0");
  const [optionDisable, setOptionDisable] = useState(false)
  const [invoiceValue, setInviceValue] = useState({
    installment_number : "",
    due_dates : "",
    amount : "",
    invoiceAmount : 0,
    remainAmount : 0
  })
  const [formInstallmentInfo, setFormInstallmentInfo] = useState({
    dueDate :[],
    amount : [],
  boxDisable : [0]
  })
  const [invoiceAmount, setinvoiceAmount] = useState(0);
  const [installmentAmount, sentInstallmentAmount] = useState(0);
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
    
      setCompanyName(res.data.result)
    })
  }
  useEffect(() => {
    getCompany()
    getQuery();
  }, []);
  useEffect(() => {
    getClient()
  }, [])


  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${baseUrl}/customers/allname?id=${id}`, myConfig);
      setCustId(res.data.id);
    };
    getUser();
  }, [id]);

  const getQuery = () => {
    let amount = []
let due_date = [];
let installment_number = []
let invoiceAmount = 0;
let email = {}
var  collectData = []
let dis = []
let mainAmount = []
let mainDueDate = []
var installmentAmount = 0;
var actualInstallmentNumber = 0;
    axios.get(`${baseUrl}/tl/getProposalDetail?id=${id}`, myConfig).then((res) => {

      if (res.data.code === 1) {
        mainAmount = res.data.result.installment_amount.split(",")
        mainDueDate = res.data.result.due_date.split(",");
        let a = res.data.result.email.split(",")
        for(let i = 0; i < res.data.result.installment_amount.split(",").length; i++){
          dis.push(1)
        }
        setFormInstallmentInfo({
          dueDate : mainDueDate,
          amount : mainAmount,
          boxEnable : dis
        })
       
        if(res.data.result.invoice){
        
          res.data.result.invoice.map((i, e) => {
            dis[e] = 0
            amount.push(i.basic_amount)
          
            due_date.push(i.due_date);
            installment_number.push(i.installment_no)
            invoiceAmount = invoiceAmount + Number(i.basic_amount)
           })
          
           setInviceValue({
            installment_number : installment_number,
            due_dates : due_date,
            amount : amount,
            invoiceAmount : invoiceAmount,
            // remainAmount : Number(res.data.result.amount) - Number(invoiceAmount)
           })
        
        due_date.map((i, e) =>{
       
          mainDueDate[e] = i;
        })
      // console.log("mainDueDate", mainDueDate)
        amount.map((i, e) =>{
        
          mainAmount[e] = i;
        })
      //  console.log("mainDueDate", mainDueDate)
      installmentAmount = Number(res.data.result.amount) - Number(invoiceAmount)
      actualInstallmentNumber = Number(res.data.result.no_of_installment) - Number(installment_number.length)
     
          if(installmentAmount < 1 || actualInstallmentNumber < 1){
            installmentAmount = 0
          }
          else{
          
            installmentAmount = installmentAmount / actualInstallmentNumber
          }
         
          dis.map((i, e) => {
            if(i === 1){
              mainAmount[e] = installmentAmount 
            }
          })  
          // console.log("mainDueDate", mainDueDate)

          // setFormInstallmentInfo({
          //   dueDate : mainDueDate,
          //   amount : mainAmount,
          //   boxEnable : dis
          // })
          
          //  setFreeze(amount)
        }
         else{
        
          setInviceValue({
            installment_number : installment_number,
            due_dates : res.data.result.due_date.split(","),
            amount : amount,
            invoiceAmount : invoiceAmount,
            // remainAmount : Number(res.data.result.amount) - Number(invoiceAmount)
          })
         }   
      
        if(res.data.result.email.length > 0){
       
          a.map((i) => {
          
            email = {
              label : i,
              value : i
            }
            collectData.push(email)
            setClient(collectData)
          })
        }
    
        if(res.data.result.admin_iba === "1"){
          setOptionDisable(true)
          setTlDisable(true)
          setTpDisable(true)
         
        }
        else{
          setTpDisable(false)
          if(res.data.result.tp_iba === "0"){
           
            setTlDisable(true)
          }
          else {
            setTlDisable(false)
          }
        }
        setTotalAmount(res.data.result.amount)
        setDateMonth(res.data.result.date_month)
        setSubplan(res.data.result.sub_payment_plane)
        setCompany2(res.data.result.company)
        setEmail(res.data.result.email)
        setValue2(res.data.result.description)
        setStore(res.data.result.payment_plan)
        setInstallment(res.data.result.no_of_installment)
        setDateMonth(res.data.result.due_date)
        setStartDate(res.data.result.start_date)
        setEndDate(res.data.result.end_date)
        setDate(res.data.result.due_date)
        setInvice(res.data.result.tp_iba)
        setInvoicetl(res.data.result.tl_iba);
        setAdminValue(res.data.result.admin_iba)
        setinvoiceAmount(invoiceAmount)
        setProposal({
          name: res.data.result.name,
          query: res.data.result.assign_no,
          fixed_amount: res.data.result.amount,
          description: res.data.result.description,
          installment_amount: res.data.result.installment_amount,
          due_date: res.data.result.due_date,
          payment : res.data.result.installment_amount
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

        setPayment(data1);
        setInstallment(data2);
        setAmount(res.data.result.installment_amount.split(","))
        setAllAmount({
        remainAmount : res.data.result.installment_amount.split(","),
        freezeAmount : amount,
        completeAmount : res.data.result.installment_amount
      })              
      }
    });
   
  };

 

const getClient = () => {
    let collectData = []
    axios.get(
      `${baseUrl}/tl/querycustomers?query_id=${id}`, myConfig
    )
    .then((res) => {
      let email = {}
      
      res.data.result.map((i) => {
     
        email = {
          label : i.email,
          value : i.email
        }
        collectData.push(email)
        
      })
     
      setClient2(collectData)
    })
  }


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
    // console.log("amount", amount)

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
    formData.append("amount", totalAmount);
    formData.append("installment_amount", formInstallmentInfo.amount); 
    formData.append("company", company2)
    formData.append("payment_plan", store);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate)
    formData.append("no_of_installment", installment.value);
    formData.append("date_month", dateMonth)
    formData.append("tl_iba", invoiceTl)
    formData.append("tp_iba", invoice)
    formData.append("admin_iba", invoiceAdmin)
    formData.append("sub_payment_plane", subPlan)
    store === "1" ?
      formData.append("due_date", lumsum) :
      store === "2" || store === "3" ?
        formData.append("due_date", formInstallmentInfo.dueDate)
         :
        formData.append("due_date", "")
       
        if((subPlan !== "2" && store === "2") || (subPlan !== "2" && store === "3")) {
       
          if (payment.length < 1) {
     
          }
           else if (store === "2" || store === "3") {
              if (installment == "") {
                Alerts.ErrorNormal(`Please select no of installment .`)
              } else
                if (!formInstallmentInfo.amount || !date) {
                  // console.log("date",formInstallmentInfo.amount)
                  Alerts.ErrorNormal(`Please enter all fields.`)
                } else if (formInstallmentInfo.amount && date) {
      
                  if (installment.value > 0) {
                    var a = Number(installment.value)
                
                    for (let i = 0; i < a; i++) {
      
                      if (formInstallmentInfo.amount[i] == "" || formInstallmentInfo.amount[i] == undefined || formInstallmentInfo.amount[i] <= 0) {
                       if(formInstallmentInfo.amount.length < 0){
                        Alerts.ErrorNormal(`Please enter amount`)
                        return false
                       }
                        
                      }
                      // if (!date) {
                      //   Alerts.ErrorNormal(`Please enter date`)
                      //   return false
                      // }
                    }
                    var sum  = 0;
                    // console.log("allAmount", amount)
                    if(formInstallmentInfo.amount.length > 0){
                      sum = formInstallmentInfo.amount.reduce(myFunction)
                    }
                    else {
                      sum = formInstallmentInfo.amount.reduce(myFunction)
                    }
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
        }

  
      else if (store === "1" || store === "4" || subPlan === "2") {

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
      setTotalAmount("")
      setdiserror("Please enter number only");
    }
    else if(e.target.value == "0"){
      setTotalAmount(e.target.value)
      setdiserror("Amount should be greater than zero")
    }
    else {
    
      
      
        calculateAmount(e.target.value, installment.value)
        setTotalAmount(e.target.value)
     
        setdiserror("");
    }
  };


  const paymentAmount = (data) => {
    // console.log("dataa", data)
    var array1 = []
    Object.entries(data).map(([key, value]) => {
      array1[key] = value
    });
   
    setFormInstallmentInfo({
      dueDate : formInstallmentInfo.dueDate,
      amount : array1,
      boxEnable : formInstallmentInfo.boxEnable
    })
  };

  const paymentDate = (data) => {
   
// console.log("data", data)
    var array2 = []
    Object.entries(data).map(([key, value]) => {
      array2.push(value)
    });
    setFormInstallmentInfo({
      dueDate : array2,
      amount : formInstallmentInfo.amount,
      boxEnable : formInstallmentInfo.boxEnable
    })

    // setDate(array2.slice(0, installment.value));
    // if(new Set(array2).size !== array2.length){
    //   setDateError(true)
    //  Alerts.ErrorNormal("Date must be unique")
    // }
    // else{
    //   setDateError(false)
    // }
  };
const calculateAmount = (totalAmount, installment) => {
let totalInstallAmount = totalAmount - invoiceAmount;
let actualInstallmentNumber = installment - invoiceValue.installment_number.length;
let installmentAmount = 0;
let boxAmount = []
let boxDisable = []
let due_date = []
// console.log("totalAmount", totalInstallAmount, actualInstallmentNumber)
if(totalInstallAmount < 1 || actualInstallmentNumber < 1){
  installmentAmount = 0
}
else{
  installmentAmount = totalInstallAmount / actualInstallmentNumber
}
// console.log("formInstallmentInfo", formInstallmentInfo)
for (let i = 0; i < installment; i++){
  boxAmount.push(installmentAmount);
  boxDisable.push(1)
}
for (let i = 0; i < invoiceValue.installment_number.length; i++){
// console.log("Iiii", invoiceValue.installment_number)
boxDisable[i] = 0;
boxAmount[i] = Number(invoiceValue.amount[i])
due_date[i] = Number(invoiceValue.due_dates[i])
}
setFormInstallmentInfo({
  boxEnable : boxDisable,
  amount : boxAmount,
  due_dates : due_date
})

}

  const installmentHandler = (key) => {
  calculateAmount(totalAmount, key.value)
let amount = Number(totalAmount) -  Number(invoiceValue.invoiceAmount);
let remaininvoiceno = Number(key.value) - Number(invoiceValue.installment_number.length);
let a = Math.round(amount / remaininvoiceno)
let dd = []

while (amount > a) {
   amount = amount - a;
   dd.push(a)
}
dd.push(amount)

    setInstallment(key)
    setClearValue(false)
   
    setAllAmount({
      remainAmount : dd,
      freezeAmount : freeze2,
      completeAmount : dd.concat(freeze2)
    })
  }

 
const clientFun = (e) => {
  setClient(e)
  let a = []
  e.map((i) => {
    a.push(i.value)
  })
 
  setEmail(a)
}
const startFun = (e) => {
 
  setFromMax(e.target.value)
  setStartDate(e.target.value)
}
const endFun = (e) => {
  
  setEndDate(e.target.value)
}
const myMonthValue = (e) => {
 
  setDateMonth(e.target.value)
}
const getInviceValue = (e) => {
if(e.target.value === "0"){
  setTlDisable(true)
}
else{
  setTlDisable(false)
}
  setInvice(e.target.value)
}
const getInvoiceAdmin  = (e) => {
  setInvoiceAdmin(e.target.value)
}
const getInvoicetl  = (e) => {
  
  setInvoicetl(e.target.value)
}
const getSubPlan  = (e) => {
  setInstallment([])
  setSubplan(e.target.value)
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
                <h4>Edit proposal</h4>
              </div>
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div style={{ display: "flex" }}>
              <div class="col-md-6">

                <div class="form-group">
                  <label>Query no.</label>
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
                    disabled = {optionDisable}
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
                  <label>Payment plan </label>
                  <select
                    class="form-control"
                    ref={register}
                    disabled = {optionDisable}
                    value = {store}
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
                    <option value="1">Fixed amount-lumpsum payment</option>
                    <option value="2">Fixed amount-instalment plan</option>
                    <option value="3">Retainership plan-specified period</option>
                    <option value="4">Retainership plan-unspecified period</option>
                  </select>
                </div>
        {
          store === "1" ?
          <div className="myproposaloption">
             
        
          <div class="form-group">
          <label>Whether invoice(s) can be issued before acceptance of proposal by client</label>
             <div className="myInvice">
              
             {
               invoice === "1" ?
               <label className="mr-3"> 
               <input 
         type="radio"
          defaultChecked
          className="spaceRadio"
          
          disabled  
           value="1" 
           name="yesclient" />Yes
          
     </label> :
       <label className="mr-3"> 
       <input 
 type="radio"
 className="spaceRadio"
 
  disabled 
   value="1" 
   name="yesclient" />Yes
  
</label>
             }
   {
     invoice === "0" ?
     <label className="mr-3"> 
     <input 
         type="radio" 
     
         defaultChecked
         disabled 
          value="0" 
           name="yesclient"/>No
        
     </label> :
       <label className="mr-3"> 
       <input 
           type="radio" 
           
           disabled 
            value="0" 
             name="yesclient"/>No
          
       </label>
   }
           </div> 
          
         </div> 
        
           <div class="form-group">
           <label>Approval of Team Leader for such issue of invoice(s)</label>
          
             <div className="myInvice">
              
             {
               invoiceTl === "1" ?
               <label className="mr-3"> 
               <input 
         type="radio"
         className="spaceRadio"
          defaultChecked
          
           disabled
           value="1" 
           name = "yestl" />Yes
          
     </label> :
       <label className="mr-3"> 
       <input 
       className="spaceRadio"
 type="radio"
 

   disabled  
   value="1" 
   name = "yestl" />Yes
   
</label>
             }
   {
     invoiceTl === "0" ?
     <label className="mr-3"> 
     <input 
         type="radio" 
         
         defaultChecked
         disabled
         className="spaceRadio"
          value="0" 
          name = "yestl"/>No
        
     </label> :
       <label className="mr-3"> 
       <input 
           type="radio" 
           className="spaceRadio"
         
           disabled 
            value="0" 
            name = "yestl"/>No
          
       </label>
   }
           </div> 
          
         </div> 
    
      {
       adminValue === null ?
       <div class="form-group">
       <label>Approval of Admin for such issue of invoice(s)</label>
       <div onChange={(e) => getInvoiceAdmin(e)} className="myInvice">
    <label className="mr-3">
    <input 
     type="radio" className="spaceRadio" value="0" disabled name="yesadmin" />Yes
     </label>
      <label className="mr-3">
      <input 
     type="radio" className="spaceRadio" value="1" disabled name = "yesadmin"/>No
       </label>
     </div>
     </div> : 
     <>
     {
       adminValue === "0" ?
       <div class="form-group">
       <label>Approval of Admin for such issue of invoice(s)</label>
       <div className="myInvice">
    <label className="mr-3">
    <input 
     type="radio" className="spaceRadio" value="0" disabled name="yesadmin" />Yes
     </label>
      <label className="mr-3">
      <input 
     type="radio" defaultChecked className="spaceRadio" value="1" disabled name = "yesadmin"/>No
       </label>
     </div>
     </div>  :
     <div class="form-group">
     <label>Approval of Admin for such issue of invoice(s)</label>
     <div className="myInvice">
  <label className="mr-3">
  <input 
   type="radio" defaultChecked className="spaceRadio" value="0" disabled name="yesadmin" />Yes
   </label>
    <label className="mr-3">
    <input 
   type="radio" className="spaceRadio" value="1" disabled name = "yesadmin"/>No
     </label>
   </div>
   </div> 
     }
     </>
      }
     </div> :
       <div className="myproposaloption">
             
        
       <div class="form-group">
       <label>Whether invoice(s) can be issued before acceptance of proposal by client</label>
          <div className="myInvice">
           
          {
            invoice === "1" ?
            <label className="mr-3"> 
            <input 
      type="radio"
       defaultChecked
       className="spaceRadio"
       onChange={(e) => getInviceValue(e)}
       disabled = {tpDisable} 
        value="1" 
        name="yesclient" />Yes
       
  </label> :
    <label className="mr-3"> 
    <input 
type="radio"
className="spaceRadio"
onChange={(e) => getInviceValue(e)}
disabled = {tpDisable} 
value="1" 
name="yesclient" />Yes

</label>
          }
{
  invoice === "0" ?
  <label className="mr-3"> 
  <input 
      type="radio" 
      onChange={(e) => getInviceValue(e)}
      defaultChecked
      disabled = {tpDisable} 
       value="0" 
        name="yesclient"/>No
     
  </label> :
    <label className="mr-3"> 
    <input 
        type="radio" 
        onChange={(e) => getInviceValue(e)}
        disabled = {tpDisable} 
         value="0" 
          name="yesclient"/>No
       
    </label>
}
        </div> 
       
      </div> 
     
        <div class="form-group">
        <label>Approval of Team Leader for such issue of invoice(s)</label>
       
          <div className="myInvice">
           
          {
            invoiceTl === "1" ?
            <label className="mr-3"> 
            <input 
      type="radio"
      className="spaceRadio"
       defaultChecked
       onChange={(e) => getInvoicetl(e)}
        disabled = {tlDisable} 
        value="1" 
        name = "yestl" />Yes
       
  </label> :
    <label className="mr-3"> 
    <input 
    className="spaceRadio"
type="radio"

onChange={(e) => getInvoicetl(e)}
disabled = {tlDisable} 
value="1" 
name = "yestl" />Yes

</label>
          }
{
  invoiceTl === "0" ?
  <label className="mr-3"> 
  <input 
      type="radio" 
      onChange={(e) => getInvoicetl(e)}
      defaultChecked
      disabled = {tlDisable}
      className="spaceRadio"
       value="0" 
       name = "yestl"/>No
     
  </label> :
    <label className="mr-3"> 
    <input 
        type="radio" 
        className="spaceRadio"
        onChange={(e) => getInvoicetl(e)}
        disabled = {tlDisable}
         value="0" 
         name = "yestl"/>No
       
    </label>
}
        </div> 
       
      </div> 
  
   {
    adminValue === null ?
    <div class="form-group">
    <label>Approval of Admin for such issue of invoice(s)</label>
    <div onChange={(e) => getInvoiceAdmin(e)} className="myInvice">
 <label className="mr-3">
 <input 
  type="radio" className="spaceRadio" value="0" disabled name="yesadmin" />Yes
  </label>
   <label className="mr-3">
   <input 
  type="radio" className="spaceRadio" value="1" disabled name = "yesadmin"/>No
    </label>
  </div>
  </div> : 
  <>
  {
    adminValue === "0" ?
    <div class="form-group">
    <label>Approval of Admin for such issue of invoice(s)</label>
    <div className="myInvice">
 <label className="mr-3">
 <input 
  type="radio" className="spaceRadio" value="0" disabled name="yesadmin" />Yes
  </label>
   <label className="mr-3">
   <input 
  type="radio" defaultChecked className="spaceRadio" value="1" disabled name = "yesadmin"/>No
    </label>
  </div>
  </div>  :
  <div class="form-group">
  <label>Approval of Admin for such issue of invoice(s)</label>
  <div className="myInvice">
<label className="mr-3">
<input 
type="radio" defaultChecked className="spaceRadio" value="0" disabled name="yesadmin" />Yes
</label>
 <label className="mr-3">
 <input 
type="radio" className="spaceRadio" value="1" disabled name = "yesadmin"/>No
  </label>
</div>
</div> 
  }
  </>
   }
  </div>
        }
             
                <div class="form-group">
                  <label>Scope of work<span className="declined">*</span></label>
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
                 
                </div>
              </div>


              <div class="col-md-6">
                <div class="form-group">
                  <label>Client name</label>
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
                    onBlur={(e) => {
                      if(invoiceValue.invoiceAmount > e.target.value){
                       Swal.fire({
                        
                        title : "error",
                        html : "Total Amount could not be less than created invoice",
                        icon : "error"
                       })
                       }
                    }}
                    onChange={(e) => handleChange(e)}
                    value = {totalAmount}
                  />
                </div>

                {
                  store === "4" ? (
                    <div class="form-group">
                    <label>Start date</label>  
                        <input
                            type="date"
                            ref={register({ required: true })}
                            name = "start_date"
                            className="form-control"
                           value = {startDate}
                           disabled = {optionDisable}
                           min = {item}
                           onChange={(e) => startFun(e)}
                        />
                    </div>
                  ) : " "
                }
             
                { store === "1" ? (
                  <div class="form-group">
                    <label>Due dates</label>
                    <input
                      type="date"
                      name="p_inst_date"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_inst_date
                      })}
                      onChange={(e) => setDate(e.target.value)}
                      ref={register({ required: true })}
                      placeholder="Enter Hourly basis"
                      min={item}
                      value={date}
                    />
                  </div>
                ) :
                  store === "2" ? (
                    <div class="form-group">
                      <label>No of installments</label>
                      <Select
                        onChange={(e => installmentHandler(e))}
                        value = {installment}
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
         
   
     <div className="row">
     <div class="col-md-6 my-2">
                    <label>Start date</label>  
                        <input
                            type="date"
                            className="form-control"
                            disabled = {optionDisable}
                            ref={register({ required: true })}
                           name = 'startTo_date'
                            value = {startDate}
                            min = {item}
                            max={endDate}
                           onChange={(e) => startFun(e)}
                        />
                    </div>
                    <div class="col-md-6 my-2">
                    <label>End date</label>  
                        <input
                      
                      
                            type="date"
                            value = {endDate}
                            ref={register({ required: true })}
                            name = 'endTo_date'
                            className="form-control"
                            min={fromMax}
                           onChange = {(e) => endFun(e)}
                        />
                    </div>
              
              
                <div onChange={(e) => getSubPlan(e)} className="subPaymentPlan">
                <div className="col-md-6">
                <span className="d-flex">
                  {
                    subPlan === "1" ?
                    <label>
                  <input 
                   type="radio" defaultChecked className="spaceRadio" value="1" name="paymentPlan" />Installment payment
                  </label> :
                  <label>
                  <input 
                   type="radio"  className="spaceRadio" value="1" name="paymentPlan" />Installment payment
                  </label>
                  }
                  </span>
                </div>
                  <div className="col-md-6">
                  <span className="d-flex">
                 {
                  subPlan === "2" ?
                  <label>
                  <input 
                  type="radio" defaultChecked  className="spaceRadio"  value="2" name = "paymentPlan"/>Monthly payment
                  </label> : 
                    <label>
                    <input 
                    type="radio"  className="spaceRadio" value="2" name = "paymentPlan"/>Monthly payment
                    </label>
                 }
                     </span>
                  </div>
                   </div> 
     </div>
   
                  
                 
                
              
               {
                 subPlan === "1" ?
                 <div class="form-group">
                      <label>No of installments</label>
                      <Select
                        onChange={(e => installmentHandler(e))}
                        value = {installment}
                        options={no_installmentRange}
                      />
                    </div> :
              ""
               }
 {
  subPlan === "2" ?
  <div class="form-group">
   <label>Due date- date of month
  </label>
   <select
     class="form-control"
     ref={register({ required: true })}
     name="date_month"
     onChange={(e) => myMonthValue(e)}
     min = {item}
     value = {dateMonth}
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
 </div> : ""
 }             
     </>
      ) : " "
    }

 
    
             

{
  store === "4" ? 
 <>
  <div class="form-group">
  <label>Due date- date of month
 </label>
  <select
    class="form-control"
    ref={register({ required: true })}
    name="date_month2"
    onChange={(e) => myMonthValue(e)}
    value = {dateMonth}
    
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

: " "
}
</div>

                {
                   store === "2"
                   ?
                  
                   
                    <Payment
                      installment={installment.label}
                      paymentAmount={paymentAmount}
                      paymentDate={paymentDate}
                      installment_amount={allAmount}
                      due_date={due_date}
                      getQuery={getQuery}
                      item={item}
                      clearValue={clearValue}
                      totalAmount={totalAmount}
                      min={item}
                      dateError = {dateError}
                      invoiceValue = {invoiceValue}
                      allAmount = {allAmount}
                      boxFormData = {formInstallmentInfo}
                    /> 
                    : ""
                }
                                {
                   store === "3" && subPlan === "1"
                   ?
                   <Payment
                   installment={installment.label}
                   paymentAmount={paymentAmount}
                   paymentDate={paymentDate}
                   installment_amount={allAmount}
                   due_date={due_date}
                   getQuery={getQuery}
                   invoiceValue = {invoiceValue}
                   clearValue={clearValue}
                   totalAmount={totalAmount}
                   min={startDate}
                   max={endDate}
                   item={startDate}
                   dateError = {dateError}
                   boxFormData = {formInstallmentInfo}
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