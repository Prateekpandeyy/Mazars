import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { Select } from "antd";

function RecordingFilter(props) {
  const { Option } = Select;
  const { handleSubmit, register, errors, reset } = useForm();

  const {
    records,
    setRecords,
    setData,
    getRecording,
    SearchQuery,
   userid,
  
 
  } = props;
  // const userid = window.localStorage.getItem("tpkey");

  const [selectedData, setSelectedData] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [status1, setStatus1] = useState(1);


  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  
  const [item] = useState(current_date);

 

  
 

  //reset date
  const resetData = () => {
  
    reset();
    setSelectedData([]);
    setStore2([]);
    setStatus1(1)
   getRecording();
  };

  const onSubmit = (data) => {
 
if(SearchQuery == "SearchQuery") {
  
    axios
        .get(
          `${baseUrl}/tl/callRecordingPostlist?uid=${JSON.parse(userid)}&assign_id=${data.queryNo}`)
        .then((res) => {
         
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);

            }
          }
        });
}

   
  };


  const Reset = () => {
    return (
      <>
        <button
          type="submit"
          className="btn btn-primary mx-sm-1 mb-2"
          onClick={() => resetData()}
        >
          Reset
        </button>
      </>
    );
  };




  return (
    <>
      <div className="row">
        <div className="col-sm-12 d-flex">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-inline">
          
             <input
                    type="text"
                    name="queryNo"
                    ref={register}
                    className="form-select form-control"
                    
                  />
                <button type="submit" className="btn btn-primary mx-sm-1 mb-2">
                  Search
                </button>
                <Reset />
                <div className="form-group mx-sm-1  mb-2">
                  <label className="form-select form-control"
                  >Total Records : {records}</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecordingFilter;

