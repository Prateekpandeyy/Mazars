import React, { useState, useEffect } from "react";
import axios from "axios";
import './Allocation.css';
import { baseUrl } from "../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  
} from "reactstrap";
import { Link } from "react-router-dom";
import History from "./History";
import Records from "../../components/Records/Records";
import AdminFilter from "../../components/Search-Filter/AdminFilter";
import DataTablepopulated from "../DataTablepopulated/DataTabel";
import {DeleteIcon, DiscussProposal} from "../../components/Common/MessageIcon";

function PendingAllocation({ CountPendingForAllocation }) {

  const [pendingData, setPendingData] = useState([])
  const [history, setHistory] = useState([]);
  const [records, setRecords] = useState([]);

  const [modal, setModal] = useState(false);

  const toggle = (key) => {
   
    setModal(!modal);

    fetch(`${baseUrl}/admin/getQueryHistory?q_id=${key}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/vnd.github.cloak-preview",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
       
        setHistory(response.result);
      })
      .catch((error) => console.log(error));
  };




  useEffect(() => {
    getPendingForAllocation();
  }, []);

  const getPendingForAllocation = () => {
    axios.get(`${baseUrl}/admin/pendingAllocation`).then((res) => {
    
      if (res.data.code === 1) {
        // CountPendingForAllocation(res.data.result.length);
        setPendingData(res.data.result);
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
        return { width: "50px" };
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
      text: "Status",
      dataField: "status",
      
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
      
      formatter: function (cell, row) {
        return (
         
          <>
            {row.is_assigned === "1" ? (
              <p className="inprogress">
                Allocated to {row.tname} on
                <p>{row.allocation_time}</p>
              </p>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
               
                  <Link
                    to={`/admin/queryassing/${row.id}`}
                  >
                   <DiscussProposal titleName="Assign to" />
                  </Link>

                
                
                  <Link
                    to={`/admin/query_rejection/${row.id}`}
                  >
                   <DeleteIcon titleName="Decline Query"/>
                  </Link>
                



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
      style: {
        fontSize: "11px",
    },
      formatter: function (cell, row) {
        return (
          <>
            <button
              type="button"
              className="autoWidthBtn"
              onClick={() => toggle(row.id)}
            >
              History
            </button>
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
            setData={setPendingData}
            getData={getPendingForAllocation}
            pendingAlloation="pendingAlloation"
            setRecords={setRecords}
            records={records}
          />
        </CardHeader>
        <CardBody className = "card-body">
          <Records records={records} />
          <DataTablepopulated 
          bgColor="#55425f"
          keyField= {"assign_no"}
          data={pendingData} 
          columns={columns}>
           </DataTablepopulated>
          <History history={history} toggle={toggle} modal={modal} />
        </CardBody>
      </Card>
    </>
  );
}

export default React.memo(PendingAllocation);