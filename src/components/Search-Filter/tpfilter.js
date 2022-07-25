
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from "moment";
const dateFormat = 'YYYY/MM/DD';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
function TaxProfessionalFilter(props) {
  const { Option } = Select;
  const { handleSubmit, register, errors, reset } = useForm();

  const {
    records,
    setRecords,
    setData,
    getData,
    AllQuery,
    pendingForAcceptence,
    InprogressQuery,
    DeclinedQuery,

    completeAssignment,
    proposal,
    AllProposal,
    InprogressProposal,
    assignment,
    AllPayment,
    Unpaid,
    Paid
  } = props;
  const userid = window.localStorage.getItem("tpkey");

  const [selectedData, setSelectedData] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [status1, setStatus1] = useState(1);
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10))
  const maxDate = moment(new Date().toISOString().slice(0, 10)).add(1, "days")

  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  
  const [item] = useState(current_date);
  const token = window.localStorage.getItem("tptoken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
    const fromDateFun = (e) => {
      setFromDate(e.format("YYYY-MM-DD"))
    }
  useEffect(() => {
    const getSubCategory = () => {
      if(selectedData.length > 0){
        axios
        .get(`${baseUrl}/customers/getCategory?pid=${selectedData}`)
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
    setTax2([])
    getData();
  };

  //reset date
  const resetData = () => {
  
    reset();
    setSelectedData([]);
    setStore2([]);
    setStatus1(1)
    setTax2([])
    getData();
  };

  const onSubmit = (data) => {
  
    if (AllQuery == "AllQuery") {
      axios
        .get(
          `${baseUrl}/tl/getIncompleteQues?tp_id=${JSON.parse(userid)}&status=${data.p_status}&cat_id=${store2}&from=${fromDate}&to=${toDate}&pcat_id=${selectedData}`
          , myConfig
        )
        .then((res) => {
       
          if (res.data.code === 1) {
            if (res.data.result) {
              console.log("done")
              setData(res.data.result);
              setRecords(res.data.result.length);

            }
          }
        });
    }


    if (pendingForAcceptence == "pendingForAcceptence") {
      axios
        .get(
          `${baseUrl}/tl/pendingQues?tp_id=${JSON.parse(
            userid
          )}&cat_id=${store2}&from=${fromDate}&to=${toDate}&pcat_id=${selectedData}`
        )
        .then((res) => {

          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);

            }
          }
        });
    }

    if (InprogressQuery == "InprogressQuery") {

  
      axios
        .get(
          `${baseUrl}/tl/getIncompleteQues?tp_id=${JSON.parse(userid)}&status=${status1}&cat_id=${store2}&from=${fromDate}&to=${toDate}&pcat_id=${selectedData}`
        )
        .then((res) => {
        
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
    }

    if (DeclinedQuery == "DeclinedQuery") {
      axios
        .get(
          `${baseUrl}/tl/declinedQueries?tp_id=${JSON.parse(userid)}&status=${data.p_status}&cat_id=${store2}&from=${fromDate}&to=${toDate}&pcat_id=${selectedData}`
        )
        .then((res) => {

          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
    }

    if (completeAssignment == "completeAssignment") {
      axios
        .get(
          `${baseUrl}/tl/getCompleteQues?tp_id=${JSON.parse(
            userid
          )}&cat_id=${store2}&from=${fromDate}&to=${toDate}&pcat_id=${selectedData}`
        )
        .then((res) => {
        
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);

            }
          }
        });
    }

    if (AllProposal == "AllProposal") {
      axios
        .get(
          `${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(
            userid
          )}&cat_id=${store2}&from=${fromDate}&to=${toDate
          }&status=${data.p_status}&pcat_id=${selectedData}`
        )
        .then((res) => {

          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
    }

    if (InprogressProposal == "InprogressProposal") {
      axios
        .get(
          `${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(
            userid
          )}&cat_id=${store2}&from=${fromDate}&to=${toDate
          }&status=${data.p_status}&pcat_id=${selectedData}`
        )
        .then((res) => {
       
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
    }

    if(proposal == "proposal"){
      axios
      .get(
        `${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(
          userid
        )}&cat_id=${store2}&from=${fromDate}&to=${toDate
        }&status=2&pcat_id=${selectedData}`
      )
      .then((res) => {

        if (res.data.code === 1) {
          if (res.data.result) {
            setData(res.data.result);
            setRecords(res.data.result.length);
          }
        }
      });
    }
    if (AllPayment == "AllPayment") {
      axios
        .get(
          `${baseUrl}/tl/getUploadedProposals?tp_id=${JSON.parse(userid)}&cat_id=${store2}&from=${fromDate}&to=${toDate}&status=${data.p_status}&pcat_id=${selectedData}`
        )
        .then((res) => {
        
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
    }

    if (Unpaid == "Unpaid") {
      axios
        .get(
          `${baseUrl}/tl/getUploadedProposals?&tp_id=${JSON.parse(userid)}&cat_id=${store2}&from=${fromDate}&to=${toDate}&status=1&pcat_id=${selectedData}`
        )
        .then((res) => {
        
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
    }

    if (Paid == "Paid") {
      axios
        .get(
          `${baseUrl}/tl/getUploadedProposals?tp_id=${JSON.parse(userid)}&cat_id=${store2}&from=${fromDate}&to=${toDate}&status=2&pcat_id=${selectedData}`
        )
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
          className="customBtn mx-sm-1 mb-2"
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
                <div className="form-group mb-2">
                  <Select
                    style={{ width: 130 }}
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
                    onChange={(e) => handleSubCategory(e)}
                    value={store2}
                    allowClear
                  >
                   {
                     tax2.length > 0 ?
                     <>
                      {tax2?.map((p, index) => (
                      <Option value={p.id} key={index}>
                        {p.details}
                      </Option>
                    ))}
                     </> : ""
                   }
                  </Select>
                </div>

                <div>
                  <button
                    type="submit"
                    className="btnSearch mb-2 ml-3"
                    onClick={resetCategory}
                  >
                    X
                  </button>
                </div>

                <div className="form-group mx-sm-1  mb-2">
                  <label className="form-select form-control">From</label>
                </div>

                <div className="form-group mx-sm-1  mb-2">
                  {/* <input
                    type="date"
                    name="p_dateFrom"
                    className="form-select form-control"
                    ref={register}
                    max={item}
                  /> */}
                    <DatePicker 
                 
                 onChange={(e) =>fromDateFun(e)}
                 disabledDate={d => !d || d.isAfter(maxDate) }
                  format={dateFormatList} />
                </div>

                <div className="form-group mx-sm-1  mb-2">
                  <label className="form-select form-control">To</label>
                </div>

                <div className="form-group mx-sm-1  mb-2">
                  {/* <input
                    type="date"
                    name="p_dateTo"
                    className="form-select form-control"
                    ref={register}
                    defaultValue={item}
                    max={item}
                  /> */}
                    <DatePicker 
                 onChange={(e) =>setToDate(e.format("YYYY-MM-DD"))}
                 defaultValue={moment(new Date(), "DD MM, YYYY")}
                 disabledDate={d => !d || d.isAfter(maxDate) }
                    format={dateFormatList} />
                </div>

                <div className="form-group mx-sm-1  mb-2">

                  {AllQuery == "AllQuery" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                    >
                      <option value="">--select--</option>
                      <option value="1">Inprogress; Queries</option>
                      <option value="2">Completed; Queries</option>
                      <option value="3">Declined; Queries</option>
                    </select>
                  )}

                  {InprogressQuery == "InprogressQuery" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                      onChange={(e) => setStatus1(e.target.value)}
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
                      <option value="3">Client Declined; Proposals</option>
                      <option value="4">Client Declined; Payment</option>
                    </select>
                  )}

                  {AllProposal == "AllProposal" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                    >
                      <option value="">--select--</option>
                      <option value="1">Inprogress; Proposals</option>
                      <option value="2">Accepted; Proposals</option>
                      <option value="3">Client Declined; Proposals</option>
                    </select>
                  )}

                  {InprogressProposal == "InprogressProposal" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                    >
                      <option value="">--select--</option>
                      <option value="4">Inprogress; Preparation</option>
                      <option value="5">Inprogress; Acceptance</option>
                    </select>
                  )}

                  {AllPayment == "AllPayment" && (
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
                </div>

                <button type="submit" className="customBtn mx-sm-1 mb-2">
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

export default TaxProfessionalFilter;

