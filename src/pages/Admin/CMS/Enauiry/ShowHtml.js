import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useState } from "react";
import { Markup } from "interweave";
import CustomTypography from "../../../../components/Common/CustomTypography";
import CustomHeading from "../../../../components/Common/CustomHeading";
const ShowHtml = ({ mailerBody, openHandler, viewHtml, subject }) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Modal isOpen={viewHtml} toggle={openHandler} scrollable size="lg">
      <ModalHeader toggle={openHandler}>
        {subject && <CustomHeading>Subject : {subject.subject}</CustomHeading>}
        <CustomHeading>Mailer body</CustomHeading>
      </ModalHeader>
      <ModalBody>
        <Markup content={mailerBody} />
      </ModalBody>
    </Modal>
  );
};
export default ShowHtml;
