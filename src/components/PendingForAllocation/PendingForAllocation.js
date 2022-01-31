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

import AdminFilter from "../../components/Search-Filter/AdminFilter";
import BootstrapTable from "react-bootstrap-table-next";
import History from "./History";
import Records from "../../components/Records/Records";


function PendingAllocation({ CountPendingForAllocation }) {

  const [pendingData, setPendingData] = useState([])
  const [history, setHistory] = useState([]);
  const [records, setRecords] = useState([]);

  const [modal, setModal] = useState(false);

  const toggle = (key) => {
   
    setModal(!modal);

    fetch(`${baseUrl}/customers/getQueryHistory?q_id=${key}`, {
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
      style: {
        fontSize: "11px",
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
      style: {
        fontSize: "11px",
    },
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
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      style: {
        fontSize: "11px",
    },
    },
    {
      text: "Sub Category",
      dataField: "cat_name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      style: {
        fontSize: "11px",
    },
    },
    {
      text: "Client Name",
      dataField: "name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      style: {
        fontSize: "11px",
    },
    },
    {
      text: "Status",
      dataField: "status",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      style: {
        fontSize: "11px",
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
        return { fontSize: "12px" };
      },
      style: {
        fontSize: "11px",
    },
      formatter: function (cell, row) {
        return (
         
          <>
            {row.is_assigned === "1" ? (
              <p style={{ color: "green", fontSize: "10px" }}>
                Allocated to {row.tname} on
                <p>{row.allocation_time}</p>
              </p>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div title="Assign to">
                  <Link
                    to={`/admin/queryassing/${row.id}`}
                  >
                    <i className="fa fa-share"></i>
                  </Link>

                </div>
                <div title="Decline Query">
                  <Link
                    to={`/admin/query_rejection/${row.id}`}
                  >
                    <i
                      className="fa fa-trash"
                    ></i>
                  </Link>
                </div>



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
              className="btn btn-info btn-sm"
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
          <div className="tableFixHead">
          <BootstrapTable
            bootstrap4
            keyField="assign_no"
            data={pendingData}
            columns={columns}
            rowIndex
            wrapperClasses="table-responsive"
          /> </div>
          <History history={history} toggle={toggle} modal={modal} />
        </CardBody>
      </Card>
    </>
  );
}

export default React.memo(PendingAllocation);