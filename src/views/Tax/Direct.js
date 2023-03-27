import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Footer from "../../components/Footer/Footer";
import {
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
const Direct = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [filterValue, setFilterValue] = useState("");
  const loadpage = Number(localStorage.getItem("prevPage"));
  const userId = window.localStorage.getItem("userid");
  let history = useHistory();

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
        setData(dataList);
      });
  };
  const onChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
  };
  const getPage = () => {
    setPage(loadpage);
    localStorage.removeItem("prevPage");
  };
  const getData = () => {
    axios.get(`${baseUrl}/customers/getarticles`).then((res) => {
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
      setData(dataList);
    });
  };
  useEffect(() => {
    getData();
    getPage();
  }, []);

  const searchArticle = () => {
    let formData = new FormData();
    formData.append("content", searchText);
    formData.append("article_type", filterValue);
    axios({
      method: "POST",
      url: `${baseUrl}/customers/getarticles`,
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        let dataObj = {};
        let dataList = [];
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
              writer: i.writer,
            };
            dataList.push(dataObj);
          });
          setData(dataList);
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
              />
              <button
                onClick={(e) => searchArticle()}
                className="customBtn mx-2"
              >
                Search
              </button>
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
                            <SubHeading>Date of publishing</SubHeading>
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
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((i, e) => (
                              <TableRow>
                                <TableCell
                                  style={{ padding: "8px 16px" }}
                                  className="tableCellStyle"
                                >
                                  {page * 10 + ++e}
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
                    />
                    <button
                      className="customBtn mx-2"
                      onClick={(e) => searchArticle()}
                    >
                      Search
                    </button>
                  </SearchBtn>
                </div>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: "50px" }}>
                          <SubHeading>S.No</SubHeading>
                        </TableCell>
                        <TableCell style={{ width: "200px" }}>
                          <SubHeading>Date of publishing</SubHeading>
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
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((i, e) => (
                            <TableRow>
                              <TableCell
                                style={{ padding: "8px 16px" }}
                                className="tableCellStyle"
                              >
                                {page * 10 + ++e}
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
