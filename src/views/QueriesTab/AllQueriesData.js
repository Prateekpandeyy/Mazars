import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Table,
} from "reactstrap";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import moment from "moment";
import { Link } from "react-router-dom";
import CustomerFilter from "../../components/Search-Filter/CustomerFilter";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";
import Records from "../../components/Records/Records";
import AdditionalQueryModal from "./AdditionalQueryModal";
import CommonServices from "../../common/common";
import DiscardReport from "../AssignmentTab/DiscardReport";
import RejectedModal from "./RejectedModal";
import ModalManual from "../ModalManual/AllComponentManual";
import MessageIcon, {DeleteIcon, EditQuery, ViewDiscussionIcon, HelpIcon, 
   UploadDocument, FeedBackICon} from "../../components/Common/MessageIcon";
import './index.css';
import DataTablepopulated from "../../components/DataTablepopulated/DataTabel";


function AllQueriesData() {
    const userId = window.localStorage.getItem("userid");
    const [query, setQuery] = useState([]);
   const [assignNo2, setAssignNo2] = useState()
    const [queriesCount, setCountQueries] = useState(null);
    const [records, setRecords] = useState([]);
    const [loading2, setLoading2] = useState(false);
    const [additionalQuery, setAdditionalQuery] = useState(false)
    const [rejectedBox, showRejectedBox] = useState(false)
    const [assignNo, setAssignNo] = useState('');
    const [ViewDiscussion, setViewDiscussion] = useState(false);
    const [openManual, setManual] = useState(false)
   let des = false;
    const additionalHandler = (key) => {
       
       if(typeof(key) == "object"){
        setAdditionalQuery(!additionalQuery);

        des = true
        setLoading2(false)
        return false
       }
       else{
        setAdditionalQuery(!additionalQuery);
        setAssignNo(key)
       }
        
    };
  
    const ViewDiscussionToggel = (key) => {
       
        setViewDiscussion(!ViewDiscussion);
        setAssignNo(key)
    }

    useEffect(() => {
        getQueriesData();
    }, []);

   
    const getQueriesData = () => {
        axios
            .get(
                `${baseUrl}/customers/incompleteAssignments?user=${JSON.parse(userId)}`
            )
            .then((res) => {

                if (res.data.code === 1) {
                    setQuery(res.data.result);
                    setCountQueries(res.data.result.length);
                    setRecords(res.data.result.length);
                }
            });
    };

    const needHelp = () => {
        
        setManual(!openManual)
    }

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
                                index: 0,
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
                            {
                                row.status == "Inprogress Query" ?
                                    <p className="inprogress">
                                        {row.status_message}
                                    </p>
                                    :
                                    row.status == "Declined Query" ?
                                        <p className="declined">

                                            {row.status_message}
                                        </p> :
                                        row.status == "Completed Query" ?
                                            <p className="completed">

                                                {row.status_message}
                                            </p> :
                                            null
                            }
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
                        {
                            row.status == "Declined Query"
                                ? null
                                :
                                row.status_code != "3" && row.status_code > "1" ?
                                  <>
                                  {row.final_discussion === "completed" ?
                                    CommonServices.removeTime(row.final_date) : 
                                    CommonServices.removeTime(row.exp_delivery_date)}
                                  </>
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
                           {dateMnsFive > curDate === true ?
                                <span className="ml-1">
                               
                                <Link 
                                 to={{
                                    pathname: `/customer/feedback/${row.assign_no}`,
                                    index: 0,
                                    routes: "queries",
                                }}>
                                      <FeedBackICon />
                                </Link>
                            </span>
                             : ""} 
                            
                            <span onClick={() => ViewDiscussionToggel(row.assign_no)}  className="ml-1">
                                  <ViewDiscussionIcon />
                                </span>
                              

                        
                            </>
                                :
                                <>
                    {
                        row.status_code == "0" || row.status_code == "1" || row.status_code == "3" ?
                            <>
                                <span className="ml-1">
                                    <Link to={`/customer/edit-query/${row.id}`}>
                                        <EditQuery />
                                    </Link>
                                </span>

                                <span   onClick={() => del(row.id)} className="ml-2">
                                   <DeleteIcon />
                                </span>
                                <span className="ml-1">
                                    <Link
                                        to={{
                                            pathname: `/customer/chatting/${row.id}&type=4`,
                                            index: 0,
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
                                <span className = "ml-1"
                               >
                                <Link 
                                 to={{
                                    pathname: `/customer/feedback/${row.assign_no}`,
                                    index: 0,
                                    routes: "queries",
                                }}>
                                      <FeedBackICon />
                                </Link>
                            </span> : ""}
                                {
                                    row.delivery_report == "completed" ? null :
                                        <span className="ml-1"  onClick={() => additionalHandler(row.assign_no)}
                                        >
                                            <UploadDocument />
                                        </span>
                                }
                                {row.status_code == "10" ? null 
                                : 
                                <span className="ml-1">
                                 <Link
                                        to={{
                                            pathname: `/customer/chatting/${row.id}&type=4`,
                                            index: 0,
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
<span onClick={() => ViewDiscussionToggel(row.assign_no)}  className="ml-1">
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
      
      
      

    //check
    const del = (id) => {
 

        Swal.fire({
            title: "Are you sure?",
            text: "Want to delete query? Yes, delete it!",
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
        // setLoading(true)
        setAssignNo2(id)
      showRejectedBox(!rejectedBox)
       
    };
const showManual = () => {
    setManual(!openManual)
}
    return (
       <Card>
             <CardHeader>
             <span onClick= {(e) => needHelp()}> <HelpIcon /></span>
                    <CustomerFilter
                        setData={setQuery}
                        getData={getQueriesData}
                        id={userId}
                        query="query"
                        records={records}
                        setRecords={setRecords}
                    />
                </CardHeader>
                <CardBody>
                  
               
                <Row>
                   
                        <Col md = "3">
                        

                           
                          </Col>
                          <Col md="9">
                    <Records records={records} />
                        </Col>
                    </Row>
                   <DataTablepopulated 
                   bgColor="#55425f"
                   keyField= {"assign_no"}
                   data={query}
                   
                   columns={columns}>
                    </DataTablepopulated>
               
                  
                 
                   <AdditionalQueryModal
                        additionalHandler={additionalHandler}
                        additionalQuery={additionalQuery}
                        assignNo={assignNo}
                        getQueriesData={getQueriesData}
                        setLoading2={setLoading2}
                        loading2={loading2}
                       
                        des = {des}
                    />
            <DiscardReport
                        ViewDiscussionToggel={ViewDiscussionToggel}
                        ViewDiscussion={ViewDiscussion}
                        report={assignNo}
                        getData={getQueriesData}
                        headColor="#55425f"
                    />
                     <RejectedModal
                    showRejectedBox = {showRejectedBox} 
                    rejectedBox = {rejectedBox}
                    getQueriesData = {getQueriesData}
                    assignNo={assignNo2}
                    deleteCliente = {deleteCliente}/>
                    <Modal isOpen={openManual} toggle={needHelp} style={{display : "block", position: "absolute", left:"280px"}} size="lg">
                        <ModalHeader toggle={needHelp}>Mazars</ModalHeader>
                        <ModalBody>
                            <ModalManual tar= {"freshQuery"} />
                        </ModalBody>
                    </Modal>
                </CardBody>
       </Card>
    );
}

export default AllQueriesData;