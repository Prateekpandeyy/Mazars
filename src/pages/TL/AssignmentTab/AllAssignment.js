import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import DraftReportModal from "./DraftReportUpload";
import FinalReportUpload from "./FinalReportUpload";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Select } from "antd";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ViewAllReportModal from "./ViewAllReport";
import DiscardReport from "../AssignmentTab/DiscardReport";
import moment from "moment";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import PaginatorTL from "../../../components/Paginator/PaginatorTL";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MessageIcon, {
  ViewDiscussionIcon,
  DraftReportUploadIcon,
  FinalReportUploadIcon,
} from "../../../components/Common/MessageIcon";
import { current_date } from "../../../common/globalVeriable";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));
function AssignmentTab(props) {
  const [loading, setLoading] = useState(false);

  const userid = window.localStorage.getItem("tlkey");
  const allEnd = Number(localStorage.getItem("tl_record_per_page"));
  const classes = useStyles();
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option } = Select;

  const [assignment, setAssignment] = useState([]);
  const [id, setId] = useState("");
  const [finalId, setFinalId] = useState("");
  const [records, setRecords] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [status, setStatus] = useState("");
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [hide, setHide] = useState();
  const [fianlModal, setFianlModal] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const [report, setReport] = useState();
  const [reportModal, setReportModal] = useState(false);
  const [assignNo, setAssignNo] = useState("");
  const [qid, setQid] = useState("");
  const [error, setError] = useState(false);
  const [ViewDiscussion, setViewDiscussion] = useState(false);

  const [count, setCount] = useState(0);
  const [onPage, setOnPage] = useState(1);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState("");
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");

  const [queryNo, setQueryNo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(current_date);
  const [categoryData, setCategory] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const [lastDown, setLastDown] = useState("");
  const myRef = useRef([]);
  const myRefs = useRef([]);

  let des = false;
  var rowStyle2 = {};
  const ViewReport = (key) => {
    setReportModal(!reportModal);
    setReport(key.assign_no);
    setDataItem(key);
    if (reportModal === false) {
      setScrolledTo(key.assign_no);
      console.log(key.assign_no);
    }
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [reportModal]);

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
    let pageno = JSON.parse(localStorage.getItem("tlAssignment1"));
    let arrow = localStorage.getItem("tlArrowAs1");
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    // let sortVal = JSON.parse(localStorage.getItem("freezetlAssignment1"));
    // if (!sortVal) {
    //   let sort = {
    //     orderBy: 0,
    //     fieldBy: 0,
    //   };
    //   localStorage.setItem("freezetlAssignment1", JSON.stringify(sort));
    // }
    let data = JSON.parse(localStorage.getItem("searchDatatlAssignment1"));
    if (!data) {
      if (pageno) {
        getAssignmentList(pageno);
      } else {
        getAssignmentList(1);
        localStorage.setItem(`tlAssignment1`, JSON.stringify(1));
      }
    }
    // getAssignmentList();
  }, []);
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getAssignmentList = (e) => {
    if (e === undefined) {
      console.log(e, "e");
      e = 1;
    }
    console.log(e, "e");
    let data = JSON.parse(localStorage.getItem("searchDatatlAssignment1"));
    let pagetry = JSON.parse(localStorage.getItem("freezetlAssignment1"));
    localStorage.setItem(`tlAssignment1`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);
    if (pagetry) {
      remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
        userid
      )}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(userid)}`;
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
        data.map((i) => {
          let data = {
            ...i,
            cid: customId,
          };
          customId++;
          all.push(data);
        });
        setAssignment(all);
        props.setAllAssignmentCount(res.data.result.length);
        setRecords(res.data.result.length);
        setCount(res.data.total);
      }
    });
  };
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("tlcategoryData"));
    setCategory(data);
  }, []);

  //handleCategory
  const handleCategory = (value) => {
    setSelectedData(value);
    if (value == 1) {
      setTax2(JSON.parse(localStorage.getItem("Direct tax")));
    } else {
      setTax2(JSON.parse(localStorage.getItem("Indirect tax")));
    }
    // setTax2(JSON.parse(localStorage.getItem(value)));
    setStore2([]);
    setError(false);
  };

  //get category
  useEffect(() => {
    console.log(selectedData, "selected data");
    if (selectedData == 1) {
      setTax2(JSON.parse(localStorage.getItem("Direct tax")));
    } else if (selectedData == 2) {
      setTax2(JSON.parse(localStorage.getItem("Indirect tax")));
    } else {
    }
    // const getSubCategory = () => {
    //   if (selectedData.length > 0) {
    //     axios
    //       .get(`${baseUrl}/customers/getCategory?pid=${selectedData}`, myConfig)
    //       .then((res) => {
    //         if (res.data.code === 1) {
    //           setTax2(res.data.result);
    //         }
    //       });
    //   }
    // };
    // getSubCategory();
  }, [selectedData]);

  //handleSubCategory
  const handleSubCategory = (value) => {
    setError(false);
    setStore2(value);
  };

  //reset category
  const resetCategory = () => {
    setSelectedData([]);
    setStore2([]);
    getAssignmentList();
    setError(false);
    setTax2([]);
  };

  //reset date
  const resetData = () => {
    reset();
    setTax2([]);
    setError(false);
    setHide("");
    setStatus("");
    setSelectedData([]);
    setToDate("");
    setFromDate("");
    setQueryNo("");
    setStore2([]);
    localStorage.removeItem("searchDatatlAssignment1");
    setresetTrigger(!resetTrigger);
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem("tlAssignment1");
    localStorage.removeItem(`freezetlAssignment1`);
    localStorage.removeItem("tlArrowAs1");
    getAssignmentList(1);
  };

  //assingmentStatus
  const assingmentStatus = (value) => {
    setError(false);
    setStatus(value);
  };

  function headerLabelFormatter(column) {
    // let reverse = "Exp_Delivery_Date"
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
              <ArrowDropDownIcon />
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
    localStorage.setItem(`tlAssignment1`, JSON.stringify(1));
    localStorage.setItem(`freezetlAssignment1`, JSON.stringify(obj));
    let data = JSON.parse(localStorage.getItem("searchDatatlAssignment1"));
    if (data) {
      if (data?.stage_status?.length > 0) {
        remainApiPath = `tl/getAssignments?page=1&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getAssignments?page=1&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
      }
    } else {
      remainApiPath = `tl/getAssignments?page=1&tl_id=${JSON.parse(
        userid
      )}&orderby=${val}&orderbyfield=${field}`;
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
        setAssignment(all);
        setRecords(res.data.result.length);
        setCount(res.data.total);
        setTurnGreen(true);
        setresetTrigger(!resetTrigger);
      }
    });
  };

  //columns
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
      text: "Query date",
      dataField: "date_of_query",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tlArrowAs1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs1");
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
          localStorage.setItem("tlArrowAs1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs1");
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
          localStorage.setItem("tlArrowAs1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs1");
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
        return { fontSize: "11px", width: "200px" };
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
      text: "Expected date of delivery",
      dataField: "Exp_Delivery_Date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tlArrowAs1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs1");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 6);
      },

      formatter: function dateFormat(cell, row) {
        var oldDate1 = row.final_date;

        let finalDate, expectedDate;
        if (oldDate1 && oldDate1 !== "0000-00-00 00:00:00") {
          finalDate = oldDate1.split(" ")[0].split("-").reverse().join("-");
        }
        var oldDate2 = row.Exp_Delivery_Date;

        expectedDate = oldDate2;
        if (expectedDate) {
          expectedDate = oldDate2.toString().split("-").reverse().join("-");
        }

        return <>{finalDate ? <p>{finalDate}</p> : <p>{expectedDate}</p>}</>;
      },
    },
    {
      text: "TP name",
      dataField: "tp_name",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tlArrowAs1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs1");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 7);
      },
    },

    {
      text: "Deliverable",
      dataField: "",
      sort: true,

      formatter: function (cell, row) {
        return (
          <>
            {row.paid_status == "2" ? null : (
              <div>
                {row.assignement_draft_report || row.final_report ? (
                  <div
                    title="View All Report"
                    style={{ cursor: "pointer", textAlign: "center" }}
                    onClick={() => ViewReport(row)}
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
      text: "Assignment stage",
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      style: {
        fontSize: "11px",
      },

      formatter: function (cell, row) {
        return (
          <>
            <div
              title="Add Assignment stages"
              style={{ cursor: "pointer", textAlign: "center" }}
            >
              {row.paid_status == "2" ? null : (
                <Link to={`/teamleader_addassingment/${row.q_id}`}>
                  <i class="fa fa-tasks"></i>
                </Link>
              )}
            </div>
          </>
        );
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
              {row.paid_status == "2" ? null : (
                <>
                  {row.client_discussion == "completed" &&
                  row.draft_report == "inprogress" &&
                  row.final_discussion == "inprogress" &&
                  row.paid_status != 2 ? (
                    <p
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        color: "green",
                      }}
                      onClick={() => uploadDraftReport(row)}
                    >
                      <DraftReportUploadIcon />
                      draft
                    </p>
                  ) : null}
                  {row.client_discussion == "completed" &&
                  row.draft_report == "completed" &&
                  row.final_discussion == "completed" &&
                  row.delivery_report == "inprogress" ? (
                    <p
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => uploadFinalReport(row)}
                    >
                      <FinalReportUploadIcon />
                      final
                    </p>
                  ) : null}
                </>
              )}
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

  // draft modal

  const uploadDraftReport = (id) => {
    if (id.id !== undefined) {
      setQid(id.q_id);
      setId(id.id);
      setDraftModal(!draftModal);
      setScrolledTo(id.assign_no);
      setLoading(false);
    } else {
      setDraftModal(!draftModal);
      setLoading(false);
      setId(id.id);
    }
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [draftModal]);

  // final modal
  console.log("done");
  const uploadFinalReport = (id) => {
    if (id && id.id === undefined) {
      setLoading(false);
      setFianlModal(!fianlModal);
    } else {
      setFianlModal(!fianlModal);
      setFinalId(id);
      setQid(id.q_id);
      setLoading(false);
    }
  };
  const onSubmit = (data, e) => {
    let pagetry = JSON.parse(localStorage.getItem("freezetlAssignment1"));
    let pageno = JSON.parse(localStorage.getItem("tlAssignment1"));
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

    localStorage.setItem(`searchDatatlAssignment1`, JSON.stringify(obj));
    if (data.route) {
      if (status?.length > 0) {
        if (pagetry) {
          remainApiPath = `tl/getAssignments?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
        } else {
          remainApiPath = `tl/getAssignments?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}`;
        }
      } else {
        if (pagetry) {
          remainApiPath = `tl/getAssignments?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
        } else {
          remainApiPath = `tl/getAssignments?page=${e}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.stage_status}&stages_status=${data.p_status}&pcat_id=${data.pcatId}&qno=${data.query_no}`;
        }
      }
      axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
        if (res.data.code === 1) {
          setLoading(false);
          if (res.data.result) {
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
            setAssignment(all);
            setRecords(res.data.result.length);
            setCount(res.data.total);
            setTurnGreen(true);
          }
        }
      });
    } else {
      if (status?.length > 0) {
        remainApiPath = `tl/getAssignments?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&assignment_status=${status}&stages_status=${data.p_status}&pcat_id=${selectedData}&qno=${data.query_no}`;
      } else {
        remainApiPath = `tl/getAssignments?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&assignment_status=${status}&stages_status=${data.p_status}&pcat_id=${selectedData}&qno=${data.query_no}`;
      }
      axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
        localStorage.setItem(`tlAssignment1`, JSON.stringify(1));
        if (res.data.code === 1) {
          if (res.data.result) {
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
            setAssignment(all);
            setRecords(res.data.result.length);
            setCount(res.data.total);
            setresetTrigger(!resetTrigger);
            localStorage.removeItem(`freezetlAssignment1`);
            localStorage.removeItem("tlArrowAs1");
            setAccend("");
            setTurnGreen(false);
          }
        }
      });
    }
  };

  useEffect(() => {
    let dk = JSON.parse(localStorage.getItem("searchDatatlAssignment1"));
    let pageno = JSON.parse(localStorage.getItem("tlAssignment1"));

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

  const Reset = () => {
    return (
      <>
        <button
          type="submit"
          class="customBtn mx-sm-1 mb-2"
          onClick={() => resetData()}
        >
          Reset
        </button>
      </>
    );
  };

  const disabledHandler = (e) => {
    setStatus("");
    setError(false);
    setHide(e.target.value);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-inline">
              <div class="form-group mb-2">
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

              <div class="form-group mx-sm-1  mb-2">
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
                  class="btnSearch mb-2 ml-3"
                  onClick={resetCategory}
                >
                  X
                </button>
              </div>

              <div class="form-group mx-sm-1  mb-2">
                <label className="form-select form-control">From</label>
              </div>

              <div class="form-group mx-sm-1  mb-2">
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

              <div class="form-group mx-sm-1  mb-2">
                <label className="form-select form-control">To</label>
              </div>

              <div class="form-group mx-sm-1  mb-2">
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

              <div class="form-group mx-sm-1  mb-2">
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
                " "
              )}
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
              {/* <div class="form-group mx-sm-1  mb-2">
                  <label className="form-select form-control">
                    Total Records : {records}
                  </label>
                </div> */}
              <button type="submit" class="customBtn mx-sm-1 mb-2">
                Search
              </button>

              <Reset />
            </div>
          </form>
        </CardHeader>

        <CardBody>
          <Row className="mb-2">
            <Col md="12" align="right">
              <PaginatorTL
                count={count}
                setOnPage={setOnPage}
                resetTrigger={resetTrigger}
                setresetTrigger={setresetTrigger}
                index="tlAssignment1"
                AllAssignment="AllAssignment"
                setData={setAssignment}
                getData={getAssignmentList}
              />
            </Col>
          </Row>
          <DataTablepopulated
            bgColor="#5a625a"
            keyField={"assign_no"}
            rowStyle2={rowStyle2}
            data={assignment}
            columns={columns}
          ></DataTablepopulated>
        </CardBody>
      </Card>
      <DraftReportModal
        draftModal={draftModal}
        uploadDraftReport={uploadDraftReport}
        getAssignmentList={getAssignmentList}
        id={id}
        loading={loading}
        setLoading={setLoading}
        des={des}
        qno={qid}
        setDraftModal={setDraftModal}
      />

      <FinalReportUpload
        fianlModal={fianlModal}
        uploadFinalReport={uploadFinalReport}
        getAssignmentList={getAssignmentList}
        id={finalId}
        loading={loading}
        setLoading={setLoading}
        des={des}
        setFianlModal={setFianlModal}
        qno={qid}
      />

      <DiscardReport
        ViewDiscussionToggel={ViewDiscussionToggel}
        ViewDiscussion={ViewDiscussion}
        report={assignNo}
        getData={getAssignmentList}
        headColor="#5a625a"
      />
      <ViewAllReportModal
        ViewReport={ViewReport}
        reportModal={reportModal}
        report={report}
        dataItem={dataItem}
        k
        headColor="#5a625a"
      />
    </>
  );
}

export default AssignmentTab;
