import React, { useState } from "react";
import BasicQuery from "./BasicQuery";
import ProposalDetails from "./ProposalDetails";
import AssignmentDetails from "./AssignmentDetails";
import QueryRecording from "./QueryRecording";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Card } from "reactstrap";
import classnames from "classnames";
import Feedback from "./Feedback";
import { TabPane } from "reactstrap";

function QueryDetails({
  overDue,
  p,
  diaplaySpecific,
  diaplayProposal,
  diaplayHistory,
  diaplayAssignment,
  assingNo,
  customerQuery,
  queryDocs,
  purpose,
  paymentDetails,
  year,
  feedback,
  reports,
  submitData,
  accept,
  tlName2,
  tp22,
  tpStatus,
  declined2,
  declinedStatus,
  finalDate,
  qstatus,
  panel,
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const myStyle1 = {
    margin: "10px auto",
    fontSize: "18px",
    cursor: "pointer",
  };
  const myStyle2 = {
    margin: "10px auto",

    color: "#42566a",
    fontSize: "18px",
    cursor: "pointer",
  };
  return (
    <>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="fixedTab">
          <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
            Basic query information
          </Tab>
          <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
            Proposal
          </Tab>
          <Tab style={tabIndex == 2 ? myStyle2 : myStyle1} className="tabHover">
            Assignment
          </Tab>
          <Tab style={tabIndex == 3 ? myStyle2 : myStyle1} className="tabHover">
            Feedback
          </Tab>
          <Tab style={tabIndex == 3 ? myStyle2 : myStyle1} className="tabHover">
            Recording
          </Tab>
        </TabList>

        <TabPanel>
          <Card body>
            <BasicQuery
              p={p}
              diaplaySpecific={diaplaySpecific}
              purpose={purpose}
              queryDocs={queryDocs}
              year={year}
              declined2={declined2}
              declinedStatus={declinedStatus}
              qstatus={qstatus}
              panel={panel}
            />
          </Card>
        </TabPanel>
        <TabPanel>
          <Card body>
            <ProposalDetails
              diaplayProposal={diaplayProposal}
              diaplayHistory={diaplayHistory}
              paymentDetails={paymentDetails}
              p={p}
              accept={accept}
              tlName2={tlName2}
              tp22={tp22}
              tpStatus={tpStatus}
              panel={panel}
              overDue={overDue}
            />
          </Card>
        </TabPanel>
        <TabPanel>
          <Card body>
            <AssignmentDetails
              diaplayAssignment={diaplayAssignment}
              p={p}
              diaplayProposal={diaplayProposal}
              reports={reports}
              assingNo={assingNo}
              submitData={submitData}
              customerQuery={customerQuery}
              finalDate={finalDate}
              panel={panel}
            />
          </Card>
        </TabPanel>
        <TabPanel>
          <Card body>
            <Feedback feedback={feedback} />
          </Card>
        </TabPanel>
        <TabPanel>
          <Card body>
            <QueryRecording assingNo={p.assign_no} />
          </Card>
        </TabPanel>
      </Tabs>
    </>
  );
}

export default QueryDetails;
