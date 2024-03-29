import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";

import { useHistory, useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Payment from "./Payment";
import Select from "react-select";
import Alerts from "../../../common/Alerts";
import classNames from "classnames";
import Mandatory from "../../../components/Common/Mandatory";
import { Spinner } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function EditComponent(props) {
  const { register, handleSubmit, reset, errors } = useForm();
  const userid = window.localStorage.getItem("tpkey");
  const [loading, setLoading] = useState(false);

  const [custId, setCustId] = useState("");
  const [store, setStore] = useState("1");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [companyName, setCompanyName] = useState([]);
  const [clearValue, setClearValue] = useState(true);
  const [payment, setPayment] = useState([]);
  const [installment, setInstallment] = useState([]);
  const [value2, setValue2] = useState("");
  const [diserror, setdiserror] = useState("");
  const history = useHistory();
  const { id } = useParams();
  const [scopeError, setScopeError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [company2, setCompany2] = useState("");
  const [client, setClient] = useState([]);
  const [client2, setClient2] = useState([]);
  const [email, setEmail] = useState([]);
  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);
  const [item] = useState(current_date);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [dateMonth, setDateMonth] = useState("");
  const [fromMax, setFromMax] = useState(current_date);
  const [invoice, setInvice] = useState("");
  const [invoiceTl, setInvoicetl] = useState("");
  const [invoiceAdmin, setInvoiceAdmin] = useState("");
  const [tlDisable, setTlDisable] = useState(true);
  const [tpDisable, setTpDisable] = useState("");
  const [adminValue, setAdminValue] = useState(null);

  const [allAmount, setAllAmount] = useState({
    remainAmount: [],
    freezeAmount: [],
    completeAmount: [],
  });
  const [proposal, setProposal] = useState({
    query: "",
    name: "",
    fixed_amount: "",
    payable: "",
    description: "",
    installment_amount: "",
    due_date: "",
    payment: "",
  });
  const [subPlan, setSubplan] = useState("0");
  const [optionDisable, setOptionDisable] = useState(false);
  const [invoiceValue, setInviceValue] = useState({
    installment_number: "",
    due_dates: "",
    amount: "",
    invoiceAmount: 0,
    remainAmount: 0,
  });
  const [formInstallmentInfo, setFormInstallmentInfo] = useState({
    dueDate1: [],
    amount: [],
    boxDisable: [0],
  });
  const [invoiceAmount, setinvoiceAmount] = useState(0);
  const [noInstallments, setNoInstall] = useState([]);
  const [no_installmentRange, setno_installment] = useState([]);
  const [minDate, setminDate] = useState("");
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const {
    query,
    name,
    description,

    due_date,
  } = proposal;
  const getCompany = () => {
    axios.get(`${baseUrl}/tl/getcompany`, myConfig).then((res) => {
      setCompanyName(res.data.result);
    });
  };
  useEffect(() => {
    getCompany();
    getQuery();
  }, []);
  useEffect(() => {
    getClient();
  }, []);

  const getQuery = () => {
    let amount = [];
    let due_date = [];
    let installment_number = [];
    let invoiceAmount = 0;
    let email = {};
    var collectData = [];
    let dis = [];
    let mainAmount = [];
    let mainDueDate = [];
    var installmentAmount = 0;
    var actualInstallmentNumber = 0;
    let roundNum = 0;
    let actualInstallmentAmount = 0;
    let adjustAmount = 0;
    let il = 0;
    axios
      .get(`${baseUrl}/tl/getProposalDetail?id=${id}`, myConfig)
      .then((res) => {
        if (res.data.code === 1) {
          mainAmount = res.data.result.installment_amount.split(",");
          mainDueDate = res.data.result.due_date.split(",");

          let a = res.data.result.email.split(",");
          for (
            let i = 0;
            i < res.data.result.installment_amount.split(",").length;
            i++
          ) {
            dis.push(1);
          }

          setFormInstallmentInfo({
            dueDate1: res.data.result.due_date.split(","),
            amount: mainAmount,
            boxEnable: dis,
          });

          if (res.data.result.invoice) {
            res.data.result.invoice.map((i, e) => {
              dis[e] = 0;
              amount.push(i.basic_amount);

              due_date.push(i.due_date);
              installment_number.push(i.installment_no);
              invoiceAmount = invoiceAmount + Number(i.basic_amount);
            });

            setInviceValue({
              installment_number: installment_number,
              due_dates: due_date,
              amount: amount,
              invoiceAmount: invoiceAmount,
              // remainAmount : Number(res.data.result.amount) - Number(invoiceAmount)
            });

            due_date.map((i, e) => {
              mainDueDate[e] = i;
            });

            amount.map((i, e) => {
              mainAmount[e] = i;
            });

            installmentAmount =
              Number(res.data.result.amount) - Number(invoiceAmount);
            actualInstallmentNumber =
              Number(res.data.result.no_of_installment) -
              Number(installment_number.length);

            if (installmentAmount < 1 || actualInstallmentNumber < 1) {
              installmentAmount = 0;
            } else {
              // installmentAmount = installmentAmount / actualInstallmentNumber
              actualInstallmentAmount = parseInt(
                installmentAmount / actualInstallmentNumber
              );
              roundNum = actualInstallmentNumber * actualInstallmentAmount;
              adjustAmount = installmentAmount - roundNum;
            }

            dis.map((i, e) => {
              if (i === 1) {
                if (e === res.data.result.invoice.length) {
                  mainAmount[e] = actualInstallmentAmount + adjustAmount;
                } else {
                  mainAmount[e] = actualInstallmentAmount;
                }
              }
            });

            setFormInstallmentInfo({
              dueDate1: mainDueDate,
              amount: mainAmount,
              boxEnable: dis,
            });
          }
          il = installment_number.length;
          // for payment plan 2
          for (let i = il; i < 37; i++) {
            let install;

            if (i > 1) {
              install = {
                value: String(i),
                label: String(i),
              };
              setno_installment((oldData) => {
                return [...oldData, install];
              });
            }
          }
          // for payment plan 3
          for (let i = il; i < 5; i++) {
            let install;

            if (i > 1) {
              install = {
                value: String(i),
                label: String(i),
              };
              setNoInstall((oldData) => {
                return [...oldData, install];
              });
            }
          }

          if (res.data.result.email.length > 0) {
            a.map((i) => {
              email = {
                label: i,
                value: i,
              };
              collectData.push(email);
              setClient(collectData);
            });
          }

          if (res.data.result.admin_iba === "1") {
            setOptionDisable(true);

            setTpDisable(true);
          } else if (res.data.result.tl_iba === "1") {
            setTpDisable(true);
          } else {
            setTpDisable(false);
          }
          const arrDates = due_date.map((str) => new Date(str));

          if (arrDates.length > 0) {
            let rightNow = new Date(Math.max(...arrDates));
            let dk = [];
            let rr = rightNow.toISOString().slice(0, 10).replace(/-/g, "");
            let year = rr.slice(0, 4);
            let month = rr.slice(4, 6);
            let day = rr.slice(6, 8);
            day = Number(day) + 1;
            dk.push(year);
            dk.push(month);
            dk.push(day);

            setminDate(dk.join("-"));
          } else if (res.data.result.payment_plan === "3") {
            setEndDate(res.data.result.start_date);
            setminDate(res.data.result.start_date);
          } else if (res.data.result.payment_plan === "2") {
            setEndDate(current_date);
            setminDate(current_date);
          }
          setTotalAmount(res.data.result.amount);
          setDateMonth(res.data.result.date_month);
          setSubplan(res.data.result.sub_payment_plane);
          setCompany2(res.data.result.company);
          setEmail(res.data.result.email);
          setValue2(res.data.result.description);
          setStore(res.data.result.payment_plan);
          setInstallment(res.data.result.no_of_installment);
          setDateMonth(res.data.result.due_date);
          setStartDate(res.data.result.start_date);
          setEndDate(res.data.result.end_date);
          setDate(res.data.result.due_date);
          setInvice(res.data.result.tp_iba);
          setInvoicetl(res.data.result.tl_iba);
          setAdminValue(res.data.result.admin_iba);
          setinvoiceAmount(invoiceAmount);
          setProposal({
            name: res.data.result.name,
            query: res.data.result.assign_no,
            fixed_amount: res.data.result.amount,
            description: res.data.result.description,
            installment_amount: res.data.result.installment_amount,
            due_date: res.data.result.due_date,
            payment: res.data.result.installment_amount,
          });
          var payment_terms = res.data.result.payment_terms;
          var no_of_installment = res.data.result.no_of_installment;

          const data1 = {
            label: payment_terms,
            value: payment_terms,
          };

          const data2 = {
            label: no_of_installment,
            value: no_of_installment,
          };

          setPayment(data1);
          setInstallment(data2);
          setAmount(res.data.result.installment_amount.split(","));
          //   setAllAmount({
          //   remainAmount : res.data.result.installment_amount.split(","),
          //   freezeAmount : amount,
          //   completeAmount : res.data.result.installment_amount
          // })
        }
      });
  };

  const getClient = () => {
    let collectData = [];
    axios
      .get(`${baseUrl}/tl/querycustomers?query_id=${id}`, myConfig)
      .then((res) => {
        let email = {};

        res.data.result.map((i) => {
          email = {
            label: i.email,
            value: i.email,
          };
          collectData.push(email);
        });

        setClient2(collectData);
      });
  };

  const onSubmit = (value) => {
    if (value2) {
      if (diserror && diserror.length > 0) {
        return false;
      } else if (dateError === true) {
        Alerts.ErrorNormal("Date must be unique");
      } else if (value2 && value2.length == 0) {
        setScopeError(true);
      } else {
        var lumsum = value.p_inst_date;
        if (store === "1") {
          setDate(lumsum);
        }

        let formData = new FormData();
        formData.append("emails", email);
        formData.append("assign_no", query);
        formData.append("name", name);
        formData.append("type", "tp");
        formData.append("id", JSON.parse(userid));
        formData.append("assign_id", id);

        formData.append("description", value2);
        formData.append("amount_type", "fixed");
        formData.append("amount", totalAmount);
        formData.append("installment_amount", formInstallmentInfo.amount);
        formData.append("company", company2);
        formData.append("payment_plan", store);
        formData.append("start_date", startDate);
        formData.append("end_date", endDate);
        formData.append("no_of_installment", installment.value);
        formData.append("date_month", dateMonth);
        formData.append("tl_iba", invoiceTl);
        formData.append("tp_iba", invoice);
        formData.append("admin_iba", invoiceAdmin);
        formData.append("sub_payment_plane", subPlan);
        store === "1"
          ? formData.append("due_date", lumsum)
          : store === "2" || store === "3"
          ? formData.append("due_date", formInstallmentInfo.dueDate1)
          : formData.append("due_date", "");

        if (
          (subPlan !== "2" && store === "2") ||
          (subPlan !== "2" && store === "3")
        ) {
          if (payment.length < 1) {
          } else if (store === "2" || store === "3") {
            if (installment == "") {
              Alerts.ErrorNormal(`Please select no of installment .`);
            } else if (!formInstallmentInfo.amount || !date) {
              Alerts.ErrorNormal(`Please enter all fields.`);
            } else if (formInstallmentInfo.amount && date) {
              if (installment.value > 0) {
                var a = Number(installment.value);

                for (let i = 0; i < a; i++) {
                  if (
                    formInstallmentInfo.amount[i] == "" ||
                    formInstallmentInfo.amount[i] == undefined ||
                    formInstallmentInfo.amount[i] <= 0
                  ) {
                    if (formInstallmentInfo.amount.length < 0) {
                      Alerts.ErrorNormal(`Please enter amount`);
                      return false;
                    }
                  }
                  // if (!date) {
                  //   Alerts.ErrorNormal(`Please enter date`)
                  //   return false
                  // }
                }
                var sum = 0;

                if (formInstallmentInfo.amount.length > 0) {
                  sum = formInstallmentInfo.amount.reduce(myFunction);
                } else {
                  sum = formInstallmentInfo.amount.reduce(myFunction);
                }
                function myFunction(total, value) {
                  return Number(total) + Number(value);
                }
                if (value.p_fixed != sum) {
                  Alerts.ErrorNormal(
                    `Sum of all installments should be equal to ${value.p_fixed}.`
                  );
                } else {
                  setLoading(true);
                  axios({
                    method: "POST",
                    url: `${baseUrl}/tp/updateProposal`,
                    headers: {
                      uit: token,
                    },
                    data: formData,
                  })
                    .then(function (response) {
                      if (response.data.code === 1) {
                        setLoading(false);
                        var variable = "Proposal updated successfully";
                        Alerts.SuccessNormal(variable);
                        history.push("/taxprofessional/proposal");
                      } else if (response.data.code === 0) {
                        setLoading(false);
                      }
                    })
                    .catch((error) => {});
                }
              }
            }
          }
        } else if (store === "1" || store === "4" || subPlan === "2") {
          setLoading(true);
          axios({
            method: "POST",
            url: `${baseUrl}/tp/updateProposal`,
            headers: {
              uit: token,
            },
            data: formData,
          })
            .then(function (response) {
              if (response.data.code === 1) {
                setLoading(false);
                var variable = "Proposal Updated Successfully ";
                Alerts.SuccessNormal(variable);
                history.push("/taxprofessional/proposal");
              } else if (response.data.code === 0) {
                setLoading(false);
              }
            })
            .catch((error) => {});
        }
      }
    } else {
      Swal.fire({
        title: "Error",
        html: "Please enter scope of work",
        icon: "error",
      });
    }
  };

  const handleChange = (e) => {
    if (isNaN(e.target.value)) {
      setTotalAmount("");
      setdiserror("Please enter number only");
    } else if (e.target.value == "0") {
      setTotalAmount(e.target.value);
      setdiserror("Amount should be greater than zero");
    } else {
      calculateAmount(e.target.value, installment.value);
      setTotalAmount(e.target.value);

      setdiserror("");
    }
  };

  const paymentAmount = (data) => {
    var array1 = [];
    Object.entries(data).map(([key, value]) => {
      array1[key] = value;
    });

    if (data.length !== undefined) {
      setFormInstallmentInfo({
        dueDate1: formInstallmentInfo.dueDate1,
        amount: array1,
        boxEnable: formInstallmentInfo.boxEnable,
      });
    }
  };

  const paymentDate = (data) => {
    var array1 = [];
    Object.entries(data).map(([key, value]) => {
      if (value) {
        array1[key] = value;
      }
    });

    if (new Set(array1).size !== array1.length) {
      setDateError(true);
      Alerts.ErrorNormal("Date must be unique");
    } else {
      setDateError(false);
    }
    if (data.length > 1) {
      setFormInstallmentInfo({
        dueDate1: array1,
        amount: formInstallmentInfo.amount,
        boxEnable: formInstallmentInfo.boxEnable,
      });
    }
  };
  const calculateAmount = (totalAmount, installment) => {
    let totalInstallAmount = totalAmount - invoiceAmount;
    let actualInstallmentNumber =
      installment - invoiceValue.installment_number.length;
    let installmentAmount = 0;
    let boxAmount = [];
    let boxDisable = [];
    let due_date = [];
    let roundNum = 0;
    let adjustAmount = 0;

    if (totalInstallAmount < 1 || actualInstallmentNumber < 1) {
      installmentAmount = 0;
    } else {
      installmentAmount = parseInt(
        totalInstallAmount / actualInstallmentNumber
      );
      roundNum = actualInstallmentNumber * installmentAmount;
      adjustAmount = totalInstallAmount - roundNum;
    }

    for (let i = 0; i < installment; i++) {
      if (i === invoiceValue.installment_number.length) {
        boxAmount.push(installmentAmount + adjustAmount);
      } else {
        boxAmount.push(installmentAmount);
      }
      boxDisable.push(1);
      due_date.push("");
    }
    for (let i = 0; i < invoiceValue.installment_number.length; i++) {
      boxDisable[i] = 0;
      boxAmount[i] = Number(invoiceValue.amount[i]);
      due_date[i] = invoiceValue.due_dates[i];
    }

    setFormInstallmentInfo({
      boxEnable: boxDisable,
      amount: boxAmount,
      dueDate1: due_date,
    });
  };

  const installmentHandler = (key) => {
    calculateAmount(totalAmount, key.value);
    setInstallment(key);
    setClearValue(false);
  };

  const clientFun = (e) => {
    setClient(e);
    let a = [];
    e.map((i) => {
      a.push(i.value);
    });

    setEmail(a);
  };
  const startFun = (e) => {
    setFromMax(e.target.value);
    setStartDate(e.target.value);
  };
  const endFun = (e) => {
    setEndDate(e.target.value);
  };
  const myMonthValue = (e) => {
    setDateMonth(e.target.value);
  };
  const getInviceValue = (e) => {
    setInvice(e.target.value);
  };
  const getInvoiceAdmin = (e) => {
    setInvoiceAdmin(e.target.value);
  };
  const getInvoicetl = (e) => {
    setInvoicetl(e.target.value);
  };
  const getSubPlan = (e) => {
    setDateError(false);

    setSubplan(e.target.value);
    if (e.target.value === "1") {
      let installment = {
        label: String(invoiceValue.amount.length),
        value: String(invoiceValue.amount.length),
      };
      installmentHandler(installment);
    }
  };

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="5">
              <Link
                to={{
                  pathname: `/taxprofessional/${props.location.routes}`,
                  index: props.location.index,
                }}
              >
                <button className="autoWidthBtn ml-3">Go Back</button>
              </Link>
            </Col>
            <Col md="7">
              <div className="btn ml-3">
                <h4>Edit proposal</h4>
              </div>
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: "flex" }}>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Query no.</label>
                  <input
                    type="text"
                    name="p_assingment"
                    className="form-control"
                    value={query}
                    ref={register}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <select
                    className="form-control"
                    ref={register}
                    disabled={optionDisable}
                    name="p_company"
                    value={company2}
                    onChange={(e) => setCompany2(e.target.value)}
                  >
                    {companyName.map((i) => (
                      <option value={i.company_prefix}>{i.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Payment plan </label>
                  <select
                    className="form-control"
                    ref={register}
                    disabled={optionDisable}
                    value={store}
                    name="p_type"
                    onChange={(e) => {
                      setInstallment([]);
                      setFromMax("");
                      setStartDate("");
                      setEndDate("");
                      setStore(e.target.value);
                      if (e.target.value === "3") {
                        setFromMax(current_date);
                      }
                    }}
                  >
                    <option value="1">Fixed amount-lumpsum payment</option>
                    <option value="2">Fixed amount-instalment plan</option>
                    <option value="3">
                      Retainership plan-specified period
                    </option>
                    <option value="4">
                      Retainership plan-unspecified period
                    </option>
                  </select>
                </div>
                {store === "1" ? (
                  <div className="myproposaloption">
                    <div className="form-group">
                      <label>
                        Whether invoice(s) can be issued before acceptance of
                        proposal by client
                      </label>
                      <div className="myInvice">
                        {invoice === "1" ? (
                          <label className="mr-3">
                            <input
                              type="radio"
                              defaultChecked
                              className="spaceRadio"
                              disabled
                              value="1"
                              name="yesclient"
                            />
                            Yes
                          </label>
                        ) : (
                          <label className="mr-3">
                            <input
                              type="radio"
                              className="spaceRadio"
                              disabled
                              value="1"
                              name="yesclient"
                            />
                            Yes
                          </label>
                        )}
                        {invoice === "0" ? (
                          <label className="mr-3">
                            <input
                              type="radio"
                              defaultChecked
                              disabled
                              value="0"
                              name="yesclient"
                            />
                            No
                          </label>
                        ) : (
                          <label className="mr-3">
                            <input
                              type="radio"
                              disabled
                              value="0"
                              name="yesclient"
                            />
                            No
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        Approval of Team Leader for such issue of invoice(s)
                      </label>

                      <div className="myInvice">
                        {invoiceTl === "1" ? (
                          <label className="mr-3">
                            <input
                              type="radio"
                              className="spaceRadio"
                              defaultChecked
                              disabled
                              value="1"
                              name="yestl"
                            />
                            Yes
                          </label>
                        ) : (
                          <label className="mr-3">
                            <input
                              className="spaceRadio"
                              type="radio"
                              disabled
                              value="1"
                              name="yestl"
                            />
                            Yes
                          </label>
                        )}
                        {invoiceTl === "0" ? (
                          <label className="mr-3">
                            <input
                              type="radio"
                              defaultChecked
                              disabled
                              className="spaceRadio"
                              value="0"
                              name="yestl"
                            />
                            No
                          </label>
                        ) : (
                          <label className="mr-3">
                            <input
                              type="radio"
                              className="spaceRadio"
                              disabled
                              value="0"
                              name="yestl"
                            />
                            No
                          </label>
                        )}
                      </div>
                    </div>

                    {adminValue === null ? (
                      <div className="form-group">
                        <label>
                          Approval of Admin for such issue of invoice(s)
                        </label>
                        <div
                          onChange={(e) => getInvoiceAdmin(e)}
                          className="myInvice"
                        >
                          <label className="mr-3">
                            <input
                              type="radio"
                              className="spaceRadio"
                              value="0"
                              disabled
                              name="yesadmin"
                            />
                            Yes
                          </label>
                          <label className="mr-3">
                            <input
                              type="radio"
                              className="spaceRadio"
                              value="1"
                              disabled
                              name="yesadmin"
                            />
                            No
                          </label>
                        </div>
                      </div>
                    ) : (
                      <>
                        {adminValue === "0" ? (
                          <div className="form-group">
                            <label>
                              Approval of Admin for such issue of invoice(s)
                            </label>
                            <div className="myInvice">
                              <label className="mr-3">
                                <input
                                  type="radio"
                                  className="spaceRadio"
                                  value="0"
                                  disabled
                                  name="yesadmin"
                                />
                                Yes
                              </label>
                              <label className="mr-3">
                                <input
                                  type="radio"
                                  defaultChecked
                                  className="spaceRadio"
                                  value="1"
                                  disabled
                                  name="yesadmin"
                                />
                                No
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div className="form-group">
                            <label>
                              Approval of Admin for such issue of invoice(s)
                            </label>
                            <div className="myInvice">
                              <label className="mr-3">
                                <input
                                  type="radio"
                                  defaultChecked
                                  className="spaceRadio"
                                  value="0"
                                  disabled
                                  name="yesadmin"
                                />
                                Yes
                              </label>
                              <label className="mr-3">
                                <input
                                  type="radio"
                                  className="spaceRadio"
                                  value="1"
                                  disabled
                                  name="yesadmin"
                                />
                                No
                              </label>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="myproposaloption">
                    <div className="form-group">
                      <label>
                        Whether invoice(s) can be issued before acceptance of
                        proposal by client
                      </label>
                      <div className="myInvice">
                        {invoice === "1" ? (
                          <label className="mr-3">
                            <input
                              type="radio"
                              defaultChecked
                              className="spaceRadio"
                              onChange={(e) => getInviceValue(e)}
                              disabled={tpDisable}
                              value="1"
                              name="yesclient"
                            />
                            Yes
                          </label>
                        ) : (
                          <label className="mr-3">
                            <input
                              type="radio"
                              className="spaceRadio"
                              onChange={(e) => getInviceValue(e)}
                              disabled={tpDisable}
                              value="1"
                              name="yesclient"
                            />
                            Yes
                          </label>
                        )}
                        {invoice === "0" ? (
                          <label className="mr-3">
                            <input
                              type="radio"
                              onChange={(e) => getInviceValue(e)}
                              defaultChecked
                              disabled={tpDisable}
                              value="0"
                              name="yesclient"
                            />
                            No
                          </label>
                        ) : (
                          <label className="mr-3">
                            <input
                              type="radio"
                              onChange={(e) => getInviceValue(e)}
                              disabled={tpDisable}
                              value="0"
                              name="yesclient"
                            />
                            No
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        Approval of Team Leader for such issue of invoice(s)
                      </label>

                      <div className="myInvice">
                        {invoiceTl === "1" ? (
                          <label className="mr-3">
                            <input
                              type="radio"
                              className="spaceRadio"
                              defaultChecked
                              onChange={(e) => getInvoicetl(e)}
                              disabled={tlDisable}
                              value="1"
                              name="yestl"
                            />
                            Yes
                          </label>
                        ) : (
                          <label className="mr-3">
                            <input
                              className="spaceRadio"
                              type="radio"
                              onChange={(e) => getInvoicetl(e)}
                              disabled={tlDisable}
                              value="1"
                              name="yestl"
                            />
                            Yes
                          </label>
                        )}
                        {invoiceTl === "0" ? (
                          <label className="mr-3">
                            <input
                              type="radio"
                              onChange={(e) => getInvoicetl(e)}
                              defaultChecked
                              disabled={tlDisable}
                              className="spaceRadio"
                              value="0"
                              name="yestl"
                            />
                            No
                          </label>
                        ) : (
                          <label className="mr-3">
                            <input
                              type="radio"
                              className="spaceRadio"
                              onChange={(e) => getInvoicetl(e)}
                              disabled={tlDisable}
                              value="0"
                              name="yestl"
                            />
                            No
                          </label>
                        )}
                      </div>
                    </div>

                    {adminValue === null ? (
                      <div className="form-group">
                        <label>
                          Approval of Admin for such issue of invoice(s)
                        </label>
                        <div
                          onChange={(e) => getInvoiceAdmin(e)}
                          className="myInvice"
                        >
                          <label className="mr-3">
                            <input
                              type="radio"
                              className="spaceRadio"
                              value="0"
                              disabled
                              name="yesadmin"
                            />
                            Yes
                          </label>
                          <label className="mr-3">
                            <input
                              type="radio"
                              className="spaceRadio"
                              value="1"
                              disabled
                              name="yesadmin"
                            />
                            No
                          </label>
                        </div>
                      </div>
                    ) : (
                      <>
                        {adminValue === "0" ? (
                          <div className="form-group">
                            <label>
                              Approval of Admin for such issue of invoice(s)
                            </label>
                            <div className="myInvice">
                              <label className="mr-3">
                                <input
                                  type="radio"
                                  className="spaceRadio"
                                  value="0"
                                  disabled
                                  name="yesadmin"
                                />
                                Yes
                              </label>
                              <label className="mr-3">
                                <input
                                  type="radio"
                                  defaultChecked
                                  className="spaceRadio"
                                  value="1"
                                  disabled
                                  name="yesadmin"
                                />
                                No
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div className="form-group">
                            <label>
                              Approval of Admin for such issue of invoice(s)
                            </label>
                            <div className="myInvice">
                              <label className="mr-3">
                                <input
                                  type="radio"
                                  defaultChecked
                                  className="spaceRadio"
                                  value="0"
                                  disabled
                                  name="yesadmin"
                                />
                                Yes
                              </label>
                              <label className="mr-3">
                                <input
                                  type="radio"
                                  className="spaceRadio"
                                  value="1"
                                  disabled
                                  name="yesadmin"
                                />
                                No
                              </label>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                <div className="form-group">
                  <label>
                    Scope of work <span className="declined">*</span>
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    height="400px"
                    config={{
                      fontFamily: {
                        options: [
                          "default",
                          "Ubuntu, Arial, sans-serif",
                          "Ubuntu Mono, Courier New, Courier, monospace",
                        ],
                      },
                      fontColor: {
                        colors: [
                          {
                            color: "hsl(0, 0%, 0%)",
                            label: "Black",
                          },
                          {
                            color: "hsl(0, 0%, 30%)",
                            label: "Dim grey",
                          },
                          {
                            color: "hsl(0, 0%, 60%)",
                            label: "Grey",
                          },
                          {
                            color: "hsl(0, 0%, 90%)",
                            label: "Light grey",
                          },
                          {
                            color: "hsl(0, 0%, 100%)",
                            label: "White",
                            hasBorder: true,
                          },

                          // ...
                        ],
                      },
                      toolbar: [
                        " highlight",
                        "heading",
                        "bold",
                        "fontColor",
                        "italic",
                        "bulletedList",
                        "numberedList",
                        "undo",
                        "redo",
                      ],
                    }}
                    ref={register}
                    id="textarea"
                    rows="3"
                    name="description"
                    data={description}
                    onChange={(event, editor) => {
                      setValue2(editor.getData());
                      // setcustError("")
                    }}
                    //ref={register({ required: true })}
                  ></CKEditor>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Client name</label>
                  <input
                    type="text"
                    name="p_name"
                    className="form-control"
                    value={name}
                    ref={register}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Copy to</label>
                  <Select
                    isMulti={true}
                    onChange={(e) => clientFun(e)}
                    value={client}
                    options={client2}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Amount<span className="declined">*</span>
                  </label>
                  <input
                    type="text"
                    name="p_fixed"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_fixed || diserror,
                    })}
                    ref={register({ required: true })}
                    placeholder="Enter Amount"
                    onBlur={(e) => {
                      let reduceInstallment = [];

                      reduceInstallment = formInstallmentInfo.amount.filter(
                        (i) => {
                          return i > 0;
                        }
                      );

                      setInstallment({
                        label: reduceInstallment.length,
                        value: reduceInstallment.length,
                      });
                      if (
                        subPlan === "1" &&
                        invoiceValue.invoiceAmount > e.target.value
                      ) {
                        Swal.fire({
                          title: "error",
                          html: "Amount can not be less than sum of  all installments for which invoices have been issued",
                          icon: "error",
                        });
                        setTotalAmount(Number(invoiceValue.invoiceAmount));
                      } else if (
                        store === "2" &&
                        invoiceValue.invoiceAmount > e.target.value
                      ) {
                        Swal.fire({
                          title: "error",
                          html: "Amount can not be less than sum of  all installments for which invoices have been issued",
                          icon: "error",
                        });
                        setTotalAmount(Number(invoiceValue.invoiceAmount));
                      }
                    }}
                    onChange={(e) => handleChange(e)}
                    value={totalAmount}
                  />
                </div>

                {store === "4" ? (
                  <div className="form-group">
                    <label>Start date</label>
                    <input
                      type="date"
                      ref={register({ required: true })}
                      name="start_date"
                      className="form-control"
                      value={startDate}
                      disabled={optionDisable}
                      min={item}
                      onChange={(e) => startFun(e)}
                    />
                  </div>
                ) : (
                  " "
                )}

                {store === "1" ? (
                  <div className="form-group">
                    <label>Due dates</label>
                    <input
                      type="date"
                      name="p_inst_date"
                      className={classNames("form-control", {
                        "is-invalid": errors.p_inst_date,
                      })}
                      onChange={(e) => setDate(e.target.value)}
                      ref={register({ required: true })}
                      placeholder="Enter Hourly basis"
                      min={item}
                      value={date}
                    />
                  </div>
                ) : store === "2" ? (
                  <div className="form-group">
                    <label>No of installments</label>
                    <Select
                      onChange={(e) => installmentHandler(e)}
                      value={installment}
                      options={noInstallments}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div>
                  {store === "3" ? (
                    <>
                      <div className="row">
                        <div className="col-md-6 my-2">
                          <label>Start date</label>
                          <input
                            type="date"
                            className="form-control"
                            disabled={optionDisable}
                            ref={register({ required: true })}
                            name="startTo_date"
                            value={startDate}
                            min={item}
                            max={endDate}
                            onChange={(e) => startFun(e)}
                          />
                        </div>
                        <div className="col-md-6 my-2">
                          <label>End date</label>
                          <input
                            type="date"
                            value={endDate}
                            ref={register({ required: true })}
                            name="endTo_date"
                            className="form-control"
                            min={fromMax}
                            onChange={(e) => endFun(e)}
                          />
                        </div>

                        <div
                          onChange={(e) => getSubPlan(e)}
                          className="subPaymentPlan"
                        >
                          <div className="col-md-6">
                            <span className="d-flex">
                              {subPlan === "1" ? (
                                <label>
                                  <input
                                    type="radio"
                                    defaultChecked
                                    className="spaceRadio"
                                    value="1"
                                    name="paymentPlan"
                                  />
                                  Installment payment
                                </label>
                              ) : (
                                <label>
                                  <input
                                    type="radio"
                                    className="spaceRadio"
                                    value="1"
                                    name="paymentPlan"
                                  />
                                  Installment payment
                                </label>
                              )}
                            </span>
                          </div>
                          <div className="col-md-6">
                            <span className="d-flex">
                              {subPlan === "2" ? (
                                <label>
                                  <input
                                    type="radio"
                                    defaultChecked
                                    className="spaceRadio"
                                    value="2"
                                    name="paymentPlan"
                                  />
                                  Monthly payment
                                </label>
                              ) : (
                                <label>
                                  <input
                                    type="radio"
                                    className="spaceRadio"
                                    value="2"
                                    name="paymentPlan"
                                  />
                                  Monthly payment
                                </label>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {subPlan === "1" ? (
                        <div className="form-group">
                          <label>No of installments</label>
                          <Select
                            isSearchable={false}
                            onChange={(e) => installmentHandler(e)}
                            value={installment}
                            options={no_installmentRange}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {subPlan === "2" ? (
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group d-flex justify-content-center">
                              <label
                                style={{
                                  whiteSpace: "nowrap",
                                  margin: "auto 5px",
                                }}
                              >
                                Due date- date of month
                              </label>
                              <select
                                className="form-control"
                                ref={register({ required: true })}
                                name="date_month"
                                onChange={(e) => myMonthValue(e)}
                                min={item}
                                value={dateMonth}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    " "
                  )}

                  {store === "4" ? (
                    <>
                      <div className="form-group d-flex justify-content-center">
                        <label
                          style={{
                            whiteSpace: "nowrap",
                            margin: "auto 5px",
                          }}
                        >
                          Due date- date of month
                        </label>
                        <select
                          className="form-control"
                          ref={register({ required: true })}
                          name="date_month2"
                          onChange={(e) => myMonthValue(e)}
                          value={dateMonth}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                          <option value="24">24</option>
                          <option value="25">25</option>
                          <option value="26">26</option>
                          <option value="27">27</option>
                          <option value="28">28</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    " "
                  )}
                </div>

                {store === "2" ? (
                  <Payment
                    installment={installment.label}
                    paymentAmount={paymentAmount}
                    paymentDate={paymentDate}
                    installment_amount={allAmount}
                    due_date={due_date}
                    getQuery={getQuery}
                    item={minDate}
                    clearValue={clearValue}
                    totalAmount={totalAmount}
                    dateError={dateError}
                    invoiceValue={invoiceValue}
                    allAmount={allAmount}
                    boxFormData={formInstallmentInfo}
                  />
                ) : (
                  ""
                )}
                {store === "3" && subPlan === "1" ? (
                  <Payment
                    installment={installment.label}
                    paymentAmount={paymentAmount}
                    paymentDate={paymentDate}
                    installment_amount={allAmount}
                    due_date={due_date}
                    getQuery={getQuery}
                    invoiceValue={invoiceValue}
                    clearValue={clearValue}
                    totalAmount={totalAmount}
                    max={endDate}
                    item={minDate}
                    dateError={dateError}
                    boxFormData={formInstallmentInfo}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="form-group col-md-6">
              {loading ? (
                <Spinner color="primary" />
              ) : (
                <button type="submit" className="customBtn">
                  Submit
                </button>
              )}
            </div>
          </form>

          <Mandatory />
        </CardBody>
      </Card>
    </Layout>
  );
}

export default EditComponent;

const paymentsTerms = [
  {
    value: "lumpsum",
    label: "lumpsum",
  },
  {
    value: "installment",
    label: "installment",
  },
];
