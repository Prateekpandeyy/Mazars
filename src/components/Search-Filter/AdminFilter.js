import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { Select } from "antd";

function AdminFilter(props) {
  const { Option } = Select;
  const { handleSubmit, register, errors, reset } = useForm();

  const {
    records,
    setRecords,
    setData,
    getData,
    acceptedProposal,
    pendingAcceptedProposal,
    declinedProposal,
    declinedQueries,
    pendingForProposal,
    pendingAlloation,
    allQueries,
    assignment,
    allProposal,
    AllPayment,
    paid,
    unpaid,
  } = props;

  const [selectedData, setSelectedData] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);

  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  console.log("current_date :", current_date);
  const [item] = useState(current_date);


  //get category
  useEffect(() => {
    const getSubCategory = () => {
      if(selectedData.length > 0){
        axios
        .get(`${baseUrl}/customers/getCategory?pid=${selectedData}`)
        .then((res) => {
          console.log(res);
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
    console.log(`selected ${value}`);
    setSelectedData(value);
    setStore2([]);
  };

  //handleSubCategory
  const handleSubCategory = (value) => {
    console.log(`selected ${value}`);
    setStore2(value);
  };

  //reset category
  const resetCategory = () => {
    console.log("resetCategory ..");
    setSelectedData([]);
    setTax2([])
    setStore2([]);
    getData();
  };

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    setSelectedData([]);
    setStore2([]);
    getData();
  };


  const onSubmit = (data) => {

    console.log("data", data)


    console.log("item", item)
    console.log("data", data)



    if (acceptedProposal == "acceptedProposal") {
      axios
        .get(
          `${baseUrl}/admin/getProposals?status1=2&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&pcat_id=${selectedData}`
        )
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

    if (pendingAcceptedProposal == "pendingAcceptedProposal") {
      axios
        .get(
          `${baseUrl}/admin/getProposals?status1=${data.p_status}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&pcat_id=${selectedData}`
        )
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

    if (declinedProposal == "declinedProposal") {
      axios
        .get(
          `${baseUrl}/admin/getProposals?&status=6&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&pcat_id=${selectedData}`
        )
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

    if (declinedQueries == "declinedQueries") {
      axios
        .get(
          `${baseUrl}/admin/declinedQueries?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=${data.p_status}&pcat_id=${selectedData}`
        )
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

    if (pendingForProposal == "pendingForProposal") {
      axios
        .get(
          `${baseUrl}/admin/pendingProposal?category=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=${data.p_status}&pcat_id=${selectedData}`
        )
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

    if (allQueries == "allQueries") {
      axios
        .get(
          `${baseUrl}/admin/getAllQueries?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=${data.p_status}&pcat_id=${selectedData}`
        )
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

    if (pendingAlloation == "pendingAlloation") {
      axios
        .get(
          `${baseUrl}/admin/pendingAllocation?category=${store2}&date1=${data.p_dateFrom}&date2=${data.p_dateTo}&pcat_id=${selectedData}`
        )
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

    if (AllPayment == "AllPayment") {
      axios
        .get(
          `${baseUrl}/tl/getUploadedProposals?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=${data.p_status}&pcat_id=${selectedData}`
        )
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

    if (unpaid == "unpaid") {
      axios
        .get(
          `${baseUrl}/tl/getUploadedProposals?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=1&pcat_id=${selectedData}`
        )
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

    if (paid == "paid") {
      axios
        .get(
          `${baseUrl}/tl/getUploadedProposals?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=2&pcat_id=${selectedData}`
        )
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

    if (allProposal == "allProposal") {
      axios
        .get(
          `${baseUrl}/admin/getProposals?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status1=${data.p_status}&pcat_id=${selectedData}`
        )
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
                <div class="form-group mb-2">
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

                <div class="form-group mx-sm-1  mb-2">
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
                <div>
                  <button
                    type="submit"
                    class="btn btn-primary mb-2 ml-3"
                    onClick={resetCategory}
                  >
                    X
                  </button>
                </div>

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

                <div class="form-group mx-sm-1  mb-2">
                  {allQueries == "allQueries" && (
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

                  {pendingAcceptedProposal == "pendingAcceptedProposal" && (
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

                  {pendingForProposal == "pendingForProposal" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                    >
                      <option value="">--select--</option>
                      <option value="1">Inprogress; Preparation</option>
                      <option value="2"> Inprogress; Acceptance</option>
                    </select>
                  )}

                  {allProposal == "allProposal" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                    >
                      <option value="">--select--</option>
                      <option value="1">Inprogress Proposals</option>
                      <option value="2">Accepted Proposals</option>
                      <option value="3">Customer Declined Proposals</option>
                    </select>
                  )}

                  {declinedQueries == "declinedQueries" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                    >
                      <option value="">--select--</option>
                      <option value="1">Admin Declined; Queries</option>
                      <option value="2">Customer Declined; Queries</option>
                      <option value="3">Customer Declined; Proposals</option>
                      <option value="4">Customer Declined; Payment</option>
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
                    </select>
                  )}
                </div>

                <button type="submit" class="btn btn-primary mx-sm-1 mb-2">
                  Search
                </button>
                <Reset />

                {/* <div class="form-group mb-2">
                  <label className="form-select form-control"
                  >Total Records : {records}</label>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminFilter;


   // console.log("End data :", data.p_dateTo);

    // var dateto = data.p_dateTo

    // var end_date;
    // if (dateto == "") {

    //   console.log("call")

    // var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
    // console.log("current_date :", current_date);
    //   end_date = current_date

    //   // if (current_date) {
    //   //   setItem(current_date)
    //   // }

    // } else {
    //   end_date = dateto
    //   // setItem(dateto)

    // }