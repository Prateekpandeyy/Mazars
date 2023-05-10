import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";

import { Card, CardHeader, CardBody,Col,Row} from "reactstrap";
import { Link } from "react-router-dom";
import "./index.css";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";

import Records from "../../components/Records/Records";
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

function InprogressProposal() {
  const userId = window.localStorage.getItem("userid");
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const [proposalCount, setCountProposal] = useState("");
  const [records, setRecords] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

  const [id, setId] = useState(null);
  const [reject, setRejected] = useState(true);

  // const allEnd = Number(localStorage.getItem("tl_record_per_page"));
  // const classes = useStyles();
  const allEnd = 50;
  const [count, setCount] = useState(0);
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState('');
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
      setScrolledTo(key)
    }
  };

  useEffect(() => {
      let runTo = myRef.current[scrolledTo]
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: 'center' });
}, [ViewDiscussion]);

  const showProposalModal2 = (e) => {
    console.log("eeee");
    setViewProposalModal(!viewProposalModal);
    setProposalId(e);
    console.log(e);
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo]
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: 'center' });
}, [viewProposalModal]);

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem(`searchDatacustProposal2`));
    if (!local) {
    getProposalData(1);
    }
  }, []);

  const getProposalData = (e) => {
    axios
      .get(
        `${baseUrl}/customers/getProposals?page=${e}&uid=${JSON.parse(userId)}&status=1`,
        myConfig
      )
      .then((res) => {
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
        }
      });
  };

  const columns = [
    {
      text: "S.No",
      dataField: "",

      formatter: (cellContent, row, rowIndex) => {
        return <div id={row.assign_no} 
        ref={el => (myRef.current[row.assign_no] = el)}>{row.cid}</div>;
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
      sort: true,

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
    },
    {
      text: "Sub Category",
      dataField: "cat_name",
      sort: true,
    },
    {
      text: "Payment  plan",
      dataField: "paymnet_plan_code",

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
      sort: true,

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
      sort: true,

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
            <div>
              {row.status == "Inprogress" ? (
                <div>
                  {row.status}/
                  <p className="inprogress">{row.statusdescription}</p>
                </div>
              ) : row.status == "Customer Declined; Proposal" ? (
                <div>
                  {row.status}
                  <p className="declined">{row.statusdescription}</p>
                </div>
              ) : row.status == "Accepted; Proposal" ? (
                <div>
                  {row.status}
                  <p className="completed">{row.statusdescription}</p>
                </div>
              ) : null}
            </div>
          </>
        );
      },
    },
    {
      text: "Proposed Amout",
      dataField: "ProposedAmount",
      sort: true,

      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },
      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.ProposedAmount;
        console.log(nfObject.format(x));
        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      text: "Accepted Amount",
      dataField: "accepted_amount",
      sort: true,

      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },
      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.accepted_amount;
        console.log(nfObject.format(x));
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
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <Link
                  to={{
                    pathname: `/customer_chatting/${row.q_id}&type=2`,
                    index: 1,
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

                <div
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                  className="ml-2"
                >
                  <ViewDiscussionIcon />
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <Link
                  to={{
                    pathname: `/customer_chatting/${row.q_id}&type=2`,
                    index: 1,
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

                <div
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                  className="ml-2"
                >
                  <ViewDiscussionIcon />
                </div>

                <div>
                  {row.statuscode > 6 ? (
                    <>
                      <div
                        className="ml-2"
                        onClick={(e) => showProposalModal2(row.q_id)}
                      >
                        <EyeIcon />
                      </div>
                    </>
                  ) : null}

                  {row.statuscode == 4 ? (
                    <div
                      style={{ cursor: "pointer" }}
                      title="Decision on Proposal"
                      className="ml-2"
                    >
                      <Link
                        to={{
                          pathname: `/customer_proposal_view/${row.q_id}`,
                          index: 1,
                          routes: "proposal",
                        }}
                      >
                        <DiscussProposal titleName="Prepare Proposal" />
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
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
    localStorage.removeItem("custPropsal2");
    localStorage.removeItem(`freezecustPropsal2`);
    localStorage.removeItem("custArrowPropsal2");
    localStorage.removeItem("prevcustPropsal2");
    setPrev("");
  }

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
          inprogressProposal="inprogressProposal"
          records={records}
          setRecords={setRecords}
          index="custProposal2"
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
              index="custProposal2"
              inprogressProposal="inprogressProposal"
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
      </CardBody>
    </Card>
  );
}

export default InprogressProposal;
