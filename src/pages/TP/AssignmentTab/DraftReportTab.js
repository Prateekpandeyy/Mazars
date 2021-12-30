import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import {
    Card,
    CardHeader,
    CardBody,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import BootstrapTable from "react-bootstrap-table-next";
import DiscardReport from "../AssignmentTab/DiscardReport";
import DraftReportModal from "./DraftReportUpload";
import ViewAllReportModal from "./ViewAllReport";
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';



function AssignmentTab() {

    const history = useHistory();
    const userid = window.localStorage.getItem("tpkey");

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

    var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2);
    const [item] = useState(current_date);
    const [dataItem, setDataItem] = useState({});
    const [draftModal, setDraftModal] = useState(false);
    const [assignNo, setAssignNo] = useState('');
    const [report, setReport] = useState();
  const [reportModal, setReportModal] = useState(false);
  const [loading, setLoading] = useState(false);

  let des = false;
    const ViewReport = (key) => {
       
        setReportModal(!reportModal);
        setReport(key.assign_no);
        setDataItem(key)
      };
 // draft modal
 const uploadDraftReport = (id) => {
    if(typeof(id) == "object"){
      
      let des = true;
      setLoading(false)
      setDraftModal(!draftModal);
    }
    else{
      setDraftModal(!draftModal);
      setId(id);
    }
  
  };

    const [ViewDiscussion, setViewDiscussion] = useState(false);
    const ViewDiscussionToggel = (key) => {
        setViewDiscussion(!ViewDiscussion);
        setAssignNo(key)
    }
    useEffect(() => {
        getAssignmentList();
    }, []);

    const getAssignmentList = () => {
        axios
            .get(`${baseUrl}/tl/getAssignments?tp_id=${JSON.parse(userid)}&assignment_status=Draft_Report&stages_status=1`)
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
            if(selectedData != undefined){
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
        getAssignmentList();
    };

    //reset date
    const resetData = () => {
     
        reset();
        setStatus([]);
        setSelectedData([]);
        setStore2([]);
        getAssignmentList();
    };

    //assingmentStatus
   


    //columns
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
              
                return (
                    <>
                        <Link
                            to={{
                                pathname: `/taxprofessional/queries/${row.q_id}`,
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
                            <p>
                                <span style={{ fontWeight: "bold" }}>Client Discussion :</span>
                                {row.client_discussion}
                            </p>
                            <p>
                                <span style={{ fontWeight: "bold" }}>Draft report :</span>
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
            text: "Expected date of delivery",
            dataField: "Exp_Delivery_Date",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px" };
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
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px" };
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
                            onClick={() => ViewReport(row)}
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
            text: "Assignment Stage",
            headerStyle: () => {
              return { fontSize: "12px" };
            },
            formatter: function (cell, row) {
              return (
                <>
                  <div
                    title="Add Assignment stages"
                    style={{ cursor: "pointer", textAlign: "center" }}
                  >
                      {
                 row.paid_status == "2" ? null :
                    <Link to={`/taxprofessional/addassingment/${row.q_id}`}>
                      <i class="fa fa-tasks"></i>
                    </Link>
            }
                  </div>
                </>
              );
            },
          },
        {
            text: "Action",
            headerStyle: () => {
                return { fontSize: "12px" };
            },
            formatter: function (cell, row) {
                return (
                    <>
               {
                 row.paid_status == "2" ? null : 
                 <div
                 style={{
                   display: "flex",
                   justifyContent: "space-between",
                 }}
               >
                 
                 
                    {
                    row.client_discussion == "completed" && row.draft_report == "inprogress" && row.paid_status !=2 ?
                    <div title="upload Pdf">
                    <p
                      style={{ cursor: "pointer", color: "green" }}
                      onClick={() => uploadDraftReport(row.id)}
                    >
                      <i class="fa fa-upload" style={{ fontSize: "16px" }}></i>
                      draft
                    </p>
                  </div> : null
                 }
                  {
                    row.client_discussion == "completed" && row.draft_report == "completed" && row.final_discussion == "inprogress" ?
                    <div title="upload Pdf">
                    <p
                      style={{ cursor: "pointer", color: "green" }}
                      onClick={() => uploadDraftReport(row.id)}
                    >
                      <i class="fa fa-upload" style={{ fontSize: "16px" }}></i>
                      draft
                    </p>
                  </div> : null
                 }
                
      
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
                 <div title="Send Message">
                   <Link
                     to={{
                       pathname: `/taxprofessional/chatting/${row.q_id}`,
                       obj: {
                         message_type: "3",
                         query_No: row.assign_no,
                         query_id: row.q_id,
                         routes: `/taxprofessional/assignment`
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
      
               </div>
               }
                </>
                );
            },
        },
    ];


    const onSubmit = (data) => {
       
        axios
            .get(
                `${baseUrl}/tp/getAssignments?tp_id=${JSON.parse(
                    userid
                )}&cat_id=${store2}&from=${data.p_dateFrom}&to=${data.p_dateTo
                }&assignment_status="Draft_Report"&stages_status=1
               &pcat_id=${selectedData}`
            )
            .then((res) => {
              
                if (res.data.code === 1) {
                    if (res.data.result) {
                        setAssignment(res.data.result);
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
                                <label className="form-select form-control">Total Records : {records}</label>
                            </div>
                            <button type="submit" class="btn btn-primary mx-sm-1 mb-2">
                                Search
                            </button>

                            <Reset />
                        </div>
                    </form>
                </CardHeader>

                <CardBody>
                <div className="tableFixHead">
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={assignment}
                        columns={columns}
                        rowIndex
                        classes="table-responsive"
                    />
                    </div>

<DraftReportModal
            draftModal={draftModal}
            uploadDraftReport={uploadDraftReport}
            getAssignmentList={getAssignmentList}
            id={id}
            loading = {loading}
            setLoading = {setLoading}
            des = {des}
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
                    />
                </CardBody>
            </Card>
        </>
    );
}

export default AssignmentTab;
