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
function FeedbackTab() {
  
const history = useHistory();
  const userid = window.localStorage.getItem("tpkey");
  const [feedbackData, setFeedBackData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [countFeedBack, setCountFeedBack] = useState("");
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(50);
  const [page, setPage] = useState(0);
  const [atPage, setAtpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const token = window.localStorage.getItem("tptoken");
  const [defaultPage, setDefaultPage] = useState(["1", "2", "3", "4", "5"]);
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
    useEffect(() => {
      setPage(1);
      setEnd(
        Number(localStorage.getItem("tp_record_per_page"))
      );
      getFeedback(1);
    }, []);


    //page counter
  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    getFeedback(1);
    console.log(1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    console.log("prev");
    setPage(Number(page) - 1);
    getFeedback(Number(page) - 1);
  };
  const nextChunk = () => {
    console.log("next");
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    getFeedback(Number(page) + 1);
  };
  const lastChunk = () => {
    console.log("last");
    setPage(defaultPage.at(-1));
    getFeedback(defaultPage.at(-1));
    setAtpage(totalPages);
  };

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = (e) => {
    setLoading(true);
    let allEnd = Number(localStorage.getItem("tp_record_per_page"));
    if (e) {
    axios
      .get(`${baseUrl}/tl/getFeedback?tp_id=${JSON.parse(userid)}&page=${e}` , myConfig)
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
          setFeedBackData(res.data.result);
          setLoading(false);
            setFeedBackData(res.data.total);
            const dynamicPage = Math.ceil(res.data.total / allEnd);
            setTotalPages(dynamicPage+1)
            let rem = (e - 1) * allEnd;
            let end = e * allEnd;
            if (e === 1) {
              setBig(rem + e);
              setEnd(end);
            }else if(e === (dynamicPage+1)){
              setBig(rem + 1);
              setEnd(res.data.total);
            }else{
              setBig(rem + 1);
              setEnd(end);
            }
            for (let i = 1; i < (dynamicPage+1); i++) {
              droppage.push(i);
            }
            setDefaultPage(droppage);
        }
      });
  };
};

  const sortFeedback = (val, field) => {
    console.log("sorting....",val,field);
    setLoading(true);
    axios
      .get(
        `${baseUrl}/tl/getFeedback?orderby=${val}&orderbyfield=${field}`, myConfig
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
          setLoading(false);
          setFeedBackData(all);
          setSortVal(field);
        }
      });
  };

  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return {width: "10px" };
      },
    },
    {
      text: "Date",
      dataField: "created",
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (order === "asc") {
          val = 0;
        } else {
          val = 1;
        }
      },
      headerStyle: () => {
        return {  width: "60px" };
      },
     
    },
    {
      text: "Query no",
      dataField: "assign_no",
      sort: true,
      onSort: (field, order) => {
        let val = 0;
        if (order === "asc") {
          val = 0;
        } else {
          val = 1;
        }
        sortFeedback(val, 2);
      },
      headerStyle: () => {
        return {  width: "40px" };
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
        return {  width: "150px" };
      },
      formatter: function nameFormatter(cell, row) {
      
        return (
          <>
            <div>
              {
                row.tp_read == "0" ?
                  <div
                    style={{
                      cursor: "pointer", wordBreak : "break-word",
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
                    style={{ cursor: "pointer", wordBreak : "break-word", display: "flex", justifyContent: "space-between" }}
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
        uit : token
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
                          getFeedback(e.target.value);
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
          </Row>
          </CardHeader>
          <CardBody>
             <DataTablepopulated 
                   bgColor="#42566a"
                   keyField= {"assign_no"}
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
