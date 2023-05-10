import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Tds from "./Tds";
import InvoiceFilter from "../../../components/Search-Filter/InvoiceFilter";
import moment from "moment";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 10px",
  },
}));
const Generated = () => {
  const classes = useStyles();
  var rowStyle2 = {};
  const userid = window.localStorage.getItem("adminkey");
  const [records, setRecords] = useState([]);
  const [proposal, setProposal] = useState([]);
  const [id, setId] = useState();
  const [assignNo, setAssignNo] = useState("");
  const [tdsForm, setTdsForm] = useState(false);
  const [paidAmount, setPaidAmount] = useState();
  const [installmentNo, setInstallmentNo] = useState();
  const [billNo, setBillNo] = useState();
  const [id2, setId2] = useState();
  const [gstNo, setGstinNo] = useState();
  const [copy, setCopy] = useState(0);

  const [countNotification, setCountNotification] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const [accend, setAccend] = useState(false);
  const [copiedHere, setCopiedHere] = useState(false);
  const [scrolledTo, setScrolledTo] = useState("");
  const [orderby, setOrderBy] = useState("");
  const [prev, setPrev] = useState("");
  const [fieldBy, setFiledBy] = useState("");
  const myRef = useRef([]);
  const [jumpTo, setJumpTo] = useState("");
  const myRefs = useRef([]);
  const [showCopyUrl, setShowCopyUrl] = useState("click");
  let copyTitle = "";
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  function headerLabelFormatter(column, colIndex) {
    let isActive = true;
    if (
      localStorage.getItem("accendgenerated") === column.dataField ||
      localStorage.getItem("previnv1") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("previnv1", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("accendgenerated") === column.dataField ? (
            <ArrowDropDownIcon
              className={isActive === true ? classes.isActive : ""}
            />
          ) : (
            <ArrowDropUpIcon
              className={isActive === true ? classes.isActive : ""}
            />
          )}
        </div>
      </div>
    );
  }
  const addTdsToggle = (key) => {
    setGstinNo(key.gstin_no);
    setTdsForm(!tdsForm);
    setAssignNo(key.assign_no);
    setPaidAmount(key.paid_amount);
    setId(key.id);
    setInstallmentNo(key.installment_no);
    setBillNo(key.billno);
    setId2(key.id);
  };

  useEffect(() => {
    let localPage = Number(localStorage.getItem("admininvt1"));
    if (!localPage) {
      localPage = 1;
    }
    let sortVal = JSON.parse(localStorage.getItem("sortedValuevt1"));
    setPrev(localStorage.getItem("previnv1"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("sortedValuevt1", JSON.stringify(sort));
    }
    setAccend(localStorage.getItem("accendgenerated"));
    setPage(localPage);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    getProposalList(localPage);
  }, []);

  const getProposalList = (e) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    let sortVal = JSON.parse(localStorage.getItem("sortedValuevt1"));
    let orderBy = 0;
    let fieldBy = 0;

    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let remainApiPath = "";
    let searchData = JSON.parse(localStorage.getItem(`admingenerated`));

    if (searchData && Object.values(searchData).length > 0) {
      remainApiPath = `/admin/getPaymentDetail?&invoice=1&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}&qno=${searchData.query_no}&from=${searchData.p_dateFrom}&to=${searchData.p_dateTo}&status=${searchData.opt}&installment_no=${searchData?.installment_no}&payment_plan=${searchData.payment_plan}`;
    } else {
      remainApiPath = `admin/getPaymentDetail?&invoice=1&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    }
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
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
        `${baseUrl}/admin/viewinvoicepdf?assign_no=${qno}&invoice_id=${id}`,
        myConfig2
      )
      .then((res) => {
        if (res.status === 200) {
          window.URL = window.URL || window.webkitURL;
          var url = window.URL.createObjectURL(res.data);
          var a = document?.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = url;
          a.download = `invoice_${qno}_${installmentNumber}.pdf`;
          a.target = "_blank";
          a.click();
        }
      });
  };
  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setOrderBy(val);
    setFiledBy(field);
    let sort = {
      orderBy: val,
      fieldBy: field,
    };
    localStorage.setItem("admininvt1", 1);
    localStorage.setItem("sortedValuevt1", JSON.stringify(sort));
    let searchData = JSON.parse(localStorage.getItem(`admingenerated`));
    if (searchData && Object.values(searchData).length > 0) {
      remainApiPath = `/admin/getPaymentDetail?&invoice=1&qno=${searchData.query_no}&payment_plan=${searchData.payment_plan}&from=${searchData.p_dateFrom}&to=${searchData.p_dateTo}&status=${searchData.opt}&installment_no=${searchData?.installment_no}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `admin/getPaymentDetail?&invoice=1&orderby=${val}&orderbyfield=${field}`;
    }
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        setPage(1);
        setBig(1);
        setEnd(Number(localStorage.getItem("admin_record_per_page")));
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
      }
    });
  };

  const columns = [
    {
      text: "S.no",
      dataField: "",

      headerStyle: () => {
        return { width: "50px" };
      },
      formatter: (cellContent, row, rowIndex) => {
        return (
          <div
            id={row.assign_no}
            ref={(el) => (myRef.current[row.assign_no] = el)}
          >
            {row.cid}
          </div>
        );
      },
    },

    {
      text: "Query no",
      dataField: "assign_no",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendgenerated", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendgenerated");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }

        sortMessage(val, 1);
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/admin_queries/${row.assign_id}`,
                index: 0,
                routes: "adinvoice",
              }}
            >
              {row.assign_no}
            </Link>
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
          localStorage.setItem("accendgenerated", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendgenerated");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 2);
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
          localStorage.setItem("accendgenerated", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendgenerated");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 3);
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
          localStorage.setItem("accendgenerated", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendgenerated");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 4);
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
      text: "Due date",
      dataField: "due_date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendgenerated", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendgenerated");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 5);
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
          localStorage.setItem("accendgenerated", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendgenerated");
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
          localStorage.setItem("accendgenerated", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendgenerated");
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

        return <span>{nfObject.format(x)}</span>;
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
          localStorage.setItem("accendgenerated", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendgenerated");
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
                  <p style={{ color: "red" }}>Declined</p>
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

      formatter: function (cell, row) {
        copyTitle = row.paymenturl;
        return (
          <>
            {showCopyUrl === "click" ? (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <span
                  onClick={() =>
                    downloadpdf(row.assign_no, row.id, row.installment_no)
                  }
                  style={{ cursor: "pointer" }}
                  title="Download Invoice"
                >
                  <DescriptionOutlinedIcon color="secondary" />
                </span>

                {row.is_paid == "0" && row.paymenturl !== null ? (
                  <span title={row.paymenturl}>
                    {copy == row.id ? (
                      <span style={{ color: "red" }}>Copied</span>
                    ) : (
                      <FileCopyIcon
                        id={row.id}
                        ref={(el) => (myRefs.current[row.id] = el)}
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
            ) : (
              ""
            )}
          </>
        );
      },
    },
  ];
  const resetPaging = () => {
    setPage(1);
    setBig(1);
    setOrderBy("");
    setFiledBy("");
    localStorage.removeItem("admininvt1");
    localStorage.removeItem("sortedValuevt1");
    localStorage.removeItem("accendcreated");
    localStorage.removeItem("previnv1");
    getProposalList(1);
  };
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getProposalList(1);
    localStorage.setItem("admininvt1", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getProposalList(page - 1);
    localStorage.setItem("admininvt1", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    localStorage.setItem("admininvt1", Number(page) + 1);
    getProposalList(page + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getProposalList(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("admininvt1", defaultPage.at(-1));
  };
  const noPointer = { cursor: "pointer", color: "blue" };
  const copyFun = (e, id) => {
    setCopy(id);
    setCopiedHere(!copiedHere);
    console.log(id);
    setJumpTo(id);
    navigator.clipboard.writeText(e);
  };

  useEffect(() => {
    let runTo = myRefs.current[jumpTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [copiedHere]);

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

  return (
    <>
      <Card>
        <CardHeader>
          <InvoiceFilter
            setData={setProposal}
            getData={getProposalList}
            invoice="admingenerated"
            setRec={setRecords}
            localPage="admininvt1"
            records={records}
            userid={JSON.parse(userid)}
            setDefaultPage={setDefaultPage}
            resetPaging={resetPaging}
            setCountNotification={setCountNotification}
            setPage={setPage}
            page={page}
            setBig={setBig}
            setEnd={setEnd}
          />
        </CardHeader>

        <CardBody>
          <Row>
            <Col md="6"></Col>
            <Col md="6" align="right">
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
                          localStorage.setItem("admininvt1", e.target.value);
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
          <DataTablepopulated
            bgColor="#42566a"
            keyField="id"
            data={proposal}
            rowStyle2={rowStyle2}
            columns={columns}
          ></DataTablepopulated>

          {tdsForm && (
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
            />
          )}
        </CardBody>
      </Card>
    </>
  );
};
export default Generated;
