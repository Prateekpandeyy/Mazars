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
   
    reset();
   getCustomer();
  };

  

  
  const onSubmit = (data) => {

if(searchQuery == "SearchQuery")
axios
.get(
  `${baseUrl}/admin/getAllList?&name=${data.name}&country=${data.country}&state=${data.state}&city=${data.city2
  }&email=${data.email}&occupation=${data.occupation}&from=${data.p_dateFrom}&to=${data.p_dateTo}`
)
.then((res) => {

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
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="row my-3">
        <div className="col-sm-3">
            
          <input 
          placeholder="Name"
          type="text"
          name="name"
          className="form-control"
          ref={register}
          />
      </div>
      <div className="col-sm-3">
            
            <input 
            placeholder="Country"
            type="country"
            name="country"
            className="form-control"
            ref={register}
            />
        </div>
        <div className="col-sm-3">
            
            <input 
            placeholder="City"
            type="text"
            name="city2"
            className="form-control"
            ref={register}
            />
        </div>
              <div className="col-sm-3">
                  
                  <input 
                  placeholder="State"
                  type="text"
                  name="state"
                  className="form-control"
                  ref={register}/>
              </div>
             
              
          
          </div>
          <div className="row my-3">
          <div className="col-sm-3">
                
                <input 
                placeholder="Email"
                type="text"
                name="email"
                className="form-control"
                ref={register}/>
            </div>
            <div className="col-sm-3">
              
              <input 
              placeholder="Occupation"
              type="text"
              name="occupation"
              className="form-control"
              ref={register}/>
          </div>
          <div className="form-inline">
             

             <div className="form-group mx-sm-1  mb-2">
               <label className="form-select form-control">From</label>
             </div>

             <div className="form-group mx-sm-1  mb-2">
               <input
                 type="date"
                 name="p_dateFrom"
                 className="form-select form-control"
                 ref={register}
                 max={item}
               />
             </div>

             <div className="form-group mx-sm-1  mb-2">
               <label className="form-select form-control">To</label>
             </div>

             <div className="form-group mx-sm-1  mb-2">
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
             
              <div className="row my-3">
             
             <div className="col-sm-6">
             <button type="submit" class="btn btn-primary mx-sm-1 mb-2">
                Search
              </button>
              <button
          type="submit"
          className="btn btn-primary mx-sm-1 mb-2"
          onClick={() => resetData()}
        >
          Reset
        </button>
        <div className="form-group d-inline-block">
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
