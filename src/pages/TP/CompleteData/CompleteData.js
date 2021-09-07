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
import BootstrapTable from "react-bootstrap-table-next";
import TaxProfessionalFilter from "../../../components/Search-Filter/tpfilter";



function CompletedQuery() {
  const userid = window.localStorage.getItem("tpkey");

  const [incompleteData, setInCompleteData] = useState([]);
  const [records, setRecords] = useState([]);



  useEffect(() => {
    getInCompleteAssingment();
  }, []);

  const getInCompleteAssingment = () => {
    axios
      .get(`${baseUrl}/tl/getIncompleteQues?tp_id=${JSON.parse(userid)}&status=2`)
      .then((res) => {
        console.log(res);
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
            <Link
              to={{
                pathname: `/taxprofessional/queries/${row.id}`,
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
      text: "	Exp. Delivery Date",
      dataField: "Exp_Delivery_Date",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.Exp_Delivery_Date);
        var oldDate = row.Exp_Delivery_Date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
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
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <TaxProfessionalFilter
            setData={setInCompleteData}
            getData={getInCompleteAssingment}
            inCompleteQuery="inCompleteQuery"
            setRecords={setRecords}
            records={records}
          />
        </CardHeader>
        <CardBody>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={incompleteData}
            columns={columns}
            rowIndex
          />
        </CardBody>
      </Card>
    </>
  );
}

export default CompletedQuery;
