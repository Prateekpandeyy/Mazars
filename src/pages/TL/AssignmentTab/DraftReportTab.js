import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Card, CardHeader, CardBody } from "reactstrap";
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
  const [status, setStatus] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [dateFrom, setdateFrom] = useState("");
  const [dateto, setDateto] = useState(current_date);

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
  const dateValue = useRef();
  const [item] = useState(current_date);
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const [report, setReport] = useState();
  const [reportModal, setReportModal] = useState(false);
  const [qid, setQid] = useState("");
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  var rowStyle2 = {};
  var clcomp = {
    color: "green",
  };
  var clinpro = {
    color: "blue",
  };
  let des = false;
  const uploadDraftReport = (id) => {
    console.log("id", id);
    if (typeof id == "object") {
      console.log("id");
      setQid(id.q_id);
      setLoading(false);
      setDraftModal(!draftModal);
    } else {
      setDraftModal(!draftModal);
      setId(id.id);
    }
    console.log("id.as",id.assignment_label_number);
    if (draftModal === false) {
      console.log("Rendered AllQ", id.assignment_label_number);
      setLastDown(id.assignment_label_number)
      console.log("Scrolled To AllQ", lastDown)
    } else {
      console.log("Scrolled To Else AllQ", lastDown)
      var element = document.getElementById(lastDown);
      if (element) {
        console.log(myRefs.current[lastDown], "ref element array")
      }
    }
  };
  useEffect(() => {
    if (draftModal === false) {
      console.log("Scrolled To Else AllQ", lastDown)
      var element = document.getElementById(lastDown);
      if (element) {
        console.log("red", element);
        console.log(myRefs.current[lastDown], "ref element array")
        let runTo = myRefs.current[lastDown]
        runTo.scrollIntoView({ block: 'center' });
      }
    }
  }, [draftModal]);

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      console.log("Rendered AllQ", key);
      setScrolledTo(key)
      console.log("Scrolled To AllQ", scrolledTo)
    } else {
      console.log("Scrolled To Else AllQ", scrolledTo)
      var element = document.getElementById(scrolledTo);
      if (element) {
        console.log(myRef.current[scrolledTo], "ref element array")
      }
    }
  };
  //Discussion Jump
  useEffect(() => {
    if (ViewDiscussion === false) {
      console.log("Scrolled To Else AllQ", scrolledTo)
      var element = document.getElementById(scrolledTo);
      if (element) {
        console.log("red", element);
        console.log(myRef.current[scrolledTo], "ref element array")
        let runTo = myRef.current[scrolledTo]
        runTo.scrollIntoView({ block: 'center' });
      }
    }
  }, [ViewDiscussion]);

  useEffect(() => {
    let asd = JSON.parse(localStorage.getItem(`searchDataAs2`));
    if (asd) {
      console.log("searchDataAs2 is here");
    }else{
    getAssignmentList();
    }
  }, []);

  const getAssignmentList = () => {
    axios
      .get(
        `${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(
          userid
        )}&assignment_status=Draft_Report&stages_status=1`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          setAssignment(res.data.result);
          setCount(res.data.result.length);
          setRecords(res.data.result.length);
        }
      });
  };

  //get category
  useEffect(() => {
    const getSubCategory = () => {
      if (selectedData != undefined && selectedData.length > 0) {
        axios
          .get(`${baseUrl}/customers/getCategory?pid=${selectedData}`)
          .then((res) => {
            if (res.data.code === 1) {
              setTax2(res.data.result);
            }
          });
      }
    };
    getSubCategory();
  }, [selectedData]);

  // useEffect(() => {
  //   const getSubCategory = () => {
  //     if (selectedData != undefined) {
  //       axios
  //         .get(`${baseUrl}/tl/getCategory?pid=${selectedData}`, myConfig)
  //         .then((res) => {
  //           if (res.data.code === 1) {
  //             setTax2(res.data.result);
  //             console.log(res.data.result);
  //           }
  //         });
  //     }
  //   };
  //   getSubCategory();
  // }, [selectedData]);

  //handleCategory
  const handleCategory = (value) => {
    setSelectedData(value);
    setStore2([]);
  };

  //handleSubCategory
  const handleSubCategory = (value) => {
    setStore2(value);
  };

  //handle dates
  const handleDatefrom = (e) => {
    setdateFrom(e.target.value)
    console.log(dateFrom)
  };
  const handleDateto = (e) => {
    setDateto(e.target.value)
    console.log(dateto)
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
    getAssignmentList();
    setdateFrom("");
    setDateto(current_date);
    localStorage.removeItem(`searchDataAs2`);
  };

  


  //assingmentStatus

  // view report
  const ViewReport = (key) => {
    setReportModal(!reportModal);
    setReport(key.assign_no);
    setDataItem(key);
    console.log(key.assignment_number);
    if (reportModal === false) {
      console.log("Rendered AllQ", key);
      setRunTo(key.assignment_number)
      console.log("Scrolled To AllQ", runTo)
    } else {
      console.log("Scrolled To Else AllQ", runTo)
      var element = document.getElementById(runTo);
      if (element) {
        console.log(myRefss.current[runTo], "ref element array")
      }
    }
  };

  useEffect(() => {
    if (reportModal === false) {
      console.log("Scrolled To Else AllQ", runTo)
      var element = document.getElementById(runTo);
      if (element) {
        console.log("red", element);
        console.log(myRefss.current[runTo], "ref element array")
        let runTwo = myRefss.current[runTo]
        runTwo.scrollIntoView({ block: 'center' });
      }
    }
  }, [reportModal]);

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

  //columns
  const columns = [
    {
      text: "S.no",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return <div id={row.assign_no} ref={el => (myRef.current[row.assign_no] = el)}>{rowIndex + 1}</div>;
      },

      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Query date",
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
      text: "Actual date of delivery",
      dataField: "final_date",
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
                    id={row.assignment_number}
                    ref={el => (myRefss.current[row.assignment_number] = el)}
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
                      id={row.assignment_label_number}
                      ref={el => (myRefs.current[row.assignment_label_number] = el)}
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
  const onSubmit = (data) => {

    let obj = {}
    if (data.route) {
      obj = {
        store: data.store,
        fromDate: data?.fromDate,
        toDate: data?.toDate,
        pcatid: data.pcatid,
        route: window.location.pathname,
      };
    } else {
      obj = {
        store: store2,
        fromDate: data?.p_dateFrom,
        toDate: data?.p_dateTo,
        pcatid: selectedData,
        route: window.location.pathname,
      };
    }
    localStorage.setItem(`searchDataAs2`, JSON.stringify(obj));
    if (data.route) {
      axios
        .get(
          `${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(userid)}&cat_id=${data.store
          }&from=${data.fromDate}&to=${data.toDate
          }&assignment_status="Draft_Report"&stages_status=1&pcat_id=${data.pcatid}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            if (res.data.result) {
              setAssignment(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
    }
    else {
      axios
        .get(
          `${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(userid)}&cat_id=${store2
          }&from=${data.p_dateFrom}&to=${data.p_dateTo
          }&assignment_status="Draft_Report"&stages_status=1&pcat_id=${selectedData}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            if (res.data.result) {
              setAssignment(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
    }
  };

  useEffect(() => {
    let asd = JSON.parse(localStorage.getItem(`searchDataAs2`));
    if (asd) {
      setSelectedData(asd.pcatid)
      setStore2(asd.store);
      setdateFrom(asd.fromDate)
      setDateto(asd.toDate)
      onSubmit(asd)
    }
  }, [])

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
                  <Option value="1" label="Compilance">
                    <div className="demo-option-label-item">Direct Tax</div>
                  </Option>
                  <Option value="2" label="Compilance">
                    <div className="demo-option-label-item">Indirect Tax</div>
                  </Option>
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
                  onChange={handleDatefrom}
                  value={dateFrom}
                  ref={register}
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
                  onChange={handleDateto}
                  value={dateto}
                  ref={register}
                  defaultValue={current_date}
                  max={item}
                />
              </div>

              <div class="form-group mx-sm-1  mb-2">
                <label className="form-select form-control">
                  Total Records : {records}
                </label>
              </div>
              <button type="submit" class="customBtn mx-sm-1 mb-2">
                Search
              </button>

              <Reset />
            </div>
          </form>
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
