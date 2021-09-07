import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import TaxProfessionalFilter from "../../../components/Search-Filter/tpfilter";
import RejectedModal from "./RejectedModal";
import Alerts from "../../../common/Alerts";
import { Spinner } from 'reactstrap';


function PendingForAcceptence({ CountPendingForAcceptence, updateTab }) {
  const userid = window.localStorage.getItem("tpkey");
  const [loading, setLoading] = useState(false);

  const [pendingData, setPendingData] = useState([]);
  const [records, setRecords] = useState([]);

  const [pay, setPay] = useState({
    id: "",
    allocation_id: "",
  });

  const [addPaymentModal, setPaymentModal] = useState(false);
  const rejectHandler = (key) => {
    console.log("key", key);
    setPaymentModal(!addPaymentModal);
    setPay({
      id: key.id,
      allocation_id: key.allocation_id,
    });
  };

  useEffect(() => {
    getPendingforAcceptance();
  }, []);

  const getPendingforAcceptance = () => {
    axios
      .get(`${baseUrl}/tl/pendingQues?tp_id=${JSON.parse(userid)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setPendingData(res.data.result);
          setRecords(res.data.result.length);
          // CountPendingForAcceptence(res.data.result.length);
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
      dataField: "query_created",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.query_created);
        var oldDate = row.query_created;
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
            <Link
              to={{
                pathname: `/taxprofessional/queries/${row.id}`,
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
      text: "Accept / Reject",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                color: "#6967ce",
                cursor: "pointer",
              }}
              id="div1"
            >
              <div
                id="accept"
                title="Accept Assignment"
                onClick={() => acceptHandler(row)}
              >
                <i
                  class="fa fa-check"
                  style={{ color: "green", fontSize: "16px" }}
                ></i>
              </div>
              <div
                id="reject"
                title="Reject Assignment"
                // onClick={() => rejectHandler(row)}
                onClick={() => rejectHandler(row)}
              >
                <i
                  class="fa fa-times"
                  style={{ color: "red", fontSize: "16px" }}
                ></i>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  const acceptHandler = (key) => {
    console.log("acceptHandler", key);
    setLoading(true)

    let formData = new FormData();
    formData.append("set", 1);
    formData.append("tp_id", JSON.parse(userid));
    formData.append("assignment_id", key.id);
    formData.append("allocation_id", key.allocation_id);

    axios({
      method: "POST",
      url: `${baseUrl}/tp/AcceptRejectQuery`,
      data: formData,
    })
      .then(function (response) {
        console.log("response-", response);
        if (response.data.code === 1) {
          setLoading(false)
          Alerts.SuccessNormal("Query accepted successfully.")
          getPendingforAcceptance();
          updateTab(1);
        } else if (response.data.code === 0) {
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };



  return (
    <>
      <Card>
        <CardHeader>
          <TaxProfessionalFilter
            setData={setPendingData}
            getData={getPendingforAcceptance}
            pendingForAcceptence="pendingForAcceptence"
            setRecords={setRecords}
            records={records}
          />
        </CardHeader>
        <CardBody>
          {
            loading ?
              <Spinner color="primary" />
              :
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={pendingData}
                columns={columns}
                rowIndex
              />
          }
          <RejectedModal
            rejectHandler={rejectHandler}
            addPaymentModal={addPaymentModal}
            pay={pay}
            getPendingforAcceptance={getPendingforAcceptance}
          />
        </CardBody>
      </Card>
    </>
  );
}

export default PendingForAcceptence;

