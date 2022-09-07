import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import { Spinner } from 'reactstrap';
import ShowError from "../../components/LoadingTime/LoadingTime";
import {Link} from 'react-router-dom'
function CustomerFilter(props) {
  const { Option } = Select;
  const { handleSubmit, register, errors, reset } = useForm();

  const { records,
    setRecords, setData, getData, id,
    query,
    InprogressAllocation,
    InprogressQueryProposal,
    DeclinedQuery,

    proposal,
    inprogressProposal,
    acceptedProposal,
    declinedProposal,
    allPayment,
    paid,
    unpaid,
    assignment } = props;


  const [selectedData, setSelectedData] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
const [loading, setLoading] = useState(false)
  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  
  const [item] = useState(current_date);
  const token = window.localStorage.getItem("clientToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }

  useEffect(() => {
    const getSubCategory = () => {
     if(selectedData.length > 0){
      axios
      .get(`${baseUrl}/customers/getCategory?pid=${selectedData}`, myConfig)
      .then((res) => {
     
        if (res.data.code === 1) {
          setTax2(res.data.result);
        }
      });
     }
    };
    getSubCategory();
  }, [selectedData]);

  //handleCategory
  const handleCategory = (value) => {
   
    setSelectedData(value);
    setStore2([]);
  };

  //handleSubCategory
  const handleSubCategory = (value) => {
    
    setStore2(value);
  };

  //reset category
  const resetCategory = () => {
    
    setSelectedData([]);
    setStore2([]);
    setTax2([]);
   
  };

  //reset date
  const resetData = () => {

    reset();
    setSelectedData([]);
    setStore2([]);
    setTax2([])
    getData();
  };

  const onSubmit = (data) => {
  setLoading(true)

    if (query == "query") {

      axios
        .get(
          `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&status=${data.p_status}&pcat_id=${selectedData}`, myConfig
        )
        .then((res) => {
          
          if (res.data.code === 1) {
            setLoading(false)
            if (res.data.result) {
           
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
         });
    }

    if (InprogressAllocation == "InprogressAllocation") {
   
     if(data.p_status.length > 0){
      axios
      .get(
        `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
          id
        )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
        }&status=${data.p_status}&pcat_id=${selectedData}`, myConfig
      )
      .then((res) => {

        if (res.data.code === 1) {
          setLoading(false)
          if (res.data.result) {
            setData(res.data.result);
            setRecords(res.data.result.length);
          }
        }
      })
      .catch((error) => {
        ShowError.LoadingError(setLoading)
       });
     }
     else{
      axios
      .get(
        `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
          id
        )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
        }&status=1&pcat_id=${selectedData}`, myConfig
      )
      .then((res) => {

        if (res.data.code === 1) {
          setLoading(false)
          if (res.data.result) {
            setData(res.data.result);
            setRecords(res.data.result.length);
          }
        }
      })
      .catch((error) => {
        ShowError.LoadingError(setLoading)
       });
     }
    }

    if (InprogressQueryProposal == "InprogressQueryProposal") {
      axios
        .get(
          `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(id)}&status=2&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&pcat_id=${selectedData}`, myConfig
        )
        .then((res) => {
        
          if (res.data.code === 1) {
            setLoading(false)
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
         });
    }


    if (DeclinedQuery == "DeclinedQuery") {
      axios
        .get(
          `${baseUrl}/customers/declinedQueries?uid=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&pcat_id=${selectedData}&status=${data.p_status}`, myConfig
        )
        .then((res) => {

          if (res.data.code === 1) {
            setLoading(false)
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
         });
    }


    if (proposal == "proposal") {
      axios
        .get(
          `${baseUrl}/customers/getProposals?uid=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&status=${data.p_status}&pcat_id=${selectedData}`, myConfig
        )
        .then((res) => {
         
          if (res.data.code === 1) {
            setLoading(false)
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);

            }
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
         });
    }

    if (inprogressProposal == "inprogressProposal") {
     if(data.p_status){
      axios
      .get(
        `${baseUrl}/customers/getProposals?uid=${JSON.parse(
          id
        )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
        }&status=${data.p_status}&pcat_id=${selectedData}`, myConfig
      )
      .then((res) => {
      
        if (res.data.code === 1) {
          setLoading(false)
          if (res.data.result) {
            setData(res.data.result);
            setRecords(res.data.result.length);
          }
        }
      })
      .catch((error) => {
        ShowError.LoadingError(setLoading)
       });
     }
     else{
      axios
      .get(
        `${baseUrl}/customers/getProposals?uid=${JSON.parse(
          id
        )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
        }&status=1&pcat_id=${selectedData}`, myConfig
      )
      .then((res) => {
      
        if (res.data.code === 1) {
          setLoading(false)
          if (res.data.result) {
            setData(res.data.result);
            setRecords(res.data.result.length);
          }
        }
      })
      .catch((error) => {
        ShowError.LoadingError(setLoading)
       });
     }
    }

    if (acceptedProposal == "acceptedProposal") {
      axios
        .get(
          `${baseUrl}/customers/getProposals?uid=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&status=2&pcat_id=${selectedData}`, myConfig
        )
        .then((res) => {
         
          if (res.data.code === 1) {
            setLoading(false)
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
         });
    }

    if (declinedProposal == "declinedProposal") {
      axios
        .get(
          `${baseUrl}/customers/getProposals?uid=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&status=3&pcat_id=${selectedData}`, myConfig
        )
        .then((res) => {
       
          if (res.data.code === 1) {
            setLoading(false)
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
         });
    }


    if (assignment == "assignment") {
      axios
        .get(
          `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&status=${data.p_status}&pcat_id=${selectedData}`, myConfig
        )
        .then((res) => {
       
          if (res.data.code === 1) {
            setLoading(false)
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
         });
    }
    if (assignment == "assignmentInprogress") {
      axios
        .get(
          `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&status=1&pcat_id=${selectedData}`, myConfig
        )
        .then((res) => {
       
          if (res.data.code === 1) {
            setLoading(false)
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
         });
    }
    if (assignment == "completeAssignment") {
      axios
        .get(
          `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&status=2&pcat_id=${selectedData}`, myConfig
        )
        .then((res) => {
       
          if (res.data.code === 1) {
            setLoading(false)
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
         });
    }
    if (assignment == "declinedAssignment") {
      axios
        .get(
          `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
            id
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&status=3&pcat_id=${selectedData}`, myConfig
        )
        .then((res) => {
       
          if (res.data.code === 1) {
            setLoading(false)
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
         });
    }

    if (allPayment == "allPayment") {
      axios
        .get(
          `${baseUrl}/customers/getUploadedProposals?cid=${JSON.parse(id)}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=${data.p_status}&pcat_id=${selectedData}`, myConfig
        )
        .then((res) => {
        
          if (res.data.code === 1) {
            setLoading(false)
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
         });
    }
    if (unpaid == "unpaid") {
      axios
        .get(
          `${baseUrl}/customers/getUploadedProposals?cid=${JSON.parse(id)}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=2&pcat_id=${selectedData}`, myConfig
        )
        .then((res) => {
        
          if (res.data.code === 1) {
            setLoading(false)
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
         });
    }
    if (paid == "paid") {
      axios
        .get(
          `${baseUrl}/customers/getUploadedProposals?cid=${JSON.parse(id)}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=1&pcat_id=${selectedData}`, myConfig
        )
        .then((res) => {
      
          if (res.data.code === 1) {
            setLoading(false)
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        })
        .catch((error) => {
          ShowError.LoadingError(setLoading)
         });
    }

    
  };

  const Reset = () => {
    return (
      <>
        <button
          type="submit"
          className="searchBtn mx-sm-1 mb-2"
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
        <div className="col-md-12">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-inline">
      <div className="form-group mb-2">
        <Select
         
          placeholder="Select Category"
          defaultValue={[]}
          onChange={handleCategory}
          value={selectedData}
        >
          <Option value="1" label="Compilance">
            <div className="demo-option-label-item">Direct Tax</div>
          </Option>
          <Option value="2" label="Compilance">
            <div className="demo-option-label-item">Indirect Tax</div>
          </Option>
        </Select>
      </div>
        <div className="form-group mx-sm-1  mb-2">
        <Select
          mode="multiple"
          style={{ width: 250 }}
          placeholder="Select Sub Category"
          defaultValue={[]}
          onChange={handleSubCategory}
          value={store2}
          allowClear
        >
          {tax2.map((p, index) => (
            <Option value={p.id} key={index}>
              {p.details}
            </Option>
          ))}
        </Select>
      </div>
      <div className="form-group mx-sm-1 mb-2">
     
        <button
          type="submit"
          className="btnSearch mx-2"
          onClick={() => resetCategory()}
        >
          X
        </button>
      
        </div>
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
      <div className="form-group mx-sm-1  mb-2">
        {query == "query" && (
          <select
            className="form-select form-control"
            name="p_status"
            ref={register}
            style={{ height: "33px" }}
          >
            <option value="">--select--</option>
            <option value="1">Inprogress Queries</option>
            <option value="2">Completed Queries</option>
            <option value="3">Declined Queries</option>
          </select>
        )}

        {InprogressAllocation == "InprogressAllocation" && (
          <select
            className="form-select form-control"
            name="p_status"
            ref={register}
            style={{ height: "33px" }}
          >
            <option value="">--select--</option>
            <option value="4">Inprogress; Allocation</option>
            <option value="5">Inprogress; Proposals</option>
            <option value="6">Inprogress; Assignments</option>
          </select>
        )}


        {DeclinedQuery == "DeclinedQuery" && (
          <select
            className="form-select form-control"
            name="p_status"
            ref={register}
            style={{ height: "33px" }}
          >
            <option value="">--select--</option>
            <option value="1">Admin Declined; Queries</option>
            <option value="2">Client Declined; Queries</option>
            <option value="3">Client Declined; Proposals</option>
            <option value="4">Client Declined; Payment</option>
          </select>
        )}

        {proposal == "proposal" && (
          <select
            className="form-select form-control"
            name="p_status"
            ref={register}
            style={{ height: "33px" }}
          >
            <option value="">--select--</option>
            <option value="1">Inprogress Proposals</option>
            <option value="2">Accepted Proposals</option>
            <option value="3">Declined Proposals</option>
          </select>
        )}

        {inprogressProposal == "inprogressProposal" && (
          <select
            className="form-select form-control"
            name="p_status"
            ref={register}
            style={{ height: "33px" }}
          >
            <option value="">--select--</option>
            <option value="4">Inprogress; Preparation</option>
            <option value="5"> Inprogress; Acceptance</option>
          </select>
        )}

        {allPayment == "allPayment" && (
          <select
            className="form-select form-control"
            name="p_status"
            ref={register}
            style={{ height: "33px" }}
          >
            <option value="">--select--</option>
            <option value="1">Unpaid</option>
            <option value="2">Paid</option>
            <option value="3">Declined</option>
          </select>
        )}

        {assignment == "assignment" && (
          <select
            className="form-select form-control"
            name="p_status"
            ref={register}
            style={{ height: "33px" }}
          >
            <option value="">--select--</option>
            <option value="1">Inprogress</option>
            <option value="2">Completed</option>
            <option value="3">Payment Declined</option>
          </select>
        )}

      </div>
      {
            loading ?
              <Spinner color="primary" />
              :
              <button type="submit" className="searchBtn mx-sm-1 mb-2">
              Search
            </button>
          }
      <Reset />
{
query ?
<div className="mx-sm-1" style={{position: "absolute", top: "50%", right: "120px"}}>
<span>
<Link to="/customer/select-category" style={{color : "#fff", textAlign: "right"}}>
<button  className="autoWidthBtn mb-1" style={{marginLeft : "auto", color : "#fff"}}>
Fresh query 
</button> 
</Link>
</span>
</div>
: ""
}
      </div>
          </form>
        </div>
      </div>
         
    </>
  );
}

export default CustomerFilter;


