import React, { useState, useEffect, useRef } from "react";
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
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import History from "../../../components/PendingForAllocation/History";
import Swal from "sweetalert2";
import { useParams, useHistory } from "react-router-dom";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import { ActionIcon } from "../../../components/Common/MessageIcon";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 10px",
  },
}));

function CompletedQuery({ updateTab }) {
  const classes = useStyles();
  const userid = window.localStorage.getItem("tlkey");
  const hist = useHistory();
  const [incompleteData, setInCompleteData] = useState([]);
  const [records, setRecords] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);
  const [countNotification, setCountNotification] = useState("");
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);

  const [accend, setAccend] = useState(false);
  const [prev, setPrev] = useState("");
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const myRef = useRef([]);
  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("accendtlq4") === column.dataField ||
      localStorage.getItem("prevtlq4") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevtlq4", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("accendtlq4") === column.dataField ? (
            <ArrowDropDownIcon
              className={isActive === true ? classes.isActive : ""}
            />
          ) : (
            <ArrowDropUpIcon
              className={isActive === true ? classes.isActive : ""}
            />
          )}
        </div>
      </div>
    );
  }
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
  };
  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  useEffect(() => {
    let localPage = Number(localStorage.getItem("tlqp3"));
    if (!localPage) {
      localPage = 1;
    }
    setAccend(localStorage.getItem("accendtlq3"));
    setPrev(localStorage.getItem("prevtlq3"));

    let sortVal = JSON.parse(localStorage.getItem("sortedValuetlq2"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("sortedValuetlq3", JSON.stringify(sort));
    }

    setEnd(Number(localStorage.getItem("tl_record_per_page")));
    getInCompleteAssingment(localPage);
  }, []);
  const toggle = (key) => {
    console.log("keyyyy", typeof key);
    setModal(!modal);
    if (modal === false) {
      setScrolledTo(key);
    }
    if (typeof key === "string") {
      axios
        .get(
          `${baseUrl}/tl/getQueryHistory?q_id=${key}&uid=${JSON.parse(userid)}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            setHistory(res.data.result);
          }
        });
    }
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo];
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: "center" });
  }, [modal]);

  const getInCompleteAssingment = (e) => {
    let searchData = JSON.parse(localStorage.getItem("searchDatatlquery4"));

    setPage(e);
    let allEnd = Number(localStorage.getItem("tl_record_per_page"));
    let orderBy = 0;
    let fieldBy = 0;
    let sortVal = JSON.parse(localStorage.getItem("sortedValue4"));
    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let remainApiPath = "";

    if (searchData) {
      remainApiPath = `/tl/pendingAllocation?id=${JSON.parse(
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
      remainApiPath = `tl/pendingAllocation?id=${JSON.parse(
        userid
      )}&status=1&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    }
    if (!searchData) {
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
          setInCompleteData(all);
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

      formatter: (cellContent, row, rowIndex) => {
        return (
          <div id={row.id} ref={(el) => (myRef.current[row.id] = el)}>
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
      dataField: "created",
      sort: true,

      formatter: function (cell, row) {
        let dueDate = row?.created?.split("-").reverse().join("-");

        return <>{dueDate}</>;
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
                index: 3,
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
      text: "Status",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.status}/
              {row.status == "Inprogress Query" ? (
                <p className="inprogress">{row.statusdescription}</p>
              ) : row.status == "Declined Query" ? (
                <p className="declined">{row.statusdescription}</p>
              ) : row.status == "Completed Query" ? (
                <p className="completed">{row.statusdescription}</p>
              ) : null}
            </div>
          </>
        );
      },
    },

    {
      text: "Action",

      formatter: function (cell, row) {
        return (
          <>
            {row.statuscode === "0" || row.statuscode === "3" ? (
              <div onClick={() => assignConfirm(row.id, row.assign_no)}>
                <ActionIcon titleName="Assign to tp" />
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <p className="completed">
                  Allocated to {row.tname} on
                  <p>{row.allocation_time}</p>
                </p>
              </div>
            )}
          </>
        );
      },
    },
    {
      text: "History",

      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <button
              type="button"
              class="autoWidthBtn"
              onClick={() => toggle(row.id)}
            >
              History
            </button>
          </>
        );
      },
    },
  ];

  const assignConfirm = (id, assign_number) => {
    Swal.fire({
      title: "Are you sure?",
      text: `do you want to assign ${assign_number} to taxprofessional`,
      type: "warning",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '"#3085d6"',
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, assign it!",
      cancelButtonText: "No",
    }).then(function (result) {
      if (result.value) {
        hist.push(`/teamleader_queryassing/${id}`);
      } else if (result.dismiss == "cancel") {
        axios
          .get(
            `${baseUrl}/tl/workby?uid=${JSON.parse(userid)}&qid=${id}`,
            myConfig
          )
          .then((res) => {
            if (res.data.code === 1) {
              //  hist.push(`/teamleader/proposal`)
              updateTab(3);
              getInCompleteAssingment();
            }
          });
      }
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <TeamFilter
            setData={setInCompleteData}
            getData={getInCompleteAssingment}
            inCompleteQuery="inCompleteQuery"
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
            pageValue="tlqp4"
            index="searchDatatlquery4"
            localAccend="accendtlq4"
            localPrev="prevtlq4"
            localSorted="sortedValuetlq4"
          />
        </CardHeader>
        <CardBody>
          <DataTablepopulated
            bgColor="#6e557b"
            keyField={"assign_no"}
            data={incompleteData}
            columns={columns}
          ></DataTablepopulated>
          <History history={history} toggle={toggle} modal={modal} />
        </CardBody>
      </Card>
    </>
  );
}

export default CompletedQuery;
