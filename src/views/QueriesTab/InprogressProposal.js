import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/config";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import Records from "../../components/Records/Records";
import CommonServices from "../../common/common";
import moment from "moment";
import DiscardReport from "../AssignmentTab/DiscardReport";
import ModalManual from "../ModalManual/AllComponentManual";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import PaginatorCust from "../../components/Paginator/PaginatorCust";
import MessageIcon, {
  ViewDiscussionIcon,
  HelpIcon,
  FeedBackICon,
} from "../../components/Common/MessageIcon";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
function InprogressProposal({
  allQueriesCount,
  // setAllQueriesCount,
  // CountAllQuery,
}) {
  const userId = window.localStorage.getItem("userid");
  const [assignNo, setAssignNo] = useState("");
  const [openManual, setManual] = useState(false);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [inprogressProposal, setInprogressProposal] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");
  const myRef = useRef([]);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
    if (ViewDiscussion === false) {
      setScrolledTo(key)
      console.log(key, 'set');
    }
  };
  // const allEnd = Number(localStorage.getItem("tl_record_per_page"));
  // const allEnd = 5;
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

  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  useEffect(() => {
    let runTo = myRef.current[scrolledTo]
    runTo?.scrollIntoView(false);
    runTo?.scrollIntoView({ block: 'center' });
    console.log("object");
  }, [ViewDiscussion]);

  const needHelp = () => {
    setManual(!openManual);
  };

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem(`searchDatacustQuery3`));
    let pageno = JSON.parse(localStorage.getItem("custQuery3"));
    let arrow = localStorage.getItem("custArrowQuery3")
    let pre =localStorage.getItem("prevcustq3")
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
      CountInprogressProposal(pageno);
      }else {
        CountInprogressProposal(1);
      }
    // }
  }, []);


  const CountInprogressProposal = (e) => {
    let data = JSON.parse(localStorage.getItem("searchDatacustQuery3"));
    let pagetry = JSON.parse(localStorage.getItem("freezecustQuery3"));
    localStorage.setItem(`custQuery3`, JSON.stringify(e));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);
    if ((data) && (!pagetry)){
      remainApiPath = `customers/incompleteAssignments?user=${JSON.parse(
        userId
      )}&status=2&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
        }&pcat_id=${data.pcatId}`
    }else if ((data) && (pagetry)){
      remainApiPath = `customers/incompleteAssignments?user=${JSON.parse(
        userId
      )}&status=2&cat_id=${data.store}&from=${data.fromDate}&to=${data.toDate
        }&pcat_id=${data.pcatId}&orderby=${val}&orderbyfield=${field}`
    }else if ((!data) && (pagetry)){
      remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&status=2&orderby=${val}&orderbyfield=${field}`
    }else{
      remainApiPath = `customers/incompleteAssignments?page=${e}&user=${JSON.parse(
        userId
      )}&status=2`
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
          setInprogressProposal(all);
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
                index: 2,
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
            <div className="completed">{row.status}</div>
          </>
        );
      },
    },
    {
      text: "Actual Delivery Date",
      dataField: "final_date",
      sort: true,

      formatter: function dateFormat(cell, row) {
        return (
          <>
            {row.status == "Declined Query"
              ? null
              : row.status_code >= "1"
                ? CommonServices.removeTime(row.final_date)
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
                          index: 2,
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
                            index: 2,
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
    localStorage.removeItem("custQuery3");
    localStorage.removeItem(`freezecustQuery3`);
    localStorage.removeItem("custArrowQuery3");
    localStorage.removeItem("prevcustQuery3");
    setPrev("");
  }

  return (
    <>
      <Card>
        <CardHeader>
          <span onClick={(e) => needHelp()}>
            {" "}
            <HelpIcon />
          </span>
          <CustomerFilter
            setData={setInprogressProposal}
            getData={CountInprogressProposal}
            id={userId}
            InprogressQueryProposal="InprogressQueryProposal"
            records={allQueriesCount.length}
            index="custQuery3"
          />
        </CardHeader>
        <CardBody>
          {/* <Records records={allQueriesCount.length} /> */}
          <Row className="mb-2">
            <Col md="12" align="right">
              <PaginatorCust
                count={count}
                id={userId}
                index="custQuery3"
                setData={setInprogressProposal}
                getData={CountInprogressProposal}
                InprogressQueryProposal="InprogressQueryProposal"
                setOnPage={setOnPage}
                resetTrigger={resetTrigger}
                setresetTrigger={setresetTrigger}
              />
            </Col>
          </Row>
          <DataTablepopulated
            bgColor="#6e557b"
            keyField={"assign_no"}
            data={allQueriesCount}
            columns={columns}
          ></DataTablepopulated>
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={CountInprogressProposal}
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
    </>
  );
}

export default React.memo(InprogressProposal);
