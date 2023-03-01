import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import { Spinner } from "reactstrap";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";
const dateFormat = "YYYY/MM/DD";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
function TeamFilter(props) {
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
  } = props;
  const userid = window.localStorage.getItem("tlkey");

  const [selectedData, setSelectedData] = useState([]);
  const [inputQTest, setInputQTest] = useState(false)
  const [inputPTest, setInputPTest] = useState(false)
  const [inputPayTest, setInputTest] = useState(false)
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [status1, setStatus1] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [pstatus, setPstatus] = useState("");
  const [queryno, setQueryno] = useState("")
  const [dateto, setDateto] = useState("")
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10));
  const maxDate = moment(new Date().toISOString().slice(0, 10)).add(1, "days");
  const dateValue = useRef();
  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);

  const [item] = useState(current_date);

  useEffect(() => {
    const getSubCategory = () => {
      if (selectedData !== undefined && selectedData.length > 0) {
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
    if ((AllQuery === "AllQuery") || (pendingForAcceptence === "pendingForAcceptence") || (InprogressQuery === "InprogressQuery") || (inCompleteQuery == "inCompleteQuery")) {
      localStorage.removeItem(`searchDataQ${index}`);
    }
    else if ((completeAssignment === "completeAssignment")) {
      localStorage.removeItem(`searchDataA${index}`);
    }
    else if ((AllProposal === "AllProposal") || (InprogressProposal === "InprogressProposal") || (proposal === "acceptedProposal") || (proposal == "proposal")) {
      localStorage.removeItem(`searchDataP${index}`);
    }
    else if ((AllPayment === "AllPayment") || (Unpaid === "Unpaid") || (Paid === "Paid")) {
      localStorage.removeItem(`searchDataY${index}`);
    } else { }
    reset();
    setSelectedData([]);
    setStore2([]);
    setStatus1(1);
    setTax2([]);
    getData();
    setQueryno("");
    setFromDate("");
    setDateto("");
    let date = moment().format("DD-MM-YYYY");
    let fullDate = date;
    setToDate(fullDate);
    // dateValue.current.clearValue();
  };
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  // ?.split("-")
  // .reverse()
  // .join("-")

  const onSubmit = (data) => {
    console.log(data)
    let objQ = {};
    let objP = {};
    let objA = {};
    let objY = {};

    if ((AllQuery === "AllQuery") || (pendingForAcceptence === "pendingForAcceptence") || (InprogressQuery === "InprogressQuery") || (inCompleteQuery == "inCompleteQuery") || (DeclinedQuery == "DeclinedQuery")) {
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
      localStorage.setItem(`searchDataQ${index}`, JSON.stringify(objQ));
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
      localStorage.setItem(`searchDataA${index}`, JSON.stringify(objA));
    } else if ((AllProposal === "AllProposal") || (InprogressProposal === "InprogressProposal") || (proposal === "acceptedProposal") || (proposal == "proposal")) {
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
      localStorage.setItem(`searchDataP${index}`, JSON.stringify(objP));
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
      localStorage.setItem(`searchDataY${index}`, JSON.stringify(objY));
    }

    console.log("data", data);

    if (AllQuery === "AllQuery") {
      if (data.route) {
        console.log(`${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}&status=${data.p_status
            }&cat_id=${data.store}&from=${data.fromDate
            }&to=${data.toDate
            }&pcat_id=${data.pcatId}&qno=${data.query_no
            }`);
        axios
          .get(
            `${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}&status=${data.p_status
            }&cat_id=${data.store}&from=${data.fromDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&to=${data.toDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&pcat_id=${data.pcatId}&qno=${data.query_no
            }`,
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
        console.log(`${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}&status=${data.p_status
            }&cat_id=${store2}&from=${fromDate}&to=${toDate}&pcat_id=${selectedData}&qno=${data.query_no
            }`);
        axios
          .get(
            `${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}&status=${data.p_status
            }&cat_id=${store2}&from=${fromDate}&to=${toDate}&pcat_id=${selectedData}&qno=${data.query_no
            }`,
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
            `${baseUrl}/tl/pendingQues?id=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${data.fromDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&to=${data.toDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&pcat_id=${data.pcatId}&qno=${data.query_no
            }`,
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
            `${baseUrl}/tl/pendingQues?id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${fromDate}&to=${toDate}&pcat_id=${selectedData}&qno=${data.query_no
            }`,
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
            `${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(
              userid
            )}&status=${data.p_status}&cat_id=${data.store}&from=${data.fromDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&to=${data.toDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&pcat_id=${data.pcatId}&qno=${data.query_no
            }`,
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
            `${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(
              userid
            )}&status=${status1}&cat_id=${store2}&from=${fromDate}&to=${toDate}&pcat_id=${selectedData}&qno=${data.query_no
            }`,
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
    if (inCompleteQuery === "inCompleteQuery") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/pendingAllocation?id=${JSON.parse(
              userid
            )}&status=${data.p_status}&cat_id=${data.store}&from=${data.fromDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&to=${data.toDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&pcat_id=${data.pcatId}&qno=${data.query_no
            }`,
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
            `${baseUrl}/tl/pendingAllocation?id=${JSON.parse(
              userid
            )}&status=${status1}&cat_id=${store2}&from=${fromDate}&to=${toDate}&pcat_id=${selectedData}&qno=${data.query_no
            }`,
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
            `${baseUrl}/tl/declinedQueries?id=${JSON.parse(userid)}&status=${data.p_status
            }&cat_id=${data.store}&from=${data.fromDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&to=${data.toDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&pcat_id=${data.pcatId}&qno=${data.query_no
            }`,
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
            `${baseUrl}/tl/declinedQueries?id=${JSON.parse(userid)}&status=${data.p_status
            }&cat_id=${store2}&from=${fromDate}&to=${toDate}&pcat_id=${selectedData}&qno=${data.query_no
            }`,
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
            `${baseUrl}/tl/getCompleteQues?id=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${data.fromDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&to=${data.toDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&pcat_id=${data.pcatId}&qno=${data.query_no
            }`,
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
            `${baseUrl}/tl/getCompleteQues?id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${fromDate}&to=${toDate}&pcat_id=${selectedData}&qno=${data.query_no
            }`,
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
            `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${data.fromDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&to=${data.toDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&status=${data.p_status
            }&pcat_id=${data.pcatId}&qno=${data.query_no}`,
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
            `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${fromDate}&to=${toDate}&status=${data.p_status
            }&pcat_id=${selectedData}&qno=${data.query_no}`,
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
        if (data.p_status.length > 0) {
          axios
            .get(
              `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
                userid
              )}&cat_id=${data.store}&from=${data.fromDate
              // ?.split("-")
              // .reverse()
              // .join("-")
              }&to=${data.toDate
              // ?.split("-")
              // .reverse()
              // .join("-")
              }&status=${data.p_status
              }&pcat_id=${data.pcatId}&qno=${data.query_no}`,
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
              `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
                userid
              )}&cat_id=${data.store}&from=${data.fromDate
              // ?.split("-")
              // .reverse()
              // .join("-")
              }&to=${data.toDate
              // ?.split("-")
              // .reverse()
              // .join("-")
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
        }
      }
      else {
        if (data.p_status.length > 0) {
          axios
            .get(
              `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
                userid
              )}&cat_id=${store2}&from=${fromDate}&to=${toDate}&status=${data.p_status
              }&pcat_id=${selectedData}&qno=${data.query_no}`,
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
              `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
                userid
              )}&cat_id=${store2}&from=${fromDate}&to=${toDate}&status=1&pcat_id=${selectedData}`,
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
    }
    if (proposal === "acceptedProposal") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${data.fromDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&to=${data.toDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&status=2&pcat_id=${data.pcatId}&qno=${data.query_no
            }`,
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
            `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${fromDate}&to=${toDate}&status=2&pcat_id=${selectedData}&qno=${data.query_no
            }`,
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
            `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${data.fromDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&to=${data.toDate
            // ?.split("-")
            // .reverse()
            // .join("-")
            }&status=3&pcat_id=${data.pcatId}&qno=${data.query_no
            }`,
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
            `${baseUrl}/tl/getProposalTl?id=${JSON.parse(
              userid
            )}&cat_id=${store2}&from=${fromDate}&to=${toDate}&status=3&pcat_id=${selectedData}&qno=${data.query_no
            }`,
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
      console.log("inside all payment axios");
      if (data.route) {
        console.log("inside all payment axios1");
        console.log(`${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(
          userid)}&cat_id=${data.store}&from=${data.fromDate}
          &to=${data.toDate}&status=${data.p_status}
          &pcat_id=${data.pcatId}&qno=${data.query_no}`,"All with data routes");
        axios
          .get(
            `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(userid)}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              if (res.data.result) {
                setData(res.data.result);
                setRecords(res.data.result.length);
                console.log(res.data.result)
              }
            }
          });
      }
      else {


        console.log("inside all payment axios2");
        console.log(`${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(userid)}
        &cat_id=${store2}&from=${fromDate}&to=${toDate}&status=${data.p_status}
        &pcat_id=${selectedData}&qno=${data.query_no.typeof}`,"Else all Y");
        axios
          .get(
            `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(userid)}&cat_id=${store2}&from=${fromDate}&to=${toDate}&status=${data.p_status}&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              if (res.data.result) {
                setData(res.data.result);
                setRecords(res.data.result.length);
                console.log("res.data.result in getting", res.data.result);
              }
            }
          });
      }
    }

    if (Unpaid === "Unpaid") {
      if (data.route) {
        axios
          .get(
            `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(
              userid
            )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&status=1&pcat_id=${data.pcatId}&qno=${data.query_no}`,
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
            `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(userid)}&cat_id=${store2}&from=${fromDate}&to=${toDate}&status=1&pcat_id=${selectedData}&qno=${data.query_no
            }`,
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
            `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(userid)}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&status=2&pcat_id=${data.pcatId}&qno=${data.query_no}`,
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
            `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(userid)}&cat_id=${store2}&from=${fromDate}&to=${toDate}&status=2&pcat_id=${selectedData}&qno=${data.query_no}`,
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
    let qd = JSON.parse(localStorage.getItem(`searchDataQ${index}`));
    let pd = JSON.parse(localStorage.getItem(`searchDataP${index}`));
    let yd = JSON.parse(localStorage.getItem(`searchDataY${index}`));
    let ad = JSON.parse(localStorage.getItem(`searchDataA${index}`));

    if ((AllQuery === "AllQuery") || (pendingForAcceptence === "pendingForAcceptence") || (InprogressQuery === "InprogressQuery") || (inCompleteQuery == "inCompleteQuery") || (DeclinedQuery == "DeclinedQuery")) {
      if (qd) {
        if (qd.route === window.location.pathname && qd.index === index) {
          setStore2(qd.store);
          setToDate(qd.toDate);
          setFromDate(qd.fromDate);
          setSelectedData(qd.pcatId);
          setStatus1(qd.p_status);
          setQueryno(qd.query_no);
          setFromDate(qd.fromDate)
          setDateto(qd.toDate)
          onSubmit(qd);
        }
      } else if (!qd?.toDate) {
        let date = moment().format("DD-MM-YYYY");
        let fullDate = date;
        setToDate(fullDate);
      }
    } else if ((completeAssignment === "completeAssignment")) {
      if (ad) {
        if (ad.route === window.location.pathname && ad.index === index) {
          setStore2(ad.store);
          setToDate(ad.toDate);
          setFromDate(ad.fromDate);
          setSelectedData(ad.pcatId);
          setStatus1(ad.p_status);
          setQueryno(ad.query_no);
          setFromDate(ad.fromDate)
          setDateto(ad.toDate)
          onSubmit(ad);
        }
      } else if (!ad?.toDate) {
        let date = moment().format("DD-MM-YYYY");
        let fullDate = date;
        setToDate(fullDate);
      }
    } else if ((AllProposal === "AllProposal") || (InprogressProposal === "InprogressProposal") || (proposal === "acceptedProposal") || (proposal == "proposal")) {
      if (pd) {
        if (pd.route === window.location.pathname && pd.index === index) {
          setStore2(pd.store);
          setToDate(pd.toDate);
          setFromDate(pd.fromDate);
          setSelectedData(pd.pcatId);
          setStatus1(pd.p_status);
          setQueryno(pd.query_no);
          setFromDate(pd.fromDate)
          setDateto(pd.toDate)
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
          setToDate(yd.toDate);
          setFromDate(yd.fromDate);
          setSelectedData(yd.pcatId);
          setStatus1(yd.p_status);
          setQueryno(yd.query_no);
          setFromDate(yd.fromDate)
          setDateto(yd.toDate)
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
          type="submit"
          className="customBtn mx-sm-1 mb-2"
          onClick={() => resetData()}
        >
          Reset
        </button>
      </>
    );
  };

  const fromDateFun = (e) => {
    setFromDate(e.format("YYYY-MM-DD"));
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
                        onChange={(e) => fromDateFun(e)}
                        disabledDate={(d) => !d || d.isAfter(maxDate)}
                        format={dateFormatList}
                        ref={dateValue}
                        name="fromDate"
                        defaultValue={moment(
                          `${fromDate}`,
                          dateFormat
                        )}
                      />
                    </div> :
                    ""
                }
                {(fromDate.length) === 0 ?
                  <div className="form-group mx-sm-1  mb-2">
                    <DatePicker
                      onChange={(e) => fromDateFun(e)}
                      disabledDate={(d) => !d || d.isAfter(maxDate)}
                      format={dateFormatList}
                      ref={dateValue}
                      name="fromdate"
                    />
                  </div>
                  :
                  ""
                }

                <div className="form-group mx-sm-1  mb-2">
                  <label className="form-select form-control">To</label>
                </div>

                {
                  (dateto.length > 0) ?
                    <div className="form-group mx-sm-1  mb-2">
                      <DatePicker
                        onChange={(e) => setToDate(e.format("YYYY-MM-DD"))}
                        disabledDate={(d) => !d || d.isAfter(maxDate)}
                        defaultValue={moment(
                          `${dateto}`,
                          dateFormat
                        )}
                        format={dateFormatList}
                        ref={dateValue}
                        name="todate"
                      />
                    </div> :
                    ""
                }
                {
                  (dateto.length === 0) ?
                    <div className="form-group mx-sm-1  mb-2">
                      <DatePicker
                        onChange={(e) => setToDate(e.format("YYYY-MM-DD"))}
                        disabledDate={(d) => !d || d.isAfter(maxDate)}
                        ref={dateValue}
                        defaultValue={moment(new Date(), "DD MM, YYYY")}
                        format={dateFormatList}
                        name="todate"
                      />
                    </div>
                    :
                    ""
                }

                <div className="form-group mx-sm-1  mb-2">
                  {AllQuery == "AllQuery" && (
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

                  {InprogressQuery == "InprogressQuery" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                      value={status1}
                      onChange={(e) => setStatus1(e.target.value)}
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
                      onChange={(e) => setStatus1(e.target.value)}
                      value={status1}
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
                      onChange={(e) => setStatus1(e.target.value)}
                      value={status1}
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
                      onChange={(e) => setStatus1(e.target.value)}
                      value={status1}
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
                <div className="form-group mx-sm-1  mb-2">
                  <input
                    type="text"
                    name="query_no"
                    ref={register}
                    placeholder="Enter Query Number"
                    className="form-control"
                    value={queryno}
                    onChange={(e) => setQueryno(e.target.value)}
                  />
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

export default TeamFilter;