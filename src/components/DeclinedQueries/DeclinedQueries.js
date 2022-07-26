import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
 
} from "reactstrap";

import { Link } from "react-router-dom";
import AdminFilter from "../Search-Filter/AdminFilter";
import Records from "../../components/Records/Records";
import DiscardReport from "../../pages/Admin/AssignmentTab/DiscardReport";
import DataTablepopulated from "../DataTablepopulated/DataTabel";
import { ViewDiscussionIcon} from "../../components/Common/MessageIcon";

function DeclinedQueries({ CountPendingForPayment }) {

  const [pendingData, setPendingData] = useState([]);
  const [records, setRecords] = useState([]);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [assignNo, setAssignNo] = useState('');
  const token = window.localStorage.getItem("adminToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
  useEffect(() => {
    getPendingForPayment();
  }, []);

  const getPendingForPayment = () => {
    axios.get(`${baseUrl}/admin/declinedQueries`, myConfig).then((res) => {
    
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
        return { width: "50px"};
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
     
      formatter : function forma(cell, row) {
        return(
          <>
                     <span onClick={() => ViewDiscussionToggel(row.assign_no)}  className="ml-1">
          <ViewDiscussionIcon />
        </span>
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
        {/* <Records records={records} /> */}
        <DataTablepopulated 
          bgColor="#55425f"
          keyField= {"assign_no"}
          data={pendingData}
          
          columns={columns}>
            </DataTablepopulated>
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getPendingForPayment}
            headColor="#6e557b"
          />
        </CardBody>
      </Card>
    </>
  );
}

export default DeclinedQueries;