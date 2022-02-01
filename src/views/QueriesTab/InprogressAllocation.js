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
import moment from "moment";
import './index.css';
import ModalManual from "../ModalManual/AllComponentManual";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
function InprogressAllocation() {

  const alert = useAlert();
  const userId = window.localStorage.getItem("userid");
  const [query, setQuery] = useState([]);
  const [queriesCount, setCountQueries] = useState(null);
  const [records, setRecords] = useState([]);

  const [assignNo, setAssignNo] = useState('');
  const [additionalQuery, setAdditionalQuery] = useState(false);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [openManual, setManual] = useState(false)
  const additionalHandler = (key) => {
    setAdditionalQuery(!additionalQuery);
    setAssignNo(key)
  };


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

        if (res.data.code === 1) {
          setQuery(res.data.result);
          setCountQueries(res.data.result.length);
          setRecords(res.data.result.length);
        }
      });
  };

  const needHelp = () => {
        
    setManual(!openManual)
}

  const columns = [
    {
        text: "S.No",
        dataField: "",
        formatter: (cellContent, row, rowIndex) => {
            return rowIndex + 1;
        },
         style : {
               fontSize : "11px"
                },
        headerStyle: () => {
            return { fontSize: "12px"};
        },
    },
    {
        text: "Date",
        dataField: "created",
        sort: true,
        style : {
          fontSize : "11px"
          },
        headerStyle: () => {
          return { fontSize: "11px", width:"120px", padding: "10px 20px", whiteSpace: "nowrap" };
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
        style : {
          wordBreak : "break-word", fontSize : "11px"
          }, 
        headerStyle: () => {
            return { fontSize: "12px", width: "120px"};
        },
        formatter: function nameFormatter(cell, row) {
          
            return (
                <>
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
         style : {
                wordBreak : "break-word", fontSize : "11px"
                },
        headerStyle: () => {
            return { fontSize: "12px"};
        },
    },
    {
        text: "Sub Category",
        dataField: "cat_name",
        sort: true,
         style : {
                wordBreak : "break-word", fontSize : "11px"
                },
        headerStyle: () => {
            return { fontSize: "12px"};
        },
    },
    {
        text: "Status",
        dataField: "",
         style : {
                wordBreak : "break-word", fontSize : "11px"
                },
        headerStyle: () => {
            return { fontSize: "12px"};
        },
        formatter: function nameFormatter(cell, row) {
            return (
                <>
                    <div>
                        {row.status}/
                        {
                            row.status == "Inprogress Query" ?
                                <p className="inprogress">
                                    {row.status_message}
                                </p>
                                :
                                row.status == "Declined Query" ?
                                    <p className="declined">

                                        {row.status_message}
                                    </p> :
                                    row.status == "Completed Query" ?
                                        <p className="completed">

                                            {row.status_message}
                                        </p> :
                                        null
                        }
                    </div>
                </>
            );
        },
    },
    {
        text: "Expected / Actual Delivery Date",
        dataField: "exp_delivery_date",
        sort: true,
         style : {
                wordBreak : "break-word", fontSize : "11px"
                },
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
                            row.status_code != "3" && row.status_code > "1" ?
                              <>
                              {row.final_discussion === "completed" ?
                                CommonServices.removeTime(row.final_date) : 
                                CommonServices.removeTime(row.exp_delivery_date)}
                              </>
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
      style : {
        wordBreak : "break-word", fontSize : "11px"
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
                              pathname: `/customer/chatting/${row.id}&type=4`,  
                                index: 1,
                                routes: "queries",
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

                      </div> :
                      null
                  }

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
                                    index: 1,
                                    routes: "queries",
                                }}>
                                      <FeedbackIcon />
                                </Link>
                                            </div> : ""}
                                          
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
                             
                              pathname: `/customer/chatting/${row.id}&type=4`,  
                                index: 1,
                                routes: "queries",
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
   
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete query ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
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
      
        if (response.data.code === 1) {
          Swal.fire("", "Query deleted successfully.", "success");
          getQueriesData();
        } else {
          Swal.fire("Oops...", "Errorr ", "error");
        }
      })
      .catch((error) => {
       
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
          <div style={{display : "flex", justifyContent : "flex-end", margin : "10px auto"}}> 
         
          <i class="fa fa-question" style={{cursor : "pointer"}} onClick= {(e) => needHelp()}></i>
         </div>
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
</div>
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
 <Modal isOpen={openManual} toggle={needHelp} size= "lg" syle={{zIndex : "99999"}}>
                        <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
                        <ModalBody>
                            <ModalManual />
                        </ModalBody>
                    </Modal>
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