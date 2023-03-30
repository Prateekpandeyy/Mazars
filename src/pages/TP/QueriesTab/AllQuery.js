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

function AllQuery(props) {
  const userid = window.localStorage.getItem("tpkey");
  let total = props.data;
  const [incompleteData, setInCompleteData] = useState([]);
  const [records, setRecords] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);

  const [count, setCount] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [accend, setAccend] = useState(false);
  const [defaultPage, setDefaultPage] = useState(["1"]);

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

  useEffect(() => {
    setPage(1);
    setEnd(
      Number(localStorage.getItem("tp_record_per_page"))
    );
    setAtpage(1);
    setCount(props.data)

  }, []);
  useEffect(() => {
    setCount(total)
    getInCompleteAssingment(1);
  }, [props]);

  //page counter
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getInCompleteAssingment(1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getInCompleteAssingment(Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    getInCompleteAssingment(Number(page) + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getInCompleteAssingment(defaultPage.at(-1));
    setAtpage(totalPages);
  };

  const getInCompleteAssingment = (e) => {
    let data = JSON.parse(localStorage.getItem("searchDatatpquery1"));
    let remainApiPath = "";
    setLoading(true);
    let allEnd = Number(localStorage.getItem("tp_record_per_page"));
    if (data) {
      remainApiPath = `/tl/getIncompleteQues?page=${e}&cat_id=${data.store
        }&from=${data.fromDate
          ?.split("-")
          .reverse()
          .join("-")}&to=${data.toDate
            ?.split("-")
            .reverse()
            .join("-")}&status=${data?.p_status}&pcat_id=${data.pcatId
        }&qno=${data?.query_no}`;
    } else {
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
            console.log(customId);
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
            setCount(props.data)

            const dynamicPage = Math.ceil(props.data / allEnd);
            setTotalPages(dynamicPage + 1)
            let rem = (e - 1) * allEnd;
            let end = e * allEnd;
            if (e === 1) {
              setBig(rem + e);
              setEnd(end);
            } else if (e === (dynamicPage + 1)) {
              setBig(rem + 1);
              setEnd(res.data.total);
            } else {
              setBig(rem + 1);
              setEnd(end);
            }
            for (let i = 1; i < (dynamicPage + 1); i++) {
              droppage.push(i);
            }
            setDefaultPage(droppage);
          }
        });
    }
  }



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
  const resetPaging = () => {
    console.log("reset");
    setPage(1);
    setEnd(Number(localStorage.getItem("admin_record_per_page")));
  };

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
              resetPaging={resetPaging}
              setCount={setCount}
            />
          </Row>
          <Row>
            <Col md="12" align="right">
              <div className="customPagination">
                <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                  <span style={{ "width": "40%" }}>
                    {big}-{end} of {count}
                  </span>
                  <span className="d-flex">
                    <button
                      className="navButton"
                      onClick={(e) => firstChunk()}
                    >
                      &lt; &lt;
                    </button>

                    {page > 1 ? (
                      <button
                        className="navButton"
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
                        maxWidth: "75px",
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
                        style={{ "paddingLeft": "0px", "paddingRight": "0px" }}
                      >
                        {defaultPage.map((i) => (
                          <option value={i} style={{ "textAlign": "center" }}>{i}</option>
                        ))}
                      </select>
                    </div>
                    {defaultPage.length > page ? (
                      <button
                        className="navButton"
                        onClick={(e) => nextChunk()}
                      >
                        &gt;
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      className="navButton"
                      onClick={(e) => lastChunk()}
                    >
                      &gt; &gt;
                    </button>
                  </span>
                </div>
              </div>
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
