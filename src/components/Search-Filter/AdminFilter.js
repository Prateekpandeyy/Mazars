import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
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
    index,
    resetPaging,
    setCountNotification,
    setDefaultPage,
    page,
    setBig,
    setEnd,
  } = props;

  const [selectedData, setSelectedData] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [queryNo, setQueryNo] = useState("");
  const [status, setStatus] = useState("");
  const [categoryData, setCategory] = useState([]);
  const [showSubCat, setShowSubCat] = useState([]);
  const [catShowData, setCatShowData] = useState([]);
  const maxDate = moment(new Date().toISOString().slice(0, 10)).add(1, "days");
  const dateValue = useRef();
  var allEnd = Number(localStorage.getItem("admin_record_per_page"));
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("admincategoryData"));
    setCategory(data);
  }, []);

  //handleCategory
  const handleCategory = (value) => {
    categoryData.map((i) => {
      if (i.details === value) {
        setSelectedData(i.id);
        setCatShowData(i.details);
      }
    });

    setTax2(JSON.parse(localStorage.getItem(`admin${value}`)));
    setStore2([]);
    setShowSubCat([]);
  };

  //handleSubCategory
  const handleSubCategory = (value) => {
    setShowSubCat(value);

    tax2.map((i) => {
      if (i.details == value.at(-1)) {
        setStore2((payload) => {
          return [...payload, i.id];
        });
      }
    });
  };

  //reset category
  const resetCategory = () => {
    setSelectedData([]);
    setTax2([]);
    setShowSubCat([]);
    setCatShowData([]);
    setStore2([]);
    getData();
  };

  //reset date
  const resetData = () => {
    localStorage.removeItem(`searchData${index}`);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    reset();
    setSelectedData([]);
    setShowSubCat([]);
    setCatShowData([]);
    setStore2([]);
    setTax2([]);

    setFromDate("");
    setStatus("");
    setQueryNo("");
    resetPaging();
    let date = moment().format("DD-MM-YYYY");
    let fullDate = date;
    setToDate(fullDate);
    getData(1);
    // dateValue.current.clearValue();
  };
  const updateResult = (res) => {
    let droppage = [];
    let customId = 1;
    if (res.data.code === 1) {
      let all = [];
      let data = res.data.result;
      data.map((i) => {
        let data = {
          ...i,
          cid: customId,
        };
        customId++;
        all.push(data);
      });
      let end = allEnd;

      if (allEnd > res.data.total) {
        end = res.data.total;
      }

      setEnd(end);
      let dynamicPage = Math.ceil(res.data.total / allEnd);

      let rem = (page - 1) * allEnd;
      console.log("page", page);
      if (page === 1) {
        setBig(rem + page);
      } else {
        setBig(rem + 1);
      }
      for (let i = 1; i <= dynamicPage; i++) {
        droppage.push(i);
      }
      setDefaultPage(droppage);
      setData(all);
      setCountNotification(res.data.total);
      setRecords(res.data.total);

      setDefaultPage(droppage);
      resetPaging();
      // if (
      //   Object.keys(returnData).length === 0 &&
      //   returnData.constructor === Object
      // ) {

      // }
    }
  };
  const onSubmit = (data) => {
    console.log("data", data);
    let obj = {};
    if (data.route) {
      obj = {
        store: data.store,
        fromDate: data.fromDate,
        toDate: data.toDate,
        pcatId: data.pcatId,
        query_no: data?.query_no,
        p_status: data?.p_status,
        route: window.location.pathname,
        index: index,
      };
    } else {
      obj = {
        store: store2,
        fromDate: fromDate,
        toDate: toDate,
        pcatId: selectedData,
        query_no: data?.query_no,
        p_status: data?.p_status,
        route: window.location.pathname,
        index: index,
      };
    }

    localStorage.setItem(`searchData${index}`, JSON.stringify(obj));
    if (allQueries == "allQueries") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/admin/getAllQueries?cat_id=${
              data.store
            }&from=${data.fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${data.toDate
              ?.split("-")
              .reverse()
              .join("-")}&status=${data?.p_status}&pcat_id=${data.pcatId}&qno=${
              data?.query_no
            }`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      } else {
        axios
          .get(
            `${baseUrl}/admin/getAllQueries?cat_id=${store2}&from=${fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${toDate?.split("-").reverse().join("-")}&status=${
              data?.p_status
            }&pcat_id=${selectedData}&qno=${data?.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      }
    }

    if (pendingAlloation == "pendingAlloation") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/admin/pendingAllocation?category=${
              data.store
            }&date1=${data.fromDate
              ?.split("-")
              .reverse()
              .join("-")}&date2=${data.toDate
              ?.split("-")
              .reverse()
              .join("-")}&pcat_id=${data.pcatId}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      } else {
        axios
          .get(
            `${baseUrl}/admin/pendingAllocation?category=${store2}&date1=${fromDate
              ?.split("-")
              .reverse()
              .join("-")}&date2=${toDate
              ?.split("-")
              .reverse()
              .join("-")}&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      }
    }
    if (pendingForProposal == "pendingForProposal") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/admin/pendingProposal?category=${
              data.store
            }&from=${data.fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${data.toDate
              ?.split("-")
              .reverse()
              .join("-")}&status=${data.p_status}&pcat_id=${data.pcatId}&qno=${
              data.query_no
            }`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      } else {
        axios
          .get(
            `${baseUrl}/admin/pendingProposal?category=${store2}&from=${fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${toDate?.split("-").reverse().join("-")}&status=${
              data.p_status
            }&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      }
    }
    if (declinedQueries == "declinedQueries") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/admin/declinedQueries?cat_id=${
              data.store
            }&from=${data.fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${data.toDate
              ?.split("-")
              .reverse()
              .join("-")}&status=${data.p_status}&pcat_id=${data.pcatId}&qno=${
              data.query_no
            }`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      } else {
        axios
          .get(
            `${baseUrl}/admin/declinedQueries?cat_id=${store2}&from=${fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${toDate?.split("-").reverse().join("-")}&status=${
              data.p_status
            }&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      }
    }

    if (allProposal == "allProposal") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/admin/getProposals?cat_id=${
              data.store
            }&from=${data.fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${data.toDate
              ?.split("-")
              .reverse()
              .join("-")}&status1=${data.p_status}&pcat_id=${data.pcatId}&qno=${
              data.query_no
            }`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      } else {
        axios
          .get(
            `${baseUrl}/admin/getProposals?cat_id=${store2}&from=${fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${toDate
              ?.split("-")
              .reverse()
              .join("-")}&status1=${
              data.p_status
            }&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      }
    }
    if (pendingAcceptedProposal == "pendingAcceptedProposal") {
      if (data.route) {
        if (data.p_status.length > 0) {
          axios
            .get(
              `${baseUrl}/admin/getProposals?status1=${data.p_status}&cat_id=${
                data.store
              }&from=${data.fromDate
                ?.split("-")
                .reverse()
                .join("-")}&to=${data.toDate
                ?.split("-")
                .reverse()
                .join("-")}&pcat_id=${data.pcatId}&qno=${data.query_no}`,
              myConfig
            )
            .then((res) => {
              updateResult(res);
            });
        } else {
          axios
            .get(
              `${baseUrl}/admin/getProposals?status1=1&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&pcat_id=${data.pcatId}&qno=${data.query_no}`,
              myConfig
            )
            .then((res) => {
              if (res.data.code === 1) {
                let customId = 1;
                let all = [];
                let data = res.data.result;
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                setCountNotification(res.data.total);
                setRecords(res.data.total);
                resetPaging();
              }
            });
        }
      } else {
        if (data.p_status.length > 0) {
          axios
            .get(
              `${baseUrl}/admin/getProposals?status1=${
                data.p_status
              }&cat_id=${store2}&from=${fromDate
                ?.split("-")
                .reverse()
                .join("-")}&to=${toDate
                ?.split("-")
                .reverse()
                .join("-")}&pcat_id=${selectedData}&qno=${data.query_no}`,
              myConfig
            )
            .then((res) => {
              updateResult(res);
            });
        } else {
          axios
            .get(
              `${baseUrl}/admin/getProposals?status1=1&cat_id=${store2}&from=${fromDate}&to=${toDate}&pcat_id=${selectedData}`,
              myConfig
            )
            .then((res) => {
              updateResult(res);
            });
        }
      }
    }
    if (acceptedProposal == "acceptedProposal") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/admin/getProposals?status1=2&cat_id=${
              data.store
            }&from=${data.fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${data.toDate
              ?.split("-")
              .reverse()
              .join("-")}&pcat_id=${data.pcatId}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      } else {
        axios
          .get(
            `${baseUrl}/admin/getProposals?status1=2&cat_id=${store2}&from=${fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${toDate
              ?.split("-")
              .reverse()
              .join("-")}&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      }
    }

    if (declinedProposal == "declinedProposal") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/admin/getProposals?&status=6&cat_id=${
              data.store
            }&from=${data.fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${data.toDate
              ?.split("-")
              .reverse()
              .join("-")}&pcat_id=${data.pcatId}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      } else {
        axios
          .get(
            `${baseUrl}/admin/getProposals?&status=6&cat_id=${store2}&from=${fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${toDate
              ?.split("-")
              .reverse()
              .join("-")}&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      }
    }

    if (AllPayment == "AllPayment") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/admin/getUploadedProposals?cat_id=${
              data.store
            }&from=${data.fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${data.toDate
              ?.split("-")
              .reverse()
              .join("-")}&status=${data.p_status}&pcat_id=${data.pcatId}&qno=${
              data.query_no
            }`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      } else {
        axios
          .get(
            `${baseUrl}/admin/getUploadedProposals?cat_id=${store2}&from=${fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${toDate?.split("-").reverse().join("-")}&status=${
              data.p_status
            }&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      }
    }

    if (unpaid == "unpaid") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/admin/getUploadedProposals?cat_id=${
              data.store
            }&from=${data.fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${data.toDate
              ?.split("-")
              .reverse()
              .join("-")}&status=1&pcat_id=${data.pcatId}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      } else {
        axios
          .get(
            `${baseUrl}/admin/getUploadedProposals?cat_id=${store2}&from=${fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${toDate
              ?.split("-")
              .reverse()
              .join("-")}&status=1&pcat_id=${selectedData}&qno=${
              data.query_no
            }`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      }
    }

    if (paid == "paid") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/admin/getUploadedProposals?cat_id=${
              data.store
            }&from=${data.fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${data.toDate
              ?.split("-")
              .reverse()
              .join("-")}&status=2&pcat_id=${data.pcatId}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      } else {
        axios
          .get(
            `${baseUrl}/admin/getUploadedProposals?cat_id=${store2}&from=${fromDate
              ?.split("-")
              .reverse()
              .join("-")}&to=${toDate
              ?.split("-")
              .reverse()
              .join("-")}&status=2&pcat_id=${selectedData}&qno=${
              data.query_no
            }`,
            myConfig
          )
          .then((res) => {
            updateResult(res);
          });
      }
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
  useEffect(() => {
    let dk = JSON.parse(localStorage.getItem(`searchData${index}`));

    if (dk) {
      if (dk.route === window.location.pathname && dk.index === index) {
        let parentId = "";
        let catData = JSON.parse(localStorage.getItem("admincategoryData"));
        catData.forEach((element) => {
          if (element.id === dk.pcatId) {
            setCatShowData(element.details);
            parentId = element.details;
          }
        });
        let subCat = JSON.parse(localStorage.getItem(`admin${parentId}`));
        setTax2(subCat);

        subCat?.map((i) => {
          if (dk.store.includes(i.id)) {
            setShowSubCat((payload) => {
              return [...payload, i.details];
            });
          }
        });
        setStore2(dk.store);
        setToDate(dk.toDate);
        setFromDate(dk.fromDate);
        setSelectedData(dk.pcatId);
        setStatus(dk.p_status);
        setQueryNo(dk.query_no);
        // onSubmit(dk);
      }
    } else if (!dk?.toDate) {
      let date = moment().format("DD-MM-YYYY");
      let fullDate = date;
      setToDate(fullDate);
    }
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-sm-12 d-flex">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-inline">
                <div className="form-group mb-2">
                  <Select
                    style={{ width: 150 }}
                    placeholder="Select Category"
                    onChange={handleCategory}
                    value={catShowData}
                  >
                    {categoryData.map((p, index) => (
                      <Option value={p.details} key={index}>
                        {p.details}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="form-group mx-sm-1  mb-2">
                  <Select
                    mode="multiple"
                    style={{ width: 250 }}
                    placeholder="Select Sub Category"
                    defaultValue={[]}
                    onChange={handleSubCategory}
                    value={showSubCat}
                    allowClear
                  >
                    {tax2?.map((p, index) => (
                      <Option value={p.details} key={index}>
                        {p.details}
                      </Option>
                    ))}
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

                {fromDate.length > 0 ? (
                  <div className="form-group mx-sm-1  mb-2">
                    <DatePicker
                      ref={dateValue}
                      onChange={(e) =>
                        setFromDate(moment(e).format("DD-MM-YYYY"))
                      }
                      disabledDate={(d) => !d || d.isAfter(maxDate)}
                      format={dateFormatList}
                      defaultValue={moment(fromDate, dateFormatList)}
                    />
                  </div>
                ) : (
                  ""
                )}
                {fromDate.length === 0 ? (
                  <div className="form-group mx-sm-1  mb-2">
                    <DatePicker
                      ref={dateValue}
                      onChange={(e) =>
                        setFromDate(moment(e).format("DD-MM-YYYY"))
                      }
                      disabledDate={(d) => !d || d.isAfter(maxDate)}
                      format={dateFormatList}
                    />
                  </div>
                ) : (
                  ""
                )}

                <div className="form-group mx-sm-1  mb-2">
                  <label className="form-select form-control">To</label>
                </div>

                <div className="form-group mx-sm-1  mb-2">
                  {toDate.length > 0 ? (
                    <DatePicker
                      ref={dateValue}
                      onChange={(e) =>
                        setToDate(moment(e).format("DD-MM-YYYY"))
                      }
                      disabledDate={(d) => !d || d.isAfter(maxDate)}
                      format={dateFormatList}
                      defaultValue={moment(toDate, dateFormatList)}
                    />
                  ) : (
                    ""
                  )}
                  {toDate.length === 0 ? (
                    <DatePicker
                      onChange={(e) =>
                        setToDate(moment(e).format("DD-MM-YYYY"))
                      }
                      disabledDate={(d) => !d || d.isAfter(maxDate)}
                      defaultValue={moment(new Date(), "DD MM, YYYY")}
                      format={dateFormatList}
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group mx-sm-1  mb-2">
                  {allQueries == "allQueries" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
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
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
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
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
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
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                    >
                      <option value="">--select--</option>
                      <option value="1">Inprogress Proposals</option>
                      <option value="2">Accepted Proposals</option>
                      <option value="3">Client Declined Proposals</option>
                    </select>
                  )}

                  {declinedQueries == "declinedQueries" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                    >
                      <option value="">--select--</option>
                      <option value="1">Admin Declined; Queries</option>
                      <option value="2">Client Declined; Queries</option>
                      <option value="3">Client Declined; Proposals</option>
                      <option value="4">Client Declined; Payment</option>
                    </select>
                  )}

                  {AllPayment == "AllPayment" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                      style={{ height: "33px" }}
                    >
                      <option value="">--select--</option>
                      <option value="1">Unpaid</option>
                      <option value="2">Paid</option>
                      <option value="3">Declined</option>
                    </select>
                  )}
                </div>
                <div className="form-group mx-sm-1  mb-2">
                  <input
                    type="text"
                    name="query_no"
                    ref={register}
                    placeholder="Enter Query Number"
                    className="form-control"
                    onChange={(e) => setQueryNo(e.target.value)}
                    value={queryNo}
                  />
                </div>
                <button type="submit" className="searchBtn mx-sm-1 mb-2">
                  Search
                </button>
                <Reset />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminFilter;
