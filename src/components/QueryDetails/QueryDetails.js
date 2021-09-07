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
  reports
}) {
  console.log("p", p);

  // const history = useHistory();

  // const [addModal, setAddModal] = useState(false);
  // const addHandler = () => {
  //   console.log("addhandler")
  //   setAddModal(!addModal);
  // }


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
          <NavItem>
            <NavLink
            className = {classnames({ active : activeTab === '5'})}
            onClick = {() => { toggle('5');}} >
              Recording
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '5' })}
              onClick={() => { toggle('5'); }}
            >
              UPLOAD ADDITIONAL DOCUMENTS
            </NavLink>
          </NavItem> */}

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
          

        </TabContent>
      </div>

    </>
  );
}

export default QueryDetails;

