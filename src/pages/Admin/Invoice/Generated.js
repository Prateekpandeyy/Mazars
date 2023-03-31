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
const Generated = () => {
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

  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const [accend, setAccend] = useState(false);
  const [copiedHere, setCopiedHere] = useState(false);
  const [scrolledTo, setScrolledTo] = useState("");
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
    let localPage = Number(localStorage.getItem("admininvt2"));
    if (!localPage) {
      localPage = 1;
    }
    setPage(localPage);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    getProposalList(localPage);
  }, []);

  const getProposalList = (e) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));

    let remainApiPath = "";
    let searchData = JSON.parse(localStorage.getItem(`admingenerated`));
    if (searchData) {
      remainApiPath = `/admin/getPaymentDetail?&invoice=1&page=${e}&cat_id=${
        searchData.store
      }&from=${searchData.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${searchData.toDate
        ?.split("-")
        .reverse()
        .join("-")}&status=${searchData?.p_status}&pcat_id=${
        searchData.pcatId
      }&qno=${searchData?.query_no}`;
    } else {
      remainApiPath = `admin/getPaymentDetail?&invoice=1&page=${e}`;
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

  const columns = [
    {
      text: "S.no",
      dataField: "cid",

      headerStyle: () => {
        return { width: "50px" };
      },
    },

    {
      text: "Query no",
      dataField: "assign_no",

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
      sort: true,
      sortFunc: (a, b, order, dataField, rowA, rowB) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },
    },
    {
      text: "Invoice no",
      dataField: "billno",
    },
    {
      text: "Due date",
      dataField: "due_date",
      sort: true,
      sortFunc: (a, b, order) => {
        if (order === "asc") {
          return Date.parse(a) - Date.parse(b);
        } else if (order === "desc") {
          return Date.parse(b) - Date.parse(a);
        }
      },
      formatter: function (cell, row) {
        let dueDate = row.due_date.split("-").reverse().join("-");

        return <>{dueDate}</>;
      },
    },
    {
      text: "Invoice amount",
      dataField: "invoice_amount",
      sort: true,

      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
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
      sort: true,

      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
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
      sort: true,

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
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
  };
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getProposalList(1);
    localStorage.setItem("admininvt2", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getProposalList(page - 1);
    localStorage.setItem("admininvt2", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    localStorage.setItem("admininvt2", Number(page) + 1);
    getProposalList(page + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getProposalList(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("admininvt2", defaultPage.at(-1));
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
            records={records}
            resetPaging={resetPaging}
            userid={JSON.parse(userid)}
            setCountNotification={setCountNotification}
          />
        </CardHeader>

        <CardBody>
          <Row>
            <Col md="6"></Col>
            <Col md="6" align="right">
              <div className="customPagination">
                <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                  <span>
                    {big}-{end} of {countNotification}
                  </span>
                  <span className="d-flex">
                    {page > 1 ? (
                      <>
                        <button
                          className="navButton mx-1"
                          onClick={(e) => firstChunk()}
                        >
                          &lt; &lt;
                        </button>
                        <button
                          className="navButton mx-1"
                          onClick={(e) => prevChunk()}
                        >
                          &lt;
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                    <div
                      style={{
                        display: "flex",
                        maxWidth: "70px",
                        width: "100%",
                      }}
                    >
                      <select
                        value={page}
                        onChange={(e) => {
                          setPage(Number(e.target.value));
                          getProposalList(Number(e.target.value));
                          localStorage.setItem("admininvt2", e.target.value);
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
                          className="navButton mx-1"
                          onClick={(e) => nextChunk()}
                        >
                          &gt;
                        </button>
                        <button
                          className="navButton mx-1"
                          onClick={(e) => lastChunk()}
                        >
                          &gt; &gt;
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
