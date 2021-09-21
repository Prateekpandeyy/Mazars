import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import classNames from "classnames";
import { baseUrl } from "../../../config/config";
import './Admin.css';
import Select from 'react-select';
import Layout from "../../../components/Layout/Layout";
import { Typography } from '@material-ui/core';
const Report = () => {
    const userid = window.localStorage.getItem("adminkey");
    const { handleSubmit, register, errors, getValues } = useForm();
    const onSubmit = (value) => {
        console.log("submitteed")
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
          <label className="form-label">From<span className="declined">*</span></label>
          <input
            type="date"
            name="p_mobile"
            ref={register({ required: true })}
            placeholder="Enter Mobile Number"
            className={classNames("form-control", {
              "is-invalid": errors.p_mobile,
            })}
          />
        </div>
      </div>

      <div className="col-md-3">
        <div className="mb-3">
          <label className="form-label">To<span className="declined">*</span></label>
          <input
            type="date"
            name="p_type"
            className={classNames("form-control", {
              "is-invalid": errors.p_type,
            })}
            
            placeholder="Enter type"
            ref={register({ required: true })}
          />
          
        </div>
      </div>
    
   </div> 
   <div className="row">
   <div className="col-md-3">

<div className="mb-3">
<label className="form-label">Teamleader<span className="declined">*</span></label>
<Select  isMulti={true}/>
</div>
</div>

<div className="col-md-3">
<div className="mb-3">
<label className="form-label">Taxprofessional<span className="declined">*</span></label>
<Select isMulti = {true} />

</div>
</div>
       <div className="col-md-3">
           <label className="form-label">Category</label>
           <Select isMulti = {true} />
        </div>
        <div className="col-md-3">
            <label className="form-label">Sub Category</label>
            <Select isMulti={true} />
            </div>
   </div>
   <div className="row">
       <div className="col-md-12">
           <fieldset className="my-fieldset">
           <legend className="login-legend">Basic Query Details</legend>
            <div className="basicFeild">
            <span>

               <input type="checkbox" name="sno" id="sno" checked disabled></input>
               <label htmlFor="Sno">S.No</label>
               </span>
               <span>

               <input type="checkbox" name="qno" id="sno" checked disabled></input>
               <label htmlFor="queryNo">Query No</label>
               </span>
               <span>
               <input type="checkbox" name="queryNo" id="queryNo" checked disabled></input>
               <label htmlFor="dataQuery">Data Query</label>
               </span>
               <span>
               <input type="checkbox" name="dataQuery" id="dataQuery" checked disabled></input>
               <label htmlFor="cust_id">Customer Id</label>
            </span>
            <span>
               <input type="checkbox" name="cust_id" id="cust_id" checked disabled></input>
               <label htmlFor="category">Category</label>
             </span>
             <span>
               <input type="checkbox" name="category" id="category" checked disabled></input>
               <label htmlFor="sub_category">Sub Category</label>
               </span>
               <span>
<input type="checkbox" name="case_name" id="case_name"></input>
<label htmlFor="assess_year">Assessment Year(s)</label>
</span>
           
<span>
<input type="checkbox" name="assess_year" id="assess_year"></input>
<label htmlFor="purpose">Purpose for which Opinion is sought</label>
</span>
<span>
    <input type="checkbox" name="purpose" id="purpose"></input>
<label htmlFor="format_p">Format in which Opinion is required</label>
</span>
<span>
    <input type="checkbox" name="format_p" id="format_p"></input>
<label htmlFor="t_requested">Timeline Requested</label>
</span>

<span>  <input type="checkbox" name="t_requested" id="t_requested"></input>
<label htmlFor="spc_que">Specific questions</label>
</span>
<span>  <input type="checkbox" name="spc_que" id="spc_que"></input>
<label htmlFor="doa">Date of Allocation of Query</label>
</span>
<span> 
<input type="checkbox" name="tl_name" id="tl_name" checked disabled></input>
<label htmlFor="tl_name">Name of Team Leader</label>

</span>
<span>
<input type="checkbox" name="tp_name" id="tp_name" checked disabled></input>
<label htmlFor="tp_name">Name of Tax Professional</label>
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
<input type="checkbox" name="dateProposal" id="dateProposal"></input>
<label htmlFor="dateProposal">Date of Proposal</label>
</span>
<span>
<input type="checkbox" name="proposedAmount" id="proposedAmount"></input>
<label htmlFor="proposedAmount">Proposed Amount</label>
</span>
<span>
    <input type="checkbox" name="paymentTerms" id="paymentTerms"></input>
<label htmlFor="paymentTerms">Payment Terms</label>
</span>
<span>
    <input type="checkbox" name="proposal_status" id="proposal_status"></input>
<label htmlFor="proposal_status">Proposal Status</label>
</span>

<span>  <input type="checkbox" name="acceptedAmount" id="acceptedAmount"></input>
<label htmlFor="acceptedAmount">Accepted Amount </label>
</span>
<span>  <input type="checkbox" name="paymentDeclinedReason" id="paymentDeclinedReason"></input>
<label htmlFor="paymentDeclinedReason">Payment decline reason </label>
</span>
<span>  <input type="checkbox" name="dateOfDeclined" id="dateOfDeclined"></input>
<label htmlFor="dateOfDeclined">Date of Acceptance / Decline</label>
</span>
            
            

<span>
<input type="checkbox" name="amountReceived" id="amountReceived"></input>
<label htmlFor="amountReceived">Total Amount Received</label>
</span>
<span>
    <input type="checkbox" name="amountOutstanding" id="amountOutstanding"></input>
<label htmlFor="amountOutstanding">Total Amount Outstanding</label>
</span>
<span>
    <input type="checkbox" name="amount_overdue" id="amount_overdue"></input>
<label htmlFor="amount_overdue">Total Amount Overdue</label>
</span>


<span>  <input type="checkbox" name="declinedDate" id="declinedDate"></input>
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
           <legend className="login-legend">Assessment</legend>
         

            <div className="basicFeild">
            
            <span>
<input type="checkbox" name="assignNumber" id="assignNumber"></input>
<label htmlFor="assignNumber">Assignment Number</label>
</span>
<span>
<input type="checkbox" name="assignDate" id="assignDate"></input>
<label htmlFor="assignDate">Assignment Date</label>
</span>
<span>
    <input type="checkbox" name="completionDate" id="completionDate"></input>
<label htmlFor="completionDate">Proposed Date of Completion/ Expected Date of Delivery</label>
</span>
<span>
    <input type="checkbox" name="assignStatus" id="assignStatus"></input>
<label htmlFor="assignStatus">Assignment Status</label>
</span>

<span>  <input type="checkbox" name="completionQuery" id="completionQuery"></input>
<label htmlFor="completionQuery">Date of Completion of Query </label>
</span>
<span>  <input type="checkbox" name="assignTime" id="assignTime"></input>
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
<input type="checkbox" name="receiptDate" id="receiptDate"></input>
<label htmlFor="receiptDate">Date</label>
</span>   

<span>
<input type="checkbox" name="amountReceived" id="amountReceived"></input>
<label htmlFor="amountReceived">Amount Received</label>
</span>
       
            </div>

           
           </fieldset>
           </div>
   </div>
   <button type="submit" class="btn btn-success btn-lg my-3">Generate Report</button>
  </form>
  </div>
            </Layout>
              </>
   
       );
   }
export default Report;