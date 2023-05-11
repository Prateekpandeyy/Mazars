import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import Records from "../../components/Records/Records";
import CommonServices from "../../common/common";
import DiscardReport from "../AssignmentTab/DiscardReport";
import moment from "moment";
import axios from "axios";
import { baseUrl } from "../../config/config";
import ModalManual from "../ModalManual/AllComponentManual";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import MessageIcon, {
  ViewDiscussionIcon,
  HelpIcon,
  FeedBackICon,
} from "../../components/Common/MessageIcon";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
import PaginatorCust from "../../components/Paginator/PaginatorCust";

function DeclinedQueries({
  allQueriesCount,
  setAllQueriesCount,
  CountAllQuery,
}) {
  const userId = window.localStorage.getItem("userid");
  const token = window.localStorage.getItem("clientToken");


  const [assignNo, setAssignNo] = useState("");
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [records, setRecords] = useState([]);
  const [openManual, setManual] = useState(false);
  const [scrolledTo, setScrolledTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [declined, setDeclined] = useState([]);
  const myRef = useRef([]);
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  // const allEnd = Number(localStorage.getItem("tl_record_per_page"));
  const allEnd = 50;
  const [count, setCount] = useState(0);
  const [onPage, setOnPage] = useState(1);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState('');
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [prev, setPrev] = useState("");

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key)
      console.log(key, 'set');
    }
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo]
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: 'center' });
    console.log("object");
  }, [ViewDiscussion]);

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem(`searchDatacustQuery4`));
    let pageno = JSON.parse(localStorage.getItem("custQuery4"));
    let arrow = localStorage.getItem("custArrowQuery4")
    let pre =localStorage.getItem("prevcustq4")
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
        CountDeclined(pageno);
      } else {
        CountDeclined(1);
      }
    // }
  }, []);

  const CountDeclined = (e) => {
    if ((e === undefined)) {
      console.log(e,'e');
      e=1;
    }
    let data = JSON.parse(localStorage.getItem("searchDatacustQuery4"));
    let pagetry = JSON.parse(localStorage.getItem("freezecustQuery4"));
    localStorage.setItem(`custQuery1`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);
    if ((data) && (!pagetry)){
      remainApiPath = `customers/declinedQueries?page=${e}&uid=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
        }&pcat_id=${data.pcatId}&status=${data.p_status}`
    }else if ((data) && (pagetry)){
      remainApiPath = `customers/declinedQueries?page=${e}&uid=${JSON.parse(
        userId
      )}&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
        }&pcat_id=${data.pcatId}&status=${data.p_status}&orderby=${val}&orderbyfield=${field}`
    }else if ((!data) && (pagetry)){
      remainApiPath = `customers/declinedQueries?page=${e}&uid=${JSON.parse(userId)}&orderby=${val}&orderbyfield=${field}`
    }else{
      remainApiPath = `customers/declinedQueries?page=${e}&uid=${JSON.parse(userId)}`
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
          setDeclined(all);
          setCount(res.data.total);
          setLoading(true);
        }
      });
  };

  const needHelp = () => {
    setManual(!openManual);
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

      formatter: function dateFormat(cell, row) {
        var oldDate = row.created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
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
                index: 3,
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
      text: "Sub Category",
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
      text: "Expected Delivery Date",
      dataField: "exp_delivery_date",
      sort: true,

      formatter: function dateFormat(cell, row) {
        return (
          <>
            {row.status == "Declined Query"
              ? null
              : row.status_code >= "1"
                ? CommonServices.removeTime(row.exp_delivery_date)
                : null}
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
                <>
                  {dateMnsFive > curDate === true ? (
                    <span className="ml-2">
                      <Link
                        to={{
                          pathname: `/customer_feedback/${row.assign_no}`,
                          index: 3,
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
                    className="ml-2"
                  >
                    <ViewDiscussionIcon />
                  </span>
                </>
              </>
            ) : (
              <>
                {row.status_code == "0" ||
                  row.status_code == "1" ||
                  row.status_code == "3" ? (
                  <>
                    <span className="ml-2">
                      <Link
                        to={{
                          pathname: `/customer_chatting/${row.id}&type=4`,
                          index: 3,
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
                      <span className="ml-2">
                        <Link
                          to={{
                            pathname: `/customer_feedback/${row.assign_no}`,
                            index: 3,
                            routes: "queries",
                          }}
                        >
                          <FeedBackICon />
                        </Link>
                      </span>
                    ) : (
                      ""
                    )}

                    {row.status_code == "10" ? null : (
                      <span className="ml-2">
                        <Link
                          to={{
                            pathname: `/customer_chatting/${row.id}&type=4`,
                            index: 2,
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
                      className="ml-2"
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

  const resetTriggerFunc = () => {
    setresetTrigger(!resetTrigger);
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem("custQuery4");
    localStorage.removeItem(`freezecustQuery4`);
    localStorage.removeItem("custArrowQuery4");
    localStorage.removeItem("prevcustQuery4");
    setPrev("");
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <span onClick={(e) => needHelp()}>
            {" "}
            <HelpIcon />
          </span>
          <CustomerFilter
            setData={setDeclined}
            getData={CountDeclined}
            id={userId}
            DeclinedQuery="DeclinedQuery"
            records={declined.length}
            index="custQuery4"
            resetTriggerFunc={resetTriggerFunc}
            setCount={setCount}
          />
        </CardHeader>
        <CardBody>
          {/* <Records records={declined.length} /> */}

          <Row className="mb-2">
            <Col md="12" align="right">
              <PaginatorCust
                count={count}
                id={userId}
                setRecords={setRecords}
                setData={setDeclined}
                getData={CountDeclined}
                DeclinedQuery="DeclinedQuery"
                index="custQuery4"
                setOnPage={setOnPage}
                resetTrigger={resetTrigger}
                setresetTrigger={setresetTrigger}
              />
            </Col>
          </Row>

          <DataTablepopulated
            bgColor="#6e557b"
            keyField={"assign_no"}
            data={declined}
            columns={columns}
          ></DataTablepopulated>
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={CountAllQuery}
            headColor="#6e557b"
          />
          <Modal
            isOpen={openManual}
            toggle={needHelp}
            style={{ display: "block", position: "absolute", left: "280px" }}
            size="lg"
          >
            <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
            <ModalBody>
              <ModalManual tar={"freshQuery"} />
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    </div>
  );
}

export default React.memo(DeclinedQueries);
