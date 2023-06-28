import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import TaxProfessionalFilter from "../../../components/Search-Filter/tpfilter";
import DiscardReport from "../AssignmentTab/DiscardReport";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, {
  ViewDiscussionIcon,
} from "../../../components/Common/MessageIcon";
import Paginator from "../../../components/Paginator/Paginator";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));

function AllQuery(props) {
  const userid = window.localStorage.getItem("tpkey");
  let allEnd = Number(localStorage.getItem("tp_record_per_page"));
  const classes = useStyles();
  // let total = props.data;
  const [incompleteData, setInCompleteData] = useState([]);
  const [records, setRecords] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

  const [count, setCount] = useState("0");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [onPage, setOnPage] = useState(1);
  const [sortVal, setSortVal] = useState("");
  const [sortField, setSortField] = useState("");
  const [accend, setAccend] = useState(false);
  const [resetTrigger, setresetTrigger] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [prev, setPrev] = useState("");

  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key);
    }
  };

  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo];
      runTo.scrollIntoView(false);
      runTo.scrollIntoView({ block: "center" });
    }
  }, [ViewDiscussion]);

  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("tpArrowQuery1") === column.dataField ||
      localStorage.getItem("prevtpq1") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevtpq1", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("tpArrowQuery1") === column.dataField ? (
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

  useEffect(() => {
    let pageno = JSON.parse(localStorage.getItem("tpQuery1"));
    let arrow = localStorage.getItem("tpArrowQuery1");
    let pre = localStorage.getItem("prevtpq1");
    if (pre) {
      setPrev(pre);
    }
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    // let sortVal = JSON.parse(localStorage.getItem("freezetpQuery1"));
    //   if (!sortVal) {
    //     let sort = {
    //       val: 0,
    //       field: 0,
    //     };
    //     localStorage.setItem("freezetpQuery1", JSON.stringify(sort));
    //   }
    if (pageno) {
      getInCompleteAssingment(pageno);
    } else {
      getInCompleteAssingment(1);
    }
  }, []);

  const getInCompleteAssingment = (e) => {
    if (e === undefined) {
      // console.log(e, "e");
      e = 1;
    }
    let data = JSON.parse(localStorage.getItem("searchDatatpquery1"));
    let pagetry = JSON.parse(localStorage.getItem("freezetpQuery1"));
    localStorage.setItem(`tpQuery1`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);
    let allEnd = Number(localStorage.getItem("tp_record_per_page"));
    if (data && !pagetry) {
      remainApiPath = `/tl/getIncompleteQues?page=${e}&cat_id=${
        data.store
      }&from=${data.fromDate?.split("-").reverse().join("-")}&to=${data.toDate
        ?.split("-")
        .reverse()
        .join("-")}&status=${data?.p_status}&pcat_id=${data.pcatId}&qno=${
        data?.query_no
      }`;
    } else if (data && pagetry) {
      remainApiPath = `/tl/getIncompleteQues?page=${e}&cat_id=${
        data.store
      }&from=${data.fromDate?.split("-").reverse().join("-")}&to=${data.toDate
        ?.split("-")
        .reverse()
        .join("-")}&status=${data?.p_status}&pcat_id=${data.pcatId}&qno=${
        data?.query_no
      }&orderby=${val}&orderbyfield=${field}`;
    } else if (!data && pagetry) {
      remainApiPath = `tl/getIncompleteQues?page=${e}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `tl/getIncompleteQues?page=${e}`;
    }
    if (e) {
      axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
        if (res.data.code === 1) {
          let data = res.data.result;
          setRecords(res.data.result.length);
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
    localStorage.setItem(`tpQuery1`, JSON.stringify(1));
    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    };
    localStorage.setItem(`freezetpQuery1`, JSON.stringify(obj));
    let data = JSON.parse(localStorage.getItem("searchDatatpquery1"));

    if (data) {
      remainApiPath = `tl/getIncompleteQues?page=1&tp_id=${JSON.parse(
        userid
      )}&status=${data.p_status}&cat_id=${data.store}&from=${data.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${data.toDate?.split("-").reverse().join("-")}&pcat_id=${
        data.pcatId
      }&qno=${data.query_no}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `tl/getIncompleteQues?page=1&orderby=${val}&orderbyfield=${field}`;
    }

    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        let all = [];
        let sortId = 1;
        // let record =Number(localStorage.getItem("tp_record_per_page"))
        // let startAt = 1;
        // if (onPage > 1) {
        //   sortId = 1;
        // }
        res.data.result.map((i) => {
          let data = {
            ...i,
            cid: sortId,
          };
          sortId++;
          all.push(data);
        });
        setInCompleteData(all);
        setTurnGreen(true);
        setresetTrigger(!resetTrigger);
      }
    });
  };

  const columns = [
    {
      text: "S.No",
      dataField: "",
      headerStyle: () => {
        return { width: "50px" };
      },
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
          setIsActive(field);
          localStorage.setItem("tpArrowQuery1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowQuery1");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },
      formatter: function dateFormat(cell, row) {
        var oldDate = row.created;
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
                pathname: `/taxprofessional_queries/${row.id}`,
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
          setIsActive(field);
          localStorage.setItem("tpArrowQuery1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowQuery1");
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
          setIsActive(field);
          localStorage.setItem("tpArrowQuery1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowQuery1");
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
      text: "Delivery due date / Actual delivery date",
      dataField: "Exp_Delivery_Date",
      headerFormatter: headerLabelFormatter,
      sort: true,
      headerStyle: () => {
        return { width: "275px" };
      },
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowQuery1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowQuery1");
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
      dataField: "Status",
      sort: true,
      headerFormatter: headerLabelFormatter,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowQuery1", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowQuery1");
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
      dataField: "",

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
                      pathname: `/taxprofessional_chatting/${row.id}`,
                      index: 0,
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

  const resetTriggerFunc = () => {
    setresetTrigger(!resetTrigger);
    setAccend("");
    localStorage.removeItem("tpQuery1");
    localStorage.removeItem(`freezetpQuery1`);
    localStorage.removeItem("tpArrowQuery1");
    localStorage.removeItem("prevtpq1");
    setPrev("");
    setTurnGreen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <TaxProfessionalFilter
            setData={setInCompleteData}
            getData={getInCompleteAssingment}
            AllQuery="AllQuery"
            setRecords={setRecords}
            records={records}
            index="tpquery1"
            // resetPaging={resetPaging}
            resetTriggerFunc={resetTriggerFunc}
            setCount={setCount}
          />
        </CardHeader>

        <CardBody>
          <Row className="mb-2">
            <Col md="12" align="right">
              <Paginator
                count={count}
                setData={setInCompleteData}
                getData={getInCompleteAssingment}
                AllQuery="AllQuery"
                // setRecords={setRecords}
                records={records}
                index="tpquery1"
                setOnPage={setOnPage}
                // resetPaging={resetPaging}
                resetTrigger={resetTrigger}
                setresetTrigger={setresetTrigger}
              />
            </Col>
          </Row>
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

export default AllQuery;
