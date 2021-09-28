import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import { Link, useParams } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import AdminFilter from "../Search-Filter/AdminFilter";
import Records from "../../components/Records/Records";

function DeclinedQueries({ CountPendingForPayment }) {

  const [pendingData, setPendingData] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getPendingForPayment();
  }, []);

  const getPendingForPayment = () => {
    axios.get(`${baseUrl}/admin/declinedQueries`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setPendingData(res.data.result);
        setRecords(res.data.result.length);

        // CountPendingForPayment(res.data.result.length);
      }
    });
  };



  const columns = [
    {
      text: "S.No",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px", width: "50px" };
      },
      formatter: (cellContent, row, rowIndex, index) => {
        console.log("rowIndex : ", index);
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
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={pendingData}
            columns={columns}
            rowIndex
            wrapperClasses="table-responsive"
          />
        </CardBody>
      </Card>
    </>
  );
}

export default DeclinedQueries;
