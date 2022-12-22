import React from "react";
import {
  Box,
  Typography,
  Card,
  Container,
  CardHeader,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import MyPDF from "../ManualImg/manual.pdf";
import mainContent from "../ManualImg/mainContent.png";
const Content = () => {
  const goToRow = (e) => {
    const anchor = document.querySelector(e);
    console.log("an", anchor);
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  return (
    <>
      <Box
        style={{
          display: "flex",
          maxWidth: "900px",
          margin: "auto",
          minHeight: "500px",
          flexDirection: "column",
          padding: "10px 15px",
        }}
      >
        <Container maxWidth="xl">
          <Card>
            <CardContent>
              <CardMedia component="img" src={mainContent} />
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Box
        style={{
          display: "flex",
          maxWidth: "900px",
          margin: "auto",
          minHeight: "500px",
          flexDirection: "column",
          padding: "10px 15px",
        }}
      >
        <Container maxWidth="xl">
          <Card>
            <div className="row mx-1 my-2">
              <div className="col-md-6">
                <Typography
                  variant="h4"
                  style={{
                    color: "#0071ce",
                    margin: "10px 0px",
                    fontSize: "22px",
                    fontWeight: 700,
                  }}
                >
                  Contents
                </Typography>
              </div>
              <div
                className="col-md-6"
                style={{
                  display: "flex",
                  margin: "10px 0px",
                  justifyContent: "flex-end",
                }}
              >
                <a href={MyPDF} className="btn btn-secondary" target="_blank">
                  Download Manual
                </a>
              </div>
            </div>

            <CardContent>
              <table
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100vw",
                }}
              >
                <tr
                  onClick={() => goToRow("#onlyLogin")}
                  style={{ display: "flex" }}
                >
                  <td className="modalManualTable">New Client Registration</td>

                  <td className="modalManualTablePage">03</td>
                </tr>
                <tr
                  onClick={() => goToRow("#existing")}
                  style={{ display: "flex" }}
                >
                  <td className="modalManualTable">
                    Existing Client & Secondary Email Users Login
                  </td>

                  <td className="modalManualTablePage">08</td>
                </tr>

                <tr
                  onClick={() => goToRow("#forgetPassword")}
                  style={{ display: "flex" }}
                >
                  <td className="modalManualTable">Forgot Password</td>

                  <td className="modalManualTablePage">10</td>
                </tr>
                <tr
                  onClick={() => goToRow("#changePassword")}
                  style={{ display: "flex" }}
                >
                  <td className="modalManualTable">Change Password</td>

                  <td className="modalManualTablePage">14</td>
                </tr>
                <tr
                  onClick={() => goToRow("#freshQuery")}
                  style={{ display: "flex" }}
                >
                  <td className="modalManualTable">Registering Fresh Query</td>

                  <td className="modalManualTablePage">22</td>
                </tr>

                <tr
                  onClick={() => goToRow("#proposalProcessing")}
                  style={{ display: "flex" }}
                >
                  <td className="modalManualTable">Proposal Processing </td>

                  <td className="modalManualTablePage">40</td>
                </tr>
                <tr
                  onClick={() => goToRow("#assignProcess")}
                  style={{ display: "flex" }}
                >
                  <td className="modalManualTable">Assignment Process</td>

                  <td className="modalManualTablePage">52</td>
                </tr>
                <tr
                  onClick={() => goToRow("#paymentProcess")}
                  style={{ display: "flex" }}
                >
                  <td className="modalManualTable">Making Payment</td>

                  <td className="modalManualTablePage">60</td>
                </tr>
                <tr
                  onClick={() => goToRow("#mazarDashboard")}
                  style={{ display: "flex" }}
                >
                  <td className="modalManualTable">Mazars Dashboard</td>

                  <td className="modalManualTablePage">68</td>
                </tr>
                <tr
                  onClick={() => goToRow("#showMessage")}
                  style={{ display: "flex" }}
                >
                  <td className="modalManualTable">Message Inbox</td>

                  <td className="modalManualTablePage">69</td>
                </tr>
                <tr
                  onClick={() => goToRow("#seceduler")}
                  style={{ display: "flex" }}
                >
                  <td className="modalManualTable">
                    Scheduling a Video Conference/ Meeting
                  </td>

                  <td className="modalManualTablePage">71</td>
                </tr>
                <tr
                  onClick={() => goToRow("#feedbackProcess")}
                  style={{ display: "flex" }}
                >
                  <td className="modalManualTable">Sending Feedback</td>

                  <td className="modalManualTablePage">74</td>
                </tr>
              </table>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};
export default Content;
