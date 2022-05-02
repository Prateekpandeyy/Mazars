import React, { useState, useEffect, useMemo } from "react";

import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
 
} from "reactstrap";
import { Link } from "react-router-dom";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import BootstrapTable from "react-bootstrap-table-next";
import Records from "../../components/Records/Records";
import CommonServices from "../../common/common";
import moment from "moment";
import './index.css';
import DiscardReport from "../AssignmentTab/DiscardReport";
import ModalManual from "../ModalManual/AllComponentManual";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import MessageIcon, { ViewDiscussionIcon, HelpIcon, 
  FeedBackICon} from "../../components/Common/MessageIcon";
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";


function InprogressProposal() {
  const alert = useAlert();
  const userId = window.localStorage.getItem("userid");
  const [query, setQuery] = useState([]);
  const [queriesCount, setCountQueries] = useState(null);
  const [records, setRecords] = useState([]);
  const [assignNo, setAssignNo] = useState('');
  const [openManual, setManual] = useState(false)
  const token = window.localStorage.getItem("clientToken")
  useEffect(() => {
    getQueriesData();
  }, []);
  const [ViewDiscussion, setViewDiscussion] = useState(false);
  const ViewDiscussionToggel = (key) => {
    setViewDiscussion(!ViewDiscussion);
    setAssignNo(key)
  }
  const needHelp = () => {
        
    setManual(!openManual)
}

  const getQueriesData = () => {
    // axios
    //   .get(
    //     `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(userId)}&status=2`
    //   )
    fetch(`${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(userId)}&status=2`, {
      method: "GET",
      headers: new Headers({
        uit: token,
      }),
    })
      .then((res) => {
       
        if (res.data.code === 1) {
          setQuery(res.data.result);
          setCountQueries(res.data.result.length);
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
      headerStyle : () => {
        return( {
            width: "50px"
        })
    }
    },
    {
      text: "Date",
      dataField: "created",
      sort: true,
     
     formatter : function dateFormatter(cell, row) {
         return(
             <>
             {CommonServices.changeFormateDate(row.created)}
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
                          pathname: `/customer/my-assingment/${row.id}`,
                          index: 2,
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
            <div className="completed">
              {row.status}
            
            </div>
          </>
        );
      },
    },
    {
      text: "Actual Delivery Date",
      dataField: "final_date",
      sort: true,
     
      formatter: function dateFormat(cell, row) {
        

        return (
          <>
            {
              row.status == "Declined Query"
                ? null
                :
                row.status_code >= "1" ?
                  CommonServices.removeTime(row.final_date)
                  :
                  null
            }
          </>
        )
      },
    },
    {
      text: "Action",
     
    formatter: function (cell, row) {
          var dateMnsFive = moment(row.exp_delivery_date).add(15, 'day').format("YYYY-MM-DD");
        
         
          var curDate = moment().format("YYYY-MM-DD")
       
         
        
          
       
          return (
              <>
                  {   
                      row.status == "Declined Query" ?
                      <>
                     <>
                     {dateMnsFive > curDate === true ?
                          <span className="ml-2">
                         
                          <Link 
                           to={{
                              pathname: `/customer/feedback/${row.assign_no}`,
                              index: 2,
                              routes: "queries",
                          }}>
                                <FeedBackICon />
                          </Link>
                      </span>
                       : ""} 
                      
                      <span onClick={() => ViewDiscussionToggel(row.assign_no)}  className="ml-2">
                            <ViewDiscussionIcon />
                          </span>
                        

                     </>
                      </>
                          :
                          <>
              {
                  row.status_code == "0" || row.status_code == "1" || row.status_code == "3" ?
                      <>

                          <span className="ml-2">
                              <Link
                                  to={{
                                      pathname: `/customer/chatting/${row.id}&type=4`,
                                      index: 2,
                              routes: "queries",
                                      obj: {
                                          message_type: "4",
                                          query_No: row.assign_no,
                                          query_id: row.id,
                                          routes: `/customer/queries`
                                      }
                                  }}
                              >
                                 <MessageIcon />
                              </Link>
                          </span>
                          <span onClick={() => ViewDiscussionToggel(row.assign_no)}  className="ml-2">
                            <ViewDiscussionIcon />
                          </span>

                      </> :
                      null
              }

              {
                  row.status_code == "4" || 8 < parseInt(row.status_code) || row.status_code == "2" ?
                      
                      <>

                          {dateMnsFive > curDate === true ?
                          <span className = "ml-2"
                         >
                          <Link 
                           to={{
                              pathname: `/customer/feedback/${row.assign_no}`,
                              index: 2,
                              routes: "queries",
                          }}>
                                <FeedBackICon />
                          </Link>
                      </span> : ""}
                         
                          {row.status_code == "10" ? null 
                          : 
                          <span className="ml-2">
                           <Link
                                  to={{
                                      pathname: `/customer/chatting/${row.id}&type=4`,
                                      index: 2,
                              routes: "queries",
                                      obj: {
                                          message_type: "4",
                                          query_No: row.assign_no,
                                          query_id: row.id,
                                          routes: `/customer/queries`
                                      }
                                  }}
                              >
                              <MessageIcon />
                          </Link>
                      </span>
}
<span onClick={() => ViewDiscussionToggel(row.assign_no)}  className="ml-2">
                            <ViewDiscussionIcon />
                          </span>
                      
                      </>
                      :
                      null
              }
          </>

  }
              </>
          );
      },
  },
];





  return (
    <div>
      <Card>
        <CardHeader>
        <span onClick= {(e) => needHelp()}> <HelpIcon /></span>
        <CustomerFilter
            setData={setQuery}
            getData={getQueriesData}
            id={userId}
            InprogressQueryProposal="InprogressQueryProposal"
            records={records}
            setRecords={setRecords}
          />
        </CardHeader>
        <CardBody>
         <Records records={records} />
         <DataTablepopulated 
                   bgColor="#6e557b"
                   keyField= {"assign_no"}
                   data={query}
                   columns={columns}>
                    </DataTablepopulated>
                              <DiscardReport
                        ViewDiscussionToggel={ViewDiscussionToggel}
                        ViewDiscussion={ViewDiscussion}
                        report={assignNo}
                        getData={getQueriesData}
                        headColor="#6e557b"
                    />
       
          <Modal isOpen={openManual} toggle={needHelp} style={{display : "block", position: "absolute", left:"280px"}} size="lg">
                        <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
                        <ModalBody>
                            <ModalManual tar= {"freshQuery"} />
                        </ModalBody>
                    </Modal>
        </CardBody>
      </Card>
    </div>
  );
}

export default InprogressProposal;
