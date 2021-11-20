import React, { useState,  useContext } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import AdminFilter from "../../components/Search-Filter/AdminFilter";
import Records from "../../components/Records/Records";
import DiscardReport from "../../pages/Admin/AssignmentTab/DiscardReport";
import { QueryData } from "../../pages/Admin/QueriesTab/QueriesTab";

const AllQueriesData = React.memo((props) => {
const qda = useContext(QueryData)
  const [allQueriesData, setAllQueriesData] = useState([])
  const [records, setRecords] = useState([]);
  const [assignNo, setAssignNo] = useState('');

  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key)
  }

  const columns = [
    {
      text: "S.No",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px", width: "50px" };
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
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/admin/queries/${row.id}`,
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
    {
      text: "Action",
      headerStyle: () => {
        return { fontSize: "12px", width: "85px" };
      },
      formatter: function (cell, row) {
        return (
          <>
           {row.status == "Declined Query"  ? null : 
            <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div title="Send Message">
              <Link
                to={{
                  pathname: `/admin/chatting/${row.id}`,
                  obj: {
                    message_type: "4",
                    query_No: row.assign_no,
                    query_id: row.id,
                    routes: `/admin/queriestab`
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
}
          </>
        );
      },
    },
  ];

  return (
    <>
   {qda.allData === undefined ?  "" :
      <Card>
        <CardHeader>
          <AdminFilter
            setData={qda.setAllData}
            getData={qda.CountAllQuery}
            allQueries="allQueries"
            setRecords={qda.setAllQueryCount}
            records={records}
          />

        </CardHeader>
        <CardBody>
          <Records records={qda.allQueriesCount} />
         
          <BootstrapTable
          bootstrap4
          keyField="id"
          data={qda.allData}
          columns={columns}
          rowIndex
          wrapperClasses="table-responsive"
        />


          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={qda.allData}
          />

        </CardBody>
      </Card>  }
    </>
  );
})

export default AllQueriesData;