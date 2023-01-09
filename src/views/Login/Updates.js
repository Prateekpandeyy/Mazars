import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Box } from "@material-ui/core";
import { styled, makeStyles } from "@material-ui/styles";
import { Markup } from "interweave";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../config/config";
import ima from "./../../assets/images/mazars-logo.png";
import classesCustom from "./design.module.css";
import CommonServices from "../../common/common.js";
import { VscFilePdf } from "react-icons/vsc";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
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

const ArticleWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",

  padding: "5px",
});
const MyContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  flexDirection: "column",
});
const ArticleHeader = styled(Box)({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#e4f0fa",

  padding: "10px 5px",
  margin: "8px 0px",
});
const MyLogo = styled(Box)({
  display: "flex",
  width: "100%",
  height: "auto",
  maxWidth: "100px",
  objectFit: "contain",
});
const MyHeading = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
const RightContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
});
const useStyle = makeStyles({
  imgResponsive: {
    display: "flex",
    maxWidth: "25%",
    height: "50px",
    cursor: "pointer",
    alignItems: "space-between",
    justifyContent: "center",
    textAlign: "justify",
  },
});

function Updates() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [linkData, setLinkData] = useState([]);

  const [updates, isUpdates] = useState(false);
  const [myData, setMyData] = useState();
  const [description, setDescription] = useState(false);
  const [linkData22, showLinkData22] = useState(false);
  let history = useHistory();
  let id = useParams();
  const getId = history.location.index;

  useEffect(() => {
    showLinkData();
  }, []);
  const showLinkData = () => {
    alert("done");
    if (getId === 3) {
      axios.get(`${baseUrl}/customers/getimportantlink`).then((res) => {
        console.log("res", res);
        setLinkData(res.data.result);
        showLinkData22(true);
        isUpdates(false);
      });
    } else if (getId === 4) {
      axios.get(`${baseUrl}/customers/getpage?page=${getId}`).then((res) => {
        console.log("res", res);
        setLinkData([res.data.result]);
        isUpdates(false);
      });
    } else {
      axios.get(`${baseUrl}/customers/getupdated`).then((res) => {
        isUpdates(true);
        setLinkData(res.data.result);
      });
    }
  };

  if (
    window.location.origin === "http://masindia.live" &&
    window.location.protocol ===  "http:"
  ) {
    window.location.href = window.location.href.replace("http:", "https:");
  }

  const getData = (e) => {
    setDescription(true);
    setMyData(e);
  };
  const onChangePage = (event, nextPage) => {
    setPage(nextPage);
  };
  const onChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
  };

  const classes = useStyle();

  return (
    <>
      <OuterloginContainer>
        <Header noSign="noSign" />
        <MyContainer>
          {description === false ? (
            <div className={classesCustom.articleContent}>
              <div className={classesCustom.articlesDetails}>
                <>
                  {updates === true ? (
                    <TableContainer>
                      <Breadcrumbs
                        separator="<"
                        maxItems={3}
                        aria-label="breadcrumb"
                      >
                        <Link
                          underline="hover"
                          color="inherit"
                          to={{
                            pathname: "/customer/updates",
                            index: 2,
                          }}
                        >
                          Updates
                        </Link>
                      </Breadcrumbs>
                      <Table>
                        <TableBody>
                          {linkData
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((i, e) => (
                              <TableRow>
                                <TableCell
                                  onClick={(p) => getData(i)}
                                  className="tableCellStyle"
                                >
                                  <span>
                                    <span style={{ color: "rgb(61, 71, 117" }}>
                                      {`${e + 1} .`}
                                    </span>{" "}
                                    <span className="tabHover updatesLink">
                                      {` ${i.heading} -    ${i.publish_date
                                        .split("-")
                                        .reverse()
                                        .join("-")}`}
                                    </span>
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      {linkData.length > 10 ? (
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 15, 20, 25]}
                          count={linkData.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onChangePage={onChangePage}
                          onChangeRowsPerPage={onChangeRowsPerPage}
                        />
                      ) : (
                        ""
                      )}
                    </TableContainer>
                  ) : (
                    <>
                      <TableContainer>
                        {linkData22 === true ? (
                          <>
                            <Breadcrumbs
                              separator="<"
                              maxItems={3}
                              aria-label="breadcrumb"
                            >
                              <Link
                                underline="hover"
                                color="inherit"
                                to={{
                                  pathname: "/customer/updates",
                                  index: 3,
                                }}
                              >
                                Important Links
                              </Link>
                            </Breadcrumbs>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell style={{ width: "50px" }}>
                                    S.No
                                  </TableCell>
                                  <TableCell style={{ width: "400px" }}>
                                    Website
                                  </TableCell>
                                  <TableCell>Url</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {linkData
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
                                          {e + 1}
                                        </TableCell>
                                        <TableCell>{i.heading}</TableCell>
                                        <TableCell>
                                          <a href={i.url} target="_blank">
                                            {i.url}
                                          </a>
                                        </TableCell>
                                      </TableRow>
                                    </>
                                  ))}
                              </TableBody>
                            </Table>
                          </>
                        ) : (
                          ""
                        )}
                        {linkData22 === false ? (
                          <>
                            {linkData.length > 0 ? (
                              <Breadcrumbs
                                separator="<"
                                maxItems={3}
                                aria-label="breadcrumb"
                              >
                                <Link
                                  underline="hover"
                                  color="inherit"
                                  to={{
                                    pathname: "/customer/updates",
                                    index: 4,
                                  }}
                                >
                                  FAQs
                                </Link>
                              </Breadcrumbs>
                            ) : (
                              ""
                            )}
                            {linkData.map((i) => (
                              <Markup className="myFaq" content={i.content} />
                            ))}
                          </>
                        ) : (
                          ""
                        )}
                        {linkData.length > 10 ? (
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 20, 25]}
                            count={linkData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={onChangePage}
                            onChangeRowsPerPage={onChangeRowsPerPage}
                          />
                        ) : (
                          ""
                        )}
                      </TableContainer>
                    </>
                  )}
                </>
              </div>
            </div>
          ) : (
            <div className={classesCustom.articleContent}>
              <div className={classesCustom.articlesDetails}>
                <Breadcrumbs separator=">" maxItems={3} aria-label="breadcrumb">
                  <Link
                    underline="hover"
                    color="inherit"
                    to={{
                      pathname: "/customer/updates",
                      index: 2,
                    }}
                  >
                    Updates
                  </Link>
                </Breadcrumbs>
                <div style={{ margin: "20px 0 10px 0" }}>
                  <ArticleWrapper>
                    <ArticleHeader>
                      <MyLogo>
                        <Link to="/">
                          <img
                            className={classesCustom.myLogo}
                            src={`${ima}`}
                          />
                        </Link>
                      </MyLogo>
                      <RightContent>
                        <h4
                          style={{
                            color: "#081f8f",
                            fontWeight: 600,
                            letterSpacing: "0.1rem",
                          }}
                        >
                          Mazars Advisory Solutions (MAS)
                        </h4>
                        <span style={{ color: "#0071ce", fontSize: "18px" }}>
                          Building Lasting Relationships
                        </span>
                        <a href="https://www.masindia.live" target="_blank">
                          www.masindia.live.com
                        </a>
                      </RightContent>
                    </ArticleHeader>
                    {myData.content ? (
                      <>
                        <div>
                          <MyHeading>
                            <h5>
                              {" "}
                              {CommonServices.capitalizeFirstLetter(
                                myData.heading
                              )}
                            </h5>
                            <a
                              href={`${baseUrl3}/${myData.file}`}
                              target="_blank"
                              className={classes.myLink}
                            >
                              <button className="downloadBtnPdf">
                                {" "}
                                Download{" "}
                                <VscFilePdf
                                  style={{
                                    display: "flex",
                                    margin: "0 10px",
                                    color: "#e4f0fa",
                                    width: "20px",
                                    height: "20px",
                                  }}
                                />
                              </button>
                            </a>
                          </MyHeading>

                          <h6>
                            Date -{" "}
                            {myData.publish_date.split("-").reverse().join("-")}{" "}
                          </h6>
                        </div>

                        <Markup content={myData.content} />
                      </>
                    ) : (
                      <iframe
                        src={`${baseUrl3}/${myData.file}#toolbar=0`}
                        width="100%"
                        height="500px"
                      />
                    )}
                  </ArticleWrapper>
                </div>
              </div>
            </div>
          )}
        </MyContainer>

        <Footer />
      </OuterloginContainer>
    </>
  );
}

export default Updates;
