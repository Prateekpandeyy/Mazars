import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import TeamFilter from "../../../components/Search-Filter/tlFilter";
import History from "../../../components/PendingForAllocation/History";
import Swal from "sweetalert2";
import { useParams, useHistory } from "react-router-dom";
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";
function CompletedQuery() {
  const userid = window.localStorage.getItem("tlkey");
const hist = useHistory();
  const [incompleteData, setInCompleteData] = useState([]);
  const [records, setRecords] = useState([]);
 
  const [assignNo, setAssignNo] = useState('');
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);

  const ViewDiscussionToggel = (key) => {
      setViewDiscussion(!ViewDiscussion);
      setAssignNo(key)
  }



  useEffect(() => {
    getInCompleteAssingment();
  }, []);
  const toggle = (key) => {
  
    setModal(!modal);

    fetch(`${baseUrl}/customers/getQueryHistory?q_id=${key}&uid=${JSON.parse(userid)}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/vnd.github.cloak-preview",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
     
        setHistory(response.result);
      })
      .catch((error) => console.log(error));
  };
  const getInCompleteAssingment = () => {
    axios
      .get(`${baseUrl}/tl/pendingAllocation?uid=${JSON.parse(userid)}`)
      .then((res) => {

        if (res.data.code === 1) {
          setInCompleteData(res.data.result);
          setRecords(res.data.result.length);

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
      style: {
        fontSize: "11px",
    },
    },
    {
      text: "Query Date",
      dataField: "created",
      sort: true,
     
      formatter : function(cell, row){
        let dueDate=row.created.split("-").reverse().join("-")
     
        return(
           
            <>
      {dueDate}
            </>
        )
    }
    },
    {
      text: "Query No",
      dataField: "assign_no",
     
      formatter: function nameFormatter(cell, row) {

        return (
          <>
            <Link
              to={{
                pathname: `/teamleader/queries/${row.id}`,
                index: 3,
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
      text: "Delivery Due Date ",
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
      text: "Status",
     
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
                              row.status == "Declined Query" ?
                                  <p className="declined">

                                      {row.statusdescription}
                                  </p> :
                                  row.status == "Completed Query" ?
                                      <p className="completed">

                                          {row.statusdescription}
                                      </p> : 
                                      null
                                  
                                    
                      }
                  </div>
              </>
          );
      },
  },
  
  {
    text: "Action",
    dataField: "",
    
    formatter: function (cell, row) {
      return (
        <>
          {row.statuscode === "0" || row.statuscode === "3"? (
           
           <i onClick ={() => assignConfirm(row.id, row.assign_no)} class="fa fa-share" style={{color : "blue", cursor : "pointer"}}></i>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
            
  <p className="completed">

 Allocated to {row.tname} on
<p>{row.allocation_time}</p>
</p>
          

            </div>



          )}
        </>
      );
    },
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
            class="autoWidthBtn"
            onClick={() => toggle(row.id)}
          >
            History
          </button>
        </>
      );
    },
  },
  ];



  const  assignConfirm = (id, assign_number) => {
 
   
Swal.fire({
  title: "Are you sure?",
   text: `do you want to assign ${assign_number} to taxprofessional`,
        type: 'warning',
        showCloseButton:true,
        showCancelButton: true,
        confirmButtonColor: '"#3085d6"',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, assign it!',
        cancelButtonText: 'No'
    }).then(function(result){
      console.log("resutl", result)
        if(result.value){
          hist.push(`/teamleader/queryassing/${id}`)
        }else if(result.dismiss == 'cancel'){
          
           axios.get(`${baseUrl}/tl/workby?uid=${JSON.parse(userid)}&qid=${id}`).then((res) => {
                   if(res.data.code === 1){
                     hist.push(`/teamleader/proposal`)
                   
                   }
                 })
        }

    });

  };

  return (
    <>
      <Card>
        <CardHeader>
          <TeamFilter
            setData={setInCompleteData}
            getData={getInCompleteAssingment}
            inCompleteQuery="inCompleteQuery"
            setRecords={setRecords}
            records={records}
          />
        </CardHeader>
        <CardBody>
        <DataTablepopulated 
          bgColor="#55425f"
          keyField= {"assign_no"}
          data={incompleteData}
          
          columns={columns}>
           </DataTablepopulated> 
            <History history={history} toggle={toggle} modal={modal} />
        </CardBody>
      </Card>
    </>
  );
}

export default CompletedQuery;
