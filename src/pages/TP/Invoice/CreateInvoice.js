import React, { useState, useEffect,useRef} from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import Tds from "./Tds";
import InvoiceFilter from "../../../components/Search-Filter/InvoiceFilter";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
const CreateInvoice = () => {
  const userid = window.localStorage.getItem("tpkey");
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
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
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
      if (tdsForm === false) {
        console.log("Rendered CI", key);
        setScrolledTo(key.assign_no)
      }else{
        console.log("Scrolled To Else CI", scrolledTo)
        var element = document.getElementById(scrolledTo);
        if (element){
          console.log(myRef.current[scrolledTo],"ref element array")
        }
      }
    }
  };

  useEffect(() => {
    if (tdsForm === false) {
      console.log("Scrolled To Else AllQ", scrolledTo)
      var element = document.getElementById(scrolledTo);
      if (element){
        console.log("red",element);
        console.log(myRef.current[scrolledTo],"ref element array")
        let runTo=myRef.current[scrolledTo]
        runTo.scrollIntoView({ block: 'center' });
    }
    }
  }, [tdsForm]);

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
  };

  useEffect(() => {
    const tpInvoiceFilterData = JSON.parse(localStorage.getItem(`searchTpDataI2`));
    if (tpInvoiceFilterData) {
      console.log("Tp Data I 1 found");
    }else{
    getProposalList();
    }
  }, []);

  const getProposalList = () => {
    axios
      .get(
        `${baseUrl}/tl/getPaymentDetail?tp_id=${JSON.parse(userid)}&invoice=0`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setProposal(res.data.payment_detail);
          setRecords(res.data.payment_detail.length);
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
        return { fontSize: "11px", width: "60px" };
      },
    },

    {
      text: "Query no",
      dataField: "assign_no",
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
      sort: true,
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
      sort: true,
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
      sort: true,
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
            index={2}
          />
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
