import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import BootstrapTable from "react-bootstrap-table-next";
import DiscardReport from "../AssignmentTab/DiscardReport";
import DraftReportModal from "./DraftReportUpload";
import ViewAllReportModal from "./ViewAllReport";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  ViewDiscussionIcon,
  DraftReportUploadIcon,
  FinalReportUploadIcon,
} from "../../../components/Common/MessageIcon";
import moment from "moment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Paginator from "../../../components/Paginator/Paginator";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));

function AssignmentTab() {
  const userid = window.localStorage.getItem("tpkey");
  const allEnd = Number(localStorage.getItem("tp_record_per_page"));
  const classes = useStyles();

  const { handleSubmit, register, reset } = useForm();
  const { Option } = Select;

  const [assignment, setAssignment] = useState([]);
  const [id, setId] = useState("");
  const [stored, setStored] = useState("");


  const [count, setCount] = useState("0");
  const [onPage, setOnPage] = useState(1);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState('');
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");

  const [records, setRecords] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [status, setStatus] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [hide, setHide] = useState();

  const [scrolledTo, setScrolledTo] = useState("");
  const [lastDown, setLastDown] = useState("");
  const [runTo, setRunTo] = useState("");
  const myRef = useRef([]);
  const myRefs = useRef([]);
  const myRefss = useRef([]);

  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);
  const [item] = useState(current_date);
  const [dataItem, setDataItem] = useState({});
  const [draftModal, setDraftModal] = useState(false);
  const [assignNo, setAssignNo] = useState("");
  const [report, setReport] = useState();
  const [reportModal, setReportModal] = useState(false);
  const [queryNo, setQueryNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [categoryData, setCategory] = useState([]);
  const [prev, setPrev] = useState("");

  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  let des = false;
  const ViewReport = (key) => {
    setReportModal(!reportModal);
    setReport(key.assign_no);
    setDataItem(key);
    if (reportModal === false) {
      setScrolledTo(key.assign_no);
    }
  };

  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo];
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: "center" });
    }
  }, [reportModal]);

  // draft modal
  const uploadDraftReport = (id) => {
    if (typeof id.id == "object") {
      let des = true;
      setLoading(false);
      setDraftModal(!draftModal);
    } else {
      setDraftModal(!draftModal);
      setId(id.id);
    }
    if (id.id !== undefined) {
      setScrolledTo(id.assign_no);
    }
  };

  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo];
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: "center" });
    }
  }, [draftModal]);

  const [ViewDiscussion, setViewDiscussion] = useState(false);
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
  // console.log("catData", categoryData);

  useEffect(() => {
    let pageno = JSON.parse(localStorage.getItem("tpAssignment2"));
    let arrow = localStorage.getItem("tpArrowAs2")
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    let sortVal = JSON.parse(localStorage.getItem("freezetpAssignment2"));
    // if (!sortVal) {
    //   let sort = {
    //     orderBy: 0,
    //     fieldBy: 0,
    //   };
    //   localStorage.setItem("freezetpAssignment2", JSON.stringify(sort));
    // }
    let data = JSON.parse(localStorage.getItem("searchDatatpAssignment2"));
    if (!data) {
      if (pageno) {
        getAssignmentList(pageno);
      } else {
        getAssignmentList(1);
        localStorage.setItem(`tpAssignment2`, JSON.stringify(1));
      }
    }
    // getAssignmentList();
  }, []);

  const getAssignmentList = (e) => {
    let data = JSON.parse(localStorage.getItem("searchDatatpAssignment2"));
    let pagetry = JSON.parse(localStorage.getItem("freezetpAssignment2"));
    localStorage.setItem(`tpAssignment2`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);
    if ((!data) && (pagetry)) {
      remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
        userid
      )}&assignment_status=Draft_Report&stages_status=1&orderby=${val}&orderbyfield=${field}`
    } else if ((!data) && (!pagetry)) {
      remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(
        userid
      )}&assignment_status=Draft_Report&stages_status=1`
    } else { }
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
          data?.map((i) => {
            let data = {
              ...i,
              cid: customId,
            };
            customId++;
            all.push(data);
          });
          setAssignment(all);
          setCount(res.data.total);
          setRecords(res.data.result.length);
        }
      });
  };

  //get category

  //handleCategory
  const handleCategory = (value) => {
    setSelectedData(value);
    if(value == 1){
      setTax2(JSON.parse(localStorage.getItem("Direct tax")));
    }else{
      setTax2(JSON.parse(localStorage.getItem("Indirect tax")));
    }
    setStore2([]);
  };

  

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("tpcategoryData"));
    setCategory(data);
  }, []);

  useEffect(() => {
    if (selectedData == 1) {
      setTax2(JSON.parse(localStorage.getItem("Direct tax")));
    } else if (selectedData == 2) {
      setTax2(JSON.parse(localStorage.getItem("Indirect tax")));
    } else { }
  }, [selectedData]);

  //handleSubCategory
  const handleSubCategory = (value) => {
    setStore2(value);
  };

  //reset category
  const resetCategory = () => {
    setSelectedData([]);
    setStore2([]);
    getAssignmentList();
  };

  //reset date
  const resetData = () => {
    reset();
    setStatus([]);
    setSelectedData([]);
    setStore2([]);
    setToDate("");
    setFromDate("");
    setQueryNo("");
    localStorage.removeItem("searchDatatpAssignment2");
    getAssignmentList(1);
    setresetTrigger(!resetTrigger);
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem("tpAssignment2");
    localStorage.removeItem(`freezetpAssignment2`);
    localStorage.removeItem("tpArrowAs2");
    localStorage.removeItem("prevtpAs2");
    setPrev("")
  };

  //assingmentStatus

  // function headerLabelFormatter(column) {
  //   // let reverse = "Exp_Delivery_Date"
  //   return(
  //     <div>
  //     {column.dataField === isActive ?
  //       (
  //         <div className="d-flex text-white w-100 flex-wrap">
  //           {column.text}
  //           {accend === column.dataField ? (
  //             <ArrowDropDownIcon 
  //             className={turnGreen === true ? classes.isActive : ""}
  //             />
  //           ) : (
  //             <ArrowDropUpIcon 
  //             className={turnGreen === true ? classes.isActive : ""}
  //             />
  //           )}
  //         </div>
  //       )
  //       :
  //       (
  //         <div className="d-flex text-white w-100 flex-wrap">
  //           {column.text}
  //           {accend === column.dataField ? (
  //             <ArrowDropDownIcon />
  //           ) : (
  //             <ArrowDropUpIcon />
  //           )}
  //         </div>
  //       )
  //     }
  //     </div>
  //   )
  // }

  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("tpArrowAs2") === column.dataField ||
      localStorage.getItem("prevtpAs2") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevtpAs2", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("tpArrowAs2") === column.dataField ? (
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

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    }
    localStorage.setItem(`tpAssignment2`, JSON.stringify(1))
    localStorage.setItem(`freezetpAssignment2`, JSON.stringify(obj));
    let data = JSON.parse(localStorage.getItem("searchDatatpAssignment2"));
    if (data) {
      remainApiPath = `tl/getAssignments?page=1&tp_id=${JSON.parse(userid)}&cat_id=${data.store
        }&from=${data.fromDate}&to=${data.toDate
        }&assignment_status=Draft_Report&stages_status=1&pcat_id=${data.pcatId
        }&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`
    }
    else {
      remainApiPath = `tl/getAssignments?page=1&tp_id=${JSON.parse(
        userid
      )}&assignment_status=Draft_Report&stages_status=1&orderby=${val}&orderbyfield=${field}`
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
          res.data.result?.map((i) => {
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
  }
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
      text: "Date",
      dataField: "date_of_query",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowAs2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowAs2");
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
                pathname: `/taxprofessional_queries/${row.q_id}`,
                index: 1,
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
          localStorage.setItem("tpArrowAs2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowAs2");
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
          localStorage.setItem("tpArrowAs2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowAs2");
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
          localStorage.setItem("tpArrowAs2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowAs2");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 5);
      },

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
          localStorage.setItem("tpArrowAs2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowAs2");
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
      text: "Actual date of delivery",
      dataField: "final_date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowAs2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowAs2");
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowAs2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowAs2");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 8);
      },

      formatter: function (cell, row) {
        return (
          <>
            {row.paid_status == "2" ? null : (
              <div>
                {row.assignement_draft_report || row.final_report ? (
                  <div
                    title="View All Report"
                    style={{ cursor: "pointer" }}
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

      formatter: function (cell, row) {
        return (
          <>
            <div
              title="Add Assignment stages"
              style={{ cursor: "pointer", textAlign: "center" }}
            >
              {row.paid_status == "2" ? null : (
                <Link to={`/taxprofessional_addassingment/${row.q_id}`}>
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
                  pathname: `/taxprofessional_chatting/${row.q_id}`,
                  index: 1,
                  routes: "assignment",
                  obj: {
                    message_type: "3",
                    query_No: row.assign_no,
                    query_id: row.q_id,
                    routes: `/taxprofessional/assignment`,
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
                </>
              )}
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    let dk = JSON.parse(localStorage.getItem("searchDatatpAssignment2"));
    let pageno = JSON.parse(localStorage.getItem("tpAssignment2"));
    console.log("dkk2", dk);
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
    let pagetry = JSON.parse(localStorage.getItem("freezetpAssignment2"));
    let pageno = JSON.parse(localStorage.getItem("tpAssignment2"));
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
        route: window.location.pathname,
      };
    } else {
      obj = {
        store: store2,
        fromDate: fromDate,
        toDate: toDate,
        pcatId: selectedData,
        query_no: data?.query_no,
        p_status: data?.p_status,
        route: window.location.pathname,
      };
    }
    localStorage.setItem(`searchDatatpAssignment2`, JSON.stringify(obj));
    if (data.route) {
      if (pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(userid)}&cat_id=${data.store
          }&from=${data.fromDate}&to=${data.toDate
          }&assignment_status=Draft_Report&stages_status=1&pcat_id=${data.pcatId
          }&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`
      } else {
        remainApiPath = `tl/getAssignments?page=${e}&tp_id=${JSON.parse(userid)}&cat_id=${data.store
          }&from=${data.fromDate}&to=${data.toDate
          }&assignment_status=Draft_Report&stages_status=1&pcat_id=${data.pcatId
          }&qno=${data.query_no}`
      }
      axios
        .get(
          `${baseUrl}/${remainApiPath}`,
          myConfig
        )
        .then((res) => {
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
              data?.map((i) => {
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
            }
          }
        });
    } else {
      axios
        .get(
          `${baseUrl}/tl/getAssignments?page=1&tp_id=${JSON.parse(
            userid
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&assignment_status=Draft_Report&stages_status=1&pcat_id=${selectedData}&qno=${data.query_no
          }`,
          myConfig
        )
        .then((res) => {
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
              setAssignment(all);
              setRecords(res.data.result.length);
              setCount(res.data.total);
              setresetTrigger(!resetTrigger);
              localStorage.removeItem(`freezetpAssignment2`);
              localStorage.removeItem("tpArrowAs2");
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
          class="customBtn mx-sm-1 mb-2"
          onClick={() => resetData()}
        >
          Reset
        </button>
      </>
    );
  };
  const rowStyle2 = (row, index) => {
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
                    {categoryData?.map((p, index) => (
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
                    {tax2?.length > 0 ? (
                      <>
                        {tax2?.map((p, index) => (
                          <Option value={p.id} key={index}>
                            {p.details}
                          </Option>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
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
                    onChange={(e) => setFromDate(e.target.value)}
                    value={fromDate}
                    max={item}
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
                    onChange={(e) => setToDate(e.target.value)}
                    value={toDate}
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
                    onChange={(e) => setQueryNo(e.target.value)}
                    value={queryNo}
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
              <Paginator
                count={count}
                setOnPage={setOnPage}
                resetTrigger={resetTrigger}
                setresetTrigger={setresetTrigger}
                tpDraftReport="tpDraftReport"
                index="tpAssignment2"
                setData={setAssignment}
                getData={getAssignmentList}
              />
            </Col>
          </Row>
          <DataTablepopulated
            bgColor="#42566a"
            rowStyle2={rowStyle2}
            keyField={"assign_no"}
            data={assignment}
            columns={columns}
          ></DataTablepopulated>

          <DraftReportModal
            draftModal={draftModal}
            uploadDraftReport={uploadDraftReport}
            getAssignmentList={getAssignmentList}
            id={id}
            loading={loading}
            setLoading={setLoading}
            des={des}
          />
          <ViewAllReportModal
            ViewReport={ViewReport}
            reportModal={reportModal}
            report={report}
            dataItem={dataItem}
          />
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getAssignmentList}
            headColor="#42566a"
          />
        </CardBody>
      </Card>
    </>
  );
}

export default AssignmentTab;
