import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { baseUrl, baseUrl3 } from "../../../config/config";
import "./Admin.css";
import Select from "react-select";
import Layout from "../../../components/Layout/Layout";
import { Typography, Button } from "@material-ui/core";
import Mandatory from "../../../components/Common/Mandatory";
import { useHistory } from "react-router";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import Swal from "sweetalert2";
import $ from "jquery";
const EnquiryReport = () => {
  const userid = window.localStorage.getItem("tlkey");

  const selectInputRef = useRef();
  const selectInputRef2 = useRef();
  const selectInputRef3 = useRef();
  const selectInputRef4 = useRef();
  const selectInputRef5 = useRef();
  const selectInputRef6 = useRef();

  const [subData, subCategeryData] = useState([]);
  const [custCate, setCustcate] = useState([]);
  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store, setStore] = useState([]);
  const [error, setError] = useState();
  const [error2, setError2] = useState();
  const [mcatname, setmcatname] = useState([]);
  const [nn, setNn] = useState([]);
  const [mcategory, setmcategory] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [custCate2, setCustcate2] = useState([]);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [taxId, setTaxId] = useState("");
  const [taxxId, setTaxxId] = useState("");
  const [teamleader44, setTeamleader44] = useState("");
  const [taxprofessional44, setTaxprofessional44] = useState("");
  const [qno, setQno] = useState();
  const [custData, setcustData] = useState();
  const [cname, setcName] = useState("");
  const [qqno, setQqno] = useState("");
  const [checkBox, setCheckBox] = useState(null);
  const [proposalCheckbox, setProposalCheckbox] = useState(null);
  const [assignmentCheckbox, setAssignmentCheckbox] = useState(null);
  const [paymnetCheckbox, setPaymentCheckbox] = useState(null);
  const [manualCheckbox, setManualCheckbox] = useState(null);
  const [manualSearch, setManualSearch] = useState(false);
  const [issueInvoice, setIssueInvoice] = useState(false);
  const [companyName, setCompanyName] = useState([]);
  const [companyName2, setCompanyName2] = useState([]);
  const [basicValue, setBasicValue] = useState({
    brief_fact_case: false,
    assessment: false,
    purpose_p: false,
    p_format: false,
    t_requested: false,
    spc_que: false,
    doa: false,
    process_status: false,
  });
  const [proposalValue, setProposalValue] = useState({
    paymentDeclinedReason: false,
    declinedDate: false,
    amount_overdue: false,
    amountOutstanding: false,
    amount_receipt: false,
    date_acceptance: false,
    acceptedAmount: false,
    proposal_status: false,
    paymentTerms: false,
    proposedAmount: false,
    dateProposal: false,
    issue_invoice: false,
  });
  const [assignmeneValue, setAssignmentValue] = useState({
    assignDate: false,
    completionDate: false,
    assignStatus: false,
    completionQuery: false,
    assignTime: false,
  });
  const [paymentValue, setPaymentValue] = useState({
    companyName: false,
    invoice_number: false,
    dos: false,
    basic_amount: false,
    pocket_expensive: false,
    cget_tax: false,
    sgst_tax: false,
    igst_tax: false,
    total_gst: false,
    total_invoice: false,
    tds: false,
    receiptDate: false,
    amount_type: false,
    amountReceived: false,
    how_paid: false,
  });
  const [manualReceipt, setManualReceipt] = useState({
    mpayable_amount: false,
    mamount_credited: false,
    maccount_number: false,
    mpayment_receipt_date: false,
    mpayment_type: false,
    mpayment_info: false,
    other_info: false,
  });
  var kk = [];
  var vv = [];
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const [dd, setDd] = useState([]);
  const history = useHistory();
  const { handleSubmit, register, errors, getValues, reset } = useForm();
  let date = new Date();
  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);
  const firstDay = new Date(
    date.getFullYear() + +"-" + ("0" + (new Date().getMonth() + 1)).slice(-2)
  );
  const [item] = useState(current_date);
  const [item2, setItem2] = useState(current_date);
  useEffect(() => {
    const getCategory = async () => {
      await axios
        .get(`${baseUrl}/customers/getCategory?pid=0`, myConfig)
        .then((res) => {
          if (res.data.code === 1) {
            setTax(res.data.result);
          }
        });
    };

    getCategory();
  }, []);

  useEffect(() => {
    const getSubCategory = async () => {
      if (store.length > 0) {
        await axios
          .get(`${baseUrl}/customers/getCategory?pid=${store}`)
          .then((res) => {
            if (res.data.code === 1) {
              setTax2(res.data.result);
            }
          });
      }
    };
    getSubCategory();
  }, [store]);
  const getCompany = () => {
    let company = [];
    let a = {};
    axios.get(`${baseUrl}/tl/getcompany`, myConfig).then((res) => {
      console.log("response", res);
      res.data.result.map((i) => {
        a = {
          value: i.company_prefix,
          label: i.name,
        };
        company.push(a);
      });
      setCompanyName(company);
    });
  };
  useEffect(() => {
    getTeamLeader();
    getData();
    getupdateQuery();
    getCompany();
  }, []);
  useEffect(() => {
    getupdateQuery();
  }, [taxId, taxxId, cname]);
  const getupdateQuery = () => {
    if (cname.length > 0) {
      axios
        .get(`${baseUrl}/tl/getAllQueryList?customer=${cname}`, myConfig)
        .then((res) => {
          if (res.data.code === 1) {
            var data = res.data.result;

            let b = res.data.result;
            setQno(b.map(getqNo));
          }
        });
    }
  };
  //   const getTeamLeader = () => {
  //     axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {

  //       var dd = []
  //       if (res.data.code === 1) {

  //         pp.push(res.data.result)

  //         res.data.result.map((i) => {

  //           if(JSON.parse(userid) == i.id){
  //             console.log("result", i)
  // setData(i)
  //           }
  //         })

  //       }
  //     });
  //   };
  const getTeamLeader = () => {
    axios.get(`${baseUrl}/tl/getTeamLeader`, myConfig).then((res) => {
      var dd = [];
      if (res.data.code === 1) {
        res.data.result.map((i) => {
          if (JSON.parse(userid) == i.id) {
            console.log("result", i);
            setTeamleader44(i.id);
            setData([i]);
          }
        });
      }
    });
  };

  useEffect(() => {
    getTaxProf();
  }, [taxId]);

  const getTaxProf = () => {
    axios
      .get(
        `${baseUrl}/tl/getTaxProfessional?tl_id=${JSON.parse(userid)}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setData2(res.data.result);
        }
      });
  };
  let pk = [];
  const custName = (a) => {
    a.map((r) => {
      pk.push(r.value);
    });
    setcName(pk);
  };

  const getData = () => {
    axios
      .get(`${baseUrl}/tl/allClient?tl_id=${JSON.parse(userid)}`, myConfig)
      .then((res) => {
        var a = res.data.result;
        if (a) {
          setcustData(a.map(mapAppointmentData));
        }
      });
  };

  const mapAppointmentData = (appiontmentData) => ({
    label: appiontmentData.name,
    value: appiontmentData.id,
  });
  const getqNo = (i) => ({
    label: i.assign_no,
    value: i.assign_no,
  });
  const options = tax.map((d) => ({
    value: d.id,
    label: d.details,
  }));

  const options2 = tax2.map((v) => ({
    value: v.id,
    label: v.details,
  }));

  const options3 = data.map((d) => ({
    value: d.id,
    label: d.name,
  }));

  const options4 = data2.map((d) => ({
    value: d.id,
    label: d.post_name,
  }));
  const resetData = () => {
    reset();
    let assignValue = assignmeneValue;
    let pVAlue = paymentValue;
    let proposValue = proposalValue;
    let bValue = basicValue;
    let manualValue = manualReceipt;
    selectInputRef.current.select.clearValue();
    selectInputRef2.current.select.clearValue();
    selectInputRef3.current.select.clearValue();
    selectInputRef4.current.select.clearValue();
    selectInputRef5.current.select.clearValue();
    selectInputRef6.current.select.clearValue();

    Object.keys(bValue).forEach((key) => {
      bValue[key] = false;
    });

    setBasicValue({
      ...basicValue,
      pVAlue,
    });
    setCheckBox(false);

    Object.keys(proposValue).forEach((key) => {
      proposValue[key] = false;
    });

    setProposalValue({
      ...proposalValue,
      proposValue,
    });
    Object.keys(assignValue).forEach((key) => {
      assignValue[key] = false;
    });

    setAssignmentValue({
      ...assignmeneValue,
      assignValue,
    });
    Object.keys(pVAlue).forEach((key) => {
      pVAlue[key] = false;
    });

    setPaymentValue({
      ...paymentValue,
      pVAlue,
    });
    Object.keys(manualValue).forEach((key) => {
      manualValue[key] = false;
    });

    setManualReceipt({
      ...manualReceipt,
      manualValue,
    });
    setManualCheckbox(false);
    setPaymentCheckbox(false);

    setAssignmentCheckbox(false);
    setPaymentCheckbox(false);
    setCheckBox(false);
    setProposalCheckbox(false);
    setQno([]);
  };
  const onSubmit = (value) => {
    let comp = [];
    companyName2.map((i) => {
      comp.push(i.value);
    });

    let basic_info = false;
    let proposal_info = false;
    let assignment_info = false;
    let payment_info = false;
    let manual_payment_info = false;
    if (
      value.process_status ||
      value.brief_fact_case ||
      value.assessment ||
      value.purpose_p ||
      value.p_format ||
      value.t_requested ||
      value.spc_que ||
      value.doa
    ) {
      basic_info = true;
    }
    if (
      value.dateProposal ||
      value.proposedAmount ||
      value.paymentTerms ||
      value.proposal_status ||
      value.acceptedAmount ||
      value.paymentDeclinedReason ||
      value.date_acceptance ||
      value.amountOutstanding ||
      value.amount_overdue ||
      value.declinedDate ||
      value.amount_receipt ||
      value.issue_invoice
    ) {
      proposal_info = true;
    }
    if (
      value.assignDate ||
      value.completionDate ||
      value.assignStatus ||
      value.completionQuery ||
      value.assignTime
    ) {
      assignment_info = true;
    }

    if (
      value.sgst_tax ||
      value.invoice_number ||
      value.companyName ||
      value.invoice_number ||
      value.dos ||
      value.basic_amount ||
      value.pocket_expensive ||
      value.cget_tax ||
      value.igst_tax ||
      value.total_gst ||
      value.tds ||
      value.total_invoice ||
      value.receiptDate ||
      value.amountReceived ||
      value.amount_type ||
      value.how_paid
    ) {
      payment_info = true;
    }
    if (
      value.mpayable_amount ||
      value.mamount_credited ||
      value.maccount_number ||
      value.mpayment_receipt_date ||
      value.mpayment_type ||
      value.mpayment_info ||
      value.other_info
    ) {
      manual_payment_info = true;
    }
    if (value.search_online) {
      if (payment_info) {
        let formData = new FormData();
        formData.append("amount_receipt", Number(value.amount_receipt));
        formData.append("report_name", value.report_name);
        formData.append("basic_info", Number(basic_info));
        formData.append("proposal_info", Number(proposal_info));
        formData.append("assignment_info", Number(assignment_info));
        formData.append("payment_info", Number(payment_info));
        formData.append("manual_payment_info", Number(manual_payment_info));
        formData.append("from", value.p_from);
        formData.append("to", value.p_to);
        formData.append("customer_name", cname);
        formData.append("teamleader", teamleader44);
        formData.append("taxprofessional", taxprofessional44);
        formData.append("query_no", qqno);
        formData.append("category", mcatname);
        formData.append("subCategory", dd);
        formData.append("q_no", Number(value.qno));
        formData.append("date_query", Number(value.dataQuery));
        formData.append("cust_id", Number(value.cust_id));
        formData.append("basic_category", Number(value.basicCategory));
        formData.append("basic_sub_category", Number(value.basic_sub_category));
        formData.append("assessment", Number(value.assessment));
        formData.append("purpose", Number(value.purpose_p));
        formData.append("p_format", Number(value.p_format));
        formData.append("t_requested", Number(value.t_requested));
        formData.append("spc_que", Number(value.spc_que));
        formData.append("date_allocation", Number(value.doa));
        formData.append("brief_fact_case", Number(value.brief_fact_case));
        // formData.append("teamleader", Number(value.tl_name));
        // formData.append("taxprofessional", Number(value.tp_name));
        formData.append("date_proposal", Number(value.dateProposal));
        formData.append("proposed_amount", Number(value.proposedAmount));
        formData.append("payment_terms", Number(value.paymentTerms));
        formData.append("proposal_status", Number(value.proposal_status));
        formData.append("accepted_amount", Number(value.acceptedAmount));
        formData.append(
          "payment_declined_reasen",
          Number(value.paymentDeclinedReason)
        );
        formData.append("date_of_acceptance", Number(value.date_acceptance));
        // formData.append("amount_received", value.amountReceived);
        formData.append("amount_outstanding", Number(value.amountOutstanding));
        formData.append("amount_overdue", Number(value.amount_overdue));
        formData.append("payment_declined", Number(value.declinedDate));
        // formData.append("assignment_number", Number(value.assignNumber));
        formData.append("assign_date", Number(value.assignDate));
        formData.append(
          "proposed_completion_date",
          Number(value.completionDate)
        );
        formData.append("assignment_status", Number(value.assignStatus));
        formData.append("date_complation", Number(value.completionQuery));
        formData.append("assign_time", Number(value.assignTime));
        formData.append("payment_recived_date", Number(value.receiptDate));
        formData.append("basic_amount", Number(value.basic_amount));
        formData.append("pocket_expensive", Number(value.pocket_expensive));
        formData.append("cget_tax", Number(value.cget_tax));
        formData.append("igst_tax", Number(value.igst_tax));
        formData.append("sgst_tax", Number(value.sgst_tax));
        formData.append("invoice_amount", Number(value.total_invoice));
        formData.append("total_gst", Number(value.total_gst));
        formData.append("process_status", Number(value.process_status));
        formData.append("tds", Number(value.tds));

        formData.append("amount_received", Number(value.amountReceived));
        formData.append("uid", JSON.parse(userid));
        formData.append("t", Math.floor(Math.random() * 110000));
        formData.append("amount_type", Number(value.amount_type));
        formData.append("dos", Number(value.dos));
        formData.append("invoice_number", Number(value.invoice_number));
        formData.append("search_online", Number(value.search_online));
        formData.append("invoicing_company", Number(value.companyName));
        formData.append("company", comp);
        formData.append("mpayable_amount", Number(value.mpayable_amount));
        formData.append("mamount_creditedt", Number(value.mamount_credited));
        formData.append("maccount_number", Number(value.maccount_number));
        formData.append(
          "mpayment_receipt_date",
          Number(value.mpayment_receipt_date)
        );
        formData.append("mpayment_type", Number(value.mpayment_type));
        formData.append("search_manual", Number(value.search_manual));
        formData.append("mpayment_info", Number(value.mpayment_info));
        formData.append("other_info", Number(value.other_info));
        formData.append("how_paid", Number(value.how_paid));
        formData.append("issue_invoice", Number(value.issue_invoice));
        axios({
          method: "POST",

          url: `${baseUrl}/report/generateReport?t=${JSON.stringify(
            Math.floor(Math.random() * 110000)
          )}`,
          headers: {
            uit: token,
          },
          data: formData,
        })
          .then(function (response) {
            if (response.data.code === 1) {
              const myConfig2 = {
                headers: {
                  uit: token,
                },
                responseType: "blob",
              };
              axios
                .get(
                  `${baseUrl}/report/viewReport?id=${response.data.id}`,
                  myConfig2
                )
                .then((res2) => {
                  window.URL = window.URL || window.webkitURL;
                  var url = window.URL.createObjectURL(res2.data);
                  var a = document.createElement("a");
                  document.body.appendChild(a);
                  a.style = "display: none";
                  a.href = url;
                  console.log(res2);
                  a.download = "report.xlsx";
                  a.target = "_blank";
                  a.click();
                });
              Swal.fire({
                title: "success",
                html: "Report generated successfully",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "error",
                html: "Something went wrong , please try again",
                icon: "error",
              });
            }
          })
          .catch((error) => {});
      } else {
        Swal.fire({
          title: "error",
          html: "Please select atleast one field in payment section",
          icon: "error",
        });
      }
    } else if (
      basic_info === false &&
      proposal_info === false &&
      assignment_info === false &&
      payment_info === false &&
      manual_payment_info === false
    ) {
      Swal.fire({
        title: "error",
        html: "Please select atleast one field",
        icon: "error",
      });
    } else {
      let formData = new FormData();
      formData.append("amount_receipt", Number(value.amount_receipt));
      formData.append("report_name", value.report_name);
      formData.append("basic_info", Number(basic_info));
      formData.append("proposal_info", Number(proposal_info));
      formData.append("assignment_info", Number(assignment_info));
      formData.append("payment_info", Number(payment_info));
      formData.append("manual_payment_info", Number(manual_payment_info));
      formData.append("from", value.p_from);
      formData.append("to", value.p_to);
      formData.append("customer_name", cname);
      formData.append("teamleader", teamleader44);
      formData.append("taxprofessional", taxprofessional44);
      formData.append("query_no", qqno);
      formData.append("category", mcatname);
      formData.append("subCategory", dd);
      formData.append("q_no", Number(value.qno));
      formData.append("date_query", Number(value.dataQuery));
      formData.append("cust_id", Number(value.cust_id));
      formData.append("basic_category", Number(value.basicCategory));
      formData.append("basic_sub_category", Number(value.basic_sub_category));
      formData.append("assessment", Number(value.assessment));
      formData.append("purpose", Number(value.purpose_p));
      formData.append("p_format", Number(value.p_format));
      formData.append("t_requested", Number(value.t_requested));
      formData.append("spc_que", Number(value.spc_que));
      formData.append("date_allocation", Number(value.doa));
      formData.append("brief_fact_case", Number(value.brief_fact_case));
      // formData.append("teamleader", Number(value.tl_name));
      // formData.append("taxprofessional", Number(value.tp_name));
      formData.append("date_proposal", Number(value.dateProposal));
      formData.append("proposed_amount", Number(value.proposedAmount));
      formData.append("payment_terms", Number(value.paymentTerms));
      formData.append("proposal_status", Number(value.proposal_status));
      formData.append("accepted_amount", Number(value.acceptedAmount));
      formData.append(
        "payment_declined_reasen",
        Number(value.paymentDeclinedReason)
      );
      formData.append("date_of_acceptance", Number(value.date_acceptance));
      // formData.append("amount_received", value.amountReceived);
      formData.append("amount_outstanding", Number(value.amountOutstanding));
      formData.append("amount_overdue", Number(value.amount_overdue));
      formData.append("payment_declined", Number(value.declinedDate));
      // formData.append("assignment_number", Number(value.assignNumber));
      formData.append("assign_date", Number(value.assignDate));
      formData.append("proposed_completion_date", Number(value.completionDate));
      formData.append("assignment_status", Number(value.assignStatus));
      formData.append("date_complation", Number(value.completionQuery));
      formData.append("assign_time", Number(value.assignTime));
      formData.append("payment_recived_date", Number(value.receiptDate));
      formData.append("basic_amount", Number(value.basic_amount));
      formData.append("pocket_expensive", Number(value.pocket_expensive));
      formData.append("cget_tax", Number(value.cget_tax));
      formData.append("igst_tax", Number(value.igst_tax));
      formData.append("sgst_tax", Number(value.sgst_tax));
      formData.append("invoice_amount", Number(value.total_invoice));
      formData.append("total_gst", Number(value.total_gst));
      formData.append("process_status", Number(value.process_status));
      formData.append("tds", Number(value.tds));

      formData.append("amount_received", Number(value.amountReceived));
      formData.append("uid", JSON.parse(userid));
      formData.append("t", Math.floor(Math.random() * 110000));
      formData.append("amount_type", Number(value.amount_type));
      formData.append("dos", Number(value.dos));
      formData.append("invoice_number", Number(value.invoice_number));
      formData.append("search_online", Number(value.search_online));
      formData.append("invoicing_company", Number(value.companyName));
      formData.append("company", comp);
      formData.append("search_online", Number(value.search_online));
      formData.append("mpayable_amount", Number(value.mpayable_amount));
      formData.append("mamount_creditedt", Number(value.mamount_credited));
      formData.append("maccount_number", Number(value.maccount_number));
      formData.append(
        "mpayment_receipt_date",
        Number(value.mpayment_receipt_date)
      );
      formData.append("mpayment_type", Number(value.mpayment_type));
      formData.append("search_manual", Number(value.search_manual));
      formData.append("mpayment_info", Number(value.mpayment_info));
      formData.append("other_info", Number(value.other_info));
      formData.append("how_paid", Number(value.how_paid));
      formData.append("issue_invoice", Number(value.issue_invoice));
      axios({
        method: "POST",

        url: `${baseUrl}/report/generateReport?t=${JSON.stringify(
          Math.floor(Math.random() * 110000)
        )}`,
        headers: {
          uit: token,
        },
        data: formData,
      })
        .then(function (response) {
          if (response.data.code === 1) {
            const myConfig2 = {
              headers: {
                uit: token,
              },
              responseType: "blob",
            };
            axios
              .get(
                `${baseUrl}/report/viewReport?id=${response.data.id}`,
                myConfig2
              )
              .then((res2) => {
                window.URL = window.URL || window.webkitURL;
                var url = window.URL.createObjectURL(res2.data);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.href = url;
                console.log(res2);
                a.download = "report.xlsx";
                a.target = "_blank";
                a.click();
              });
          }
          if (response.data.code === 1) {
            Swal.fire({
              title: "success",
              html: "Report generated successfully",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "error",
              html: "Something went wrong , please try again",
              icon: "error",
            });
          }
        })
        .catch((error) => {});
    }
  };

  // Category
  const category2 = (v) => {
    let cc = [];
    setCategoryData(v);
    setNn((oldData) => {
      return [...oldData, mcategory];
    });
    setError("");
    setCustcate(v);
    v.map((val) => {
      vv.push(val.value);
      cc.push(val.value);
      setmcategory(val.value);

      setStore(val.value);
    });

    setmcatname(cc);
    if (vv.length > 0) {
      if (vv.includes("1") && vv.includes("2")) {
      } else if (vv.includes("1")) {
        for (let i = 0; i < subData.length; i++) {
          if (subData[i].value < 9) {
            kk.push(subData[i]);
          }
        }
        subCategeryData(kk);
      } else if (vv.includes("2")) {
        for (let i = 0; i < subData.length; i++) {
          if (subData[i].value > 8) {
            kk.push(subData[i]);
          }
        }
        subCategeryData(kk);
      }
    } else if (vv.length === 0) {
      subCategeryData("");
    }
  };

  // Sub Category Function
  const subCategory22 = (e) => {
    let kk = [];
    subCategeryData(e);
    setCustcate2(e);
    setError2("");

    e.map((i) => {
      kk.push(i.value);
    });
    setDd(kk);
  };

  const taxProfessional = (e) => {
    let kk2 = [];
    e.map((i) => {
      kk2.push(i.value);
      setTaxxId(i.value);
    });
    setTaxprofessional44(kk2);
  };
  const queryNumber = (e) => {
    let kk4 = [];
    e.map((i) => {
      kk4.push(i.value);
    });
    setQqno(kk4);
  };
  const selectAllManualPayment = (e) => {
    let kd = manualReceipt;
    Object.keys(kd).forEach((key) => {
      kd[key] = e.target.checked;
    });

    setManualReceipt({
      ...manualReceipt,
      kd,
    });
    setManualCheckbox(e.target.checked);
  };
  const selectAllbasic = (e) => {
    let kd = basicValue;
    Object.keys(kd).forEach((key) => {
      kd[key] = e.target.checked;
    });

    setBasicValue({
      ...basicValue,
      kd,
    });
    setCheckBox(e.target.checked);
  };
  const selectAllproposal = (e) => {
    let kd = proposalValue;
    Object.keys(kd).forEach((key) => {
      kd[key] = e.target.checked;
    });

    setProposalValue({
      ...proposalValue,
      kd,
    });
    setProposalCheckbox(e.target.checked);
  };
  const selectAllAssignment = (e) => {
    let kd = assignmeneValue;
    Object.keys(kd).forEach((key) => {
      kd[key] = e.target.checked;
    });

    setAssignmentValue({
      ...assignmeneValue,
      kd,
    });
    setAssignmentCheckbox(e.target.checked);
  };
  const selectAllPayment = (e) => {
    let kd = paymentValue;
    Object.keys(kd).forEach((key) => {
      kd[key] = e.target.checked;
    });

    setPaymentValue({
      ...paymentValue,
      kd,
    });
    setPaymentCheckbox(e.target.checked);
  };
  const handleAssignment = (e) => {
    const { name, checked } = e.target;
    setAssignmentValue({
      ...assignmeneValue,
      [name]: checked,
    });
    if (e.target.checked === false) {
      setAssignmentCheckbox(false);
    }
  };
  const handleProposal = (e) => {
    const { name, checked } = e.target;
    setProposalValue({
      ...proposalValue,
      [name]: checked,
    });
    if (e.target.checked === false) {
      setProposalCheckbox(false);
    }
  };

  const handleBasic = (e) => {
    const { name, checked } = e.target;
    setBasicValue({
      ...basicValue,
      [name]: checked,
    });
    if (e.target.checked === false) {
      setCheckBox(false);
    }
  };
  const handleManualPayment = (e) => {
    const { name, checked } = e.target;
    setManualReceipt({
      ...manualReceipt,
      [name]: checked,
    });
    if (e.target.checked === false) {
      setManualCheckbox(false);
    }
  };
  const handlePayment = (e) => {
    const { name, checked } = e.target;
    setPaymentValue({
      ...paymentValue,
      [name]: checked,
    });
    if (e.target.checked === false) {
      setPaymentCheckbox(false);
    }
  };
  return (
    <>
      <Layout TLDashboard="TLDashboard" TLuserId={userid}>
        <div className="adminForm">
          <Row>
            <Col md="4">
              <button class="autoWidthBtn" onClick={() => history.goBack()}>
                Go Back
              </button>
            </Col>
            <Col md="4">
              <h4>Report</h4>
            </Col>
            <Col md="4">
              <label className="form-label">Report Name</label>
              <input
                type="text"
                name="report_name"
                className={classNames("form-control", {
                  "is-invalid": errors.report_name,
                })}
                defaultValue="report"
                placeholder="Enter report name"
                ref={register({ required: true })}
              />
            </Col>
          </Row>
          <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
            <div className="row">
              <div className="col-md-3">
                <div className="mb-3">
                  <label className="form-label">From</label>
                  <input
                    type="date"
                    name="p_from"
                    ref={register}
                    placeholder="Enter Mobile Number"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_mobile,
                    })}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="mb-3">
                  <label className="form-label">To</label>
                  <input
                    type="date"
                    name="p_to"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_type,
                    })}
                    defaultValue={item}
                    max={item}
                    placeholder="Enter type"
                    ref={register({ required: true })}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label className="form-label">Teamleader</label>
                  <Select
                    isDisabled={true}
                    ref={selectInputRef}
                    value={options3[0]}
                    options={options3}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="mb-3">
                  <label className="form-label">Tax Professional</label>
                  <Select
                    isMulti={true}
                    ref={selectInputRef2}
                    options={options4}
                    onChange={(e) => taxProfessional(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">Category</label>
                <Select
                  isMulti
                  options={options}
                  className={error ? "customError" : ""}
                  ref={selectInputRef3}
                  styles={{
                    option: (styles, { data }) => {
                      return {
                        ...styles,
                        color: data.value == 2 ? "green" : "blue",
                      };
                    },
                    multiValueLabel: (styles, { data }) => ({
                      ...styles,
                      color: data.value == 2 ? "green" : "blue",
                    }),
                  }}
                  onChange={category2}
                ></Select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Sub Category</label>
                <Select
                  isMulti
                  options={options2}
                  className={error2 ? "customError" : ""}
                  ref={selectInputRef4}
                  onChange={subCategory22}
                  styles={{
                    option: (styles, { data }) => {
                      return {
                        ...styles,
                        color: data.value > 8 ? "green" : "blue",
                      };
                    },
                    multiValueLabel: (styles, { data }) => ({
                      ...styles,
                      color: data.value > 8 ? "green" : "blue",
                    }),
                  }}
                  value={subData}
                ></Select>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label className="form-label">Client Id</label>
                  <Select
                    isMulti
                    options={custData}
                    ref={selectInputRef5}
                    onChange={(e) => custName(e)}
                  ></Select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <label className="form-label">Query Number</label>
                  <Select
                    isMulti={true}
                    ref={selectInputRef6}
                    options={qno}
                    onChange={(e) => queryNumber(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <fieldset className="my-fieldset">
                  <legend className="login-legend">Basic query details</legend>
                  <div className="basicFeild">
                    <span>
                      <input
                        type="checkbox"
                        onClick={(i) => selectAllbasic(i)}
                        value={checkBox}
                        name="select_all"
                        className="selectall"
                        id="select_all"
                        ref={register}
                      ></input>
                      <label htmlFor="select_all">Select all</label>
                    </span>
                  </div>
                  <div className="basicFeild">
                    <span>
                      <input
                        type="checkbox"
                        name="sno"
                        id="sno"
                        ref={register}
                        checked
                        disabled
                      ></input>
                      <label htmlFor="sno">S.no</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        name="qno"
                        ref={register}
                        id="qno"
                        checked
                        disabled
                      ></input>
                      <label htmlFor="qno">Query no</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="dataQuery"
                        id="dataQuery"
                        checked
                        disabled
                      ></input>
                      <label htmlFor="dataQuery">Query date </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="cust_id"
                        id="cust_id"
                        checked
                        disabled
                      ></input>
                      <label htmlFor="cust_id">Client id</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="basicCategory"
                        id="basicCategory"
                        checked
                        disabled
                      ></input>
                      <label htmlFor="basicCategory">Category</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="basic_sub_category"
                        id="basic_sub_category"
                        checked
                        disabled
                      ></input>
                      <label htmlFor="basic_sub_category">Sub category</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="tl_name"
                        id="tl_name"
                        checked
                        disabled
                      ></input>
                      <label htmlFor="tl_name">Name of team leader</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="tp_name"
                        id="tp_name"
                        checked
                        disabled
                      ></input>
                      <label htmlFor="tp_name">Name of tax professional</label>
                    </span>

                    <span>
                      <input
                        type="checkbox"
                        name="assessment"
                        ref={register}
                        onClick={(e) => handleBasic(e)}
                        checked={basicValue.assessment}
                        id="assessment"
                      ></input>
                      <label htmlFor="assessment">Assessment year(s)</label>
                    </span>

                    <span>
                      <input
                        type="checkbox"
                        name="brief_fact_case"
                        ref={register}
                        onClick={(e) => handleBasic(e)}
                        checked={basicValue.brief_fact_case}
                        id="brief_fact_case"
                      ></input>
                      <label htmlFor="brief_fact_case">Name of the case</label>
                    </span>

                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="purpose_p"
                        onClick={(e) => handleBasic(e)}
                        checked={basicValue.purpose_p}
                        id="purpose_p"
                      ></input>
                      <label htmlFor="purpose_p">
                        Purpose for Which opinion is sought
                      </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="p_format"
                        onClick={(e) => handleBasic(e)}
                        checked={basicValue.p_format}
                        id="p_format"
                      ></input>
                      <label htmlFor="p_format">
                        Format in which opinion is required
                      </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="t_requested"
                        onClick={(e) => handleBasic(e)}
                        checked={basicValue.t_requested}
                        id="t_requested"
                      ></input>
                      <label htmlFor="t_requested">Timeline requested</label>
                    </span>
                    <span>
                      {" "}
                      <input
                        type="checkbox"
                        ref={register}
                        name="spc_que"
                        onClick={(e) => handleBasic(e)}
                        checked={basicValue.spc_que}
                        id="spc_que"
                      ></input>
                      <label htmlFor="spc_que">Specific questions</label>
                    </span>
                    <span>
                      {" "}
                      <input
                        type="checkbox"
                        ref={register}
                        name="doa"
                        onClick={(e) => handleBasic(e)}
                        checked={basicValue.doa}
                        id="doa"
                      ></input>
                      <label htmlFor="doa">Date of allocation of query</label>
                    </span>
                    <span>
                      {" "}
                      <input
                        type="checkbox"
                        ref={register}
                        onClick={(e) => handleBasic(e)}
                        checked={basicValue.process_status}
                        name="process_status"
                        id="process_status"
                      ></input>
                      <label htmlFor="process_status">Process status</label>
                    </span>
                  </div>
                </fieldset>
              </div>
            </div>

            {/* Proposal */}
            <div className="row">
              <div className="col-md-12">
                <fieldset className="my-fieldset">
                  <legend className="login-legend">Proposal</legend>
                  <div className="basicFeild">
                    <span>
                      <input
                        type="checkbox"
                        onClick={(i) => selectAllproposal(i)}
                        checked={proposalCheckbox}
                        name="selectallProposal"
                        className="selectall"
                        id="selectallProposal"
                        ref={register}
                      ></input>
                      <label htmlFor="selectallProposal">Select all</label>
                    </span>
                  </div>
                  <div className="basicFeild">
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="dateProposal"
                        onClick={(e) => handleProposal(e)}
                        checked={proposalValue.dateProposal}
                        id="dateProposal"
                      ></input>
                      <label htmlFor="dateProposal">Date of proposal</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="proposedAmount"
                        onClick={(e) => handleProposal(e)}
                        checked={proposalValue.proposedAmount}
                        id="proposedAmount"
                      ></input>
                      <label htmlFor="proposedAmount">Proposed amount</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="paymentTerms"
                        onClick={(e) => handleProposal(e)}
                        checked={proposalValue.paymentTerms}
                        id="paymentTerms"
                      ></input>
                      <label htmlFor="paymentTerms">Payment plan</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="proposal_status"
                        onClick={(e) => handleProposal(e)}
                        checked={proposalValue.proposal_status}
                        id="proposal_status"
                      ></input>
                      <label htmlFor="proposal_status">Proposal status</label>
                    </span>
                    <span>
                      {" "}
                      <input
                        type="checkbox"
                        ref={register}
                        onClick={(e) => handleProposal(e)}
                        checked={proposalValue.acceptedAmount}
                        name="acceptedAmount"
                        id="acceptedAmount"
                      ></input>
                      <label htmlFor="acceptedAmount">Accepted amount </label>
                    </span>

                    <span>
                      {" "}
                      <input
                        type="checkbox"
                        ref={register}
                        name="date_acceptance"
                        onClick={(e) => handleProposal(e)}
                        checked={proposalValue.date_acceptance}
                        id="date_acceptance"
                      ></input>
                      <label htmlFor="date_acceptance">
                        Date of acceptance / Decline
                      </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        onClick={(e) => handleProposal(e)}
                        checked={proposalValue.amount_receipt}
                        name="amount_receipt"
                        id="amount_receipt"
                      ></input>
                      <label htmlFor="amount_receipt">
                        Total amount received
                      </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="amountOutstanding"
                        onClick={(e) => handleProposal(e)}
                        checked={proposalValue.amountOutstanding}
                        id="amountOutstanding"
                      ></input>
                      <label htmlFor="amountOutstanding">
                        Total amount outstanding
                      </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="amount_overdue"
                        onClick={(e) => handleProposal(e)}
                        checked={proposalValue.amount_overdue}
                        id="amount_overdue"
                      ></input>
                      <label htmlFor="amount_overdue">
                        Total amount overdue
                      </label>
                    </span>
                    <span>
                      {" "}
                      <input
                        type="checkbox"
                        ref={register}
                        name="declinedDate"
                        onClick={(e) => handleProposal(e)}
                        checked={proposalValue.declinedDate}
                        id="declinedDate"
                      ></input>
                      <label htmlFor="declinedDate">Payment decline date</label>
                    </span>
                    <span>
                      {" "}
                      <input
                        type="checkbox"
                        ref={register}
                        name="paymentDeclinedReason"
                        onClick={(e) => handleProposal(e)}
                        checked={proposalValue.paymentDeclinedReason}
                        id="paymentDeclinedReason"
                      ></input>
                      <label htmlFor="paymentDeclinedReason">
                        Payment decline reason{" "}
                      </label>
                    </span>

                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="issue_invoice"
                        onClick={(e) => handleProposal(e)}
                        checked={proposalValue.issue_invoice}
                        id="issue_invoice"
                      ></input>
                      <label htmlFor="issue_invoice">Issue to invoice </label>
                    </span>
                  </div>
                </fieldset>
              </div>
            </div>

            {/* Assignment */}
            <div className="row">
              <div className="col-md-12">
                <fieldset className="my-fieldset">
                  <legend className="login-legend">Assignment</legend>
                  <div className="basicFeild">
                    <span>
                      <input
                        type="checkbox"
                        onClick={(i) => selectAllAssignment(i)}
                        checked={assignmentCheckbox}
                        name="selectAllAssignment"
                        className="selectall"
                        id="selectAllAssignment"
                        ref={register}
                      ></input>
                      <label htmlFor="selectAllAssignment">Select all</label>
                    </span>
                  </div>
                  <div className="basicFeild">
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={assignmeneValue.assignDate}
                        onClick={(e) => handleAssignment(e)}
                        name="assignDate"
                        id="assignDate"
                      ></input>
                      <label htmlFor="assignDate">Assignment date</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={assignmeneValue.completionDate}
                        onClick={(e) => handleAssignment(e)}
                        name="completionDate"
                        id="completionDate"
                      ></input>
                      <label htmlFor="completionDate">
                        {" "}
                        Expected date of delivery
                      </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={assignmeneValue.assignStatus}
                        onClick={(e) => handleAssignment(e)}
                        name="assignStatus"
                        id="assignStatus"
                      ></input>
                      <label htmlFor="assignStatus">Assignment status</label>
                    </span>

                    <span>
                      {" "}
                      <input
                        type="checkbox"
                        ref={register}
                        checked={assignmeneValue.completionQuery}
                        onClick={(e) => handleAssignment(e)}
                        name="completionQuery"
                        id="completionQuery"
                      ></input>
                      <label htmlFor="completionQuery">
                        Date of completion of query{" "}
                      </label>
                    </span>
                    <span>
                      {" "}
                      <input
                        type="checkbox"
                        ref={register}
                        checked={assignmeneValue.assignTime}
                        onClick={(e) => handleAssignment(e)}
                        name="assignTime"
                        id="assignTime"
                      ></input>
                      <label htmlFor="assignTime">
                        Time taken to complete the assignment
                      </label>
                    </span>
                  </div>
                </fieldset>
              </div>
            </div>
            {/* Payment Receipt */}
            <div className="row">
              <div className="col-md-12">
                <fieldset className="my-fieldset">
                  <legend className="login-legend">Payment receipt</legend>

                  <div className="row">
                    <div className="col-md-2">
                      <span>
                        <input
                          style={{ margin: "0px 10px" }}
                          type="checkbox"
                          onClick={(i) => selectAllPayment(i)}
                          checked={paymnetCheckbox}
                          name="selectAllPayment"
                          className="selectall"
                          id="selectAllPayment"
                          ref={register}
                        ></input>
                        <label htmlFor="selectAllPayment">Select all</label>
                      </span>
                    </div>
                    <div className="col-md-3">
                      <span>
                        <Select
                          isMulti={true}
                          ref={selectInputRef6}
                          options={companyName}
                          value={companyName2}
                          placeholder="Select Company"
                          onChange={(e) => setCompanyName2(e)}
                        />
                      </span>
                    </div>
                    <div className="col-md-2">
                      <span>
                        <input
                          style={{ margin: "0px 10px" }}
                          type="checkbox"
                          ref={register}
                          name="search_online"
                          id="search_online"
                        ></input>
                        <label htmlFor="search_online">Online Payment</label>
                      </span>
                    </div>
                    <div className="col-md-2">
                      <span>
                        <input
                          style={{ margin: "0px 10px" }}
                          type="checkbox"
                          ref={register}
                          name="search_manual"
                          checked={manualSearch}
                          onClick={(e) => {
                            setManualSearch(!manualSearch);
                            if (e.target.checked === false) {
                              selectAllManualPayment(e);
                            }
                          }}
                          id="search_manual"
                        ></input>
                        <label htmlFor="search_manual">Manual credit</label>
                      </span>
                    </div>
                  </div>
                  <div className="basicFeild">
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="companyName"
                        onClick={(e) => handlePayment(e)}
                        id="companyName"
                        checked={paymentValue.companyName}
                      ></input>
                      <label htmlFor="companyName">Invoicing company</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={paymentValue.invoice_number}
                        onClick={(e) => handlePayment(e)}
                        name="invoice_number"
                        id="invoice_number"
                      ></input>
                      <label htmlFor="invoice_number">Invoice number</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={paymentValue.dos}
                        onClick={(e) => handlePayment(e)}
                        name="dos"
                        id="dos"
                      ></input>
                      <label htmlFor="dos">Description of services</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={paymentValue.basic_amount}
                        onClick={(e) => handlePayment(e)}
                        name="basic_amount"
                        id="basic_amount"
                      ></input>
                      <label htmlFor="basic_amount">Basic amount</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={paymentValue.pocket_expensive}
                        onClick={(e) => handlePayment(e)}
                        name="pocket_expensive"
                        id="pocket_expensive"
                      ></input>
                      <label htmlFor="pocket_expensive">
                        Out of pocket expenses
                      </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={paymentValue.cget_tax}
                        onClick={(e) => handlePayment(e)}
                        name="cget_tax"
                        id="cget_tax"
                      ></input>
                      <label htmlFor="cget_tax">CGST tax</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={paymentValue.igst_tax}
                        onClick={(e) => handlePayment(e)}
                        name="igst_tax"
                        id="igst_tax"
                      ></input>
                      <label htmlFor="igst_tax">IGST tax </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={paymentValue.sgst_tax}
                        onClick={(e) => handlePayment(e)}
                        name="sgst_tax"
                        id="sgst_tax"
                      ></input>
                      <label htmlFor="sgst_tax">SGST tax</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={paymentValue.total_gst}
                        onClick={(e) => handlePayment(e)}
                        name="total_gst"
                        id="total_gst"
                      ></input>
                      <label htmlFor="total_gst">Total GST </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={paymentValue.total_invoice}
                        onClick={(e) => handlePayment(e)}
                        name="total_invoice"
                        id="total_invoice"
                      ></input>
                      <label htmlFor="total_invoice">Invoice amount </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={paymentValue.tds}
                        onClick={(e) => handlePayment(e)}
                        name="tds"
                        id="tds"
                      ></input>
                      <label htmlFor="tds">TDS deducted</label>
                    </span>

                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={paymentValue.receiptDate}
                        onClick={(e) => handlePayment(e)}
                        name="receiptDate"
                        id="receiptDate"
                      ></input>
                      <label htmlFor="receiptDate">Date of receipt</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={paymentValue.amountReceived}
                        onClick={(e) => handlePayment(e)}
                        name="amountReceived"
                        id="amountReceived"
                      ></input>
                      <label htmlFor="amountReceived">Amount received</label>
                    </span>

                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        checked={paymentValue.amount_type}
                        onClick={(e) => handlePayment(e)}
                        name="amount_type"
                        id="amount_type"
                      ></input>
                      <label htmlFor="amount_type">Payment mode </label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        ref={register}
                        name="how_paid"
                        id="how_paid"
                        checked={paymentValue.how_paid}
                        onClick={(e) => handlePayment(e)}
                      ></input>
                      <label htmlFor="how_paid">How paid</label>
                    </span>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <fieldset className="my-fieldset">
                        <legend className="login-legend">Manual credit</legend>
                        <div className="basicFeild">
                          <span>
                            <input
                              type="checkbox"
                              onClick={(i) => selectAllManualPayment(i)}
                              checked={manualCheckbox}
                              disabled={!manualSearch}
                              name="selectAllManualPayment"
                              className="selectall"
                              id="selectAllManualPayment"
                              ref={register}
                            ></input>
                            <label htmlFor="selectAllManualPayment">
                              Select all
                            </label>
                          </span>
                        </div>
                        <div className="basicFeild">
                          <span>
                            <input
                              type="checkbox"
                              ref={register}
                              name="mpayable_amount"
                              id="mpayable_amount"
                              disabled={!manualSearch}
                              checked={manualReceipt.mpayable_amount}
                              onClick={(e) => handleManualPayment(e)}
                            ></input>
                            <label htmlFor="mpayable_amount">
                              Payable amount
                            </label>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              ref={register}
                              name="mamount_credited"
                              disabled={!manualSearch}
                              id="mamount_credited"
                              checked={manualReceipt.mamount_credited}
                              onClick={(e) => handleManualPayment(e)}
                            ></input>
                            <label htmlFor="mamount_credited">
                              Amount credited
                            </label>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              ref={register}
                              disabled={!manualSearch}
                              name="maccount_number"
                              id="maccount_number"
                              checked={manualReceipt.maccount_number}
                              onClick={(e) => handleManualPayment(e)}
                            ></input>
                            <label htmlFor="maccount_number">
                              Paid in bank account number
                            </label>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              ref={register}
                              disabled={!manualSearch}
                              name="mpayment_receipt_date"
                              id="mpayment_receipt_date"
                              checked={manualReceipt.mpayment_receipt_date}
                              onClick={(e) => handleManualPayment(e)}
                            ></input>
                            <label htmlFor="mpayment_receipt_date">
                              Payment receipt date
                            </label>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              disabled={!manualSearch}
                              ref={register}
                              name="mpayment_type"
                              id="mpayment_type"
                              checked={manualReceipt.mpayment_type}
                              onClick={(e) => handleManualPayment(e)}
                            ></input>
                            <label htmlFor="mpayment_type">Payment type</label>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              disabled={!manualSearch}
                              ref={register}
                              name="mpayment_info"
                              id="mpayment_info"
                              checked={manualReceipt.mpayment_info}
                              onClick={(e) => handleManualPayment(e)}
                            ></input>
                            <label htmlFor="mpayment_info">
                              Payment information
                            </label>
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              ref={register}
                              name="other_info"
                              disabled={!manualSearch}
                              id="other_info"
                              checked={manualReceipt.other_info}
                              onClick={(e) => handleManualPayment(e)}
                            ></input>
                            <label htmlFor="other_info">
                              Other information
                            </label>
                          </span>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <button type="submit" class="autoWidthBtn my-3 mr-2">
              Generate Report
            </button>
            <button
              type="button"
              class="customBtn my-3"
              onClick={() => resetData()}
            >
              Reset
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};
export default EnquiryReport;
