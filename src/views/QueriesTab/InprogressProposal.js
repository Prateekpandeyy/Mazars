import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
 
} from "reactstrap";
import { Link } from "react-router-dom";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import BootstrapTable from "react-bootstrap-table-next";
import Records from "../../components/Records/Records";
import CommonServices from "../../common/common";
import moment from "moment";
import FeedbackIcon from '@material-ui/icons/Feedback';
import './index.css';
import DiscardReport from "../AssignmentTab/DiscardReport";
function InprogressProposal() {
  const alert = useAlert();
  const userId = window.localStorage.getItem("userid");
  const [query, setQuery] = useState([]);
  const [queriesCount, setCountQueries] = useState(null);
  const [records, setRecords] = useState([]);
  const [assignNo, setAssignNo] = useState('');

  useEffect(() => {
    getQueriesData();
  }, []);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key)
  }

  const getQueriesData = () => {
    axios
      .get(
        `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(userId)}&status=2`
      )
      .then((res) => {
       
        if (res.data.code === 1) {
          setQuery(res.data.result);
          setCountQueries(res.data.result.length);
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
          return { fontSize: "12px", width: "170px"};
      },
     formatter : function dateFormatter(cell, row) {
         return(
             <>
             {CommonServices.changeFormateDate(row.created)}
             </>
         )
     }
  },
  {
      text: "Query No",
      dataField: "assign_no",
      
      headerStyle: () => {
          return { fontSize: "12px", width: "100px"};
      },
      formatter: function nameFormatter(cell, row) {
        
          return (
              <>
                  <Link
                      to={{
                          pathname: `/customer/my-assingment/${row.id}`,
                          index: 0,
                          routes: "queries",
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
        return { fontSize: "12px"};
      },
    },
    {
      text: "Sub Category",
      dataField: "cat_name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px"};
      },
    },
    {
      text: "Status",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px"};
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div className="completed">
              {row.status}
            
            </div>
          </>
        );
      },
    },
    {
      text: "Actual Delivery Date",
      dataField: "final_date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px"};
      },
      formatter: function dateFormat(cell, row) {
        

        return (
          <>
            {
              row.status == "Declined Query"
                ? null
                :
                row.status_code >= "1" ?
                  CommonServices.removeTime(row.final_date)
                  :
                  null
            }
          </>
        )
      },
    },
    {
      text: "Action",
      headerStyle: () => {
        return { fontSize: "12px", textAlign: "center", width: "130px"};
      },
      formatter: function (cell, row) {
        var dateMnsFive = moment(row.exp_delivery_date).add(15, 'day').format("YYYY-MM-DD");
              
               
        var curDate = moment().format("YYYY-MM-DD")
     
        return (
          <>
            {
              row.status == "Declined Query" ?
                null
                :
                <div>
                

                                    {
                                        row.status_code == "4" || 8 < parseInt(row.status_code) || row.status_code == "2" ?
                                          
                                          <div style={{ display: "flex", justifyContent: "space-around" }}>

                                                {dateMnsFive > curDate === true ?
                                                <div title="Send Feedback"
                                                style={{
                                                    cursor: "pointer",
                                                }}>
                                                <Link
                                                    to={{
                                                        pathname: `/customer/feedback/${row.assign_no}`,
                                                        obj: {
                                                            routes: `/customer/queries`
                                                        }
                                                    }}
                                                >
                                                    <FeedbackIcon />
                                                </Link>
                                            </div> : ""}
                                          
                       
                        <div title="Send Message">
                          <Link
                            to={{
                              pathname: `/customer/chatting/${row.id}&type=4`,
                              obj: {
                                message_type: "4",
                                query_No: row.assign_no,
                                query_id: row.id,
                                routes: `/customer/queries`
                              }
                            }}
                          >
                            <i
                              class="fa fa-comments-o"
                              style={{
                                fontSize: 16,
                                cursor: "pointer",
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
                      :
                      null
                  }
                </div>

            }
          </>
        );
      },
    },
  ];




  return (
    <div>
      <Card>
        <CardHeader>
          <CustomerFilter
            setData={setQuery}
            getData={getQueriesData}
            id={userId}
            InprogressQueryProposal="InprogressQueryProposal"
            records={records}
            setRecords={setRecords}
          />
        </CardHeader>
        <CardBody>
          <Records records={records} />
          <div className="tableFixHead">
          <BootstrapTable
            bootstrap4
            keyField= {"assign_no"}
            data={query}
            columns={columns}
            rowIndex
            classes="table-responsive"
          />
                              <DiscardReport
                        ViewDiscussionToggel={ViewDiscussionToggel}
                        ViewDiscussion={ViewDiscussion}
                        report={assignNo}
                        getData={getQueriesData}
                    />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default InprogressProposal;
