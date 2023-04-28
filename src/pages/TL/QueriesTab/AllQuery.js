import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import DiscardReport from "../AssignmentTab/DiscardReport";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  ViewDiscussionIcon,
} from "../../../components/Common/MessageIcon";

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
function AllQuery({ setAllQuery }) {
  const classes = useStyles();
  const userid = window.localStorage.getItem("tlkey");

  const [incompleteData, setInCompleteData] = useState([]);
  const [records, setRecords] = useState([]);

  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [scrolledTo, setScrolledTo] = useState("");

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
      localStorage.getItem("accendtlq1") === column.dataField ||
      localStorage.getItem("prevtlq1") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevtlq1", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("accendtlq1") === column.dataField ? (
            <ArrowDropUpIcon
              className={isActive === true ? classes.isActive : ""}
            />
          ) : (
            <ArrowDropDownIcon
              className={isActive === true ? classes.isActive : ""}
            />
          )}
        </div>
      </div>
    );
  }
  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo];
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: "center" });
    }
  }, [ViewDiscussion]);

  const token = window.localStorage.getItem("tlToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key);
    }
  };

  // useEffect(() => {
  //   getInCompleteAssingment();
  // }, []);
  useEffect(() => {
    let localPage = Number(localStorage.getItem("tlqp1"));
    if (!localPage) {
      localPage = 1;
    }
    setAccend(localStorage.getItem("accendtlq1"));
    setPrev(localStorage.getItem("prevtlq1"));

    let sortVal = JSON.parse(localStorage.getItem("sortedValuetlq1"));
    if (!sortVal) {
      let sort = {
        orderBy: 0,
        fieldBy: 0,
      };
      localStorage.setItem("sortedValuetlq1", JSON.stringify(sort));
    }

    setEnd(Number(localStorage.getItem("tl_record_per_page")));
    getInCompleteAssingment(localPage);
  }, []);
  const getInCompleteAssingment = (e) => {
    setPage(e);
    let allEnd = Number(localStorage.getItem("tl_record_per_page"));
    let orderBy = 0;
    let fieldBy = 0;
    let sortVal = JSON.parse(localStorage.getItem("sortedValuetlq1"));
    if (sortVal) {
      orderBy = sortVal.orderBy;
      fieldBy = sortVal.fieldBy;
    }
    let remainApiPath = "";

    let searchData = JSON.parse(localStorage.getItem(`searchDatatlquery1`));
    console.log("searchData", searchData);
    if (searchData) {
      remainApiPath = `/tl/getIncompleteQues?id=${JSON.parse(
        userid
      )}&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}&cat_id=${
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
      remainApiPath = `tl/getIncompleteQues?id=${JSON.parse(
        userid
      )}&page=${e}&orderby=${orderBy}&orderbyfield=${fieldBy}`;
    }
    if (e) {
      axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
        let droppage = [];
        if (res.data.code === 1) {
          let data = res.data.result;
          setAllQuery(res.data.total);

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
        // if (res.data.code === 1) {

        //   setAllQuery(res.data.result.length);
        //   setRecords(res.data.result.length);
        //   setOpen(false);
        // }
      });
    }
  };
  const sortMessage = (val, field) => {
    let sort = {
      orderBy: val,
      fieldBy: field,
    };
    localStorage.setItem("tlqp1", 1);
    localStorage.setItem("sortedValuetlq1", JSON.stringify(sort));

    let searchData = JSON.parse(localStorage.getItem(`searchDatatlquery1`));
    let remainApiPath = "";
    if (searchData) {
      remainApiPath = `/tl/getIncompleteQues?id=${JSON.parse(userid)}&cat_id=${
        searchData.store
      }&from=${searchData.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${searchData.toDate
        ?.split("-")
        .reverse()
        .join("-")}&status=${searchData?.p_status}&pcat_id=${
        searchData.pcatId
      }&qno=${searchData?.query_no}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `/tl/getIncompleteQues?id=${JSON.parse(
        userid
      )}&orderby=${val}&orderbyfield=${field}`;
    }
    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        setPage(1);
        setBig(1);
        setEnd(Number(localStorage.getItem("tl_record_per_page")));
        let all = [];
        let sortId = 1;

        res.data.result.map((i) => {
          let data = {
            ...i,
            cid: sortId,
          };
          sortId++;
          all.push(data);
        });

        setInCompleteData(all);
      }
    });
  };
  const columns = [
    {
      text: "S.no",
      dataField: "cid",
      formatter: (cellContent, row, rowIndex) => {
        return (
          <div
            id={row.assign_no}
            ref={(el) => (myRef.current[row.assign_no] = el)}
          >
            {row.cid}
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtlq1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlq1");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },

      formatter: function (cell, row) {
        let dueDate = row.created.split("-").reverse().join("-");

        return <>{dueDate}</>;
      },
    },
    {
      text: "Query no",
      dataField: "assign_no",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            {/* <Link to={`/teamleader/queries/${row.id}`}>{row.assign_no}</Link> */}
            <Link
              to={{
                pathname: `/teamleader_queries/${row.id}`,
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtlq1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlq1");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 3);
      },
    },
    {
      text: "Sub category",
      dataField: "cat_name",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtlq1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlq1");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 4);
      },
    },
    {
      text: "Client name",
      dataField: "name",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtlq1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlq1");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 5);
      },
    },
    {
      text: "Delivery due date   / Acutal delivery date",
      dataField: "Exp_Delivery_Date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtlq1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlq1");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 6);
      },

      formatter: function dateFormat(cell, row) {
        var oldDate = row.Exp_Delivery_Date;

        if (oldDate == "0000-00-00") {
          return null;
        } else {
          return oldDate.toString().split("-").reverse().join("-");
        }
      },
    },
    {
      text: "Status",
      dataField: "status",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("accendtlq1", field);
        } else {
          setAccend("");
          localStorage.removeItem("accendtlq1");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 7);
      },
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
            {row.status_code == "1" ? null : (
              <div
                style={{
                  display: "flex",
                }}
              >
                {row.status == "Declined Query" ? null : (
                  <Link
                    to={{
                      pathname: `/teamleader_chatting/${row.id}`,
                      index: 0,
                      routes: "queriestab",

                      obj: {
                        message_type: "4",
                        query_No: row.assign_no,
                        query_id: row.id,
                        routes: `/teamleader/queriestab`,
                      },
                    }}
                  >
                    <MessageIcon />
                  </Link>
                )}

                <span
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                  className="ml-2"
                >
                  <ViewDiscussionIcon />
                </span>
              </div>
            )}{" "}
          </>
        );
      },
    },
  ];

  return (
    <>
      {/* <Backdrop
        sx={{
          color: "#000",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <Card>
        <CardHeader>
          <TeamFilter
            setData={setInCompleteData}
            getData={getInCompleteAssingment}
            AllQuery="AllQuery"
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
            pageValue="tlqp1"
            index="tlquery1"
            localAccend="accendtlq1"
            localPrev="prevtlq1"
            localSorted="sortedValuetlq1"
          />
        </CardHeader>
        <CardBody>
          {incompleteData.length > 0 && columns ? (
            <DataTablepopulated
              bgColor="#55425f"
              keyField="id"
              data={incompleteData}
              columns={columns}
            ></DataTablepopulated>
          ) : (
            ""
          )}
        </CardBody>
      </Card>
      <DiscardReport
        ViewDiscussionToggel={ViewDiscussionToggel}
        ViewDiscussion={ViewDiscussion}
        report={assignNo}
        getData={getInCompleteAssingment}
        headColor="#55425f"
      />
    </>
  );
}

export default AllQuery;
