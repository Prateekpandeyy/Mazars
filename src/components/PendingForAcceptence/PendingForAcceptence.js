import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../config/config";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import AdminFilter from "../../components/Search-Filter/AdminFilter";
import DiscardReport from "../../pages/Admin/AssignmentTab/DiscardReport";
import RetviewModal from "../../pages/Admin/AllProposalComponent/RetviewModal";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
import CommonShowProposal from "../commonShowProposal/CommonShowProposal";
import MessageIcon, {
  EyeIcon,
  ViewDiscussionIcon,
  DiscussProposal,
} from "../../components/Common/MessageIcon";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
function PendingForAcceptence() {
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const [records, setRecords] = useState([]);
  const [retview, setRetview] = useState(false);
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);
  const [viewProposalModal, setViewProposalModal] = useState(false);
  const [proposalId, setProposalId] = useState(0);
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [accend, setAccend] = useState(false);
  const [orderby, setOrderBy] = useState("");
  const [fieldBy, setFiledBy] = useState("");
  const [prev, setPrev] = useState("");
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  function priceFormatter(column, colIndex) {
    let isActive = true;

    if (accend === column.dataField || prev === column.dataField) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevro2", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div
        className={
          isActive === true
            ? "d-flex filterActive text-white w-100 flex-wrap"
            : "d-flex text-white w-100 flex-wrap"
        }
      >
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {accend === column.dataField ? (
            <ArrowDropDownIcon />
          ) : (
            <ArrowDropUpIcon />
          )}
        </div>
      </div>
    );
  }
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

  useEffect(() => {
    let localPage = Number(localStorage.getItem("adminprot2"));
    if (!localPage) {
      localPage = 1;
    }
    setAccend(localStorage.getItem("accendpro2"));
    let sortVal = JSON.parse(localStorage.getItem("sortedValuepro2"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("sortedValuepro2", JSON.stringify(sort));
    }
    setPage(localPage);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    getPendingAcceptedProposal(localPage);
  }, []);
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getPendingAcceptedProposal(1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getPendingAcceptedProposal(page - 1);
    localStorage.setItem("adminprot2", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    getPendingAcceptedProposal(page + 1);
    localStorage.setItem("adminprot2", Number(page) + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getPendingAcceptedProposal(defaultPage.at(-1));
    localStorage.setItem("adminprot2", defaultPage.at(-1));
    setAtpage(totalPages);
  };

  const getPendingAcceptedProposal = (e) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    let sortVal = JSON.parse(localStorage.getItem("sortedValuepro2"));
    let orderBy = 0;
    let fieldBy = 0;

    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let remainApiPath = "";
    let searchData = JSON.parse(localStorage.getItem(`searchDataadproposal2`));
    if (searchData) {
      let status = 1;
      if (searchData.p_status) {
        status = searchData.p_status;
      }
      remainApiPath = `/admin/getProposals?page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}&cat_id=${
        searchData.store
      }&from=${searchData.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${searchData.toDate
        ?.split("-")
        .reverse()
        .join("-")}&status1=${status}&pcat_id=${searchData.pcatId}&qno=${
        searchData?.query_no
      }`;
    } else {
      remainApiPath = `/admin/getProposals?status1=1&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    }

    if (e) {
      axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
        let droppage = [];
        if (res.data.code === 1) {
          let data = res.data.result;
          setRecords(res.data.tota);
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
          setCountNotification(res.data.total);
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
    setOrderBy(val);
    setFiledBy(field);
    let sort = {
      orderBy: val,
      fieldBy: field,
    };
    localStorage.setItem("adminprot2", 1);
    localStorage.setItem("sortedValuepro2", JSON.stringify(sort));
    let searchData = JSON.parse(localStorage.getItem(`searchDataadproposal2`));
    if (searchData) {
      let status = 1;
      if (searchData.p_status) {
        status = searchData.p_status;
      }
      remainApiPath = `/admin/getProposals?orderby=${val}&orderbyfield=${field}&cat_id=${
        searchData.store
      }&from=${searchData.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${searchData.toDate
        ?.split("-")
        .reverse()
        .join("-")}&status1=${status}&pcat_id=${searchData.pcatId}&qno=${
        searchData?.query_no
      }`;
    } else {
      remainApiPath = `/admin/getProposals?status1=1&orderby=${val}&orderbyfield=${field}`;
    }
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        setPage(1);
        setBig(1);
        if (
          Number(
            res.data.total >
              Number(localStorage.getItem("admin_record_per_page"))
          )
        ) {
          setEnd(Number(localStorage.getItem("admin_record_per_page")));
        } else {
          setEnd(res.data.total);
        }
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
    setAssignNo(e);
  };
  const columns = [
    {
      dataField: "cid",
      text: "S.no",

      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "created",
      text: "Date",
      sort: true,
      headerFormatter: priceFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpro2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpro2");
        }

        if (accend === field) {
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

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/admin_queries/${row.q_id}`,
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
      dataField: "parent_id",
      text: "Category",
      headerFormatter: priceFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpro2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpro2");
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
      dataField: "cat_name",
      text: "Sub category",
      headerFormatter: priceFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpro2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpro2");
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
      headerFormatter: priceFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpro2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpro2");
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
      headerFormatter: priceFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpro2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpro2");
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
      text: "Date of acceptance of proposal",
      headerFormatter: priceFormatter,
      dataField: "cust_accept_date",
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpro2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpro2");
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
      headerFormatter: priceFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpro2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpro2");
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
              ) : null}
            </div>
          </>
        );
      },
    },
    {
      dataField: "",
      text: "Proposed amount",
      headerFormatter: priceFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpro2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpro2");
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

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.accepted_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      dataField: "tl_name",
      text: "TL name",
      sort: true,
      headerFormatter: priceFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendpro2", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendpro2");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 11);
      },
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
                  index: 1,
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

              {row.statuscode > "3" ? (
                <div onClick={(e) => showProposalModal2(row)} className="ml-1">
                  <EyeIcon />
                </div>
              ) : null}

              {row.statuscode == "6" ? (
                <>
                  <div onClick={(e) => retviewProposal(row.q_id)}>
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
    setOrderBy("");
    setFiledBy("");
    localStorage.removeItem("adminprot2");
    localStorage.removeItem("sortedValuepro2");
    localStorage.removeItem("accendpro2");
    localStorage.removeItem("prevro2");
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <AdminFilter
            setData={setProposalDisplay}
            getData={getPendingAcceptedProposal}
            pendingAcceptedProposal="pendingAcceptedProposal"
            setRecords={setRecords}
            records={records}
            setDefaultPage={setDefaultPage}
            resetPaging={resetPaging}
            setCountNotification={setCountNotification}
            page={page}
            setBig={setBig}
            setEnd={setEnd}
            index="adproposal2"
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
                          getPendingAcceptedProposal(Number(e.target.value));
                          localStorage.setItem(
                            "adminprot2",
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
          {/* <Records records={records} /> */}
          <DataTablepopulated
            bgColor="#42566a"
            keyField={"assign_no"}
            data={proposalDisplay}
            columns={columns}
          ></DataTablepopulated>
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getPendingAcceptedProposal}
            headColor="#42566a"
          />
          <RetviewModal
            retview={retview}
            retviewProposal={retviewProposal}
            getPendingAcceptedProposal={getPendingAcceptedProposal}
            assignNo={assignNo}
          />
          {/* <ShowProposal 
          setViewProposalModal = {setViewProposalModal}
          viewProposalModal = {viewProposalModal}
          showProposalModal2 = {showProposalModal2}
          proposalId = {proposalId}/> */}
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
    </div>
  );
}

export default PendingForAcceptence;
