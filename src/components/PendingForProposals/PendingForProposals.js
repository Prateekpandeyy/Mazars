import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { useForm } from "react-hook-form";
import "antd/dist/antd.css";
import { Select } from "antd";
import BootstrapTable from "react-bootstrap-table-next";
import AdminFilter from "../../components/Search-Filter/AdminFilter";
import Records from "../../components/Records/Records";


function PendingForProposals({ CountPendingProposal }) {
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;

  const [nonpendingData, setNonPendingData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [records, setRecords] = useState([]);

  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);

  const toggle = (key) => {
    console.log("key", key);
    setModal(!modal);

    fetch(`${baseUrl}/customers/getQueryHistory?q_id=${key}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/vnd.github.cloak-preview",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setHistory(response.result);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPendingForProposals();
  }, []);

  const getPendingForProposals = () => {
    axios.get(`${baseUrl}/admin/pendingProposal`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setNonPendingData(res.data.result);
        setRecords(res.data.result.length);
        // CountPendingProposal(res.data.result.length);
      }
    });
  };




  const columns = [
    {
      dataField: "",
      text: "S.No",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
    },
    {
      dataField: "created",
      text: "Date",
      sort: true,

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
      formatter: function nameFormatter(cell, row) {
        console.log(row);
        return (
          <>
            <Link
              // to={`/admin/queries/${row.id}`}
              to={{
                pathname: `/admin/queries/${row.id}`,
                index: 2,
                routes: "queriestab",
              }}
            >{row.assign_no}</Link>
          </>
        );
      },
    },
    {
      dataField: "parent_id",
      text: "Category",
      sort: true,
    },
    {
      dataField: "cat_name",
      text: "Sub Category",
      sort: true,
    },
    {
      text: "Customer Name",
      dataField: "name",
      sort: true,
      headerStyle: () => {
        return { fontSize: "12px" };
      },
    },
    {
      text: "Status",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function nameFormatter(cell, row) {
        return (
          <>
            <div>
              {row.status}/
              {
                row.status == "Inprogress Query" ?
                  <p className="inprogress">
                    {row.statusdescription}
                  </p>
                  :
                  null
              }
            </div>
          </>
        );
      },
    },
    {
      dataField: "tname",
      text: "TL name",
      sort: true,
    },
    {
      text: "History",
      dataField: "",
      headerStyle: () => {
        return { fontSize: "12px" };
      },
      formatter: function (cell, row) {
        return (
          <>
            <button
              type="button"
              class="btn btn-info btn-sm"
              onClick={() => toggle(row.id)}
            >
              History
            </button>
          </>
        );
      },
    },
  ];



  //change date format
  function ChangeFormateDate(oldDate) {
    console.log("date", oldDate);
    if (oldDate == null) {
      return null;
    }
    return oldDate.toString().split("-").reverse().join("-");
  }

  return (
    <>
      <Card>
        <CardHeader>
          <AdminFilter
            setData={setNonPendingData}
            getData={getPendingForProposals}
            pendingForProposal="pendingForProposal"
            setRecords={setRecords}
            records={records}
          />

        </CardHeader>
        <CardBody>
          <Records records={records} />
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={nonpendingData}
            columns={columns}
            wrapperClasses="table-responsive"
          />
          <Modal isOpen={modal} fade={false} toggle={toggle}>
            <ModalHeader toggle={toggle}>History</ModalHeader>
            <ModalBody>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="row">S.No</th>
                    <th scope="row">Name</th>
                    <th scope="row">Query No</th>
                    <th scope="row">Status</th>
                    <th scope="row">Date of Allocation</th>
                  </tr>
                </thead>

                {history.length > 0
                  ? history.map((p, i) => (
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{p.name}</td>
                        <td>{p.assign_no}</td>
                        <td>{p.status}</td>
                        <td>{ChangeFormateDate(p.date_of_allocation)}</td>
                      </tr>
                    </tbody>
                  ))
                  : null}
              </table>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>
    </>
  );
}

export default PendingForProposals;
{
  /* <td class="text-center">
                      <p style={{ color: "green" }}>
                        Query accepted by {p.tname}
                      </p>
                    </td> */
}
