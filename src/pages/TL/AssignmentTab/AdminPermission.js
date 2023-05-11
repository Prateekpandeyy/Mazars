import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { getErrorMessage } from "../../../constants";
import Loader from "../../../components/Loader/Loader";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import { Link } from "react-router-dom";
import Records from "../../../components/Records/Records";
import ViewAllReportModal from "./ViewAllReport";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import DiscardReport from "../AssignmentTab/DiscardReport";
import moment from "moment";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  ViewDiscussionIcon,
  Payment,
} from "../../../components/Common/MessageIcon";
import { Spinner } from "reactstrap";

import PaginatorTL from "../../../components/Paginator/PaginatorTL";
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

function AdminPermission(props) {
  const [loading, setLoading] = useState(false);
  const userid = window.localStorage.getItem("tlkey");

  const [assignmentDisplay, setAssignmentDisplay] = useState([]);
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [assignmentCount, setCountAssignment] = useState("");
  const [records, setRecords] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [status, setStatus] = useState("");
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [hide, setHide] = useState();
  const [report, setReport] = useState();
  const [error, setError] = useState(false);
  const [scrolledTo, setScrolledTo] = useState("");
  const [lastDown, setLastDown] = useState("");
  const myRef = useRef([]);
  const myRefs = useRef([]);

  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);

  const [item] = useState(current_date);
  var rowStyle2 = {};
  const [reportModal, setReportModal] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [queryNo, setQueryNo] = useState("");
  const ViewReport = (key) => {
    setReportModal(!reportModal);
    setReport(key);
    if (reportModal === false) {
      setScrolledTo(key);
    }
  };
  const allEnd = Number(localStorage.getItem("tl_record_per_page"));
  const classes = useStyles();
  const [count, setCount] = useState("0");
  const [onPage, setOnPage] = useState(1);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState("");
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");

  const [assignNo, setAssignNo] = useState(null);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [categoryData, setCategory] = useState([]);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);

    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key);
    }
  };

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("tlcategoryData"));
    setCategory(data);
  }, []);

  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo];
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: "center" });
    }
  }, [ViewDiscussion]);
  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [reportModal]);

  //handleCategory
  const handleCategory = (value) => {
    setSelectedData(value);
    if (value == 1) {
      setTax2(JSON.parse(localStorage.getItem("Direct tax")));
    } else {
      setTax2(JSON.parse(localStorage.getItem("Indirect tax")));
    }
    setStore2([]);
  };

  useEffect(() => {
    console.log(selectedData, "selected data");
    if (selectedData == 1) {
      setTax2(JSON.parse(localStorage.getItem("Direct tax")));
    } else if (selectedData == 2) {
      setTax2(JSON.parse(localStorage.getItem("Indirect tax")));
    } else {
    }
  }, [selectedData]);

  useEffect(() => {
    let pageno = JSON.parse(localStorage.getItem("tlAssignment4"));
    let arrow = localStorage.getItem("tlArrowAs4");
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    // let sortVal = JSON.parse(localStorage.getItem("freezetlAssignment4"));
    // if (!sortVal) {
    //   let sort = {
    //     orderBy: 0,
    //     fieldBy: 0,
    //   };
    //   localStorage.setItem("freezetlAssignment4", JSON.stringify(sort));
    // }
    let data = JSON.parse(localStorage.getItem("searchDatatlAssignment4"));
    if (!data) {
      if (pageno) {
        getAssignmentData(pageno);
      } else {
        getAssignmentData(1);
        localStorage.setItem(`tlAssignment4`, JSON.stringify(1));
      }
    }
    // getAssignmentData();
  }, []);

  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getAssignmentData = (e) => {
    if ((e === undefined)) {
      console.log(e,'e');
      e=1;
    }
    let data = JSON.parse(localStorage.getItem("searchDatatlAssignment4"));
    let pagetry = JSON.parse(localStorage.getItem("freezetlAssignment4"));
    localStorage.setItem(`tlAssignment4`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    // setLoading(true);
    if (pagetry) {
      remainApiPath = `tl/getadminpermissiona?page=${e}&tp_id=${JSON.parse(
        userid
      )}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `tl/getadminpermissiona?page=${e}&tp_id=${JSON.parse(
        userid
      )}`;
    }

    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        let data = res.data.result;
        setRecords(res.data.result.length);
        let all = [];
        let customId = 1;
        if (e > 1) {
          customId = allEnd * (e - 1) + 1;
        }
        data?.map((i) => {
          let data = {
            ...i,
            cid: customId,
          };
          customId++;
          all.push(data);
        });
        setAssignmentDisplay(all);
        setCount(res.data.total);
        setCountAssignment(res.data.result.length);
        setRecords(res.data.result.length);
      }
    });
  };
  // useEffect(() => {
  //   let dk = JSON.parse(localStorage.getItem("searchDatatlAssignment4"));
  //   let pageno = JSON.parse(localStorage.getItem("tlAssignment4"));
  //   if (dk) {
  //     if (dk.route === window.location.pathname) {
  //       setStore2(dk.store);
  //       setToDate(dk.toDate);
  //       setFromDate(dk.fromDate);
  //       setSelectedData(dk.pcatId);
  //       setStatus(dk.stage_status);
  //       setQueryNo(dk.query_no);
  //       setHide(dk.p_status);
  //       if (pageno) {
  //         onSubmit(dk, pageno);
  //       } else {
  //         onSubmit(dk, 1);
  //       }
  //     }
  //   }
  // }, []);

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

  useEffect(() => {
    // setTax2(JSON.parse(localStorage.getItem(selectedData)));
    if (selectedData == 1) {
      setTax2(JSON.parse(localStorage.getItem("Direct tax")));
    } else if (selectedData == 2) {
      setTax2(JSON.parse(localStorage.getItem("Indirect tax")));
    } else {
    }
  }, [selectedData]);

  //reset date
  const resetData = () => {
    reset();
    setTax2([]);
    setError(false);
    setHide("");
    setStatus("");
    setSelectedData([]);
    setStore2([]);
    setToDate("");
    setFromDate("");
    setQueryNo("");
    localStorage.removeItem("searchDatatlAssignment4");
    setresetTrigger(!resetTrigger);
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem("tlAssignment4");
    localStorage.removeItem(`freezetlAssignment4`);
    localStorage.removeItem("tlArrowAs4");
    getAssignmentData(1);
  };

  //assingmentStatus
  const assingmentStatus = (value) => {
    setError(false);
    setStatus(value);
  };

  function headerLabelFormatter(column) {
    return (
      <div>
        {column.dataField === isActive ? (
          <div className="d-flex text-white w-100 flex-wrap">
            {column.text}
            {accend === column.dataField ? (
              <ArrowDropUpIcon
                className={turnGreen === true ? classes.isActive : ""}
              />
            ) : (
              <ArrowDropDownIcon
                className={turnGreen === true ? classes.isActive : ""}
              />
            )}
          </div>
        ) : (
          <div className="d-flex text-white w-100 flex-wrap">
            {column.text}
            {accend === column.dataField ? (
              <ArrowDropUpIcon />
            ) : (
              <ArrowDropDownIcon />
            )}
          </div>
        )}
      </div>
    );
  }

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    };
    localStorage.setItem(`tlAssignment4`, JSON.stringify(1));
    localStorage.setItem(`freezetlAssignment4`, JSON.stringify(obj));
    let data = JSON.parse(localStorage.getItem("searchDatatlAssignment4"));
    if (data) {
      if (data?.stage_status?.length > 0) {
        remainApiPath = `tl/getadminpermissiona?page=1&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getadminpermissiona?page=1&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
      }
    } else {
      remainApiPath = `tl/getadminpermissiona?page=1&tp_id=${JSON.parse(
        userid
      )}&orderby=${val}&orderbyfield=${field}`;
    }
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        let all = [];
        let sortId = 1;
        res.data.result?.map((i) => {
          let data = {
            ...i,
            cid: sortId,
          };
          sortId++;
          all.push(data);
        });
        setAssignmentDisplay(all);
        setRecords(res.data.result.length);
        setCount(res.data.total);
        setTurnGreen(true);
        setresetTrigger(!resetTrigger);
      }
    });
  };

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
            {row.cid}
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tlArrowAs4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs4");
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
                pathname: `/teamleader_queries/${row.q_id}`,
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
          setIsActive(field);
          localStorage.setItem("tlArrowAs4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs4");
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
          localStorage.setItem("tlArrowAs4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs4");
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tlArrowAs4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs4");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 5);
      },

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
          setIsActive(field);
          localStorage.setItem("tlArrowAs4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs4");
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
          setIsActive(field);
          localStorage.setItem("tlArrowAs4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs4");
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
          setIsActive(field);
          localStorage.setItem("tlArrowAs4", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs4");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 8);
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
                  pathname: `/teamleader_chatting/${row.q_id}`,
                  index: 0,
                  routes: "assignment",
                  obj: {
                    message_type: "3",
                    query_No: row.assign_no,
                    query_id: row.q_id,
                    routes: `/teamleader/assignment`,
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
  useEffect(() => {
    let dk = JSON.parse(localStorage.getItem("searchDatatlAssignment4"));
    let pageno = JSON.parse(localStorage.getItem("tlAssignment4"));

    if (dk) {
      if (dk.route === window.location.pathname) {
        setStore2(dk.store);
        setToDate(dk.toDate);
        setFromDate(dk.fromDate);
        setSelectedData(dk.pcatId);
        setStatus(dk.stage_status);
        setQueryNo(dk.query_no);
        setHide(dk.p_status);
        if (pageno) {
          onSubmit(dk, pageno);
        } else {
          onSubmit(dk, 1);
        }
      }
    }
  }, []);
  const onSubmit = (data, e) => {
    let pagetry = JSON.parse(localStorage.getItem("freezetlAssignment4"));
    let pageno = JSON.parse(localStorage.getItem("tlAssignment4"));
    if (pageno) {
      let e = pageno;
    } else {
      let e = 1;
    }
    let remainApiPath = "";
    let val = pagetry?.val;
    let field = pagetry?.field;

    let obj = {};
    if (data.route) {
      obj = {
        store: data.store,
        fromDate: data.fromDate,
        toDate: data.toDate,
        pcatId: data.pcatId,
        query_no: data?.query_no,
        p_status: data?.p_status,
        stage_status: data?.stage_status,
        route: window.location.pathname,
      };
    } else {
      obj = {
        store: store2,
        fromDate: fromDate,
        toDate: toDate,
        pcatId: selectedData,
        query_no: data?.query_no,
        p_status: hide,
        stage_status: status,
        route: window.location.pathname,
      };
    }
    localStorage.setItem(`searchDatatlAssignment4`, JSON.stringify(obj));

    if (data.route) {
      if (status.length > 0) {
        if (pagetry) {
          remainApiPath = `tl/getadminpermissiona?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
        } else {
          remainApiPath = `tl/getadminpermissiona?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}`;
        }
      } else {
        if (pagetry) {
          remainApiPath = `tl/getadminpermissiona?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
        } else {
          remainApiPath = `tl/getadminpermissiona?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}`;
        }
      }
      axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
        if (res.data.code === 1) {
          if (res.data.result) {
            let data = res.data.result;
            setRecords(res.data.result.length);
            let all = [];
            let customId = 1;
            if (e > 1) {
              customId = allEnd * (e - 1) + 1;
            }
            data?.map((i) => {
              let data = {
                ...i,
                cid: customId,
              };
              customId++;
              all.push(data);
            });
            setAssignmentDisplay(all);
            setRecords(res.data.result.length);
            setCount(res.data.total);
          }
        }
      });
    } else {
      if (status?.length > 0) {
        remainApiPath = `tl/getadminpermissiona?page=1&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&assignment_status=${status}&stages_status=${data.p_status}&pcat_id=${selectedData}&qno=${data.query_no}`;
      } else {
        remainApiPath = `tl/getadminpermissiona?page=1&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&assignment_status=${status}&stages_status=${data.p_status}&pcat_id=${selectedData}&qno=${data.query_no}`;
      }
      axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
        if (res.data.code === 1) {
          if (res.data.result) {
            let data = res.data.result;
            setRecords(res.data.result.length);
            let all = [];
            let customId = 1;
            if (e > 1) {
              customId = allEnd * (e - 1) + 1;
            }
            data?.map((i) => {
              let data = {
                ...i,
                cid: customId,
              };
              customId++;
              all.push(data);
            });
            setAssignmentDisplay(all);
            setRecords(res.data.result.length);
            setCount(res.data.total);
            setresetTrigger(!resetTrigger);
            localStorage.removeItem(`freezetlAssignment4`);
            localStorage.removeItem("tlArrowAs4");
            setAccend("");
            setTurnGreen(false);
          }
        }
      });
    }
  };

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
    setStatus("");
    setHide(e.target.value);
    setError(false);
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
                  {categoryData.map((p, index) => (
                    <Option value={p.id} key={index}>
                      {p.details}
                    </Option>
                  ))}
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
                  onChange={(e) => setFromDate(e.target.value)}
                  value={fromDate}
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
                  onChange={(e) => setToDate(e.target.value)}
                  value={toDate}
                  max={item}
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
                  className="form-control"
                  onChange={(e) => setQueryNo(e.target.value)}
                  value={queryNo}
                />
              </div>
              {loading ? (
                // <Loader />
                <div class="col-md-12">
                  <Spinner color="primary" />
                </div>
              ) : (
                <button type="submit" className="customBtn">
                  Search
                </button>
              )}

              <Reset />
            </div>
          </form>
        </CardHeader>

        <CardBody className="card-body">
          <Row className="mb-2">
            <Col md="12" align="right">
              <PaginatorTL
                count={count}
                setOnPage={setOnPage}
                // resetPaging={resetPaging}
                resetTrigger={resetTrigger}
                setresetTrigger={setresetTrigger}
                index="tlAssignment4"
                setData={setAssignmentDisplay}
                getData={getAssignmentData}
                tlAsAdminPermission="tlAsAdminPermission"
              />
            </Col>
          </Row>
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

          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getAssignmentData}
            headColor="#5a625a"
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default AdminPermission;
