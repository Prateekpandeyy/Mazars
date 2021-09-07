import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import BootstrapTable from "react-bootstrap-table-next";
import Records from "../../components/Records/Records";
import CommonServices from "../../common/common";



function InprogressProposal() {
  const alert = useAlert();
  const userId = window.localStorage.getItem("userid");
  const [query, setQuery] = useState([]);
  const [queriesCount, setCountQueries] = useState(null);
  const [records, setRecords] = useState([]);


  useEffect(() => {
    getQueriesData();
  }, []);


  const getQueriesData = () => {
    axios
      .get(
        `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(userId)}&status=2`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setQuery(res.data.result);
          setCountQueries(res.data.result.length);
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
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.created);
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
        console.log(row);
        return (
          <>
            <Link to={`/customer/my-assingment/${row.q_id}`}>
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
      text: "Status",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div className="completed">
              {row.status}
              {/* {
                row.status == "Inprogress" ?
                  <p className="completed">
                    {row.statusdescription}
                  </p>
                  :
                  null
              } */}
            </div>
          </>
        );
      },
    },
    {
      text: "Expected Delivery Date",
      dataField: "exp_delivery_date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.exp_delivery_date);

        return (
          <>
            {
              row.status == "Declined Query"
                ? null
                :
                row.status_code >= "1" ?
                  CommonServices.removeTime(row.exp_delivery_date)
                  :
                  null
            }
          </>
        )
      },
    },
    {
      text: "Action",
      headerStyle: () => {
        return { fontSize: "12px", textAlign: "center", width: "130px" };
      }
    }
  ];

  return (
    <div>
      <Card>
        <CardHeader>
          <CustomerFilter
            setData={setQuery}
            getData={getQueriesData}
            id={userId}
            InprogressQueryProposal="InprogressQueryProposal"
            records={records}
            setRecords={setRecords}
          />
        </CardHeader>
        <CardBody>
          <Records records={records} />
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={query}
            columns={columns}
            rowIndex
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default InprogressProposal;
