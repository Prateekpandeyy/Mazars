import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import "./index.css";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import Records from "../../components/Records/Records";
import DiscardReport from "../AssignmentTab/DiscardReport";
import CommonShowProposal from "../../components/commonShowProposal/CommonShowProposal";
import ModalManual from "../ModalManual/AllComponentManual";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import MessageIcon, {
  EyeIcon,
  ViewDiscussionIcon,
  HelpIcon,
} from "../../components/Common/MessageIcon";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
import CommonServices from "../../common/common";
import PaginatorCust from "../../components/Paginator/PaginatorCust";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));

function AcceptedProposal() {
  let history = useHistory();
  const userId = window.localStorage.getItem("userid");
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const [proposalCount, setCountProposal] = useState("");
  const [records, setRecords] = useState([]);

  const [id, setId] = useState(null);
  const [reject, setRejected] = useState(true);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

  const allEnd = Number(localStorage.getItem("cust_record_per_page"));
  const classes = useStyles();
  // const allEnd = 50;
  const [count, setCount] = useState(0);
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState("");
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [prev, setPrev] = useState("");

  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [viewProposalModal, setViewProposalModal] = useState(false);
  const [proposalId, setProposalId] = useState();
  const [openManual, setManual] = useState(false);
  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const needHelp = () => {
    setManual(!openManual);
  };
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key);
    }
  };
  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [ViewDiscussion]);

  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("custArrowProposal3") === column.dataField ||
      localStorage.getItem("prevcustp3") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevcustp3", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("custArrowProposal3") === column.dataField ? (
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

  useEffect(() => {
    let pageno = JSON.parse(localStorage.getItem("custProposal3"));
    let arrow = localStorage.getItem("custArrowProposal3");
    let pre = localStorage.getItem("prevcustp3");
    if (pre) {
      setPrev(pre);
    }
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    // if (!local) {
    if (pageno) {
      getProposalData(pageno);
    } else {
      getProposalData(1);
    }
    // }
  }, []);

  const showProposalModal2 = (e) => {
    // console.log(e.assign_no, "eeee");
    setViewProposalModal(!viewProposalModal);
    setProposalId(e.q_id);
    setScrolledTo(e.assign_no);
  };
  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [viewProposalModal]);

  const getProposalData = (e) => {
    if (e === undefined) {
      // console.log(e, "e");
      e = 1;
    }
    let data = JSON.parse(localStorage.getItem("searchDatacustProposal3"));
    let pagetry = JSON.parse(localStorage.getItem("freezecustProposal3"));
    localStorage.setItem(`custProposal3`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);

    if (data && !pagetry) {
      remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${
        data.toDate
      }&status=2&pcat_id=${data.pcatId}`;
    } else if (data && pagetry) {
      remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${
        data.toDate
      }&status=2&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
    } else if (!data && pagetry) {
      remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
        userId
      )}&status=2&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
        userId
      )}&status=2`;
    }

    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        let all = [];
        let customId = 1;
        if (e > 1) {
          customId = allEnd * (e - 1) + 1;
        }
        let data = res.data.result;
        data.map((i) => {
          let data = {
            ...i,
            cid: customId,
          };
          customId++;
          all.push(data);
        });
        setProposalDisplay(all);
        setCount(res.data.total);
        setCountProposal(res.data.result.length);
        setRecords(res.data.result.length);
      } else if (res.data.code === 0) {
        CommonServices.clientLogout(history);
      }
    });
  };

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    localStorage.setItem(`custProposal3`, JSON.stringify(1));
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    };
    localStorage.setItem(`freezecustProposal3`, JSON.stringify(obj));
    let data = JSON.parse(localStorage.getItem("searchDatacustProposal3"));

    if (data) {
      remainApiPath = `customers/getProposals?page=1&uid=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${
        data.toDate
      }&status=2&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `customers/getProposals?page=1&uid=${JSON.parse(
        userId
      )}&status=2&orderby=${val}&orderbyfield=${field}`;
    }

    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
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
        setProposalDisplay(all);
        setTurnGreen(true);
        setresetTrigger(!resetTrigger);
      }
    });
  };

  const columns = [
    {
      text: "S.No",
      dataField: "",

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
        return {
          width: "50px",
        };
      },
    },
    {
      text: "Date",
      dataField: "created",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowProposal3", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposal3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },

      formatter: function (cell, row) {
        var oldDate = row.created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Query No",
      dataField: "assign_no",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/customer_my-assingment/${row.q_id}`,
                index: 0,
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowProposal3", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposal3");
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
      text: "Sub Category",
      dataField: "cat_name",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowProposal3", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposal3");
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowProposal3", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposal3");
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
      text: "Date of Proposal",
      dataField: "DateofProposal",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowProposal3", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposal3");
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
      text: "Date of acceptance of Proposal",
      dataField: "cust_accept_date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowProposal3", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposal3");
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

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div className="completed">{row.status}</div>
          </>
        );
      },
    },
    {
      text: "Proposed Amout",
      dataField: "ProposedAmount",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowProposal3", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposall3");
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
        // console.log(nfObject.format(x));
        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      text: "Accepted Amount",
      dataField: "accepted_amount",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowProposal3", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposal3");
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
        // console.log(nfObject.format(x));
        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      text: "Action",
      dataField: "",

      formatter: function (cell, row) {
        return (
          <>
            {row.statuscode === "6" ? (
              <>
                <span className="ml-1" title="Send Message">
                  <Link
                    to={{
                      pathname: `/customer_chatting/${row.q_id}&type=2`,
                      index: 0,
                      routes: "proposal",
                      obj: {
                        message_type: "3",
                        query_No: row.assign_no,
                        query_id: row.q_id,
                        routes: `/customer/proposal`,
                      },
                    }}
                  >
                    <MessageIcon />
                  </Link>
                </span>
                <span
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                  className="ml-1"
                >
                  <ViewDiscussionIcon />
                </span>
              </>
            ) : (
              <>
                <span className="ml-1" title="Send Message">
                  <Link
                    to={{
                      pathname: `/customer_chatting/${row.q_id}&type=2`,
                      index: 0,
                      routes: "proposal",
                      obj: {
                        message_type: "3",
                        query_No: row.assign_no,
                        query_id: row.q_id,
                        routes: `/customer/proposal`,
                      },
                    }}
                  >
                    <MessageIcon />
                  </Link>
                </span>

                <span
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                  className="ml-1"
                >
                  <ViewDiscussionIcon />
                </span>

                {row.statuscode > 6 ? (
                  <>
                    <span
                      onClick={(e) => showProposalModal2(row)}
                      className="ml-1"
                    >
                      <EyeIcon />
                    </span>
                  </>
                ) : null}
              </>
            )}
          </>
        );
      },
    },
  ];

  const resetTriggerFunc = () => {
    setresetTrigger(!resetTrigger);
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem("custProposal3");
    localStorage.removeItem(`freezecustProposal3`);
    localStorage.removeItem("custArrowProposal3");
    localStorage.removeItem("prevcustp3");
    setPrev("");
  };

  return (
    <Card>
      <CardHeader>
        <span onClick={(e) => needHelp()}>
          {" "}
          <HelpIcon />
        </span>
        <CustomerFilter
          setData={setProposalDisplay}
          getData={getProposalData}
          id={userId}
          acceptedProposal="acceptedProposal"
          records={records}
          setRecords={setRecords}
          index="custProposal3"
          resetTriggerFunc={resetTriggerFunc}
          setCount={setCount}
        />
      </CardHeader>
      <CardBody>
        {/* <Records records={records} /> */}
        <Row className="mb-2">
          <Col md="12" align="right">
            <PaginatorCust
              count={count}
              id={userId}
              setData={setProposalDisplay}
              getData={getProposalData}
              index="custProposal3"
              acceptedProposal="acceptedProposal"
              setOnPage={setOnPage}
              resetTrigger={resetTrigger}
              setresetTrigger={setresetTrigger}
            />
          </Col>
        </Row>
        <DataTablepopulated
          bgColor="#5f7b97"
          keyField={"assign_no"}
          data={proposalDisplay}
          columns={columns}
        ></DataTablepopulated>
        <DiscardReport
          ViewDiscussionToggel={ViewDiscussionToggel}
          ViewDiscussion={ViewDiscussion}
          report={assignNo}
          getData={getProposalData}
          headColor="#5f7b97"
        />
      </CardBody>
      {viewProposalModal === true ? (
        <CommonShowProposal
          setViewProposalModal={setViewProposalModal}
          viewProposalModal={viewProposalModal}
          showProposalModal2={showProposalModal2}
          proposalId={proposalId}
        />
      ) : (
        ""
      )}
      <Modal
        isOpen={openManual}
        toggle={needHelp}
        style={{ display: "block", position: "absolute", left: "280px" }}
        size="lg"
      >
        <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
        <ModalBody>
          <ModalManual tar={"proposalProcessing"} />
        </ModalBody>
      </Modal>
    </Card>
  );
}

export default AcceptedProposal;
