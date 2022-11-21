import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody } from "reactstrap";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import RejectedModal from "./RejectedModal";
import Alerts from "../../../common/Alerts";
import { Spinner } from "reactstrap";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import { Accept, Reject } from "../../../components/Common/MessageIcon";

function PendingForAcceptence({ CountPendingForAcceptence, updateTab }) {
  const userid = window.localStorage.getItem("tlkey");
  const [loading, setLoading] = useState(false);

  const [pendingData, setPendingData] = useState([]);
  const [records, setRecords] = useState([]);

  const [pay, setPay] = useState({
    id: "",
    allocation_id: "",
  });

  const [addPaymentModal, setPaymentModal] = useState(false);
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const rejectHandler = (key) => {
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
      .get(`${baseUrl}/tl/pendingQues?id=${JSON.parse(userid)}`, myConfig)
      .then((res) => {
        if (res.data.code === 1) {
          setPendingData(res.data.result);
          setRecords(res.data.result.length);
        }
      });
  };

  const columns = [
    {
      text: "S.no",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },

      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Query date",
      dataField: "query_created",
      sort: true,
      formatter: function dateFormat(cell, row) {
        var oldDate = row.query_created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Query no",
      dataField: "assign_no",
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/teamleader/queries/${row.id}`,
                index: 2,
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
      text: "Sub category",
      dataField: "cat_name",
      sort: true,
    },
    {
      text: "Client name",
      dataField: "name",
      sort: true,
    },
    {
      text: "Delivery due date ",
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
      text: "Accept / Reject",

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
              <div onClick={() => acceptHandler(row)}>
                <Accept titleName="Accept Assignment" />
              </div>
              <div onClick={() => rejectHandler(row)}>
                <Reject titleName="Reject Assignment" />
              </div>
            </div>
          </>
        );
      },
    },
  ];

  const acceptHandler = (key) => {
    setLoading(true);

    let formData = new FormData();
    formData.append("set", 1);
    formData.append("tlid", JSON.parse(userid));
    formData.append("assignment_id", key.id);
    formData.append("allocation_id", key.allocation_id);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/AcceptRejectQuery`,
      headers: {
        uit: token,
      },
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          setLoading(false);
          Alerts.SuccessNormal("Query accepted successfully.");
          getPendingforAcceptance();
          updateTab(2);
        } else if (response.data.code === 0) {
          setLoading(false);
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <Card>
        <CardHeader>
          <TeamFilter
            setData={setPendingData}
            getData={getPendingforAcceptance}
            pendingForAcceptence="pendingForAcceptence"
            setRecords={setRecords}
            records={records}
          />
        </CardHeader>
        <CardBody>
          {loading ? (
            <Spinner color="primary" />
          ) : (
            <DataTablepopulated
              bgColor="#6e557b"
              keyField={"assign_no"}
              data={pendingData}
              columns={columns}
            ></DataTablepopulated>
          )}
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
