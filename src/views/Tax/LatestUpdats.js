import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../config/config";
import { useHistory } from "react-router";
import { Markup } from "interweave";
import Footer from "../../components/Footer/Footer";
import classes from "./design.module.css";
import FlashSection from "../../components/Common/FlashSection";
import { OuterloginContainer } from "../../components/Common/OuterloginContainer";
import MyContainer from "../../components/Common/MyContainer";
import SubHeading from "../../components/Common/SubHeading";
import CustomTypography from "../../components/Common/CustomTypography";
import Cookies from "js-cookie";
import { Viewer } from "@react-pdf-viewer/core"; // install this library
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core"; // install this library
import { useParams } from "react-router";
import CookieConsent from "react-cookie-consent";
import CloseIcon from "@material-ui/icons/Close";
import CustomHeading from "../../components/Common/CustomHeading";
import MainText from "../../components/Common/MainText";
const LatestUpdates = () => {
  const [news, getNews] = useState([]);
  const [showCookie, setShowCookie] = useState(false);
  const [description, setDescription] = useState({});
  const cookieEnable = Cookies.get("accept");
  let history = useHistory();
  let getId = useParams();

  useEffect(() => {
    latestNews();
  }, []);
  const latestNews = () => {
    axios.get(`${baseUrl}/customers/getnews`).then((res) => {
      let pp = [];

      if (res.data.code === 1) {
        res.data.result.map((i) => {
          pp.push(i);
          if (i.id === getId.id) {
            setDescription(i);
          }
        });
        getNews(pp);
      }
    });
  };
  const showCook = () => {
    setShowCookie(true);
  };
  const myCookie2 = () => {
    if (cookieEnable) {
      history.push("/customer/signup");
    } else {
      showCook();
    }
  };

  const styles = {
    display: "flex",
    fontSize: "1em",
  };

  return (
    <>
      <OuterloginContainer>
        <Header noSign="noSign" />

        {showCookie === true ? (
          <div className="popup">
            <CookieConsent
              debug={true}
              declineButtonText={<CloseIcon />}
              onDecline={() => {
                setShowCookie(false);
              }}
              enableDeclineButton
              disableStyles
              location="none"
              buttonText="Agree"
              expires={1}
              overlay
              declineButtonClasses="myCookiesdecBtn"
              buttonStyle={{
                borderBottomLeftRadius: "1.75rem",

                backgroundColor: "#0071CE",
                border: "1px solid #0071CE",
                color: "#fff",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 500,
                minWidth: "100px",
                minHeight: "3rem",
                textAlign: "center",
                display: "block",
                marginLeft: "auto",
              }}
              onAccept={(e) => {
                Cookies.set("accept", "agree");
              }}
              overlayClasses="overlayclass"
            >
              <CustomHeading>Disclaimer</CustomHeading>
              <SubHeading>
                By clicking on the "Agree" button below, the user hereby
                acknowledges having read and understood the disclaimer below:
              </SubHeading>
              <ul>
                <li>
                  <CustomTypography>
                    The user on his own accord wishes to know more about Mazars
                    Advisory Solutions (MAS) and any of its members for his own
                    information and use.
                  </CustomTypography>
                </li>
                <li>
                  <CustomTypography>
                    The user acknowledges that there has been no solicitation,
                    invitation, or inducement of any sort whatsoever from MAS or
                    any of its members to create an Attorney/Consultant-Client
                    relationship.
                  </CustomTypography>
                </li>
                <li>
                  <CustomTypography>
                    The user acknowledges that MAS makes every effort to
                    maintain updated and accurate information on this website
                    and cannot accept responsibility for any prejudice, loss or
                    damage which may occur from use of such information. MAS
                    assumes no liability for the interpretation or use of
                    content or information contained on this website, nor does
                    it offer any warranty of any kind, either express or implied
                    in relation to such content or information.
                  </CustomTypography>
                </li>

                <li>
                  <CustomTypography>
                    The user acknowledges that MAS does not intend that links /
                    URLs contained on this website re-directing users to third
                    party websites be considered as referrals to, endorsements
                    of, or affiliations with any such third-party website
                    operators. MAS is not responsible for, and makes no
                    representation or warranty, express or implied, about the
                    content or information contained on such third-party
                    websites.
                  </CustomTypography>
                </li>
              </ul>
            </CookieConsent>
          </div>
        ) : (
          <MyContainer>
            {news.length > 0 ? (
              <FlashSection>
                {cookieEnable ? (
                  <marquee
                    id="scroll_news"
                    onMouseOver={(e) => {
                      document.getElementById("scroll_news").stop();
                    }}
                    onMouseOut={(e) => {
                      document.getElementById("scroll_news").start();
                    }}
                  >
                    <span style={styles}>
                      {news.map((k, e) => (
                        <Link
                          className="tabHoverflash mx-2 my-0"
                          to={{
                            pathname: `/customer/latestupdates/${k.id}`,
                            index: k.id,
                          }}
                        >
                          {`${k.heading}`}
                          {news.length - 1 === e ? (
                            ""
                          ) : (
                            <>
                              <span>&nbsp; &nbsp; | &nbsp; &nbsp;</span>{" "}
                            </>
                          )}
                        </Link>
                      ))}
                    </span>
                  </marquee>
                ) : (
                  <marquee
                    id="scroll_news_disale"
                    onMouseOver={(e) => {
                      document.getElementById("scroll_news_disale").stop();
                    }}
                    onMouseOut={(e) => {
                      document.getElementById("scroll_news_disale").start();
                    }}
                  >
                    <span style={styles}>
                      {news.map((k, e) => (
                        <p
                          className="tabHoverflash mx-2 my-0"
                          onClick={() => myCookie2("contactbasic")}
                        >
                          {`${k.heading}`}
                          {news.length - 1 === e ? (
                            ""
                          ) : (
                            <>
                              <span>&nbsp; &nbsp; | &nbsp; &nbsp;</span>{" "}
                            </>
                          )}
                        </p>
                      ))}
                    </span>
                  </marquee>
                )}
              </FlashSection>
            ) : (
              ""
            )}
            <div className={classes.articleContent}>
              <div className={classes.articlesDetails}>
                <MainText className="my-3">{description.heading}</MainText>
                {description.content_type === "2" ? (
                  <Markup content={description.news} />
                ) : (
                  ""
                )}

                {description.content_type === "0" ||
                description.content_type === "1" ? (
                  <div>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                      <Viewer
                        fileUrl={`${baseUrl3}/${description.file}`}
                      ></Viewer>
                    </Worker>
                  </div>
                ) : (
                  ""
                )}

                {description.content_type === "3" ? (
                  <div id="artContent">
                    <iframe
                      src={`https://view.officeapps.live.com/op/embed.aspx?src=${baseUrl3}/${description.file}`}
                      width="100%"
                      height="600px"
                      frameBorder="0"
                      title="slides"
                    ></iframe>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </MyContainer>
        )}
        <Footer />
      </OuterloginContainer>
    </>
  );
};
export default LatestUpdates;
