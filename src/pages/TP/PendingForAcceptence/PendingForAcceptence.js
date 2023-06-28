import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import TaxProfessionalFilter from "../../../components/Search-Filter/tpfilter";
import RejectedModal from "./RejectedModal";
import Alerts from "../../../common/Alerts";
import { Spinner } from "reactstrap";
import { useHistory } from "react-router";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MessageIcon, {
  Accept,
  Reject,
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

function PendingForAcceptence(props) {
  let history = useHistory();
  const userid = window.localStorage.getItem("tpkey");
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [onPage, setOnPage] = useState(1);
  const [resetTrigger, setresetTrigger] = useState(false);
  const [count, setCount] = useState("0");
  const [sortVal, setSortVal] = useState("");
  const [sortField, setSortField] = useState("");
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [prev, setPrev] = useState("");

  const [pendingData, setPendingData] = useState([]);
  const [records, setRecords] = useState([]);
  const [scrolledTo, setScrolledTo] = useState("");

  const myRef = useRef([]);

  const [pay, setPay] = useState({
    id: "",
    allocation_id: "",
  });
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const [addPaymentModal, setPaymentModal] = useState(false);
  const rejectHandler = (key) => {
    setPaymentModal(!addPaymentModal);
    setPay({
      id: key.id,
      allocation_id: key.allocation_id,
    });
  };

  // function headerLabelFormatter(column) {
  //   // let reverse = "Exp_Delivery_Date"
  //   return(
  //     <div>
  //     {column.dataField === isActive ?
  //       (
  //         <div className="d-flex text-white w-100 flex-wrap">
  //           {column.text}
  //           {accend === column.dataField ? (
  //             <ArrowDropUpIcon
  //             className={turnGreen === true ? classes.isActive : ""}
  //             />
  //           ) : (
  //             <ArrowDropDownIcon
  //             className={turnGreen === true ? classes.isActive : ""}
  //             />
  //           )}
  //         </div>
  //       )
  //       :
  //       (
  //         <div className="d-flex text-white w-100 flex-wrap">
  //           {column.text}
  //           {accend === column.dataField ? (
  //             <ArrowDropUpIcon />
  //           ) : (
  //             <ArrowDropDownIcon />
  //           )}
  //         </div>
  //       )
  //     }
  //     </div>
  //   )
  // }

  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("tpArrowQuery2") === column.dataField ||
      localStorage.getItem("prevtpq2") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevtpq2", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("tpArrowQuery2") === column.dataField ? (
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
    let arrow = localStorage.getItem("tpArrowQuery2");
    let pre = localStorage.getItem("prevtpq2");
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    if (pre) {
      setPrev(pre);
    }
    // let sortVal = JSON.parse(localStorage.getItem("freezetpQuery2"));
    //   if (!sortVal) {
    //     let sort = {
    //       orderBy: 0,
    //       fieldBy: 0,
    //     };
    //     localStorage.setItem("freezetpQuery2", JSON.stringify(sort));
    //   }

    let pageno = JSON.parse(localStorage.getItem("tpQuery2"));
    if (!pageno) {
      pageno = 1;
    }
    getPendingforAcceptance(pageno);

    // let data = JSON.parse(localStorage.getItem("searchDatatpquery2"));
    // if (!data) {
    //   getPendingforAcceptance(1);
    // }
  }, []);

  const getPendingforAcceptance = (e) => {
    if (e === undefined) {
      // console.log(e, "e");
      e = 1;
    }
    let data = JSON.parse(localStorage.getItem("searchDatatpquery2"));
    let pagetry = JSON.parse(localStorage.getItem("freezetpQuery2"));
    localStorage.setItem(`tpQuery2`, JSON.stringify(e));
    // console.log(pagetry, "getsort");
    let val = pagetry?.val;
    let field = pagetry?.field;
    // console.log(val, "if getsort val");
    // console.log(field, "if getsort field");
    let remainApiPath = "";
    setOnPage(e);
    setLoading(true);
    let allEnd = Number(localStorage.getItem("tp_record_per_page"));
    if (data && !pagetry) {
      remainApiPath = `tl/pendingQues?page=${e}&tp_id=${JSON.parse(
        userid
      )}&cat_id=${data.store}&from=${data.fromDate
        ?.split("-")
        .reverse()
        .join("-")}&to=${data.toDate?.split("-").reverse().join("-")}&pcat_id=${
        data.pcatId
      }&qno=${data.query_no}`;
    } else if (data && pagetry) {
      remainApiPath = `/tl/pendingQues?page=${e}&cat_id=${
        data.store
      }&from=${data.fromDate?.split("-").reverse().join("-")}&to=${data.toDate
        ?.split("-")
        .reverse()
        .join("-")}&pcat_id=${data.pcatId}&qno=${
        data?.query_no
      }&orderby=${val}&orderbyfield=${field}`;
    } else if (!data && pagetry) {
      remainApiPath = `tl/pendingQues?page=${e}&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `tl/pendingQues?page=${e}&tp_id=${JSON.parse(userid)}`;
    }

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
        setPendingData(all);
        setRecords(res.data.result.length);
        setCount(res.data?.total);
        setLoading(false);
      }
    });
  };

  const sortMessage = (val, field) => {
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    setresetTrigger(!resetTrigger);

    let obj = {
      // pageno: pageno,
      val: val,
      field: field,
    };
    localStorage.setItem(`freezetpQuery2`, JSON.stringify(obj));
    localStorage.setItem(`tpQuery2`, JSON.stringify(1));
    let data = JSON.parse(localStorage.getItem("searchDatatpquery2"));

    if (data) {
      remainApiPath = `tl/pendingQues?page=1&cat_id=${
        data.store
      }&from=${data.fromDate?.split("-").reverse().join("-")}&to=${data.toDate
        ?.split("-")
        .reverse()
        .join("-")}&pcat_id=${data.pcatId}&qno=${
        data?.query_no
      }&orderby=${val}&orderbyfield=${field}`;
    } else {
      remainApiPath = `tl/pendingQues?page=1&orderby=${val}&orderbyfield=${field}`;
    }

    axios.get(`${baseUrl}/${remainApiPath}`, myConfig).then((res) => {
      if (res.data.code === 1) {
        let all = [];
        let sortId = 1;
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
        setPendingData(all);
        setTurnGreen(true);
        setresetTrigger(!resetTrigger);
      }
    });
  };

  const columns = [
    {
      text: "S.no",
      dataField: "cid",
      // formatter: (cellContent, row, rowIndex) => {
      //   return <div id={row.assign_no} ref={el => (myRef.current[row.assign_no] = el)}>{rowIndex + 1}</div>;
      // },

      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Date",
      dataField: "query_created",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowQuery2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowQuery2");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortMessage(val, 1);
      },

      formatter: function dateFormat(cell, row) {
        var oldDate = row.query_created;
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
                index: 1,
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
          localStorage.setItem("tpArrowQuery2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowQuery2");
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
          localStorage.setItem("tpArrowQuery2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowQuery2");
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
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowQuery2", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowQuery2");
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
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Accept / Reject",

      formatter: function (cell, row) {
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
              id="div1"
            >
              <div onClick={() => acceptHandler(row)}>
                <Accept titleName="Accept Assignment" />
              </div>
              <div onClick={() => rejectHandler(row)}>
                <Reject titleName="Accept Assignment" />
              </div>
            </div>
          </>
        );
      },
    },
  ];

  const acceptHandler = (key) => {
    setLoading(true);

    let formData = new FormData();
    formData.append("set", 1);
    formData.append("tp_id", JSON.parse(userid));
    formData.append("assignment_id", key.id);
    formData.append("allocation_id", key.allocation_id);

    axios({
      method: "POST",
      url: `${baseUrl}/tp/AcceptRejectQuery`,
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          setLoading(false);
          Alerts.SuccessNormal("Query accepted successfully.");
          getPendingforAcceptance();
          // updateTab(1);
          localStorage.setItem(`tpQuery2`, JSON.stringify(1));
          history.push("/taxprofessional/proposal");
        } else if (response.data.code === 0) {
          setLoading(false);
        }
      })
      .catch((error) => {});
  };

  const resetTriggerFunc = () => {
    setresetTrigger(!resetTrigger);
    setAccend("");
    setTurnGreen(false);
    localStorage.removeItem(`tpQuery2`);
    localStorage.removeItem(`freezetpQuery2`);
    localStorage.removeItem("tpArrowQuery2");
    localStorage.removeItem("prevtpq2");
    setPrev("");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <TaxProfessionalFilter
            setData={setPendingData}
            getData={getPendingforAcceptance}
            pendingForAcceptence="pendingForAcceptence"
            setRecords={setRecords}
            index="tpquery2"
            records={records}
            resetTriggerFunc={resetTriggerFunc}
            setCount={setCount}
          />
        </CardHeader>
        <Row className="mb-2">
          <Col md="12" align="right">
            <Paginator
              count={count}
              setData={setPendingData}
              getData={getPendingforAcceptance}
              pendingForAcceptence="pendingForAcceptence"
              // setRecords={setRecords}
              records={records}
              index="tpquery2"
              setOnPage={setOnPage}
              // resetPaging={resetPaging}
              resetTrigger={resetTrigger}
              setresetTrigger={setresetTrigger}
            />
          </Col>
        </Row>
        <CardBody>
          {loading ? (
            <Spinner color="primary" />
          ) : (
            <DataTablepopulated
              bgColor="#55425f"
              keyField={"assign_no"}
              data={pendingData}
              columns={columns}
            ></DataTablepopulated>
          )}
          <RejectedModal
            rejectHandler={rejectHandler}
            addPaymentModal={addPaymentModal}
            pay={pay}
            getPendingforAcceptance={getPendingforAcceptance}
          />
        </CardBody>
      </Card>
    </>
  );
}

export default PendingForAcceptence;
