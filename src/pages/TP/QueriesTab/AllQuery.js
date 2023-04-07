import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardBody, Row, Col, } from "reactstrap";
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

function AllQuery(props) {
  const userid = window.localStorage.getItem("tpkey");
  let allEnd = Number(localStorage.getItem("tp_record_per_page"));
  // let total = props.data;
  // console.log(total,"total is that props");
  const [incompleteData, setInCompleteData] = useState([]);
  const [records, setRecords] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

  const [count, setCount] = useState("0");
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(allEnd);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [onPage, setOnPage] = useState(1);
  const [sortVal, setSortVal] = useState('');
  const [sortField, setSortField] = useState('');
  const [accend, setAccend] = useState(false);
  const [resetTrigger, setresetTrigger] = useState(false);

  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key)
    }
  };

  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo]
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: 'center' });
    }
  }, [ViewDiscussion]);

  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  let pageno = JSON.parse(localStorage.getItem("tpQuery1"));

  let pagetry = JSON.parse(localStorage.getItem("freezetpQuery1"));

  useEffect(() => {
    if (pageno) {
      getInCompleteAssingment(pageno);
    } else {
      getInCompleteAssingment(1);
    }
  }, []);

  const getInCompleteAssingment = (e) => {
    let data = JSON.parse(localStorage.getItem("searchDatatpquery1"));
    localStorage.setItem(`tpQuery1`, JSON.stringify(e));
    // let getsort = JSON.parse(localStorage.getItem("freezetpQuery1"));
    console.log(pagetry, "getsort");
    let val = pagetry?.val;
    let field = pagetry?.field;
    console.log(val, "if getsort val");
    console.log(field, "if getsort field");
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);
    let allEnd = Number(localStorage.getItem("tp_record_per_page"));
    if ((data) && (!pagetry)) {
      remainApiPath = `/tl/getIncompleteQues?page=${e}&cat_id=${data.store
        }&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
            ?.split("-")
            .reverse()
            .join("-")}&status=${data?.p_status}&pcat_id=${data.pcatId
        }&qno=${data?.query_no}`;
    }
    else if ((data) && (pagetry)) {
      remainApiPath = `/tl/getIncompleteQues?page=${e}&cat_id=${data.store
        }&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
            ?.split("-")
            .reverse()
            .join("-")}&status=${data?.p_status}&pcat_id=${data.pcatId
        }&qno=${data?.query_no}&orderby=${val}&orderbyfield=${field}`;
    }else if((!data) && (pagetry)){
      remainApiPath = `tl/getIncompleteQues?page=${e}&orderby=${val}&orderbyfield=${field}`
    }
    else {
      remainApiPath = `tl/getIncompleteQues?page=${e}`;
    }
    if (e) {
      axios
        .get(
          `${baseUrl}/${remainApiPath}`,
          myConfig
        )
        .then((res) => {
          let droppage = [];
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
  }

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    let obj = {
      pageno: pageno,
      val: val,
      field: field,
    }
    localStorage.setItem(`freezetpQuery1`, JSON.stringify(obj));
    let data = JSON.parse(localStorage.getItem("searchDatatpquery1"));

    if(data){
      remainApiPath =`tl/getIncompleteQues?page=${onPage}&cat_id=${data.store
      }&from=${data.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${data.toDate
          ?.split("-")
          .reverse()
          .join("-")}&status=${data?.p_status}&pcat_id=${data.pcatId
      }&qno=${data?.query_no}&orderby=${val}&orderbyfield=${field}`
    }else{
      remainApiPath =`tl/getIncompleteQues?page=${onPage}&orderby=${val}&orderbyfield=${field}`
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
          let record =Number(localStorage.getItem("tp_record_per_page"))
          let startAt = ((onPage - 1) * record) +1;
          console.log(onPage,startAt,"sort check");
          if (onPage > 1) {
            sortId = startAt;
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
      text: "S.No",
      dataField: "cid",
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Query date",
      dataField: "created",
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
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
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 2);
      },
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
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

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
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

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
      sort: true,
      onSort: (field, order) => {
        let val = 0;
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
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

        if (accend === true) {
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
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        setAccend(!accend);

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

  // const resetPaging = () => {
  //   setEnd(Number(localStorage.getItem("tp_record_per_page")));
  // };

  const resetTriggerFunc = () => {
    setresetTrigger(!resetTrigger);
    localStorage.removeItem(`freezetpQuery1`);

    // console.log(resetTrigger,"resetTrigger in allQ");
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Row>
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
          </Row>
          <Row>
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

export default AllQuery;
