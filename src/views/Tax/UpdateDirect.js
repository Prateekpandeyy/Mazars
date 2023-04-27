import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import classes from "./design.module.css";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import { Link } from "react-router-dom";
import {
  Breadcrumbs,
  Table,
  TableContainer,
  TableHead,
  TablePagination,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import MyContainer from "../../components/Common/MyContainer";
import CustomTypography from "../../components/Common/CustomTypography";
import SubHeading from "../../components/Common/SubHeading";
import Layout from "../../components/Layout/Layout";
import Swal from "sweetalert2";
import { goToLogin } from "../../components/Common/commonFunction/GoToLogin";
import SearchBtn from "../../components/Common/SearchBtn";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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

const UpdateDirect = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const userId = window.localStorage.getItem("userid");
  let history = useHistory();
  // const allEnd = Number(localStorage.getItem("client_record_per_page"));
  const allEnd = 5;
  // const classes = useStyles();
  const [count, setCount] = useState(0);
  const [onPage, setOnPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSorted, setisSorted] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState('');
  const [resetTrigger, setresetTrigger] = useState(false);
  const [accend, setAccend] = useState(false);
  const [turnGreen, setTurnGreen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(allEnd);
  const [atPage, setAtpage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    // let pageno = JSON.parse(localStorage.getItem(`directUpdate`));
    // if (pageno) {
    //   setAtpage(pageno);
    //   setPage(pageno);
    //   getData(pageno);
    // } else {
    setAtpage(1);
    setPage(1);
    getData(1);
    setIsActive(false);
    // }
    // getData(1);
  }, []);
  useEffect(() => {
    const dynamicPage = Math.ceil(count / allEnd);
    setTotalPage(dynamicPage)
  }, [count]);
  // const onChangePage = (event, nextPage) => {
  //   setPage(nextPage);
  // };
  // const onChangeRowsPerPage = (e) => {
  //   setRowsPerPage(e.target.value);
  // };
  const getData = (p) => {
    let remainApiPath = "";
    let val = sortVal;
    let field = sortField;
    // console.log(allEnd);
    // console.log("pageNo.", p);
    setAtpage(p);
    let dataObj = {};
    let dataList = [];
    let customId = 1;
    if (p > 1) {
      customId = allEnd * (p - 1) + 1;
    }
    if (isActive == true) {
      remainApiPath = `customers/getupdated?page=${p}&type=direct&orderby=${val}&orderbyfield=${field}`
    } else {
      remainApiPath = `customers/getupdated?page=${p}&type=direct`
    }

    axios.get(`${baseUrl}/${remainApiPath}`).then((res) => {
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
          cid: customId++,
        };
        dataList.push(dataObj);
      });
      setData(dataList);
      setCount(res?.data?.total);
      let end = p * allEnd;

      if (end > res.data.total) {
        end = res.data.total;
      }
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

  const searchArticle = (p) => {
    setAtpage(p);
    setPage(p);
    let remainApiPath =``;
    let val = sortVal;
    let field = sortField;
    let formData = new FormData();
    formData.append("content", searchText);
    if (isActive == true) {
      remainApiPath = `customers/getarticles?type=direct&page=${p}&orderby=${val}&orderbyfield=${field}`
    } else {
      remainApiPath = `customers/getupdated?type=direct&page=${p}`
    }

    axios({
      method: "POST",
      url: `${baseUrl}/${remainApiPath}`,
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        let dataObj = {};
        let dataList = [];
        let customId = 1;
        if (res.data.result.length > 0) {
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
              cid: customId++,
            };
            dataList.push(dataObj);
          });
          setData(dataList);
          setCount(res?.data?.total);
          let end = p * allEnd;

          if (end > res.data.total) {
            end = res.data.total;
          }
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
            html: "No data found",
          });
        }
      }
    });
  };

  //page counter
  const prevChunk = () => {
    if (((atPage < (totalPage)) && (atPage > 1)) || (atPage == totalPage)) {
      setAtpage((atPage) => atPage - 1);
      setPage(atPage - 1);
      if (searchText.length != 0) {
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
      if (searchText.length != 0) {
        searchArticle(atPage + 1)
      } else {
        getData(atPage + 1);
      }
    }

  };

  const sortMessage = (val, field) => {
    setIsActive(true);
    setAtpage(1);
    setPage(1);
    let remainApiPath = "";
    setSortVal(val);
    setSortField(field);
    setAccend(!accend);
    if (((searchText?.length) != 0)) {
      let formData = new FormData();
      formData.append("content", searchText);
      axios({
        method: "POST",
        url: `${baseUrl}/customers/getupdated?type=direct&page=1`,
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          let dataObj = {};
          let dataList = [];
          let customId = 1;
          if (res.data.result.length > 0) {
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
                cid: customId++,
              };
              dataList.push(dataObj);
            });
            setData(dataList);
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
    } else {
      remainApiPath = `customers/getupdated?type=direct&page=1&orderby=${val}&orderbyfield=${field}&page=1`
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
          let end = 1 * allEnd;
          // let dynamicPage = Math.ceil(res.data.total / allEnd);
          setData(dataList);
          setCount(res.data.total);
          setTurnGreen(true);
          let rem = 0 * allEnd;
          setBig(rem + 1);
          setEnd(end);
          setAtpage(1);
          setPage(1);
        }
      });
    } 
  }

  return (
    <>
      {userId ? (
        <Layout custDashboard="custDashboard" custUserId={userId}>
          <OuterloginContainer>
            <MyContainer>
              <div className={classes.articleContent}>
                <div className={classes.articlesDetails}>
                  <TableContainer>
                    <>
                      <div className="bredcrubmWrapper">
                        <Breadcrumbs
                          separator=">"
                          maxItems={3}
                          aria-label="breadcrumb"
                          style={{ fontSize: "18px" }}
                        >
                          <Link
                            underline="hover"
                            color="inherit"
                            to="/customer/updatedirect"
                          >
                            Update
                          </Link>
                          <Link
                            underline="hover"
                            color="inherit"
                            to={`/customer/updatedirect`}
                          >
                            Direct tax
                          </Link>
                        </Breadcrumbs>
                        <SearchBtn outer="outer">
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
                      </div>
                      <div className={classes.articleContent}>
                        <div className={classes.articlesDetails}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell style={{ width: "50px" }}>
                                  <SubHeading>S.No</SubHeading>
                                </TableCell>
                                <TableCell style={{ width: "200px" }}>
                                  {accend == true ? (
                                    <SubHeading
                                    // onClick={() => sortMessage(1, 1)}
                                    >
                                      Date of publishing
                                      {/* <ArrowDropDownIcon /> */}
                                    </SubHeading>
                                  ) : (
                                    <SubHeading
                                    // onClick={() => sortMessage(0, 1)}
                                    >
                                      Date of publishing
                                      {/* <ArrowDropUpIcon /> */}
                                    </SubHeading>
                                  )
                                  }
                                </TableCell>
                                <TableCell>
                                  <SubHeading>Heading</SubHeading>
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
                                    <>
                                      <TableRow>
                                        <TableCell
                                          style={{ padding: "8px 16px" }}
                                          className="tableCellStyle"
                                        >
                                          <CustomTypography>
                                            {i.cid}
                                          </CustomTypography>
                                        </TableCell>
                                        <TableCell>
                                          <CustomTypography>
                                            {i.publish_date
                                              .split("-")
                                              .reverse()
                                              .join("-")}
                                          </CustomTypography>
                                        </TableCell>
                                        <TableCell>
                                          {userId ? (
                                            <Link
                                              to={{
                                                pathname: `/customer_update-details/${i.id}`,
                                                index: "direct",
                                              }}
                                              className="tabHover"
                                            >
                                              <CustomTypography
                                                hover="hover"
                                                cursor="pointer"
                                              >
                                                {i.heading}
                                              </CustomTypography>
                                            </Link>
                                          ) : (
                                            <CustomTypography
                                              hover="hover"
                                              cursor="pointer"
                                            >
                                              {i.heading}
                                            </CustomTypography>
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    </>
                                  ))}
                            </TableBody>
                            {/* {data.length > 10 ? (
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
                            )} */}
                          </Table>
                        </div>
                      </div>
                    </>
                    <div className="customPagination">
                      <div className="ml-auto mt-3 d-flex w-100 align-items-center justify-content-end">
                        <span>
                          {big}-{end} of {count}
                        </span>
                        <span className="d-flex">
                          {atPage > 1 ? (
                            <>
                              <button
                                className="navButton mx-1"
                                onClick={(e) => prevChunk()}
                              >
                                &lt;
                              </button>
                            </>
                          ) : (
                            ""
                          )}
                          {atPage < totalPage  ? (
                            <>
                              <button
                                className="navButton mx-1"
                                onClick={(e) => nextChunk()}
                              >
                                  &gt;
                              </button>
                            </>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    </div>
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
            <div className={classes.articleContent}>
              <div className={classes.articlesDetails}>
                <TableContainer>
                  <>
                    <div className="bredcrubmWrapper">
                      <Breadcrumbs
                        separator=">"
                        maxItems={3}
                        aria-label="breadcrumb"
                        style={{ fontSize: "18px" }}
                      >
                        <Link
                          underline="hover"
                          color="inherit"
                          to="/customer/updatedirect"
                        >
                          Update
                        </Link>
                        <Link
                          underline="hover"
                          color="inherit"
                          to={`/customer/updatedirect`}
                        >
                          Direct tax
                        </Link>
                      </Breadcrumbs>
                      <SearchBtn outer="outer">
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
                    </div>
                    <div className={classes.articleContent}>
                      <div className={classes.articlesDetails}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ width: "50px" }}>
                                <SubHeading>S.No</SubHeading>
                              </TableCell>
                              <TableCell style={{ width: "200px" }}>
                                {accend == true ? (
                                  <SubHeading
                                  //  onClick={() => sortMessage(1, 1)}
                                  >
                                    Date of publishing
                                    {/* <ArrowDropDownIcon /> */}
                                  </SubHeading>
                                ) : (
                                  <SubHeading
                                  // onClick={() => sortMessage(0, 1)}
                                  >
                                    Date of publishing
                                    {/* <ArrowDropUpIcon /> */}
                                  </SubHeading>
                                )
                                }
                              </TableCell>
                              <TableCell>
                                <SubHeading>Heading</SubHeading>
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
                                  <>
                                    <TableRow>
                                      <TableCell
                                        style={{ padding: "8px 16px" }}
                                        className="tableCellStyle"
                                      >
                                        <CustomTypography>
                                          {i.cid}
                                        </CustomTypography>
                                      </TableCell>
                                      <TableCell>
                                        <CustomTypography>
                                          {i.publish_date
                                            .split("-")
                                            .reverse()
                                            .join("-")}
                                        </CustomTypography>
                                      </TableCell>
                                      <TableCell>
                                        {userId ? (
                                          <Link
                                            to={{
                                              pathname: `/customer_update-details/${i.id}`,
                                              index: "direct",
                                            }}
                                          >
                                            <CustomTypography
                                              cursor="pointer"
                                              hover="hover"
                                            >
                                              {i.heading}
                                            </CustomTypography>
                                          </Link>
                                        ) : (
                                          <CustomTypography
                                            cursor="pointer"
                                            hover="hover"
                                            onClick={(e) => {
                                              goToLogin(
                                                history,
                                                "Please login to view full update"
                                              );
                                            }}
                                          >
                                            {`${i.heading}`}
                                          </CustomTypography>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  </>
                                ))}
                          </TableBody>
                          {/* {data.length > 10 ? (
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
                          )} */}
                        </Table>
                      </div>
                    </div>
                  </>
                  <div className="customPagination">
                    <div className="ml-auto mt-0 d-flex w-100 align-items-center justify-content-end">
                      <span>
                        {big}-{end} of {count}
                      </span>
                      <span className="d-flex">
                          {atPage > 1 ? (
                            <>
                              <button
                                className="navButton mx-1"
                                onClick={(e) => prevChunk()}
                              >
                                &lt;
                              </button>
                            </>
                          ) : (
                            ""
                          )}
                          {atPage < totalPage  ? (
                            <>
                              <button
                                className="navButton mx-1"
                                onClick={(e) => nextChunk()}
                              >
                                  &gt;
                              </button>
                            </>
                          ) : (
                            ""
                          )}
                        </span>
                    </div>
                  </div>
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
export default UpdateDirect;
