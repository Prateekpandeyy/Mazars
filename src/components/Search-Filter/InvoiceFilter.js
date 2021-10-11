import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
const InvoiceFilter = () => {
    return(
       <>
      
        <form>
           <div className="row">
               <div className="col-md-4">
               <input   
            type = "text"
            placeholder="Enter Query Number" 
            className="form-control"/>
                   </div>
                   <div className="col-md-4">
                   <input   
            type = "text"
            placeholder="Enter Installment Number" 
            className="form-control"/>
                       </div>
                       <div className="col-md-4">
                       <input   
            type = "text"
            placeholder="Enter date" 
            className="form-control"/>
                           </div>
           </div>
          <div className="mt-3">
          <button className="btn btn-success">Search</button>
           <button className="btn btn-primary mx-2">Reset</button>
          </div>
        </form>
       </>
    )

}
export default InvoiceFilter;