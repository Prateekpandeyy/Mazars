import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import "antd/dist/antd.css";
import { Select } from "antd";
import { useForm } from "react-hook-form";

function CustomerListFilter(props) {
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;

  const [selectedData, setSelectedData] = useState([]);

  const { setData, searchQuery, setRecord, records, getCustomer  } = props;

 
  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
   getCustomer();
  };



  
  const onSubmit = (data) => {
   
if(searchQuery == "SearchQuery"){
    let formData = new FormData();
    formData.append("country", data.country);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("email", data.email);
    formData.append("from", data.p_dateFrom)
    formData.append("to", data.p_dateTo)
    axios({
        method :"POST", 
        url :  `${baseUrl}/admin/getAllList`, 
        data : formData
    })
    
    .then((res) => {
     
      if (res.data.code === 1) {
          console.log(res.data.result)
        if (res.data.result) {
          setData(res.data.result);
        }
      }
    });

}
     

    };

  return (
    <div>
          <div class="row">
            
         <div className="col-sm-12 d-flex">
        
         
         
            <form class="form-inline" onSubmit={handleSubmit(onSubmit)}>
            <div className="row my-3">
        <div class="col-sm-3">
            
          <input 
          placeholder="Country"
          type="text"
          name="country"
          className="form-control"
          ref={register}
          />
      </div>

              <div class="col-sm-3">
                  
                  <input 
                  placeholder="State"
                  type="text"
                  name="state"
                  className="form-control"
                  ref={register}/>
              </div>
              <div class="col-sm-3">
                
                  <input 
                  placeholder="City"
                  type="text"
                  name="city"
                  className="form-control"
                  ref={register}/>
              </div>
              <div class="col-sm-3">
                
                  <input 
                  placeholder="Email"
                  type="text"
                  name="email"
                  className="form-control"
                  ref={register}/>
              </div>
          
          </div>
     
              <div class="form-group mx-sm-3 mb-2">
                <label className="form-select form-control">From</label>
              </div>
              <div class="form-group mx-sm-3 mb-2">
                <input
                  type="date"
                  name="p_dateFrom"
                  className="form-select form-control"
                  ref={register}
                />
              </div>

              <div class="form-group mx-sm-3 mb-2">
                <label className="form-select form-control">To</label>
              </div>
              <div class="form-group mx-sm-3 mb-2">
                <input
                  type="date"
                  name="p_dateTo"
                  className="form-select form-control"
                  ref={register}
                />
              </div>
              <button type="submit" class="btn btn-primary mb-2">
                Search
              </button>
              <button
              type="button"
              class="btn btn-primary mb-2 ml-3"
              onClick={resetData}
            >
              Reset
            </button>
            </form>
          </div>

        
        
    </div> 
            </div>
      
       

  );
}

export default CustomerListFilter;
