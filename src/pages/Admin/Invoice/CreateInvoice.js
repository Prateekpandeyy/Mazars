import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import DiscardReport from "../AssignmentTab/DiscardReport";
import Tds from "./Tds";
import InvoiceFilter from "../../../components/Search-Filter/InvoiceFilter";
import Records from "../../../components/Records/Records";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
const CreateInvoice = () => {
  const userid = window.localStorage.getItem("adminkey");
  const [proposal, setProposal] = useState([]);
  const [id, setId] = useState();
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [tdsForm, setTdsForm] = useState(false);
  const [paidAmount, setPaidAmount] = useState();
  const [installmentNo, setInstallmentNo] = useState();
  const [billNo, setBillNo] = useState();
  const [id2, setId2] = useState();
  const [gstNo, setGstinNo] = useState();
  const [records, setRecords] = useState([]);
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [accend, setAccend] = useState(false);
  const [atPage, setAtpage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
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
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
  };

  useEffect(() => {
    getProposalList();
  }, []);
  useEffect(() => {
    let localPage = Number(localStorage.getItem("admininvt1"));
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
    let searchData = JSON.parse(localStorage.getItem(`admincreate`));
    if (searchData) {
      remainApiPath = `/admin/getPaymentDetail?&invoice=0&page=${e}&cat_id=${
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
      remainApiPath = `admin/getPaymentDetail?&invoice=0&page=${e}`;
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
                index: 1,
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
    },
    {
      text: "Due date",
      dataField: "due_date",
      sort: true,

      formatter: function (cell, row) {
        let dueDate = row.due_date.split("-").reverse().join("-");

        return <>{dueDate}</>;
      },
    },
    {
      text: "Amount",
      dataField: "paid_amount",
      sort: true,

      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },
      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.paid_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
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
  return (
    <>
      <Card>
        <CardHeader>
          <InvoiceFilter
            setData={setProposal}
            getData={getProposalList}
            setRec={setRecords}
            records={records}
            invoice="admincreate"
            userid={JSON.parse(userid)}
            resetPaging={resetPaging}
            setCountNotification={setCountNotification}
          />
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
          {tdsForm && (
            <Tds
              tdsForm={tdsForm}
              addTdsToggle={addTdsToggle}
              id={id}
              paidAmount={paidAmount}
              report={assignNo}
              installmentNo={installmentNo}
              billNo={billNo}
              gstNo={gstNo}
            />
          )}
        </CardBody>
      </Card>
    </>
  );
};
export default CreateInvoice;
