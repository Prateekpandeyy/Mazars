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

  const { setData, searchQuery, setRecords, records, getCustomer  } = props;
  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
 
  const [item] = useState(current_date);
  
  const resetData = () => {
    console.log("resetData ..");
    reset();
   getCustomer();
  };

  

  
  const onSubmit = (data) => {

if(searchQuery == "SearchQuery")
axios
.get(
  `${baseUrl}/admin/getAllList?&name=${data.name}&country=${data.country}&state=${data.state}&city=${data.city2
  }&email=${data.email}&phone=${data.phone}&from=${data.p_dateFrom}&to=${data.p_dateTo}`
)
.then((res) => {
  console.log("myResult", res.data.result);
  if (res.data.code === 1) {
    if (res.data.result) {
      setData(res.data.result);
    setRecords(res.data.result.length)
    }
  }
});     
};

  return (
    <>
    <div className="row">
      <div className="col-sm-12 d-flex">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row my-3">
        <div class="col-sm-3">
            
          <input 
          placeholder="Name"
          type="text"
          name="name"
          className="form-control"
          ref={register}
          />
      </div>
      <div class="col-sm-3">
            
            <input 
            placeholder="Country"
            type="country"
            name="country"
            className="form-control"
            ref={register}
            />
        </div>
        <div class="col-sm-3">
            
            <input 
            placeholder="City"
            type="text"
            name="city2"
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
             
              
          
          </div>
          <div class="row my-3">
          <div class="col-sm-3">
                
                <input 
                placeholder="Email"
                type="text"
                name="email"
                className="form-control"
                ref={register}/>
            </div>
            <div class="col-sm-3">
              
              <input 
              placeholder="Moblile Number"
              type="text"
              name="phone"
              className="form-control"
              ref={register}/>
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
             
              <div class="row my-3">
             
             <div class="col-sm-6">
             <button type="submit" class="btn btn-primary mx-sm-1 mb-2">
                Search
              </button>
              <button
          type="submit"
          class="btn btn-primary mx-sm-1 mb-2"
          onClick={() => resetData()}
        >
          Reset
        </button>
        <div class="form-group d-inline-block">
                  <label className="form-select form-control"
                  >Total Records : {records}</label>
                </div>
             </div>
              
              </div>
 
           

           
          </form>
        </div>
      </div>
    </div>
  </>
  );
}

export default CustomerListFilter;