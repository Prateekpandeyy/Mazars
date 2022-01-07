import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
 
} from "reactstrap";

import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import AdminFilter from "../Search-Filter/AdminFilter";
import Records from "../../components/Records/Records";
import DiscardReport from "../../pages/TL/AssignmentTab/DiscardReport";
function DeclinedQueries({ CountPendingForPayment }) {

  const [pendingData, setPendingData] = useState([]);
  const [records, setRecords] = useState([]);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [assignNo, setAssignNo] = useState('');
  useEffect(() => {
    getPendingForPayment();
  }, []);

  const getPendingForPayment = () => {
    axios.get(`${baseUrl}/admin/declinedQueries`).then((res) => {
    
      if (res.data.code === 1) {
        setPendingData(res.data.result);
        setRecords(res.data.result.length);

        // CountPendingForPayment(res.data.result.length);
      }
    });
  };

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key)
  }

  const columns = [
    {
      text: "S.No",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px"};
      },
      style : {
        wordBreak : "break-word"
        },
      formatter: (cellContent, row, rowIndex, index) => {
     
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      text: "Date",
      dataField: "created",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      style : {
        wordBreak : "break-word"
        },
      formatter: function dateFormat(cell, row) {
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
      style : {
        wordBreak : "break-word"
        },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/admin/queries/${row.id}`,
                index: 3,
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
      style : {
        wordBreak : "break-word"
        },
    },
    {
      text: "Sub Category",
      dataField: "cat_name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      style : {
        wordBreak : "break-word"
        },
    },
    {
      text: "Client Name",
      dataField: "name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      style : {
        wordBreak : "break-word"
        },
    },
   
    {
      text: "Status",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      style : {
        wordBreak : "break-word"
        },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.status} /
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
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      style : {
        wordBreak : "break-word"
        },
      formatter : function forma(cell, row) {
        return(
          <>
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
          </>
        )
      }
    },
  ];


  return (
    <>
      <Card>
        <CardHeader>
          <AdminFilter
            setData={setPendingData}
            getData={getPendingForPayment}
            declinedQueries="declinedQueries"
            setRecords={setRecords}
            records={records}
          />

        </CardHeader>
        <CardBody>
        <Records records={records} />
        <div className="tableFixHead">
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={pendingData}
            columns={columns}
            rowIndex
            wrapperClasses="table-responsive"
          /> 
          </div>
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getPendingForPayment}
          />
        </CardBody>
      </Card>
    </>
  );
}

export default DeclinedQueries;