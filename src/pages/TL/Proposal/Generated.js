import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import ChatHistory from "./ChatHistory";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DiscardReport from "../AssignmentTab/DiscardReport";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import Tds from "./Tds";
import InvoiceFilter from "../../../components/Search-Filter/InvoiceFilter";
import moment from "moment";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  EyeIcon,
  ViewDiscussionIcon,
  DiscussProposal,
  HelpIcon,
  EditQuery,
  ActionIcon,
} from "../../../components/Common/MessageIcon";

const Generated = ({ updateTab }) => {
  var rowStyle2 = {};
  const userid = window.localStorage.getItem("tlkey");
  const [records, setRecords] = useState([]);
  const [proposal, setProposal] = useState([]);
  const [count, setCount] = useState("");
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
  const [scrolledTo, setScrolledTo] = useState("")
  const [lastDown, setLastDown] = useState("")
  const myRef = useRef([])
  const myRefs = useRef([])

  const addTdsToggle = (key) => {
    setTdsForm(!tdsForm);
    if (key) {
      setGstinNo(key.gstin_no);
      setCopy(0);
      setAssignNo(key.assign_no);
      setPaidAmount(key.paid_amount);
      setId(key.id);
      setInstallmentNo(key.installment_no);
      setBillNo(key.billno);
      setId2(key.id);
      if (tdsForm === false) {
        console.log("Rendered AllQ", key);
        setScrolledTo(key.assign_no)
        console.log("Scrolled To AllQ", scrolledTo)
      } else {
        console.log("Scrolled To Else AllQ", scrolledTo)
        var element = document.getElementById(scrolledTo);
        if (element) {
          console.log(myRef.current[scrolledTo], "ref element array")
        }
      }
    }
   
  };

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
  };

  useEffect(() => {
    // if (tdsForm === false) {
      console.log("Scrolled To Else AllQ", scrolledTo)
      var element = document.getElementById(scrolledTo);
      if (element) {
        console.log("red", element);
        console.log(myRef.current[scrolledTo], "ref element array")
        let runTo = myRef.current[scrolledTo]
        runTo.scrollIntoView(false);
        runTo.scrollIntoView({ block: 'center' });
      }
    // }
  }, [tdsForm]);

  useEffect(() => {
    const tlInFilterData = JSON.parse(localStorage.getItem(`searchDataI1`));
    if (tlInFilterData) {
      console.log("Not called in Complete Data invoice axios");
    } else {
    getProposalList();
    }
  }, []);
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getProposalList = () => {
    
      axios
        .get(
          `${baseUrl}/tl/getPaymentDetail?tl_id=${JSON.parse(userid)}&invoice=1`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setProposal(res.data.payment_detail);
            setRecords(res.data.payment_detail.length);
          }
        });
    
  }

  const downloadpdf = (qno, id, installmentNumber) => {
    setCopy(0);
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
  const columns = [
    {
      text: "S.no",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return <div id={row.assign_no} ref={el => (myRef.current[row.assign_no] = el)}>{rowIndex + 1}</div>;
      },
      style: {
        fontSize: "11px",
      },
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
                pathname: `/teamleader_queries/${row.assign_id}`,
                index: 0,
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
      text: "Installment no",
      dataField: "installment_no",
      sort: true,
    },
    {
      text: "Invoice no",
      dataField: "billno",
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
        var nfObject = new Intl.NumberFormat("en-IN");
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
        var nfObject = new Intl.NumberFormat("en-IN");
        var x = row.tds_amount;

        return (
          <>
            {row.is_paid === "0" ? (
              <p className="rightAli"></p>
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
            {row.is_paid === "0" ? (
              <p>Unpaid</p>
            ) : (
              <>
                {row.is_paid === "1" ? (
                  <p>Paid</p>
                ) : (
                  <p className="declined">Declined</p>
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
              {row.is_paid === "0" ? (
                <div className="mx-1" onClick={() => addTdsToggle(row)}
                  // id={row.id}
                  // ref={el => (myRefs.current[row.id] = el)}
                >
                  <EditQuery title="Edit Invoice" />
                </div>
              ) : (
                ""
              )}
              {row.is_paid === "0" && row.paymenturl !== null ? (
                <span title={row.paymenturl}>
                  {copy === row.id ? (
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
  };
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
            invoice="generated"
            setRec={setRecords}
            panel="teamleader"
            records={records}
            userid={JSON.parse(userid)}
            index={1}
          />
        </CardHeader>

        <CardBody>
          <DataTablepopulated
            bgColor="#42566a"
            keyField="id"
            rowStyle2={rowStyle2}
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
            generated={"edited"}
            gstNo={gstNo}
            updateTab={updateTab}
            getProposalList={getProposalList}
          />
        </CardBody>
      </Card>
    </>
  );
};
export default Generated;
