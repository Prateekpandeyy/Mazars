import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { Card, CardHeader, CardBody } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import AdminFilter from "../../../components/Search-Filter/AdminFilter";
const AdminEnquiry = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(0);
  const token = window.localStorage.getItem("adminToken");
  const userId = window.localStorage.getItem("adminkey");

  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    getData();
  }, []);

  // functions

  const getData = () => {
    axios.get(`${baseUrl}/admin/enquirylist`, myConfig).then((res) => {
      if (res.data.code === 1) {
        setData(res.data.result);
        setRecords(res.data.result.length);
        setLoading(true);
      }
    });
  };

  const columns = [
    {
      dataField: "",
      text: "S.no",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },

      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      dataField: "query_created_date",
      text: "Date",
      sort: true,

      formatter: function dateFormat(cell, row) {
        var oldDate = row.query_created_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },

    {
      dataField: "parent_id",
      text: "Category",
      sort: true,
    },
    {
      dataField: "cat_name",
      text: "Sub category",
      sort: true,
    },
    {
      text: "Date of acceptance of proposal",
      dataField: "cust_accept_date",
      sort: true,

      formatter: function dateFormat(cell, row) {
        var oldDate = row.cust_accept_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Status",
      dataField: "",

      formatter: function (cell, row) {
        return (
          <>
            {row.paid_status == "2" ? (
              <p className="declined">{row.status} </p>
            ) : (
              <p>{row.status}</p>
            )}
          </>
        );
      },
    },
    {
      dataField: "accepted_amount",
      text: "Accepted amount ",
      sort: true,

      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.accepted_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      text: "Amount paid",
      dataField: "paid_amount",
      sort: true,

      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.paid_amount;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },

    {
      text: "Amount outstanding",
      dataField: "amount_outstanding",
      sort: true,

      sortFunc: (a, b, order, dataField) => {
        if (order === "asc") {
          return b - a;
        }
        return a - b; // desc
      },

      formatter: function nameFormatter(cell, row) {
        var nfObject = new Intl.NumberFormat("hi-IN");
        var x = row.amount_outstanding;

        return <p className="rightAli">{nfObject.format(x)}</p>;
      },
    },
    {
      text: "Date of payment",
      dataField: "cust_paid_date",
      sort: true,

      formatter: function dateFormat(cell, row) {
        var oldDate = row.cust_paid_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      dataField: "tl_name",
      text: "TL name",
      sort: true,
    },
  ];

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>
      <Card>
        <CardHeader>
          <AdminFilter
            setData={setData}
            getData={getData}
            AllPayment="AllPayment"
            setRecords={setRecords}
            records={records}
          />
        </CardHeader>
        {loading && (
          <CardBody>
            <DataTablepopulated
              bgColor="#2b5f55"
              keyField="id"
              data={data}
              columns={columns}
            ></DataTablepopulated>
          </CardBody>
        )}
      </Card>
    </Layout>
  );
};

export default AdminEnquiry;
