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
function Linklist() {
  const [linkData, setLinkData] = useState([]);
  const [linkData22, showLinkData22] = useState(false);

  useEffect(() => {
    showLinkData();
  }, []);
  const showLinkData = () => {
    axios.get(`${baseUrl}/customers/getimportantlink`).then((res) => {
      console.log("res", res);
      if (res.data.code === 1) {
        setLinkData(res.data.result);
        showLinkData22(true);
      }
    });
  };

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
                      <div className={classesCustom.articleContent}>
                        <div className={classesCustom.articlesDetails}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell style={{ width: "50px" }}>
                                  <SubHeading>S.No</SubHeading>
                                </TableCell>
                                <TableCell style={{ width: "400px" }}>
                                  <SubHeading>Website</SubHeading>
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
