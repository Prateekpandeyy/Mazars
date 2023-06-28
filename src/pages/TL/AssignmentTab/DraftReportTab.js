import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";

import DiscardReport from "../AssignmentTab/DiscardReport";
import DraftReportModal from "./DraftReportUpload";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ViewAllReportModal from "./ViewAllReport";
import moment from "moment";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  ViewDiscussionIcon,
  DraftReportUploadIcon,
} from "../../../components/Common/MessageIcon";
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

function AssignmentTab() {
  const history = useHistory();
  const userid = window.localStorage.getItem("tlkey");

  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [count, setCount] = useState("");
  const [assignment, setAssignment] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const allEnd = Number(localStorage.getItem("tl_record_per_page"));
  const classes = useStyles();
  const [onPage, setOnPage] = useState(1);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState("");
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");

  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);

  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);

  const [item] = useState(current_date);
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const [report, setReport] = useState();
  const [reportModal, setReportModal] = useState(false);
  const [qid, setQid] = useState("");
  const [queryNo, setQueryNo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(current_date);
  const [categoryData, setCategory] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const [lastDown, setLastDown] = useState("");
  const myRef = useRef([]);
  const myRefs = useRef([]);
  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo];
      runTo?.scrollIntoView(false);
      runTo.scrollIntoView({ block: "center" });
    }
  }, [ViewDiscussion]);
  useEffect(() => {
    let runTo = myRefs.current[lastDown];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [reportModal]);
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  var rowStyle2 = {};

  let des = false;
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("tlcategoryData"));
    setCategory(data);
  }, []);

  //handleCategory
  const handleCategory = (value) => {
    setSelectedData(value);
    if (selectedData == 1) {
      setTax2(JSON.parse(localStorage.getItem("tlDirect tax")));
    } else if (selectedData == 2) {
      setTax2(JSON.parse(localStorage.getItem("tlIndirect tax")));
    } else {
    }
    // setTax2(JSON.parse(localStorage.getItem(value)));
    setStore2([]);
  };

  useEffect(() => {
    if (selectedData == 1) {
      setTax2(JSON.parse(localStorage.getItem("tlDirect tax")));
    } else if (selectedData == 2) {
      setTax2(JSON.parse(localStorage.getItem("tlIndirect tax")));
    } else {
    }
  }, [selectedData]);

  const uploadDraftReport = (id) => {
    if (typeof id == "object") {
      setQid(id.q_id);
      setLoading(false);
      setDraftModal(!draftModal);
      setScrolledTo(id.assign_no);
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

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key);
    }
  };
  useEffect(() => {
    let pageno = JSON.parse(localStorage.getItem("tlAssignment2"));
    let arrow = localStorage.getItem("tlArrowAs2");
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    // let sortVal = JSON.parse(localStorage.getItem("freezetlAssignment2"));
    // if (!sortVal) {
    //   let sort = {
    //     orderBy: 0,
    //     fieldBy: 0,
    //   };
    //   localStorage.setItem("freezetlAssignment2", JSON.stringify(sort));
    // }
    let data = JSON.parse(localStorage.getItem("searchDatatlAssignment2"));
    if (!data) {
      if (pageno) {
        getAssignmentList(pageno);
      } else {
        getAssignmentList(1);
        localStorage.setItem(`tlAssignment2`, JSON.stringify(1));
      }
    }
    // getAssignmentList();
  }, []);

  const getAssignmentList = (e) => {
    if (e === undefined) {
      // console.log(e, "e");
      e = 1;
    }
    let data = JSON.parse(localStorage.getItem("searchDatatlAssignment2"));
    let pagetry = JSON.parse(localStorage.getItem("freezetlAssignment2"));
    localStorage.setItem(`tlAssignment2`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);
    if (pagetry) {
      remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
        userid
      )}&assignment_status=Draft_Report&stages_status=1&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
        userid
      )}&assignment_status=Draft_Report&stages_status=1`;
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
        setAssignment(all);
        setCount(res.data.total);
        setRecords(res.data.result.length);
      }
    });
  };

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
    setSelectedData([]);
    setStore2([]);
    setToDate(current_date);
    setFromDate("");
    setQueryNo("");
    localStorage.removeItem("searchDatatlAssignment2");
    setresetTrigger(!resetTrigger);
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem("tlAssignment2");
    localStorage.removeItem(`freezetlAssignment2`);
    localStorage.removeItem("tlArrowAs2");
    getAssignmentList(1);
  };

  //assingmentStatus

  // view report
  const ViewReport = (key) => {
    setReportModal(!reportModal);
    setReport(key.assign_no);
    setDataItem(key);
    if (reportModal === false) {
      setScrolledTo(key);
    }
  };
  // row Style
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
    localStorage.setItem(`tlAssignment2`, JSON.stringify(1));
    localStorage.setItem(`freezetlAssignment2`, JSON.stringify(obj));
    let data = JSON.parse(localStorage.getItem("searchDatatlAssignment2"));
    if (data) {
      remainApiPath = `tl/getAssignments?page=1&tl_id=${JSON.parse(
        userid
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${
        data.toDate
      }&assignment_status=Draft_Report&stages_status=1&pcat_id=${
        data.pcatId
      }&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `tl/getAssignments?page=1&tl_id=${JSON.parse(
        userid
      )}&assignment_status=Draft_Report&stages_status=1&orderby=${val}&orderbyfield=${field}`;
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
          localStorage.setItem("tlArrowAs2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs2");
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
          localStorage.setItem("tlArrowAs2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs2");
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
          localStorage.setItem("tlArrowAs2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs2");
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
          localStorage.setItem("tlArrowAs2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs2");
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
          localStorage.setItem("tlArrowAs2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tlArrowAs2");
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
                  index: 1,
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
                </>
              )}
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    let dk = JSON.parse(localStorage.getItem("searchDatatlAssignment2"));
    let pageno = JSON.parse(localStorage.getItem("tlAssignment2"));

    if (dk) {
      if (dk.route === window.location.pathname) {
        setStore2(dk.store);
        setToDate(dk.toDate);
        setFromDate(dk.fromDate);
        setSelectedData(dk.pcatId);
        // setHide(dk.p_status);
        setQueryNo(dk.query_no);
        if (pageno) {
          onSubmit(dk, pageno);
        } else {
          onSubmit(dk, 1);
        }
      }
    }
  }, []);

  const onSubmit = (data, e) => {
    let pagetry = JSON.parse(localStorage.getItem("freezetlAssignment2"));
    localStorage.setItem(`tlAssignment2`, e);
    // if (pageno) {
    //   let e = pageno;
    // } else {
    //   let e = 1;
    // }
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
    localStorage.setItem(`searchDatatlAssignment2`, JSON.stringify(obj));

    if (data.route) {
      if (pagetry) {
        remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${
          data.toDate
        }&assignment_status=Draft_Report&stages_status=1&pcat_id=${
          data.pcatId
        }&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
      } else {
        remainApiPath = `tl/getAssignments?page=${e}&tl_id=${JSON.parse(
          userid
        )}&cat_id=${data.store}&from=${data.fromDate}&to=${
          data.toDate
        }&assignment_status=Draft_Report&stages_status=1&pcat_id=${
          data.pcatId
        }&qno=${data.query_no}`;
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
            setTurnGreen(true);
            setCount(res.data.total);
          }
        }
      });
    } else {
      axios
        .get(
          `${baseUrl}/tl/getAssignments?page=1&tl_id=${JSON.parse(
            userid
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${
            data.p_dateTo
          }&assignment_status=Draft_Report&stages_status=1&pcat_id=${selectedData}&qno=${
            data.query_no
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
              localStorage.removeItem(`freezetlAssignment2`);
              localStorage.removeItem("tlArrowAs2");
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

  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <Col md="12">
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
                      {tax2.length > 0 ? (
                        <>
                          {tax2.map((p, index) => (
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
                      onChange={(e) => setQueryNo(e.target.value)}
                      value={queryNo}
                      placeholder="Enter Query Number"
                      className="form-control"
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
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md="12" align="right">
              <PaginatorTL
                count={count}
                setOnPage={setOnPage}
                resetTrigger={resetTrigger}
                setresetTrigger={setresetTrigger}
                tlDraftReport="tlDraftReport"
                index="tlAssignment2"
                setData={setAssignment}
                getData={getAssignmentList}
              />
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
          <DataTablepopulated
            bgColor="#7c887c"
            keyField={"assign_no"}
            data={assignment}
            rowStyle2={rowStyle2}
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
            qno={qid}
          />
          <ViewAllReportModal
            ViewReport={ViewReport}
            reportModal={reportModal}
            report={report}
            dataItem={dataItem}
            headColor="#7c887c"
          />

          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getAssignmentList}
            headColor="#7c887c"
          />
        </CardBody>
      </Card>
    </>
  );
}

export default AssignmentTab;
