import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import BasicQuery from "./BasicQuery";
import ProposalDetails from "./ProposalDetails";
import AssignmentDetails from "./AssignmentDetails";
import AdditionalQuery from "./AdditionalQuery";
import AddAdditionalQuery from "./AddAdditionalQuery";
import DraftReports from "./DraftReports";
import CommonServices from "../../common/common";
import QueryRecording from "./QueryRecording";
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Card, Row, Col
} from 'reactstrap';
import classnames from 'classnames';
import Feedback from './Feedback'


function QueryDetails({
  overDue,
  p,
  diaplaySpecific,
  diaplayProposal,
  diaplayHistory,
  diaplayAssignment,
  displayQuery,
  assingNo,
  getQuery,
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
  panel
}) {
 


  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              Basic Query Information
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              Proposal
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >
              Assignment
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => { toggle('4'); }}
            >
              Feedback
            </NavLink>
          </NavItem>
          {customerQuery === "customerQuery" ? null :
          <NavItem>
            <NavLink
            className = {classnames({ active : activeTab === '5'})}
            onClick = {() => { toggle('5');}} >
              Recording
            </NavLink>
          </NavItem> }
         

        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
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
                    panel = {panel}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Card body>
                  <ProposalDetails
                    diaplayProposal={diaplayProposal}
                    diaplayHistory={diaplayHistory}
                    paymentDetails={paymentDetails}
                    p={p}
                    accept={accept}
                    tlName2={tlName2}
                    tp22 = {tp22}
                    tpStatus={tpStatus}
                    overDue = {overDue}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <Card body>
                  <AssignmentDetails
                    diaplayAssignment={diaplayAssignment}
                    p={p}
                    diaplayProposal={diaplayProposal}
                    reports={reports}
                    assingNo={assingNo}
                    submitData = {submitData}
                    customerQuery = {customerQuery}
                    finalDate={finalDate}
                    panel = {panel}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>


          <TabPane tabId="4">
            <Row>
              <Col sm="12">
                <Card body>
                  <Feedback
                    feedback={feedback}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>
          {
            customerQuery === "customerQuery" ? null :
<TabPane tabId="5">
         <Row>
           <Col sm="12">
             <Card body>
               <QueryRecording
  assingNo={p.assign_no}/>
             </Card>
           </Col>
           </Row>
       </TabPane>
          }
       
          

        </TabContent>
      </div>

    </>
  );
}

export default QueryDetails;

