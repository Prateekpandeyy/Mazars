import React, { useState, useEffect } from "react";
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
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  EyeIcon,
  ViewDiscussionIcon,
  EditQuery,
  ActionIcon,
} from "../../../components/Common/MessageIcon";

const Invoice = (updateTab) => {
  const userid = window.localStorage.getItem("tlkey");
  const [records, setRecords] = useState([]);
  const [proposal, setProposal] = useState([]);
  const [count, setCount] = useState("");

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

  const addTdsToggle = (key) => {
    setTdsForm(!tdsForm);
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
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
  };

  useEffect(() => {
    getProposalList();
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
        `${baseUrl}/tl/getPaymentDetail?tl_id=${JSON.parse(userid)}&invoice=0`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setProposal(res.data.payment_detail);

          setRecords(res.data.payment_detail.length);
        }
      });
  };
  const [hasinput , setHasinput]=useState(false);
  console.log(hasinput,"has not changed the filter")
  function handlecallback(){
    setHasinput(true)
    console.log(hasinput,"has changed the filter")
  }

  const columns = [
    {
      text: "S.no",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
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
            hasinput={hasinput}
          />
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
            handlecallback={handlecallback}
          />
        </CardBody>
      </Card>
    </>
  );
};
export default Invoice;
