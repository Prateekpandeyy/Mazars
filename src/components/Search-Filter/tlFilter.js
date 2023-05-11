import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { current_date } from "../../common/globalVeriable";
import { Row, Col } from "reactstrap";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
function TeamFilter(props) {
  const dateValue = useRef(null);
  const { Option } = Select;
  const { handleSubmit, register, errors, reset } = useForm();

  const {
    records,
    setRecords,
    setData,
    getData,
    AllQuery,
    inCompleteQuery,
    InprogressQuery,
    DeclinedQuery,
    pendingForAcceptence,
    completeAssignment,
    AllProposal,
    InprogressProposal,
    proposal,
    assignment,
    AllPayment,
    Unpaid,
    Paid,
    index,
    countNotification,
    setCountNotification,
    big,
    end,
    setBig,
    setEnd,
    pageValue,
    page,
    setPage,
    defaultPage,
    setDefaultPage,
    localAccend,
    localPrev,
    localSorted,
  } = props;
  const userid = window.localStorage.getItem("tlkey");

  const [selectedData, setSelectedData] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [queryNo, setQueryNo] = useState("");
  const [status, setStatus] = useState("");
  const maxDate = moment(new Date().toISOString().slice(0, 10)).add(1, "days");
  const [categoryData, setCategory] = useState([]);
  const [showSubCat, setShowSubCat] = useState([]);
  const [catShowData, setCatShowData] = useState([]);
  const [searchResult, setSearchResult] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  // const [big, setBig] = useState(1);
  // const [end, setEnd] = useState(50);
  // const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);

  var allEnd = Number(localStorage.getItem("tl_record_per_page"));
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("tlcategoryData"));
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

    setTax2(JSON.parse(localStorage.getItem(`tl${value}`)));
    setStore2([]);
    setShowSubCat([]);
  };

  //handleSubCategory
  const handleSubCategory = (value) => {
    setShowSubCat(value);
    let allId = [];
    tax2.map((id) => {
      value.map((i) => {
        if (i === id.details) {
          allId.push(id.id);
        }
      });
    });
    setStore2(allId);
  };

  //reset category
  const resetCategory = () => {
    setSelectedData([]);
    setStore2([]);
    setTax2([]);
    setShowSubCat([]);
    setCatShowData([]);
    getData();
  };

  //reset date
  const resetData = () => {
    localStorage.removeItem(`searchData${index}`);
    localStorage.removeItem(pageValue);
    localStorage.removeItem(localAccend);
    localStorage.removeItem(localSorted);
    localStorage.removeItem(localPrev);
    reset();
    setSearchResult(true);
    setSelectedData([]);
    setStore2([]);
    setStatus(1);
    setTax2([]);
    setShowSubCat([]);
    setCatShowData([]);
    setFromDate("");
    setStatus("");
    setQueryNo("");
    let date = moment().format("DD-MM-YYYY");
    let fullDate = date;

    setToDate("");
    getData(1);
    // dateValue.current.clearValue();
  };
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    let dk = JSON.parse(localStorage.getItem(`searchData${index}`));

    if (dk) {
      if (dk.route === window.location.pathname && dk.index === index) {
        let parentId = "";
        let catData = JSON.parse(localStorage.getItem("tlcategoryData"));
        catData.forEach((element) => {
          if (element.id === dk.pcatId) {
            console.log("eleent", element.details);
            setCatShowData(element.details);
            parentId = element.details;
          }
        });
        let subCat = JSON.parse(localStorage.getItem(`tl${parentId}`));
        console.log("parentId", catData);
        setTax2(subCat);
        if (subCat && subCat.length > 0) {
          subCat?.map((i) => {
            if (dk.store.includes(i.id)) {
              setShowSubCat((payload) => {
                return [...payload, i.details];
              });
            }
          });
        }
        setStore2(dk.store);
        setToDate(dk.toDate);
        setFromDate(dk.fromDate);
        setSelectedData(dk.pcatId);
        setStatus(dk.p_status);
        setQueryNo(dk.query_no);
      }
    } else if (!dk?.toDate) {
      let date = moment().format("DD-MM-YYYY");
      let fullDate = date;
      setToDate(fullDate);
    }
  }, []);
  const updateResult = (res) => {
    console.log("allData", res);

    localStorage.removeItem(pageValue);
    localStorage.removeItem(localAccend);
    localStorage.removeItem(localSorted);
    localStorage.removeItem(localPrev);
    let droppage = [];
    let customId = 1;
    if (res.data.code == 1) {
      setBig(1);
      setPage(1);
      let all = [];
      let data = res.data.result;
      if (data.length > 0) {
        setSearchResult(true);
      } else {
        setSearchResult(false);
      }
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

      for (let i = 1; i <= dynamicPage; i++) {
        droppage.push(i);
      }
      setDefaultPage(droppage);
      setData(all);
      setCountNotification(res.data.total);
      setRecords(res.data.total);

      setDefaultPage(droppage);
      // resetPaging();
      // if (
      //   Object.keys(returnData).length === 0 &&
      //   returnData.constructor === Object
      // ) {

      // }
    }
  };
  const dateFormat = (e, b) => {
    console.log(e, b);
    let k = "";
    if (e) {
      let date = e.split("-").reverse().join("-");
      return date;
    } else if (b === "toDate") {
      let k = moment().format("YYYY-MM-DD");
      return k;
    } else {
      return k;
    }
  };
  const onSubmit = (data) => {
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
    if (AllQuery == "AllQuery") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}&status=${
              data.p_status
            }&cat_id=${data.store}&from=${dateFormat(
              data.fromDate,
              "fromDate"
            )}&to=${dateFormat(data.toDate, "toDate")}&pcat_id=${
              data.pcatId
            }&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      } else {
        console.log("hidding");
        axios
          .get(
            `${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}&status=${
              data.p_status
            }&cat_id=${store2}&from=${dateFormat(
              fromDate,
              "fromDate"
            )}&to=${dateFormat(toDate, "toDate")}&pcat_id=${selectedData}&qno=${
              data.query_no
            }`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      }
    }

    if (pendingForAcceptence == "pendingForAcceptence") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/pendingQues?id=${JSON.parse(userid)}&cat_id=${
              data.store
            }from=${dateFormat(data.fromDate, "fromDate")}&to=${dateFormat(
              data.toDate,
              "toDate"
            )}&pcat_id=${data.pcatId}&qno=${data.query_no}`,
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
            `${baseUrl}/tl/pendingQues?id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${dateFormat(
              fromDate,
              "fromDate"
            )}&to=${dateFormat(toDate, "toDate")}&pcat_id=${selectedData}&qno=${
              data.query_no
            }`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      }
    }

    if (InprogressQuery == "InprogressQuery") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(
              userid
            )}&status=${status}&cat_id=${data.store}&from=${dateFormat(
              data.fromDate,
              "fromDate"
            )}&to=${dateFormat(data.toDate, "toDate")}&pcat_id=${
              data.pcatId
            }&qno=${data.query_no}`,
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
            `${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(
              userid
            )}&status=${status}&cat_id=${store2}&from=${dateFormat(
              fromDate
            )}&to=${dateFormat(toDate)}&pcat_id=${selectedData}&qno=${
              data.query_no
            }`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      }
    }
    if (inCompleteQuery == "inCompleteQuery") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/pendingAllocation?id=${JSON.parse(
              userid
            )}&status=${status}&cat_id=${data.store}&from=${dateFormat(
              data.fromDate,
              "fromDate"
            )}&to=${dateFormat(data.toDate, "toDate")}&pcat_id=${
              data.pcatId
            }&qno=${data.query_no}`,
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
            `${baseUrl}/tl/pendingAllocation?id=${JSON.parse(
              userid
            )}&status=${status}&cat_id=${store2}&from=${dateFormat(
              fromDate,
              "fromDate"
            )}&to=${dateFormat(toDate, "toDate")}&pcat_id=${selectedData}&qno=${
              data.query_no
            }`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      }
    }

    if (DeclinedQuery == "DeclinedQuery") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/declinedQueries?id=${JSON.parse(userid)}&status=${
              data.p_status
            }&cat_id=${data.store}&from=${dateFormat(
              data.fromDate,
              "fromDate"
            )}&to=${dateFormat(data.toDate, "toDate")}&pcat_id=${
              data.pcatId
            }&qno=${data.query_no}`,
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
            `${baseUrl}/tl/declinedQueries?id=${JSON.parse(userid)}&status=${
              data.p_status
            }&cat_id=${store2}&from=${dateFormat(
              fromDate,
              "fromDate"
            )}&to=${dateFormat(toDate, "toDate")}&pcat_id=${selectedData}&qno=${
              data.query_no
            }`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      }
    }

    if (completeAssignment == "completeAssignment") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getCompleteQues?id=${JSON.parse(userid)}&cat_id=${
              data.store
            }from=${dateFormat(data.fromDate, "fromDate")}&to=${dateFormat(
              data.toDate,
              "toDate"
            )}&pcat_id=${data.pcatId}&qno=${data.query_no}`,
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
            `${baseUrl}/tl/getCompleteQues?id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${dateFormat(
              fromDate,
              "fromDate"
            )}&to=${dateFormat(toDate, "toDate")}&pcat_id=${selectedData}&qno=${
              data.query_no
            }`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      }
    }

    if (AllProposal == "AllProposal") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getProposalTl?id=${JSON.parse(userid)}&cat_id=${
              data.store
            }from=${dateFormat(data.fromDate, "fromDate")}&to=${dateFormat(
              data.toDate,
              "toDate"
            )}&status=${data.p_status}&pcat_id=${data.pcatId}&qno=${
              data.query_no
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
            `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${dateFormat(
              fromDate,
              "fromDate"
            )}&to=${dateFormat(toDate, "toDate")}&status=${
              data.p_status
            }&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      }
    }

    if (InprogressProposal == "InprogressProposal") {
      if (data.route) {
        if (data.p_status.length > 0) {
          axios
            .get(
              `${baseUrl}/tl/getProposalTl?id=${JSON.parse(userid)}&cat_id=${
                data.store
              }&from=${dateFormat(data.fromDate)}&to=${dateFormat(
                data.toDate
              )}&status=${data.p_status}&pcat_id=${data.pcatId}&qno=${
                data.query_no
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
              `${baseUrl}/tl/getProposalTl?id=${JSON.parse(userid)}&cat_id=${
                data.store
              }&from=${dateFormat(data.fromDate)}&to=${dateFormat(
                data.toDate
              )}&status=1&pcat_id=${data.pcatId}`,
              myConfig
            )
            .then((res) => {
              if (res.data.code === 1) {
                updateResult(res);
              }
            });
        }
      } else {
        if (data.p_status.length > 0) {
          axios
            .get(
              `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
                userid
              )}&cat_id=${store2}from=${dateFormat(fromDate)}&to=${dateFormat(
                toDate
              )}&status=${data.p_status}&pcat_id=${selectedData}&qno=${
                data.query_no
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
              `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
                userid
              )}&cat_id=${store2}&from=${dateFormat(fromDate)}&to=${dateFormat(
                toDate
              )}&status=1&pcat_id=${selectedData}`,
              myConfig
            )
            .then((res) => {
              if (res.data.code === 1) {
                updateResult(res);
              }
            });
        }
      }
    }
    if (proposal === "acceptedProposal") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getProposalTl?id=${JSON.parse(userid)}&cat_id=${
              data.store
            }from=${dateFormat(data.fromDate, "fromDate")}&to=${dateFormat(
              data.toDate,
              "toDate"
            )}&status=2&pcat_id=${data.pcatId}&qno=${data.query_no}`,
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
            `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${dateFormat(
              fromDate,
              "fromDate"
            )}&to=${dateFormat(
              toDate,
              "toDate"
            )}&status=2&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      }
    }

    if (proposal == "proposal") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getProposalTl?id=${JSON.parse(userid)}&cat_id=${
              data.store
            }from=${dateFormat(data.fromDate, "fromDate")}&to=${dateFormat(
              data.toDate,
              "toDate"
            )}&status=3&pcat_id=${data.pcatId}&qno=${data.query_no}`,
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
            `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${dateFormat(
              fromDate,
              "fromDate"
            )}&to=${dateFormat(
              toDate,
              "toDate"
            )}&status=3&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      }
    }

    if (AllPayment == "AllPayment") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${dateFormat(
              data.fromDate,
              "fromDate"
            )}&to=${dateFormat(data.toDate, "toDate")}&status=${
              data.p_status
            }&pcat_id=${data.pcatId}&qno=${data.query_no}`,
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
            `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${dateFormat(
              fromDate,
              "fromDate"
            )}&to=${dateFormat(toDate, "toDate")}&status=${
              data.p_status
            }&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      }
    }

    if (Unpaid == "Unpaid") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${dateFormat(
              data.fromDate,
              "fromDate"
            )}&to=${dateFormat(data.toDate, "toDate")}&status=1&pcat_id=${
              data.pcatId
            }&qno=${data.query_no}`,
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
            `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${dateFormat(
              fromDate,
              "fromDate"
            )}&to=${dateFormat(
              toDate,
              "toDate"
            )}&status=1&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      }
    }

    if (Paid == "Paid") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${dateFormat(
              data.fromDate,
              "fromDate"
            )}&to=${dateFormat(data.toDate, "toDate")}&status=2&pcat_id=${
              data.pcatId
            }&qno=${data.query_no}`,
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
            `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${dateFormat(
              fromDate,
              "fromDate"
            )}&to=${dateFormat(
              toDate,
              "toDate"
            )}&status=2&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              updateResult(res);
            }
          });
      }
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

  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getData(1);
    localStorage.setItem(pageValue, 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getData(page - 1);
    localStorage.setItem(pageValue, Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    localStorage.setItem(pageValue, Number(page) + 1);
    getData(page + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getData(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem(pageValue, defaultPage.at(-1));
  };

  useEffect(() => {
    if (countNotification == 0) {
      setSearchResult(false);
    } else {
      setSearchResult(true);
    }
  }, [countNotification]);

  // console.log("selectedData", selectedData);
  return (
    <>
      {categoryData.length > 0 ? (
        <>
          <div className="row">
            <div className="col-sm-12 d-flex">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-inline">
                  <div className="form-group mb-2">
                    <Select
                      style={{ width: 130 }}
                      placeholder="Select Category"
                      defaultValue={[]}
                      onChange={handleCategory}
                      value={catShowData}
                    >
                      {categoryData?.map((p, index) => (
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
                    {AllQuery == "AllQuery" && (
                      <select
                        className="form-select form-control"
                        name="p_status"
                        ref={register}
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
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
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                      >
                        <option value="">--select--</option>
                        <option value="4">Inprogress Acceptance</option>
                        <option value="5">Inprogress; Proposal</option>
                        <option value="6">Inprogress; Assignment</option>
                      </select>
                    )}

                    {DeclinedQuery == "DeclinedQuery" && (
                      <select
                        className="form-select form-control"
                        name="p_status"
                        ref={register}
                        style={{ height: "33px" }}
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
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
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
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
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
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
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
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
                  <button type="submit" className="customBtn mx-sm-1 mb-2">
                    Search
                  </button>
                  <Reset />
                </div>
              </form>
            </div>
          </div>
          {searchResult === true ? (
            <Row>
              <Col md="12" align="right">
                <div className="customPagination">
                  <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                    <span className="customPaginationSpan">
                      {big}-{end} of {countNotification}
                    </span>
                    <span className="d-flex">
                      {page > 1 ? (
                        <>
                          <button
                            className="navButton"
                            onClick={(e) => firstChunk()}
                          >
                            <KeyboardDoubleArrowLeftIcon />
                          </button>
                          <button
                            className="navButton"
                            onClick={(e) => prevChunk()}
                          >
                            <KeyboardArrowLeftIcon />
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                      <div className="navButtonSelectDiv">
                        <select
                          value={page}
                          onChange={(e) => {
                            setPage(Number(e.target.value));
                            getData(Number(e.target.value));
                            localStorage.setItem(pageValue, e.target.value);
                          }}
                          className="form-control"
                        >
                          {defaultPage?.map((i) => (
                            <option value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                      {defaultPage?.length > page ? (
                        <>
                          <button
                            className="navButton"
                            onClick={(e) => nextChunk()}
                          >
                            <KeyboardArrowRightIcon />
                          </button>
                          <button
                            className="navButton"
                            onClick={(e) => lastChunk()}
                          >
                            <KeyboardDoubleArrowRightIcon />
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col md="12" align="right">
                <span className="customPaginationSpan">0 - 0 of 0</span>
              </Col>
            </Row>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default TeamFilter;
