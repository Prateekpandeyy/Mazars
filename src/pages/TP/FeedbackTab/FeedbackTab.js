import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Layout from "../../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import CommonServices from "../../../common/common";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from 'sweetalert2';
import { useHistory } from "react-router";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import CustomHeading from "../../../components/Common/CustomHeading";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));

function FeedbackTab() {
  const history = useHistory();
  const userid = window.localStorage.getItem("tpkey");
  const allEnd = Number(localStorage.getItem("tp_record_per_page"));
  const classes = useStyles();
  const [feedbackData, setFeedBackData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [countFeedBack, setCountFeedBack] = useState("");
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(allEnd);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState('');
  const [sortField, setSortField] = useState('');
  const [prev, setPrev] = useState("");
  const [defaultPage, setDefaultPage] = useState(["1"]);
  const token = window.localStorage.getItem("tptoken");

  const myConfig = {
    headers: {
      "uit": token
    }
  }

  // function headerLabelFormatter(column) {

  //   return (
  //     <div className="d-flex text-white w-100 flex-wrap">
  //       {column.text}
  //       {accend === column.dataField ? (
  //         <ArrowDropDownIcon 
  //         className={isActive === true ? classes.isActive : ""}
  //         />
  //       ) : (
  //         <ArrowDropUpIcon 
  //         // className={isActive === true ? classes.isActive : ""}
  //         />
  //       )}
  //     </div>
  //   );
  // }

  //   function headerLabelFormatter(column) {
  //     // let reverse = "Exp_Delivery_Date"
  //     return(
  //       <div>
  //       {column.dataField === isActive ?
  //         (
  //           <div className="d-flex text-white w-100 flex-wrap">
  //             {column.text}
  //             {accend === column.dataField ? (
  //               <ArrowDropDownIcon 
  //               className={turnGreen === true ? classes.isActive : ""}
  //               />
  //             ) : (
  //               <ArrowDropUpIcon 
  //               className={turnGreen === true ? classes.isActive : ""}
  //               />
  //             )}
  //           </div>
  //         )
  //         :
  //         (
  //           <div className="d-flex text-white w-100 flex-wrap">
  //             {column.text}
  //             {accend === column.dataField ? (
  //               <ArrowDropDownIcon />
  //             ) : (
  //               <ArrowDropUpIcon />
  //             )}
  //           </div>
  //         )
  //       }
  //       </div>
  //     )
  // }


  function headerLabelFormatter(column, colIndex) {
    let isActive = true;

    if (
      localStorage.getItem("tpArrowFeed") === column.dataField ||
      localStorage.getItem("prevtpmsg") === column.dataField
    ) {
      isActive = true;
      setPrev(column.dataField);
      localStorage.setItem("prevtpmsg", column.dataField);
    } else {
      isActive = false;
    }
    return (
      <div className="d-flex text-white w-100 flex-wrap">
        <div style={{ display: "flex", color: "#fff" }}>
          {column.text}
          {localStorage.getItem("tpArrowFeed") === column.dataField ? (
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

  // useEffect(() => {
  //   getFeedback();
  // }, []);

  useEffect(() => {

    let pre = localStorage.getItem(" prevtpmsg");
    let arrow = localStorage.getItem("tpArrowFeed");
    if (arrow) {
      setAccend(arrow);
      setIsActive(arrow);
      setTurnGreen(true);
    }
    if (pre) {
      setPrev(pre);
    }
    let pageno = JSON.parse(localStorage.getItem("tpFeedback"));
    if (pageno) {
      getFeedback(pageno);
      setAtpage(pageno);
      setPage(pageno);
    } else {
      setPage(1);
      setEnd(Number(localStorage.getItem("tp_record_per_page")));
      getFeedback(1);
    }
  }, []);

  // useEffect(() => {
  //   setPage(1);
  //   setEnd(
  //     Number(localStorage.getItem("tp_record_per_page"))
  //   );
  //   getFeedback(1);
  // }, []);

  //page counter
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getFeedback(1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    getFeedback(Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    getFeedback(Number(page) + 1);
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getFeedback(defaultPage.at(-1));
    setAtpage(totalPages);
  };

  const sortFeedback = (val, field) => {

    let obj = {
      // pageno: atPage,
      val: val,
      field: field,
    }
    localStorage.setItem(`freezetpFeedback`, JSON.stringify(obj));

    // console.log("sort", val, field);
    setLoading(true);
    axios
      .get(
        `${baseUrl}/tl/getFeedback?page=1&orderby=${val}&orderbyfield=${field}`, myConfig
      )
      .then((res) => {
        if (res.data.code === 1) {
          let all = [];

          let sortId = 1;
          // if (page > 1) {
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
          setLoading(false);
          setFeedBackData(all);
          setSortVal(field);
          setAtpage(1);
          setPage(1);
          setBig(1);
          if((res.data.total) < allEnd){
            setEnd(res.data.total);
          }else{
          setEnd(allEnd);
          }
          setTurnGreen(true);
        }
      });

  };


  const getFeedback = (e) => {
    localStorage.setItem(`tpFeedback`, e);

    setLoading(true);
    let pagetry = JSON.parse(localStorage.getItem("freezetpFeedback"));
    let val = pagetry?.val;
    let field = pagetry?.field;
    let remainApiPath = "";
    if (pagetry) {
      remainApiPath = `tl/getFeedback?tp_id=${JSON.parse(userid)}&page=${e}&orderby=${val}&orderbyfield=${field}`
    }
    else {
      remainApiPath = `tl/getFeedback?tp_id=${JSON.parse(userid)}&page=${e}`
    }

    if (e) {
      axios
        .get(`${baseUrl}/${remainApiPath}`, myConfig)
        .then((res) => {
          let droppage = [];
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
            setFeedBackData(all);
            setLoading(false);
            setCountFeedBack(res.data.total);
            const dynamicPage = Math.ceil(res.data.total / allEnd);
            setTotalPages(dynamicPage + 1)
            let rem = (e - 1) * allEnd;
            let end = e * allEnd;
            if (dynamicPage > 1) {
              if (e === 1) {
                setBig(rem + e);
                setEnd(end);
              } else if (e === (dynamicPage)) {
                setBig(rem + 1);
                setEnd(res.data.total);
              } else {
                setBig(rem + 1);
                setEnd(end);
              }
            } else {
              setBig(rem + e);
              setEnd(res.data.total);
            }
            for (let i = 1; i <= dynamicPage; i++) {
              droppage.push(i);
            }
            setDefaultPage(droppage);
          }
        });
    };
  };


  const columns = [
    {
      text: "S.No",
      dataField: "cid",

      headerStyle: () => {
        return { width: "10px" };
      },
    },
    {
      text: "Date",
      dataField: "created",
      headerFormatter: headerLabelFormatter,
      sort: true,
      headerStyle: () => {
        return { width: "60px" };
      },
      onSort: (field, order) => {
        let val = 0;
        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowFeed", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowFeed");
        }
        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortFeedback(val, 1);
      },

    },
    {
      text: "Query no",
      dataField: "assign_no",
      headerFormatter: headerLabelFormatter,
      sort: true,
      onSort: (field, order) => {
        let val = 0;

        if (accend !== field) {
          setAccend(field);
          setIsActive(field);
          localStorage.setItem("tpArrowFeed", field);
        } else {
          setAccend("");
          localStorage.removeItem("tpArrowFeed");
        }

        if (accend === field) {
          val = 0;
        } else {
          val = 1;
        }
        sortFeedback(val, 2);
      },
      headerStyle: () => {
        return { width: "40px" };
      },
    },
    {
      text: "Feedback",
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (order === "asc") {
          val = 0;
        } else {
          val = 1;
        }
        sortFeedback(val, 3);
      },
      headerStyle: () => {
        return { width: "150px" };
      },
      formatter: function nameFormatter(cell, row) {

        return (
          <>
            <div>
              {
                row.tp_read == "0" ?
                  <div
                    style={{
                      cursor: "pointer", wordBreak: "break-word",
                      display: "flex", justifyContent: "space-between"
                    }}
                    onClick={() => readNotification(row.id)}
                    title="unread"
                  >
                    <p>{row.feedback}  - By {row.name}</p>
                    <i class="fa fa-bullseye" style={{ color: "red" }}></i>
                  </div>

                  :
                  <div
                    style={{ cursor: "pointer", wordBreak: "break-word", display: "flex", justifyContent: "space-between" }}
                    title="read"
                  >
                    <p>{row.feedback}  - By {row.name}</p>
                    <i class="fa fa-bullseye" style={{ color: "green" }}></i>
                  </div>
              }
            </div>
          </>
        );
      },
    },
  ];


  // readnotification
  const readNotification = (id) => {


    let formData = new FormData();
    formData.append("id", id);
    formData.append("type", "tp");

    axios({
      method: "POST",
      url: `${baseUrl}/tl/markReadFeedback`,
      headers: {
        uit: token
      },
      data: formData,
    })
      .then(function (response) {

        if (response.data.code === 1) {
          // alert.success("successfully read!");
          getFeedback()

        }
      })
      .catch((error) => {

      });
  };


  return (
    <>
      <Layout TPDashboard="TPDashboard" TPuserId={userid}>
        <Card>
          <CardHeader>
            <Row>
              <Col md="7">
                <CustomHeading>
                  Feedback
                </CustomHeading>
              </Col>
              <Col md="5"></Col>
            </Row>
            <Row>
              <Col md="6"></Col>
              <Col md="6" align="right">
                <div className="customPagination">
                  <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                    <span>
                      {big}-{end} of {countFeedBack}
                    </span>
                    <span className="d-flex">
                      {page > 1 ? (
                        <button
                          className="navButton"
                          onClick={(e) => firstChunk()}
                        >
                          <KeyboardDoubleArrowLeftIcon />
                        </button>
                      ) : (
                        ""
                      )}
                      {page > 1 ? (
                        <button
                          className="navButton"
                          onClick={(e) => prevChunk()}
                        >
                          <KeyboardArrowLeftIcon />
                        </button>
                      ) : (
                        ""
                      )}
                      <div className="navButtonSelectDiv">
                        <select
                          value={page}
                          onChange={(e) => {
                            setPage(Number(e.target.value));
                            getFeedback(Number(e.target.value));
                          }}
                          className="form-control">
                          {defaultPage.map((i) => (
                            <option value={i} >{i}</option>
                          ))}
                        </select>
                      </div>
                      {defaultPage.length > page ? (
                        <button
                          className="navButton"
                          onClick={(e) => nextChunk()}
                        >
                          <KeyboardArrowRightIcon />
                        </button>
                      ) : (
                        ""
                      )}
                      {defaultPage.length > page ? (
                        <button
                          className="navButton"
                          onClick={(e) => lastChunk()}
                        >
                          <KeyboardDoubleArrowRightIcon />
                        </button>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <DataTablepopulated
              bgColor="#42566a"
              keyField={"assign_no"}
              data={feedbackData}
              columns={columns}>
            </DataTablepopulated>
          </CardBody>
        </Card>
      </Layout>
    </>
  );
}

export default FeedbackTab;