import React, { useState, useEffect,useRef } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { getErrorMessage } from "../../../constants";
import Loader from "../../../components/Loader/Loader";
import { Card, CardHeader, CardBody } from "reactstrap";
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

function AdminPermission(props) {
  const [loading, setLoading] = useState(false);
  const userid = window.localStorage.getItem("tlkey");

  const [assignmentDisplay, setAssignmentDisplay] = useState([]);
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [assignmentCount, setCountAssignment] = useState("");
  const [records, setRecords] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [status, setStatus] = useState([]);
  const [tax2, setTax2] = useState([]);
  const [store2, setStore2] = useState([]);
  const [hide, setHide] = useState();
  const [report, setReport] = useState();
  const [error, setError] = useState(false);
  const [dateFrom, setdateFrom] = useState("");
  const [dateto, setDateto] = useState(current_date);
  const [p_status, setP_status] = useState("");
  const [scrolledTo, setScrolledTo] = useState("")
  const myRef = useRef([]);
  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);

  const [item] = useState(current_date);
  var rowStyle2 = {};
  var clcomp = {
    color: "green",
  };
  var clinpro = {
    color: "blue",
  };
  const [reportModal, setReportModal] = useState(false);
  const ViewReport = (key) => {
    setReportModal(!reportModal);
    setReport(key);
  };

  const [assignNo, setAssignNo] = useState(null);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      console.log("Rendered AllA", key);
      setScrolledTo(key)
      console.log("Scrolled To AllA", scrolledTo)
    } else {
      console.log("Scrolled To Else AllA", scrolledTo)
      var element = document.getElementById(scrolledTo);
      if (element) {
        console.log(myRef.current[scrolledTo], "ref element array")
      }
    }
  };

  useEffect(() => {
    // if (ViewDiscussion === true) {
    console.log("Scrolled To Else AllQ", scrolledTo)
    var element = document.getElementById(scrolledTo);
    if (element) {
      console.log("red", element);
      console.log(myRef.current[scrolledTo], "ref element array")
      let runTo = myRef.current[scrolledTo]
      runTo.scrollIntoView(false);
      runTo.scrollIntoView({ block: 'center' });
    }
    // }
  }, [ViewDiscussion]);

  const [viewData, setViewData] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const ViewHandler = (key) => {
    setViewModal(!viewModal);
    setViewData(key);
  };

  useEffect(() => {
    let asd = JSON.parse(localStorage.getItem(`searchDataAs4`));
    if (asd) {
      console.log("searchDataAs4 is here");
    }else{
    getAssignmentData();
    }
  }, []);
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getAssignmentData = () => {
    axios.get(`${baseUrl}/tl/getadminpermissiona`, myConfig).then((res) => {
      if (res.data.code === 1) {
        setAssignmentDisplay(res.data.result);
        setCountAssignment(res.data.result.length);
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

  //     // if (selectedData != undefined && selectedData.length > 0){
  //     //   axios
  //     //       .get(`${baseUrl}/tl/getCategory?pid=${selectedData}`, myConfig)
  //     //       .then((res) => {
  //     //         if (res.data.code === 1) {
  //     //           console.log(res.data.result);
  //     //           setTax2(res.data.result);
  //     //         }
  //     //       });
  //     // }

  //     let asd = JSON.parse(localStorage.getItem(`searchDataAs4`));
  //     let selectedData1 = asd?.pcatid
  //     if (asd) {
  //       // let selectedData1 = asd?.pcatid
  //       if (selectedData1 !== undefined && selectedData1.length > 0) {
  //         axios
  //           .get(`${baseUrl}/tl/getCategory?pid=${selectedData1}`, myConfig)
  //           .then((res) => {
  //             if (res.data.code === 1) {
  //               setTax2(res.data.result);
  //               console.log(res.data.result);
  //             }
  //           });
  //       }
  //     }
  //     else {
  //       if (selectedData !== undefined && selectedData.length > 0) {
  //         axios
  //           .get(`${baseUrl}/tl/getCategory?pid=${selectedData}`, myConfig)
  //           .then((res) => {
  //             if (res.data.code === 1) {
  //               setTax2(res.data.result);
  //               console.log(res.data.result);
  //             }
  //           });
  //       }
  //     }
  //   };
  //   getSubCategory();
  // }, [selectedData]);

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

  //handle dates
  const handleDatefrom = (e) => {
    setdateFrom(e.target.value)
  };
  const handleDateto = (e) => {
    setDateto(e.target.value)
  };

  //reset category
  const resetCategory = () => {
    console.log(error);

    setSelectedData([]);
    setStore2([]);
    getAssignmentData();
    setError(false);
    setTax2([]);
  };

  //reset date
  const resetData = () => {
    reset();
    setTax2([]);
    setError(false);
    setHide("");
    setStatus([]);
    setP_status("")
    setSelectedData([]);
    setStore2([]);
    getAssignmentData();
    setDateto(current_date)
    setdateFrom("")
    localStorage.removeItem(`searchDataAs4`);
  };

  //assingmentStatus
  const assingmentStatus = (value) => {
    setError(false);

    setStatus(value);
  };


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
              {row.paid_status === "2" && (
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
        if (oldDate == null || oldDate === "0000-00-00 00:00:00") {
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
            {row.paid_status === "2" ? null : (
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
  const onSubmit = (data) => {

    let obj = {}
    if (data.route) {
      obj = {
        store: data.store,
        fromDate: data?.fromDate,
        toDate: data?.toDate,
        pcatid: data.pcatid,
        status: data.status,
        p_status: data?.p_status,
        route: window.location.pathname,
      };
    } else {
      obj = {
        store: store2,
        fromDate: data?.p_dateFrom,
        toDate: data?.p_dateTo,
        pcatid: selectedData,
        status: status,
        p_status: data?.p_status,
        route: window.location.pathname,
      };
    }
    localStorage.setItem(`searchDataAs4`, JSON.stringify(obj));
    if (data.route) {
      let status1 = data.status
      if (status1.length > 0) {
        axios
          .get(
            `${baseUrl}/tl/getadminpermissiona?cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.status}&stages_status=${data.p_status}&pcat_id=${data.pcatid}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              if (res.data.result) {
                setAssignmentDisplay(res.data.result);
                setRecords(res.data.result.length);
              }
            }
          });
      } else {
        axios
          .get(
            `${baseUrl}/tl/getadminpermissiona?cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate}&assignment_status=${data.status}&stages_status=${data.p_status}&pcat_id=${data.pcatid}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              if (res.data.result) {
                setAssignmentDisplay(res.data.result);
                setRecords(res.data.result.length);
              }
            }
          });
      }
    } else {
      if (status.length > 0) {
        axios
          .get(
            `${baseUrl}/tl/getadminpermissiona?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&assignment_status=${status}&stages_status=${data.p_status}&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              if (res.data.result) {
                setAssignmentDisplay(res.data.result);
                setRecords(res.data.result.length);
              }
            }
          });
      } else {
        axios
          .get(
            `${baseUrl}/tl/getadminpermissiona?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&assignment_status=${status}&stages_status=${data.p_status}&pcat_id=${selectedData}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              if (res.data.result) {
                setAssignmentDisplay(res.data.result);
                setRecords(res.data.result.length);
              }
            }
          });
      }
    }


  };

  useEffect(() => {
    let asd = JSON.parse(localStorage.getItem(`searchDataAs4`));
    if (asd) {
      setStatus(asd.status)
      setSelectedData(asd.pcatid)
      setStore2(asd.store);
      setdateFrom(asd.fromDate)
      setDateto(asd.toDate)
      setP_status(asd.p_status)
      onSubmit(asd)
    }
  }, [])

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
    setP_status(e.target.value)
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
                  value={dateFrom}
                  onChange={handleDatefrom}
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
                  defaultValue={current_date}
                  max={item}
                  value={dateto}
                  onChange={handleDateto}
                />
              </div>

              <div className="form-group mx-sm-1  mb-2">
                <select
                  className="form-select form-control"
                  name="p_status"
                  ref={register}
                  style={{ height: "33px" }}
                  value={p_status}
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

              <div class="form-group mx-sm-1  mb-2">
                <label className="form-select form-control">
                  Total Records : {records}
                </label>
              </div>
            </div>
          </form>
        </CardHeader>

        <CardBody className="card-body">
          {/* <Records records={records} /> */}
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
