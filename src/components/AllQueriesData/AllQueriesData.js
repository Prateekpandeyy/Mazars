import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
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



function AllQueriesData({allData}) {

  const [allQueriesData, setAllQueriesData] = useState([])
  const [records, setRecords] = useState([]);
  const [assignNo, setAssignNo] = useState('');

  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key)
  }



  useEffect(() => {
    getAllQueriesData();
  }, [allData]);

  const getAllQueriesData = () => {
    axios.get(`${baseUrl}/admin/getAllQueries`).then((res) => {
     
      if (res.data.code === 1) {
       // setAllQueriesData(res.data.result);
        setRecords(res.data.result.length);
      }
    });
    setAllQueriesData(allData)
  };




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
        return { fontSize: "12px", width : "80px" };
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
        return { fontSize: "12px", width : "130px" };
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
        return { fontSize: "12px" , width : "130px"};
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
      text: "Client Name",
      dataField: "name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" , width : "180px"};
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
      headerStyle: () => {
        return { fontSize: "12px", width: "85px" };
      },
      formatter: function (cell, row) {
        return (
          <>
           {row.status == "Declined Query"  ? 
           <div title="View Discussion Message">
           <i
             className="fa fa-comments-o"
             style={{
               fontSize: 16,
               cursor: "pointer",
               color: "orange"
             }}
             onClick={() => ViewDiscussionToggel(row.assign_no)}
           ></i>
         </div> : 
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
                  className="fa fa-comments-o"
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
                className="fa fa-comments-o"
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
   
      <Card>
        <CardHeader>
          <AdminFilter
            setData={setAllQueriesData}
            getData={getAllQueriesData}
            allQueries="allQueries"
            setRecords={setRecords}
            records={records}
          />

        </CardHeader>
        <CardBody>
          <Records records={records} />
         {allQueriesData != undefined ? 
          <div className="tableFixHead">
          <BootstrapTable
          bootstrap4
          keyField="id"
          data={allQueriesData}
          columns={columns}
          rowIndex
          wrapperClasses="table-responsive"
        />  </div> : ""}


          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getAllQueriesData}
          />

        </CardBody>
      </Card>
    </>
  );
}

export default React.memo(AllQueriesData);