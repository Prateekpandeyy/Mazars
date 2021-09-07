import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import BootstrapTable from "react-bootstrap-table-next";
import Records from "../../components/Records/Records";
import FeedbackIcon from '@material-ui/icons/Feedback';
import PublishIcon from '@material-ui/icons/Publish';
import AdditionalQueryModal from "./AdditionalQueryModal";
import Swal from "sweetalert2";
import CommonServices from "../../common/common";
import DiscardReport from "../AssignmentTab/DiscardReport";


function InprogressAllocation() {

  const alert = useAlert();
  const userId = window.localStorage.getItem("userid");
  const [query, setQuery] = useState([]);
  const [queriesCount, setCountQueries] = useState(null);
  const [records, setRecords] = useState([]);

  const [assignNo, setAssignNo] = useState('');
  const [additionalQuery, setAdditionalQuery] = useState(false);
  const additionalHandler = (key) => {
    setAdditionalQuery(!additionalQuery);
    setAssignNo(key)
  };

  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key)
  }

  useEffect(() => {
    getQueriesData();
  }, []);

  const getQueriesData = () => {
    axios
      .get(
        `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(userId)}&status=1`
      )
      .then((res) => {
        console.log(res);
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
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.created);
        var oldDate = row.created;
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
            {/* <Link to={`/customer/my-assingment/${row.id}`}>
              {row.assign_no}
            </Link> */}
            <Link
              to={{
                pathname: `/customer/my-assingment/${row.id}`,
                index: 1,
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
      text: "Status",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {
                row.status == "Inprogress Query" ?
                  <div>
                    {row.status}/
                    <p className="inprogress">
                      {row.status_message}
                    </p>
                  </div>
                  :
                  row.status == "Inprogress; Allocation" ?
                    <p>
                      {row.status}
                    </p>
                    :
                    row.status == "Inprogress; Proposals" ?
                      <p>
                        {row.status}
                      </p>
                      :
                      row.status == "Inprogress; Assignments" ?
                        <p>
                          {row.status}
                        </p>
                        :
                        null
              }
            </div>
          </>
        );
      },
    },
    {
      text: "Expected Delivery Date",
      dataField: "exp_delivery_date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.exp_delivery_date);

        return (
          <>
            {
              row.status == "Declined Query"
                ? null
                :
                row.status_code >= "1" ?
                  CommonServices.removeTime(row.exp_delivery_date)
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
        return { fontSize: "12px", textAlign: "center", width: "130px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            {
              row.status == "Declined Query" ?
                null
                :
                <div>
                  {
                    row.status_code == "0" || row.status_code == "1" || row.status_code == "3" ?
                      <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <div title="Update Query">
                          <Link to={`/customer/edit-query/${row.id}`}>
                            <i
                              className="fa fa-edit"
                              style={{
                                fontSize: 16,
                                cursor: "pointer",
                              }}
                            ></i>
                          </Link>
                        </div>

                        <div title="Delete Query">
                          <i
                            className="fa fa-trash"
                            style={{
                              fontSize: 16,
                              cursor: "pointer",

                            }}
                            onClick={() => del(row.id)}
                          ></i>
                        </div>
                        <div title="Send Message">
                          <Link
                            to={{
                              pathname: `/customer/chatting/${row.id}`,
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


                      </div> :
                      null
                  }

                  {
                    row.status_code == "4" || row.status_code == "9" || row.status_code == "2" ?
                      <div style={{ display: "flex", justifyContent: "space-around" }}>

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
                        </div>
                        {
                          row.delivery_report == "completed" ? null :
                            <div title="Upload Additional Documents"
                              style={{ cursor: "pointer" }}
                              onClick={() => additionalHandler(row.assign_no)}
                            >
                              <PublishIcon color="secondary" />
                            </div>
                        }
                        <div title="Send Message">
                          <Link
                            to={{
                              pathname: `/customer/chatting/${row.id}`,
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




  //check
  const del = (id) => {
    console.log("del", id);

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete query ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deleted it!",
    }).then((result) => {
      if (result.value) {
        deleteCliente(id);
      }
    });
  };

  const deleteCliente = (id) => {
    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("id", id);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/deleteQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          Swal.fire("", "Query deleted successfully.", "success");
          getQueriesData();
        } else {
          Swal.fire("Oops...", "Errorr ", "error");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };


  return (
    <div>
      <Card>
        <CardHeader>
          <CustomerFilter
            setData={setQuery}
            getData={getQueriesData}
            id={userId}
            InprogressAllocation="InprogressAllocation"
            records={records}
            setRecords={setRecords}
          />
        </CardHeader>
        <CardBody>
          <Records records={records} />

          <BootstrapTable
            bootstrap4
            keyField="id"
            data={query}
            columns={columns}
            rowIndex
          />

          <AdditionalQueryModal
            additionalHandler={additionalHandler}
            additionalQuery={additionalQuery}
            assignNo={assignNo}
            getQueriesData={getQueriesData}
          />

          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getQueriesData}
          />

        </CardBody>
      </Card>
    </div>
  );
}

export default InprogressAllocation;


const arr = [
  { name: "nitin", add: "noida" },
  { name: "nitin", add: "noida" },
  { name: "nitin", add: "noida" },
  { name: "nitin", add: "noida" },
  { name: "nitin", add: "noida" },
  { name: "nitin", add: "noida" },

  { name: "nitin", add: "noida" },
]