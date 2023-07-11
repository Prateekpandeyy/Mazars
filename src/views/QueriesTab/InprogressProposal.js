import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/config";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import CommonServices from "../../common/common";
import moment from "moment";
import DiscardReport from "../AssignmentTab/DiscardReport";
import ModalManual from "../ModalManual/AllComponentManual";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PaginatorCust from "../../components/Paginator/PaginatorCust";
import MessageIcon, {
  ViewDiscussionIcon,
  HelpIcon,
  FeedBackICon,
} from "../../components/Common/MessageIcon";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { makeStyles } from "@material-ui/core/styles";
import ShowError from "../../components/LoadingTime/LoadingTime";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));

function InprogressProposal({
  allQueriesCount,
  // setAllQueriesCount,
  // CountAllQuery,
}) {
  const userId = window.localStorage.getItem("userid");
  const [assignNo, setAssignNo] = useState("");
  const [openManual, setManual] = useState(false);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [inprogressProposal, setInprogressProposal] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key);
      console.log(key, "set");
    }
  };
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

  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
    console.log("object");
  }, [ViewDiscussion]);

  const needHelp = () => {
    setManual(!openManual);
  };

  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("custArrowQuery3") === column.dataField ||
      localStorage.getItem("prevcustq3") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevcustq3", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("custArrowQuery3") === column.dataField ? (
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
    let local = JSON.parse(localStorage.getItem(`searchDatacustQuery3`));
    let pageno = JSON.parse(localStorage.getItem("custQuery3"));
    let arrow = localStorage.getItem("custArrowQuery3");
    let pre = localStorage.getItem("prevcustq3");
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
      CountInprogressProposal(pageno);
    } else {
      CountInprogressProposal(1);
    }
    // }
  }, []);

  const CountInprogressProposal = (e) => {
    if (e === undefined) {
      console.log(e, "e");
      e = 1;
    }
    let data = JSON.parse(localStorage.getItem("searchDatacustQuery3"));
    let pagetry = JSON.parse(localStorage.getItem("freezecustQuery3"));
    localStorage.setItem(`custQuery3`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);
    if (data && !pagetry) {
      remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&status=2&cat_id=${data.store}&from=${data.fromDate}&to=${
        data.toDate
      }&pcat_id=${data.pcatId}`;
    } else if (data && pagetry) {
      remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&status=2&cat_id=${data.store}&from=${data.fromDate}&to=${
        data.toDate
      }&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
    } else if (!data && pagetry) {
      remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&status=2&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&status=2`;
    }

    axios
      .get(`${baseUrl}/${remainApiPath}`, myConfig)
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
          setInprogressProposal(all);
          setCount(res.data.total);
          console.log("all", all);
          console.log("all.cid", all.cid);
        }
      })
      .catch((err) => {
        ShowError.LoadingError(setLoading);
      });
  };

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    localStorage.setItem(`custQuery3`, JSON.stringify(1));
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    };
    localStorage.setItem(`freezecustQuery3`, JSON.stringify(obj));
    let data = JSON.parse(localStorage.getItem("searchDatacustQuery3"));

    if (data) {
      remainApiPath = `customers/incompleteAssignments?page=1&user=${JSON.parse(
        userId
      )}&status=2&cat_id=${data.store}&from=${data.fromDate}&to=${
        data.toDate
      }&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `customers/incompleteAssignments?page=1&user=${JSON.parse(
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
        setInprogressProposal(all);
        setTurnGreen(true);
        setresetTrigger(!resetTrigger);
      }
    });
  };

  const columns = [
    {
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
          localStorage.setItem("custArrowQuery3", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowQuery3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },

      formatter: function dateFormatter(cell, row) {
        return <>{CommonServices.changeFormateDate(row.created)}</>;
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
                pathname: `/customer_my-assingment/${row.id}`,
                index: 2,
                routes: "queries",
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
          localStorage.setItem("custArrowQuery3", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowQuery3");
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
          localStorage.setItem("custArrowQuery3", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowQuery3");
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
      text: "Actual Delivery Date",
      dataField: "final_date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowQuery3", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowQuery3");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 6);
      },

      formatter: function dateFormat(cell, row) {
        return (
          <>
            {row.status == "Declined Query"
              ? null
              : row.status_code >= "1"
              ? CommonServices.removeTime(row.final_date)
              : null}
          </>
        );
      },
    },
    {
      text: "Action",

      formatter: function (cell, row) {
        var dateMnsFive = moment(row.exp_delivery_date)
          .add(15, "day")
          .format("YYYY-MM-DD");

        var curDate = moment().format("YYYY-MM-DD");

        return (
          <>
            {row.status == "Declined Query" ? (
              <>
                <>
                  {dateMnsFive > curDate === true ? (
                    <span className="ml-2">
                      <Link
                        to={{
                          pathname: `/customer_feedback/${row.assign_no}`,
                          index: 2,
                          routes: "queries",
                        }}
                      >
                        <FeedBackICon />
                      </Link>
                    </span>
                  ) : (
                    ""
                  )}

                  <span
                    onClick={() => ViewDiscussionToggel(row.assign_no)}
                    className="ml-2"
                  >
                    <ViewDiscussionIcon />
                  </span>
                </>
              </>
            ) : (
              <>
                {row.status_code == "0" ||
                row.status_code == "1" ||
                row.status_code == "3" ? (
                  <>
                    <span className="ml-2">
                      <Link
                        to={{
                          pathname: `/customer_chatting/${row.id}&type=4`,
                          index: 2,
                          routes: "queries",
                          obj: {
                            message_type: "4",
                            query_No: row.assign_no,
                            query_id: row.id,
                            routes: `/customer/queries`,
                          },
                        }}
                      >
                        <MessageIcon />
                      </Link>
                    </span>
                    <span
                      onClick={() => ViewDiscussionToggel(row.assign_no)}
                      className="ml-2"
                    >
                      <ViewDiscussionIcon />
                    </span>
                  </>
                ) : null}

                {row.status_code == "4" ||
                8 < parseInt(row.status_code) ||
                row.status_code == "2" ? (
                  <>
                    {dateMnsFive > curDate === true ? (
                      <span className="ml-2">
                        <Link
                          to={{
                            pathname: `/customer_feedback/${row.assign_no}`,
                            index: 2,
                            routes: "queries",
                          }}
                        >
                          <FeedBackICon />
                        </Link>
                      </span>
                    ) : (
                      ""
                    )}

                    {row.status_code == "10" ? null : (
                      <span className="ml-2">
                        <Link
                          to={{
                            pathname: `/customer_chatting/${row.id}&type=4`,
                            index: 2,
                            routes: "queries",
                            obj: {
                              message_type: "4",
                              query_No: row.assign_no,
                              query_id: row.id,
                              routes: `/customer/queries`,
                            },
                          }}
                        >
                          <MessageIcon />
                        </Link>
                      </span>
                    )}
                    <span
                      onClick={() => ViewDiscussionToggel(row.assign_no)}
                      className="ml-2"
                    >
                      <ViewDiscussionIcon />
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
    localStorage.removeItem("custQuery3");
    localStorage.removeItem(`freezecustQuery3`);
    localStorage.removeItem("custArrowQuery3");
    localStorage.removeItem("prevcustq3");
    setPrev("");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <span onClick={(e) => needHelp()}>
            {" "}
            <HelpIcon />
          </span>
          <CustomerFilter
            setData={setInprogressProposal}
            getData={CountInprogressProposal}
            id={userId}
            InprogressQueryProposal="InprogressQueryProposal"
            records={allQueriesCount.length}
            index="custQuery3"
            resetTriggerFunc={resetTriggerFunc}
            setCount={setCount}
          />
        </CardHeader>
        <CardBody>
          <Row className="mb-2">
            <Col md="12" align="right">
              <PaginatorCust
                count={count}
                id={userId}
                index="custQuery3"
                setData={setInprogressProposal}
                getData={CountInprogressProposal}
                InprogressQueryProposal="InprogressQueryProposal"
                setOnPage={setOnPage}
                resetTrigger={resetTrigger}
                setresetTrigger={setresetTrigger}
              />
            </Col>
          </Row>
          <DataTablepopulated
            bgColor="#6e557b"
            keyField={"assign_no"}
            data={inprogressProposal}
            columns={columns}
          ></DataTablepopulated>
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={CountInprogressProposal}
            headColor="#6e557b"
          />

          <Modal
            isOpen={openManual}
            toggle={needHelp}
            style={{ display: "block", position: "absolute", left: "280px" }}
            size="lg"
          >
            <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
            <ModalBody>
              <ModalManual tar={"freshQuery"} />
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    </>
  );
}

export default React.memo(InprogressProposal);
