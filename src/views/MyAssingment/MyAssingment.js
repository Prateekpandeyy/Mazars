import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/config";
import QueryDetails from "../../components/QueryDetails/QueryDetails";

function MyAssingment() {
  const { id } = useParams();
  const history = useHistory();

  const userId = window.localStorage.getItem("userid");

  const [submitData, setSubmitData] = useState([]);
  const [assingNo, setAssingmentNo] = useState();
  const [displayQuery, setDisplayQuery] = useState([]);
  const [diaplaySpecific, setDisplaySpecific] = useState([]);
  const [queryDocs, setQueryDocs] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [purpose, setPurpose] = useState([]);
  const [year, setYear] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [reports, setReports] = useState([]);
  const [accept, setAccept] = useState();
  const [tlName2, setTlname] = useState();
  const [qstatus, setqStatus] = useState();
  const[tp22, setTp22] = useState();
    const [diaplayProposal, setDisplayProposal] = useState({
    amount: "",
    accepted_amount: "",
    payment_received: "",
    cust_accept_date: "",
    proposal_date: "",
    description: "",

    amount_type: "",
    amount_fixed: "",
    amount_hourly: "",
    payment_terms: "",
    no_of_installment: "",
    installment_amount: "",
    due_date: "",
   
  });

  const [diaplayAssignment, setDisplayAssignment] = useState([
    {
      assignment_number: "",
      assignment_date: "",
    },
  ]);

  const [diaplayHistory, setDisplayHistory] = useState([
    {
      tlname: "",
      date_of_allocation: "",
      date_of_delivery: "",
    },
  ]);


  useEffect(() => {
    const getSubmittedAssingment = () => {
      axios.get(`${baseUrl}/customers/getQueryDetails?id=${id}`).then((res) => {

        if (res.data.code === 1) {
          setqStatus(res.data.result[0].query_status)
          setAccept(res.data.result[0].query_status)
          setTlname(res.data.result[0].tlname);
          setTp22(res.data.result[0].tpname);
          if(res.data.history_queries[0] === undefined){
           
          }
          else{
            setDisplayHistory({
              tlname: res.data.proposal_queries,
              date_of_allocation:
                res.data.history_queries[0].date_of_allocation,
            });
          }
         
          setSubmitData(res.data.result);
          setDisplaySpecific(res.data.additional_queries);
          setPaymentDetails(res.data.payment_detail);
          setAssingmentNo(res.data.result[0].assign_no);
          setFeedback(res.data.feedback_detail);
          setReports(res.data.reports);
    
         
       
          var purposeItem = res.data.result[0].purpose_opinion;
          var assementItem = res.data.result[0].assessment_year;

          
          try {
            var myPurpose = JSON.parse(purposeItem);
            var myYear = JSON.parse(assementItem);
            setPurpose(myPurpose);
            setYear(myYear);
          } catch (e) {
            
          }

          if (res.data.proposal_queries.length > 0) {
            setDisplayProposal({
              accepted_amount: res.data.proposal_queries[0].accepted_amount,
              payment_received: res.data.proposal_queries[0].paid_amount,
              amount: res.data.proposal_queries[0].amount,
              cust_accept_date: res.data.proposal_queries[0].cust_accept_date,
              proposal_date: res.data.proposal_queries[0].created,
              description: res.data.proposal_queries[0].description,

              amount_type: res.data.proposal_queries[0].amount_type,
              amount_fixed: res.data.proposal_queries[0].amount,
              amount_hourly: res.data.proposal_queries[0].amount_hourly,
              payment_terms: res.data.proposal_queries[0].payment_terms,
              no_of_installment: res.data.proposal_queries[0].no_of_installment,
              installment_amount: res.data.proposal_queries[0].installment_amount,
              due_date: res.data.proposal_queries[0].due_date,
              accept : res.data.result[0].accept
            
            });
            
          }

          if (res.data.assignment.length > 0) {
            setDisplayAssignment({
              assignment_number: res.data.assignment[0].assignment_number,
              assignment_date: res.data.assignment[0].created,
              date_of_delivery: res.data.assignment[0].date_of_delivery,
            });
          }
          // if (res.data.history_queries.length > 0) {
          //   setDisplayHistory({
          //     tlname: res.data.history_queries[0].tname,
          //     date_of_allocation:
          //       res.data.history_queries[0].date_of_allocation,
          //   });
          // }
          if (res.data.queries_document) {
            if (res.data.queries_document.length > 0) {
              setQueryDocs(res.data.queries_document);
            }
          }
        }
      });
    };
    getQuery();
    getSubmittedAssingment();
  }, [assingNo]);


  const getQuery = () => {
  if(assingNo === undefined){
    return false
  }
  else{
    axios
    .get(`${baseUrl}/tl/GetAdditionalQueries?assignno=${assingNo}`)
    .then((res) => {
  
      if (res.data.code === 1) {
        setDisplayQuery(res.data.result);
      }
    });
  }
  };



  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="schedule">
            <h3>Query Detail</h3>
          </div>
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12">
          <div class="card">

            <div
              class="card-header"
              id="headingOne"
              style={{ padding: ".5rem .1rem" }}
            >
              <h2 class="mb-0 query">
                <div>
                  <button
                    class="btn btn-success ml-3"
                    onClick={() => history.goBack()}
                  >
                    Go Back
                  </button>
                </div>
              </h2>
            </div>

            {submitData.map((p, index) => (
              <QueryDetails
                p={p}
                key={index}
                diaplaySpecific={diaplaySpecific}
                diaplayProposal={diaplayProposal}
                diaplayHistory={diaplayHistory}
                diaplayAssignment={diaplayAssignment}
                displayQuery={displayQuery}
                getQuery={getQuery}
                assingNo={assingNo}
                customerQuery="customerQuery"
                queryDocs={queryDocs}
                purpose={purpose}
                year={year}
                paymentDetails={paymentDetails}
                feedback={feedback}
                reports={reports}
                submitData = {submitData}
                accept = {accept}
                tlName2={tlName2}
                tp22 = {tp22}
                qstatus={qstatus}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MyAssingment;
