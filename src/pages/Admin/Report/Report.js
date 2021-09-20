import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import classNames from "classnames";
import { baseUrl } from "../../../config/config";
import './Admin.css';
import Select from 'react-select';
import Layout from "../../../components/Layout/Layout";
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
           <fieldset>
           <legend syyle = {{display : "block"}}>Basic Query Details</legend>
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
               <input type="checkbox" name="sub_category" id="sub_category" checked disabled></input>
              <label htmlFor="case_name">Name of case</label>
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
              <span> <input type="checkbox" name="doa" id="doa"></input>
               <label htmlFor="tl_name">Name of Team Leader</label>
               <input type="checkbox" name="tl_name" id="tl_name" checked disabled></input>
             </span>
             <span>
               <label htmlFor="tp_name">Name of Tax Professional</label>
               <input type="checkbox" name="tp_name" id="tp_name" checked disabled></input>
           </span>
            </div>
           </fieldset>
           </div>
   </div>
  </form>

  </div>
            </Layout>
              </>
   
       );
   }
export default Report;