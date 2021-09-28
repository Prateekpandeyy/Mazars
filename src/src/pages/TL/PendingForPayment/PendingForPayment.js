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
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import BootstrapTable from "react-bootstrap-table-next";


function PendingForPayment() {
  const userid = window.localStorage.getItem("tlkey");
  const [pendingForPayment, setPendingForPayment] = useState([]);

  useEffect(() => {
    getPendingForPayment();
  }, []);

  const getPendingForPayment = () => {
    axios
      .get(`${baseUrl}/tl/getProposals?uid=${JSON.parse(userid)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
            setPendingForPayment(res.data.result);
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
      dataField: "query_date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      // formatter: function dateFormat(cell, row) {
      //   console.log("dt", row.query_date);
      //   var date = row.query_date
      //   var updatedate = date.split(" ")[0];
      //   console.log(updatedate);
      //   if (updatedate == null) {
      //     return null;
      //   }
      //   return updatedate.toString().split("-").reverse().join("-");
      // },
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
            <Link to={`/teamleader/queries/${row.id}`}>{row.assign_no}</Link>
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
      text: "Assignment No",
      dataField: "",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Amount Accepted",
      dataField: "accepted_amount",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Payment Terms",
      dataField: "",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Payments Received",
      dataField: "",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Outstanding payment",
      dataField: "",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
  ];

  return (
    <div>
      <Card>
        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={pendingForPayment}
            columns={columns}
            rowIndex
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default PendingForPayment;
