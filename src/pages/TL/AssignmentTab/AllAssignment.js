import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../../config/config";
import { getErrorMessage } from "../../../constants";
import Loader from "../../../components/Loader/Loader";
import { Card, CardHeader, CardBody } from "reactstrap";
import DraftReportModal from "./DraftReportUpload";
import FinalReportUpload from "./FinalReportUpload";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import BootstrapTable from "react-bootstrap-table-next";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ViewAllReportModal from "./ViewAllReport";
import DiscardReport from "../AssignmentTab/DiscardReport";
import moment from "moment";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  ViewDiscussionIcon,
  DraftReportUploadIcon,
  FinalReportUploadIcon,
} from "../../../components/Common/MessageIcon";
import { Spinner } from "reactstrap";

function AssignmentTab(props) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const userid = window.localStorage.getItem("tlkey");
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;
  const [count, setCount] = useState("");
  const [assignment, setAssignment] = useState([]);
  const [id, setId] = useState("");
  const [finalId, setFinalId] = useState("");
  const [records, setRecords] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [status, setStatus] = useState([]);
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
  const [query_no,setQuery_no] = useState("");
  const [dateFrom,setdateFrom]=useState("");
  const [dateto,setDateto]=useState(current_date);
  const [p_status,setP_status]=useState("");
  const [pCatid,setPcatid]=useState("")

  const [item] = useState(current_date);
  const [client, setClient] = useState([]);
  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);

  let des = false;
  var rowStyle2 = {};
  const ViewReport = (key) => {
    setReportModal(!reportModal);
    setReport(key.assign_no);
    setDataItem(key);
  };

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
  };

  useEffect(() => {
    getAssignmentList();
  }, []);
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getAssignmentList = () => {
    let asd = JSON.parse(localStorage.getItem(`searchDataAs1`));
    if (asd) {console.log("no preload list")}
    else{
    axios
      .get(`${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(userid)}`, myConfig)
      .then((res) => {
        if (res.data.code === 1) {
          setAssignment(res.data.result);
          setCount(res.data.result.length);
          setRecords(res.data.result.length);
        }
      });
    }
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
  //     if (selectedData != undefined && selectedData.length > 0){
  //       axios
  //       .get(`${baseUrl}/tl/getCategory?pid=${selectedData}`, myConfig)
  //       .then((res) => {
  //         if (res.data.code === 1) {
  //           setTax2(res.data.result);
  //         }
  //       });
  //     }

  //   //   let asd = JSON.parse(localStorage.getItem(`searchDataAs1`));
  //   // if (asd) {
  //   //   let selectedData1= asd.pcatid
  //   //   if (selectedData1.length > 0) {
  //   //     axios
  //   //       .get(`${baseUrl}/tl/getCategory?pid=${asd.pcatid}`, myConfig)
  //   //       .then((res) => {
  //   //         if (res.data.code === 1) {
  //   //           setTax2(res.data.result);
  //   //         }
  //   //       });
  //   //   }
  //   // }
  //   // else{
  //   //   if (selectedData.length > 0) {
  //   //     axios
  //   //       .get(`${baseUrl}/tl/getCategory?pid=${selectedData}`, myConfig)
  //   //       .then((res) => {
  //   //         if (res.data.code === 1) {
  //   //           setTax2(res.data.result);
  //   //         }
  //   //       });
  //   //   }
  //   // }
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
    setStatus([]);
    setSelectedData([]);
    setStore2([]);
    setQuery_no("");
    setdateFrom("");
    setDateto(current_date);
    localStorage.removeItem(`searchDataAs1`);
    getAssignmentList();
  };

  const handleDatefrom = (e) => {
    setdateFrom(e.target.value)
  };
  const handleDateto = (e) => {
    setDateto(e.target.value)
  };


  useEffect(() => {
    let asd = JSON.parse(localStorage.getItem(`searchDataAs1`));
    console.log(asd);
    if (asd) {
    // setTax2([]);
    // setError(false);
    // setHide("");
    setP_status(asd.p_status)
    assingmentStatus(asd.status)
    setQuery_no(asd.query_no)
    setStatus(asd.status);
    setSelectedData(asd.pcatid);
    setStore2(asd.store);
    setdateFrom(asd.fromDate)
    setDateto(asd.toDate)
    setHide(asd.p_status);
    onSubmit(asd)
    }
    getAssignmentList();
  }, []);

  //assingmentStatus
  const assingmentStatus = (value) => {
    setError(false);
    setStatus(value);
  };

  //columns
  const columns = [
    {
      text: "S.no",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
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
    let collectData = [];
    if (id.id !== undefined) {
      setClient(collectData);

      setQid(id.q_id);

      setId(id.id);
      setDraftModal(!draftModal);
    } else {
      setDraftModal(!draftModal);
      setLoading(false);
      setId(id.id);
    }
  };

  // final modal

  const uploadFinalReport = (id) => {
    console.log("iddd", id);
    if (id && id.id === undefined) {
      setLoading(false);
      setFianlModal(!fianlModal);
    } else {
      setFianlModal(!fianlModal);
      setFinalId(id);
      setQid(id.q_id);
    }
  };

  const onSubmit = (data) => {
    console.log(data)
    let obj ={}
    if (data.route) {
      obj = {
        store: data.store,
        fromDate: data?.fromDate,
        toDate: data?.toDate,
        pcatid: data?.pcatid,
        status:data.status,
        query_no: data?.query_no,
        p_status: data?.p_status,
        route: window.location.pathname,
      };
    } else {
      obj = {
        store: store2,
        fromDate: data?.p_dateFrom,
        toDate: data?.p_dateTo,
        pcatid: selectedData,
        status:status,
        query_no: data?.query_no,
        p_status: data?.p_status,
        route: window.location.pathname,
      };
    }
    localStorage.setItem(`searchDataAs1`, JSON.stringify(obj));

    if (status.length > 0) {
      console.log("done");
      if (data.route) {
        console.log("////p_status",data.p_status,"////status",data.p_status ,"if1");
        axios
        .get(
          `${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(
            userid
          )}&cat_id=${data.store}&from=${data.fromDate
          }&to=${
            data.toDate
          }&assignment_status=${data.status}&stages_status=${
            data.p_status
          }&pcat_id=${data.pcatid}&qno=${data.query_no}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setLoading(false);
            if (res.data.result) {
              setAssignment(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
      }

      else{
        console.log("/////p_status",data.p_status,"/////status",data.p_status,"else2");
        axios
        .get(
          `${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(
            userid
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${
            data.p_dateTo
          }&assignment_status=${status}&stages_status=${
            data.p_status
          }&pcat_id=${selectedData}&qno=${data.query_no}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setLoading(false);
            if (res.data.result) {
              setAssignment(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
      }
      
    } else {
      if (data.route) {
        console.log("////p_status",data.p_status,"////status",status ,"if2");
        axios
        .get(
          `${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(
            userid
          )}&cat_id=${data.store}&from=${data.fromDate}&to=${
            data.toDate
          }&assignment_status=${data.status}&stages_status=${
            data.p_status
          }&pcat_id=${data.pcatid}&qno=${data.query_no}`,
          myConfig
        )
        .then((res) => {
          console.log("done");
          if (res.data.code === 1) {
            if (res.data.result) {
              setAssignment(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
      }

      else{
        console.log("/////p_status",data.p_status,"/////status",status,"else2");
        axios
        .get(
          `${baseUrl}/tl/getAssignments?tl_id=${JSON.parse(
            userid
          )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${
            data.p_dateTo
          }&assignment_status=${status}&stages_status=${
            data.p_status
          }&pcat_id=${selectedData}&qno=${data.query_no}`,
          myConfig
        )
        .then((res) => {
          console.log("done");
          if (res.data.code === 1) {
            if (res.data.result) {
              setAssignment(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
      } 
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

  const disabledHandler = (e) => {
    setStatus([]);
    setError(false);
    setHide(e.target.value);
    setP_status(e.target.value)
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

              {tax2.length > 0 ? (
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
              ) : (
                ""
              )}
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
                  max={item}
                  value={dateFrom}
                  onChange= {handleDatefrom}
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
                  defaultValue={current_date}
                  max={item}
                  value={dateto}
                  onChange= {handleDateto}
                />
              </div>

              <div class="form-group mx-sm-1  mb-2">
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
                " "
              )}
              <div className="form-group mx-sm-1  mb-2">
                <input
                  type="text"
                  name="query_no"
                  ref={register}
                  placeholder="Enter Query Number"
                  className="form-control"
                  value={query_no}
                  onChange={(e) => setQuery_no(e.target.value)}
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