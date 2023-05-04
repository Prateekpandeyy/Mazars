import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import Tds from "./Tds";
import InvoiceFilter from "../../../components/Search-Filter/InvoiceFilter";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Paginator from "../../../components/Paginator/Paginator";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));

const CreateInvoice = () => {
  const userid = window.localStorage.getItem("tpkey");
  const allEnd = Number(localStorage.getItem("tp_record_per_page"));
  const [records, setRecords] = useState([]);
  const [proposal, setProposal] = useState([]);
  const classes = useStyles();
  // const [count, setCount] = useState("");
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

  const [id, setId] = useState();
  const [tds, setTds] = useState(false);

  const [count, setCount] = useState("0");
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState("");
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [page, setPage] = useState(0);
  const [defaultPage, setDefaultPage] = useState(["1"]);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(allEnd);
  const [orderby, setOrderBy] = useState("");
  const [fieldBy, setFiledBy] = useState("");
  const [atPage, setAtpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [countNotification, setCountNotification] = useState("");
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");

  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [tdsForm, setTdsForm] = useState(false);
  const [paidAmount, setPaidAmount] = useState();
  const [installmentNo, setInstallmentNo] = useState();
  const [billNo, setBillNo] = useState();
  const [id2, setId2] = useState();
  const [gstNo, setGstinNo] = useState();
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const addTdsToggle = (key) => {
    setTdsForm(!tdsForm);
    if (tdsForm === false) {
      setScrolledTo(key.id);
    }
    if (key) {
      setGstinNo(key.gstin_no);

      setAssignNo(key.assign_no);
      setPaidAmount(key.paid_amount);
      setId(key.id);
      setInstallmentNo(key.installment_no);
      setBillNo(key.billno);
      setId2(key.id);
    }
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [tdsForm]);

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
  };

  useEffect(() => {
    let pageno = JSON.parse(localStorage.getItem("tpInvoice2"));
    let arrow = localStorage.getItem("tpArrowInvoice2");
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    let sortVal = JSON.parse(localStorage.getItem("freezetpInvoice2"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("freezetpInvoice2", JSON.stringify(sort));
    }
    if (!pageno) {
      pageno = 1;
    }
    setPage(pageno);
    setEnd(allEnd);
    getProposalList(pageno);
  }, []);

  const getProposalList = (e) => {
    let searchData = JSON.parse(localStorage.getItem(`tpcreate`));
    let pagetry = JSON.parse(localStorage.getItem("freezetpInvoice1"));
    let orderBy = 0;
    let fieldBy = 0;
    let remainApiPath = "";
    if (pagetry) {
      orderBy = pagetry.orderBy;
      fieldBy = pagetry.fieldBy;
    }

    if (searchData?.installment_no || searchData?.opt || searchData?.query_no) {
      remainApiPath = `tl/getPaymentDetail?&invoice=0&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}&query_no=${searchData.query_no}
      &installment_no=${searchData?.installment_no}`;
    } else {
      remainApiPath = `tl/getPaymentDetail?&invoice=0&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    }

    // localStorage.setItem(`tpInvoice1`, JSON.stringify(e));
    // let val = pagetry?.val;
    // let field = pagetry?.field;
    // setOnPage(e);
    // setLoading(true);
    // if ((!data) && (!pagetry)) {
    //   remainApiPath = `tl/getPaymentDetail?page=${e}&tp_id=${JSON.parse(
    //     userid
    //   )}&invoice=0`
    // } else if ((!data) && (pagetry)) {
    //   remainApiPath = `tl/getPaymentDetail?page=${e}&tp_id=${JSON.parse(
    //     userid
    //   )}&invoice=0&orderby=${val}&orderbyfield=${field}`
    // } else { }

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

  function headerLabelFormatter(column) {
    // let reverse = "Exp_Delivery_Date"
    return (
      <div>
        {column.dataField === isActive ? (
          <div className="d-flex text-white w-100 flex-wrap">
            {column.text}
            {accend === column.dataField ? (
              <ArrowDropDownIcon
                className={turnGreen === true ? classes.isActive : ""}
              />
            ) : (
              <ArrowDropUpIcon
                className={turnGreen === true ? classes.isActive : ""}
              />
            )}
          </div>
        ) : (
          <div className="d-flex text-white w-100 flex-wrap">
            {column.text}
            {accend === column.dataField ? (
              <ArrowDropDownIcon />
            ) : (
              <ArrowDropUpIcon />
            )}
          </div>
        )}
      </div>
    );
  }

  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getProposalList(1);
    localStorage.setItem("tpInvoice2", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getProposalList(page - 1);
    localStorage.setItem("tpInvoice2", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    localStorage.setItem("tpInvoice2", Number(page) + 1);
    getProposalList(page + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getProposalList(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("tpInvoice2", defaultPage.at(-1));
  };

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    let obj = {
      orderBy: val,
      fieldBy: field,
    };
    localStorage.setItem(`tpInvoice2`, JSON.stringify(1));
    localStorage.setItem(`freezetpInvoice2`, JSON.stringify(obj));
    let searchData = JSON.parse(localStorage.getItem("tpcreate"));

    if (searchData?.installment_no || searchData?.opt || searchData?.query_no) {
      remainApiPath = `tl/getPaymentDetail?&page=1&invoice=0&qno=${searchData.query_no}&installment_no=${searchData?.installment_no}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `tl/getPaymentDetail?page=1&tp_id=${JSON.parse(
        userid
      )}&invoice=0&orderby=${val}&orderbyfield=${field} `;
    }
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        setPage(1);
        setBig(1);
        setEnd(allEnd);
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
        setTurnGreen(true);
        setProposal(all);
        console.log("proposal", all);
      }
    });
  };

  const columns = [
    {
      text: "S.no",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return (
          <div id={row.id} ref={(el) => (myRef.current[row.id] = el)}>
            {row.cid}
          </div>
        );
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setIsActive(field);
          setAccend(field);
          localStorage.setItem("tpArrowInvoice2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowInvoice2");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },

      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px", width: "200px" };
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/taxprofessional_queries/${row.assign_id}`,
                index: 1,
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
          localStorage.setItem("tpArrowInvoice2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowInvoice2");
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
        if (row.paymnet_plan_code === "3" && row.sub_payment_plane === "2") {
          subplan = "B";
        } else if (
          row.paymnet_plan_code === "3" &&
          row.sub_payment_plane === "1"
        ) {
          subplan = "A";
        }
        return (
          <>
            {row.paymnet_plan_code === null
              ? ""
              : `${row.paymnet_plan_code} ${subplan}`}
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
          setIsActive(field);
          setAccend(field);
          localStorage.setItem("tpArrowInvoice2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowInvoice2");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 3);
      },
      style: {
        fontSize: "11px",
        textAlign: "center",
      },
      headerStyle: () => {
        return { fontSize: "11px", width: "200px" };
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
          localStorage.setItem("tpArrowInvoice2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowInvoice2");
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
        return { fontSize: "11px", width: "200px" };
      },
      formatter: function (cell, row) {
        let dueDate = row.due_date.split("-").reverse().join("-");

        return <>{dueDate}</>;
      },
    },
    {
      text: "Amount",
      dataField: "paid_amount",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowInvoice2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowInvoice2");
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
      headerStyle: () => {
        return { fontSize: "11px", width: "200px" };
      },
      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.paid_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <i
                class="fa fa-mail-forward"
                style={{
                  fontSize: "14px",
                  cursor: "pointer",
                  color: "blue",
                }}
                onClick={() => addTdsToggle(row)}
              ></i>
            </div>
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
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem("tpInvoice2");
    localStorage.removeItem(`freezetpInvoice2`);
    localStorage.removeItem("tpArrowInvoice2");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <InvoiceFilter
            setData={setProposal}
            getData={getProposalList}
            invoice="tpcreate"
            setRec={setRecords}
            records={records}
            userid={JSON.parse(userid)}
            localPage="tpInvoice2"
            setDefaultPage={setDefaultPage}
            resetPaging={resetPaging}
            setCountNotification={setCountNotification}
            page={page}
            setPage={setPage}
            setBig={setBig}
            setEnd={setEnd}
          />
        </CardHeader>

        <CardBody>
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
                          className="navButton mx-1"
                          onClick={(e) => firstChunk()}
                        >
                          <KeyboardDoubleArrowLeftIcon />
                        </button>
                        <button
                          className="navButton mx-1"
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
                          localStorage.setItem("tpInvoice2", e.target.value);
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
                          <KeyboardArrowRightIcon />
                        </button>
                        <button
                          className="navButton mx-1"
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
            keyField={"assign_no"}
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
export default CreateInvoice;
