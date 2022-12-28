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

const Direct = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const loadpage = Number(localStorage.getItem("prevPage"));
  const userId = window.localStorage.getItem("userid");

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
  const goToLogin = (e) => {
    Swal.fire({
      title: "Info",
      html: "Please login to view full article",
      icon: "warning",
    });
  };
  return (
    <>
      {userId ? (
        <Layout custDashboard="custDashboard" custUserId={userId}>
          <OuterloginContainer>
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
                                  onClick={(e) => {
                                    goToLogin(e);
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
