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
import Paginator from "../../../components/Paginator/Paginator";

const CreateInvoice = () => {
  const userid = window.localStorage.getItem("tpkey");
  const allEnd = Number(localStorage.getItem("tp_record_per_page"));
  const [records, setRecords] = useState([]);
  const [proposal, setProposal] = useState([]);
  // const [count, setCount] = useState("");
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

  const [id, setId] = useState();
  const [tds, setTds] = useState(false);

  const [count, setCount] = useState("0");
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState('');
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);

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
      setScrolledTo(key.id)
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
    let runTo = myRef.current[scrolledTo]
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: 'center' });
  }, [tdsForm]);

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
  };

  useEffect(() => {
    let pageno = JSON.parse(localStorage.getItem("tpInvoice2"));
    let arrow = localStorage.getItem("tpArrowInvoice2")
    if (arrow) {
      setAccend(arrow);
    }
    let sortVal = JSON.parse(localStorage.getItem("freezetpInvoice2"));
    if (!sortVal) {
      let sort = {
        val: 0,
        field: 1,
      };
      localStorage.setItem("freezetpInvoice2", JSON.stringify(sort));
    }
    if (pageno) {
      getProposalList(pageno);
    } else {
      getProposalList(1);
    }
    // getProposalList();
  }, []);

  const getProposalList = (e) => {
    let data = JSON.parse(localStorage.getItem("tpcreate"));
    let pagetry = JSON.parse(localStorage.getItem("freezetpInvoice1"));
    localStorage.setItem(`tpInvoice1`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);
    if ((!data) && (!pagetry)) {
      remainApiPath = `tl/getPaymentDetail?page=${e}&tp_id=${JSON.parse(
        userid
      )}&invoice=0`
    } else if ((!data) && (pagetry)) {
      remainApiPath = `tl/getPaymentDetail?page=${e}&tp_id=${JSON.parse(
        userid
      )}&invoice=0&orderby=${val}&orderbyfield=${field}`
    } else { }

    axios
      .get(
        `${baseUrl}/${remainApiPath}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let data = res.data.payment_detail;
          // setRecords(res.data.result.length);
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
          setRecords(res.data.payment_detail.length);
          setCount(res.data.total);
        }
      });

  };
  function headerLabelFormatter(column) {
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        {column.text}
        {accend === column.dataField ? (
          <ArrowDropDownIcon />
        ) : (
          <ArrowDropUpIcon />
        )}
      </div>
    );
  }

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    }
    localStorage.setItem(`tpInvoice2`, JSON.stringify(1))
    localStorage.setItem(`freezetpInvoice2`, JSON.stringify(obj));
    let searchData = JSON.parse(localStorage.getItem("tpcreate"));

    if (
      searchData?.installment_no ||
      searchData?.opt ||
      searchData?.p_dateFrom ||
      searchData?.p_dateTo ||
      searchData?.query_no
    ) {
      remainApiPath = `tl/getPaymentDetail?&invoice=0&qno=${searchData.query_no}&from=${searchData.p_dateFrom}&to=${searchData.p_dateTo}&installment_no=${searchData?.installment_no}&orderby=${val}&orderbyfield=${field}`;
    }
    else {
      remainApiPath = `tl/getPaymentDetail?page=1&tp_id=${JSON.parse(
        userid
      )}&invoice=0&orderby=${val}&orderbyfield=${field} `
    }
    axios
      .get(
        `${baseUrl}/${remainApiPath}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
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
          setresetTrigger(!resetTrigger);
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
      text: "Installment no",
      dataField: "installment_no",
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
    setresetTrigger(!resetTrigger);
    localStorage.removeItem("tpInvoice2");
    localStorage.removeItem(`freezetpInvoice2`);
    localStorage.removeItem("tpArrowInvoice2");
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <InvoiceFilter
              setData={setProposal}
              getData={getProposalList}
              invoice="tpcreate"
              setRec={setRecords}
              records={records}
              userid={JSON.parse(userid)}
              resetPaging={resetPaging}
            />
          </Row>
          <Row>
            <Col md="12" align="right">
              <Paginator
                setData={setProposal}
                getData={getProposalList}
                invoice="tpcreate"
                index="tpInvoice2"
                tpcreate="tpcreate"
                setRec={setRecords}
                records={records}
                userid={JSON.parse(userid)}
                count={count}
                setOnPage={setOnPage}
                resetTrigger={resetTrigger}
                setresetTrigger={setresetTrigger}
                resetPaging={resetPaging}
              />
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
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
