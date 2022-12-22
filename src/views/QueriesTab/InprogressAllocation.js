import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Card, CardHeader, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import Records from "../../components/Records/Records";
import AdditionalQueryModal from "./AdditionalQueryModal";
import Swal from "sweetalert2";
import CommonServices from "../../common/common";
import DiscardReport from "../AssignmentTab/DiscardReport";
import moment from "moment";
import ModalManual from "../ModalManual/AllComponentManual";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import MessageIcon, {
  DeleteIcon,
  EditQuery,
  ViewDiscussionIcon,
  HelpIcon,
  UploadDocument,
  FeedBackICon,
} from "../../components/Common/MessageIcon";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";
import { useHistory } from "react-router";

function InprogressAllocation(
  allQueriesCount,
  setAllQueriesCount,
  CountAllQuery
) {
  const userId = window.localStorage.getItem("userid");
  const [query, setQuery] = useState([]);
  const [records, setRecords] = useState([]);

  const [assignNo, setAssignNo] = useState("");
  const [additionalQuery, setAdditionalQuery] = useState(false);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [openManual, setManual] = useState(false);

  const additionalHandler = (key) => {
    setAdditionalQuery(!additionalQuery);
    setAssignNo(key);
  };

  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key);
  };

  const needHelp = () => {
    setManual(!openManual);
  };

  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: () => {
        return {
          width: "50px",
        };
      },
    },
    {
      text: "Date",
      dataField: "created",
      sort: true,

      formatter: function dateFormatter(cell, row) {
        return <>{CommonServices.changeFormateDate(row.created)}</>;
      },
    },
    {
      text: "Query No",
      dataField: "assign_no",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <Link
              to={{
                pathname: `/customer/my-assingment/${row.id}`,
                index: 1,
                routes: "queries",
              }}
            >
              {row.assign_no}
            </Link>
          </>
        );
      },
    },
    {
      text: "Category",
      dataField: "parent_id",
      sort: true,
    },
    {
      text: "Sub Category",
      dataField: "cat_name",
      sort: true,
    },
    {
      text: "Status",
      dataField: "",

      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.status}/
              {row.status == "Inprogress Query" ? (
                <p className="inprogress">{row.status_message}</p>
              ) : row.status == "Declined Query" ? (
                <p className="declined">{row.status_message}</p>
              ) : row.status == "Completed Query" ? (
                <p className="completed">{row.status_message}</p>
              ) : null}
            </div>
          </>
        );
      },
    },
    {
      text: "Expected / Actual Delivery Date",
      dataField: "exp_delivery_date",
      sort: true,

      formatter: function dateFormat(cell, row) {
        return (
          <>
            {row.status == "Declined Query" ? null : row.status_code != "3" &&
              row.status_code > "1" ? (
              <>
                {row.final_discussion === "completed"
                  ? CommonServices.removeTime(row.final_date)
                  : CommonServices.removeTime(row.exp_delivery_date)}
              </>
            ) : null}
          </>
        );
      },
    },
    {
      text: "Action",

      formatter: function (cell, row) {
        var dateMnsFive = moment(row.exp_delivery_date)
          .add(15, "day")
          .format("YYYY-MM-DD");

        var curDate = moment().format("YYYY-MM-DD");

        return (
          <>
            {row.status == "Declined Query" ? (
              <>
                <>
                  {dateMnsFive > curDate === true ? (
                    <span className="ml-1">
                      <Link
                        to={{
                          pathname: `/customer/feedback/${row.assign_no}`,
                          index: 1,
                          routes: "queries",
                        }}
                      >
                        <FeedBackICon />
                      </Link>
                    </span>
                  ) : (
                    ""
                  )}

                  <span
                    onClick={() => ViewDiscussionToggel(row.assign_no)}
                    className="ml-1"
                  >
                    <ViewDiscussionIcon />
                  </span>
                </>
              </>
            ) : (
              <>
                {row.status_code == "0" ||
                row.status_code == "1" ||
                row.status_code == "3" ? (
                  <>
                    <span className="ml-1">
                      <Link to={`/customer/edit-query/${row.id}`}>
                        <EditQuery />
                      </Link>
                    </span>

                    <span onClick={() => del(row.id)} className="ml-1">
                      <DeleteIcon />
                    </span>
                    <span className="ml-1">
                      <Link
                        to={{
                          pathname: `/customer/chatting/${row.id}&type=4`,
                          index: 1,
                          routes: "queries",
                          obj: {
                            message_type: "4",
                            query_No: row.assign_no,
                            query_id: row.id,
                            routes: `/customer/queries`,
                          },
                        }}
                      >
                        <MessageIcon />
                      </Link>
                    </span>
                    <span
                      onClick={() => ViewDiscussionToggel(row.assign_no)}
                      className="ml-1"
                    >
                      <ViewDiscussionIcon />
                    </span>
                  </>
                ) : null}

                {row.status_code == "4" ||
                8 < parseInt(row.status_code) ||
                row.status_code == "2" ? (
                  <>
                    {dateMnsFive > curDate === true ? (
                      <span className="ml-1">
                        <Link
                          to={{
                            pathname: `/customer/feedback/${row.assign_no}`,
                            index: 1,
                            routes: "queries",
                          }}
                        >
                          <FeedBackICon />
                        </Link>
                      </span>
                    ) : (
                      ""
                    )}
                    {row.delivery_report == "completed" ? null : (
                      <span
                        className="ml-1"
                        onClick={() => additionalHandler(row.assign_no)}
                      >
                        <UploadDocument />
                      </span>
                    )}
                    {row.status_code == "10" ? null : (
                      <span className="ml-1">
                        <Link
                          to={{
                            pathname: `/customer/chatting/${row.id}&type=4`,
                            index: 1,
                            routes: "queries",
                            obj: {
                              message_type: "4",
                              query_No: row.assign_no,
                              query_id: row.id,
                              routes: `/customer/queries`,
                            },
                          }}
                        >
                          <MessageIcon />
                        </Link>
                      </span>
                    )}
                    <span
                      onClick={() => ViewDiscussionToggel(row.assign_no)}
                      className="ml-1"
                    >
                      <ViewDiscussionIcon />
                    </span>
                  </>
                ) : null}
              </>
            )}
          </>
        );
      },
    },
  ];

  //check
  const del = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete query ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteCliente(id);
      }
    });
  };

  const deleteCliente = (id) => {
    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("id", id);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/deleteQuery`,
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          Swal.fire("", "Query deleted successfully.", "success");
          CountAllQuery();
        } else {
          Swal.fire("Oops...", "Errorr ", "error");
        }
      })
      .catch((error) => {});
  };

  return (
    <Card>
      <CardHeader>
        <span onClick={(e) => needHelp()}>
          {" "}
          <HelpIcon />
        </span>
        <CustomerFilter
          setData={setAllQueriesCount}
          getData={CountAllQuery}
          id={userId}
          InprogressAllocation="InprogressAllocation"
          records={allQueriesCount.length}
        />
      </CardHeader>
      <CardBody>
        <Records records={allQueriesCount.length} />

        <DataTablepopulated
          bgColor="#6e557b"
          keyField={"assign_no"}
          data={allQueriesCount}
          columns={columns}
        ></DataTablepopulated>
        <AdditionalQueryModal
          additionalHandler={additionalHandler}
          additionalQuery={additionalQuery}
          assignNo={assignNo}
          getQueriesData={CountAllQuery}
        />
        {ViewDiscussion === true ? (
          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={CountAllQuery}
            headColor="#6e557b"
          />
        ) : (
          ""
        )}
        <Modal
          isOpen={openManual}
          toggle={needHelp}
          style={{ display: "block", position: "absolute", left: "280px" }}
          size="lg"
        >
          <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
          <ModalBody>
            <ModalManual tar={"freshQuery"} />
          </ModalBody>
        </Modal>
      </CardBody>
    </Card>
  );
}

export default React.memo(InprogressAllocation);
