import React, { useState, useEffect } from "react";
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
import ViewAllReportModal from "./ViewAllReport";
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import DiscardReport from "../AssignmentTab/DiscardReport";


function AssignmentComponent() {
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
  const [hide, setHide] = useState();
  const [report, setReport] = useState();

  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  console.log("current_date :", current_date);
  const [item] = useState(current_date);


  const [reportModal, setReportModal] = useState(false);
  const ViewReport = (key) => {
    console.log("key - ", key);
    setReportModal(!reportModal);
    setReport(key);
  };

  const [assignNo, setAssignNo] = useState(null);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key)
  }

  const [viewData, setViewData] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const ViewHandler = (key) => {
    console.log(key);
    setViewModal(!viewModal);
    setViewData(key);
  };

  useEffect(() => {
    getAssignmentData();
  }, []);

  const getAssignmentData = () => {
    axios.get(`${baseUrl}/tl/getAssignments`).then((res) => {
      console.log(res);
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
      axios
        .get(`${baseUrl}/customers/getCategory?pid=${selectedData}`)
        .then((res) => {
          console.log(res);
          if (res.data.code === 1) {
            setTax2(res.data.result);
          }
        });
    };
    getSubCategory();
  }, [selectedData]);

  //handleCategory
  const handleCategory = (value) => {
    console.log(`selected ${value}`);
    setSelectedData(value);
    setStore2([]);
  };

  //handleSubCategory
  const handleSubCategory = (value) => {
    console.log(`selected ${value}`);
    setStore2(value);
  };

  //reset category
  const resetCategory = () => {
    console.log("resetCategory ..");
    setSelectedData([]);
    setStore2([]);
    getAssignmentData();
  };

  //reset date
  const resetData = () => {
    console.log("resetData ..");
    reset();
    setStatus([]);
    setSelectedData([]);
    setStore2([]);
    getAssignmentData();
  };

  //assingmentStatus
  const assingmentStatus = (value) => {
    console.log(`selected ${value}`);
    setStatus(value);
  };

  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "50px" };
      },
    },
    {
      text: "Date",
      dataField: "date_of_query",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.date_of_query);
        var oldDate = row.date_of_query;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Query No",
      dataField: "assign_no",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return (
          <>
            {/* <Link to={`/admin/queries/${row.q_id}`}>{row.assign_no}</Link> */}
            <Link
              to={{
                pathname: `/admin/queries/${row.q_id}`,
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
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Sub Category",
      dataField: "cat_name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      dataField: "status",
      text: "Status",
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "12px", width: "200px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div>
              {row.paid_status == "2" &&
                <p>
                  <span style={{ color: "red" }}>Payment Declined</span>
                </p>
              }
              <p>
                <span style={{ fontWeight: "bold" }}>Client Discussion :</span>
                {row.client_discussion}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Draft Report :</span>
                {row.draft_report}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Final Discussion :</span>
                {row.final_discussion}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Delivery of Final Report :</span>
                {row.delivery_report}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Awaiting Completion :</span>
                {row.other_stage}
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
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.Exp_Delivery_Date);
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
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.final_date);
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
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            {
              row.paid_status == "2" ? null :
                <div>
                  {row.assignement_draft_report || row.final_report ?
                    <div title="View All Report"
                      style={{ cursor: "pointer" }}
                      onClick={() => ViewReport(row.assign_no)}
                    >
                      <DescriptionOutlinedIcon color="secondary" />
                    </div>
                    :
                    null
                  }
                </div>
            }
          </>
        );
      },
    },
    {
      text: "TL name",
      dataField: "tl_name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Action",
      headerStyle: () => {
        return { fontSize: "12px", width: "75px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>

              <div title="Send Message">
                <Link
                  to={{
                    pathname: `/admin/chatting/${row.q_id}`,
                    obj: {
                      message_type: "3",
                      query_No: row.assign_no,
                      query_id: row.q_id,
                      routes: `/admin/assignment`
                    }
                  }}
                >
                  <i
                    class="fa fa-comments-o"
                    style={{
                      fontSize: 16,
                      cursor: "pointer",
                      marginLeft: "8px",
                      color: "blue"
                    }}
                  ></i>
                </Link>
              </div>

              <div title="View Discussion Message">
                <i
                  class="fa fa-comments-o"
                  style={{
                    fontSize: 16,
                    cursor: "pointer",
                    color: "orange"
                  }}
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                ></i>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  const onSubmit = (data) => {
    console.log("data :", data);
    console.log("selectedData :", selectedData);
    axios
      .get(
        `${baseUrl}/tl/getAssignments?cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}&assignment_status=${status}&stages_status=${data.p_status}&pcat_id=${selectedData}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          if (res.data.result) {
            setAssignmentDisplay(res.data.result);
            setRecords(res.data.result.length);
          }
        }
      });
  };


  const Reset = () => {
    return (
      <>
        <button
          type="submit"
          class="btn btn-primary mx-sm-1 mb-2"
          onClick={() => resetData()}
        >
          Reset
        </button>
      </>
    );
  };

  const disabledHandler = (e) => {
    setHide(e.target.value);
  };


  return (
    <div>
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
                  class="btn btn-primary mb-2 ml-3"
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
                  defaultValue={item}
                  max={item}
                />
              </div>

              <div class="form-group mx-sm-1  mb-2">
                <select
                  className="form-select form-control"
                  name="p_status"
                  ref={register}
                  style={{ height: "33px" }}
                  onChange={(e) => disabledHandler(e)}
                >
                  <option value="">--select--</option>
                  <option value="1">Inprogress</option>
                  <option value="2">Completed</option>
                  <option value="3">Payment Declined</option>
                </select>
              </div>

              {
                hide == "3" ?
                  ""
                  :
                  <div class="form-group mx-sm-1  mb-2">
                    <Select
                      mode="multiple"
                      style={{ width: 210 }}
                      placeholder="Select stages"
                      defaultValue={[]}
                      onChange={assingmentStatus}
                      value={status}
                      allowClear
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
                        <div className="demo-option-label-item">Awaiting Completion</div>
                      </Option>
                    </Select>
                  </div>

              }

              <button type="submit" class="btn btn-primary mx-sm-1 mb-2">
                Search
              </button>

              <Reset />
            </div>
          </form>
        </CardHeader>

        <CardBody>
          <Records records={records} />
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={assignmentDisplay}
            columns={columns}
            rowIndex
          />

          <ViewAllReportModal
            ViewReport={ViewReport}
            reportModal={reportModal}
            report={report}
            getPendingforAcceptance={getAssignmentData}
          />

          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getAssignmentData}
          />

        </CardBody>
      </Card>
    </div>
  );
}

export default AssignmentComponent;
