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
        <CustomHeading>{subject}</CustomHeading>
      </ModalHeader>
      <ModalBody>
        <CustomHeading>Mailer body</CustomHeading>
        <Markup content={mailerBody} />
      </ModalBody>
    </Modal>
  );
};
export default ShowHtml;
