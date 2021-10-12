import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
const InvoiceFilter = () => {
   const { handleSubmit, register, errors, reset } = useForm();
   var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
 
  const [item] = useState(current_date);
    return(
       <>
      
        <form>
           <div className="row">
               <div className="col-md-3">
               <input   
            type = "text"
            placeholder="Enter Query Number" 
            className="form-control"/>
                   </div>
                   <div className="col-md-3">
                  <select className="form-control">
                     <option>1</option>
                     <option>2</option>
                     <option>3</option>
                     <option>4</option>
                     <option>5</option>
                     <option>6</option>
                  </select>
                       </div>
                      
                        
                       <div class="form-inline">
             

             <div class="form-group mx-sm-1  mb-2">
               <label className="form-select form-control">From</label>
             </div>

             <div class="form-group mx-sm-1  mb-2">
               <input
                 type="date"
                 name="p_dateFrom"
                 className="form-select form-control"
                 ref={register}
                 max={item}
               />
             </div>

             <div class="form-group mx-sm-1  mb-2">
               <label className="form-select form-control">To</label>
             </div>

             <div class="form-group mx-sm-1  mb-2">
               <input
                 type="date"
                 name="p_dateTo"
                 className="form-select form-control"
                 ref={register}
                defaultValue={item}
                 max={item}
               />
             </div>
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