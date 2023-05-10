import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardBody, Row, Col, Table } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/config";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import Swal from "sweetalert2";
import Records from "../../components/Records/Records";
import AdditionalQueryModal from "./AdditionalQueryModal";
import CommonServices from "../../common/common";
import DiscardReport from "../AssignmentTab/DiscardReport";
import RejectedModal from "./RejectedModal";
import ModalManual from "../ModalManual/AllComponentManual";
import MessageIcon, {
  DeleteIcon,
  EditQuery,
  ViewDiscussionIcon,
  HelpIcon,
  UploadDocument,
  FeedBackICon,
} from "../../components/Common/MessageIcon";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
import PaginatorCust from "../../components/Paginator/PaginatorCust";

function AllQueriesData({
  allQueriesCount,
  setAllQueriesCount,
  // CountAllQuery,
}) {
  const userId = window.localStorage.getItem("userid");
  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  const [assignNo2, setAssignNo2] = useState();
  const [records, setRecords] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [additionalQuery, setAdditionalQuery] = useState(false);
  const [rejectedBox, showRejectedBox] = useState(false);
  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [openManual, setManual] = useState(false);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);
  const tableId = React.createRef("");

  // const allEnd = Number(localStorage.getItem("tl_record_per_page"));
  // const classes = useStyles();
  const allEnd = 50;
  const [count, setCount] = useState(0);
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState('');
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [prev, setPrev] = useState("");


  let des = false;
  const additionalHandler = (key) => {
    if (typeof key == "object") {
      setAdditionalQuery(!additionalQuery);
      des = true;
      setLoading2(false);
      return false;
      console.log("1");
    } else {
      setAdditionalQuery(!additionalQuery);
      setAssignNo(key);
      console.log("2");
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
  }, [additionalQuery]);

  const ViewDiscussionToggel = (key) => {
    // console.log(tableId);
    // document.getElementById("root").scrollIntoView(false);
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

  const needHelp = () => {
    setManual(!openManual);
  };

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem(`searchDatacustQuery1`));
    let pageno = JSON.parse(localStorage.getItem("custQuery1"));
    let arrow = localStorage.getItem("custArrowQuery1")
    let pre =localStorage.getItem("prevcustq1")
    if(pre){
      setPrev(pre);
    }
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    // if (!local) {
      if (pageno) {
        CountAllQuery(pageno);
      } else {
        CountAllQuery(1);
      }
    // }
  }, []);

  const CountAllQuery = (e) => {
    let data = JSON.parse(localStorage.getItem("searchDatacustQuery1"));
    let pagetry = JSON.parse(localStorage.getItem("freezecustQuery1"));
    localStorage.setItem(`custQuery1`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);
    if ((data) && (!pagetry)){
      remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
        }&status=${data.p_status}&pcat_id=${data.pcatId}`
    }else if ((data) && (pagetry)){
      remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
        }&status=${data.p_status}&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`
    }else if ((!data) && (pagetry)){
      remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(userId)}&orderby=${val}&orderbyfield=${field}`
    }else{
      remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(userId)}`
    }

    axios
      .get(
        `${baseUrl}/${remainApiPath}`,
        myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let all = [];
          let customId = 1;
          if (e > 1) {
            customId = allEnd * (e - 1) + 1;
          }
          let data = res.data.result;
          data.map((i) => {
            let data = {
              ...i,
              cid: customId,
            };
            customId++;
            all.push(data);
          });
          setAllQueriesCount(all);
          setCount(res.data.total);
        }
      });
  };

  const columns = [
    {
      text: "S.No",

      formatter: (cellContent, row, rowIndex) => {
        return <div id={row.assign_no}
          ref={el => (myRef.current[row.assign_no] = el)}>{row.cid}</div>;
      },
      headerStyle: () => {
        return {
          width: "50px",
        };
      },
    },
    {
      text: "Date",
      dataField: "created",
      sort: true,

      formatter: function dateFormatter(cell, row) {
        return <>{CommonServices.changeFormateDate(row.created)}</>;
      },
    },
    {
      text: "Query No",
      dataField: "assign_no",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/customer_my-assingment/${row.id}`,
                index: 0,
                routes: "queries",
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
      text: "Status",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.status}/
              {row.status == "Inprogress Query" ? (
                <p className="inprogress">{row.status_message}</p>
              ) : row.status == "Declined Query" ? (
                <p className="declined">{row.status_message}</p>
              ) : row.status == "Completed Query" ? (
                <p className="completed">{row.status_message}</p>
              ) : null}
            </div>
          </>
        );
      },
    },
    {
      text: "Expected / Actual delivery date",
      dataField: "exp_delivery_date",
      sort: true,

      formatter: function dateFormat(cell, row) {
        return (
          <>
            {row.status == "Declined Query" ? null : row.status_code != "3" &&
              row.status_code > "1" ? (
              <>
                {row.final_discussion === "completed"
                  ? CommonServices.removeTime(row.final_date)
                  : CommonServices.removeTime(row.exp_delivery_date)}
              </>
            ) : null}
          </>
        );
      },
    },
    {
      text: "Action",

      formatter: function (cell, row) {
        var dateMnsFive = moment(row.exp_delivery_date)
          .add(15, "day")
          .format("YYYY-MM-DD");

        var curDate = moment().format("YYYY-MM-DD");

        return (
          <>
            {row.status == "Declined Query" ? (
              <>
                {dateMnsFive > curDate === true ? (
                  <span className="ml-1">
                    <Link
                      to={{
                        pathname: `/customer_feedback/${row.assign_no}`,
                        index: 0,
                        routes: "queries",
                      }}
                    >
                      <FeedBackICon />
                    </Link>
                  </span>
                ) : (
                  ""
                )}

                <span
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                  className="ml-1"
                >
                  <ViewDiscussionIcon />
                </span>
              </>
            ) : (
              <>
                {row.status_code == "0" ||
                  row.status_code == "1" ||
                  row.status_code == "3" ? (
                  <>
                    <span className="ml-1">
                      <Link to={`/customer_edit-query/${row.id}`}>
                        <EditQuery />
                      </Link>
                    </span>

                    <span onClick={() => del(row.id)} className="ml-2">
                      <DeleteIcon />
                    </span>
                    <span className="ml-1">
                      <Link
                        to={{
                          pathname: `/customer_chatting/${row.id}&type=4`,
                          index: 0,
                          routes: "queries",
                          obj: {
                            message_type: "4",
                            query_No: row.assign_no,
                            query_id: row.id,
                            routes: `/customer/queries`,
                          },
                        }}
                      >
                        <MessageIcon />
                      </Link>
                    </span>
                    <span
                      onClick={() => ViewDiscussionToggel(row.assign_no)}
                      className="ml-2"
                    >
                      <ViewDiscussionIcon />
                    </span>
                  </>
                ) : null}

                {row.status_code == "4" ||
                  8 < parseInt(row.status_code) ||
                  row.status_code == "2" ? (
                  <>
                    {dateMnsFive > curDate === true ? (
                      <span className="ml-1">
                        <Link
                          to={{
                            pathname: `/customer_feedback/${row.assign_no}`,
                            index: 0,
                            routes: "queries",
                          }}
                        >
                          <FeedBackICon />
                        </Link>
                      </span>
                    ) : (
                      ""
                    )}
                    {row.delivery_report == "completed" ? null : (
                      <span
                        className="ml-1"
                        onClick={() => additionalHandler(row.assign_no)}
                      >
                        <UploadDocument />
                      </span>
                    )}
                    {row.status_code == "10" ? null : (
                      <span className="ml-1">
                        <Link
                          to={{
                            pathname: `/customer_chatting/${row.id}&type=4`,
                            index: 0,
                            routes: "queries",
                            obj: {
                              message_type: "4",
                              query_No: row.assign_no,
                              query_id: row.id,
                              routes: `/customer/queries`,
                            },
                          }}
                        >
                          <MessageIcon />
                        </Link>
                      </span>
                    )}
                    <span
                      onClick={() => ViewDiscussionToggel(row.assign_no)}
                      className="ml-1"
                    >
                      <ViewDiscussionIcon />
                    </span>
                  </>
                ) : null}
              </>
            )}
          </>
        );
      },
    },
  ];

  //check
  const del = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Want to delete query?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteCliente(id);
      }
    });
  };

  const deleteCliente = (id) => {
    // setLoading(true)
    setAssignNo2(id);
    showRejectedBox(!rejectedBox);
  };

  const resetTriggerFunc = () => {
    setresetTrigger(!resetTrigger);
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem("custQuery1");
    localStorage.removeItem(`freezecustQuery1`);
    localStorage.removeItem("custArrowQuery1");
    localStorage.removeItem("prevcustQuery1");
    setPrev("");
  }


  return (
    <Card ref={tableId}>
      <CardHeader>
        <span onClick={(e) => needHelp()}>
          {" "}
          <HelpIcon />
        </span>
        <CustomerFilter
          setData={setAllQueriesCount}
          getData={CountAllQuery}
          id={userId}
          query="query"
          records={allQueriesCount.length}
          setRecords={setRecords}
          index="custQuery1"
          resetTriggerFunc={resetTriggerFunc}
          setCount={setCount}
        />
      </CardHeader>
      <CardBody>
        {/* <Row>
          <Col md="3"></Col>
          <Col md="9">
            <Records records={allQueriesCount.length} />
          </Col>
        </Row> */}
        <Row className="mb-2">
          <Col md="12" align="right">
            <PaginatorCust
              count={count}
              id={userId}
              setData={setAllQueriesCount}
              getData={CountAllQuery}
              index="custQuery1"
              query="query"
              setOnPage={setOnPage}
              resetTrigger={resetTrigger}
              setresetTrigger={setresetTrigger}
            />
          </Col>
        </Row>
        <DataTablepopulated
          bgColor="#55425f"
          keyField={"assign_no"}
          data={allQueriesCount}
          columns={columns}
        ></DataTablepopulated>

        <AdditionalQueryModal
          additionalHandler={additionalHandler}
          additionalQuery={additionalQuery}
          assignNo={assignNo}
          getQueriesData={CountAllQuery}
          setLoading2={setLoading2}
          loading2={loading2}
          des={des}
        />
        {ViewDiscussion === true ? (
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={CountAllQuery}
            headColor="#55425f"
          />
        ) : (
          ""
        )}

        <RejectedModal
          showRejectedBox={showRejectedBox}
          rejectedBox={rejectedBox}
          getQueriesData={CountAllQuery}
          assignNo={assignNo2}
          deleteCliente={deleteCliente}
        />
        <Modal isOpen={openManual} toggle={needHelp} size="lg">
          <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
          <ModalBody>
            <ModalManual tar={"freshQuery"} />
          </ModalBody>
        </Modal>
      </CardBody>
    </Card>
  );
}

export default AllQueriesData;
