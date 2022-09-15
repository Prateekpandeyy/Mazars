import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
 
} from "reactstrap";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import { Link } from "react-router-dom";
import Records from "../../../components/Records/Records";
import DiscardReport from "../AssignmentTab/DiscardReport";
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ViewAllReportModal from "./ViewAllReport";
import moment from "moment";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {ViewDiscussionIcon, Payment} from "../../../components/Common/MessageIcon";


function DraftReport() {
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

  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  const [item] = useState(current_date);
  const [assignNo, setAssignNo] = useState('');
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [report, setReport] = useState();
  const token = window.localStorage.getItem("adminToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
var rowStyle2 = {}
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key)
  }

  var clcomp= {
    color: "green"
  }
  var clinpro = {
    color : "blue"
  }
  useEffect(() => {
    getAssignmentData();
  }, []);

  const getAssignmentData = () => {
    axios.get(`${baseUrl}/admin/getAssignments?assignment_status=Draft_Report&stages_status=1`, myConfig).then((res) => {
     
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
    getAssignmentData();
  };

  //assingmentStatus
  const assingmentStatus = (value) => {
   
    setStatus(value);
  };
  // view report
  const ViewReport = (key) => {
  
    setReportModal(!reportModal);
    setReport(key);
  };
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
                pathname: `/admin/queries/${row.q_id}`,
                index : 1,
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
            {row.paid_status == "2" &&
                <p>
                  <span className="declined">Payment declined</span>
                </p>
              }
              <p>
                <span>Client discussion :</span>
               <span className={row.client_discussion === "completed" ? "completed" : "inprogress"}>
                                {row.client_discussion}
                 </span>
              </p>
              <p>
                <span>Draft report :</span>
                <span className={row.draft_report === "completed" ? "completed" : "inprogress"}>
                      {row.draft_report}
                 </span>
              </p>
              <p>
                <span>Final discussion :</span>
                <span className={row.final_discussion === "completed" ? "completed" : "inprogress"}>
                     {row.final_discussion}
                 </span>
              </p>
              <p>
                <span>Delivery of final report :</span>
                <span className={row.delivery_report === "completed" ? "completed" : "inprogress"}>
                             {row.delivery_report}
                 </span>
              </p>
              <p>
                <span>Awaiting completion:</span>
                <span className={row.other_stage === "completed" ? "completed" : "inprogress"}>
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
     
    },
    {
      text: "Action",
      
      formatter: function (cell, row) {
        return (
          <>
            <div style={{ display: "flex"}}>


                <Link
                  to={{
                    pathname: `/admin/chatting/${row.q_id}`,
                    index : 1,
                    routes: "assignment",
                    obj: {
                      message_type: "3",
                      query_No: row.assign_no,
                      query_id: row.q_id,
                      routes: `/admin/assignment`
                    }
                  }}
                >
                <MessageIcon />
                </Link>
            

              <div  onClick={() => ViewDiscussionToggel(row.assign_no)} className="ml-1">
                                  
                                  <ViewDiscussionIcon />
                          </div>
            </div>
          </>
        );
      },
    },
  ];

  rowStyle2 = (row, index) => {
    const style = {}
    var warningDate = moment(row.Exp_Delivery_Date).subtract(2, 'day').toDate();
    // var warnformat = warningDate.format("YYYY-MM-DD");
    var aa = moment().toDate();
   

    if(row.paid_status != "2" && row.status != "Complete" && warningDate < aa)  {
      style.backgroundColor = "#c1d8f2";
      style.color = "#000111"
    }
    else if(row.paid_status != "2" && warningDate > aa){
      style.backgroundColor = "#fff";
      style.color = "#000"
    }
  
    return style;
  }
  const onSubmit = (data) => {
    
    axios
      .get(
        `${baseUrl}/admin/getAssignments?assignment_status=Draft_Report&stages_status=1&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo}`,
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
  };

  const Reset = () => {
    return (
      <>
        <button
          type="submit"
          className="customBtn mb-2"
          onClick={() => resetData()}
        >
          Reset
        </button>
      </>
    );
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
                  defaultValue={item}
                  max={item}
                />
              </div>




              <button type="submit" className="customBtn mx-2">
                Search
              </button>

              <Reset />
            </div>
          </form>
        </CardHeader>

        <CardBody className="card-body">
          <Records records={records} />
          <DataTablepopulated 
                   bgColor="#7c887c"
                   keyField= {"assign_no"}
                   data={assignmentDisplay}
                   rowStyle2= {rowStyle2}
                   columns={columns}>
                    </DataTablepopulated>
  <ViewAllReportModal
            ViewReport={ViewReport}
            reportModal={reportModal}
            report={report}
            getPendingforAcceptance={getAssignmentData}
            deleiverAble = "#7c887c"
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

export default DraftReport;

