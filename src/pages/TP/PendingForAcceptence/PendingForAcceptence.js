import React, { useState} from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import TaxProfessionalFilter from "../../../components/Search-Filter/tpfilter";
import RejectedModal from "./RejectedModal";
import Alerts from "../../../common/Alerts";
import { Spinner } from 'reactstrap';
import { useHistory } from "react-router";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
import MessageIcon, { Accept, Reject} from "../../../components/Common/MessageIcon";


function PendingForAcceptence(props) {
  let history = useHistory();
  const userid = window.localStorage.getItem("tpkey");
  const [loading, setLoading] = useState(false);

  const [pendingData, setPendingData] = useState([]);
  const [records, setRecords] = useState([]);

  const [pay, setPay] = useState({
    id: "",
    allocation_id: "",
  });

  const [addPaymentModal, setPaymentModal] = useState(false);
  const rejectHandler = (key) => {
   
    setPaymentModal(!addPaymentModal);
    setPay({
      id: key.id,
      allocation_id: key.allocation_id,
    });
  };

 

  const getPendingforAcceptance = () => {
    axios
      .get(`${baseUrl}/tl/pendingQues?tp_id=${JSON.parse(userid)}`)
      .then((res) => {

        if (res.data.code === 1) {
          setPendingData(res.data.result);
          setRecords(res.data.result.length);
          props.pendingQueryNumber(res.data.result.length)
          // CountPendingForAcceptence(res.data.result.length);
        }
      });
  };

  const columns = [
    {
      text: "S.No",
      dataField: "",
      formatter: (cellContent, row, rowIndex) => {
        return rowIndex + 1;
      },
   
      headerStyle: () => {
        return { width: "50px" };
      },
    },
    {
      text: "Date",
      dataField: "query_created",
      sort: true,
     
      formatter: function dateFormat(cell, row) {
     
        var oldDate = row.query_created;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
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
                pathname: `/taxprofessional/queries/${row.id}`,
                index: 1,
                routes: "queriestab",
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
      text: "Client Name",
      dataField: "name",
      sort: true,
     
    },
    {
      text: "Delivery due date / Actual Delivery date",
      dataField: "Exp_Delivery_Date",
      sort: true,
     
      formatter: function dateFormat(cell, row) {
     
        var oldDate = row.Exp_Delivery_Date;
        if (oldDate == null) {
          return null;
        }
        return oldDate.toString().split("-").reverse().join("-");
      },
     
    },
    {
      text: "Accept / Reject",
      dataField: "",
     
      formatter: function (cell, row) {
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              
              }}
              id="div1"
            >
              <div
             
               
                onClick={() => acceptHandler(row)}
              >
                <Accept titleNme= "Accept Assignment" />
              </div>
              <div
               
                onClick={() => rejectHandler(row)}
              >
              <Reject titleNme= "Accept Assignment" />
              </div>
            </div>
          </>
        );
      },
    },
  ];

  const acceptHandler = (key) => {

    setLoading(true)

    let formData = new FormData();
    formData.append("set", 1);
    formData.append("tp_id", JSON.parse(userid));
    formData.append("assignment_id", key.id);
    formData.append("allocation_id", key.allocation_id);
   
    axios({
      method: "POST",
      url: `${baseUrl}/tp/AcceptRejectQuery`,
      data: formData,
    })
      .then(function (response) {
    
        if (response.data.code === 1) {
          setLoading(false)
          Alerts.SuccessNormal("Query accepted successfully.")
          
          getPendingforAcceptance();
         // updateTab(1);
         history.push("/taxprofessional/proposal")
        } else if (response.data.code === 0) {
          setLoading(false)
        }
      })
      .catch((error) => {
       
      });
  };



  return (
    <>
      <Card>
        <CardHeader>
          <TaxProfessionalFilter
            setData={setPendingData}
            getData={getPendingforAcceptance}
            pendingForAcceptence="pendingForAcceptence"
            setRecords={setRecords}
            records={records}
          />
        </CardHeader>
        <CardBody>
          {
            loading ?
              <Spinner color="primary" />
              :
              <DataTablepopulated 
              bgColor="#55425f"
              keyField= {"assign_no"}
              data={props.pendingData}
              
              columns={columns}>
               </DataTablepopulated> 
          }
          <RejectedModal
            rejectHandler={rejectHandler}
            addPaymentModal={addPaymentModal}
            pay={pay}
            getPendingforAcceptance={getPendingforAcceptance}
          />
        </CardBody>
      </Card>
    </>
  );
}

export default PendingForAcceptence;

