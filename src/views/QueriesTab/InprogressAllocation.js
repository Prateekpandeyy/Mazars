import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import Records from "../../components/Records/Records";
import AdditionalQueryModal from "./AdditionalQueryModal";
import Swal from "sweetalert2";
import CommonServices from "../../common/common";
import DiscardReport from "../AssignmentTab/DiscardReport";
import moment from "moment";
import ModalManual from "../ModalManual/AllComponentManual";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PaginatorCust from "../../components/Paginator/PaginatorCust";
import MessageIcon, {
  DeleteIcon,
  EditQuery,
  ViewDiscussionIcon,
  HelpIcon,
  UploadDocument,
  FeedBackICon,
} from "../../components/Common/MessageIcon";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
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
function InprogressAllocation({
  allQueriesCount,
  // setAllQueriesCount,
  CountAllQuery,
}) {
  const userId = window.localStorage.getItem("userid");
  const allEnd = Number(localStorage.getItem("cust_record_per_page"));
  // const classes = useStyles();
  // const allEnd = 50;
  const [assignNo, setAssignNo] = useState("");
  const [inprogressAllocation, setInprogressAllocation] = useState([]);
  const [additionalQuery, setAdditionalQuery] = useState(false);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [openManual, setManual] = useState(false);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);
  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const classes = useStyles();
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

  const additionalHandler = (key) => {
    setAdditionalQuery(!additionalQuery);
    setAssignNo(key);
    if (additionalQuery === false) {
      setScrolledTo(key);
    }
  };

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
  }, [additionalQuery]);

  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo];
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: "center" });
    }
  }, [ViewDiscussion]);

  const needHelp = () => {
    setManual(!openManual);
  };

  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("custArrowQuery2") === column.dataField ||
      localStorage.getItem("prevcustq2") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevcustq2", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("custArrowQuery2") === column.dataField ? (
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
    let local = JSON.parse(localStorage.getItem(`searchDatacustQuery2`));
    let pageno = JSON.parse(localStorage.getItem("custQuery2"));
    let arrow = localStorage.getItem("custArrowQuery2");
    let pre = localStorage.getItem("prevcustq2");
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
      CountInprogressAllocation(pageno);
    } else {
      CountInprogressAllocation(1);
    }
    // }
  }, []);

  const CountInprogressAllocation = (e) => {
    if (e === undefined) {
      e = 1;
    }
    let data = JSON.parse(localStorage.getItem("searchDatacustQuery2"));
    let pagetry = JSON.parse(localStorage.getItem("freezecustQuery2"));
    localStorage.setItem(`custQuery2`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);
    if (data && !pagetry) {
      if (data.p_status.length > 0) {
        remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${
          data.toDate
        }&status=${data.p_status}&pcat_id=${data.pcatId}`;
      } else {
        remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${
          data.toDate
        }&status=1&pcat_id=${data.pcatId}`;
      }
    } else if (data && pagetry) {
      if (data.p_status.length > 0) {
        remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${
          data.toDate
        }&status=${data.p_status}&pcat_id=${
          data.pcatId
        }&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
          userId
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${
          data.toDate
        }&status=1&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
      }
    } else if (!data && pagetry) {
      remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&status=1&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&status=1`;
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
        setInprogressAllocation(all);
        setCount(res.data.total);
      }
    });
  };

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    localStorage.setItem(`custQuery2`, JSON.stringify(1));
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    };
    localStorage.setItem(`freezecustQuery2`, JSON.stringify(obj));
    let data = JSON.parse(localStorage.getItem("searchDatacustQuery2"));

    if (data) {
      remainApiPath = `customers/incompleteAssignments?page=1&user=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&status=${
        data.p_status
      }&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `customers/incompleteAssignments?page=1&user=${JSON.parse(
        userId
      )}&status=1&orderby=${val}&orderbyfield=${field}`;
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
        setInprogressAllocation(all);
        setCount(res.data.total);
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
          localStorage.setItem("custArrowQuery2", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowQuery2");
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
      // headerFormatter: headerLabelFormatter,
      // sort: true,
      // onSort: (field, order) => {
      //   let val = 0;
      //   if (accend !== field) {
      //     setAccend(field);
      //     setIsActive(field);
      //     localStorage.setItem("custArrowQuery2", field);
      //   } else {
      //     setAccend("");
      //     localStorage.removeItem("custArrowQuery2");
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
                pathname: `/customer_my-assingment/${row.id}`,
                index: 1,
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
          localStorage.setItem("custArrowQuery2", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowQuery2");
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
          localStorage.setItem("custArrowQuery2", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowQuery2");
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
      dataField: "status",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowQuery2", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowQuery2");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 5);
      },

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.status}/
              {row.status == "Inprogress Query" ? (
                <p className="inprogress">{row.status_message}</p>
              ) : row.status == "Declined Query" ? (
                <p className="declined">{row.status_message}</p>
              ) : row.status == "Completed Query" ? (
                <p className="completed">{row.status_message}</p>
              ) : null}
            </div>
          </>
        );
      },
    },
    {
      text: "Expected / Actual Delivery Date",
      dataField: "exp_delivery_date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("custArrowQuery2", field);
        } else {
          setAccend("");
          localStorage.removeItem("custArrowQuery2");
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
            {row.status == "Declined Query" ? null : row.status_code != "3" &&
              row.status_code > "1" ? (
              <>
                {row.final_discussion === "completed"
                  ? CommonServices.removeTime(row.final_date)
                  : CommonServices.removeTime(row.exp_delivery_date)}
              </>
            ) : null}
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
                    <span className="ml-1">
                      <Link
                        to={{
                          pathname: `/customer_feedback/${row.assign_no}`,
                          index: 1,
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
                    className="ml-1"
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
                    <span className="ml-1">
                      <Link to={`/customer_edit-query/${row.id}`}>
                        <EditQuery />
                      </Link>
                    </span>

                    <span onClick={() => del(row.id)} className="ml-1">
                      <DeleteIcon />
                    </span>
                    <span className="ml-1">
                      <Link
                        to={{
                          pathname: `/customer_chatting/${row.id}&type=4`,
                          index: 1,
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
                      className="ml-1"
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
                      <span className="ml-1">
                        <Link
                          to={{
                            pathname: `/customer_feedback/${row.assign_no}`,
                            index: 1,
                            routes: "queries",
                          }}
                        >
                          <FeedBackICon />
                        </Link>
                      </span>
                    ) : (
                      ""
                    )}
                    {row.delivery_report == "completed" ? null : (
                      <span
                        className="ml-1"
                        onClick={() => additionalHandler(row.assign_no)}
                      >
                        <UploadDocument />
                      </span>
                    )}
                    {row.status_code == "10" ? null : (
                      <span className="ml-1">
                        <Link
                          to={{
                            pathname: `/customer_chatting/${row.id}&type=4`,
                            index: 1,
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
                      className="ml-1"
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

  //check
  const del = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete query ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteCliente(id);
      }
    });
  };

  const deleteCliente = (id) => {
    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("id", id);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/deleteQuery`,
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          Swal.fire("", "Query deleted successfully.", "success");
          CountInprogressAllocation();
        } else {
          Swal.fire("Oops...", "Errorr ", "error");
        }
      })
      .catch((error) => {});
  };

  const resetTriggerFunc = () => {
    setresetTrigger(!resetTrigger);
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem("custQuery2");
    localStorage.removeItem(`freezecustQuery2`);
    localStorage.removeItem("custArrowQuery2");
    localStorage.removeItem("prevcustq2");
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
          setData={setInprogressAllocation}
          getData={CountInprogressAllocation}
          id={userId}
          InprogressAllocation="InprogressAllocation"
          records={allQueriesCount.length}
          index="custQuery2"
          resetTriggerFunc={resetTriggerFunc}
          setCount={setCount}
        />
      </CardHeader>
      <CardBody>
        {/* <Records records={allQueriesCount.length} /> */}
        <Row className="mb-2">
          <Col md="12" align="right">
            <PaginatorCust
              count={count}
              id={userId}
              index="custQuery2"
              setData={setInprogressAllocation}
              getData={CountInprogressAllocation}
              InprogressAllocation="InprogressAllocation"
              setOnPage={setOnPage}
              resetTrigger={resetTrigger}
              setresetTrigger={setresetTrigger}
            />
          </Col>
        </Row>

        <DataTablepopulated
          bgColor="#6e557b"
          keyField={"assign_no"}
          data={inprogressAllocation}
          columns={columns}
        ></DataTablepopulated>
        <AdditionalQueryModal
          additionalHandler={additionalHandler}
          additionalQuery={additionalQuery}
          assignNo={assignNo}
          getQueriesData={CountInprogressAllocation}
        />
        {ViewDiscussion === true ? (
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={CountInprogressAllocation}
            headColor="#6e557b"
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
            <ModalManual tar={"freshQuery"} />
          </ModalBody>
        </Modal>
      </CardBody>
    </Card>
  );
}

export default React.memo(InprogressAllocation);
