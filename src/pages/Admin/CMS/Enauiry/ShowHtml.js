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

  return (
    <Modal isOpen={viewHtml} toggle={openHandler} scrollable size="md">
      <ModalHeader toggle={openHandler}>
        <div>
          <>
            {totalType?.map((i) => (
              <>
                {i === "0" ? (
                  <p style={{ margin: "0px" }}>Admin</p>
                ) : (
                  <>
                    {i === "1" ? (
                      <p style={{ margin: "0px" }}>All client</p>
                    ) : (
                      <>
                        {i === "2" ? (
                          <p style={{ margin: "0px" }}>All TL</p>
                        ) : (
                          <>
                            {i === "3" ? (
                              <p style={{ margin: "0px" }}>All TP</p>
                            ) : (
                              <span
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  flexWrap: "wrap",
                                }}
                              >
                                <CustomHeading font={18}>To : </CustomHeading>
                                <span
                                  style={{
                                    display: "flex",

                                    flexWrap: "wrap",
                                  }}
                                >
                                  {subject.email_list
                                    ?.split(",")
                                    .map((i, e) => (
                                      <>
                                        <CustomTypography>{i}</CustomTypography>
                                        <>
                                          {e !==
                                          subject.email_list.split(",").length -
                                            1
                                            ? ","
                                            : ""}
                                        </>
                                      </>
                                    ))}
                                </span>
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
          {subject && (
            <div
              style={{
                display: "flex",

                width: "100%",
                alignItems: "center",
              }}
            >
              <span style={{ display: "flex", marginRight: "10px" }}>
                <CustomHeading font={18}>Subject :</CustomHeading>
              </span>
              <span style={{ marginTop: "5px" }}>
                <CustomTypography>{subject.subject}</CustomTypography>
              </span>
            </div>
          )}
          <CustomHeading font={18}>Mailer body</CustomHeading>
        </div>
      </ModalHeader>
      <ModalBody>
        <Markup content={mailerBody} />
      </ModalBody>
    </Modal>
  );
};
export default ShowHtml;
