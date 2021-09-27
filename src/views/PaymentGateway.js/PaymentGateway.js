import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import classNames from "classnames";
import { baseUrl } from "../../config/config";
function PaymentGateway(){
    const { handleSubmit, register, errors, getValues } = useForm();
    const info = {
      "state" : "Haryana",
      "email" : "singhnishantrana@gmail.com", 
      "gender" : "", 
      "dob" : "01-11-1990",
      "city" : "Gurugoan",
      "pincode" : "122017", 
      "status" : "1",
      "first_name" : "Nishant Rana",
      "last_name" : "",
      "address_line_1" : "A-22, A Block",
      "address_line_2" : "Sector 109",
      "plan_name" : "TPIN_100Mbps_Combo"
    }
    const billdes = {
      // "HSN_SAC_code": "11040",
        "Desc": "Bill for Mazars",
        "Qty": "1",
        "UoM": "NA",
        "Rate": "11620.0",
        "Total": "1.0",
        "Discount": "0",
        "Delivery_Charges": "0",
        "Net_Tax_Val": "0",
        "CGST_Rate": "0",
        "CGST_Amount": "0",
        "SGST_Rate": "0",
        "SGST_Amount": "0",
        "IGST_Rate": "0",
        "IGST_Amount": "0",
        "Total_Amount": "1.0"
    }
    const onSubmit = (value) => {
      
 console.log("onSubmit");
 
    let formData = new FormData()
    formData.append("token", "ba58d28345a083d2630c67ed44c8d92f");
    formData.append("timestamp", "09-09-2021 13:52:02");
    formData.append("mobile", "9818685050");
    formData.append("type", "F");
    formData.append("userInfo" , JSON.stringify(info));
    formData.append("billDescription", JSON.stringify(billdes));
    formData.append("ekycStatus", 0);
    formData.append("public_key", "791E14FF-6243-4A73-A6E1");
    formData.append("Bill_no", "1118997422");
    formData.append("Balance", "100");
    formData.append("Bill_due_date",  "21-09-2021");
    formData.append("user_id", "9818685050");
    formData.append("merchant_id", "T10012");
    formData.append("agent_id", "8595923172");
    formData.append("caf_number", "");

    axios({
      method : "POST", 
      url : "https://pay.mobilpay.in/index.php/getUserBillData",
      data : formData
    })
    .then(function (response) {
      console.log("response", response)
    })
      };
      return(
        <div className="container">

        <div className="form">
          <div className="heading">
            <h2>Customer Register</h2>
          </div>
          <>
            <div>
              <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
                <div className="row">
                  <div className="col-md-6">
    
                    <div className="mb-3">
                      <label className="form-label">Mobile<span className="declined">*</span></label>
                      <input
                        type="text"
                        name="p_mobile"
                        ref={register({ required: true })}
                        placeholder="Enter Mobile Number"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_mobile,
                        })}
                      />
                    </div>
                  </div>
    
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Email<span className="declined">*</span></label>
                      <input
                        type="text"
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
                  <div className="col-md-6">
    
                    <div className="mb-3">
                      <label className="form-label">User Information<span className="declined">*</span></label>
                      <input
                        type="text"
                        name="p_userInfo"
                        ref={register({ required: true })}
                        placeholder="Enter User Information"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_userInfo,
                        })}
                      />
                    </div>
                  </div>
    
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Bill Description<span className="declined">*</span></label>
                      <input
                        type="text"
                        name="p_billDescription"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_billDescription,
                        })}
                        
                        placeholder="Enter Your Description"
                        ref={register({ required: true })}
                      />
                      
                    </div>
                  </div>
               </div>

             <div className="row">     
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Ekyc Status<span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_ekycStatus ,
                        })}
                        name="p_zipCode"
                        ref={register({ required: true })}
                        placeholder="Enter Ekyc Status"
                       
                      />
                    </div>
                   
                  </div>
    
                  <div class="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Public Key<span className="declined">*</span></label>
                      <input
                        type="text"
                        
                        className={classNames("form-control", {
                          "is-invalid": errors.p_publicKey ,
                        })}
                        name="p_publicKey"
                        placeholder="Enter Public Key"
                        ref={register}
    
                        autocomplete="off"
                      />
                     
                     
                    </div>
                  </div>
             </div>
             <div className="row">
                  <div class="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Bill Number<span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.bill_no,
                        })}
                        
                        placeholder="Bill Number"
                        name="bill_no"
                        ref={register}
                        autocomplete="off"
                      />
                    </div>
                  </div>
    
                      <div class="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Balance<span className="declined">*</span></label>
                          <input
                            type="text"
                            className={classNames("form-control", {
                              "is-invalid": errors.balance,
                            })}
                            name="balance"
                            ref={register({ required: true })}
                           
                            placeholder="Enter Amount"
                            autocomplete="off"
                          />
                         
                        </div>
                      </div>
              </div>
              <div className="row">     
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Bill Due Date<span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.bill_dueDate ,
                        })}
                        name="bill_dueDate"
                        ref={register({ required: true })}
                        placeholder="Due Date"
                       
                      />
                    </div>
                   
                  </div>
    
                  <div class="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">User Id<span className="declined">*</span></label>
                      <input
                        type="text"
                        
                        className={classNames("form-control", {
                          "is-invalid": errors.user_id ,
                        })}
                        name="user_id"
                        placeholder="Enter your user id"
                        ref={register}
                        autocomplete="off"
                      />
                     
                     
                    </div>
                  </div>
             </div>
             <div className="row">     
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Agent Id<span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.agent_id ,
                        })}
                        name="agent_id"
                        ref={register({ required: true })}
                        placeholder="Enter Ekyc Status"
                       
                      />
                    </div>
                   
                  </div>
    
                  <div class="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Merchant Id<span className="declined">*</span></label>
                      <input
                        type="text"
                        
                        className={classNames("form-control", {
                          "is-invalid": errors.merchant_id ,
                        })}
                        name="merchant_id"
                        placeholder="Enter Public Key"
                        ref={register}
    
                        autocomplete="off"
                      />
                     
                     
                    </div>
                  </div>
             </div>
             <div className="row">     
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">CAF Number<span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.caf_number ,
                        })}
                        name="caf_number"
                        ref={register({ required: true })}
                        placeholder="Enter Ekyc Status"
                       
                      />
                    </div>
                   
                  </div>
    
                  <div class="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Email<span className="declined">*</span></label>
                      <input
                        type="text"
                        
                        className={classNames("form-control", {
                          "is-invalid": errors.email ,
                        })}
                        name="email"
                        placeholder="Enter Email"
                        ref = {register}
    
                        autocomplete="off"
                      />
                     
                     
                    </div>
                  </div>
             </div>
             <div className="row">
             <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">DOB<span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.dob ,
                        })}
                        name="dob"
                        ref={register({ required: true })}
                        placeholder="Enter Date of Birth"/>
                    </div> 
                  </div>
                  <div className="col-md-6">
                    <button type="submit" className="btn btn-lg btn-primary justify">Submit</button>
                  </div>
             </div>
              </form>
    
              </div>
          </>
    
        </div>
    
      </div>
      )
   
}
export default PaymentGateway;