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
import History from "../../../components/PendingForAllocation/History";
import Swal from "sweetalert2";
import { useParams, useHistory } from "react-router-dom";

function CompletedQuery() {
  const userid = window.localStorage.getItem("tlkey");
const hist = useHistory();
  const [incompleteData, setInCompleteData] = useState([]);
  const [records, setRecords] = useState([]);
 
  const [assignNo, setAssignNo] = useState('');
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);
  // const [records, setRecords] = useState([]);
  const ViewDiscussionToggel = (key) => {
      setViewDiscussion(!ViewDiscussion);
      setAssignNo(key)
  }



  useEffect(() => {
    getInCompleteAssingment();
  }, []);
  const toggle = (key) => {
    console.log("key", key);
    setModal(!modal);
  console.log("userid", userid)
    fetch(`${baseUrl}/customers/getQueryHistory?q_id=${key}&uid=${JSON.parse(userid)}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/vnd.github.cloak-preview",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setHistory(response.result);
      })
      .catch((error) => console.log(error));
  };
  const getInCompleteAssingment = () => {
    axios
      .get(`${baseUrl}/tl/pendingAllocation?uid=${JSON.parse(userid)}`)
      .then((res) => {
        console.log(res);
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
        return { fontSize: "12px" };
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
            <Link
              to={{
                pathname: `/teamleader/queries/${row.id}`,
                index: 1,
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
      text: "Customer Name",
      dataField: "name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "	Exp. Delivery Date",
      dataField: "Exp_Delivery_Date",
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
      text: "Status",
      headerStyle: () => {
          return { fontSize: "12px" };
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
  //   {
  //     text: "Action",
  //     dataField: "",
  //     headerStyle: () => {
  //         return { fontSize: "12px" };
  //     },
  //     formatter: function (cell, row) {
  //         console.log("StatusCode", row)
  //         return (
  //             <>
  //                 <div
  //                     style={{
  //                         display: "flex",
  //                         justifyContent: "space-evenly",
  //                         color: "green",
  //                     }}
  //                 >
  //                     <Link to={`/teamleader/queryassing/${row.id}`}>
  //                         {row.statuscode == "1" ? (
  //                             <div title="Assigned">
  //                                 <i class="fa fa-share" style={{ color: "green" }}></i>
  //                             </div>
  //                         ) :
  //                             row.statuscode == "2" ?
  //                                 (
  //                                     <div title="Assign to">
  //                                         <i class="fa fa-share"></i>
  //                                     </div>
  //                                 )
  //                                 :
  //                                 ""
  //                         }
  //                     </Link>

  //                     <div title="Send Message">
  //                         <Link
  //                             to={{
  //                                 pathname: `/teamleader/chatting/${row.id}`,
  //                                 obj: {
  //                                     message_type: "2",
  //                                     query_No: row.assign_no,
  //                                     query_id: row.id,
  //                                     routes: `/teamleader/proposal`
  //                                 }
  //                             }}
  //                         >
  //                             <i
  //                                 class="fa fa-comments-o"
  //                                 style={{
  //                                     fontSize: 16,
  //                                     cursor: "pointer",
  //                                     marginLeft: "8px",
  //                                     color: "blue"
  //                                 }}
  //                             ></i>
  //                         </Link>
  //                     </div>

  //                     <div title="View Discussion Message">
  //                         <i
  //                             class="fa fa-comments-o"
  //                             style={{
  //                                 fontSize: 16,
  //                                 cursor: "pointer",
  //                                 color: "orange"
  //                             }}
  //                             onClick={() => ViewDiscussionToggel(row.assign_no)}
  //                         ></i>
  //                     </div>
  //                 </div>
  //             </>
  //         );
  //     },
  // },
  {
    text: "Action",
    dataField: "",
    headerStyle: () => {
      return { fontSize: "12px" };
    },
    formatter: function (cell, row) {
      return (
        <>
          {row.statuscode === "0" || row.statuscode === "3"? (
           
           <i onClick ={() => assignConfirm(row.id, row.assign_no)} class="fa fa-share" style={{color : "blue", cursor : "pointer"}}></i>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {/* <div title="Assign to">
               

              </div>
              <div title="Decline Query">
                <Link
                  to={`/teamleader/query_rejection/${row.id}`}
                >
                  <i
                    className="fa fa-trash"
                  ></i>
                </Link>
              </div> */}
  <p style={{ color: "green", fontSize: "10px" }}>

 Allocated to {row.tname} on
<p>{row.allocation_time}</p>
</p>
              {/* <div title="Send Message">
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
              </div> */}

            </div>



          )}
        </>
      );
    },
  },
  {
    text: "History",
    dataField: "",
    headerStyle: () => {
      return { fontSize: "12px" };
    },
    formatter: function (cell, row) {
      return (
        <>
          <button
            type="button"
            class="btn btn-info btn-sm"
            onClick={() => toggle(row.id)}
          >
            History
          </button>
        </>
      );
    },
  },
  ];



  const  assignConfirm = (id, assign_number) => {
   console.log("id", id)
    Swal.fire({
      title: "Are you sure?",
      text: `do you want to assign ${assign_number} to taxprofessional`,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, assign it!",
    }).then((result) => {
      if (result.value) {
        console.log(result.value)
       hist.push(`/teamleader/queryassing/${id}`)
      }
      else{
        console.log("no");
        axios.get(`${baseUrl}/tl/workby?uid=${JSON.parse(userid)}&qid=${id}`).then((res) => {
          if(res.data.code === 1){
            hist.push(`/teamleader/proposal`)
           
          }
        })
      }
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <TeamFilter
            setData={setInCompleteData}
            getData={getInCompleteAssingment}
            inCompleteQuery="inCompleteQuery"
            setRecords={setRecords}
            records={records}
          />
        </CardHeader>
        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={incompleteData}
            columns={columns}
            rowIndex
          />
            <History history={history} toggle={toggle} modal={modal} />
        </CardBody>
      </Card>
    </>
  );
}

export default CompletedQuery;
