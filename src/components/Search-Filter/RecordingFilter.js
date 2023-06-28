import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
function RecordingFilter(props) {
  const { handleSubmit, register, reset } = useForm();
  const [atPage, setAtpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");

  const {
    records,
    setRecords,
    setData,
    getRecording,
    SearchQuery,
    userid,
    setDefaultPage,
    setCountNotification,
    resetPaging,
    setPage,
    page,
    setBig,
    setEnd,
    countNotification,
    getData,
    pageValue,
    // lastChunk,
    big,
    end,
    localAccend,
    localPrev,
    localSorted,
    index,
    // firstChunk,
    // prevChunk,
    // nextChunk,
    defaultPage,
  } = props;

  useEffect(() => {
    // console.log(searchText, "searchText");
  }, [searchText]);

  useEffect(() => { }, []);

  //reset date
  const resetData = () => {
    setSearchText("");
    localStorage.removeItem(`searchData${SearchQuery}`);
    localStorage.removeItem("sortedrecording");
    localStorage.removeItem("accendrecording");
    localStorage.removeItem("adminRecording");
    localStorage.removeItem("prevrecord");
    localStorage.removeItem("recordingData");
    localStorage.removeItem(`searchData${SearchQuery}`)
    setPage(1);
    reset();
    resetPaging();
    getRecording(1);
  };
  const updateResult = (res) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    let droppage = [];
    let customId = 1;
    if (res.data.code === 1) {
      let all = [];
      let data = res.data.result;
      data.map((i) => {
        let data = {
          ...i,
          cid: customId,
        };
        customId++;
        all.push(data);
      });
      let end = allEnd;

      if (allEnd > res.data.total) {
        end = res.data.total;
      }

      setEnd(end);
      let dynamicPage = Math.ceil(res.data.total / allEnd);

      let rem = (page - 1) * allEnd;

      if (page === 1) {
        setBig(rem + page);
      } else {
        setBig(rem + 1);
      }
      for (let i = 1; i <= dynamicPage; i++) {
        droppage.push(i);
      }
      setDefaultPage(droppage);
      setData(all);
      setCountNotification(res.data.total);
      setRecords(res.data.total);

      setDefaultPage(droppage);
      resetPaging();
      // if (
      //   Object.keys(returnData).length === 0 &&
      //   returnData.constructor === Object
      // ) {

      // }
    }
  };
  const onSubmit = (data, e) => {
    // console.log("Dataaa", data);
    setSearchText(data);
    if (e?.target?.value == undefined) {
      e = 1;
    }
    let obj = {};
    if (data.route) {
      obj = {
        queryNo: data?.queryNo,
        route: window.location.pathname,
      };
    } else {
      obj = {
        queryNo: data?.queryNo,
        route: window.location.pathname,
      };
    }
    localStorage.setItem(`searchData${SearchQuery}`, JSON.stringify(obj));
    if (SearchQuery == "adminQuery") {
      localStorage.setItem("recordingData", JSON.stringify(data));
      const token = window.localStorage.getItem("adminToken");
      const myConfig = {
        headers: {
          uit: token,
        },
      };
      axios
        .get(
          `${baseUrl}/admin/callRecordingPostlist?uid=${JSON.parse(
            userid
          )}&assign_id=${obj.queryNo}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
              updateResult(res);
            }
          }
        });
    } else if (SearchQuery == "tlQuery") {
      const token = window.localStorage.getItem("tlToken");
      // console.log('eeee', e);
      const myConfig = {
        headers: {
          uit: token,
        },
      };

      axios
        .get(
          `${baseUrl}/tl/callRecordingPostlist?page=${e}&uid=${JSON.parse(
            userid
          )}&assign_id=${obj.queryNo}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            if (res.data.result) {
              let allEnd = Number(localStorage.getItem("tl_record_per_page"));
              let droppage = [];
              let data = res.data.result;
              setPage(e);
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
              let end = e * allEnd;

              if (end > res.data.total) {
                end = res.data.total;
              }
              let dynamicPage = Math.ceil(res.data.total / allEnd);

              let rem = (e - 1) * allEnd;

              if (e === 1) {
                setBig(rem + e);
                setEnd(end);
              } else {
                setBig(rem + 1);
                setEnd(end);
              }
              for (let i = 1; i <= dynamicPage; i++) {
                droppage.push(i);
              }
              setData(all);
              setRecords(res.data.result.length);
              setCountNotification(res.data.total);
              setDefaultPage(droppage);
            }
          }
        });
    } else if (SearchQuery == "tpQuery") {
      const token = window.localStorage.getItem("tptoken");
      // console.log('eeee', e);
      const myConfig = {
        headers: {
          uit: token,
        },
      };
      axios
        .get(
          `${baseUrl}/tl/callRecordingPostlist?page=${e}&uid=${JSON.parse(
            userid
          )}&assign_id=${obj.queryNo}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            if (res.data.result) {
              let allEnd = Number(localStorage.getItem("tp_record_per_page"));
              let droppage = [];
              let data = res.data.result;
              setPage(e);
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
              let end = e * allEnd;

              if (end > res.data.total) {
                end = res.data.total;
              }
              let dynamicPage = Math.ceil(res.data.total / allEnd);

              let rem = (e - 1) * allEnd;

              if (e === 1) {
                setBig(rem + e);
                setEnd(end);
              } else {
                setBig(rem + 1);
                setEnd(end);
              }
              for (let i = 1; i <= dynamicPage; i++) {
                droppage.push(i);
              }
              setData(all);
              setRecords(res.data.result.length);
              setCountNotification(res.data.total);
              setDefaultPage(droppage);
              localStorage.removeItem("tprecording");
              localStorage.removeItem("accendtprecording");
              localStorage.removeItem("accendtprec");
              localStorage.removeItem("prevtprecording");
              localStorage.removeItem("recordingSorttp");
            }
          }
        });
    }
  };

  const Reset = () => {
    return (
      <>
        <button
          type="reset"
          className="customBtn mx-sm-1 mx-2"
          onClick={() => resetData()}
        >
          Reset
        </button>
      </>
    );
  };

  const firstChunk = () => {
    setAtpage(1);
    setPage(1);
    // if (searchText) {
    //   onSubmit(searchText, 1);
    // } else {
    getData(1);
    // }
    localStorage.setItem(pageValue, 1);
  };
  const prevChunk = () => {
    if (atPage > 1) {
      setAtpage((atPage) => atPage - 1);
    }
    setPage(Number(page) - 1);
    // if (searchText) {
    //   onSubmit(searchText, page - 1);
    // } else {
    getData(page - 1);
    // }
    localStorage.setItem(pageValue, Number(page) - 1);
  };
  const nextChunk = () => {
    if (atPage < totalPages) {
      setAtpage((atPage) => atPage + 1);
    }
    setPage(Number(page) + 1);
    localStorage.setItem(pageValue, Number(page) + 1);

    // if (searchText) {
    //   onSubmit(searchText, page + 1);
    // } else {
    getData(page + 1);
    // }
  };
  const lastChunk = () => {
    setPage(defaultPage.at(-1));
    getData(defaultPage.at(-1));
    // if (searchText) {
    //   onSubmit(searchText, totalPages);
    // } else {
    setAtpage(totalPages);
    // }
    localStorage.setItem(pageValue, defaultPage.at(-1));
  };

  return (
    <>
      <div className="row">
        <Col md="6" align="left">
          <div className="d-flex w-100 justify-content-between">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-inline">
                <input
                  type="text"
                  name="queryNo"
                  ref={register}
                  className="form-select form-control my-2"
                />
                <button type="submit" className="customBtn mx-2 my-2">
                  Search
                </button>
                <Reset />
                <div className="form-group mx-sm-1">
                  <label className="form-select form-control">
                    Total Records : {records}
                  </label>
                </div>
              </div>
            </form>
          </div>
        </Col>
        <Col md="6" align="right">
          {countNotification > 0 ? (
            <div className="customPagination">
              <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                <span className="customPaginationSpan">
                  {big}-{end} of {countNotification}
                </span>
                <span className="d-flex">
                  {page > 1 ? (
                    <>
                      <button className="navButton" onClick={(e) => firstChunk()}>
                        <KeyboardDoubleArrowLeftIcon />
                      </button>
                      <button className="navButton" onClick={(e) => prevChunk()}>
                        <KeyboardArrowLeftIcon />
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="navButtonSelectDiv">
                    <select
                      value={page}
                      onChange={(e) => {
                        setPage(Number(e.target.value));
                        getData(Number(e.target.value));
                        localStorage.setItem(pageValue, e.target.value);
                      }}
                      className="form-control"
                    >
                      {defaultPage?.map((i) => (
                        <option value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  {defaultPage?.length > page ? (
                    <>
                      <button className="navButton" onClick={(e) => nextChunk()}>
                        <KeyboardArrowRightIcon />
                      </button>
                      <button className="navButton" onClick={(e) => lastChunk()}>
                        <KeyboardDoubleArrowRightIcon />
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
              <span className="customPaginationSpan nullClass pt-3">0 - 0 of 0</span>
            </div>
          )}
        </Col>
      </div>
    </>
  );
}

export default RecordingFilter;
