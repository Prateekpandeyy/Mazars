import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

import { Link, NavLink } from "react-router-dom";
import AdminFilter from "../../../components/Search-Filter/AdminFilter";
import BootstrapTable from "react-bootstrap-table-next";
import Records from "../../../components/Records/Records";
import ViewComponent from "../ViewProposal/ViewComponent";
import DiscardReport from "../AssignmentTab/DiscardReport";


function AllProposalComponent({ allProposal }) {
  const [proposalDisplay, setProposalDisplay] = useState([]);
  const [records, setRecords] = useState([]);

  const [viewData, setViewData] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const ViewHandler = (key) => {
    console.log(key);
    setViewModal(!viewModal);
    setViewData(key);
  };


  const [assignNo, setAssignNo] = useState('');

  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key)
  }

  useEffect(() => {
    getProposalData();
  }, []);

  const getProposalData = () => {
    axios.get(`${baseUrl}/admin/getProposals`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setProposalDisplay(res.data.result);
        setRecords(res.data.result.length);
      }
    });
  };


  const columns = [
    {
      text: "S.No",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "created",
      text: "Date",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.created);
        var oldDate = row.created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      dataField: "assign_no",
      text: "Query No",
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return (
          <>
            <Link
              to={{
                pathname: `/admin/queries/${row.q_id}`,
                index: 0,
                routes: "proposal",
              }}
            >
              {row.assign_no}
            </Link>
          </>
        );
      },
    },
    {
      dataField: "parent_id",
      text: "Category",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "cat_name",
      text: "Sub Category",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      text: "Date of Proposal",
      dataField: "DateofProposal",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.DateofProposal);
        var oldDate = row.DateofProposal;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Date of acceptance / decline of Proposal",
      dataField: "cust_accept_date",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function dateFormat(cell, row) {
        console.log("dt", row.cust_accept_date);
        var oldDate = row.cust_accept_date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
      },
    },
    {
      text: "Status",
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {
                row.status == "Inprogress" ?
                  <div>
                    {row.status}/
                    <p className="inprogress">
                      {row.statusdescription}
                    </p>
                  </div>
                  :
                  row.status == "Customer Declined; Proposal" ?
                    <p className="declined">
                      {row.status}
                    </p> :
                    row.status == "Accepted; Proposal" ?
                      <p className="completed">
                        {row.status}
                      </p> :
                      null
              }
            </div>
          </>
        );
      },
    },
    {
      dataField: "ProposedAmount",
      text: "Proposed Amount",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      dataField: "accepted_amount",
      text: "Accepted Amount ",
      sort: true,
      style: {
        fontSize: "11px",
        color: "#21a3ce",
      },
      headerStyle: () => {
        return { fontSize: "11px", color: "#21a3ce" };
      },
    },
    {
      dataField: "tl_name",
      text: "TL name",
      sort: true,
      style: {
        fontSize: "11px",
      },
      headerStyle: () => {
        return { fontSize: "11px" };
      },
    },
    {
      text: "Action",
      headerStyle: () => {
        return { fontSize: "11px", width: "95px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>

              {row.statuscode > "3" || row.statuscode == "10" ?
                <div style={{ cursor: "pointer" }} title="View Proposal">
                  <a
                    href={`${baseUrl}/customers/dounloadpdf?id=${row.q_id}&viewpdf=1`}
                    target="_blank"
                  >
                    <i
                      class="fa fa-eye"
                      style={{ color: "green", fontSize: "16px" }}
                    />
                  </a>
                </div>
                :
                null
              }


              <div title="Send Message">
                <Link
                  to={{
                    pathname: `/admin/chatting/${row.q_id}`,
                    obj: {
                      message_type: "2",
                      query_No: row.assign_no,
                      query_id: row.q_id,
                      routes: `/admin/proposal`
                    }
                  }}
                >
                  <i
                    class="fa fa-comments-o"
                    style={{
                      fontSize: 16,
                      cursor: "pointer",
                      marginLeft: "8px",
                      color: "blue"
                    }}
                  ></i>
                </Link>
              </div>

              <div title="View Discussion Message">
                <i
                  class="fa fa-comments-o"
                  style={{
                    fontSize: 16,
                    cursor: "pointer",
                    color: "orange"
                  }}
                  onClick={() => ViewDiscussionToggel(row.assign_no)}
                ></i>
              </div>

            </div>
          </>
        );
      },
    },
  ];


  return (
    <>
      <Card>
        <CardHeader>

          <AdminFilter
            setData={setProposalDisplay}
            getData={getProposalData}
            allProposal="allProposal"
            setRecords={setRecords}
            records={records}
          />
        </CardHeader>

        <CardBody>
          <Records records={records} />
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={proposalDisplay}
            columns={columns}
            classes="table-responsive"
          />

          <ViewComponent
            ViewHandler={ViewHandler}
            viewModal={viewModal}
            viewData={viewData}
            getProposalData={getProposalData}
          />

          <DiscardReport
            ViewDiscussionToggel={ViewDiscussionToggel}
            ViewDiscussion={ViewDiscussion}
            report={assignNo}
            getData={getProposalData}
          />
        </CardBody>
      </Card>
    </>
  );
}

export default AllProposalComponent;
