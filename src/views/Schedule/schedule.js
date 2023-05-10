import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
} from "reactstrap";
import Demo from "./demo";
import ModalManual from "../ModalManual/AllComponentManual";
import { HelpIcon } from "../../components/Common/MessageIcon";
import CustomHeading from "../../components/Common/CustomHeading";
function Schedule() {
  const [openManual, setManual] = useState(false);
  const userId = window.localStorage.getItem("userid");
  const needHelp = () => {
    setManual(!openManual);
  };

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="7">
              <CustomHeading>Schedule</CustomHeading>
            </Col>
            <Col md="5">
              <span onClick={(e) => needHelp()}>
                {" "}
                <HelpIcon />
              </span>
            </Col>
          </Row>
        </CardHeader>

        <Demo />
      </Card>
      <Modal isOpen={openManual} toggle={needHelp} size="lg">
        <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
        <ModalBody>
          <ModalManual tar={"schedule"} />
        </ModalBody>
      </Modal>
    </Layout>
  );
}

export default Schedule;
