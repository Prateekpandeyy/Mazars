import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../config/config";
import classesCustom from "./design.module.css";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import {
  Breadcrumbs,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import MyContainer from "../../components/Common/MyContainer";
import CustomTypography from "../../components/Common/CustomTypography";
import SubHeading from "../../components/Common/SubHeading";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
const useStyles = makeStyles((theme) => ({
  isActive: {
    backgroundColor: "green",
    color: "#fff",
    margin: "0px 2px",
  },
}));

function Linklist() {
  const [linkData, setLinkData] = useState([]);
  const [linkData22, showLinkData22] = useState(false);

  const allEnd = 5;
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSorted, setisSorted] = useState(false);
  const [sortVal, setSortVal] = useState(0);
  const [sortField, setSortField] = useState(1);
  const [accend, setAccend] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [big, setBig] = useState(1);
  const [end, setEnd] = useState(allEnd);
  const [atPage, setAtpage] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    showLinkData(1);
    setIsActive(false);
  }, []);

  useEffect(() => {
    const dynamicPage = Math.ceil(count / allEnd);
    setTotalPage(dynamicPage)
  }, [count]);

  const showLinkData = (p) => {

    let remainApiPath = "";
    let val = sortVal;
    let field = sortField;
    setAtpage(p);
    if (isActive == true) {
      remainApiPath = `customers/getimportantlink?page=${p}&orderby=${val}&orderbyfield=${field}`
    }else{
      remainApiPath = `customers/getimportantlink?page=${p}`
    }
    axios.get(`${baseUrl}/${remainApiPath}`).then((res) => {
      console.log("res", res);
      let dataObj = {};
      let dataList = [];
      let customId = 1;
      if (p > 1) {
        customId = allEnd * (p - 1) + 1;
      }
      if (res.data.code === 1) {
        res.data.result.map((i, e) => {
          dataObj = {
            sn: ++e,
            content: i.content,
            file: i.file,
            heading: i.heading,
            id: i.id,
            url: i.url,
            status: i.status,
            type: i.type,
            writer: i.writer,
            cid: customId++,
          };
          dataList.push(dataObj);
        });
        setLinkData(dataList);
        showLinkData22(true);
        setCount(res.data.total);
        let end = p * allEnd;

        if (end > res.data.total) {
          end = res.data.total;
        }
        let rem = (p - 1) * allEnd;
        if (p === 1) {
          if((res.data.total)< allEnd){
            setBig(res.data.total);
            setEnd(end);
          }else{
          setBig(rem + p);
          setEnd(end);
          }
        } else {
          setBig(rem + 1);
          setEnd(end);
        }
      }
    });
  };

  //page counter
  const prevChunk = () => {
    if (((atPage <= (totalPage)) && (atPage > 1))) {
      setAtpage((atPage) => atPage - 1);
      setPage(atPage - 1);
      showLinkData(atPage - 1);
    }
  };
  const nextChunk = () => {
    if ((atPage > 0) && (atPage < (totalPage))) {
      setAtpage((atPage) => atPage + 1);
      setPage(atPage + 1);
      showLinkData(atPage + 1);
    }
  };

  const sortMessage = (val, field) => {
    setAtpage(1);
    setPage(1);
    setIsActive(true);
    setSortVal(val);
    setSortField(field);
    let obj = {
      val: val,
      field: field,
    }
    setAccend(!accend);
    axios
      .get(
        `${baseUrl}/customers/getimportantlink?page=1&orderby=${val}&orderbyfield=${field}`,
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
              url: i.url,
              cid: customId++,
            };
            dataList.push(dataObj);
          });
          console.log(dataList);
          let end = 1 * allEnd;
          // let dynamicPage = Math.ceil(res.data.total / allEnd);
          setLinkData(dataList);
          setCount(res.data.total);
          let rem = 0 * allEnd;
          setBig(rem + 1);
          setEnd(end);
        }
      });

  }

  return (
    <>
      <OuterloginContainer>
        <Header noSign="noSign" />
        <MyContainer>
          <div className={classesCustom.articleContent}>
            <div className={classesCustom.articlesDetails}>
              <>
                <TableContainer>
                  {linkData22 === true ? (
                    <>
                      <Breadcrumbs
                        separator="<"
                        maxItems={3}
                        aria-label="breadcrumb"
                        style={{ fontSize: "18px" }}
                      >
                        <Link
                          underline="hover"
                          color="inherit"
                          to={{
                            pathname: "/customer/updates",
                            index: 3,
                          }}
                        >
                          Important links
                        </Link>
                      </Breadcrumbs>
                      <div className="customPagination">
                        <div className="ml-auto mt-1 d-flex w-100 align-items-center justify-content-end">
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
                      <div className={classesCustom.articleContent}>
                        <div className={classesCustom.articlesDetails}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell style={{ width: "50px" }}>
                                  <SubHeading>S.No</SubHeading>
                                </TableCell>
                                <TableCell style={{ width: "400px" }}>
                                  {accend == true ? (
                                    <SubHeading onClick={() => sortMessage(1, 1)}>
                                      Website  <ArrowDropDownIcon />
                                    </SubHeading>
                                  ) : (
                                    <SubHeading onClick={() => sortMessage(0, 1)}>
                                      Website <ArrowDropUpIcon />
                                    </SubHeading>
                                  )
                                  }
                                </TableCell>
                                <TableCell>
                                  <SubHeading>URL</SubHeading>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {linkData?.map((i, e) => (
                                <>
                                  <TableRow>
                                    <TableCell
                                      style={{ padding: "8px 16px" }}
                                      className="tableCellStyle"
                                    >
                                      <CustomTypography>
                                        {e + 1}
                                      </CustomTypography>
                                    </TableCell>
                                    <TableCell>
                                      <CustomTypography>
                                        {i.heading}
                                      </CustomTypography>
                                    </TableCell>
                                    <TableCell>
                                      <CustomTypography>
                                        <a
                                          href={i.url}
                                          target="_blank"
                                          className="tabHoverLinksubMenu"
                                        >
                                          {i.url}
                                        </a>
                                      </CustomTypography>
                                    </TableCell>
                                  </TableRow>
                                </>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </TableContainer>
              </>
            </div>
          </div>
        </MyContainer>

        <Footer />
      </OuterloginContainer>
    </>
  );
}

export default Linklist;
