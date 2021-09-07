import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";


import AllAssignment from "./AllAssignment";
import InprogressAssignment from "./InprogressAssignment";
import CompletedAssignment from "./CompletedAssignment";
import CustomerDeclinedPayment from "./CustomerDeclinedPayment";



function AssignmentTab(props) {
  const userId = window.localStorage.getItem("userid");

  const [tabIndex, setTabIndex] = useState(0);
  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);


  const [allassignment, setAllAssignment] = useState("");
  const [inprogressAssignmentCount, setInprogressAssignmentCount] = useState("");
  const [completeAssignment, setCompleteAssignment] = useState("");
  const [declinedAssignment, setDeclinedAssignment] = useState("");


  useEffect(() => {
    getAllAssignment();
    getInprogressAssignment();
    getCompletedAssignment();
    getCustomerDeclinedPayment();
  }, []);


  const getAllAssignment = () => {
    axios
      .get(`${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}`)
      .then((res) => {
        console.log(res);
        setAllAssignment(res.data.result.length);
      });
  };

  const getInprogressAssignment = () => {
    axios
      .get(`${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}&status=1`)
      .then((response) => {
        console.log("code---", response);
        if (response.data.code === 1) {
          setInprogressAssignmentCount(response.data.result.length);
        }
      })
  };

  const getCompletedAssignment = () => {
    axios
      .get(`${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}&status=2`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setCompleteAssignment(res.data.result.length);
        }
      });
  };

  const getCustomerDeclinedPayment = () => {
    axios
      .get(`${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}&status=3`)
      .then((response) => {
        console.log("code---", response);
        if (response.data.code === 1) {
          setDeclinedAssignment(response.data.result.length);
        }
      })
  };



  const myStyle1 = {
    backgroundColor: "grey",
    padding: "12px",
    borderRadius: "50px",
    width: "200px",
    textAlign: "center",
    color: "white",
    cursor: "pointer",
  };

  const myStyle2 = {
    padding: "12px",
    borderRadius: "50px",
    width: "200px",
    textAlign: "center",
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer",
  };





  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <div>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList
            style={{
              listStyleType: "none",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Tab style={tabIndex == 0 ? myStyle2 : myStyle1}>
              All Assignment ({allassignment})
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
              Inprogress; Assignments ({inprogressAssignmentCount})
            </Tab>

            <Tab style={tabIndex == 2 ? myStyle2 : myStyle1}>
              Completed; Assignments ({completeAssignment})
            </Tab>

            <Tab style={tabIndex == 3 ? myStyle2 : myStyle1}>
              Customer Declined; Payment ({declinedAssignment})
            </Tab>
          </TabList>

          <TabPanel>
            <AllAssignment />
          </TabPanel>

          <TabPanel>
            <InprogressAssignment />
          </TabPanel>

          <TabPanel>
            <CompletedAssignment />
          </TabPanel>

          <TabPanel>
            <CustomerDeclinedPayment />
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
}

export default AssignmentTab;






{/* {!row.final_report == "" ? (
                  <div title="Final Report">
                    <a
                      href={`http://65.0.220.156/mazarapi/assets/upload/report/${row.assign_no}/${row.final_report}`}
                      target="_blank"
                    >
                      <i class="fa fa-file-text" style={{ fontSize: "16px" }}></i>
                    </a>
                  </div>
                ) : row.assignment_draft_report ? (
                  <div title="Draft Report">
                    <a
                      href={`http://65.0.220.156/mazarapi/assets/upload/report/${row.assign_no}/${row.assignment_draft_report}`}
                      target="_blank"
                    >
                      <i class="fa fa-file-text" style={{ fontSize: "16px" }}></i>
                    </a>
                  </div>
                ) : null} */}


{/* {row.vstart < 11 &&
                row.vend >= 0 &&
                !(row.vstart == null && row.vend == null) ? (
                <div style={{ cursor: "pointer" }} title="Video Chat">
                  <i
                    class="fa fa-video-camera"
                    style={{ color: "red", fontSize: "16px" }}
                    onClick={() => handleJoin(row.id)}
                  ></i>
                </div>
              ) : null} */}

{/* <div title="Send Message">
                <Link
                  to={{
                    pathname: `/customer/chatting/${row.id}`,
                    obj: {
                      message_type: "3",
                      query_No: row.assign_no,
                      query_id: row.id,
                      routes: `/customer/assignment`
                    }
                  }}
                >
                  <i
                    class="fa fa-comments-o"
                    style={{
                      fontSize: 16,
                      cursor: "pointer",
                      marginLeft: "8px",
                      color: "blue"
                    }}
                  ></i>
                </Link>
              </div>

              <div title="Send Feedback" style={{ cursor: "pointer" }}>
                <Link to={`/customer/feedback/${row.assign_no}`}>
                  <FeedbackIcon />
                </Link>
              </div> */}