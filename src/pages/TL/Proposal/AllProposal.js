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
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 10px",
  },
}));
function AllProposal({ setAllProposal }) {
  const classes = useStyles();
  const userid = window.localStorage.getItem("tlkey");
  const [records, setRecords] = useState([]);
  const [proposal, setProposal] = useState([]);

  const [id, setId] = useState(null);
  const [id2, setId2] = useState(null);
  const [tds, setTds] = useState(false);
  const [addPaymentModal, setPaymentModal] = useState(false);
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [tdsForm, setTdsForm] = useState(false);
  const [viewProposalModal, setViewProposalModal] = useState(false);
  const [proposalId, setProposalId] = useState("");
  const [scrolledTo, setScrolledTo] = useState("");
  const [lastDown, setLastDown] = useState("");
  const [countNotification, setCountNotification] = useState("");
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [accend, setAccend] = useState(false);
  const [prev, setPrev] = useState("");
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const myRefs = useRef([]);
  const myRef = useRef([]);

  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("accendtlpro1") === column.dataField ||
      localStorage.getItem("prevtlpro1") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevtlpro1", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("accendtlpro1") === column.dataField ? (
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
    let localPage = Number(localStorage.getItem("tlpro1"));
    if (!localPage) {
      localPage = 1;
    }
    setAccend(localStorage.getItem("accendtlpro1"));
    setPrev(localStorage.getItem("prevtlpro1"));

    let sortVal = JSON.parse(localStorage.getItem("sortedValuetlpro1"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("sortedValuetlpro1", JSON.stringify(sort));
    }

    setEnd(Number(localStorage.getItem("tl_record_per_page")));
    getProposalList(localPage);
  }, []);

  const chatHandler = (key) => {
    setPaymentModal(!addPaymentModal);
    setId(key.assign_no);
  };

  const showProposalModal2 = (e) => {
    setViewProposalModal(!viewProposalModal);
    setProposalId(e.id);
    console.log(e);
    setScrolledTo(e.assign_no);
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [viewProposalModal]);

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key);
    }
  };

  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo];
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: "center" });
    }
  }, [ViewDiscussion]);
  useEffect(() => {
    let runTo = myRefs.current[lastDown];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [viewProposalModal]);

  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getProposalList = (e) => {
    let searchData = JSON.parse(localStorage.getItem("searchDatatlproposal1"));

    setPage(e);
    let allEnd = Number(localStorage.getItem("tl_record_per_page"));
    let orderBy = 0;
    let fieldBy = 0;
    let sortVal = JSON.parse(localStorage.getItem("sortedValuepro1"));
    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let remainApiPath = "";

    if (searchData) {
      remainApiPath = `/tl/getProposalTl?id=${JSON.parse(
        userid
      )}&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}&cat_id=${
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
      remainApiPath = `tl/getProposalTl?id=${JSON.parse(
        userid
      )}&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    }
    if (e) {
      axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
        if (res.data.code === 1) {
          let droppage = [];
          let data = res.data.result;
          setAllProposal(res.data.total);
          setCountNotification(res.data.total);
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
          setRecords(res.data.result.length);
          let end = e * allEnd;

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
    localStorage.setItem("tlprot1", 1);
    localStorage.setItem("sortedValuepro1", JSON.stringify(sort));
    let searchData = JSON.parse(localStorage.getItem(`searchDatatlproposal1`));
    if (searchData) {
      remainApiPath = `/tl/getProposalTl?id=${JSON.parse(
        userid
      )}&orderby=${val}&orderbyfield=${field}&cat_id=${
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
      remainApiPath = `tl/getProposalTl?id=${JSON.parse(
        userid
      )}&orderby=${val}&orderbyfield=${field}`;
    }
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        setPage(1);
        setBig(1);

        let all = [];
        let sortId = 1;
        if (
          Number(
            res.data.total > Number(localStorage.getItem("tl_record_per_page"))
          )
        ) {
          setEnd(Number(localStorage.getItem("tl_record_per_page")));
        } else {
          setEnd(res.data.total);
        }
        res.data.result.map((i) => {
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
      dataField: "query_date",
      text: "Query date",
      sort: true,
      headerFormatter: headerLabelFormatter,

      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtlpro1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlpro1");
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
                pathname: `/teamleader_queries/${row.id}`,
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
          localStorage.setItem("accendtlpro1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlpro1");
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
          localStorage.setItem("accendtlpro1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlpro1");
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
          localStorage.setItem("accendtlpro1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlpro1");
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
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtlpro1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlpro1");
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
      text: "Date of acceptance / Decline of proposal",
      dataField: "cust_accept_date",
      sort: true,
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtlpro1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlpro1");
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
          localStorage.setItem("accendtlpro1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlpro1");
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
              ) : row.status == "Client Declined; Proposal" ? (
                <p className="declined">{row.status}</p>
              ) : row.status == "Accepted; Proposal" ? (
                <p className="completed">{row.status}</p>
              ) : null}
            </div>
          </>
        );
      },
    },
    {
      dataField: "ProposedAmount",
      text: "Proposed amount",
      sort: true,
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtlpro1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlpro1");
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtlpro1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlpro1");
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

      formatter: function (cell, row) {
        return (
          <>
            <div style={{ display: "flex" }}>
              <Link
                to={{
                  pathname: `/teamleader_chatting/${row.id}`,
                  index: 0,
                  routes: "proposal",
                  obj: {
                    message_type: "2",
                    query_No: row.assign_no,
                    query_id: row.id,
                    routes: `/teamleader/proposal`,
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
                      pathname: `/teamleader_edit-proposal/${row.id}`,
                      index: 0,
                      routes: "proposal",
                    }}
                  >
                    <EditQuery titleName="Edit Proposal" />
                  </Link>
                ) : row.status_code == "2" && row.work_by != "0" ? (
                  <Link
                    to={{
                      pathname: `/teamleader_sendproposal/${row.id}`,
                      index: 0,
                      routes: "proposal",
                    }}
                  >
                    <ActionIcon titleName="Create propsal" />
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

  return (
    <>
      <Card>
        <CardHeader>
          <TeamFilter
            setData={setProposal}
            getData={getProposalList}
            AllProposal="AllProposal"
            setRecords={setRecords}
            records={records}
            setCountNotification={setCountNotification}
            countNotification={countNotification}
            big={big}
            end={end}
            setBig={setBig}
            setEnd={setEnd}
            setPage={setPage}
            page={page}
            defaultPage={defaultPage}
            setDefaultPage={setDefaultPage}
            pageValue="tlpro1"
            localAccend="accendtlpro1"
            localPrev="prevtlpro1"
            localSorted="sortedValuetlpro1"
            index="tlproposal1"
          />
        </CardHeader>
        <CardBody>
          <DataTablepopulated
            bgColor="#42566a"
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
            headColor="#42566a"
          />

          {viewProposalModal === true ? (
            <CommonShowProposal
              setViewProposalModal={setViewProposalModal}
              viewProposalModal={viewProposalModal}
              showProposalModal2={showProposalModal2}
              panel="teamleader"
              proposalId={proposalId}
            />
          ) : (
            ""
          )}
        </CardBody>
      </Card>
    </>
  );
}

export default AllProposal;

{
  /* <div>
                                {row.revised_text && (
                                    <div style={{ cursor: "pointer" }} title="View History">
                                        <i
                                            class="fa fa-comments-o"
                                            style={{ color: "green", fontSize: "16px", color: "light-blue", }}
                                            onClick={() => chatHandler(row)}
                                        ></i>
                                    </div>
                                )}
                            </div> */
}
