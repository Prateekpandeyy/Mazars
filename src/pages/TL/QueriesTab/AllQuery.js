import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import DiscardReport from "../AssignmentTab/DiscardReport";



function AllQuery() {

    const userid = window.localStorage.getItem("tlkey");

    const [incompleteData, setInCompleteData] = useState([]);
    const [records, setRecords] = useState([]);


    const [assignNo, setAssignNo] = useState('');
    const [ViewDiscussion, setViewDiscussion] = useState(false);
    const ViewDiscussionToggel = (key) => {
        setViewDiscussion(!ViewDiscussion);
        setAssignNo(key)
    }

    useEffect(() => {
        getInCompleteAssingment();
    }, []);

    const getInCompleteAssingment = () => {
        axios
            .get(`${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}`)
            .then((res) => {

                if (res.data.code === 1) {
                    setInCompleteData(res.data.result);
                    setRecords(res.data.result.length);
                }
            });
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
            dataField: "created",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px" , width : "120px"};
            },
            formatter : function(cell, row){
                let dueDate=row.created.split("-").reverse().join("-")
              
                return(
                   
                    <>
              {dueDate}
                    </>
                )
            }
        },
        {
            text: "Query No",
            dataField: "assign_no",
            headerStyle: () => {
                return { fontSize: "12px" , width :"120px"};
            },
            formatter: function nameFormatter(cell, row) {

                return (
                    <>
                        {/* <Link to={`/teamleader/queries/${row.id}`}>{row.assign_no}</Link> */}
                        <Link
                            to={{
                                pathname: `/teamleader/queries/${row.id}`,
                                index: 0,
                                routes: "queriestab",
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
                return { fontSize: "12px", width :"120px" };
            },
        },
        {
            text: "Sub Category",
            dataField: "cat_name",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px", width : "120px" };
            },
        },
        {
            text: "Customer Name",
            dataField: "name",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px" , width : "150px"};
            },
        },
        {
            text: "	Exp. Delivery Date",
            dataField: "Exp_Delivery_Date",
            sort: true,
            headerStyle: () => {
                return { fontSize: "12px" , width : "140px"};
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
            text: "Status",
            headerStyle: () => {
                return { fontSize: "12px", width : "120px" };
            },
            formatter: function nameFormatter(cell, row) {
                return (
                    <>
                        <div>
                            {row.status}/
                            {
                                row.status == "Inprogress Query" ?
                                    <p className="inprogress">

                                        {row.statusdescription}
                                    </p>
                                    :
                                    row.status == "Declined Query" ?
                                        <p className="declined">

                                            {row.statusdescription}
                                        </p> :
                                        row.status == "Completed Query" ?
                                            <p className="completed">

                                                {row.statusdescription}
                                            </p> :
                                            null
                            }
                        </div>
                    </>
                );
            },
        },
        {
            text: "Action",
            dataField: "",
            headerStyle: () => {
                return { fontSize: "12px" , width : "100px"};
            },
            formatter: function (cell, row) {
              
                return (
                    <>
                      {row.status_code == "1" ? null :
                      
                      <div
                      style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          color: "green",
                      }}
                  >
                     

                      {row.status == "Declined Query" ? null :
                      <div title="Send Message">
                      <Link
                          to={{
                              pathname: `/teamleader/chatting/${row.id}`,
                              obj: {
                                  message_type: "4",
                                  query_No: row.assign_no,
                                  query_id: row.id,
                                  routes: `/teamleader/queriestab`
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
                  </div>}

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
}                    </>
                );
            },
        },
    ];

    return (
        <>
            <Card>
                <CardHeader>
                    <TeamFilter
                        setData={setInCompleteData}
                        getData={getInCompleteAssingment}
                        AllQuery="AllQuery"
                        setRecords={setRecords}
                        records={records}
                    />
                </CardHeader>
                <CardBody>
                <div className="tableFixHead">
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={incompleteData}
                        columns={columns}
                        rowIndex
                        classes="table-responsive"
                    />
                    </div>
                    <DiscardReport
                        ViewDiscussionToggel={ViewDiscussionToggel}
                        ViewDiscussion={ViewDiscussion}
                        report={assignNo}
                        getData={getInCompleteAssingment}
                    />

                </CardBody>
            </Card>
        </>
    );
}

export default AllQuery;
