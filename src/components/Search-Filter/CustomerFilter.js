import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import { Spinner } from "reactstrap";
import ShowError from "../../components/LoadingTime/LoadingTime";
import { Link } from "react-router-dom";
import { current_date } from "../../common/globalVeriable";
function CustomerFilter(props) {
  const { Option } = Select;
  const { handleSubmit, register, errors, reset } = useForm();

  const {
    records,
    setRecords,
    setData,
    getData,
    id,
    query,
    InprogressAllocation,
    InprogressQueryProposal,
    DeclinedQuery,
    index,
    proposal,
    inprogressProposal,
    acceptedProposal,
    declinedProposal,
    allPayment,
    paid,
    unpaid,
    assignment,
    resetTriggerFunc,
    setCount,
  } = props;

  const [selectedData, setSelectedData] = useState("Please select category");
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategory] = useState([]);
  const [showSubCat, setShowSubCat] = useState([]);
  const [catShowData, setCatShowData] = useState([]);

  const [status1, setStatus1] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [queryNo, setQueryNo] = useState("");

  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("categoryData"));
    setCategory(data);
  }, []);

  useEffect(() => {
    let dk = JSON.parse(localStorage.getItem(`searchData${index}`));

    if (dk) {
      if (dk.route === window.location.pathname && dk.index === index) {
        let parentId = "";
        let catData = JSON.parse(localStorage.getItem("categoryData"));
        catData.forEach((element) => {
          if (element.id === dk.pcatId) {
            console.log("eleent", element.details);
            setCatShowData(element.details);
            parentId = element.details;
          }
        });
        let subCat = JSON.parse(localStorage.getItem(`${parentId}`));
        setTax2(subCat);
        if (subCat && subCat.length > 0) {
          subCat?.map((i) => {
            if (dk.store.includes(i.id)) {
              setShowSubCat((payload) => {
                return [...payload, i.id];
              });
            }
          });
        }

        setStore2(dk.store);
        setToDate(dk.toDate);
        setFromDate(dk.fromDate);
        setSelectedData(dk.pcatId);
        setStatus1(dk.p_status);
        setQueryNo(dk.query_no);
        // onSubmit(dk);
        console.log(showSubCat, "subshowCat");
      }
    }
  }, []);



  //handleCategory
  const handleCategory = (value) => {
    categoryData.map((i) => {
      if (i.details === value) {
        setSelectedData(i.id);
        setCatShowData(i.details);
      }
    });

    setTax2(JSON.parse(localStorage.getItem(value)));
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
    setSelectedData("");
    setStore2([]);
    setTax2([]);
    setShowSubCat([]);
    setCatShowData([]);
  };


  //reset date
  const resetData = () => {
    reset();
    setSelectedData("");
    setStore2([]);
    setTax2([]);
    setShowSubCat([]);
    setCatShowData([]);
    setFromDate("");
    setToDate("");
    setStatus1("");
    setQueryNo("");
    localStorage.removeItem(`searchData${index}`);
    getData(1);
    props.resetTriggerFunc();
  };

  const onSubmit = (data) => {
    console.log("data on submit", data);
    console.log('data to submit in form',);
    setLoading(true);
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
        store: showSubCat,
        fromDate: data.p_dateFrom,
        toDate: data.p_dateTo,
        pcatId: selectedData,
        query_no: data?.query_no,
        p_status: data?.p_status,
        route: window.location.pathname,
        index: index,
      };
    }
    localStorage.setItem(`searchData${index}`, JSON.stringify(obj));
    console.log("Obj", obj);
    let customId = 1;
    let remainApiPath = ` `;

    if (query == "query") {
      if (data.route) {
        axios
          .get(`${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
            id
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=${data.p_status}&pcat_id=${data.pcatId}`,
            myConfig)
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                let data = res.data.result;
                let all = [];
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                // setRecords(res.data.result.length);
                setCount(res.data.total);
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      } else {
        axios
          .get(
            `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
              id
            )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
            }&status=${data.p_status}&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                let data = res.data.result;
                let all = [];
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                setRecords(res.data.result.length);
                setCount(res.data.total);
                resetTriggerFunc();
                localStorage.setItem(`custQuery1`, JSON.stringify(1));
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      }
    }

    if (InprogressAllocation == "InprogressAllocation") {
      if (data.route) {
        if (data.p_status.length > 0) {
          let remainApiPath = `customers/incompleteAssignments?user=${JSON.parse(
            id
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=${data.p_status}&pcat_id=${data.pcatId}`;
          axios
            .get(`${baseUrl}/${remainApiPath}`,
              myConfig)
            .then((res) => {
              if (res.data.code === 1) {
                setLoading(false);
                if (res.data.result) {
                  let data = res.data.result;
                  let all = [];
                  data.map((i) => {
                    let data = {
                      ...i,
                      cid: customId,
                    };
                    customId++;
                    all.push(data);
                  });
                  setData(all);
                  setCount(res.data.total);
                  // setRecords(res.data.result.length);
                }
              }
            })
            .catch((error) => {
              ShowError.LoadingError(setLoading);
            });
        } else {
          let remainApiPath = `customers/incompleteAssignments?user=${JSON.parse(
            id
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=1&pcat_id=${data.pcatId}`;
          axios
            .get(`${baseUrl}/${remainApiPath}`,
              myConfig)
            .then((res) => {
              if (res.data.code === 1) {
                setLoading(false);
                if (res.data.result) {
                  let data = res.data.result;
                  let all = [];
                  data.map((i) => {
                    let data = {
                      ...i,
                      cid: customId,
                    };
                    customId++;
                    all.push(data);
                  });
                  setData(all);
                  setCount(res.data.total);
                  // setRecords(res.data.result.length);
                }
              }
            })
            .catch((error) => {
              ShowError.LoadingError(setLoading);
            });
        }
      } else {
        if (data.p_status.length > 0) {
          axios
            .get(
              `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
                id
              )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
              }&status=${data.p_status}&pcat_id=${selectedData}`,
              myConfig
            )
            .then((res) => {
              if (res.data.code === 1) {
                setLoading(false);
                if (res.data.result) {
                  let data = res.data.result;
                  let all = [];
                  data.map((i) => {
                    let data = {
                      ...i,
                      cid: customId,
                    };
                    customId++;
                    all.push(data);
                  });
                  setData(all);
                  // setRecords(res.data.result.length);
                  setCount(res.data.total);
                  resetTriggerFunc();
                  localStorage.setItem(`custQuery2`, JSON.stringify(1));
                }
              }
            })
            .catch((error) => {
              ShowError.LoadingError(setLoading);
            });
        } else {
          axios
            .get(
              `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
                id
              )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
              }&status=1&pcat_id=${selectedData}`,
              myConfig
            )
            .then((res) => {
              if (res.data.code === 1) {
                setLoading(false);
                if (res.data.result) {
                  let data = res.data.result;
                  let all = [];
                  data.map((i) => {
                    let data = {
                      ...i,
                      cid: customId,
                    };
                    customId++;
                    all.push(data);
                  });
                  setData(all);
                  // setRecords(res.data.result.length);
                  setCount(res.data.total);
                  resetTriggerFunc();
                  localStorage.setItem(`custQuery2`, JSON.stringify(1));
                }
              }
            })
            .catch((error) => {
              ShowError.LoadingError(setLoading);
            });
        }
      }
    }

    if (InprogressQueryProposal == "InprogressQueryProposal") {
      if (data.route) {
        axios
          .get(`${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
            id
          )}&status=2&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&pcat_id=${data.pcatId}`,
            myConfig)
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                let data = res.data.result;
                let all = [];
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                setCount(res.data.total);
                // setRecords(res.data.result.length);
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      } else {
        axios
          .get(
            `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(
              id
            )}&status=2&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
            }&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                let data = res.data.result;
                let all = [];
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                setCount(res.data.total);
                // setRecords(res.data.result.length);
                resetTriggerFunc();
                localStorage.setItem(`custQuery3`, JSON.stringify(1));
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      }
    }

    if (DeclinedQuery == "DeclinedQuery") {
      if (data.route) {
        axios
          .get(`${baseUrl}/customers/declinedQueries?uid=${JSON.parse(
            id
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&pcat_id=${data.pcatId}&status=${data.p_status}`,
            myConfig)
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                let data = res.data.result;
                let all = [];
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                setCount(res.data.total);
                // setRecords(res.data.result.length);
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      } else {
        axios
          .get(
            `${baseUrl}/customers/declinedQueries?uid=${JSON.parse(
              id
            )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
            }&pcat_id=${selectedData}&status=${data.p_status}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                let data = res.data.result;
                let all = [];
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                setCount(res.data.total);
                // setRecords(res.data.result.length);
                resetTriggerFunc();
                localStorage.setItem(`custQuery4`, JSON.stringify(1));
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      }
    }

    if (proposal == "proposal") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/customers/getProposals?uid=${JSON.parse(
              id
            )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=${data.p_status}&pcat_id=${data.pcatId}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
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
                // setRecords(res.data.result.length);
                setCount(res.data.total);
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      } else {
        axios
          .get(
            `${baseUrl}/customers/getProposals?uid=${JSON.parse(
              id
            )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
            }&status=${data.p_status}&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                let data = res.data.result;
                let all = [];
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                // setRecords(res.data.result.length);
                setCount(res.data.total);
                resetTriggerFunc();
                localStorage.setItem(`custProp1`, JSON.stringify(1));
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      }
    }

    if (inprogressProposal == "inprogressProposal") {
      if (data.route) {
        if (data.p_status) {
          axios
            .get(
              `${baseUrl}/customers/getProposals?uid=${JSON.parse(
                id
              )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
              }&status=${data.p_status}&pcat_id=${data.pcatId}`,
              myConfig
            )
            .then((res) => {
              if (res.data.code === 1) {
                setLoading(false);
                if (res.data.result) {
                  let data = res.data.result;
                  let all = [];
                  data.map((i) => {
                    let data = {
                      ...i,
                      cid: customId,
                    };
                    customId++;
                    all.push(data);
                  });
                  setData(all);
                  // setRecords(res.data.result.length);
                  setCount(res.data.total);
                }
              }
            })
            .catch((error) => {
              ShowError.LoadingError(setLoading);
            });
        } else {
          axios
            .get(
              `${baseUrl}/customers/getProposals?uid=${JSON.parse(
                id
              )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
              }&status=1&pcat_id=${data.pcatId}`,
              myConfig
            )
            .then((res) => {
              if (res.data.code === 1) {
                setLoading(false);
                if (res.data.result) {
                  let data = res.data.result;
                  let all = [];
                  data.map((i) => {
                    let data = {
                      ...i,
                      cid: customId,
                    };
                    customId++;
                    all.push(data);
                  });
                  setData(all);
                  // setRecords(res.data.result.length);
                  setCount(res.data.total);
                }
              }
            })
            .catch((error) => {
              ShowError.LoadingError(setLoading);
            });
        }
      } else {
        if (data.p_status) {
          axios
            .get(
              `${baseUrl}/customers/getProposals?uid=${JSON.parse(
                id
              )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
              }&status=${data.p_status}&pcat_id=${selectedData}`,
              myConfig
            )
            .then((res) => {
              if (res.data.code === 1) {
                setLoading(false);
                if (res.data.result) {
                  let data = res.data.result;
                  let all = [];
                  data.map((i) => {
                    let data = {
                      ...i,
                      cid: customId,
                    };
                    customId++;
                    all.push(data);
                  });
                  setData(all);
                  // setRecords(res.data.result.length);
                  setCount(res.data.total);
                  resetTriggerFunc();
                  localStorage.setItem(`custPropsosal2`, JSON.stringify(1));
                }
              }
            })
            .catch((error) => {
              ShowError.LoadingError(setLoading);
            });
        } else {
          axios
            .get(
              `${baseUrl}/customers/getProposals?uid=${JSON.parse(
                id
              )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
              }&status=1&pcat_id=${selectedData}`,
              myConfig
            )
            .then((res) => {
              if (res.data.code === 1) {
                setLoading(false);
                if (res.data.result) {
                  let data = res.data.result;
                  let all = [];
                  data.map((i) => {
                    let data = {
                      ...i,
                      cid: customId,
                    };
                    customId++;
                    all.push(data);
                  });
                  setData(all);
                  // setRecords(res.data.result.length);
                  setCount(res.data.total);
                  resetTriggerFunc();
                  localStorage.setItem(`custPropsosal2`, JSON.stringify(1));
                }
              }
            })
            .catch((error) => {
              ShowError.LoadingError(setLoading);
            });
        }
      }
    }

    if (acceptedProposal == "acceptedProposal") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/customers/getProposals?uid=${JSON.parse(
              id
            )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=2&pcat_id=${data.pcatId}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
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
                setCount(res.data.total);
                // setData(res.data.result);
                // setRecords(res.data.result.length);
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      } else {
        axios
          .get(
            `${baseUrl}/customers/getProposals?uid=${JSON.parse(
              id
            )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
            }&status=2&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                let data = res.data.result;
                let all = [];
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                setCount(res.data.total);
                // setData(res.data.result);
                // setRecords(res.data.result.length);
                resetTriggerFunc();
                localStorage.setItem(`custPropsosal3`, JSON.stringify(1));
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      }
    }

    if (declinedProposal == "declinedProposal") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/customers/getProposals?uid=${JSON.parse(
              id
            )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=3&pcat_id=${data.pcatId}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
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
                setCount(res.data.total);
                // setRecords(res.data.result.length);
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      } else {
        axios
          .get(
            `${baseUrl}/customers/getProposals?uid=${JSON.parse(
              id
            )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
            }&status=3&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                let data = res.data.result;
                let all = [];
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                setCount(res.data.total);
                // setRecords(res.data.result.length);
                resetTriggerFunc();
                localStorage.setItem(`custPropsosal4`, JSON.stringify(1));
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      }
    }

    if (assignment == "assignment") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
              id
            )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=${data.p_status}&pcat_id=${data.pcatId}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
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
                setCount(res.data.total);
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      } else {
        axios
          .get(
            `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
              id
            )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
            }&status=${data.p_status}&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                let data = res.data.result;
                let all = [];
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                setCount(res.data.total);
                // setRecords(res.data.result.length);
                resetTriggerFunc();
                localStorage.setItem(`custAs1`, JSON.stringify(1));
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      }
    }
    if (assignment == "assignmentInprogress") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
              id
            )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=1&pcat_id=${data.pcatId}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
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
                setCount(res.data.total);
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      } else {
        axios
          .get(
            `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
              id
            )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
            }&status=1&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                let data = res.data.result;
                let all = [];
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                setCount(res.data.total);
                // setRecords(res.data.result.length);
                resetTriggerFunc();
                localStorage.setItem(`custAs2`, JSON.stringify(1));
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      }
    }
    if (assignment == "completeAssignment") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
              id
            )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=2&pcat_id=${data.pcatId}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
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
                setCount(res.data.total);
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      } else {
        axios
          .get(
            `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
              id
            )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
            }&status=2&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                let data = res.data.result;
                let all = [];
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                setCount(res.data.total);
                // setRecords(res.data.result.length);
                resetTriggerFunc();
                localStorage.setItem(`custAs3`, JSON.stringify(1));
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      }
    }
    if (assignment == "declinedAssignment") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
              id
            )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=3&pcat_id=${data.pcatId}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
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
                setCount(res.data.total);
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      } else {
        axios
          .get(
            `${baseUrl}/customers/completeAssignments?user=${JSON.parse(
              id
            )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
            }&status=3&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                let data = res.data.result;
                let all = [];
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                setCount(res.data.total);
                // setRecords(res.data.result.length);
                resetTriggerFunc();
                localStorage.setItem(`custAs4`, JSON.stringify(1));
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      }
    }
    if (assignment == "assignmentpermission") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/customers/completeAssignmentspermission?user=${JSON.parse(
              id
            )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=${data.p_status}&pcat_id=${data.pcatId}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
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
                setCount(res.data.total);
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      } else {
        axios
          .get(
            `${baseUrl}/customers/completeAssignmentspermission?user=${JSON.parse(
              id
            )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
            }&status=${data.p_status}&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                let data = res.data.result;
                let all = [];
                data.map((i) => {
                  let data = {
                    ...i,
                    cid: customId,
                  };
                  customId++;
                  all.push(data);
                });
                setData(all);
                setCount(res.data.total);
                // setRecords(res.data.result.length);
                resetTriggerFunc();
                localStorage.setItem(`custAs5`, JSON.stringify(1));
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      }
    }
    if (allPayment == "allPayment") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/customers/getUploadedProposals?cid=${JSON.parse(
              id
            )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=${data.p_status}&pcat_id=${data.pcatId}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
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
                // setRecords(res.data.result.length);
                setCount(res.data.total);
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      } else {
        axios
          .get(
            `${baseUrl}/customers/getUploadedProposals?cid=${JSON.parse(
              id
            )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
            }&status=${data.p_status}&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                setData(res.data.result);
                // setRecords(res.data.result.length);
                resetTriggerFunc();
                localStorage.setItem(`custPay1`, JSON.stringify(1));
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      }
    }
    if (unpaid == "unpaid") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/customers/getUploadedProposals?cid=${JSON.parse(
              id
            )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=2&pcat_id=${data.pcatId}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                setData(res.data.result);
                // setRecords(res.data.result.length);
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      } else {
        axios
          .get(
            `${baseUrl}/customers/getUploadedProposals?cid=${JSON.parse(
              id
            )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
            }&status=2&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
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
                setCount(res.data.total);
                resetTriggerFunc();
                localStorage.setItem(`custPay2`, JSON.stringify(1));
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      }
    }
    if (paid == "paid") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/customers/getUploadedProposals?cid=${JSON.parse(
              id
            )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
            }&status=1&pcat_id=${data.pcatId}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
                setData(res.data.result);
                // setRecords(res.data.result.length);
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
          });
      } else {
        axios
          .get(
            `${baseUrl}/customers/getUploadedProposals?cid=${JSON.parse(
              id
            )}&cat_id=${showSubCat}&from=${data.p_dateFrom}&to=${data.p_dateTo
            }&status=1&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              setLoading(false);
              if (res.data.result) {
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
                // setRecords(res.data.result.length);
                setCount(res.data.total);
                resetTriggerFunc();
                localStorage.setItem(`custPay3`, JSON.stringify(1));
              }
            }
          })
          .catch((error) => {
            ShowError.LoadingError(setLoading);
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

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-inline">
              <div className="form-group mb-2">
                <Select
                  style={{ width: 150 }}
                  placeholder="Select Category"
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
                  max={current_date}
                  defaultValue={fromDate}
                  onChange={(e) => setFromDate(e.target.defaultValue)}
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
                  defaultValue={current_date}
                  max={current_date}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <div className="form-group mx-sm-1  mb-2">
                {query == "query" && (
                  <select
                    className="form-select form-control"
                    name="p_status"
                    ref={register}
                    style={{ height: "33px" }}
                    value={status1}
                    onChange={(e) => setStatus1(e.target.value)}

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
                    value={status1}
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
                    value={status1}
                    onChange={(e) => setStatus1(e.target.value)}
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
                    value={status1}
                    onChange={(e) => setStatus1(e.target.value)}
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
                    value={status1}
                    onChange={(e) => setStatus1(e.target.value)}
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
                    value={status1}
                    onChange={(e) => setStatus1(e.target.value)}
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
                    value={status1}
                    onChange={(e) => setStatus1(e.target.value)}
                  >
                    <option value="">--select--</option>
                    <option value="1">Inprogress</option>
                    <option value="2">Completed</option>
                    <option value="3">Payment Declined</option>
                  </select>
                )}
              </div>
              {loading ? (
                <Spinner color="primary" />
              ) : (
                <button type="submit" className="searchBtn mx-sm-1 mb-2">
                  Search
                </button>
              )}
              <Reset />
              {query ? (
                <div
                  className="mx-sm-1"
                  style={{ position: "absolute", top: "50%", right: "120px" }}
                >
                  <span>
                    <Link
                      to="/customer/select-category"
                      style={{ color: "#fff", textAlign: "right" }}
                    >
                      <button
                        className="autoWidthBtn mb-1"
                        style={{ marginLeft: "auto", color: "#fff" }}
                      >
                        Fresh query
                      </button>
                    </Link>
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CustomerFilter;
