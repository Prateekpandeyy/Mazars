import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import RetviewModal from "./RetviewModal";
import { Link, NavLink } from "react-router-dom";
import AdminFilter from "../../../components/Search-Filter/AdminFilter";
import Records from "../../../components/Records/Records";
import ViewComponent from "../ViewProposal/ViewComponent";
import DiscardReport from "../AssignmentTab/DiscardReport";
import ShowProposal from "./ShowProposal";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CommonShowProposal from "../../../components/commonShowProposal/CommonShowProposal";
import MessageIcon, {
  EyeIcon,
  ViewDiscussionIcon,
  DiscussProposal,
  HelpIcon,
} from "../../../components/Common/MessageIcon";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

function AllProposalComponent() {
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const [records, setRecords] = useState([]);
  const [assignNo, setAssignNo] = useState("");
  const [viewData, setViewData] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [retview, setRetview] = useState(false);
  const [viewProposalModal, setViewProposalModal] = useState(false);
  const [proposalId, setProposalId] = useState("");
  const [scrolledTo, setScrolledTo] = useState("");
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [accend, setAccend] = useState(false);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const myRef = useRef([]);
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const ViewHandler = (key) => {
    setViewModal(!viewModal);
    setViewData(key);
  };

  const showProposalModal2 = (e) => {
    setViewProposalModal(!viewProposalModal);
    setProposalId(e.q_id);
    setScrolledTo(e.assign_no);
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [viewProposalModal]);

  const [ViewDiscussion, setViewDiscussion] = useState(false);
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

  useEffect(() => {
    let localPage = Number(localStorage.getItem("adminprot1"));
    if (!localPage) {
      localPage = 1;
    }
    setPage(localPage);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    getProposalData(localPage);
  }, []);

  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getProposalData(1);
    localStorage.setItem("adminprot1", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getProposalData(page - 1);
    localStorage.setItem("adminprot1", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    getProposalData(page + 1);
    localStorage.setItem("adminprot1", Number(page) + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getProposalData(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("adminprot1", defaultPage.at(-1));
  };

  const getProposalData = (e) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    let remainApiPath = "";
    let searchData = JSON.parse(localStorage.getItem(`searchDataadproposal1`));
    if (searchData) {
      remainApiPath = `/admin/getProposals?page=${e}&cat_id=${
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
      remainApiPath = `admin/getProposals?page=${e}`;
    }
    if (e) {
      axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
        let droppage = [];
        if (res.data.code === 1) {
          let data = res.data.result;

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
          setProposalDisplay(all);
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
    axios
      .get(
        `${baseUrl}/admin/getProposals?orderby=${val}&orderbyfield=${field}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setPage(1);
          setBig(1);
          setEnd(Number(localStorage.getItem("admin_record_per_page")));
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
        }
      });
  };

  const retviewProposal = (e) => {
    setRetview(!retview);
    setAssignNo(e.q_id);
    setScrolledTo(e.assign_no);
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [retview]);

  const columns = [
    {
      text: "S.no",
      dataField: "cid",
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "created",
      text: "Date",
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },
      formatter: function dateFormat(cell, row) {
        var oldDate = row.created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      dataField: "assign_no",
      text: "Query no",
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 2);
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/admin_queries/${row.q_id}`,
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
      dataField: "parent_id",
      text: "Category",
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 3);
      },
    },
    {
      dataField: "cat_name",
      text: "Sub category",
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
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
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
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
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
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
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
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
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 8);
      },
      sortFunc: (a, b, order, dataField) => {
        setAccend(!accend);

        if (accend === true) {
          return b - a;
        }
        return a - b; // desc
      },
      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.ProposedAmount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      dataField: "accepted_amount",
      text: "Accepted amount",
      sort: true,

      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 9);
      },
      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.accepted_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      dataField: "tl_name",
      text: "TL name",
    },
    {
      text: "Action",

      formatter: function (cell, row) {
        return (
          <>
            <div style={{ display: "flex" }}>
              <Link
                to={{
                  pathname: `/admin_chatting/${row.q_id}`,
                  index: 0,
                  routes: "proposal",
                  obj: {
                    message_type: "2",
                    query_No: row.assign_no,
                    query_id: row.q_id,
                    routes: `/admin/proposal`,
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

              {row.statuscode > "3" || row.statuscode == "10" ? (
                <div onClick={(e) => showProposalModal2(row)} className="ml-1">
                  <EyeIcon />
                </div>
              ) : null}
              {row.statuscode === "6" && row.paid_status !== "2" ? (
                <>
                  <div onClick={(e) => retviewProposal(row)}>
                    <DiscussProposal titleName="Restore Proposal" />
                  </div>
                </>
              ) : null}
            </div>
          </>
        );
      },
    },
  ];

  const resetPaging = () => {
    setPage(1);
    setBig(1);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    localStorage.removeItem("adminprot1");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <AdminFilter
            setData={setProposalDisplay}
            getData={getProposalData}
            allProposal="allProposal"
            setRecords={setRecords}
            records={records}
            setDefaultPage={setDefaultPage}
            resetPaging={resetPaging}
            setCountNotification={setCountNotification}
            page={page}
            setBig={setBig}
            setEnd={setEnd}
            index="adproposal1"
          />
        </CardHeader>

        <CardBody>
          <Row>
            <Col md="12" align="right">
              <div className="customPagination">
                <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                  <span className="customPaginationSpan">
                    {big}-{end} of {countNotification}
                  </span>
                  <span className="d-flex">
                    {page > 1 ? (
                      <>
                        <button
                          className="navButton"
                          onClick={(e) => firstChunk()}
                        >
                          <KeyboardDoubleArrowLeftIcon />
                        </button>
                        <button
                          className="navButton"
                          onClick={(e) => prevChunk()}
                        >
                          <KeyboardArrowLeftIcon />
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                    <div className="navButtonSelectDiv">
                      <select
                        value={page}
                        onChange={(e) => {
                          setPage(Number(e.target.value));
                          getProposalData(Number(e.target.value));
                          localStorage.setItem(
                            "adminprot1",
                            Number(e.target.value)
                          );
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
                          className="navButton"
                          onClick={(e) => nextChunk()}
                        >
                          <KeyboardArrowRightIcon />
                        </button>
                        <button
                          className="navButton"
                          onClick={(e) => lastChunk()}
                        >
                          <KeyboardDoubleArrowRightIcon />
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

          <DataTablepopulated
            bgColor="#42566a"
            keyField={"assign_no"}
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
          <RetviewModal
            retview={retview}
            retviewProposal={retviewProposal}
            getProposalData={getProposalData}
            assignNo={assignNo}
          />
          {viewProposalModal === true ? (
            <CommonShowProposal
              setViewProposalModal={setViewProposalModal}
              viewProposalModal={viewProposalModal}
              showProposalModal2={showProposalModal2}
              panel="admin"
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

export default AllProposalComponent;
