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
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import DiscardReport from "../AssignmentTab/DiscardReport";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";

function InCompleteData({ CountIncomplete }) {
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
      .get(`${baseUrl}/tl/getIncompleteQues?id=${JSON.parse(userid)}&status=1`)
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
        return {width: "50px" };
      },
    
    },
    {
      text: "Query Date",
      dataField: "created",
      sort: true,
    
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
     
      formatter: function nameFormatter(cell, row) {
       
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
      text: "Delivery Due Date   / Acutal Delivery Date",
      dataField: "Exp_Delivery_Date",
      sort: true,
    
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
      
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.status}{row.statusdescription && "/"}
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
      style: {
        fontSize: "11px",
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
                      index: 1,
                      routes: "queriestab",
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
            InprogressQuery="InprogressQuery"
            setRecords={setRecords}
            records={records}
          />
        </CardHeader>
        <CardBody>
        <DataTablepopulated 
          bgColor="#55425f"
          keyField= {"assign_no"}
          data={incompleteData}
          
          columns={columns}>
           </DataTablepopulated> 
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

export default InCompleteData;
