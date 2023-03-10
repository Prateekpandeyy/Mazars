import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";
const dateFormat = "YYYY/MM/DD";
const dateFormat1 = "DD/MM/YYYY";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
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
    Paid,
    index,
  } = props;
  const userid = window.localStorage.getItem("tpkey");

  const [selectedData, setSelectedData] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [status1, setStatus1] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [pstatus, setPstatus] = useState("");
  const [queryno, setQueryno] = useState("")
  const [toDate, setToDate] = useState("");
  // new Date().toISOString().slice(0, 10)
  const maxDate = moment(new Date().toISOString().slice(0, 10)).add(1, "days");
  const dateValue = useRef();
  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);

  const [item] = useState(current_date);
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  

  // const fromDateFun = (e) => {
  //   setFromDate(e.format("YYYY-MM-DD"));
  // };

  useEffect(() => {
    const getSubCategory = () => {
      if (selectedData.length > 0) {
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
    setTax2([]);
    getData();
  };

  //reset date
  const resetData = () => {
    if ((AllQuery === "AllQuery") || (pendingForAcceptence === "pendingForAcceptence") || (InprogressQuery === "InprogressQuery") || (DeclinedQuery === "DeclinedQuery")) {
      localStorage.removeItem(`searchTPDataQ${index}`);
    } else if ((AllProposal === "AllProposal") || (InprogressProposal === "InprogressProposal") || (proposal === "proposal")) {
      localStorage.removeItem(`searchTPDataP${index}`);
    } else if ((completeAssignment === "completeAssignment")) {
      localStorage.removeItem(`searchTPDataA`);
    } else if ((AllPayment === "AllPayment") || (Unpaid === "Unpaid") || (Paid === "Paid")) {
      localStorage.removeItem(`searchTPDataY${index}`);
    } else { }
    reset();
    setSelectedData([]);
    setStore2([]);
    setStatus1("");
    setTax2([]);
    getData();
    setToDate("");
    setFromDate("");
    
  };

  const onSubmit = (data) => {
    // if ((toDate === "") || (toDate === null)){
    //   // setToDate(moment(new Date(), "YYYY-MM-DD"))
    //   console.log((current_date?.split("-").reverse().join("-")))
    //   setToDate((current_date?.split("-").reverse().join("-")))
    //   console.log(toDate,"toDate if empty")
    // }

    let objQ = {};
    let objP = {};
    let objA = {};
    let objY = {};

    if ((AllQuery === "AllQuery") || (pendingForAcceptence === "pendingForAcceptence") || (InprogressQuery === "InprogressQuery") || (DeclinedQuery === "DeclinedQuery")) {
      if (data.route) {
        objQ = {
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
        if ((toDate === "") || (toDate === null)){
          setToDate((current_date?.split("-").reverse().join("-")))
        }
        objQ = {
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
      localStorage.setItem(`searchTPDataQ${index}`, JSON.stringify(objQ));
    } else if ((completeAssignment === "completeAssignment")) {
      if (data.route) {
        objA = {
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
        if ((toDate === "") || (toDate === null)){
          setToDate((current_date?.split("-").reverse().join("-")))
        }
        objQ = {
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
      localStorage.setItem(`searchTPDataA`, JSON.stringify(objA));
    } else if ((AllProposal === "AllProposal") || (InprogressProposal === "InprogressProposal") || (proposal === "proposal")) {
      if (data.route) {
        objP = {
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
        if ((toDate === "") || (toDate === null)){
          setToDate((current_date?.split("-").reverse().join("-")))
        }
        objP = {
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
      localStorage.setItem(`searchTPDataP${index}`, JSON.stringify(objP));
    } else if ((AllPayment === "AllPayment") || (Unpaid === "Unpaid") || (Paid === "Paid")) {
      if (data.route) {
        objY = {
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
        if ((toDate === "") || (toDate === null)){
      setToDate((current_date?.split("-").reverse().join("-")))
    }
        objY = {
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
      localStorage.setItem(`searchTPDataY${index}`, JSON.stringify(objY));
    }

    if (AllQuery === "AllQuery") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getIncompleteQues?tp_id=${JSON.parse(userid)}&status=${data.p_status}&cat_id=${data.store}&from=${data.fromDate
              ?.split("-").reverse().join("-")
            }&to=${data.toDate
              ?.split("-").reverse().join("-")
            }&pcat_id=${data.pcatId}`,
            myConfig
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
      else {
        console.log(`${baseUrl}/tl/getIncompleteQues?tp_id=${JSON.parse(userid)}&status=${data.p_status}&cat_id=${store2}&from=${fromDate?.split("-").reverse().join("-")}&to=${toDate?.split("-").reverse().join("-")}&pcat_id=${selectedData}`);
        axios
          .get(
            `${baseUrl}/tl/getIncompleteQues?tp_id=${JSON.parse(userid)}&status=${data.p_status}&cat_id=${store2}&from=${fromDate
              ?.split("-").reverse().join("-")
            }&to=${toDate
              ?.split("-").reverse().join("-")
            }&pcat_id=${selectedData}`,
            myConfig
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
    }

    if (pendingForAcceptence === "pendingForAcceptence") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/pendingQues?tp_id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${data.fromDate
              ?.split("-").reverse().join("-")
            }&to=${data.toDate
              ?.split("-").reverse().join("-")
            }&pcat_id=${data.pcatId}`,
            myConfig
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
      else {

        axios
          .get(
            `${baseUrl}/tl/pendingQues?tp_id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${fromDate
              ?.split("-").reverse().join("-")
            }&to=${toDate
              ?.split("-").reverse().join("-")
            }&pcat_id=${selectedData}`,
            myConfig
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
    }

    if (InprogressQuery === "InprogressQuery") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getIncompleteQues?tp_id=${JSON.parse(
              userid
            )}&status=${data?.p_status}&cat_id=${data.store}&from=${data.fromDate
              ?.split("-").reverse().join("-")
            }&to=${data.toDate
              ?.split("-").reverse().join("-")
            }&pcat_id=${data.pcatId}`,
            myConfig
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
      else {
        axios
          .get(
            `${baseUrl}/tl/getIncompleteQues?tp_id=${JSON.parse(
              userid
            )}&status=${status1}&cat_id=${store2}&from=${fromDate
              ?.split("-").reverse().join("-")
            }&to=${toDate
              ?.split("-").reverse().join("-")
            }&pcat_id=${selectedData}`,
            myConfig
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
    }

    if (DeclinedQuery === "DeclinedQuery") {

      if (data.route) {

        axios
          .get(
            `${baseUrl}/tl/declinedQueries?tp_id=${JSON.parse(userid)}&status=${data.p_status
            }&cat_id=${data.store}&from=${data.fromDate
              ?.split("-").reverse().join("-")
            }&to=${data.toDate
              ?.split("-").reverse().join("-")
            }&pcat_id=${data.pcatId}`,
            myConfig
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
      else {

        axios
          .get(
            `${baseUrl}/tl/declinedQueries?tp_id=${JSON.parse(userid)}&status=${data.p_status
            }&cat_id=${store2}&from=${fromDate
              ?.split("-").reverse().join("-")
            }&to=${toDate
              ?.split("-").reverse().join("-")
            }&pcat_id=${selectedData}`,
            myConfig
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
    }

    if (completeAssignment === "completeAssignment") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getCompleteQues?tp_id=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${data.fromDate
              ?.split("-").reverse().join("-")
            }&to=${data.toDate
              ?.split("-").reverse().join("-")
            }&pcat_id=${data.pcatId}`,
            myConfig
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
      else {
        axios
          .get(
            `${baseUrl}/tl/getCompleteQues?tp_id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${fromDate
              ?.split("-").reverse().join("-")
            }&to=${toDate
              ?.split("-").reverse().join("-")
            }&pcat_id=${selectedData}`,
            myConfig
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
    }

    if (AllProposal === "AllProposal") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${data.fromDate
              ?.split("-").reverse().join("-")
            }&to=${data.toDate
              ?.split("-").reverse().join("-")
            }&status=${data.p_status
            }&pcat_id=${data.pcatId}`,
            myConfig
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
      else {
        axios
          .get(
            `${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${fromDate
              ?.split("-").reverse().join("-")
            }&to=${toDate
              ?.split("-").reverse().join("-")
            }&status=${data.p_status
            }&pcat_id=${selectedData}`,
            myConfig
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
    }

    if (InprogressProposal === "InprogressProposal") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${data.fromDate
              ?.split("-").reverse().join("-")
            }&to=${data.toDate
              ?.split("-").reverse().join("-")
            }&status=${data.p_status
            }&pcat_id=${data.pcatId}`,
            myConfig
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
      else {
        axios
          .get(
            `${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${fromDate
              ?.split("-").reverse().join("-")
            }&to=${toDate
              ?.split("-").reverse().join("-")
            }&status=${data.p_status
            }&pcat_id=${selectedData}`,
            myConfig
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
    }

    if (proposal === "proposal") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${data.fromDate
              ?.split("-").reverse().join("-")
            }&to=${data.toDate
              ?.split("-").reverse().join("-")
            }&status=2&pcat_id=${data.pcatId}`,
            myConfig
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
      else {
        axios
          .get(
            `${baseUrl}/tl/getProposalTl?tp_id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${fromDate
              ?.split("-").reverse().join("-")
            }&to=${toDate
              ?.split("-").reverse().join("-")
            }&status=2&pcat_id=${selectedData}`,
            myConfig
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
    }
    if (AllPayment === "AllPayment") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getUploadedProposals?tp_id=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${data.fromDate
              ?.split("-").reverse().join("-")
            }&to=${data.toDate
              ?.split("-").reverse().join("-")
            }&status=${data.p_status
            }&pcat_id=${data.pcatId}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              if (res.data.result) {
                setData(res.data.result);
                setRecords(res.data.result.length);
              }
            }
          });
      } else {
        axios
          .get(
            `${baseUrl}/tl/getUploadedProposals?tp_id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${fromDate
              ?.split("-").reverse().join("-")
            }&to=${toDate
              ?.split("-").reverse().join("-")
            }&status=${data.p_status
            }&pcat_id=${selectedData}`,
            myConfig
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
    }

    if (Unpaid === "Unpaid") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getUploadedProposals?&tp_id=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${data.fromDate
              ?.split("-").reverse().join("-")
            }&to=${data.toDate
              ?.split("-").reverse().join("-")
            }&status=1&pcat_id=${data.pcatId}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              if (res.data.result) {
                setData(res.data.result);
                setRecords(res.data.result.length);
              }
            }
          });
      } else {
        axios
          .get(
            `${baseUrl}/tl/getUploadedProposals?&tp_id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${fromDate
              ?.split("-").reverse().join("-")
            }&to=${toDate
              ?.split("-").reverse().join("-")
            }&status=1&pcat_id=${selectedData}`,
            myConfig
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
    }

    if (Paid === "Paid") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getUploadedProposals?tp_id=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${data.fromDate
              ?.split("-").reverse().join("-")
            }&to=${data.toDate
              ?.split("-").reverse().join("-")
            }&status=2&pcat_id=${data.pcatId}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              if (res.data.result) {
                setData(res.data.result);
                setRecords(res.data.result.length);
              }
            }
          });
      } else {
        axios
          .get(
            `${baseUrl}/tl/getUploadedProposals?tp_id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${fromDate
              ?.split("-").reverse().join("-")
            }&to=${toDate
              ?.split("-").reverse().join("-")
            }&status=2&pcat_id=${selectedData}`,
            myConfig
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
    }
  };

  useEffect(() => {
    let qd = JSON.parse(localStorage.getItem(`searchTPDataQ${index}`));
    let pd = JSON.parse(localStorage.getItem(`searchTPDataP${index}`));
    let yd = JSON.parse(localStorage.getItem(`searchTPDataY${index}`));
    let ad = JSON.parse(localStorage.getItem(`searchTPDataA`));

    if ((AllQuery === "AllQuery") || (pendingForAcceptence === "pendingForAcceptence") || (InprogressQuery === "InprogressQuery") || (DeclinedQuery === "DeclinedQuery")) {
      if (qd) {
        if (qd.route === window.location.pathname && qd.index === index) {
          // console.log(qd);
          setStore2(qd.store);
          setToDate(qd.toDate

          );
          setFromDate(qd.fromDate

          );
          setSelectedData(qd.pcatId);
          setStatus1(qd.p_status);
          setQueryno(qd.query_no);
          // console.log(toDate, "in if of set")
          onSubmit(qd);
        }
      } else if (
        !qd?.toDate
        // qd.toDate === "" || qd.toDate === null
      ) {
        let date = moment().format("DD-MM-YYYY");
        let fullDate = date;
        setToDate(fullDate);
        // console.log(toDate, "full Date is set");
      }
    } else if ((completeAssignment === "completeAssignment")) {
      if (ad) {
        if (ad.route === window.location.pathname && ad.index === index) {
          setStore2(ad.store);
          setToDate(ad.toDate
          );
          setFromDate(ad.fromDate
          );
          setSelectedData(ad.pcatId);
          setStatus1(ad.p_status);
          setQueryno(ad.query_no);
          onSubmit(ad);
        }
      } else if (!ad?.toDate) {
        let date = moment().format("DD-MM-YYYY");
        let fullDate = date;
        setToDate(fullDate);
      }
    } else if ((AllProposal === "AllProposal") || (InprogressProposal === "InprogressProposal") || (proposal === "proposal")) {
      if (pd) {
        if (pd.route === window.location.pathname && pd.index === index) {
          setStore2(pd.store);
          setToDate(pd.toDate
          );
          setFromDate(pd.fromDate
          );
          setSelectedData(pd.pcatId);
          setStatus1(pd.p_status);
          setQueryno(pd.query_no);
          onSubmit(pd);
        }
      } else if (!pd?.toDate) {
        let date = moment().format("DD-MM-YYYY");
        let fullDate = date;
        setToDate(fullDate);
      }
    } else if ((AllPayment === "AllPayment") || (Unpaid === "Unpaid") || (Paid === "Paid")) {
      if (yd) {
        if (yd.route === window.location.pathname && yd.index === index) {
          setStore2(yd.store);
          setToDate(yd.toDate
          );
          setFromDate(yd.fromDate
          );
          setSelectedData(yd.pcatId);
          setStatus1(yd.p_status);
          setQueryno(yd.query_no);
          onSubmit(yd);
        }
      } else if (!yd?.toDate) {
        let date = moment().format("DD-MM-YYYY");
        let fullDate = date;
        setToDate(fullDate);
      }
    }
  }, []);


  const Reset = () => {
    return (
      <>
        <button
          type="reset"
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
                    {tax2.length > 0 ? (
                      <>
                        {tax2?.map((p, index) => (
                          <Option value={p.id} key={index}>
                            {p.details}
                          </Option>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
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

                {
                  (fromDate.length) > 0 ?
                    <div className="form-group mx-sm-1  mb-2">
                      <DatePicker
                        onChange={(e) => setFromDate(moment(e).format("DD-MM-YYYY"))}
                        disabledDate={(d) => !d || d.isAfter(maxDate)}
                        format={dateFormatList}
                        ref={dateValue}
                        name="fromDate"
                        defaultValue={moment(
                          `${fromDate}`,
                          dateFormat1
                        )}
                      />
                    </div> :
                    ""
                }
                {(fromDate.length) === 0 ?
                  <div className="form-group mx-sm-1  mb-2">
                    <DatePicker
                      onChange={(e) => setFromDate(moment(e).format("DD-MM-YYYY"))}
                      disabledDate={(d) => !d || d.isAfter(maxDate)}
                      format={dateFormatList}
                      ref={dateValue}
                      name="fromDate"
                    />
                  </div>
                  :
                  ""
                }

                <div className="form-group mx-sm-1  mb-2">
                  <label className="form-select form-control">To</label>
                </div>

                {
                  (toDate.length > 0) ?
                    <div className="form-group mx-sm-1  mb-2" id="willgethere">
                      <DatePicker
                        onChange={(e) => setToDate(moment(e).format("DD-MM-YYYY"))}
                        disabledDate={(d) => !d || d.isAfter(maxDate)}
                        defaultValue={moment(
                          `${toDate}`,
                          dateFormat1
                        )}
                        format={dateFormatList}
                        ref={dateValue}
                        name="toDate"
                      />
                    </div> :
                    ""
                }
                {
                  (toDate.length === 0) ?
                    <div className="form-group mx-sm-1  mb-2" id="willnotgethere">
                      <DatePicker
                        onChange={(e) => setToDate(moment(e).format("DD-MM-YYYY"))}
                        disabledDate={(d) => !d || d.isAfter(maxDate)}
                        ref={dateValue}
                        defaultValue={moment(new Date(), "DD MM, YYYY")}
                        format={dateFormatList}
                        name="toDate"
                      />
                    </div>
                    :
                    ""
                }

                <div className="form-group mx-sm-1  mb-2">
                  {AllQuery === "AllQuery" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                      onChange={(e) => setStatus1(e.target.value)}
                      value={status1}
                    >
                      <option value="">--select--</option>
                      <option value="1">Inprogress; Queries</option>
                      <option value="2">Completed; Queries</option>
                      <option value="3">Declined; Queries</option>
                    </select>
                  )}

                  {InprogressQuery === "InprogressQuery" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                      onChange={(e) => setStatus1(e.target.value)}
                      value={status1}
                    >
                      <option value="">--select--</option>
                      <option value="4">Inprogress; Allocation</option>
                      <option value="5">Inprogress; Proposals</option>
                      <option value="6">Inprogress; Assignments</option>
                    </select>
                  )}

                  {DeclinedQuery === "DeclinedQuery" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                      onChange={(e) => setStatus1(e.target.value)}
                      value={status1}
                    >
                      <option value="">--select--</option>
                      <option value="3">Client Declined; Proposals</option>
                      <option value="4">Client Declined; Payment</option>
                    </select>
                  )}

                  {AllProposal === "AllProposal" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                      onChange={(e) => setStatus1(e.target.value)}
                      value={status1}
                    >
                      <option value="">--select--</option>
                      <option value="1">Inprogress; Proposals</option>
                      <option value="2">Accepted; Proposals</option>
                      <option value="3">Client Declined; Proposals</option>
                    </select>
                  )}

                  {InprogressProposal === "InprogressProposal" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                      onChange={(e) => setStatus1(e.target.value)}
                      value={status1}
                    >
                      <option value="">--select--</option>
                      <option value="4">Inprogress; Preparation</option>
                      <option value="5">Inprogress; Acceptance</option>
                    </select>
                  )}

                  {AllPayment === "AllPayment" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                      onChange={(e) => setStatus1(e.target.value)}
                      value={status1}
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
                  <label className="form-select form-control">
                    Total Records : {records}
                  </label>
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
