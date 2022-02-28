import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState , useEffect, useRef} from 'react';
import classNames from "classnames";
import { baseUrl, baseUrl3 } from "../../../config/config";
import './Admin.css';
import Select from 'react-select';
import Layout from "../../../components/Layout/Layout";
import { Typography, Button } from '@material-ui/core';
import Mandatory from '../../../components/Common/Mandatory';
import { useHistory } from 'react-router';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
const Report = () => {
    const userid = window.localStorage.getItem("tpkey");
    const selectInputRef = useRef();
    const selectInputRef2 = useRef();
    const selectInputRef3 = useRef();
    const selectInputRef4 = useRef();
    const selectInputRef5 = useRef();
    const selectInputRef6 = useRef();
    const [subCategory, setSubCategory] = useState([]);
    const [subData, subCategeryData] = useState([])
    const [custCate, setCustcate] = useState([])
    const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store, setStore] = useState([]);
  const [error, setError] = useState()
  const [error2, setError2] = useState();
  const [mcatname, setmcatname] = useState([]);
  const [nn, setNn] = useState([])
  const [mcategory, setmcategory] = useState([]);
  const [categoryData, setCategoryData] = useState([])
  const [custCate2, setCustcate2] = useState([]);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [taxId, setTaxId] = useState("");
  const [taxxId, setTaxxId] = useState("")
  const [teamleader44, setTeamleader44] = useState("") 
  const [taxprofessional44, setTaxprofessional44] = useState("")
  const [qno, setQno] = useState()
  const [custData, setcustData] = useState();
  const [cname, setcName] = useState("")
  const [qqno, setQqno] = useState("")
  const [checkBox, setCheckBox] = useState(null);
  const [proposalCheckbox, setProposalCheckbox] = useState(null)
  const [assignmentCheckbox, setAssignmentCheckbox] = useState(null)
  const [paymnetCheckbox, setPaymentCheckbox] = useState(null)
  const [tlName, setTlName] = useState()
  const gettpName = Cookies.get("tpName")
  var kk = []
  var pp = []

  var vv = []
const tpName = {
 "value" : JSON.parse(userid),
  "label" : gettpName
}
  var allData1 = {}
  var dir = []
  var indir = []
  const [dd, setDd] = useState([]);
const history = useHistory()
    const { handleSubmit, register, errors, getValues , reset} = useForm();
    let date = new Date()
    var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
 const firstDay = new Date(date.getFullYear() + + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2));
  const [item] = useState(current_date);
const [item2, setItem2] = useState(current_date)
  useEffect(() => {
    const getCategory = async () => {
      await axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
        if (res.data.code === 1) {
       
          setTax(res.data.result);
        }
      });
    };

    getCategory();
  }, []);

  useEffect(() => {
    const getSubCategory = async () => {

      await axios.get(`${baseUrl}/customers/getCategory?pid=${store}`).then((res) => {

        if (res.data.code === 1) {
          setTax2(res.data.result)
        }
      });
    };
    getSubCategory();
  }, [store]);

  useEffect(() => {
    getTeamLeader();
    getData();
    getupdateQuery()
    getTaxProf();
  }, []);
  useEffect(() => {
    getTeamLeader();
getTaxProf();
  }, [taxId, taxxId, cname])
const getupdateQuery = () => {
 
     axios.get(`${baseUrl}/admin/getAllQueryList?customer=${cname}`)
    .then((res) => {
      if (res.data.code === 1) {
       
        var data = res.data.result;
         console.log("response", res.data.result)
         let b = res.data.result
         setQno(b.map(getqNo))
      }
    })
       
}
  const getTeamLeader = () => {
    axios.get(`${baseUrl}/tp/gettpuserinfo?id=${JSON.parse(userid)}`).then((res) => {
    
     console.log("res", res.data.result)
     setTlName({
       label : res.data.result.parent_post_name,
       value : res.data.result.parent_user
     })
    });
  };



  const getTaxProf = () => {
    axios
      .get(`${baseUrl}/tp/getTaxProfessional?tl_id=${JSON.parse(userid)}`)
      .then((res) => {
      
        if (res.data.code === 1) {
          console.log("taxprofessional", res.data.result)
          setData2(res.data.result);
         
        }
      });
  };
  let pk = []
  const custName = (a) => {
    console.log("done")
   
    a.map((r) => {
      pk.push(r.value)
    })
    setcName(pk)
   
    
  }
 

  const getData = () => {
    axios
    .get(`${baseUrl}/tl/allClient?tp_id=${JSON.parse(userid)}`)
      .then((res) => {
       console.log("dataClinet", res.data.result)
        var a = res.data.result;
        if (a) {
          setcustData(a.map(mapAppointmentData));
        }
      });
  };

const mapAppointmentData = ((appiontmentData) => ({
"label" : appiontmentData.name,
"value" : appiontmentData.id
}))
const getqNo = ((i) => ({
  "label" : i.assign_no,
   "value" : i.assign_no
}))
  const options = tax.map(d => (
    {
      "value": d.id,
      "label": d.details
    }))

  const options2 = tax2.map(v => ({
    "value": v.id,
    "label": v.details
  }))
  const options3 = data.map(d => (
    {
      "value": d.id,
      "label": d.name
    }))
    const options4 = data2.map(d => (
      {
        "value": d.id,
        "label": d.name
      }))
const resetData = () => {
 console.log("done")
reset()
selectInputRef5.current.select.clearValue();
selectInputRef6.current.select.clearValue();
selectInputRef3.current.select.clearValue();
selectInputRef4.current.select.clearValue();
setCheckBox(null);
setProposalCheckbox(null);
setAssignmentCheckbox(null);
setPaymentCheckbox(null);
setQno([])
}
    const onSubmit = (value) => {
     
   

     let basic_info = false
     let proposal_info = false
     let assignment_info = false
     let payment_info = false
     if(value.process_status || value.assessment || value.brief_fact_case || value.purpose_p || value.p_format || value.t_requested || value.spc_que || value.doa){
      basic_info = true
     }
     if(value.dateProposal || value.amount_receipt || value.proposedAmount || value.paymentTerms || value.proposal_status || value.acceptedAmount
      || value.paymentDeclinedReason || value.date_acceptance || value.amountOutstanding
      || value.amount_overdue || value.declinedDate){
        proposal_info = true
      }
   if(value.assignDate || value.completionDate || value.assignStatus || value.completionQuery || value.assignTime){
     assignment_info = true
   }
   if(value.receiptDate || value.amountReceived || value.invoice_number || value.dos 
    || value.basic_amount || value.pocket_expensive || value.cget_tax || value.sgst_tax ||
    value.igst_tax || value.total_gst || value.total_invoice || value.tds 
    || value.receiptDate || value.amount_type || value.amountReceived){
     payment_info = true
   }
   if(value.search_pay_amount){
    if(payment_info){
      let formData = new FormData();
      formData.append("amount_receipt", Number(value.amount_receipt));
      formData.append("report_name", value.report_name)
      formData.append("basic_info", Number(basic_info));
      formData.append("proposal_info", Number(proposal_info));
      formData.append("assignment_info", Number(assignment_info));
      formData.append("payment_info", Number(payment_info))
      formData.append("from", value.p_from);
      formData.append("to", value.p_to);
      formData.append("customer_name", cname)
      formData.append("teamleader", tlName.value)
      formData.append("query_no", qqno)
      formData.append("category", mcatname);
      formData.append("subCategory", dd);
      formData.append("q_no", Number(value.qno));
      formData.append("date_query", Number(value.dataQuery));
      formData.append("cust_id", Number(value.cust_id));
      formData.append("basic_category", Number(value.basicCategory));
      formData.append("basic_sub_category", Number(value.basic_sub_category));
      formData.append("assessment", Number(value.assessment));
      formData.append("purpose", Number(value.purpose_p));
      formData.append("p_format", Number(value.p_format));
      formData.append("t_requested", Number(value.t_requested));
      formData.append("spc_que", Number(value.spc_que));
      formData.append("date_allocation", Number(value.doa));
      formData.append("brief_fact_case", Number(value.brief_fact_case))
      // formData.append("teamleader", Number(value.tl_name));
      // formData.append("taxprofessional", Number(value.tp_name));
      formData.append("date_proposal", Number(value.dateProposal));
      formData.append("proposed_amount", Number(value.proposedAmount));
      formData.append("payment_terms", Number(value.paymentTerms));
      formData.append("proposal_status", Number(value.proposal_status));
      formData.append("accepted_amount", Number(value.acceptedAmount));
      formData.append("payment_declined_reasen", Number(value.paymentDeclinedReason));
      formData.append("date_of_acceptance", Number(value.date_acceptance));
      // formData.append("amount_received", value.amountReceived);
      formData.append("amount_outstanding", Number(value.amountOutstanding));
      formData.append("amount_overdue", Number(value.amount_overdue));
      formData.append("payment_declined", Number(value.declinedDate));
      // formData.append("assignment_number", Number(value.assignNumber));
      formData.append("assign_date", Number(value.assignDate));
      formData.append("proposed_completion_date", Number(value.completionDate));
      formData.append("assignment_status", Number(value.assignStatus));
      formData.append("date_complation", Number(value.completionQuery));
      formData.append("assign_time", Number(value.assignTime));
      formData.append("payment_recived_date", Number(value.receiptDate));
      formData.append("basic_amount", Number(value.basic_amount));
      formData.append("pocket_expensive", Number(value.pocket_expensive));
      formData.append("cget_tax", Number(value.cget_tax));
      formData.append("igst_tax", Number(value.igst_tax));
      formData.append("sgst_tax", Number(value.sgst_tax));
      formData.append("invoice_amount", Number(value.total_invoice));
      formData.append("total_gst", Number(value.total_gst));
      formData.append("process_status", Number(value.process_status));
      formData.append("tds", Number(value.tds));
     
      formData.append("amount_received", Number(value.amountReceived));
      formData.append("uid", JSON.parse(userid))
      formData.append("t", Math.floor(Math.random() * 110000))
      formData.append("amount_type", Number(value.amount_type));
      formData.append("dos", Number(value.dos));
      formData.append("invoice_number", Number(value.invoice_number));
      formData.append("search_pay_amount", Number(value.search_pay_amount))
 axios({
   method : "POST",
   url : `${baseUrl}/report/generateReport?t=${JSON.stringify(Math.floor(Math.random() * 110000))}`,
   data : formData

 })
 .then(function (response) {
 if(response.data.code === 1){
   Swal.fire({
     title : "success",
     html : "Report generated successfully",
     icon : "success"

   })
  window.open(`${baseUrl3}/${response.data.result}`)
 }
 else{
   Swal.fire({
     title : "error",
     html : "Something went wrong , please try again",
     icon :"error"
   })
 }
 })
 .catch((error) => {

 });
 
    }
    else{
      Swal.fire({
        title : "error",
        html : "Please select atleast one feild iin payment section",
        icon : "error"
      })
    }
  }
  else if(basic_info === false || proposal_info === false || assignment_info === false 
    ||  payment_info === false){
    Swal.fire({
      title : "error",
      html : "Please select atleast one field",
      icon : "error"
    })
  }

  else{
    let formData = new FormData();
    formData.append("amount_receipt", Number(value.amount_receipt));
    formData.append("report_name", value.report_name)
    formData.append("basic_info", Number(basic_info));
    formData.append("proposal_info", Number(proposal_info));
    formData.append("assignment_info", Number(assignment_info));
    formData.append("payment_info", Number(payment_info))
    formData.append("from", value.p_from);
    formData.append("to", value.p_to);
    formData.append("customer_name", cname)
    formData.append("teamleader", tlName.value)
    formData.append("query_no", qqno)
    formData.append("category", mcatname);
    formData.append("subCategory", dd);
    formData.append("q_no", Number(value.qno));
    formData.append("date_query", Number(value.dataQuery));
    formData.append("cust_id", Number(value.cust_id));
    formData.append("basic_category", Number(value.basicCategory));
    formData.append("basic_sub_category", Number(value.basic_sub_category));
    formData.append("assessment", Number(value.assessment));
    formData.append("purpose", Number(value.purpose_p));
    formData.append("p_format", Number(value.p_format));
    formData.append("t_requested", Number(value.t_requested));
    formData.append("spc_que", Number(value.spc_que));
    formData.append("date_allocation", Number(value.doa));
    formData.append("brief_fact_case", Number(value.brief_fact_case))
    // formData.append("teamleader", Number(value.tl_name));
    // formData.append("taxprofessional", Number(value.tp_name));
    formData.append("date_proposal", Number(value.dateProposal));
    formData.append("proposed_amount", Number(value.proposedAmount));
    formData.append("payment_terms", Number(value.paymentTerms));
    formData.append("proposal_status", Number(value.proposal_status));
    formData.append("accepted_amount", Number(value.acceptedAmount));
    formData.append("payment_declined_reasen", Number(value.paymentDeclinedReason));
    formData.append("date_of_acceptance", Number(value.date_acceptance));
    // formData.append("amount_received", value.amountReceived);
    formData.append("amount_outstanding", Number(value.amountOutstanding));
    formData.append("amount_overdue", Number(value.amount_overdue));
    formData.append("payment_declined", Number(value.declinedDate));
    // formData.append("assignment_number", Number(value.assignNumber));
    formData.append("assign_date", Number(value.assignDate));
    formData.append("proposed_completion_date", Number(value.completionDate));
    formData.append("assignment_status", Number(value.assignStatus));
    formData.append("date_complation", Number(value.completionQuery));
    formData.append("assign_time", Number(value.assignTime));
    formData.append("payment_recived_date", Number(value.receiptDate));
    formData.append("basic_amount", Number(value.basic_amount));
    formData.append("pocket_expensive", Number(value.pocket_expensive));
    formData.append("cget_tax", Number(value.cget_tax));
    formData.append("igst_tax", Number(value.igst_tax));
    formData.append("sgst_tax", Number(value.sgst_tax));
    formData.append("invoice_amount", Number(value.total_invoice));
    formData.append("total_gst", Number(value.total_gst));
    formData.append("process_status", Number(value.process_status));
    formData.append("tds", Number(value.tds));
   
    formData.append("amount_received", Number(value.amountReceived));
    formData.append("uid", JSON.parse(userid))
    formData.append("t", Math.floor(Math.random() * 110000))
    formData.append("amount_type", Number(value.amount_type));
    formData.append("dos", Number(value.dos));
    formData.append("invoice_number", Number(value.invoice_number));
    formData.append("search_pay_amount", Number(value.search_pay_amount))
axios({
 method : "POST",
 url : `${baseUrl}/report/generateReport?t=${JSON.stringify(Math.floor(Math.random() * 110000))}`,
 data : formData

})
.then(function (response) {
if(response.data.code === 1){
 Swal.fire({
   title : "success",
   html : "Report generated successfully",
   icon : "success"

 })
window.open(`${baseUrl3}/${response.data.result}`)
}
else{
 Swal.fire({
   title : "error",
   html : "Something went wrong , please try again",
   icon :"error"
 })
}
})
.catch((error) => {

});

  }
    }

    // Category 
    const category2 = (v) => {
let cc = []
      setCategoryData(v)
      setNn((oldData) => {
        return [...oldData, mcategory]
      })
      setError("")
      setCustcate(v)
      v.map((val) => {
        vv.push(val.value)
        cc.push(val.value)
        setmcategory(val.value);
       
        setStore(val.value)
      })
  
  setmcatname(cc)
      if (vv.length > 0) {
        if (vv.includes("1") && vv.includes("2")) {
       
        }
        else if (vv.includes("1")) {
  
          for (let i = 0; i < subData.length; i++) {
            if (subData[i].value < 9) {
              kk.push(subData[i])
            }
          }
          subCategeryData(kk)
        }
        else if (vv.includes("2")) {
  
          for (let i = 0; i < subData.length; i++) {
            if (subData[i].value > 8) {
              kk.push(subData[i])
            }
          }
          subCategeryData(kk)
        }
      }
  
      else if (vv.length === 0) {
        subCategeryData("")
      }
  
    }

    // Sub Category Function 
    const subCategory22 = (e) => {
  let kk = []
      subCategeryData(e)
      setCustcate2(e)
      setError2("")
     
      e.map((i) => {
  
      kk.push(i.value)
      })
     setDd(kk)
      
    }
   
  const teamLeader = (a) => {
 let tk = []
    a.map((i) => {
    
      setTaxId(i.value) 
     tk.push(i.value)
    })
    setTeamleader44(tk)
  }
  const taxProfessional = (e) => {
    let kk2 = []
    e.map((i) => {
      
      kk2.push(i.value)
      setTaxxId(i.value)
    })
    setTaxprofessional44(kk2)
    
  }
  const queryNumber = (e) => {
    console.log("aaa", e)
    let kk4 = []
    e.map((i) => {
      
      kk4.push(i.value)
    })
    setQqno(kk4)
  }
  const selectAllbasic = (e) => {
    if(checkBox === null){
     setCheckBox(true);
    }
   else{
     setCheckBox(null)
   }
     }
    const selectAllproposal = (e) => {
      if(proposalCheckbox === null){
        setProposalCheckbox(true)
      }
      else{
        setProposalCheckbox(null)
      }
   
    }
    const selectAllAssignment = (e) => {
      if(assignmentCheckbox === null){
        setAssignmentCheckbox(true)
      }
      else{
        setAssignmentCheckbox(null)
      }
    }
    const selectAllPayment = (e) => {
     if(paymnetCheckbox === null){
       setPaymentCheckbox(true)
     }
     else{
       setPaymentCheckbox(null)
     }
    }
 
    return (
        <>
             <Layout TPDashboard="TPDashboard" TPuserId={userid}>
          <div className="adminForm">
          <Row>
          <Col md="4">
          <button
                class="autoWidthBtn" 
                onClick={() => history.goBack()}
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
              
            </Col>
            <Col md="4">
              <h4>Report</h4>
            </Col>
            <Col md= "4">
            <label className="form-label">Report Name</label>
          <input
            type="text"
            name="report_name"
            className={classNames("form-control", {
              "is-invalid": errors.report_name,
            })}
           defaultValue="report"
            placeholder="Enter report name"
            ref={register({ required: true })}
          />
            </Col>
            </Row>
  <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
    <div className="row">
      <div className="col-md-3">

        <div className="mb-3">
          <label className="form-label">From</label>
          <input
            type="date"
            name="p_from"
            ref={register}
            placeholder="Enter Mobile Number"
            className={classNames("form-control", {
              "is-invalid": errors.p_mobile,
            })}
           
          />
        </div>
      </div>

      <div className="col-md-3">
        <div className="mb-3">
          <label className="form-label">To</label>
          <input
            type="date"
            name="p_to"
            className={classNames("form-control", {
              "is-invalid": errors.p_type,
            })}
            defaultValue={item}
            max={item}
            placeholder="Enter type"
            ref={register({ required: true })}
          />
        </div>
       
      </div>
      <div className="col-md-3">

<div className="mb-3">
<label className="form-label">Team Leader</label>
<Select isDisabled = {true}  value={tlName}
 styles={{

  singleValue: (styles, { data }) => ({
    ...styles,
    color:  "#000"
  }),
}}
 />
</div>
</div>

<div className="col-md-3">
<div className="mb-3">
<label className="form-label">Tax Professional</label>
<Select value={tpName} isDisabled={true} 
styles={{

  singleValue: (styles, { data }) => ({
    ...styles,
    color:  "#000"
  }),
}} />

</div>
</div>
   </div> 
   <div className="row">
  
       <div className="col-md-3">
           <label className="form-label">Category</label>
           <Select isMulti options={options}
                        className={error ? "customError" : ""}
                        ref={selectInputRef3}
                        styles={{
                          option: (styles, { data }) => {
                            return {
                              ...styles,
                              color: data.value == 2
                                ? "green"
                                : "blue"
                            };
                          },
                          multiValueLabel: (styles, { data }) => ({
                            ...styles,
                            color: data.value == 2
                              ? "green"
                              : "blue"
                          }),
                        }}

                        onChange={category2}>
                      </Select>
        </div>
        <div className="col-md-3">
            <label className="form-label">Sub Category</label>
            <Select isMulti options={options2}
                        className={error2 ? "customError" : ""}
                        ref={selectInputRef4}
                        onChange={subCategory22}
                        styles={{
                          option: (styles, { data }) => {
                            return {
                              ...styles,
                              color: data.value > 8
                                ? "green"
                                : "blue"
                            };
                          },
                          multiValueLabel: (styles, { data }) => ({
                            ...styles,
                            color: data.value > 8
                              ? "green"
                              : "blue"
                          }),
                        }}

                        value={subData}>
                      </Select>
            </div>
            <div className="col-md-3">
<div className="mb-3">
    <label className="form-label">Client Id</label>
   <Select isMulti options={custData} ref={selectInputRef5} onChange={(e) => custName(e)}>

   </Select>
  </div>
    </div>
    <div className="col-md-3">
  <div className="mb-3">
  <label className="form-label">Query Number</label>
  <Select isMulti = {true} ref={selectInputRef6}

options={qno} onChange={(e) => queryNumber(e)}/>

  </div>
 
</div>
   </div>
   <div className="row">
       <div className="col-md-12">
           <fieldset className="my-fieldset">
           <legend className="login-legend">Basic Query Details</legend>
           <div className="basicFeild">
           <span>
               <input type="checkbox" onClick={(i) => selectAllbasic(i)} name="select_all" class="selectall" id="select_all" ref={register}></input>
               <label htmlFor="select_all">Select All</label>
               </span>
               </div>
            <div className="basicFeild">
            
            <span>
               <input type="checkbox" name="sno" id="sno" ref={register} checked disabled ref={register}></input>
               <label htmlFor="sno">S.No</label>
               </span>
               <span>
               <input type="checkbox" name="qno" ref={register} id="qno" checked disabled></input>
               <label htmlFor="qno">Query No</label>
               </span>
               <span>
               <input type="checkbox" ref={register} name="dataQuery" id="dataQuery" checked disabled></input>
               <label htmlFor="dataQuery">Query Date </label>
               </span>
               <span>
               <input type="checkbox" ref={register} name="cust_id" id="cust_id" checked disabled></input>
               <label htmlFor="cust_id">Client Id</label>
            </span>
            <span>
               <input type="checkbox" ref={register} name="basicCategory" id="basicCategory" checked disabled></input>
               <label htmlFor="basicCategory">Category</label>
             </span>
             <span>
               <input type="checkbox" ref={register} name="basic_sub_category" id="basic_sub_category" checked disabled></input>
               <label htmlFor="basic_sub_category">Sub Category</label>
               </span>
               <span> 
<input type="checkbox" ref={register} name="tl_name" id="tl_name" checked disabled></input>
<label htmlFor="tl_name">Name of Team Leader</label>

</span>
<span>
<input type="checkbox"  ref={register}name="tp_name" id="tp_name" checked disabled></input>
<label htmlFor="tp_name">Name of Tax Professional</label>
</span> 
               <span>
<input type="checkbox" name="assessment" ref={register} checked={checkBox} id="assessment"></input>
<label htmlFor="assessment">Assessment Year(s)</label>
</span>
<span>
<input type="checkbox" name="brief_fact_case" ref={register} checked={checkBox} id="brief_fact_case"></input>
<label htmlFor="brief_fact_case">Name of the case</label>
</span>      
<span>
<input type="checkbox" ref={register} name="purpose_p" checked={checkBox} id="purpose_p"></input>
<label htmlFor="purpose_p">Purpose for Which Opinion is Sought</label>
</span>
<span>
    <input type="checkbox" ref={register} name="p_format" checked={checkBox} id="p_format"></input>
<label htmlFor="p_format">Format in Which Opinion is Required</label>
</span>
<span>
    <input type="checkbox" ref={register} name="t_requested" checked={checkBox} id="t_requested"></input>
<label htmlFor="t_requested">Timeline Requested</label>
</span>
<span>  <input type="checkbox" ref={register} name="spc_que"  checked={checkBox} id="spc_que"></input>
<label htmlFor="spc_que">Specific Questions</label>
</span>
<span>  <input type="checkbox" ref={register} name="doa" checked={checkBox} id="doa"></input>
<label htmlFor="doa">Date of Allocation of Query</label>
</span>
<span>  <input type="checkbox" ref={register} checked={checkBox} name="process_status" id="process_status"></input>
<label htmlFor="process_status">Process Status</label>
</span>
</div>
</fieldset>
</div>
</div>


   {/* Proposal */}
   <div className="row">
       <div className="col-md-12">
       <fieldset className="my-fieldset">
           <legend className="login-legend">Proposal</legend>
           <div className="basicFeild">
           <span>
               <input type="checkbox" onClick={(i) => selectAllproposal(i)} name="selectallProposal" class="selectall" id="selectallProposal" ref={register}></input>
               <label htmlFor="selectallProposal">Select All</label>
               </span>
               </div>
            <div className="basicFeild">
<span>
<input type="checkbox" ref={register} name="dateProposal" checked={proposalCheckbox} id="dateProposal"></input>
<label htmlFor="dateProposal">Date of Proposal</label>
</span>
<span>
<input type="checkbox" ref={register} name="proposedAmount" checked={proposalCheckbox} id="proposedAmount"></input>
<label htmlFor="proposedAmount">Proposed Amount</label>
</span>
<span>
<input type="checkbox"  ref={register} name="paymentTerms" checked={proposalCheckbox} id="paymentTerms"></input>
<label htmlFor="paymentTerms">Payment Terms</label>
</span>
<span>
<input type="checkbox" ref={register} name="proposal_status"  checked={proposalCheckbox}id="proposal_status"></input>
<label htmlFor="proposal_status">Proposal Status</label>
</span>
<span>  <input type="checkbox" ref={register} checked={proposalCheckbox} name="acceptedAmount" id="acceptedAmount"></input>
<label htmlFor="acceptedAmount">Accepted Amount </label>
</span>

<span>  <input type="checkbox" ref={register} name="date_acceptance" checked={proposalCheckbox} id="date_acceptance"></input>
<label htmlFor="date_acceptance">Date of Acceptance / Decline</label>
</span>
<span>
<input type="checkbox" ref={register} checked={proposalCheckbox} name="amount_receipt" id="amount_receipt"></input>
<label htmlFor="amount_receipt">Total Amount Received</label>
</span>
<span>
    <input type="checkbox" ref={register} name="amountOutstanding" checked={proposalCheckbox} id="amountOutstanding"></input>
<label htmlFor="amountOutstanding">Total Amount Outstanding</label>
</span>
<span>
    <input type="checkbox" ref={register} name="amount_overdue" checked={proposalCheckbox} id="amount_overdue"></input>
<label htmlFor="amount_overdue">Total Amount Overdue</label>
</span>
<span>  <input type="checkbox" ref={register} name="declinedDate" checked={proposalCheckbox} id="declinedDate"></input>
<label htmlFor="declinedDate">Payment Decline Date</label>
</span>     
<span>  <input type="checkbox" ref={register} name="paymentDeclinedReason" checked={proposalCheckbox} id="paymentDeclinedReason"></input>
<label htmlFor="paymentDeclinedReason">Payment Decline Reason </label>
</span>        
            </div>      
           </fieldset>
           </div>
   </div>

   {/* Assignment */}
   <div className="row">
       <div className="col-md-12">
       <fieldset className="my-fieldset">
           <legend className="login-legend">Assignment</legend>
           <div className="basicFeild">
           <span>
               <input type="checkbox" onClick={(i) => selectAllAssignment(i)} name="selectAllAssignment" class="selectall" id="selectAllAssignment" ref={register}></input>
               <label htmlFor="selectAllAssignment">Select All</label>
               </span>
               </div>
            <div className="basicFeild">
           
<span>
<input type="checkbox" ref={register} checked={assignmentCheckbox} name="assignDate" id="assignDate"></input>
<label htmlFor="assignDate">Assignment Date</label>
</span>
<span>
    <input type="checkbox" ref={register} checked={assignmentCheckbox} name="completionDate" id="completionDate"></input>
<label htmlFor="completionDate"> Expected Date of Delivery</label>
</span>
<span>
    <input type="checkbox" ref={register} checked={assignmentCheckbox} name="assignStatus" id="assignStatus"></input>
<label htmlFor="assignStatus">Assignment Status</label>
</span>

<span>  <input type="checkbox" ref={register} checked={assignmentCheckbox} name="completionQuery" id="completionQuery"></input>
<label htmlFor="completionQuery">Date of Completion of Query </label>
</span>
<span>  <input type="checkbox" ref={register} checked={assignmentCheckbox} name="assignTime" id="assignTime"></input>
<label htmlFor="assignTime">Time taken to complete the assignment</label>
</span>
            </div>    
           </fieldset>
           </div>
   </div>


   {/* Payment Receipt */}

   <div className="row">
       <div className="col-md-12">
       <fieldset className="my-fieldset">
           <legend className="login-legend">Payment Receipt</legend>  
           <div className="basicFeild">
           <span>
               <input type="checkbox" onClick={(i) => selectAllPayment(i)} name="selectAllPayment" class="selectall" id="selectAllPayment" ref={register}></input>
               <label htmlFor="selectAllPayment">Select All</label>
               </span>
               <span>
<input type="checkbox" ref={register}  name="search_pay_amount" id="search_pay_amount"></input>
<label htmlFor="search_pay_amount">Payment Received Record Only</label>
</span> 
               </div>
            <div className="basicFeild">
            <span>
<input type="checkbox" ref={register} checked={paymnetCheckbox} name="invoice_number" id="invoice_number"></input>
<label htmlFor="invoice_number">Invoice Number</label>
</span> 
<span>
<input type="checkbox" ref={register} checked={paymnetCheckbox} name="dos" id="dos"></input>
<label htmlFor="dos">Description of Services</label>
</span> 
<span>
<input type="checkbox" ref={register} checked={paymnetCheckbox} name="basic_amount" id="basic_amount"></input>
<label htmlFor="basic_amount">Basic Amount</label>
</span>
<span>
<input type="checkbox" ref={register} checked={paymnetCheckbox} name="pocket_expensive" id="pocket_expensive"></input>
<label htmlFor="pocket_expensive">Out of Pocket Expenses</label>
</span>
<span>
<input type="checkbox" ref={register} checked={paymnetCheckbox} name="cget_tax" id="cget_tax"></input>
<label htmlFor="cget_tax">CGST Tax</label>
</span>
<span>
<input type="checkbox" ref={register} checked={paymnetCheckbox} name="igst_tax" id="igst_tax"></input>
<label htmlFor="igst_tax">IGST Tax </label>
</span>
<span>
<input type="checkbox" ref={register} checked={paymnetCheckbox} name="sgst_tax" id="sgst_tax"></input>
<label htmlFor="sgst_tax">SGST Tax</label>
</span>
<span>
<input type="checkbox" ref={register} checked={paymnetCheckbox} name="total_gst" id="total_gst"></input>
<label htmlFor="total_gst">Total GST </label>
</span>
<span>
<input type="checkbox" ref={register} checked={paymnetCheckbox} name="total_invoice" id="total_invoice"></input>
<label htmlFor="total_invoice">Invoice Amount </label>
</span>
<span>
<input type="checkbox" ref={register} checked={paymnetCheckbox} name="tds" id="tds"></input>
<label htmlFor="tds">TDS Deducted</label>
</span> 
{/* <span>
<input type="checkbox" ref={register} checked={paymnetCheckbox} name="net_amount" id="net_amount"></input>
<label htmlFor="net_amount">Net Amount </label>
</span> */}
            <span>
<input type="checkbox" ref={register} checked={paymnetCheckbox} name="receiptDate" id="receiptDate"></input>
<label htmlFor="receiptDate">Date of Receipt</label>
</span>   
<span>
<input type="checkbox" ref={register} checked={paymnetCheckbox} name="amountReceived" id="amountReceived"></input>
<label htmlFor="amountReceived">Amount Received</label>
</span>

<span>
<input type="checkbox" ref={register} checked={paymnetCheckbox} name="amount_type" id="amount_type"></input>
<label htmlFor="amount_type">Payment Mode </label>
</span>
 </div>
           </fieldset>
           </div>
   </div>
   <button type="submit" class="autoWidthBtn my-3">Generate Report</button>
   <button type="button" class="customBtn m-3" onClick={() => resetData()}>Reset</button>
  
  </form>
  </div>
            </Layout>
              </>
       );
   }
export default Report;