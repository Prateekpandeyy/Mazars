import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState , useEffect} from 'react';
import classNames from "classnames";
import { baseUrl } from "../../../config/config";
import './Admin.css';
import Select from 'react-select';
import Layout from "../../../components/Layout/Layout";
import { Typography } from '@material-ui/core';
import Mandatory from '../../../components/Common/Mandatory';

const Report = () => {
    const userid = window.localStorage.getItem("adminkey");
    const [teamleader,setTeamleader] = useState([]);
    const [taxprofessional, setTaxprofessional] = useState([]);
    const [category, setCategory] = useState([]);
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
  const [custCate2, setCustcate2] = useState([])
  var kk = []
  var vv = []
  var allData1 = {}
  var dir = []
  var indir = []
  const [dd, setDd] = useState({
    direct: [],
    indirect: [],
  });

    const { handleSubmit, register, errors, getValues } = useForm();
    var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
 
  const [item] = useState(current_date);

  useEffect(() => {
    const getCategory = async () => {
      await axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
        if (res.data.code === 1) {
          console.log(res.data.result)
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
  const options = tax.map(d => (
    {
      "value": d.id,
      "label": d.details
    }))

  const options2 = tax2.map(v => ({
    "value": v.id,
    "label": v.details
  }))
    const onSubmit = (value) => {
        let formData = new FormData();
        formData.append("from", value.p_from);
        formData.append("to", value.p_to);
        formData.append("teamleader", teamleader);
        formData.append("taxprofessional", taxprofessional);
        formData.append("category", category);
        formData.append("subCategory", subCategory);
        formData.append("q_no", value.qno);
        formData.append("date_query", value.dataQuery);
        formData.append("cust_id", value.cust_id);
        formData.append("basic_category", value.basicCategory);
        formData.append("basic_sub_category", value.basic_sub_category);
        formData.append("assessment", value.assessment);
        formData.append("purpose", value.purpose_p);
        formData.append("p_format", value.p_format);
        formData.append("t_requested", value.t_requested);
        formData.append("spc_que", value.spc_que);
        formData.append("date_allocation", value.doa);
        formData.append("teamleader", value.tl_name);
        formData.append("taxprofessional", value.tp_name);
        formData.append("date_proposal", value.dateProposal);
        formData.append("proposed_amount", value.proposedAmount);
        formData.append("payment_terms", value.paymentTerms);
        formData.append("proposal_status", value.proposal_status);
        formData.append("accepted_amount", value.acceptedAmount);
        formData.append("payment_declined_reasen", value.paymentDeclinedReason);
        formData.append("date_of_acceptance", value.date_acceptance);
        // formData.append("amount_received", value.amountReceived);
        formData.append("amount_outstanding", value.amountOutstanding);
        formData.append("amount_overdue", value.amount_overdue);
        formData.append("payment_declined", value.declinedDate);
        formData.append("assignment_number", value.assignNumber);
        formData.append("assign_date", value.assignDate);
        formData.append("proposed_completion_date", value.completionDate);
        formData.append("assignment_status", value.assignStatus);
        formData.append("date_complation", value.completionQuery);
        formData.append("assign_time", value.assignTime);
        formData.append("payment_recived_date", value.receiptDate);
        formData.append("amount_received", value.amountReceived);
   axios({
     method : "POST",
     url : `${baseUrl}/report/generateReport`,
     data : formData

   })
    }

    // Category 
    const category2 = (v) => {

      setCategoryData(v)
      setNn((oldData) => {
        return [...oldData, mcategory]
      })
      setError("")
      setCustcate(v)
      v.map((val) => {
        vv.push(val.value)
        setmcategory(val.value);
        setmcatname((oldData) => {
          return [...oldData, val.label]
        })
        setStore(val.value)
      })
  
  
      if (vv.length > 0) {
        if (vv.includes("1") && vv.includes("2")) {
          console.log("hdd")
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
      console.log("categoryData", dd)
      subCategeryData(e)
      setCustcate2(e)
      setError2("")
      console.log(e)
      console.log("allData", allData1)
      e.map((i) => {
  
        i.value < 8 ? dir.push(i.label) : indir.push(i.label)
      })
     
      setDd({
        direct: dir,
        indirect: indir
      })
    }
  
  
    return (
        <>
          <Layout adminDashboard="adminDashboard" adminUserId={userid}>
          <div className="adminForm">
          <Typography variant="h4">Admin Report</Typography>
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
    
   </div> 
   <div className="row">
   <div className="col-md-3">

<div className="mb-3">
<label className="form-label">Teamleader</label>
<Select  isMulti={true}
onChange= {(e) =>setTeamleader(e)}/>
</div>
</div>

<div className="col-md-3">
<div className="mb-3">
<label className="form-label">Taxprofessional</label>
<Select isMulti = {true} 
  onChange={(e) => setTaxprofessional(e)}/>

</div>
</div>
       <div className="col-md-3">
           <label className="form-label">Category</label>
           <Select isMulti options={options}
                        className={error ? "customError" : ""}
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
               <label htmlFor="dataQuery">Data Query</label>
               </span>
               <span>
               <input type="checkbox" ref={register} name="cust_id" id="cust_id" checked disabled></input>
               <label htmlFor="cust_id">Customer Id</label>
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
<label htmlFor="assessment">Assignment Year(s)</label>
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
           <legend className="login-legend">Assignment</legend>
            <div className="basicFeild">
            <span>
<input type="checkbox" ref={register} name="assignNumber" id="assignNumber"></input>
<label htmlFor="assignNumber">Assignment Number</label>
</span>
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
            </div>
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