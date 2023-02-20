import React, { useState, useEffect ,useRef } from "react";
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
  } = props;
  const userid = window.localStorage.getItem("tlkey");

  const [selectedData, setSelectedData] = useState([]);
  const [inputQTest,setInputQTest]=useState(false)
  const [inputPTest,setInputPTest]=useState(false)
  const [inputPayTest,setInputTest]=useState(false)
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [status1, setStatus1] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [pstatus, setPstatus] = useState("");
  const [queryno, setQueryno] = useState("")
  const [datefrom, setDatefrom] = useState("")
  const [dateto, setDateto] = useState("")
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10));
  const maxDate = moment(new Date().toISOString().slice(0, 10)).add(1, "days");
  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);

  const [item] = useState(current_date);

  const [tlQueryFilterData, setQueryTlFilterData] = useState({
    qp_status: [], qcategory: "", qsubcategory: [], qdatefrom: "", qdateto: "", qno: ""
  });
  const { qp_status, qcategory, qsubcategory, qdatefrom, qdateto, qno } = tlQueryFilterData

  const [tlPropsalFilterData, setProposalTlFilterData] = useState({
    pp_status: [], pcategory: "", psubcategory: [], pdatefrom: "", pdateto: "", pqno: ""
  });
  const { pp_status, pcategory, psubcategory, pdatefrom, pdateto, pqno } = tlPropsalFilterData

  const [tlPayFilterData, setTlPayFilterData] = useState({
    payp_status: [], paycategory: "", paysubcategory: [], paydatefrom: "", paydateto: "", payqno: ""
  });
  const { payp_status, paycategory, paysubcategory, paydatefrom, paydateto, payqno } = tlPayFilterData

  const [tlAsFilterData, setTlAsFilterData] = useState({
    asp_status: [], ascategory: "", assubcategory: [], asdatefrom: "", asdateto: "", asqno: ""
  });
  const { asp_status, ascategory, assubcategory, asdatefrom, asdateto, asqno } = tlPayFilterData

  

  useEffect(() => {
    const getSubCategory = () => {
      if (selectedData.length != 0) {
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


  useEffect(() => {
    setInputQTest(false)
  }, [])
  useEffect(() => {
    if ((tlQueryFilter.qp_status !== [] || tlQueryFilter.qcategory !== "" || tlQueryFilter.qsubcategory !== [] || tlQueryFilter.qdatefrom !== "" || tlQueryFilter.qdateto !== "" || tlQueryFilter.qno !== "") &&
      ((AllQuery === "AllQuery") || (pendingForAcceptence === "pendingForAcceptence") || (InprogressQuery === "InprogressQuery") || (inCompleteQuery == "inCompleteQuery") || (DeclinedQuery == "DeclinedQuery"))) {
      console.log("ready so QueryFIlter")
      setSelectedData(tlQueryFilter.qcategory);
      setStore2(tlQueryFilter.qsubcategory)
      handleQueryno(tlQueryFilter.qno)
      setPstatus(tlQueryFilter.qp_status)
      setDatefrom(tlQueryFilter.qdatefrom)
      setDateto(tlQueryFilter.qdateto)
      setQueryno(tlQueryFilter.qno)
      if (InprogressQuery === "InprogressQuery") {
        setStatus1(tlQueryFilter.qp_status)
      }
      console.log("date is updated and submitted");
      setInputQTest(true)
    }
  }, [])
  useEffect(() => {
    console.log("inside test useeffect",inputQTest);
    onSubmit(tlQuerydatatemp)
  }, [inputQTest])
  useEffect(() => {
    if ((tlPropsalFilter.pp_status !== [] || tlPropsalFilter.pcategory !== "" || tlPropsalFilter.psubcategory !== [] || tlPropsalFilter.pdatefrom !== "" || tlPropsalFilter.pdateto !== "" || tlPropsalFilter.pqno !== "")
      && ((AllProposal === "AllProposal") || (InprogressProposal === "InprogressProposal") || (proposal === "acceptedProposal") || (proposal === "proposal"))
    ) {
      // console.log("ready so ProposalFIlter")
      setSelectedData(tlPropsalFilter.pcategory)
      setStore2(tlPropsalFilter.psubcategory)
      handleQueryno(tlPropsalFilter.pqno)
      setPstatus(tlPropsalFilter.pp_status)
      setDatefrom(tlPropsalFilter.pdatefrom)
      setDateto(tlPropsalFilter.pdateto)
      setQueryno(tlPropsalFilter.pqno)
    }
  }, [])

  useEffect(() => {
    if ((tlPayFilter.payp_status !== [] || tlPayFilter.paycategory !== "" || tlPayFilter.paysubcategory !== [] || tlPayFilter.paydatefrom !== "" || tlPayFilter.paydateto !== "" || tlPayFilter.payqno !== "") &&
      ((AllPayment === "AllPayment") || (Unpaid === "Unpaid") || (Paid === "Paid"))
    ) {
      // console.log("ready so PayFIlter")
      setSelectedData(tlPayFilter.paycategory)
      setStore2(tlPayFilter.paysubcategory)
      handleQueryno(tlPayFilter.payqno)
      setPstatus(tlPayFilter.payp_status)
      setDatefrom(tlPayFilter.paydatefrom)
      setDateto(tlPayFilter.paydateto)
      setQueryno(tlPayFilter.payqno)
    }
  }, [])
  useEffect(() => {
    if ((tlAsFilter.asp_status !== [] || tlAsFilter.ascategory !== "" || tlAsFilter.assubcategory !== [] || tlAsFilter.asdatefrom !== "" || tlAsFilter.asdateto !== "" || tlAsFilter.asqno !== "") &&
      ((completeAssignment === "completeAssignment"))
    ) {
      // console.log("ready so PayFIlter")
      setSelectedData(tlAsFilter.ascategory)
      setStore2(tlAsFilter.assubcategory)
      handleQueryno(tlAsFilter.asqno)
      setPstatus(tlAsFilter.asp_status)
      setDatefrom(tlAsFilter.asdatefrom)
      setDateto(tlAsFilter.asdateto)
    }
  }, [])

  //handleCategory
  const handleCategory = (value) => {
    setSelectedData(value);
    setStore2([]);
  };

  //handleSubCategory
  const handleSubCategory = (value) => {
    setStore2(value);
  };

  const handleQueryno = (value) => {
    setQueryno(value);
  }

  //reset category
  const resetCategory = () => {
    setSelectedData([]);
    setStore2([]);
    setTax2([]);
    getData();
  };

  //reset date
  const resetData = () => {
    reset();
    setSelectedData([]);
    setStore2([]);
    setStatus1(1);
    setTax2([]);
    getData();
    setQueryno("")
    setDatefrom("");
    setPstatus("")
    if ((AllQuery === "AllQuery") || (pendingForAcceptence === "pendingForAcceptence") || (InprogressQuery === "InprogressQuery") || (inCompleteQuery == "inCompleteQuery") || (DeclinedQuery == "DeclinedQuery")) {
      setQueryTlFilterData({qp_status: [], qcategory: "", qsubcategory: [], qdatefrom: "", qdateto: "", qno: ""})
  }
    else if ((AllProposal === "AllProposal") || (InprogressProposal === "InprogressProposal") || (proposal === "acceptedProposal") || (proposal === "proposal")) {
      setProposalTlFilterData({pp_status: [], pcategory: "", psubcategory: [], pdatefrom: "", pdateto: "", pqno: ""});
    }
    else {
      setTlAsFilterData({asp_status: [], ascategory: "", assubcategory: [], asdatefrom: "", asdateto: "", asqno: ""});
    }

  };
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };


  const onSubmit = (data) => {
    console.log(data," Data from form");
    if (AllQuery === "AllQuery") {
      setQueryTlFilterData({ qp_status: data.p_status, qcategory: selectedData, qsubcategory: store2, qdatefrom: fromDate, qdateto: toDate, qno: data.query_no })
      console.log("p_status", data.p_status, "SelectedData", selectedData, "Subcot", store2, "fromDate", fromDate, "todate", toDate, "qno", data.query_no, "allQuerydata")
      if ((tlQueryFilterData.qp_status !== "" || tlQueryFilterData.qcategory !== "" || tlQueryFilterData.qsubcategory !== [] || tlQueryFilterData.qdatefrom !== "" || tlQueryFilterData.qno !== "")) 
      { 
        console.log("Inside If axios");
        console.log(`${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}&status=${data.p_status
        }&cat_id=${tlQueryFilterData.qsubcategory}&from=${tlQueryFilterData.qdatefrom}&to=${tlQueryFilterData.qdateto}&pcat_id=${tlQueryFilterData.qcategory}&qno=${data.query_no}`,"THIS IS IF ADDRESS");
        axios
        .get(
          `${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}&status=${data.p_status
          }&cat_id=${tlQueryFilterData.qsubcategory}&from=${tlQueryFilterData.qdatefrom}&to=${tlQueryFilterData.qdateto}&pcat_id=${tlQueryFilterData.qcategory}&qno=${data.query_no}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            console.log("getting if axios value");
            console.log(res.data.result)
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
      }
      else{
        console.log("inside Else axios");
      axios
        .get(
          `${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}&status=${data.p_status
          }&cat_id=${store2}&from=${fromDate}&to=${toDate}&pcat_id=${selectedData}&qno=${data.query_no
          }`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            console.log("getting else axios value");
            console.log(res.data.result)
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
      }
    }

    if (pendingForAcceptence === "pendingForAcceptence") {
      setQueryTlFilterData({ qp_status: data.p_status, qcategory: selectedData, qsubcategory: store2, qdatefrom: fromDate, qdateto: toDate, qno: data.query_no })
      // console.log("p_status", data.p_status, "SelectedData", selectedData, "Subcot", store2, "fromDate", fromDate, "todate", toDate, "qno", data.query_no, "pendingForAcceptence")

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

    if (InprogressQuery === "InprogressQuery") {
      setQueryTlFilterData({ qp_status: data.p_status, qcategory: selectedData, qsubcategory: store2, qdatefrom: fromDate, qdateto: toDate, qno: data.query_no })
      // console.log("p_status", data.p_status, "SelectedData", selectedData, "Subcot", store2, "fromDate", fromDate, "todate", toDate, "qno", data.query_no, "inProgress")
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
    if (inCompleteQuery === "inCompleteQuery") {
      setQueryTlFilterData({ qp_status: data.p_status, qcategory: selectedData, qsubcategory: store2, qdatefrom: fromDate, qdateto: toDate, qno: data.query_no })
      // console.log("p_status", data.p_status, "SelectedData", selectedData, "Subcot", store2, "fromDate", fromDate, "todate", toDate, "qno", data.query_no, "incompletequery")
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

    if (DeclinedQuery === "DeclinedQuery") {
      setQueryTlFilterData({ qp_status: data.p_status, qcategory: selectedData, qsubcategory: store2, qdatefrom: fromDate, qdateto: toDate, qno: data.query_no })
      // console.log("p_status", data.p_status, "SelectedData", selectedData, "Subcot", store2, "fromDate", fromDate, "todate", toDate, "qno", data.query_no, "declinedQuery")
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

    if (completeAssignment === "completeAssignment") {
      setTlAsFilterData({ asp_status: data.p_status, ascategory: selectedData, assubcategory: store2, asdatefrom: fromDate, asdateto: toDate, asqno: data.query_no })
      // console.log("p_status", data.p_status, "SelectedData", selectedData, "Subcot", store2, "fromDate", fromDate, "todate", toDate, "qno", data.query_no, "complelteAss")

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

    if (AllProposal === "AllProposal") {
      // console.log("p_status", data.p_status, "SelectedData", selectedData, "Subcot", store2, "fromDate", fromDate, "todate", toDate, "qno", data.query_no, "Allpropsal")
      setProposalTlFilterData({ pp_status: data.p_status, pcategory: selectedData, psubcategory: store2, pdatefrom: fromDate, pdateto: toDate, pqno: data.query_no })
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

    if (InprogressProposal === "InprogressProposal") {
      // console.log("p_status", data.p_status, "SelectedData", selectedData, "Subcot", store2, "fromDate", fromDate, "todate", toDate, "qno", data.query_no, "Inprogresspropsal")
      setProposalTlFilterData({ pp_status: data.p_status, pcategory: selectedData, psubcategory: store2, pdatefrom: fromDate, pdateto: toDate, pqno: data.query_no })
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
        // console.log("p_status", data.p_status, "SelectedData", selectedData, "Subcot", store2, "fromDate", fromDate, "todate", toDate, "qno", data.query_no, "else")
        setProposalTlFilterData({ pp_status: data.p_status, pcategory: selectedData, psubcategory: store2, pdatefrom: fromDate, pdateto: toDate, pqno: data.query_no })
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
    if (proposal === "acceptedProposal") {
      // console.log("p_status", data.p_status, "SelectedData", selectedData, "Subcot", store2, "fromDate", fromDate, "todate", toDate, "qno", data.query_no, "Acceptedpropsal")
      setProposalTlFilterData({ pp_status: data.p_status, pcategory: selectedData, psubcategory: store2, pdatefrom: fromDate, pdateto: toDate, pqno: data.query_no })
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

    if (proposal === "proposal") {
      // console.log("p_status", data.p_status, "SelectedData", selectedData, "Subcot", store2, "fromDate", fromDate, "todate", toDate, "qno", data.query_no, "propsal")
      setProposalTlFilterData({ pp_status: data.p_status, pcategory: selectedData, psubcategory: store2, pdatefrom: fromDate, pdateto: toDate, pqno: data.query_no })
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

    if (AllPayment === "AllPayment") {
      // console.log("p_status", data.p_status, "SelectedData", selectedData, "Subcot", store2, "fromDate", fromDate, "todate", toDate, "qno", data.query_no, "Allpayment")
      setTlPayFilterData({ paycategory: selectedData, paysubcategory: store2, paydatefrom: fromDate, paydateto: toDate, payqno: data.query_no, payp_status: data.p_status })
      axios
        .get(
          `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(
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

    if (Unpaid === "Unpaid") {
      // console.log("SelectedData", selectedData, "Subcot", store2, "fromDate", fromDate, "todate", toDate, "qno", data.query_no, "Allpayment")
      setTlPayFilterData({ paycategory: selectedData, paysubcategory: store2, paydatefrom: fromDate, paydateto: toDate, payqno: data.query_no })
      axios
        .get(
          `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(
            userid
          )}&cat_id=${store2}&from=${fromDate}&to=${toDate}&status=1&pcat_id=${selectedData}&qno=${data.query_no
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

    if (Paid === "Paid") {
      // console.log("SelectedData", selectedData, "Subcot", store2, "fromDate", fromDate, "todate", toDate, "qno", data.query_no, "Allpayment")
      setTlPayFilterData({ paycategory: selectedData, paysubcategory: store2, paydatefrom: fromDate, paydateto: toDate, payqno: data.query_no })
      axios
        .get(
          `${baseUrl}/tl/getUploadedProposals?uid=${JSON.parse(
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
  };

  //to put previous data
  const tlQueryFilter = JSON.parse(localStorage.getItem("tlQueryFilterData"));
  const tlQuerydatatemp = { p_status: tlQueryFilter.qp_status, query_no: tlQueryFilter.qno }
  
  useEffect(() => {
    const tlQueryFilterData = JSON.parse(localStorage.getItem("tlQueryFilterData"));
    if (tlQueryFilterData.qp_status !== [] || tlQueryFilterData.qcategory !== "" || tlQueryFilterData.qsubcategory !== [] || tlQueryFilterData.qdatefrom !== "" || tlQueryFilterData.qdateto !== "" || tlQueryFilterData.qno !== "") {
      setQueryTlFilterData((queprev) => ({ ...queprev, ...tlQueryFilterData }));
      console.log(tlQuerydatatemp, "Querytempfilled Here");
      }
  }, [])
  const tlPropsalFilter = JSON.parse(localStorage.getItem("tlPropsalFilterData"));
  const tlProposaldatatemp = { p_status: tlPropsalFilter.pp_status, query_no: tlPropsalFilter.pqno }
  // console.log(tlProposaldatatemp, "ProposalTemp filled ");
  useEffect(() => {
    const tlPropsalFilterData = JSON.parse(localStorage.getItem("tlPropsalFilterData"));
    if (tlPropsalFilterData.pp_status !== [] || tlPropsalFilterData.pcategory !== "" || tlPropsalFilterData.psubcategory !== [] || tlPropsalFilterData.pdatefrom !== "" || tlPropsalFilterData.pdateto !== "" || tlPropsalFilterData.pqno !== "") {
      setProposalTlFilterData((proprev) => ({ ...proprev, ...tlPropsalFilterData }));
    }
  }, [])
  const tlPayFilter = JSON.parse(localStorage.getItem("tlPayFilterData"));
  const tlPayFilterDatatemp = { p_status: tlPayFilterData.payp_status, query_no: tlPayFilterData.payqno }
  // console.log(tlPayFilterDatatemp, "temppay filled");
  useEffect(() => {
    const tlPayFilterData = JSON.parse(localStorage.getItem("tlPayFilterData"));
    if (tlPayFilterData.payp_status !== [] || tlPayFilterData.paycategory !== "" || tlPayFilterData.paysubcategory !== [] || tlPayFilterData.paydatefrom !== "" || tlPayFilterData.paydateto !== "" || tlPayFilterData.payqno !== "") {
      setTlPayFilterData((payprev) => ({ ...payprev, ...tlPayFilterData }));
    }
  }, [])
  const tlAsFilter = JSON.parse(localStorage.getItem("tlAsFilterData"));

  useEffect(() => {
    const tlAsFilterData = JSON.parse(localStorage.getItem("tlAsFilterData"));
    if (tlAsFilterData.asp_status !== [] || tlAsFilterData.ascategory !== "" || tlAsFilterData.assubcategory !== [] || tlAsFilterData.paydatefrom !== "" || tlAsFilterData.asdateto !== "" || tlAsFilterData.asqno !== "") {
      setTlAsFilterData((asprev) => ({ ...asprev, ...tlAsFilterData }));
    }
  }, [])

  //to put data storage
  useEffect(() => {
    localStorage.setItem("tlQueryFilterData", JSON.stringify(tlQueryFilterData))
    console.log(tlQueryFilterData, "filter data is saved")
  }, [tlQueryFilterData]);
  useEffect(() => {
    localStorage.setItem("tlPropsalFilterData", JSON.stringify(tlPropsalFilterData))
    // console.log(tlPropsalFilterData, "filter data is saved")
  }, [tlPropsalFilterData]);
  useEffect(() => {
    localStorage.setItem("tlPayFilterData", JSON.stringify(tlPayFilterData))
    // console.log(tlPayFilterData, "filter data is saved")
  }, [tlPayFilterData]);
  useEffect(() => {
    localStorage.setItem("tlAsFilterData", JSON.stringify(tlAsFilterData))
    // console.log(tlAsFilterData, "filter data is saved")
  }, [tlAsFilterData]);
  
  //for auto submit


  // useEffect(() => {
  //   if ((tlQueryFilterData.qdateto !== "") &&
  //     ((AllQuery === "AllQuery") || (pendingForAcceptence === "pendingForAcceptence") || (InprogressQuery === "InprogressQuery") || (inCompleteQuery === "inCompleteQuery") || (DeclinedQuery === "DeclinedQuery")))
  //     {
  //     const tlQuerydatatemp = { p_status: tlQueryFilterData.qp_status, query_no: tlQueryFilterData.qno }
  //     onSubmit(tlQuerydatatemp);
  //     console.log(tlQuerydatatemp, "there is data in Queryfilter")
  //   }
  //   else if ((tlPropsalFilterData.pdateto !== "") &&
  //     ((AllProposal === "AllProposal") || (InprogressProposal === "InprogressProposal") || (proposal === "acceptedProposal") || (proposal === "proposal"))) {
  //     const tlProposaldatatemp = { p_status: tlPropsalFilter.pp_status, query_no: tlPropsalFilter.pqno }
  //     onSubmit(tlProposaldatatemp);
  //     console.log("there is data in Proposalfilter")
  //   }
  //   else if ((tlPayFilterData.paydateto !== "") &&
  //     ((AllPayment === "AllPayment") || (Unpaid === "Unpaid") || (Paid === "Paid"))) {
  //     const tlPayFilterDatatemp = { p_status: tlPayFilterData.payp_status, query_no: tlPayFilterData.payqno }
  //     onSubmit(tlPayFilterDatatemp);
  //     console.log("there is data in Payfilter")
  //   }
  //   else { 
  //     console.log("nofilterhere")
  //    }
  // }, [])

  // useEffect(() => {
  //   const tlQueryFilterData = JSON.parse(localStorage.getItem("tlQueryFilterData"));
  //   // if((tlQueryFilterData.qp_status !== "" || tlQueryFilterData.qcategory !== "" || tlQueryFilterData.qsubcategory !== [] || tlQueryFilterData.qdatefrom !== "" || tlQueryFilterData.qdateto !== "" ||tlQueryFilterData.qno !== "")){
  //   const tlQuerydatatemp = { p_status: tlQueryFilterData.payp_status, query_no: tlQueryFilterData.payqno }
  //   onSubmit(tlQuerydatatemp);
  //   console.log(tlQuerydatatemp, "there is data in Queryfilter")
  //   // } 
  //   // else{console.log("nofilterhere")}
  // }, [])

  // useEffect(() => {
  //   const tlPropsalFilterData = JSON.parse(localStorage.getItem("tlPropsalFilterData"));
  //   if((tlPropsalFilterData.pp_status !== "" || tlPropsalFilterData.pcategory !== "" || tlPropsalFilterData.psubcategory !== [] || tlPropsalFilterData.pdatefrom !== "" || tlPropsalFilterData.pdateto !== "" || tlPropsalFilterData.pqno !== "")){
  //     onSubmit(tlPropsalFilterData);
  //     console.log("there is data in Proposalfilter")
  //   } 
  //   else{console.log("nofilterhere")}
  //   },[])

  //   useEffect(() => {
  //     const tlPayFilterData = JSON.parse(localStorage.getItem("tlPayFilterData"));
  //     if((tlPayFilterData.payp_status !== "" || tlPayFilterData.paycategory !== "" || tlPayFilterData.paysubcategory !== [] || tlPayFilterData.paydatefrom!== "" || tlPayFilterData.paydateto !== "" || tlPayFilterData.payqno !== "" )){
  //       onSubmit(tlPayFilterData);
  //       console.log("there is data in Payfilter")
  //     } 
  //     else{console.log("nofilterhere")}
  //     },[])

  // if ((tlQueryFilterData.qp_status !== "" || tlQueryFilterData.qcategory !== "" || tlQueryFilterData.qsubcategory !== [] || tlQueryFilterData.qdatefrom !== "" || tlQueryFilterData.qdateto !== "" || tlQueryFilterData.qno !== "")) {
  //   const tlQuerydatatemp = { p_status: tlQueryFilterData.payp_status, query_no: tlQueryFilterData.payqno }
  //   onSubmit(tlQuerydatatemp);
  //   console.log(tlQuerydatatemp, "there is data in Queryfilter")
  // }
  // else if ((tlPropsalFilterData.pp_status !== "" || tlPropsalFilterData.pcategory !== "" || tlPropsalFilterData.psubcategory !== [] || tlPropsalFilterData.pdatefrom !== "" || tlPropsalFilterData.pdateto !== "" || tlPropsalFilterData.pqno !== "")) {
  //   const tlProposaldatatemp = {p_status:tlPropsalFilterData.pp_status,query_no:tlPropsalFilterData.pqno}
  //   onSubmit(tlPropsalFilterData);
  //   console.log("there is data in Proposalfilter")
  // } else if ((tlPayFilterData.payp_status !== "" || tlPayFilterData.paycategory !== "" || tlPayFilterData.paysubcategory !== [] || tlPayFilterData.paydatefrom !== "" || tlPayFilterData.paydateto !== "" || tlPayFilterData.payqno !== "")) {
  //   const tlPayFilterDatatemp ={p_status:tlPayFilterData.payp_status,query_no:tlPayFilterData.payqno}
  //   onSubmit(tlPayFilterData);
  //   console.log("there is data in Payfilter")
  // }
  // else { console.log("nofilterhere") }




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
  const dateFormat = "YYYY-MM-DD";
  const fromDateFun = (e) => {
    setFromDate(e.format("YYYY-MM-DD"));
  };
  // console.log(datefrom.length)
  // console.log(dateto.length);


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
                    ref={register}
                    value={selectedData}
                    name="cat"
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
                    ref={register}
                    value={store2}
                    allowClear
                    name="subcat"
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
                  (datefrom.length) > 0 ?
                    <div className="form-group mx-sm-1  mb-2">
                      <DatePicker
                        onChange={(e) => fromDateFun(e)}
                        disabledDate={(d) => !d || d.isAfter(maxDate)}
                        format={dateFormatList}
                        ref={register}
                        name="fromdate"
                        defaultValue={moment(
                          `${datefrom}`,
                          dateFormat
                        )}
                      />
                    </div> :
                    ""
                }
                {(datefrom.length) === 0 ?
                  <div className="form-group mx-sm-1  mb-2">
                    <DatePicker
                      onChange={(e) => fromDateFun(e)}
                      disabledDate={(d) => !d || d.isAfter(maxDate)}
                      format={dateFormatList}
                      ref={register}
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
                        ref={register}
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
                        ref={register}
                        defaultValue={moment(new Date(), "DD MM, YYYY")}
                        format={dateFormatList}
                        name="todate"
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
                      value={pstatus}
                      onChange={(e) => setPstatus(e.target.value)}
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
                    >
                      <option value="">--select--</option>
                      <option value="4">Inprogress Acceptance</option>
                      <option value="5">Inprogress; Proposal</option>
                      <option value="6">Inprogress; Assignment</option>
                    </select>
                  )}

                  {DeclinedQuery === "DeclinedQuery" && (
                    <select
                      className="form-select form-control"
                      name="p_status"
                      ref={register}
                      style={{ height: "33px" }}
                      value={pstatus}
                      onChange={(e) => setPstatus(e.target.value)}
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
                      value={pstatus}
                      onChange={(e) => setPstatus(e.target.value)}
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
                      value={pstatus}
                      onChange={(e) => setPstatus(e.target.value)}
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
                      value={pstatus}
                      onChange={(e) => setPstatus(e.target.value)}
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