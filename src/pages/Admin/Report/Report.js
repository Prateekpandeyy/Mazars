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
const Report = () => {
    const userid = window.localStorage.getItem("adminkey");
    const selectInputRef = useRef();
    const selectInputRef2 = useRef();
    const selectInputRef3 = useRef();
    const selectInputRef4 = useRef();
    const selectInputRef5 = useRef();
   
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
  const [teamleader44, setTeamleader44] = useState("") 
  const [taxprofessional44, setTaxprofessional44] = useState("")
  const [custData, setcustData] = useState();
  const [cname, setcName] = useState()
  var kk = []
  var pp = []
  var vv = []

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

  }, []);

  const getTeamLeader = () => {
    axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {
    
      var dd = []
      if (res.data.code === 1) {
        pp.push(res.data.result)
        setData((res.data.result));
       
      }
    });
  };

  useEffect(() => {
    getTaxProf();
  }, [taxId]);

  const getTaxProf = () => {
    axios
      .get(`${baseUrl}/tp/getTaxProfessional?tl_id=${taxId}`)
      .then((res) => {
      
        if (res.data.code === 1) {
          setData2(res.data.result);
         
        }
      });
  };


  const getData = () => {
    axios
    .get(`${baseUrl}//admin/getAllList`)
      .then((res) => {
       
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

    const onSubmit = (value) => {
      console.log(selectInputRef)
      selectInputRef.current.select.clearValue();
      selectInputRef2.current.select.clearValue();
      selectInputRef3.current.select.clearValue();
      selectInputRef4.current.select.clearValue();
      selectInputRef5.current.select.clearValue();
    
      reset()

     let basic_info = false
     let proposal_info = false
     let assignment_info = false
     let payment_info = false
     if(value.assessment || value.purpose_p || value.p_format || value.t_requested || value.spc_que || value.doa){
      basic_info = true
     }
     if(value.dateProposal || value.proposedAmount || value.paymentTerms || value.proposal_status || value.acceptedAmount
      || value.paymentDeclinedReason || value.date_acceptance || value.amountOutstanding
      || value.amount_overdue || value.declinedDate){
        proposal_info = true
      }
   if(value.assignDate || value.completionDate || value.assignStatus || value.completionQuery || value.assignTime){
     assignment_info = true
   }
   if(value.receiptDate || value.amountReceived){
     payment_info = true
   }
        let formData = new FormData();
        formData.append("report_name", value.report_name)
        formData.append("basic_info", Number(basic_info));
        formData.append("proposal_info", Number(proposal_info));
        formData.append("assignment_info", Number(assignment_info));
        formData.append("payment_info", Number(payment_info))
        formData.append("from", value.p_from);
        formData.append("to", value.p_to);
        formData.append("customer_name", cname)
        formData.append("teamleader", teamleader44);
        formData.append("taxprofessional", taxprofessional44);
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
        formData.append("total_gst", Number(value.total_gst));
        formData.append("total_invoice", Number(value.total_invoice));
        formData.append("tds", Number(value.tds));
        formData.append("net_amount", Number(value.net_amount));
        formData.append("amount_received", Number(value.amountReceived));
        formData.append("uid", JSON.parse(userid))
        formData.append("t", Math.floor(Math.random() * 110000))
   axios({
     method : "POST",
     url : `${baseUrl}/report/generateReport?t=${JSON.stringify(Math.floor(Math.random() * 110000))}`,
     data : formData

   })
   .then(function (response) {
   if(response.data.code === 1){
    window.open(`${baseUrl3}/${response.data.result}`)
   }
   })
   .catch((error) => {
  
   });
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
    const custName = (a) => {
      let pk = []
      a.map((r) => {
        pk.push(r.value)
      })
      setcName(pk)
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
    })
    setTaxprofessional44(kk2)
  }
    return (
        <>
          <Layout adminDashboard="adminDashboard" adminUserId={userid}>
          <div className="adminForm">
         <div className="row">
           <div className="col-md-6">
           <Typography variant="h4">Admin Report</Typography>
         
             </div>
             <div className="col-md-6" style={{display : "flex", justifyContent : "flex-end"}}>
             <button  className="btn btn-lg btn btn-success" onClick = {() => history.goBack()}>Go Back </button>
               </div>
           </div>
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
            defaultValue={item}
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
          <label className="form-label">Client Id</label>
         <Select isMulti options={custData} ref={selectInputRef5} onChange={(e) => custName(e)}>

         </Select>
        </div>
          </div>
          <div className="col-md-3">
        <div className="mb-3">
          <label className="form-label">Report Name</label>
          <input
            type="text"
            name="report_name"
            className={classNames("form-control", {
              "is-invalid": errors.report_name,
            })}
           defaultValue="Report"
            placeholder="Enter report name"
            ref={register({ required: true })}
          />
        </div>
       
      </div>
   </div> 
   <div className="row">
   <div className="col-md-3">

<div className="mb-3">
<label className="form-label">Teamleader</label>
<Select  isMulti={true}
options={options3}
ref={selectInputRef}
onChange= {(e) =>teamLeader(e)}/>
</div>
</div>

<div className="col-md-3">
<div className="mb-3">
<label className="form-label">Taxprofessional</label>
<Select isMulti = {true} 
ref={selectInputRef2}
 options={options4} onChange={(e) => taxProfessional(e)}/>

</div>
</div>
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
   </div>
   <div className="row">
       <div className="col-md-12">
           <fieldset className="my-fieldset">
           <legend className="login-legend">Basic Query Details</legend>
            <div className="basicFeild">
            <span>
               <input type="checkbox" name="sno" id="sno" checked disabled ref={register}></input>
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
<input type="checkbox" name="assessment" ref={register} id="assessment"></input>
<label htmlFor="assessment">Assessment Year(s)</label>
</span>
           
<span>
<input type="checkbox" ref={register} name="purpose_p" id="purpose_p"></input>
<label htmlFor="purpose_p">Purpose for which Opinion is sought</label>
</span>
<span>
    <input type="checkbox" ref={register} name="p_format" id="p_format"></input>
<label htmlFor="p_format">Format in which Opinion is required</label>
</span>
<span>
    <input type="checkbox" ref={register} name="t_requested" id="t_requested"></input>
<label htmlFor="t_requested">Timeline Requested</label>
</span>
<span>  <input type="checkbox" ref={register} name="spc_que" id="spc_que"></input>
<label htmlFor="spc_que">Specific questions</label>
</span>
<span>  <input type="checkbox" ref={register} name="doa" id="doa"></input>
<label htmlFor="doa">Date of Allocation of Query</label>
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
<input type="checkbox" ref={register} name="dateProposal" id="dateProposal"></input>
<label htmlFor="dateProposal">Date of Proposal</label>
</span>
<span>
<input type="checkbox" ref={register} name="proposedAmount" id="proposedAmount"></input>
<label htmlFor="proposedAmount">Proposed Amount</label>
</span>
<span>
<input type="checkbox"  ref={register} name="paymentTerms" id="paymentTerms"></input>
<label htmlFor="paymentTerms">Payment Terms</label>
</span>
<span>
<input type="checkbox" ref={register} name="proposal_status" id="proposal_status"></input>
<label htmlFor="proposal_status">Proposal Status</label>
</span>
<span>  <input type="checkbox" ref={register} name="acceptedAmount" id="acceptedAmount"></input>
<label htmlFor="acceptedAmount">Accepted Amount </label>
</span>
<span>  <input type="checkbox" ref={register} name="paymentDeclinedReason" id="paymentDeclinedReason"></input>
<label htmlFor="paymentDeclinedReason">Payment decline reason </label>
</span>
<span>  <input type="checkbox" ref={register} name="date_acceptance" id="date_acceptance"></input>
<label htmlFor="date_acceptance">Date of Acceptance / Decline</label>
</span>
{/* <span>
<input type="checkbox" ref={register} name="amountReceived" id="amountReceived"></input>
<label htmlFor="amountReceived">Total Amount Received</label>
</span> */}
<span>
    <input type="checkbox" ref={register} name="amountOutstanding" id="amountOutstanding"></input>
<label htmlFor="amountOutstanding">Total Amount Outstanding</label>
</span>
<span>
    <input type="checkbox" ref={register} name="amount_overdue" id="amount_overdue"></input>
<label htmlFor="amount_overdue">Total Amount Overdue</label>
</span>
<span>  <input type="checkbox" ref={register} name="declinedDate" id="declinedDate"></input>
<label htmlFor="declinedDate">Payment decline date</label>
</span>             
            </div>      
           </fieldset>
           </div>
   </div>

   {/* Assignment */}
   <div className="row">
       <div className="col-md-12">
       <fieldset className="my-fieldset">
           <legend className="login-legend">Assessnment</legend>
            <div className="basicFeild">
           
<span>
<input type="checkbox" ref={register} name="assignDate" id="assignDate"></input>
<label htmlFor="assignDate">Assignment Date</label>
</span>
<span>
    <input type="checkbox" ref={register} name="completionDate" id="completionDate"></input>
<label htmlFor="completionDate">Proposed Date of Completion/ Expected Date of Delivery</label>
</span>
<span>
    <input type="checkbox" ref={register} name="assignStatus" id="assignStatus"></input>
<label htmlFor="assignStatus">Assignment Status</label>
</span>

<span>  <input type="checkbox" ref={register} name="completionQuery" id="completionQuery"></input>
<label htmlFor="completionQuery">Date of Completion of Query </label>
</span>
<span>  <input type="checkbox" ref={register} name="assignTime" id="assignTime"></input>
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
<input type="checkbox" ref={register} name="receiptDate" id="receiptDate"></input>
<label htmlFor="receiptDate">Date of Receipt</label>
</span>   
<span>
<input type="checkbox" ref={register} name="amountReceived" id="amountReceived"></input>
<label htmlFor="amountReceived">Amount Received</label>
</span>
<span>
<input type="checkbox" ref={register} name="basic_amount" id="basic_amount"></input>
<label htmlFor="basic_amount">Basic Amount</label>
</span>
<span>
<input type="checkbox" ref={register} name="pocket_expensive" id="pocket_expensive"></input>
<label htmlFor="pocket_expensive">Out of pocket </label>
</span>
<span>
<input type="checkbox" ref={register} name="cget_tax" id="cget_tax"></input>
<label htmlFor="cget_tax">Cgst Tax</label>
</span>
<span>
<input type="checkbox" ref={register} name="igst_tax" id="igst_tax"></input>
<label htmlFor="igst_tax">Igst Tax </label>
</span>
<span>
<input type="checkbox" ref={register} name="sgst_tax" id="sgst_tax"></input>
<label htmlFor="sgst_tax">Sgst Tax</label>
</span>
<span>
<input type="checkbox" ref={register} name="total_gst" id="total_gst"></input>
<label htmlFor="total_gst">Total Gst </label>
</span>
<span>
<input type="checkbox" ref={register} name="total_inovice" id="total_invoice"></input>
<label htmlFor="total_invoice">Invoice Amount</label>
</span>
          
<span>
<input type="checkbox" ref={register} name="tds" id="tds"></input>
<label htmlFor="tds">TDS Deducted</label>
</span> 
<span>
<input type="checkbox" ref={register} name="net_amount" id="net_amount"></input>
<label htmlFor="net_amount">Net Amount </label>
</span> </div>
           </fieldset>
           </div>
   </div>
   <button type="submit" class="btn btn-success btn-lg my-3">Generate Report</button>
   <Mandatory />
  </form>
  </div>
            </Layout>
              </>
       );
   }
export default Report;