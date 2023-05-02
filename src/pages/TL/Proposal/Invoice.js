import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import ChatHistory from "./ChatHistory";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DiscardReport from "../AssignmentTab/DiscardReport";
import Tds from "./Tds";
import OutlinedInputIcons from "@mui/material/OutlinedInput";
import InvoiceFilter from "../../../components/Search-Filter/InvoiceFilter";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  ActionIcon,
} from "../../../components/Common/MessageIcon";
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
const Invoice = (updateTab) => {
  const classes = useStyles();
  const userid = window.localStorage.getItem("tlkey");
  const [records, setRecords] = useState([]);
  const [proposal, setProposal] = useState([]);
  const [count, setCount] = useState("");
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

  const [id, setId] = useState();
  const [tds, setTds] = useState(false);
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [tdsForm, setTdsForm] = useState(false);
  const [paidAmount, setPaidAmount] = useState();
  const [installmentNo, setInstallmentNo] = useState();
  const [billNo, setBillNo] = useState();
  const [id2, setId2] = useState();
  const [gstNo, setGstinNo] = useState();
  const [countNotification, setCountNotification] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const [accend, setAccend] = useState(false);
  const [prev, setPrev] = useState("");
  const addTdsToggle = (key) => {
    setTdsForm(!tdsForm);
    if (tdsForm === false) {
      setScrolledTo(key.assign_no);
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
    console.log("There is myRef here");
  }, [tdsForm]);

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
  };

  useEffect(() => {
    let localPage = Number(localStorage.getItem("tlint2"));
    if (!localPage) {
      localPage = 1;
    }
    let sortVal = JSON.parse(localStorage.getItem("sortedValuetl2"));
    setPrev(localStorage.getItem("tlprevint2"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("sortedValuetl2", JSON.stringify(sort));
    }
    setAccend(localStorage.getItem("accendcreatedtl"));
    setPage(localPage);
    setEnd(Number(localStorage.getItem("tl_record_per_page")));
    getProposalList(localPage);
  }, []);
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getProposalList = (e) => {
    let searchData = JSON.parse(localStorage.getItem("tlcreate"));
    let allEnd = Number(localStorage.getItem("tl_record_per_page"));
    let sortVal = JSON.parse(localStorage.getItem("sortedValuetl2"));
    let orderBy = 0;
    let fieldBy = 0;

    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let remainApiPath = "";

    if (searchData?.installment_no || searchData?.opt || searchData?.query_no) {
      remainApiPath = `/tl/getPaymentDetail?&invoice=0&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}&query_no=${searchData.query_no}
      &installment_no=${searchData?.installment_no}`;
    } else {
      remainApiPath = `tl/getPaymentDetail?&invoice=0&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    }
    if (e) {
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
    }
  };
  const sortMessage = (val, field) => {
    let remainApiPath = "";

    let sort = {
      orderBy: val,
      fieldBy: field,
    };
    localStorage.setItem("tlint2", 1);
    localStorage.setItem("sortedValuetl2", JSON.stringify(sort));
    let searchData = JSON.parse(localStorage.getItem(`tlcreate`));
    if (searchData && Object.values(searchData).length > 0) {
      remainApiPath = `/tl/getPaymentDetail?&invoice=0&qno=${searchData.query_no}&payment_plan=${searchData.payment_plan}&from=${searchData.p_dateFrom}&to=${searchData.p_dateTo}&status=${searchData.opt}&installment_no=${searchData?.installment_no}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `/tl/getPaymentDetail?&invoice=0&orderby=${val}&orderbyfield=${field}`;
    }
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        setPage(1);
        setBig(1);
        setEnd(Number(localStorage.getItem("tl_record_per_page")));
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
      dataField: "cid",
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

      headerStyle: () => {
        return { width: "50px" };
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
          localStorage.setItem("accendcreatedtl", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendcreatedtl");
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
                pathname: `/teamleader_queries/${row.assign_id}`,
                index: 1,
                routes: "tlinvoice",
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
      sort: true,
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendcreatedtl", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendcreatedtl");
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
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendcreatedtl", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendcreatedtl");
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
      text: "Due date",
      dataField: "due_date",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendcreatedtl", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendcreatedtl");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }

        sortMessage(val, 4);
      },

      formatter: function (cell, row) {
        let dueDate = row.due_date.split("-").reverse().join("-");

        return <>{dueDate}</>;
      },
    },
    {
      text: "Amount",
      dataField: "paid_amount",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendcreatedtl", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendcreatedtl");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }

        sortMessage(val, 5);
      },
      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("en-IN");
        var x = row.paid_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },

    {
      text: "Action",
      dataField: "",

      formatter: function (cell, row) {
        return (
          <>
            <div style={{ display: "flex" }} onClick={() => addTdsToggle(row)}>
              <ActionIcon titleName="Create Invoice" />
            </div>
          </>
        );
      },
    },
  ];
  const resetPaging = () => {
    setPage(1);
    setBig(1);

    localStorage.removeItem("tlint2");
    localStorage.removeItem("accendcreatedtl");
    localStorage.removeItem("sortedValuetl2");
    localStorage.removeItem("previn2");
    getProposalList(1);
  };
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getProposalList(1);
    localStorage.setItem("tlint2", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getProposalList(page - 1);
    localStorage.setItem("tlint2", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    localStorage.setItem("tlint2", Number(page) + 1);
    getProposalList(page + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getProposalList(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("tlint2", defaultPage.at(-1));
  };
  function headerLabelFormatter(column, colIndex) {
    let isActive = true;
    if (
      localStorage.getItem("accendcreatedtl") === column.dataField ||
      localStorage.getItem("tlprevint2") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("tlprevint2", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("accendcreatedtl") === column.dataField ? (
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
  return (
    <>
      <Card>
        <CardHeader>
          <InvoiceFilter
            setData={setProposal}
            getData={getProposalList}
            setRec={setRecords}
            records={records}
            invoice="tlcreate"
            userid={JSON.parse(userid)}
            localPage="tlint2"
            setDefaultPage={setDefaultPage}
            resetPaging={resetPaging}
            setCountNotification={setCountNotification}
            page={page}
            setPage={setPage}
            setBig={setBig}
            setEnd={setEnd}
          />
          {proposal.length > 0 ? (
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
                            localStorage.setItem("tlint2", e.target.value);
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
          ) : (
            <Row>
              <Col md="6"></Col>
              <Col md="6" align="right">
                <span className="customPaginationSpan">0 - 0 of 0</span>
              </Col>
            </Row>
          )}
        </CardHeader>

        <CardBody>
          <DataTablepopulated
            bgColor="#42566a"
            keyField="id"
            data={proposal}
            columns={columns}
          ></DataTablepopulated>

          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getProposalList}
          />
          <Tds
            tdsForm={tdsForm}
            addTdsToggle={addTdsToggle}
            id={id}
            paidAmount={paidAmount}
            report={assignNo}
            installmentNo={installmentNo}
            billNo={billNo}
            gstNo={gstNo}
            tabIndex22={1}
            updateTab={updateTab}
            getProposalList={getProposalList}
          />
        </CardBody>
      </Card>
    </>
  );
};
export default Invoice;
