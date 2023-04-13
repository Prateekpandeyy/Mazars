import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import { Link } from "react-router-dom";
import ViewAllReportModal from "./ViewAllReport";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import DiscardReport from "../AssignmentTab/DiscardReport";
import moment from "moment";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  ViewDiscussionIcon,
} from "../../../components/Common/MessageIcon";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { current_date } from "../../../common/globalVeriable";
function AssignmentComponent(props) {
  const [assignmentDisplay, setAssignmentDisplay] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [status, setStatus] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [hide, setHide] = useState();
  const [report, setReport] = useState();
  const [error, setError] = useState(false);

  const [reportModal, setReportModal] = useState(false);
  const [assignNo, setAssignNo] = useState(null);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [queryNo, setQueryNo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [countNotification, setCountNotification] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [accend, setAccend] = useState(false);
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const [scrolledTo, setScrolledTo] = useState("");

  const myRef = useRef([]);

  const token = window.localStorage.getItem("adminToken");
  var rowStyle2 = {};
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const { handleSubmit, register, errors, reset } = useForm();
  const { Option } = Select;
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key);
    }
  };
  function headerLabelFormatter(column, colIndex) {
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        {column.text}
        {accend === column.dataField ? (
          <ArrowDownwardIcon />
        ) : (
          <ArrowUpwardIcon />
        )}
      </div>
    );
  }
  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [ViewDiscussion]);

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
  useEffect(() => {
    let localPage = Number(localStorage.getItem("adminassign1"));
    if (!localPage) {
      localPage = 1;
    }
    setAccend(localStorage.getItem("accendassign1"));
    let sortVal = JSON.parse(localStorage.getItem("sortedValueassign1"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("sortedValueassign1", JSON.stringify(sort));
    }
    setPage(localPage);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    getAssignmentData(localPage);
  }, []);
  const getAssignmentData = (e) => {
    let sortVal = JSON.parse(localStorage.getItem("sortedValueassign1"));
    let orderBy = 0;
    let fieldBy = 0;

    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    let remainApiPath = "";
    let searchData = JSON.parse(
      localStorage.getItem(`searchDataadAssignment1`)
    );
    if (searchData) {
      remainApiPath = `/admin/getAssignments?page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}&cat_id=${
        searchData.store
      }&from=${searchData.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${searchData.toDate
        ?.split("-")
        .reverse()
        .join("-")}&assignment_status=${
        searchData.stage_status
      }&stages_status=${searchData.p_status}&pcat_id=${searchData.pcatId}&qno=${
        searchData?.query_no
      }`;
    } else {
      remainApiPath = `admin/getAssignments?page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
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
  const sortMessage = (val, field) => {
    let remainApiPath = "";

    let sort = {
      orderBy: val,
      fieldBy: field,
    };
    localStorage.setItem("adminassign1", 1);
    localStorage.setItem("sortedValueassign1", JSON.stringify(sort));
    let searchData = JSON.parse(
      localStorage.getItem(`searchDataadAssignment1`)
    );
    if (searchData) {
      remainApiPath = `/admin/getAssignments?orderby=${val}&orderbyfield=${field}&cat_id=${
        searchData.store
      }&from=${searchData.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${searchData.toDate
        ?.split("-")
        .reverse()
        .join("-")}&assignment_status=${
        searchData.stage_status
      }&stages_status=${searchData.p_status}&pcat_id=${searchData.pcatId}&qno=${
        searchData?.query_no
      }`;
    } else {
      remainApiPath = `admin/getAssignments?orderby=${val}&orderbyfield=${field}`;
    }
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        let all = [];
        let sortId = 1;
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
    localStorage.setItem("adminassign1", 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getAssignmentData(page - 1);
    localStorage.setItem("adminassign1", Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    localStorage.setItem("adminassign1", Number(page) + 1);
    getAssignmentData(page + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getAssignmentData(defaultPage.at(-1));
    setAtpage(totalPages);
    localStorage.setItem("adminassign1", defaultPage.at(-1));
  };
  //get category
  useEffect(() => {
    const getSubCategory = () => {
      if (selectedData?.length > 0) {
        axios
          .get(`${baseUrl}/admin/getCategory?pid=${selectedData}`, myConfig)
          .then((res) => {
            if (res.data.code === 1) {
              setTax2(res.data.result);
            }
          });
      }
    };
    getSubCategory();
  }, [selectedData]);

  //handleCategory
  const handleCategory = (value) => {
    setError(false);
    setSelectedData(value);
    setStore2([]);
  };

  //handleSubCategory
  const handleSubCategory = (value) => {
    setError(false);
    setStore2(value);
  };

  //reset category
  const resetCategory = () => {
    setSelectedData([]);
    setStore2([]);
    getAssignmentData();
    setError(false);
    setTax2([]);
  };

  //reset date
  const resetData = () => {
    reset();
    resetPaging();
    setTax2([]);
    setError(false);
    setHide("");
    setStatus([]);
    setSelectedData([]);
    setStore2([]);
    setFromDate("");
    setToDate("");
    setQueryNo("");
    setPage(1);
    localStorage.removeItem("searchDataadAssignment1");
    localStorage.removeItem("sortedValueassign1");

    getAssignmentData(1);
  };

  //assingmentStatus
  const assingmentStatus = (value) => {
    setError(false);

    setStatus(value);
  };

  const columns = [
    {
      text: "S.no",
      dataField: "cid",

      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Date",
      dataField: "date_of_query",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendassign1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendassign1");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },
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
                index: 0,
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendassign1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendassign1");
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
          localStorage.setItem("accendassign1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendassign1");
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendassign1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendassign1");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 6);
      },

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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendassign1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendassign1");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 7);
      },
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendassign1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendassign1");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 9);
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
                  index: 0,
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
        p_status: data?.p_status,
        stage_status: data?.assignment_status,
        route: window.location.pathname,
      };
    } else {
      obj = {
        store: store2,
        fromDate: fromDate?.split("-").reverse().join("-"),
        toDate: toDate?.split("-").reverse().join("-"),
        pcatId: selectedData,
        query_no: data?.query_no,
        p_status: hide,
        stage_status: status,
        route: window.location.pathname,
      };
    }
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    localStorage.setItem(`searchDataadAssignment1`, JSON.stringify(obj));
    if (data.route) {
      if (status?.length > 0) {
        axios
          .get(
            `${baseUrl}/admin/getAssignments?cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              if (res.data.result) {
                localStorage.setItem("adminassign1", 1);
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
            `${baseUrl}/admin/getAssignments?cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              localStorage.setItem("adminassign1", 1);
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
    } else {
      if (status?.length > 0) {
        axios
          .get(
            `${baseUrl}/admin/getAssignments?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&assignment_status=${status}&stages_status=${data.p_status}&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              localStorage.setItem("adminassign1", 1);
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
            `${baseUrl}/admin/getAssignments?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&assignment_status=${status}&stages_status=${data.p_status}&pcat_id=${selectedData}&qno=${data.query_no}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              if (res.data.result) {
                localStorage.setItem("adminassign1", 1);
                setBig(1);
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

                setEnd(end);

                for (let i = 1; i <= dynamicPage; i++) {
                  droppage.push(i);
                }

                setDefaultPage(droppage);
                droppage = [];

                setPage(1);
              }
            }
          });
      }
    }
  };
  useEffect(() => {
    let dk = JSON.parse(localStorage.getItem("searchDataadAssignment1"));

    if (dk) {
      if (dk.route === window.location.pathname) {
        setStore2(dk.store);
        setToDate(dk.toDate);
        setFromDate(dk.fromDate);
        setSelectedData(dk.pcatId);
        setStatus(dk.stage_status);
        setQueryNo(dk.query_no);
        setHide(dk.p_status);
        // onSubmit(dk);
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

  const disabledHandler = (e) => {
    setStatus([]);
    setHide(e.target.value);
    setError(false);
  };
  const resetPaging = () => {
    setPage(1);
    setBig(1);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
    localStorage.removeItem("adminassign1");
    localStorage.removeItem("sortedValueassign1");
    localStorage.removeItem("accendassign1");
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
                  max={current_date}
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
                  max={current_date}
                />
              </div>

              <div className="form-group mx-sm-1  mb-2">
                <select
                  className="form-select form-control"
                  name="p_status"
                  ref={register}
                  style={{ height: "33px" }}
                  value={hide}
                  onChange={(e) => disabledHandler(e)}
                >
                  <option value="">--select--</option>
                  <option value="1">Inprogress</option>
                  <option value="2">Completed</option>
                  <option value="3">Payment Declined</option>
                </select>
              </div>

              {hide !== "3" ? (
                <div className="form-group mx-sm-1  mb-2">
                  <Select
                    mode="single"
                    style={{ width: 210 }}
                    placeholder="Select stages"
                    defaultValue={[]}
                    onChange={assingmentStatus}
                    value={status}
                    allowClear
                    className={error ? "customError" : ""}
                  >
                    <Option value="Client_Discussion" label="Compilance">
                      <div className="demo-option-label-item">
                        Client Discussion
                      </div>
                    </Option>
                    <Option value="Draft_Report" label="Compilance">
                      <div className="demo-option-label-item">
                        Draft reports
                      </div>
                    </Option>
                    <Option value="Final_Discussion" label="Compilance">
                      <div className="demo-option-label-item">
                        Final Discussion
                      </div>
                    </Option>
                    <Option value="Delivery_of_report" label="Compilance">
                      <div className="demo-option-label-item">
                        Delivery of Final Reports
                      </div>
                    </Option>
                    <Option value="Completed" label="Compilance">
                      <div className="demo-option-label-item">
                        Awaiting Completion
                      </div>
                    </Option>
                  </Select>
                </div>
              ) : (
                ""
              )}
              <div className="form-group mx-sm-1  mb-2">
                <input
                  type="text"
                  name="query_no"
                  ref={register}
                  placeholder="Enter Query Number"
                  value={queryNo}
                  onChange={(e) => setQueryNo(e.target.value)}
                  className="form-control"
                />
              </div>
              <button type="submit" className="customBtn">
                Search
              </button>

              <Reset />
            </div>
          </form>
        </CardHeader>

        <CardBody>
          <Row>
            <Col md="6"></Col>
            <Col md="6" align="right">
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
                            "adminassign1",
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
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getAssignmentData}
            headColor="#5a625a"
          />
          <DataTablepopulated
            bgColor="#5a625a"
            keyField={"assign_no"}
            data={assignmentDisplay}
            rowStyle2={rowStyle2}
            columns={columns}
          ></DataTablepopulated>

          {reportModal === true ? (
            <ViewAllReportModal
              ViewReport={ViewReport}
              reportModal={reportModal}
              report={report}
              getPendingforAcceptance={getAssignmentData}
              deleiverAble="#5a625a"
            />
          ) : (
            ""
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default AssignmentComponent;
