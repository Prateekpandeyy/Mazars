import React, { useState, useEffect, useRef } from "react";
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

  const myRef = useRef([]);
  const [countNotification, setCountNotification] = useState("");

  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [accend, setAccend] = useState(false);
  const [prev, setPrev] = useState("");
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);

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

  // useEffect(() => {
  //   getPendingforAcceptance();
  // }, []);
  useEffect(() => {
    let localPage = Number(localStorage.getItem("tlqp2"));
    if (!localPage) {
      localPage = 1;
    }
    setAccend(localStorage.getItem("accendtlq3"));
    setPrev(localStorage.getItem("prevtlq3"));

    let sortVal = JSON.parse(localStorage.getItem("sortedValuetlq3"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("sortedValuetlq3", JSON.stringify(sort));
    }

    setEnd(Number(localStorage.getItem("tl_record_per_page")));
    getPendingforAcceptance(localPage);
  }, []);

  const getPendingforAcceptance = (e) => {
    let searchData = JSON.parse(localStorage.getItem("searchDatatlquery3"));

    setPage(e);
    let allEnd = Number(localStorage.getItem("tl_record_per_page"));
    let orderBy = 0;
    let fieldBy = 0;
    let sortVal = JSON.parse(localStorage.getItem("sortedValue3"));
    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let remainApiPath = "";

    if (searchData) {
      remainApiPath = `/tl/pendingQues?id=${JSON.parse(
        userid
      )}&status=1&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}&cat_id=${
        searchData.store
      }&from=${searchData.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${searchData.toDate
        ?.split("-")
        .reverse()
        .join("-")}&status=${searchData?.p_status}&pcat_id=${
        searchData.pcatId
      }&qno=${searchData?.query_no}`;
    } else {
      remainApiPath = `tl/pendingQues?id=${JSON.parse(
        userid
      )}&status=1&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    }
    if (e) {
      axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
        if (res.data.code === 1) {
          let droppage = [];
          let data = res.data.result;

          setCountNotification(res.data.total);
          setRecords(res.data.total);
          let all = [];
          let customId = 1;
          if (e > 1) {
            customId = allEnd * (e - 1) + 1;
          }
          data.map((i) => {
            let data = {
              ...i,
              cid: customId,
            };
            customId++;
            all.push(data);
          });
          setPendingData(all);
          setRecords(res.data.result.length);
          let end = e * allEnd;

          if (end > res.data.total) {
            end = res.data.total;
          }
          let dynamicPage = Math.ceil(res.data.total / allEnd);

          let rem = (e - 1) * allEnd;

          if (e === 1) {
            setBig(rem + e);
            setEnd(end);
          } else {
            setBig(rem + 1);
            setEnd(end);
          }
          for (let i = 1; i <= dynamicPage; i++) {
            droppage.push(i);
          }
          setDefaultPage(droppage);
        }
      });
    }
  };

  const columns = [
    {
      text: "S.no",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return (
          <div
            id={row.assign_no}
            ref={(el) => (myRef.current[row.assign_no] = el)}
          >
            {rowIndex + 1}
          </div>
        );
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
                pathname: `/teamleader_queries/${row.id}`,
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
            setCountNotification={setCountNotification}
            countNotification={countNotification}
            big={big}
            end={end}
            setBig={setBig}
            setEnd={setEnd}
            setPage={setPage}
            page={page}
            defaultPage={defaultPage}
            setDefaultPage={setDefaultPage}
            pageValue="tlqp3"
            index="tlquery3"
            localAccend="accendtlq3"
            localPrev="prevtlq3"
            localSorted="sortedValuetlq3"
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
