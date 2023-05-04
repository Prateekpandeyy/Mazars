import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Footer from "../../components/Footer/Footer";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TablePagination,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import classesCustom from "./design.module.css";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import CommonServices from "../../common/common";
import MyContainer from "../../components/Common/MyContainer";
import CustomTypography from "../../components/Common/CustomTypography";
import SubHeading from "../../components/Common/SubHeading";
import Layout from "../../components/Layout/Layout";
import Swal from "sweetalert2";
import SearchBtn from "../../components/Common/SearchBtn";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { goToLogin } from "../../components/Common/commonFunction/GoToLogin";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));


const Direct = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const allEnd = Number(localStorage.getItem("client_record_per_page"));
  const allEnd = 5;

  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSorted, setisSorted] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState(1);
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(allEnd);
  const [atPage, setAtpage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [filterValue, setFilterValue] = useState("");
  const loadpage = Number(localStorage.getItem("prevPage"));
  const userId = window.localStorage.getItem("userid");
  let history = useHistory();

  // console.log(searchText.length, "searchText");
  // console.log(filterValue.length, "searchText");



  const onChangePage = (event, nextPage) => {
    setPage(nextPage);
    localStorage.setItem("prevPage", nextPage);
    axios
      .get(`${baseUrl}/customers/getarticles?page=${++nextPage}`)
      .then((res) => {
        let dataObj = {};
        let dataList = [];

        res.data.result.map((i, e) => {
          dataObj = {
            sn: ++e,
            content: i.content,
            file: i.file,
            heading: i.heading,
            id: i.id,
            publish_date: i.publish_date,
            status: i.status,
            type: i.type,
            writer: i.writer,
          };
          dataList.push(dataObj);
        });
        console.log(res);
        setData(dataList);
        setCount(res?.data?.total);
      });
  };
  const onChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
  };
  const getPage = () => {
    setPage(loadpage);
    localStorage.removeItem("prevPage");
  };
  const getData = (p) => {
    let pagetry = JSON.parse(localStorage.getItem("freezeArticle"));
    let data = JSON.parse(localStorage.getItem("searchArticle"));
    // let searchData = JSON.parse(localStorage.getItem("generated"));
    localStorage.setItem(`Article`, JSON.stringify(p))
    let remainApiPath = "";
    let val = sortVal;
    let field = sortField;
    // console.log(allEnd);
    console.log("pageNo.", p);
    setAtpage(p);

    if (isActive == true) {
      remainApiPath = `customers/getarticles?page=${p}&orderby=${val}&orderbyfield=${field}`
    } else {
      remainApiPath = `customers/getarticles?page=${p}`
    }

    axios.get(`${baseUrl}/${remainApiPath}`).then((res) => {
      let dataObj = {};
      let dataList = [];
      let customId = 1;
      if (p > 1) {
        customId = allEnd * (p - 1) + 1;
      }
      res.data.result.map((i, e) => {
        dataObj = {
          sn: ++e,
          content: i.content,
          file: i.file,
          heading: i.heading,
          id: i.id,
          publish_date: i.publish_date,
          status: i.status,
          type: i.type,
          writer: i.writer,
          cid: customId++,
        };
        dataList.push(dataObj);
      });
      setData(res.data.result);
      console.log(dataList);
      setCount(res?.data?.total);
      // getLimit();
      let end = p * allEnd;

      if (end > res.data.total) {
        end = res.data.total;
      }
      // let dynamicPage = Math.ceil(res.data.total / allEnd);

      let rem = (p - 1) * allEnd;
      if (p === 1) {
        setBig(rem + p);
        setEnd(end);
      } else {
        setBig(rem + 1);
        setEnd(end);
      }

    });
  };

  // const getLimit = () => {
  //   console.log('Count', count);
  //   const dynamicPage = Math.ceil(count / allEnd);
  //   setTotalPage(dynamicPage)
  //   console.log(totalPage, "Total Pages");
  // }

  useEffect(() => {
    const dynamicPage = Math.ceil(count / allEnd);
    setTotalPage(dynamicPage)
  }, [count]);

  useEffect(() => {
    setAtpage(1);
    setPage(1);
    getData(1);
    getPage();
    setIsActive(false);
  }, []);


  //page counter
  const prevChunk = () => {
    if (((atPage <= (totalPage)) && (atPage > 1))) {
      setAtpage((atPage) => atPage - 1);
      setPage(atPage - 1);
      if (((searchText?.length) != 0) || ((filterValue?.length) != 0)) {
        searchArticle(atPage - 1)
      } else {
        getData(atPage - 1);
      }
    }

  };
  const nextChunk = () => {
    if ((atPage > 0) && (atPage < (totalPage))) {
      setAtpage((atPage) => atPage + 1);
      setPage(atPage + 1);
      if (((searchText?.length) != 0) || ((filterValue?.length) != 0)) {
        searchArticle(atPage + 1)
      } else {
        getData(atPage + 1);
      }
    }

  };



  const sortMessage = (val, field) => {
    let formData = new FormData();
    setAtpage(1);
    setPage(1);
    setIsActive(true);
    console.log(formData, "formData");
    formData.append("content", searchText);
    formData.append("article_type", filterValue);
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    let obj = {
      val: val,
      field: field,
    }
    setAccend(!accend);
    if (((searchText?.length) != 0) || ((filterValue?.length) != 0)) {
      remainApiPath = `customers/getarticles?page=1&orderby=${val}&orderbyfield=${field}`
      axios({
        method: "POST",
        url: `${baseUrl}/${remainApiPath}`,
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          if (res.data.result.length > 0) {
            let dataObj = {};
            let dataList = [];
            let customId = 1;
            res.data.result.map((i, e) => {
              dataObj = {
                sn: ++e,
                content: i.content,
                file: i.file,
                heading: i.heading,
                id: i.id,
                publish_date: i.publish_date,
                status: i.status,
                type: i.type,
                writer: i.writer,
                cid: customId++,
              };
              dataList.push(dataObj);
            });
            setData(dataList);
            console.log(dataList);
            setCount(res?.data?.total);
            let end = 1 * allEnd;
            if (end > res.data.total) {
              end = res.data.total;
            }
            let rem = (1 - 1) * allEnd;
            setBig(rem + 1);
            setEnd(end);
          }
        }
      });
    }
    else {
      remainApiPath = `customers/getarticles?page=1&orderby=${val}&orderbyfield=${field}`
      axios
        .get(
          `${baseUrl}/${remainApiPath}`,
        )
        .then((res) => {
          if (res.data.code === 1) {
            let all = [];
            let dataObj = {};
            let dataList = [];
            let customId = 1;
            let sortId = 1;
            res.data.result.map((i, e) => {
              dataObj = {
                sn: ++e,
                content: i.content,
                file: i.file,
                heading: i.heading,
                id: i.id,
                publish_date: i.publish_date,
                status: i.status,
                type: i.type,
                writer: i.writer,
                cid: customId++,
              };
              dataList.push(dataObj);
            });
            console.log(dataList);
            let end = 1 * allEnd;
            // let dynamicPage = Math.ceil(res.data.total / allEnd);
            setData(dataList);
            setCount(res.data.total);
            setTurnGreen(true);
            let rem = 0 * allEnd;
            setBig(rem + 1);
            setEnd(end);
          }
        });
    }
  }


  const searchArticle = (p) => {
    let formData = new FormData();
    setAtpage(p);
    setPage(p);
    console.log(formData, "formData");
    formData.append("content", searchText);
    formData.append("article_type", filterValue);
    let obj = {
      content: searchText,
      article_type: filterValue
    }
    let val = sortVal;
    let field = sortField;

    let remainApiPath = ``;
    // let pagetry = JSON.parse(localStorage.getItem("freezeArticle"));
    // let val = pagetry?.val;
    // let field = pagetry?.field;

    if (isActive == true) {
      remainApiPath = `customers/getarticles?page=${p}&orderby=${val}&orderbyfield=${field}`
    } else {
      remainApiPath = `customers/getarticles?page=${p}`
    }

    // localStorage.setItem(`searchArticle`, JSON.stringify(obj));
    axios({
      method: "POST",
      url: `${baseUrl}/${remainApiPath}`,
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        if (res.data.result.length > 0) {
          let dataObj = {};
          let dataList = [];
          let customId = 1;
          if (p > 1) {
            customId = allEnd * (p - 1) + 1;
          }
          res.data.result.map((i, e) => {
            dataObj = {
              sn: ++e,
              content: i.content,
              file: i.file,
              heading: i.heading,
              id: i.id,
              publish_date: i.publish_date,
              status: i.status,
              type: i.type,
              writer: i.writer,
              cid: customId++,
            };
            dataList.push(dataObj);
          });
          setData(dataList);
          console.log(dataList);
          setCount(res?.data?.total);
          // getLimit();
          let end = p * allEnd;

          if (end > res.data.total) {
            end = res.data.total;
          }
          // let dynamicPage = Math.ceil(res.data.total / allEnd);

          let rem = (p - 1) * allEnd;
          if (p === 1) {
            setBig(rem + p);
            setEnd(end);
          } else {
            setBig(rem + 1);
            setEnd(end);
          }
        } else {
          setData([]);
          Swal.fire({
            html: "No record found",
          });
        }
      }
    });
  };

  return (
    <>
      {userId ? (
        <Layout custDashboard="custDashboard" custUserId={userId}>
          <OuterloginContainer>
            <SearchBtn>
              <diiv
                style={{
                  display: "flex",
                  maxWidth: "150px",
                  width: "100%",
                  margin: "0px 10px",
                }}
              >
                <select
                  style={{
                    display: "flex",
                    padding: "5px 15px",
                    border: "1px solid #ccc",
                    borderRradius: " 6px",
                    width: "100%",
                    backgroundColor: "#fff",
                    outline: "none",
                  }}
                  onChange={(e) => setFilterValue(e.target.value)}
                  value={filterValue}
                >
                  <option value="">All</option>
                  <option value="DT">DT</option>
                  <option value="IDT">IDT</option>
                </select>
              </diiv>
              <input
                placeholder="Please enter text"
                className="form-control"
                type="Please enter text"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
              <button
                onClick={(e) => searchArticle(1)}
                className="customBtn mx-2"
              >
                Search
              </button>
            </SearchBtn>
            <SearchBtn>
                  <div className="customPagination">
                    <div className="ml-auto mt-3 d-flex w-100 align-items-center justify-content-end">
                      <span>
                        {big}-{end} of {count}
                      </span>
                      <span className="d-flex">
                        {atPage > 1 ? (
                          <>
                            <button
                                className="navButton"
                                onClick={(e) => prevChunk()}
                            >
                                <KeyboardArrowLeftIcon />
                            </button>
                          </>
                        ) : (
                          ""
                        )}
                        {atPage < totalPage ? (
                          <>
                             <button
                                className="navButton"
                                onClick={(e) => nextChunk()}
                            >
                                <KeyboardArrowRightIcon />
                            </button>
                          </>
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </div>
            </SearchBtn>
            <MyContainer>
              <div className={classesCustom.articleContent}>
                <div className={classesCustom.articlesDetails}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ width: "50px" }}>
                            <SubHeading>S.No</SubHeading>
                          </TableCell>
                          <TableCell style={{ width: "200px" }}>
                            <SubHeading>
                              {/* <sortButton/> */}
                              Date of publishing
                            </SubHeading>
                          </TableCell>
                          <TableCell style={{ width: "150px" }}>
                            <SubHeading>Subject</SubHeading>
                          </TableCell>
                          <TableCell
                            style={{ width: "400px", margin: "0 10px" }}
                          >
                            <SubHeading>Heading</SubHeading>
                          </TableCell>

                          <TableCell>
                            <SubHeading>Name of writer</SubHeading>
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {data &&
                          data
                            // .slice(
                            //   page * rowsPerPage,
                            //   page * rowsPerPage + rowsPerPage
                            // )
                            .map((i, e) => (
                              <TableRow>
                                <TableCell
                                  style={{ padding: "8px 16px" }}
                                  className="tableCellStyle"
                                >
                                  {/* {page * 10 + ++e} */}
                                  {i.cid}
                                </TableCell>
                                <TableCell style={{ width: "150px" }}>
                                  <CustomTypography>
                                    {i.publish_date
                                      .split("-")
                                      .reverse()
                                      .join("-")}
                                  </CustomTypography>
                                </TableCell>
                                <TableCell style={{ width: "150px" }}>
                                  <CustomTypography>
                                    {CommonServices.capitalizeFirstLetter(
                                      i.type
                                    )}
                                  </CustomTypography>
                                </TableCell>
                                <TableCell
                                  style={{
                                    width: "400px",
                                    margin: "0 10px",
                                    wordBreak: "break-all",
                                  }}
                                  className="btnHover tableCellStyle"
                                >
                                  <Link
                                    to={{
                                      pathname: "/customer/details",
                                      index: i.id,
                                      hash: i.type,
                                    }}
                                  >
                                    <CustomTypography
                                      cursor="pointer"
                                      hover="hover"
                                    >
                                      {`${i.heading}`}
                                    </CustomTypography>
                                  </Link>
                                </TableCell>
                                <TableCell>
                                  <CustomTypography>
                                    {i.writer}
                                  </CustomTypography>
                                </TableCell>
                              </TableRow>
                            ))}
                      </TableBody>
                      {data.length > 10 ? (
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 15, 20, 25]}
                          count={data.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onChangePage={onChangePage}
                          onChangeRowsPerPage={onChangeRowsPerPage}
                        />
                      ) : (
                        ""
                      )}
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </MyContainer>
          </OuterloginContainer>
        </Layout>
      ) : (
        <OuterloginContainer>
          <Header noSign="noSign" />

          <MyContainer>
            <div className={classesCustom.articleContent}>
              <div className={classesCustom.articlesDetails}>
                <div className="bredcrubmWrapperarticle">
                  <SearchBtn outer="outer">
                    <diiv
                      style={{
                        display: "flex",
                        maxWidth: "150px",
                        width: "100%",
                        margin: "0px 10px",
                      }}
                    >
                      <select
                        style={{
                          display: "flex",
                          padding: "5px 15px",
                          border: "1px solid #ccc",
                          borderRradius: " 6px",
                          width: "100%",
                          backgroundColor: "#fff",
                          outline: "none",
                        }}
                        onChange={(e) => setFilterValue(e.target.value)}
                        value={filterValue}
                      >
                        <option value="">All</option>
                        <option value="DT">DT</option>
                        <option value="IDT">IDT</option>
                      </select>
                    </diiv>
                    <input
                      placeholder="Please enter text"
                      className="form-control"
                      type="Please enter text"
                      onChange={(e) => setSearchText(e.target.value)}
                      value={searchText}
                    />
                    <button
                      className="customBtn mx-2"
                      onClick={(e) => searchArticle(1)}
                    >
                      Search
                    </button>
                  </SearchBtn>
                </div>
                <SearchBtn outer="outer">
                  <div className="customPagination">
                    <div className="ml-auto mt-3 d-flex w-100 align-items-center justify-content-end">
                      <span>
                        {big}-{end} of {count}
                      </span>
                      <span className="d-flex">
                        {atPage > 1 ? (
                          <>
                            <button
                                className="navButton"
                                onClick={(e) => prevChunk()}
                            >
                                <KeyboardArrowLeftIcon />
                            </button>
                          </>
                        ) : (
                          ""
                        )}
                        {atPage < totalPage ? (
                          <>
                             <button
                                className="navButton"
                                onClick={(e) => nextChunk()}
                            >
                                <KeyboardArrowRightIcon />
                            </button>
                          </>
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </div>
                </SearchBtn>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: "50px" }}>
                          <SubHeading>S.No</SubHeading>
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          {accend == true ? (
                            <SubHeading onClick={() => sortMessage(1, 1)}>
                              Date of publishing  <ArrowDropDownIcon />
                            </SubHeading>
                          ) : (
                            <SubHeading onClick={() => sortMessage(0, 1)}>
                              Date of publishing <ArrowDropUpIcon />
                            </SubHeading>
                          )
                          }
                        </TableCell>
                        <TableCell style={{ width: "150px" }}>
                          <SubHeading>Subject</SubHeading>
                        </TableCell>
                        <TableCell style={{ width: "400px", margin: "0 10px" }}>
                          <SubHeading>Heading</SubHeading>
                        </TableCell>
                        <TableCell>
                          <SubHeading>Name of writer</SubHeading>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {data &&
                        data
                          // .slice(
                          //   page * rowsPerPage,
                          //   page * rowsPerPage + rowsPerPage
                          // )
                          .map((i, e) => (
                            <TableRow>
                              <TableCell
                                style={{ padding: "8px 16px" }}
                                className="tableCellStyle"
                              >
                                {/* {page * 10 + ++e} */}
                                {i.cid}
                              </TableCell>
                              <TableCell style={{ width: "150px" }}>
                                <CustomTypography>
                                  {i.publish_date
                                    .split("-")
                                    .reverse()
                                    .join("-")}
                                </CustomTypography>
                              </TableCell>
                              <TableCell style={{ width: "150px" }}>
                                <CustomTypography>
                                  {CommonServices.capitalizeFirstLetter(i.type)}
                                </CustomTypography>
                              </TableCell>
                              <TableCell
                                style={{
                                  width: "400px",
                                  margin: "0 10px",
                                  wordBreak: "break-all",
                                }}
                                className="tableCellStyle"
                              >
                                {/* {userId ? (
                                  <Link
                                    to={{
                                      pathname: "/customer/details",
                                      index: i.id,
                                      hash: i.type,
                                    }}
                                  >
                                    <CustomTypography>
                                      {`${i.heading}`}
                                    </CustomTypography>
                                  </Link>
                                ) : (
                                  <CustomTypography>
                                    {`${i.heading}`}
                                  </CustomTypography>
                                )} */}
                                <CustomTypography
                                  cursor="pointer"
                                  hover="hover"
                                  onClick={(e) => {
                                    goToLogin(
                                      history,
                                      "Please login to view full article"
                                    );
                                  }}
                                >
                                  {`${i.heading}`}
                                </CustomTypography>
                                {/* <span
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) => {
                                    goToLogin(e);
                                  }}
                                >
                                  {`${i.heading}`}
                                </span> */}
                              </TableCell>
                              <TableCell>
                                <CustomTypography>{i.writer}</CustomTypography>
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                    {data.length > 10 ? (
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 20, 25]}
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={onChangePage}
                        onChangeRowsPerPage={onChangeRowsPerPage}
                      />
                    ) : (
                      ""
                    )}
                  </Table>
                </TableContainer>
              </div>
            </div>
          </MyContainer>
          <Footer />
        </OuterloginContainer>
      )}
    </>
  );
};
export default Direct;
