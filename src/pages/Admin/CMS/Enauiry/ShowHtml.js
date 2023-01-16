import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useState } from "react";
import { Markup } from "interweave";
const ShowHtml = ({ mailerBody, openHandler, viewHtml }) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Modal isOpen={viewHtml} toggle={openHandler} scrollable size="lg">
      <ModalHeader toggle={openHandler}>Mailer body</ModalHeader>
      <ModalBody>
        <Markup content={mailerBody} />
      </ModalBody>
    </Modal>
  );
};
export default ShowHtml;
