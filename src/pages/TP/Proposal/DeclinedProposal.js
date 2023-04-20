import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import BootstrapTable from "react-bootstrap-table-next";
import TaxProfessionalFilter from "../../../components/Search-Filter/tpfilter";
import DiscardReport from "../AssignmentTab/DiscardReport";
import CommonShowProposal from "../../../components/commonShowProposal/CommonShowProposal";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  EyeIcon,
  ViewDiscussionIcon,
  DiscussProposal,
  HelpIcon,
} from "../../../components/Common/MessageIcon";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Paginator from "../../../components/Paginator/Paginator";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 10px",
  },
}));

function DeclinedProposal() {
  const userid = window.localStorage.getItem("tpkey");
  const allEnd = Number(localStorage.getItem("tp_record_per_page"));
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [proposal, setProposal] = useState([]);
  const [id, setId] = useState(null);
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [addPaymentModal, setPaymentModal] = useState(false);
  const [viewProposalModal, setViewProposalModal] = useState(false);
  const [proposalId, setProposalId] = useState();
  const [scrolledTo, setScrolledTo] = useState("");
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");

  const [count, setCount] = useState("0");
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState('');
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);


  const myRef = useRef([]);
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const chatHandler = (key) => {
    setPaymentModal(!addPaymentModal);
    setId(key.assign_no);
  };
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

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key)
    }
  };

  function headerLabelFormatter(column) {
    // let reverse = "Exp_Delivery_Date"
    return (
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

  useEffect(() => {
    let pageno = JSON.parse(localStorage.getItem("tpProposal4"));
    let arrow = localStorage.getItem("tpArrowProposal4")
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    let sortVal = JSON.parse(localStorage.getItem("freezetpProposal4"));
    if (!sortVal) {
      let sort = {
        val: 0,
        field: 1,
      };
      localStorage.setItem("freezetpProposal4", JSON.stringify(sort));
    }
    if (pageno) {
      getProposalList(pageno);
    } else {
      getProposalList(1);
    }
    // getProposalList(1);
  }, []);

  const getProposalList = (e) => {
    let data = JSON.parse(localStorage.getItem("searchDatatpproposal4"));
    let pagetry = JSON.parse(localStorage.getItem("freezetpProposal4"))
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
            .join("-")}&status=3&pcat_id=${data.pcatId}&qno=${data.query_no}`
    } else if ((data) && (pagetry)) {
      remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(userid)}&cat_id=${data.store
        }&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
            ?.split("-")
            .reverse()
            .join("-")}&status=3&pcat_id=${data.pcatId}&qno=${data.query_no}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`
    } else if ((!data) && (pagetry)) {
      remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(userid)}&status=3&orderby=${val}&orderbyfield=${field}`
    } else {
      remainApiPath = `tl/getProposalTl?page=${e}&tp_id=${JSON.parse(userid)}&status=3`
    }

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
        }
      });

  };

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    localStorage.setItem(`tpProposal4`, JSON.stringify(1))
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    }
    localStorage.setItem(`freezetpProposal4`, JSON.stringify(obj));
    localStorage.setItem(`tpProposal4`, JSON.stringify(1));
    let data = JSON.parse(localStorage.getItem("searchDatatpproposal4"));
    if (data) {
      remainApiPath = `tl/getProposalTl?page=1&tp_id=${JSON.parse(userid)}&cat_id=${data.store
        }&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
            ?.split("-")
            .reverse()
            .join("-")}&status=3&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`
    } else {
      remainApiPath = `tl/getProposalTl?page=1&tp_id=${JSON.parse(userid)}&status=3&orderby=${val}&orderbyfield=${field}`
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
          localStorage.setItem("tpArrowProposal4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal4");
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
                index: 3,
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
          localStorage.setItem("tpArrowProposal4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal4");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 2);
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
          localStorage.setItem("tpArrowProposal4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal4");
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
      text: "Payment  plan",
      dataField: "paymnet_plan_code",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowProposal4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal4");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 4);
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
          localStorage.setItem("tpArrowProposal4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal4");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 5);
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
          localStorage.setItem("tpArrowProposal4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal4");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 6);
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowProposal4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal4");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 7);
      },

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.status == "Client Declined; Proposal" ? (
                <p className="declined">{row.status}</p>
              ) : null}
            </div>
          </>
        );
      },
    },
    {
      dataField: "",
      text: "Proposed amount",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowProposal4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal4");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 8);
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
          setIsActive(field);
          localStorage.setItem("tpArrowProposal4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowProposal4");
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
                  pathname: `/taxprofessional_chatting/${row.id}`,
                  index: 3,
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
                  <Link to={`/taxprofessional_edit-proposal/${row.id}`}>
                    <i
                      className="fa fa-edit"
                      style={{
                        fontSize: "16px",
                        cursor: "pointer",
                        color: "green",
                      }}
                    ></i>
                  </Link>
                ) : row.status_code == "2" && row.work_by != "0" ? (
                  <Link to={`/taxprofessional_sendproposal/${row.id}`}>
                    <i
                      class="fa fa-mail-forward"
                      style={{
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    ></i>
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
    localStorage.removeItem("tpPropsosal4");
    localStorage.removeItem(`freezetpProposal4`);
    localStorage.removeItem("tpArrowProposal4");
  }


  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <TaxProfessionalFilter
              setData={setProposal}
              getData={getProposalList}
              // proposal="proposal"
              Decproposal="Decproposal"
              setRecords={setRecords}
              index="tpproposal4"
              records={records}
              setCount={setCount}
              resetTriggerFunc={resetTriggerFunc}
            />
          </Row>
          <Row>
            <Col md="12" align="right">
              <Paginator
                setData={setProposal}
                getData={getProposalList}
                // proposal="proposal"
                Decproposal="Decproposal"
                setRecords={setRecords}
                index="tpproposal4"
                records={records}
                count={count}
                setOnPage={setOnPage}
                // resetPaging={resetPaging}
                resetTrigger={resetTrigger}
                setresetTrigger={setresetTrigger}
              />
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <DataTablepopulated
            bgColor="#5f7b97"
            keyField={"assign_no"}
            data={proposal}
            columns={columns}
          ></DataTablepopulated>
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
          )}{" "}
        </CardBody>
      </Card>
    </>
  );
}

export default DeclinedProposal;
