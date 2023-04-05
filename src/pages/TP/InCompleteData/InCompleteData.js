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

function InCompleteData({ CountIncomplete, data }) {
  const userid = window.localStorage.getItem("tpkey");
  let total = Number(data.recordcount);
  // console.log(total,"total at incomQ");
  let allEnd = Number(localStorage.getItem("tp_record_per_page"));
  let pageno = JSON.parse(localStorage.getItem("tpQuery3"));
  
  const [incompleteData, setInCompleteData] = useState([]);
  const [records, setRecords] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [accend, setAccend] = useState(false);

  const [count, setCount] = useState("0");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(allEnd);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [resetTrigger,setresetTrigger]=useState(false);
  const [defaultPage, setDefaultPage] = useState(["1"]);

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key)
    }
  };

// console.log(count,"count in incompQ begin");

  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  

  // useEffect(() => {
  //   setPage(1);
  //   setEnd(
  //     Number(localStorage.getItem("tp_record_per_page"))
  //   );
  //   setAtpage(1);
  // }, []);

  // useEffect(() => {
  //   setCount(total)
  // }, [total]);


  useEffect(() => {
    var element = document.getElementById(scrolledTo);
    if (element) {
      let runTo = myRef.current[scrolledTo]
      runTo?.scrollIntoView(false);
      runTo?.scrollIntoView({ block: 'center' });
    }
  }, [ViewDiscussion]);


  useEffect(() => {
    //   setCount(total)
    // let data = JSON.parse(localStorage.getItem("searchDatatpquery3"));
    if (!pageno) {
      pageno = 1;
    }
      getInCompleteAssingment(pageno);
      // setPage(pageno);
      // console.log("getting useEfect incomp");
  }, []);


  //page counter
  // const firstChunk = () => {
  //   setAtpage(1);
  //   setPage(1);
  //   getInCompleteAssingment(1);
  // };
  // const prevChunk = () => {
  //   if (atPage > 1) {
  //     setAtpage((atPage) => atPage - 1);
  //   }
  //   setPage(Number(page) - 1);
  //   getInCompleteAssingment(Number(page) - 1);
  // };
  // const nextChunk = () => {
  //   if (atPage < totalPages) {
  //     setAtpage((atPage) => atPage + 1);
  //   }
  //   setPage(Number(page) + 1);
  //   getInCompleteAssingment(Number(page) + 1);
  // };
  // const lastChunk = () => {
  //   setPage(defaultPage.at(-1));
  //   getInCompleteAssingment(defaultPage.at(-1));
  //   setAtpage(totalPages);
  // };

  const getInCompleteAssingment = (e) => {
    let data = JSON.parse(localStorage.getItem("searchDatatpquery3"));
    localStorage.setItem(`tpQuery3`, JSON.stringify(e));
    setLoading(true);
    
    let remainApiPath = "";
    setLoading(true);
    if (data) {
      remainApiPath = `/tl/getIncompleteQues?page=${e}&cat_id=${data.store
        }&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
            ?.split("-")
            .reverse()
            .join("-")}&status=1&pcat_id=${data.pcatId
        }&qno=${data?.query_no}`;
    } else {
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
          // let droppage = [];
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
            // console.log(res.data.total,"total in setCount response");
            // console.log(count,"count in submit");
            // const dynamicPage = Math.ceil(count / allEnd);
            // console.log(dynamicPage,"dynamic in submit");
            // setTotalPages(dynamicPage)
            // let rem = (e - 1) * allEnd;
            // let end = e * allEnd;
            // if (e === 1) {
            //   setBig(rem + e);
            //   setEnd(allEnd);
            // } 
            // else if (e === (dynamicPage)) {
            //   setBig(rem + 1);
            //   setEnd(res.data.total);
            // } 
            // else {
            //   setBig(rem + 1);
            //   setEnd(end);
            // }
            // for (let i = 1; i <= dynamicPage; i++) {
            //   droppage.push(i);
            // }
            // setDefaultPage(droppage);
          }
        });
    }
  };

  const sortMessage = (val, field) => {
    axios
      .get(
        `${baseUrl}/tl/getIncompleteQues?orderby=${val}&orderbyfield=${field}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let all = [];
          let sortId = 1;
          if (page > 1) {
            sortId = big;
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
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
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

  // const resetPaging = () => {
  //   console.log("reset");
  //   setPage(1);
  //   setEnd(Number(localStorage.getItem("admin_record_per_page")));
  // };
  const resetTriggerFunc = () => {
    setresetTrigger(!resetTrigger)
    // console.log(resetTrigger,"resetTrigger in incompQ");
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
              // resetPaging={resetPaging}
              resetTriggerFunc={resetTriggerFunc}
              setCount={setCount}
            />
          </Row>
          {/* <Row>
            <Col md="12" align="right">
              <div className="customPagination">
                <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                  <span>
                    {big}-{end} of {count}
                  </span>
                  <span className="d-flex">
                    <button
                      className="navButton mx-1"
                      onClick={(e) => firstChunk()}
                    >
                      &lt; &lt;
                    </button>

                    {page > 1 ? (
                      <button
                        className="navButton mx-1"
                        onClick={(e) => prevChunk()}
                      >
                        &lt;
                      </button>
                    ) : (
                      ""
                    )}
                    <div
                      style={{
                        display: "flex",
                        maxWidth: "70px",
                        width: "100%",
                      }}
                    >
                      <select
                        value={page}
                        onChange={(e) => {
                          setPage(e.target.value);
                          getInCompleteAssingment(e.target.value);
                        }}
                        className="form-control"
                      >
                        {defaultPage.map((i) => (
                          <option value={i}>{i}</option>
                        ))}
                      </select>
                    </div>
                    {defaultPage.length > page ? (
                      <button
                        className="navButton mx-1"
                        onClick={(e) => nextChunk()}
                      >
                        &gt;
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      className="navButton mx-1"
                      onClick={(e) => lastChunk()}
                    >
                      &gt; &gt;
                    </button>
                  </span>
                </div>
              </div>
            </Col>
          </Row> */}
          <Row>
            <Col md="12" align="right">
              <Paginator 
                count={count}
                setData={setInCompleteData}
                getData={getInCompleteAssingment}
                InprogressQuery="InprogressQuery"
                // setRecords={setRecords}
                records={records}
                index="tpquery3"
                resetTrigger={resetTrigger}
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
