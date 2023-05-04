import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import BootstrapTable from "react-bootstrap-table-next";
import Tds from "./Tds";
import InvoiceFilter from "../../../components/Search-Filter/InvoiceFilter";
import moment from "moment";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Paginator from "../../../components/Paginator/Paginator";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));

const Generated = () => {
  var rowStyle2 = {};
  const userid = window.localStorage.getItem("tpkey");
  const allEnd = Number(localStorage.getItem("tp_record_per_page"));
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [proposal, setProposal] = useState([]);

  const [count, setCount] = useState("0");
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState('');
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [prev, setPrev] = useState("");

  const [page, setPage] = useState(0);
  const [defaultPage, setDefaultPage] = useState(["1"]);
  const [countNotification, setCountNotification] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(allEnd);
  const [orderby, setOrderBy] = useState("");
  const [fieldBy, setFiledBy] = useState("");
  const [atPage, setAtpage] = useState(1);

  const [id, setId] = useState();
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [tdsForm, setTdsForm] = useState(false);
  const [paidAmount, setPaidAmount] = useState();
  const [installmentNo, setInstallmentNo] = useState();
  const [billNo, setBillNo] = useState();
  const [id2, setId2] = useState();
  const [gstNo, setGstinNo] = useState();
  const [copy, setCopy] = useState(0);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);
  const [swing, setSwing] = useState(false);
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const addTdsToggle = (key) => {
    setTdsForm(!tdsForm);
    if (tdsForm === false) {
      setScrolledTo(key.id)
    }
    if (key) {
      setGstinNo(key.gstin_no);
      console.log(key.assign_no);
      setAssignNo(key.assign_no);
      setPaidAmount(key.paid_amount);
      setId(key.id);
      setInstallmentNo(key.installment_no);
      setBillNo(key.billno);
      setId2(key.id);
    }
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo]
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: 'center' });
  }, [tdsForm]);

  useEffect(() => {
    let pageno = JSON.parse(localStorage.getItem("tpInvoice1"));
    let arrow = localStorage.getItem("tpArrowInvoice1")
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    if (!pageno) {
      pageno = 1;
    }
    let pre = localStorage.getItem("prevtpInvoice1")
    if (pre) {
      setPrev(pre);
    }
    let sortVal = JSON.parse(localStorage.getItem("freezetpInvoice1"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 1,
      };
      localStorage.setItem("freezetpInvoice1", JSON.stringify(sort));
    }
    setPage(pageno);
    getProposalList(pageno);
    // getProposalList();
  }, []);

  const getProposalList = (e) => {
    let sortVal = JSON.parse(localStorage.getItem("freezetpInvoice1"));
    let orderBy = 0;
    let fieldBy = 0;
    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let remainApiPath = "";
    let searchData = JSON.parse(localStorage.getItem(`tpgenerated`));
    if (searchData && Object.values(searchData).length > 0) {
      if (searchData?.installment_no) {
        remainApiPath = `tl/getPaymentDetail?&invoice=1&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}&qno=${searchData.query_no}&from=${searchData.p_dateFrom}&to=${searchData.p_dateTo}&status=${searchData.opt}&payment_plan=${searchData.payment_plan}`;
      }else{
      remainApiPath = `tl/getPaymentDetail?&invoice=1&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}&qno=${searchData.query_no}&from=${searchData.p_dateFrom}&to=${searchData.p_dateTo}&status=${searchData.opt}&installment_no=${searchData?.installment_no}&payment_plan=${searchData.payment_plan}`;
      }
    } else {
      remainApiPath = `tl/getPaymentDetail?&invoice=1&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    }

    // let data = JSON.parse(localStorage.getItem("tpgenerated"));
    // let pagetry = JSON.parse(localStorage.getItem("freezetpInvoice1"));
    // localStorage.setItem(`tpInvoice1`, JSON.stringify(e));
    // let val = pagetry?.val;
    // let field = pagetry?.field;
    // // setOnPage(e);
    // setLoading(true);
    // if ((!data) && (!pagetry)) {
    //   remainApiPath = `tl/getPaymentDetail?page=${e}&tp_id=${JSON.parse(
    //     userid
    //   )}&invoice=1`
    // }
    // else if ((!data) && (pagetry)) {
    //   remainApiPath = `tl/getPaymentDetail?page=${e}&tp_id=${JSON.parse(
    //     userid
    //   )}&invoice=1&orderby=${val}&orderbyfield=${field}`
    // }
    // else { }

    axios
      .get(
        `${baseUrl}/${remainApiPath}`,
        myConfig
      )
      .then((res) => {
        let droppage = [];
        if (res.data.code === 1) {
          let data = res.data.payment_detail;
          setRecords(res.data.total);
          let all = [];
          let customId = 1;
          if (e > 1) {
            customId = allEnd * (e - 1) + 1;
          }
          data.map((i) => {
            let data = {
              ...i,
              cid: customId,
            };
            customId++;
            all.push(data);
          });
          setProposal(all);

          let end = e * allEnd;
          setCountNotification(res.data.total);
          if (end > res.data.total) {
            end = res.data.total;
          }
          let dynamicPage = Math.ceil(res.data.total / allEnd);

          let rem = (e - 1) * allEnd;

          if (e === 1) {
            setBig(rem + e);
            setEnd(end);
          } else {
            setBig(rem + 1);
            setEnd(end);
          }
          for (let i = 1; i <= dynamicPage; i++) {
            droppage.push(i);
          }
          setDefaultPage(droppage);
        }
      });
  };

  const downloadpdf = (qno, id, installmentNumber) => {
    const myConfig2 = {
      headers: {
        uit: token,
      },
      responseType: "blob",
    };
    axios
      .get(
        `${baseUrl}/tl/viewinvoicepdf?assign_no=${qno}&invoice_id=${id}`,
        myConfig2
      )
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          //    window.open(URL.createObjectURL(res.data));
          console.log(URL.createObjectURL(res.data));
          window.URL = window.URL || window.webkitURL;
          var url = window.URL.createObjectURL(res.data);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = url;
          a.download = `invoice_${qno}_${installmentNumber}.pdf`;
          //    a.download = "invoice"+{qno}+{installmentNumber}+'.pdf';
          a.target = "_blank";
          a.click();
        }
      });
  };

  // function headerLabelFormatter(column) {
  //   // let reverse = "Exp_Delivery_Date"
  //   return (
  //     <div>
  //       {column.dataField === isActive ?
  //         (
  //           <div className="d-flex text-white w-100 flex-wrap">
  //             {column.text}
  //             {accend === column.dataField ? (
  //               <ArrowDropDownIcon
  //                 className={turnGreen === true ? classes.isActive : ""}
  //               />
  //             ) : (
  //               <ArrowDropUpIcon
  //                 className={turnGreen === true ? classes.isActive : ""}
  //               />
  //             )}
  //           </div>
  //         )
  //         :
  //         (
  //           <div className="d-flex text-white w-100 flex-wrap">
  //             {column.text}
  //             {accend === column.dataField ? (
  //               <ArrowDropDownIcon />
  //             ) : (
  //               <ArrowDropUpIcon />
  //             )}
  //           </div>
  //         )
  //       }
  //     </div>
  //   )
  // }

  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("tpArrowInvoice1") === column.dataField ||
      localStorage.getItem("prevtpInvoice1") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevtpInvoice1", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("tpArrowInvoice1") === column.dataField ? (
            <ArrowDropUpIcon
              className={isActive === true ? classes.isActive : ""}
            />
          ) : (
            <ArrowDropDownIcon
              className={isActive === true ? classes.isActive : ""}
            />
          )}
        </div>
      </div>
    );
  }

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setOrderBy(val);
    setFiledBy(field);
    let obj = {
      orderBy: val,
      fieldBy: field,
    };
    localStorage.setItem(`tpInvoice1`, JSON.stringify(1))
    localStorage.setItem(`freezetpInvoice1`, JSON.stringify(obj));
    let data = JSON.parse(localStorage.getItem("tpgenerated"));
    if (data && Object.values(data).length > 0) {
      if (data?.installment_no) {
        remainApiPath = `tl/getPaymentDetail?&invoice=1&qno=${data.query_no}&payment_plan=${data.payment_plan}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=${data.opt}&installment_no=${data?.installment_no}&orderby=${val}&orderbyfield=${field}`
      } else {
        remainApiPath = `tl/getPaymentDetail?&invoice=1&qno=${data.query_no}&payment_plan=${data.payment_plan}&from=${data.p_dateFrom}&to=${data.p_dateTo}&status=${data.opt}&orderby=${val}&orderbyfield=${field}`
      }
    }
    else {
      remainApiPath = `tl/getPaymentDetail?page=1&tp_id=${JSON.parse(
        userid
      )}&invoice=1&orderby=${val}&orderbyfield=${field}`
    }
    axios
      .get(
        `${baseUrl}/${remainApiPath}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setPage(1);
          setBig(1);
          setEnd(Number(localStorage.getItem("tp_record_per_page")));
          let all = [];
          let sortId = 1;

          res.data.payment_detail.map((i) => {
            let data = {
              ...i,
              cid: sortId,
            };
            sortId++;
            all.push(data);
          });
          setProposal(all);
          setTurnGreen(true);
        }
      });
  }

  const columns = [
    {
      text: "S.no",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return <div id={row.id}
          ref={el => (myRef.current[row.id] = el)}>{row.cid}</div>;
      },
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px", width: "60px" };
      },
    },

    {
      text: "Query no",
      dataField: "assign_no",
      style: {
        fontSize: "11px",
      },
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowInvoice1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowInvoice1");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },
      headerStyle: () => {
        return { fontSize: "11px", width: "100px" };
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/taxprofessional_queries/${row.assign_id}`,
                index: 0,
                routes: "tpinvoice",
              }}
            >
              {row.assign_no}
            </Link>
          </>
        );
      },
    },
    {
      text: "Payment  plan",
      dataField: "paymnet_plan_code",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("tpArrowInvoice1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowInvoice1");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 2);
      },
      formatter: function paymentPlan(cell, row) {
        var subplan = "";
        if (row.payment_plan === "3" && row.sub_payment_plane === "2") {
          subplan = "B";
        } else if (row.payment_plan === "3" && row.sub_payment_plane === "1") {
          subplan = "A";
        }
        return (
          <>
            {row.payment_plan === null ? "" : `${row.payment_plan} ${subplan}`}
          </>
        );
      },
    },
    {
      text: "Installment no",
      dataField: "installment_no",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowInvoice1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowInvoice1");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 3);
      },

      headerStyle: () => {
        return { width: "80px" };
      },
    },
    {
      text: "Invoice no",
      dataField: "billno",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowInvoice1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowInvoice1");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 4);
      },
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fwidth: "150px" };
      },
    },
    {
      text: "Due date",
      dataField: "due_date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowInvoice1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowInvoice1");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 5);
      },
      style: {
        fontSize: "11px",
      },

      formatter: function (cell, row) {
        let dueDate = row.due_date.split("-").reverse().join("-");

        return <>{dueDate}</>;
      },
    },
    {
      text: "Invoice amount",
      dataField: "invoice_amount",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowInvoice1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowInvoice1");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 6);
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.invoice_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      text: "Tds deducted",
      dataField: "tds_amount",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowInvoice1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowInvoice1");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 7);
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.tds_amount;

        return (
          <>
            {row.is_paid == "0" ? (
              <p className="rightAli">0</p>
            ) : (
              <p className="rightAli">{nfObject.format(x)}</p>
            )}
          </>
        );
      },
    },
    {
      text: "Status",
      dataField: "is_paid",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowInvoice1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowInvoice1");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 8);
      },

      formatter: function (cell, row) {
        return (
          <>
            {row.is_paid == "0" ? (
              <p>Unpaid</p>
            ) : (
              <>
                {row.is_paid == "1" ? (
                  <p>Paid</p>
                ) : (
                  <p style={{ color: "red", fontSize: "11px" }}>Declined</p>
                )}
              </>
            )}
          </>
        );
      },
    },

    {
      text: "Action",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "11px", width: "110px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <span
                onClick={() =>
                  downloadpdf(row.assign_no, row.id, row.installment_no)
                }
                style={{ cursor: "pointer" }}
                title="Download Invoice"
              >
                <DescriptionOutlinedIcon color="secondary" />
              </span>
              {row.is_paid == "0" ? (
                <i
                  class="fa fa-edit"
                  style={{
                    fontSize: "16px",
                    margin: "0 5px",
                    cursor: "pointer",
                    color: "blue",
                  }}
                  onClick={() => addTdsToggle(row)}
                ></i>
              ) : (
                ""
              )}
              {row.is_paid == "0" && row.paymenturl !== null ? (
                <span title={row.paymenturl}>
                  {copy == row.id ? (
                    <span style={{ color: "red" }}>Copied</span>
                  ) : (
                    <FileCopyIcon
                      id={row.id}
                      onClick={() => {
                        copyFun(row.paymenturl, row.id);
                      }}
                      style={noPointer}
                    />
                  )}
                </span>
              ) : (
                ""
              )}
            </div>
          </>
        );
      },
    },
  ];

  const noPointer = { cursor: "pointer", color: "blue" };
  const copyFun = (e, id) => {
    setCopy(id);
    navigator.clipboard.writeText(e);
    setSwing(!swing)
    if (swing === false) {
      setScrolledTo(id)
      console.log("object");
    }
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo]
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: 'center' });
    console.log("work");
  }, [swing]);


  rowStyle2 = (row, index) => {
    const style = {};
    var warningDate = moment(row.due_date).subtract(5, "day").toDate();
    // var warnformat = warningDate.format("YYYY-MM-DD");
    var aa = moment().toDate();
    var cc = moment(row.due_date).toDate();
    if (row.is_paid === "2") {
      style.backgroundColor = "#fff";
      style.color = "#000";
    } else if (row.paid_status != "2" && row.is_paid != "1" && cc < aa) {
      style.backgroundColor = "#bfdfd2";
      style.color = "#000111";
    } else if (
      row.paid_status != "2" &&
      row.is_paid != "1" &&
      row.status != "Complete" &&
      warningDate < aa
    ) {
      style.backgroundColor = "#c1d8f2";
      style.color = "#000111";
    } else if (
      row.paid_status != "2" &&
      row.is_paid != "1" &&
      warningDate > aa
    ) {
      style.backgroundColor = "#fff";
      style.color = "#000";
    }

    return style;
  };

  const resetPaging = () => {
    setPage(1);
    setBig(1);
    setOrderBy("");
    setFiledBy("");
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem("tpInvoice1");
    localStorage.removeItem(`freezetpInvoice1`);
    localStorage.removeItem("tpArrowInvoice1");
    localStorage.removeItem("prevtpInvoice1");
    setPrev("")
  }

  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getProposalList(1);
    localStorage.setItem("tpInvoice1", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getProposalList(page - 1);
    localStorage.setItem("tpInvoice1", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    localStorage.setItem("tpInvoice1", Number(page) + 1);
    getProposalList(page + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getProposalList(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("tpInvoice1", defaultPage.at(-1));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <InvoiceFilter
            setData={setProposal}
            getData={getProposalList}
            invoice="tpgenerated"
            panel="taxprofessional"
            localPage="tpinvoice1"
            setRec={setRecords}
            records={records}
            userid={JSON.parse(userid)}
            setDefaultPage={setDefaultPage}
            resetPaging={resetPaging}
            setCount={setCount}
            setCountNotification={setCountNotification}
            setPage={setPage}
            page={page}
            setBig={setBig}
            setEnd={setEnd}
          />
        </CardHeader>

        <CardBody>
          {/* <div className="tableFixHead">
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={proposal}
                        columns={columns}
                        rowIndex
                        rowStyle={ rowStyle2 }
                        classes="table-responsive"
                    />
                    </div> */}
          {proposal.length > 0 ? (
            <Row className="mb-2">
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
                            getProposalList(Number(e.target.value));
                            localStorage.setItem("tpInvoice1", e.target.value);
                          }}
                          className="form-control"
                        >
                          {defaultPage.map((i) => (
                            <option value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                      {defaultPage.length > page ? (
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
              <Col md="6"></Col>
              <Col md="6" align="right">
                <span className="customPaginationSpan">0 - 0 of 0</span>
              </Col>
            </Row>
          )}
          <DataTablepopulated
            bgColor="#42566a"
            keyField="id"
            data={proposal}
            columns={columns}
          ></DataTablepopulated>

          {tdsForm === true ? (
            <Tds
              tdsForm={tdsForm}
              addTdsToggle={addTdsToggle}
              id={id}
              paidAmount={paidAmount}
              report={assignNo}
              installmentNo={installmentNo}
              billNo={billNo}
              generated={"edited"}
              gstNo={gstNo}
              getProposalList={getProposalList}
            />
          ) : (
            ""
          )}
        </CardBody>
      </Card>
    </>
  );
};
export default Generated;
