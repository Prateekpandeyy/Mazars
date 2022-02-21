import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import AdminFilter from "../../components/Search-Filter/AdminFilter";
import Records from "../../components/Records/Records";
import DiscardReport from "../../pages/Admin/AssignmentTab/DiscardReport";
import DataTablepopulated from "../DataTablepopulated/DataTabel";
import MessageIcon, { ViewDiscussionIcon} from "../../components/Common/MessageIcon";

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
        return { width : "50px"};
      },
 
      formatter: (cellContent, row, rowIndex, index) => {

        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      text: "Date",
      dataField: "created",
      sort: true,
      
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
     
    },
    {
      text: "Sub Category",
      dataField: "cat_name",
      sort: true,
     
    },
    {
      text: "Client Name",
      dataField: "name",
      sort: true,
      
    },
    {
      text: "Status",
      
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
     
      formatter: function (cell, row) {
        return (
          <>
           {row.status == "Declined Query"  ? 
          <span onClick={() => ViewDiscussionToggel(row.assign_no)}  className="ml-1">
          <ViewDiscussionIcon />
        </span>: 
            <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div title="Send Message">
              <Link
               to={{
                pathname: `/admin/chatting/${row.id}`,
                index: 0,
                routes: "queriestab",
              
                  obj: {
                    message_type: "4",
                    query_No: row.assign_no,
                    query_id: row.id,
                    routes: `/admin/queriestab`
                  }
                }}
              >
                <MessageIcon />
              </Link>
            </div>

            <span onClick={() => ViewDiscussionToggel(row.assign_no)}  className="ml-1">
          <ViewDiscussionIcon />
        </span>
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
          <DataTablepopulated 
          bgColor="#55425f"
          keyField= {"assign_no"}
          data={allQueriesData}
          
          columns={columns}>
           </DataTablepopulated> : ""}


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