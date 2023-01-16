import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useState } from "react";
import { Markup } from "interweave";
import CustomTypography from "../../../../components/Common/CustomTypography";
import CustomHeading from "../../../../components/Common/CustomHeading";
const ShowHtml = ({
  mailerBody,
  openHandler,
  viewHtml,
  subject,
  totalType,
}) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(!open);
  };
  console.log("totalType", totalType);

  return (
    <Modal isOpen={viewHtml} toggle={openHandler} scrollable size="lg">
      <ModalHeader toggle={openHandler}>
        <>
          {totalType.map((i) => (
            <>
              {i === "0" ? (
                <p>Admin</p>
              ) : (
                <>
                  {i === "1" ? (
                    <p>All client</p>
                  ) : (
                    <>
                      {i === "2" ? (
                        <p>All TL</p>
                      ) : (
                        <>
                          {i === "3" ? (
                            <p>All TP</p>
                          ) : (
                            <span
                              style={{
                                display: "flex",
                                width: "100%",
                                flexWrap: "wrap",
                              }}
                            >
                              <span>To : </span>
                              {subject.email_list.split(",").map((i) => (
                                <span>{i}</span>
                              ))}
                            </span>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          ))}
        </>
        {subject && <CustomHeading>Subject : {subject}</CustomHeading>}
        <CustomHeading>Mailer body</CustomHeading>
      </ModalHeader>
      <ModalBody>
        <Markup content={mailerBody} />
      </ModalBody>
    </Modal>
  );
};
export default ShowHtml;
