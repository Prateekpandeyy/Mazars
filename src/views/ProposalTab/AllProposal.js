import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";

import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import "./index.css";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import Records from "../../components/Records/Records";
import Swal from "sweetalert2";
import ViewComponent from "./ViewComponent";
import DiscardReport from "../AssignmentTab/DiscardReport";
import CommonShowProposal from "../../components/commonShowProposal/CommonShowProposal";
import ModalManual from "../ModalManual/AllComponentManual";
import PaginatorCust from "../../components/Paginator/PaginatorCust";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import MessageIcon, {
  EyeIcon,
  ViewDiscussionIcon,
  DiscussProposal,
  HelpIcon,
} from "../../components/Common/MessageIcon";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
import CommonServices from "../../common/common";
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
function ProposalTab() {
  let history = useHistory();
  const userId = window.localStorage.getItem("userid");
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const [proposalCount, setCountProposal] = useState("");
  const [records, setRecords] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");

  const [count, setCount] = useState("0");
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState("");
  const [accend, setAccend] = useState(false);
  const [resetTrigger, setresetTrigger] = useState(false);

  const [viewData, setViewData] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [viewProposalModal, setViewProposalModal] = useState(false);
  const [openManual, setManual] = useState(false);
  const [proposalId, setProposalId] = useState();
  const token = window.localStorage.getItem("clientToken");

  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const allEnd = Number(localStorage.getItem("cust_record_per_page"));
  const classes = useStyles();
  // const allEnd = 50;
  const [prev, setPrev] = useState("");

  const ViewHandler = (key) => {
    setViewModal(!viewModal);
    setViewData(key);
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
      localStorage.getItem("custArrowProposal1") === column.dataField ||
      localStorage.getItem("prevcustp1") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevcustp1", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("custArrowProposal1") === column.dataField ? (
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

  const showProposalModal2 = (e) => {
    // setViewProposalModal(!viewProposalModal);
    // setProposalId(e)
    const token = window.localStorage.getItem("clientToken");
    const myConfig = {
      headers: {
        uit: token,
        "Content-Type": "application/octet-stream",
      },
      responseType: "blob",
    };

    axios
      .get(`${baseUrl}/customers/dounloadpdf?id=${e}&viewpdf=1`, myConfig)
      .then((res) => {
        if (res.status === 200) {
          window.URL = window.URL || window.webkitURL;
          var url = window.URL.createObjectURL(res.data);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = url;
          a.setAttribute("download", "Proposal.pdf");
          a.setAttribute("target", "_blank");
          a.click();
        }
      });
  };

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem(`searchDatacustProposal1`));
    let pageno = JSON.parse(localStorage.getItem("custProposal1"));
    let arrow = localStorage.getItem("custArrowProposal1");
    let pre = localStorage.getItem("prevcustp1");
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

  const getProposalData = (e) => {
    if (e === undefined) {
      e = 1;
    }
    let data = JSON.parse(localStorage.getItem("searchDatacustProposal1"));
    let pagetry = JSON.parse(localStorage.getItem("freezecustProposal1"));
    localStorage.setItem(`custProposal1`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);
    if (data && !pagetry) {
      remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&status=${
        data.p_status
      }&pcat_id=${data.pcatId}`;
    } else if (data && pagetry) {
      remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&status=${
        data.p_status
      }&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
    } else if (!data && pagetry) {
      remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
        userId
      )}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `customers/getProposals?page=${e}&uid=${JSON.parse(
        userId
      )}`;
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
        setCount(res.data.total);
      } else if (res.data.code === 0) {
        CommonServices.clientLogout(history);
      }
    });
  };

  const needHelp = () => {
    setManual(!openManual);
  };
  const rightAli = {
    display: "flex",
    justifyContent: "flex-end",
    Border: "0px",
  };

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    localStorage.setItem(`custProposal1`, JSON.stringify(1));
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    };
    localStorage.setItem(`freezecustProposal1`, JSON.stringify(obj));
    let data = JSON.parse(localStorage.getItem("searchDatacustProposal1"));

    if (data) {
      remainApiPath = `customers/getProposals?page=1&uid=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&status=${
        data.p_status
      }&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `customers/getProposals?page=1&uid=${JSON.parse(
        userId
      )}&orderby=${val}&orderbyfield=${field}`;
    }

    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        let all = [];
        let sortId = 1;
        // let record =Number(localStorage.getItem("tp_record_per_page"))
        // let startAt = 1;
        // if (onPage > 1) {
        //   sortId = 1;
        // }
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
      dataField: "",
      text: "S.No",
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
          localStorage.setItem("custArrowProposal1", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposal1");
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
      // headerFormatter: headerLabelFormatter,
      // sort: true,
      // onSort: (field, order) => {
      //   let val = 0;
      //   if (accend !== field) {
      //     setAccend(field);
      //     setIsActive(field);
      //     localStorage.setItem("custArrowProposal1", field);
      //   } else {
      //     setAccend("");
      //     localStorage.removeItem("custArrowProposal1");
      //   }
      //   if (accend === field) {
      //     val = 0;
      //   } else {
      //     val = 1;
      //   }
      //   sortMessage(val, 2);
      // },

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
          localStorage.setItem("custArrowProposal1", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposalllll1");
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowProposal1", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposal1");
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
          localStorage.setItem("custArrowProposal1", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposal1");
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowProposal1", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposal1");
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowProposal1", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposall1");
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
      dataField: "status",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowProposal1", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposall1");
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
              {row.status == "Inprogress" ? (
                <div>
                  {row.status}/
                  <p className="inprogress">{row.statusdescription}</p>
                </div>
              ) : row.status == "Declined; Proposal" ? (
                <div>
                  <p className="declined">{row.status}</p>
                </div>
              ) : row.status == "Accepted; Proposal" ? (
                <div>
                  <p className="completed">{row.status}</p>
                </div>
              ) : null}
            </div>
          </>
        );
      },
    },
    {
      text: "Proposed amount",
      dataField: "ProposedAmount",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowProposallll1", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposal1");
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
      text: "Accepted amount",
      dataField: "accepted_amount",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowProposal1", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowProposal1");
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
                      onClick={(e) => showProposalModal2(row.q_id)}
                      className="ml-1"
                    >
                      <EyeIcon />
                    </span>
                  </>
                ) : null}

                {row.statuscode == 4 ? (
                  <span className="ml-1">
                    <Link
                      to={{
                        pathname: `/customer_proposal_view/${row.q_id}`,
                        index: 0,
                        routes: "proposal",
                      }}
                    >
                      <DiscussProposal titleName="Decision on Proposal" />
                    </Link>
                  </span>
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
    localStorage.removeItem("custProposal1");
    localStorage.removeItem(`freezecustProposal1`);
    localStorage.removeItem("custArrowProposal1");
    localStorage.removeItem("prevcustp1");
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
          proposal="proposal"
          index="custProposal1"
          records={records}
          setRecords={setRecords}
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
              index="custProposal1"
              proposal="proposal"
              setOnPage={setOnPage}
              resetTrigger={resetTrigger}
              setresetTrigger={setresetTrigger}
            />
          </Col>
        </Row>

        <DataTablepopulated
          bgColor="#42566a"
          keyField="id"
          data={proposalDisplay}
          columns={columns}
        ></DataTablepopulated>
        <ViewComponent
          ViewHandler={ViewHandler}
          viewModal={viewModal}
          viewData={viewData}
          getProposalData={getProposalData}
        />

        <DiscardReport
          ViewDiscussionToggel={ViewDiscussionToggel}
          ViewDiscussion={ViewDiscussion}
          report={assignNo}
          getData={getProposalData}
          headColor="#42566a"
        />
        {viewProposalModal === true ? (
          <CommonShowProposal
            setViewProposalModal={setViewProposalModal}
            viewProposalModal={viewProposalModal}
            showProposalModal2={showProposalModal2}
            panel="client"
            proposalId={proposalId}
          />
        ) : (
          ""
        )}
        <Modal isOpen={openManual} toggle={needHelp} size="lg">
          <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
          <ModalBody>
            <ModalManual tar={"proposalProcessing"} />
          </ModalBody>
        </Modal>
      </CardBody>
    </Card>
  );
}

export default ProposalTab;
