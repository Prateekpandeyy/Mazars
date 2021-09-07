import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, baseUrl2 } from "../../config/config";
import { useForm } from "react-hook-form";
import { Select } from "antd";

function RecordingFilter(props) {
  const { Option } = Select;
  const { handleSubmit, register, errors, reset } = useForm();

  const {
    records,
    setRecords,
    setData,
    getData,
    SearchQuery,
   
    InprogressQuery,
 
  } = props;
  const userid = window.localStorage.getItem("tpkey");

  const [selectedData, setSelectedData] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [status1, setStatus1] = useState(1);


  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  console.log("current_date :", current_date);
  const [item] = useState(current_date);

 

  
 

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    setSelectedData([]);
    setStore2([]);
    setStatus1(1)
    getData();
  };

  const onSubmit = (data) => {
  console.log()
if(SearchQuery == "SearchQuery") {
   console.log("myQuery", data.queryNo)
    axios
        .get(
          `${baseUrl}/tl/callRecordingPostlist?uid=${JSON.parse(userid)}&assign_id=${data.queryNo}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);

            }
          }
        });
}

    // if (pendingForAcceptence == "pendingForAcceptence") {
    //   axios
    //     .get(
    //       `${baseUrl}/tl/pendingQues?tp_id=${JSON.parse(
    //         userid
    //       )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&pcat_id=${selectedData}`
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.code === 1) {
    //         if (res.data.result) {
    //           setData(res.data.result);
    //           setRecords(res.data.result.length);

    //         }
    //       }
    //     });
    // }

    // if (InprogressQuery == "InprogressQuery") {

    //   console.log("status1", status1)
    //   axios
    //     .get(
    //       `${baseUrl}/tl/getIncompleteQues?tp_id=${JSON.parse(userid)}&status=${status1}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&pcat_id=${selectedData}`
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.code === 1) {
    //         if (res.data.result) {
    //           setData(res.data.result);
    //           setRecords(res.data.result.length);
    //         }
    //       }
    //     });
    // }

    // if (DeclinedQuery == "DeclinedQuery") {
    //   axios
    //     .get(
    //       `${baseUrl}/tl/declinedQueries?tp_id=${JSON.parse(userid)}&status=${data.p_status}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&pcat_id=${selectedData}`
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.code === 1) {
    //         if (res.data.result) {
    //           setData(res.data.result);
    //           setRecords(res.data.result.length);
    //         }
    //       }
    //     });
    // }

    // if (completeAssignment == "completeAssignment") {
    //   axios
    //     .get(
    //       `${baseUrl}/tl/getCompleteQues?tp_id=${JSON.parse(
    //         userid
    //       )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&pcat_id=${selectedData}`
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.code === 1) {
    //         if (res.data.result) {
    //           setData(res.data.result);
    //           setRecords(res.data.result.length);

    //         }
    //       }
    //     });
    // }

    // if (AllProposal == "AllProposal") {
    //   axios
    //     .get(
    //       `${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(
    //         userid
    //       )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
    //       }&status=${data.p_status}&pcat_id=${selectedData}`
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.code === 1) {
    //         if (res.data.result) {
    //           setData(res.data.result);
    //           setRecords(res.data.result.length);
    //         }
    //       }
    //     });
    // }

    // if (InprogressProposal == "InprogressProposal") {
    //   axios
    //     .get(
    //       `${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(
    //         userid
    //       )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
    //       }&status=${data.p_status}&pcat_id=${selectedData}`
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.code === 1) {
    //         if (res.data.result) {
    //           setData(res.data.result);
    //           setRecords(res.data.result.length);
    //         }
    //       }
    //     });
    // }


    // if (AllPayment == "AllPayment") {
    //   axios
    //     .get(
    //       `${baseUrl}/tl/getUploadedProposals?tp_id=${JSON.parse(userid)}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=${data.p_status}&pcat_id=${selectedData}`
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.code === 1) {
    //         if (res.data.result) {
    //           setData(res.data.result);
    //           setRecords(res.data.result.length);
    //         }
    //       }
    //     });
    // }

    // if (Unpaid == "Unpaid") {
    //   axios
    //     .get(
    //       `${baseUrl}/tl/getUploadedProposals?&tp_id=${JSON.parse(userid)}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=1&pcat_id=${selectedData}`
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.code === 1) {
    //         if (res.data.result) {
    //           setData(res.data.result);
    //           setRecords(res.data.result.length);
    //         }
    //       }
    //     });
    // }

    // if (Paid == "Paid") {
    //   axios
    //     .get(
    //       `${baseUrl}/tl/getUploadedProposals?tp_id=${JSON.parse(userid)}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=2&pcat_id=${selectedData}`
    //     )
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.code === 1) {
    //         if (res.data.result) {
    //           setData(res.data.result);
    //           setRecords(res.data.result.length);
    //         }
    //       }
    //     });
    // }
  };


  const Reset = () => {
    return (
      <>
        <button
          type="submit"
          class="btn btn-primary mx-sm-1 mb-2"
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
              <div class="form-inline">
            {/* <input
            type = "text" 
            name = "queryNO"
            className = "form-control"
            name="recordingsearch"/> */}
             <input
                    type="text"
                    name="queryNo"
                    ref={register}
                    className="form-select form-control"
                    
                  />
                <button type="submit" class="btn btn-primary mx-sm-1 mb-2">
                  Search
                </button>
                <Reset />
                <div class="form-group mx-sm-1  mb-2">
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

