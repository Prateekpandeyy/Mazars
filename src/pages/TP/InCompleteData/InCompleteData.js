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
import TaxProfessionalFilter from "../../../components/Search-Filter/tpfilter";
import DiscardReport from "../AssignmentTab/DiscardReport";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  ViewDiscussionIcon,
} from "../../../components/Common/MessageIcon";
import Paginator from "../../../components/Paginator/Paginator";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function InCompleteData({ CountIncomplete, data }) {
  const userid = window.localStorage.getItem("tpkey");
  let total = Number(data.recordcount);
  // console.log(total,"total at incomQ");
  let allEnd = Number(localStorage.getItem("tp_record_per_page"));




  const [incompleteData, setInCompleteData] = useState([]);
  const [records, setRecords] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [accend, setAccend] = useState(false);

  const [count, setCount] = useState("0");
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState('');
  const [resetTrigger, setresetTrigger] = useState(false);

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key)
    }
  };

  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  function headerLabelFormatter(column) {
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        {column.text}
        {accend === column.dataField ? (
          <ArrowDownwardIcon />
        ) : (
          <ArrowUpwardIcon />
        )}
      </div>
    );
  }

  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo]
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: 'center' });
    }
  }, [ViewDiscussion]);


  useEffect(() => {
    let pageno = JSON.parse(localStorage.getItem("tpQuery3"));
    let arrow= localStorage.getItem("tpArrowQuery3")
    if(arrow){
      setAccend(arrow);
    }
    if (!pageno) {
      pageno = 1;
    }
    getInCompleteAssingment(pageno);
  }, []);


  const getInCompleteAssingment = (e) => {
    let data = JSON.parse(localStorage.getItem("searchDatatpquery3"));
    let pagetry = JSON.parse(localStorage.getItem("freezetpQuery3"));
    localStorage.setItem(`tpQuery3`, JSON.stringify(e));
    setLoading(true);
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setLoading(true);
    if ((data) && (!pagetry)) {
      remainApiPath = `tl/getIncompleteQues?page=${e}&tp_id=${JSON.parse(
        userid
    )}&status=${data.p_status}&cat_id=${data.store}&from=${data.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${data.toDate
            ?.split("-")
            .reverse()
            .join("-")}&pcat_id=${data.pcatId}&qno=${data.query_no}`;
    }
    else if ((data) && (pagetry)) {
      remainApiPath = `tl/getIncompleteQues?page=${e}&tp_id=${JSON.parse(
        userid
    )}&status=${data.p_status}&cat_id=${data.store}&from=${data.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${data.toDate
            ?.split("-")
            .reverse()
            .join("-")}&pcat_id=${data.pcatId}&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`
    }
    else if ((!data) && (pagetry)) {
      remainApiPath = `tl/getIncompleteQues?tp_id=${JSON.parse(
        userid
      )}&page=${e}&orderby=${val}&orderbyfield=${field}&status=1`;
    }
    else {
      remainApiPath = `tl/getIncompleteQues?tp_id=${JSON.parse(
        userid
      )}&page=${e}&status=1`;
    }
    if (e) {
      axios
        .get(
          `${baseUrl}/${remainApiPath}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            let data = res.data.result;
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
            setCount(res.data.total);
          }
        });
    }
  };

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    let obj = {
      // pageno: onPage,
      val: val,
      field: field,
    }
    localStorage.setItem(`freezetpQuery3`, JSON.stringify(obj));
    let data = JSON.parse(localStorage.getItem("searchDatatpquery3"));
    setresetTrigger(!resetTrigger);

    if(data){
      remainApiPath = `tl/getIncompleteQues?page=1&cat_id=${data.store
      }&from=${data.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=${data.p_status}&pcat_id=${data.pcatId
      }&qno=${data?.query_no}&orderby=${val}&orderbyfield=${field}`;
    }else{
      remainApiPath = `tl/getIncompleteQues?page=1&orderby=${val}&orderbyfield=${field}`
    }

    axios
      .get(
        `${baseUrl}/${remainApiPath}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let all = [];
          let sortId = 1;
          // let record = Number(localStorage.getItem("tp_record_per_page"))
          // let startAt = ((onPage - 1) * record) + 1;
          // console.log(onPage,startAt,"sort check");
          if (onPage > 1) {
            sortId = 1;
          }
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
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Query date",
      dataField: "created",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          console.log("This is sorting 1");
          localStorage.setItem("tpArrowQuery3", field);
        } else {
          setAccend("");
          console.log("This is sorting 2");
          localStorage.removeItem("tpArrowQuery3");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },
    },
    {
      text: "Query no",
      // dataField: "assign_no",
      headerFormatter: headerLabelFormatter,
      // sort: true,
      // onSort: (field, order) => {
      //   let val = 0;
      //   if (accend !== field) {
      //     setAccend(field);
      //     console.log("This is sorting 1");
      //     localStorage.setItem("tpArrowQuery3", field);
      //   } else {
      //     setAccend("");
      //     console.log("This is sorting 2");
      //     localStorage.removeItem("tpArrowQuery3");
      //   }

      //   if (accend === field) {
      //     val = 0;
      //   } else {
      //     val = 1;
      //   }
      //   sortMessage(val, 2);
      // },

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/taxprofessional_queries/${row.id}`,
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
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          console.log("This is sorting 1");
          localStorage.setItem("tpArrowQuery3", field);
        } else {
          setAccend("");
          console.log("This is sorting 2");
          localStorage.removeItem("tpArrowQuery3");
        }

        if (accend === true) {
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
          console.log("This is sorting 1");
          localStorage.setItem("tpArrowQuery3", field);
        } else {
          setAccend("");
          console.log("This is sorting 2");
          localStorage.removeItem("tpArrowQuery3");
        }

        if (accend === true) {
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
          console.log("This is sorting 1");
          localStorage.setItem("tpArrowQuery3", field);
        } else {
          setAccend("");
          console.log("This is sorting 2");
          localStorage.removeItem("tpArrowQuery3");
        }
        if (order === "asc") {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 5);
      },
    },
    {
      text: "Delivery due date / Actual delivery date",
      dataField: "Exp_Delivery_Date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("tpArrowQuery1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowQuery1");
        }

        if (accend === true) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 6);
      },

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
      dataField: "Status",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          localStorage.setItem("tpArrowQuery1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowQuery1");
        }

        if (accend === true) {
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
              {row.status}
              {row.statusdescription && "/"}
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
            {row.tp_status == "1" ? null : (
              <div
                style={{
                  display: "flex",
                }}
              >
                {row.status == "Declined Query" ? null : (
                  <Link
                    to={{
                      pathname: `/taxprofessional_chatting/${row.id}`,
                      index: 2,
                      routes: "queriestab",
                      obj: {
                        message_type: "4",
                        query_No: row.assign_no,
                        query_id: row.id,
                        routes: `/taxprofessional/queriestab`,
                      },
                    }}
                  >
                    <MessageIcon />
                  </Link>
                )}

                <div
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                  className="ml-1"
                >
                  <ViewDiscussionIcon />
                </div>
              </div>
            )}
          </>
        );
      },
    },
  ];

  const resetTriggerFunc = () => {
    setresetTrigger(!resetTrigger);
    localStorage.removeItem("tpQuery3");
    localStorage.removeItem(`freezetpQuery3`);
    localStorage.removeItem("tpArrowQuery3");
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <TaxProfessionalFilter
              setData={setInCompleteData}
              getData={getInCompleteAssingment}
              InprogressQuery="InprogressQuery"
              setRecords={setRecords}
              records={records}
              index="tpquery3"
              resetTriggerFunc={resetTriggerFunc}
              setCount={setCount}
            />
          </Row>
          <Row>
            <Col md="12" align="right">
              <Paginator
                count={count}
                setData={setInCompleteData}
                getData={getInCompleteAssingment}
                InprogressQuery="InprogressQuery"
                records={records}
                index="tpquery3"
                setOnPage={setOnPage}
                resetTrigger={resetTrigger}
                setresetTrigger={setresetTrigger}
              />
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <DataTablepopulated
            bgColor="#55425f"
            keyField={"assign_no"}
            data={incompleteData}
            columns={columns}
          ></DataTablepopulated>
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getInCompleteAssingment}
            headColor="#55425f"
          />
        </CardBody>
      </Card>
    </>
  );
}

export default InCompleteData;
