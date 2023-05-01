import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import BootstrapTable from "react-bootstrap-table-next";
import TaxProfessionalFilter from "../../../components/Search-Filter/tpfilter";
import ChatHistory from "./ChatHistory";
import DiscardReport from "../AssignmentTab/DiscardReport";
import CommonShowProposal from "../../../components/commonShowProposal/CommonShowProposal";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  EyeIcon,
  ViewDiscussionIcon,
  EditQuery,
  ActionIcon,
} from "../../../components/Common/MessageIcon";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Paginator from "../../../components/Paginator/Paginator";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));

function InprogressProposal() {
  const userid = window.localStorage.getItem("tpkey");
  const allEnd = Number(localStorage.getItem("tp_record_per_page"));
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [proposal, setProposal] = useState([]);
  const [id, setId] = useState(null);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

  const [count, setCount] = useState("0");
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState('');
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");

  const [addPaymentModal, setPaymentModal] = useState(false);
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [viewProposalModal, setViewProposalModal] = useState(false);
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const [proposalId, setProposalId] = useState();
  const chatHandler = (key) => {
    setPaymentModal(!addPaymentModal);
    setId(key.assign_no);
  };

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key)
    }
  };

  function headerLabelFormatter(column) {
    // let reverse = "Exp_Delivery_Date"
    return(
      <div>
      {column.dataField === isActive ?
        (
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
        )
        :
        (
          <div className="d-flex text-white w-100 flex-wrap">
            {column.text}
            {accend === column.dataField ? (
              <ArrowDropDownIcon />
            ) : (
              <ArrowDropUpIcon />
            )}
          </div>
        )
      }
      </div>
    )
  }

  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo]
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: 'center' });
    }
  }, [ViewDiscussion]);

  const showProposalModal2 = (e) => {
    console.log("eeee");
    setViewProposalModal(!viewProposalModal);
    setProposalId(e.id);
    setScrolledTo(e.assign_no);
  };

  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo]
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: 'center' });
    }
  }, [viewProposalModal]);

  useEffect(() => {
    let pageno = JSON.parse(localStorage.getItem("tpProposal2"));
    let arrow = localStorage.getItem("tpArrowProposal2")
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    let sortVal = JSON.parse(localStorage.getItem("freezetpProposal2"));
    if (!sortVal) {
      let sort = {
        val: 0,
        field: 1,
      };
      localStorage.setItem("freezetpProposal2", JSON.stringify(sort));
    }

    if (pageno) {
      getProposalList(pageno);
    } else {
      getProposalList(1);
    }

    // getProposalList(1);
  }, []);

  const getProposalList = (e) => {
    let data = JSON.parse(localStorage.getItem("searchDatatpproposal2"));
    let pagetry = JSON.parse(localStorage.getItem("freezetpProposal2"))
    localStorage.setItem(`tpQuery1`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);

    if ((data) && (!pagetry)) {
      remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(userid)}&cat_id=${data.store
        }&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
            ?.split("-")
            .reverse()
            .join("-")}&status=1&pcat_id=${data.pcatId}&qno=${data.query_no
        }`
    } else if ((data) && (pagetry)) {
      remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(userid)}&cat_id=${data.store
        }&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
            ?.split("-")
            .reverse()
            .join("-")}&status=1&pcat_id=${data.pcatId}&qno=${data.query_no
        }&orderby=${val}&orderbyfield=${field}`
    } else if ((!data) && (pagetry)) {
      remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(userid)}&status=1&orderby=${val}&orderbyfield=${field}`
    } else {
      remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(userid)}&status=1`
    }

    // if (data) {
    //   remainApiPath = `tl/getProposalTl?tp_id=${JSON.parse(
    //     userid
    //   )}&status=1&cat_id=${data.store}&from=${data.fromDate
    //     ?.split("-")
    //     .reverse()
    //     .join("-")}&to=${data.toDate
    //       ?.split("-")
    //       .reverse()
    //       .join("-")}&pcat_id=${data.pcatId}&qno=${data.query_no}`
    // }
    // else{
    //   remainApiPath = `tl/getProposalTl?tp_id=${JSON.parse(userid)}&status=1`
    // }

    // if (!data) {
    axios
      .get(
        `${baseUrl}/${remainApiPath}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let data = res.data.result;
          setRecords(res.data.result.length);
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
          setCount(res.data?.total);
          // setRecords(res.data.result.length);
        }
      });

  };

  const sortMessage = (val, field) => {
    console.log("Sorting...");
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    localStorage.setItem(`tpProposal2`, JSON.stringify(1))
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    }
    localStorage.setItem(`freezetpProposal2`, JSON.stringify(obj));
    localStorage.setItem(`tpProposal2`, JSON.stringify(1));
    let data = JSON.parse(localStorage.getItem("searchDatatpproposal2"));
    if (data) {
      remainApiPath = `tl/getProposalTl?tp_id=${JSON.parse(userid)}&cat_id=${data.store
        }&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
            ?.split("-")
            .reverse()
            .join("-")}&status=1&pcat_id=${data.pcatId}&qno=${data.query_no
        }&orderby=${val}&orderbyfield=${field}`
    } else {
      remainApiPath = `tl/getProposalTl?tp_id=${JSON.parse(userid)}&status=1&orderby=${val}&orderbyfield=${field}`
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
          res.data.result.map((i) => {
            let data = {
              ...i,
              cid: sortId,
            };
            sortId++;
            all.push(data);
          });
          setProposal(all);
          setTurnGreen(true);
          setresetTrigger(!resetTrigger);
        }
      });


  }

  const columns = [
    {
      text: "S.no",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return <div id={row.assign_no} ref={el => (myRef.current[row.assign_no] = el)}>{row.cid}</div>;
      },
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "query_date",
      text: "Query date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowProposal2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal2");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },

      formatter: function dateFormat(cell, row) {
        var oldDate = row.query_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
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
                pathname: `/taxprofessional_queries/${row.id}`,
                index: 1,
                routes: "proposal",
              }}
            >
              {row.assign_no}
            </Link>
          </>
        );
      },
    },
    {
      text: "Category",
      dataField: "parent_id",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowProposal2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal2");
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
      text: "Sub category",
      dataField: "cat_name",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowProposal2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal2");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 4);
      },
    },
    {
      text: "Payment  plan",
      dataField: "paymnet_plan_code",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowProposal2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal2");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 5);
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
      text: "Date of proposal",
      dataField: "DateofProposal",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowProposal2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal2");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 6);
      },

      formatter: function dateFormat(cell, row) {
        var oldDate = row.DateofProposal;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Date of acceptance / decline of proposal",
      dataField: "cust_accept_date",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowProposal2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal2");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 7);
      },

      formatter: function dateFormat(cell, row) {
        var oldDate = row.cust_accept_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Status",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowProposal2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal2");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 8);
      },

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.status}/
              {row.status == "Inprogress" ? (
                <p className="inprogress">{row.statusdescription}</p>
              ) : row.status == "Customer Declined; Proposal" ? (
                <p className="declined">{row.statusdescription}</p>
              ) : row.status == "Accepted; Proposal" ? (
                <p className="completed">{row.statusdescription}</p>
              ) : null}
            </div>
          </>
        );
      },
    },
    {
      dataField: "",
      text: "Proposed amount",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowProposal2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal2");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 9);
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.ProposedAmount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      dataField: "accepted_amount",
      text: "Accepted amount ",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowProposal2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal2");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 10);
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.accepted_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      text: "Action",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px", width: "110px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div style={{ display: "flex" }}>
              <Link
                to={{
                  pathname: `/taxprofessional_chatting/${row.id}`,
                  index: 1,
                  routes: "proposal",
                  obj: {
                    message_type: "2",
                    query_No: row.assign_no,
                    query_id: row.id,
                    routes: `/taxprofessional/proposal`,
                  },
                }}
              >
                <MessageIcon />
              </Link>

              <div
                onClick={() => ViewDiscussionToggel(row.assign_no)}
                className="ml-1"
              >
                <ViewDiscussionIcon />
              </div>

              <div className="ml-2">
                {row.status_code == "4" ? (
                  <Link
                    to={{
                      pathname: `/taxprofessional_edit-proposal/${row.id}`,
                      index: 1,
                      routes: "proposal",
                    }}
                  >
                    <EditQuery titleName="Edit Proposal" />
                  </Link>
                ) : row.status_code == "2" && row.work_by != "0" ? (
                  <Link
                    to={{
                      pathname: `/taxprofessional_sendproposal/${row.id}`,
                      index: 1,
                      routes: "proposal",
                    }}
                  >
                    <ActionIcon titleName="Dicision on propsal" />
                  </Link>
                ) : null}
              </div>

              {row.status_code > "3" || row.status_code == "10" ? (
                <>
                  <div
                    onClick={(e) => showProposalModal2(row)}
                    title="View Proposal"
                  >
                    <EyeIcon />
                  </div>
                </>
              ) : null}
            </div>
          </>
        );
      },
    },
  ];

  const resetTriggerFunc = () => {
    setresetTrigger(!resetTrigger);
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem("tpPropsosal2");
    localStorage.removeItem(`freezetpProposal2`);
    localStorage.removeItem("tpArrowProposal2");
  }

  return (
    <Card>
      <CardHeader>
          <TaxProfessionalFilter
            setData={setProposal}
            getData={getProposalList}
            InprogressProposal="InprogressProposal"
            setRecords={setRecords}
            records={records}
            index="tpproposal2"
            setCount={setCount}
            resetTriggerFunc={resetTriggerFunc}
          />
      </CardHeader>
      <CardBody>
      <Row className="mb-2">
          <Col md="12" align="right">
            <Paginator
              setData={setProposal}
              getData={getProposalList}
              InprogressProposal="InprogressProposal"
              setRecords={setRecords}
              records={records}
              index="tpproposal2"
              count={count}
              setOnPage={setOnPage}
              // resetPaging={resetPaging}
              resetTrigger={resetTrigger}
              setresetTrigger={setresetTrigger}
            />
          </Col>
        </Row>
        <DataTablepopulated
          bgColor="#5f7b97"
          keyField={"assign_no"}
          data={proposal}
          columns={columns}
        ></DataTablepopulated>

        <ChatHistory
          chatHandler={chatHandler}
          addPaymentModal={addPaymentModal}
          qno={id}
        />

        <DiscardReport
          ViewDiscussionToggel={ViewDiscussionToggel}
          ViewDiscussion={ViewDiscussion}
          report={assignNo}
          getData={getProposalList}
          headColor="#5f7b97"
        />
        {viewProposalModal === true ? (
          <CommonShowProposal
            setViewProposalModal={setViewProposalModal}
            viewProposalModal={viewProposalModal}
            showProposalModal2={showProposalModal2}
            panel="taxprofessional"
            proposalId={proposalId}
          />
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
}
export default InprogressProposal;
