import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import AdminFilter from "../../../components/Search-Filter/AdminFilter";
import Records from "../../../components/Records/Records";
import DiscardReport from "../AssignmentTab/DiscardReport";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ViewAllReportModal from "./ViewAllReport";
import moment from "moment";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  ViewDiscussionIcon,
  Payment,
} from "../../../components/Common/MessageIcon";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

function FinalReport() {
  const userid = window.localStorage.getItem("adminkey");

  const [assignmentDisplay, setAssignmentDisplay] = useState([]);
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [assignmentCount, setCountAssignment] = useState("");
  const [records, setRecords] = useState([]);

  const [selectedData, setSelectedData] = useState([]);
  const [status, setStatus] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [reportModal, setReportModal] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [queryNo, setQueryNo] = useState("");
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);
  const [item] = useState(current_date);
  const [report, setReport] = useState();

  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [accend, setAccend] = useState(false);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  var rowStyle2 = {};
  var clcomp = {
    color: "green",
  };
  var clinpro = {
    color: "blue",
  };
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
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

  useEffect(() => {
    let localPage = Number(localStorage.getItem("adminassign3"));
    if (!localPage) {
      localPage = 1;
    }
    setPage(localPage);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    getAssignmentData(localPage);
  }, []);

  // const getAssignmentData = () => {
  //   let data = JSON.parse(localStorage.getItem("searchDataadAssignment3"));
  //   if (!data) {
  //     axios
  //       .get(
  //         `${baseUrl}/admin/getAssignments?assignment_status=Delivery_of_report&stages_status=1`,
  //         myConfig
  //       )
  //       .then((res) => {
  //         if (res.data.code === 1) {
  //           setAssignmentDisplay(res.data.result);
  //           setCountAssignment(res.data.result.length);
  //           setRecords(res.data.result.length);
  //         }
  //       });
  //   }
  // };
  const getAssignmentData = (e) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    let remainApiPath = "";
    let searchData = JSON.parse(
      localStorage.getItem(`searchDataadAssignment3`)
    );

    if (searchData) {
      remainApiPath = `admin/getAssignments?assignment_status=Delivery_of_report&stages_status=1&page=${e}&cat_id=${
        searchData.store
      }&from=${searchData.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${searchData.toDate
        ?.split("-")
        .reverse()
        .join("-")}&qno=${searchData?.query_no}`;
    } else {
      remainApiPath = `admin/getAssignments?assignment_status=Delivery_of_report&stages_status=1&page=${e}`;
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
          setAssignmentDisplay(all);
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
  //get category
  useEffect(() => {
    const getSubCategory = () => {
      axios
        .get(`${baseUrl}/customers/getCategory?pid=${selectedData}`)
        .then((res) => {
          if (res.data.code === 1) {
            setTax2(res.data.result);
          }
        });
    };
    getSubCategory();
  }, [selectedData]);

  //handleCategory
  const handleCategory = (value) => {
    setSelectedData(value);
    setStore2([]);
  };

  //handleSubCategory
  const handleSubCategory = (value) => {
    setStore2(value);
  };

  //reset category
  const resetCategory = () => {
    setSelectedData([]);
    setStore2([]);
    getAssignmentData();
  };

  //reset date
  const resetData = () => {
    reset();
    setStatus([]);
    setSelectedData([]);
    setStore2([]);
    resetPaging();
    localStorage.removeItem("searchDataadAssignment3");
    setQueryNo("");
    setFromDate("");
    setToDate("");
    getAssignmentData();
  };
  const sortMessage = (val, field) => {
    axios
      .get(
        `${baseUrl}/admin/getAssignments?orderby=${val}&orderbyfield=${field}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let all = [];
          let sortId = 1;
          if (page > 1) {
            sortId = big;
          }
          res.data.result.map((i) => {
            let data = {
              ...i,
              cid: sortId,
            };
            sortId++;
            all.push(data);
          });

          setAssignmentDisplay(all);
        }
      });
  };
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getAssignmentData(1);
    localStorage.setItem("adminassign3", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getAssignmentData(page - 1);
    localStorage.setItem("adminassign3", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    localStorage.setItem("adminassign3", Number(page) + 1);
    getAssignmentData(page + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getAssignmentData(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("adminassign3", defaultPage.at(-1));
  };

  const ViewReport = (key) => {
    setReportModal(!reportModal);
    setReport(key);
    if (reportModal === false) {
      setScrolledTo(key);
    }
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [reportModal]);

  const columns = [
    {
      text: "S.no",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return (
          <div
            id={row.assign_no}
            ref={(el) => (myRef.current[row.assign_no] = el)}
          >
            {rowIndex + 1}
          </div>
        );
      },
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Date",
      dataField: "date_of_query",

      sort: true,

      formatter: function dateFormat(cell, row) {
        var oldDate = row.date_of_query;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
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
                pathname: `/admin_queries/${row.q_id}`,
                index: 2,
                routes: "assignment",
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
      text: "Sub category",
      dataField: "cat_name",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      headerStyle: () => {
        return { width: "200px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div>
              {row.paid_status == "2" && (
                <p>
                  <span className="declined">Payment declined</span>
                </p>
              )}
              <p>
                <span>Client discussion :</span>
                <span
                  className={
                    row.client_discussion === "completed"
                      ? "completed"
                      : "inprogress"
                  }
                >
                  {row.client_discussion}
                </span>
              </p>
              <p>
                <span>Draft report :</span>
                <span
                  className={
                    row.draft_report === "completed"
                      ? "completed"
                      : "inprogress"
                  }
                >
                  {row.draft_report}
                </span>
              </p>
              <p>
                <span>Final discussion :</span>
                <span
                  className={
                    row.final_discussion === "completed"
                      ? "completed"
                      : "inprogress"
                  }
                >
                  {row.final_discussion}
                </span>
              </p>
              <p>
                <span>Delivery of final report :</span>
                <span
                  className={
                    row.delivery_report === "completed"
                      ? "completed"
                      : "inprogress"
                  }
                >
                  {row.delivery_report}
                </span>
              </p>
              <p>
                <span>Awaiting completion:</span>
                <span
                  className={
                    row.other_stage === "completed" ? "completed" : "inprogress"
                  }
                >
                  {row.other_stage}
                </span>
              </p>
            </div>
          </>
        );
      },
    },
    {
      dataField: "Exp_Delivery_Date",
      text: "Expected date of delivery",
      sort: true,

      formatter: function dateFormat(cell, row) {
        var oldDate = row.Exp_Delivery_Date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      dataField: "final_date",
      text: "Actual date of delivery",
      sort: true,

      formatter: function dateFormat(cell, row) {
        var oldDate = row.final_date;
        if (oldDate == null || oldDate == "0000-00-00 00:00:00") {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },

    {
      text: "Deliverable",
      dataField: "",

      formatter: function (cell, row) {
        return (
          <>
            {row.paid_status == "2" ? null : (
              <div>
                {row.assignement_draft_report || row.final_report ? (
                  <div
                    title="View All Report"
                    style={{ cursor: "pointer" }}
                    onClick={() => ViewReport(row.assign_no)}
                  >
                    <DescriptionOutlinedIcon color="secondary" />
                  </div>
                ) : null}
              </div>
            )}
          </>
        );
      },
    },
    {
      text: "TL name",
      dataField: "tl_name",
      sort: true,
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
                  index: 2,
                  routes: "assignment",
                  obj: {
                    message_type: "3",
                    query_No: row.assign_no,
                    query_id: row.q_id,
                    routes: `/admin/assignment`,
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
            </div>
          </>
        );
      },
    },
  ];

  rowStyle2 = (row, index) => {
    const style = {};
    var warningDate = moment(row.Exp_Delivery_Date).subtract(2, "day").toDate();
    // var warnformat = warningDate.format("YYYY-MM-DD");
    var aa = moment().toDate();

    if (
      row.paid_status != "2" &&
      row.status != "Complete" &&
      warningDate < aa
    ) {
      style.backgroundColor = "#c1d8f2";
      style.color = "#000111";
    } else if (row.paid_status != "2" && warningDate > aa) {
      style.backgroundColor = "#fff";
      style.color = "#000";
    }

    return style;
  };
  const onSubmit = (data) => {
    let obj = {};
    if (data.route) {
      obj = {
        store: data.store,
        fromDate: data.fromDate,
        toDate: data.toDate,
        pcatId: data.pcatId,
        query_no: data?.query_no,

        route: window.location.pathname,
      };
    } else {
      obj = {
        store: store2,
        fromDate: fromDate,
        toDate: toDate,
        pcatId: selectedData,
        query_no: data?.query_no,

        route: window.location.pathname,
      };
    }
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    localStorage.setItem(`searchDataadAssignment3`, JSON.stringify(obj));
    if (data.route) {
      axios
        .get(
          `${baseUrl}/admin/getAssignments?assignment_status=Delivery_of_report&stages_status=1&cat_id=${obj.store}&from=${obj.fromDate}&to=${obj.toDate}&qno=${data.query_no}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            if (res.data.result) {
              let droppage = [];
              setCountNotification(res.data.total);
              setRecords(res.data.total);
              let all = [];
              let customId = 1;
              let data = res.data.result;

              data.map((i) => {
                let data = {
                  ...i,
                  cid: customId,
                };
                customId++;
                all.push(data);
              });
              setAssignmentDisplay(all);
              setCountNotification(res.data.total);
              setRecords(res.data.total);
              let end = allEnd;

              if (allEnd > res.data.total) {
                end = res.data.total;
              }
              let dynamicPage = Math.ceil(res.data.total / allEnd);

              setBig(1);

              setEnd(end);

              for (let i = 1; i <= dynamicPage; i++) {
                droppage.push(i);
              }

              setDefaultPage(droppage);
              droppage = [];
              setBig(1);
              setPage(1);
            }
          }
        });
    } else {
      axios
        .get(
          `${baseUrl}/admin/getAssignments?assignment_status=Delivery_of_report&stages_status=1&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&qno=${data.query_no}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            if (res.data.result) {
              let droppage = [];
              setCountNotification(res.data.total);
              setRecords(res.data.total);
              let all = [];
              let customId = 1;
              let data = res.data.result;

              data.map((i) => {
                let data = {
                  ...i,
                  cid: customId,
                };
                customId++;
                all.push(data);
              });
              setAssignmentDisplay(all);
              setCountNotification(res.data.total);
              setRecords(res.data.total);
              let end = allEnd;

              if (allEnd > res.data.total) {
                end = res.data.total;
              }
              let dynamicPage = Math.ceil(res.data.total / allEnd);

              setBig(1);

              setEnd(end);

              for (let i = 1; i <= dynamicPage; i++) {
                droppage.push(i);
              }

              setDefaultPage(droppage);
              droppage = [];
              setBig(1);
              setPage(1);
            }
          }
        });
    }
  };
  useEffect(() => {
    let dk = JSON.parse(localStorage.getItem("searchDataadAssignment3"));

    if (dk) {
      if (dk.route === window.location.pathname) {
        setStore2(dk.store);
        setToDate(dk.toDate);
        setFromDate(dk.fromDate);
        setSelectedData(dk.pcatId);

        setQueryNo(dk.query_no);
      }
    }
  }, []);
  const Reset = () => {
    return (
      <>
        <button
          type="submit"
          className="customBtn mx-sm-1"
          onClick={() => resetData()}
        >
          Reset
        </button>
      </>
    );
  };
  const resetPaging = () => {
    setPage(1);
    setBig(1);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    localStorage.removeItem("adminassign3");
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-inline">
              <div className="form-group mb-2">
                <Select
                  style={{ width: 130 }}
                  placeholder="Select Category"
                  defaultValue={[]}
                  onChange={handleCategory}
                  value={selectedData}
                >
                  <Option value="1" label="Compilance">
                    <div className="demo-option-label-item">Direct Tax</div>
                  </Option>
                  <Option value="2" label="Compilance">
                    <div className="demo-option-label-item">Indirect Tax</div>
                  </Option>
                </Select>
              </div>

              <div className="form-group mx-sm-1  mb-2">
                <Select
                  mode="multiple"
                  style={{ width: 250 }}
                  placeholder="Select Sub Category"
                  defaultValue={[]}
                  onChange={handleSubCategory}
                  value={store2}
                  allowClear
                >
                  {tax2.map((p, index) => (
                    <Option value={p.id} key={index}>
                      {p.details}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <button
                  type="submit"
                  className="btnSearch mb-2 ml-3"
                  onClick={resetCategory}
                >
                  X
                </button>
              </div>

              <div className="form-group mx-sm-1  mb-2">
                <label className="form-select form-control">From</label>
              </div>

              <div className="form-group mx-sm-1  mb-2">
                <input
                  type="date"
                  name="p_dateFrom"
                  className="form-select form-control"
                  ref={register}
                  max={item}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="form-group mx-sm-1  mb-2">
                <label className="form-select form-control">To</label>
              </div>

              <div className="form-group mx-sm-1  mb-2">
                <input
                  type="date"
                  name="p_dateTo"
                  className="form-select form-control"
                  ref={register}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  max={item}
                />
              </div>
              <div className="form-group mx-sm-1  mb-2">
                <input
                  type="text"
                  name="query_no"
                  ref={register}
                  placeholder="Enter Query Number"
                  className="form-control"
                  value={queryNo}
                  onChange={(e) => setQueryNo(e.target.value)}
                />
              </div>
              <button type="submit" className="customBtn">
                Search
              </button>

              <Reset />
            </div>
          </form>
        </CardHeader>

        <CardBody className="card-body">
          <Row>
            <Col md="12" align="right">
              <div className="customPagination">
                <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                  <span>
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
                          getAssignmentData(Number(e.target.value));
                          localStorage.setItem(
                            "adminassign3",
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
            bgColor="#7c887c"
            keyField={"assign_no"}
            data={assignmentDisplay}
            rowStyle2={rowStyle2}
            columns={columns}
          ></DataTablepopulated>
          <ViewAllReportModal
            ViewReport={ViewReport}
            reportModal={reportModal}
            report={report}
            getPendingforAcceptance={getAssignmentData}
            deleiverAble="#7c887c"
          />
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getAssignmentData}
            headColor="#7c887c"
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default FinalReport;
