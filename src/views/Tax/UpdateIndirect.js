import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
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
import classes from "./design.module.css";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import { Link } from "react-router-dom";
import MyContainer from "../../components/Common/MyContainer";
import CustomTypography from "../../components/Common/CustomTypography";
import SubHeading from "../../components/Common/SubHeading";
import Layout from "../../components/Layout/Layout";
import Swal from "sweetalert2";

const UpdateIndirect = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const userId = window.localStorage.getItem("userid");

  useEffect(() => {
    getData();
  }, []);

  const onChangePage = (event, nextPage) => {
    setPage(nextPage);
  };
  const onChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
  };
  const getData = (e) => {
    let dataObj = {};
    let dataList = [];

    axios
      .get(`${baseUrl}/customers/getupdated?type=indirect`)

      .then((res) => {
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
          };
          dataList.push(dataObj);
        });
        setData(dataList);
      });
  };
  const goToLogin = (e) => {
    Swal.fire({
      title: "warning",
      html: "Please login to view login",
      icon: "warning",
    });
  };
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
                          to={`/customer/updateindirect`}
                        >
                          Indirect tax
                        </Link>
                      </Breadcrumbs>
                      <div className={classes.articleContent}>
                        <div className={classes.articlesDetails}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell style={{ width: "50px" }}>
                                  <SubHeading>S.No</SubHeading>
                                </TableCell>
                                <TableCell style={{ width: "200px" }}>
                                  <SubHeading>Date of publishing</SubHeading>
                                </TableCell>
                                <TableCell>
                                  <SubHeading>Heading</SubHeading>
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
                                    <>
                                      <TableRow>
                                        <TableCell
                                          style={{ padding: "8px 16px" }}
                                          className="tableCellStyle"
                                        >
                                          <CustomTypography>
                                            {i.sn}
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
                                                pathname: `/customer/update-details/${i.id}`,
                                                index: "indirect",
                                              }}
                                            >
                                              <CustomTypography
                                                hover="hover"
                                                cursor="pointer"
                                              >
                                                {i.heading}
                                              </CustomTypography>
                                            </Link>
                                          ) : (
                                            <CustomTypography cursor="pointer">
                                              {i.heading}
                                            </CustomTypography>
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    </>
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
                        </div>
                      </div>
                    </>
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
                        to={`/customer/updateindirect`}
                      >
                        Indirect tax
                      </Link>
                    </Breadcrumbs>
                    <div className={classes.articleContent}>
                      <div className={classes.articlesDetails}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ width: "50px" }}>
                                <SubHeading>S.No</SubHeading>
                              </TableCell>
                              <TableCell style={{ width: "200px" }}>
                                <SubHeading>Date of publishing</SubHeading>
                              </TableCell>
                              <TableCell>
                                <SubHeading>Heading</SubHeading>
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
                                  <>
                                    <TableRow>
                                      <TableCell
                                        style={{ padding: "8px 16px" }}
                                        className="tableCellStyle"
                                      >
                                        <CustomTypography>
                                          {i.sn}
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
                                              pathname: `/customer/update-details/${i.id}`,
                                              index: "indirect",
                                            }}
                                          >
                                            <CustomTypography>
                                              {i.heading}
                                            </CustomTypography>
                                          </Link>
                                        ) : (
                                          <CustomTypography
                                            cursor="pointer"
                                            onClick={(e) => {
                                              goToLogin(e);
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
                      </div>
                    </div>
                  </>
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
export default UpdateIndirect;
