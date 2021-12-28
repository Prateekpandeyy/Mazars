import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useParams, Link, useHistory } from "react-router-dom";
import QueryDetails from "../../../components/QueryDetails/QueryDetails";
import moment from 'moment';
function QueriesRecevied(props) {
  const { id } = useParams();
  const history = useHistory();

  const userid = window.localStorage.getItem("tlkey");
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
  const[tp22, setTp22] = useState();
  const [tpStatus, setTpstatus] = useState();
  const [declined2, setDeclined2] = useState();
  const [declinedStatus, setDeclinedStatus] = useState(false)
  const [finalDate, setFinalDate] = useState()
  const [qstatus, setqStatus] = useState();
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
    proposal_reactive_dates: "",
    proposal_reactive_notes: ""
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
      axios.get(`${baseUrl}/tl/getQueryDetails?id=${id}`).then((res) => {
      
        if (res.data.code === 1) {
          setqStatus(res.data.result[0].query_status)
          setTpstatus(res.data.result[0].tp_status);
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
          if(res.data.result[0].status =="Declined Query"){
          let a = res.data.result[0].declined_date.split(" ")[0].split("-").reverse().join("-")
            setDeclined2(a)
           setDeclinedStatus(true)
          }
          if (res.data.result) {
            if (res.data.result[0].name == null) {
            
            }
            else {
              setSubmitData(res.data.result);
            }
          }

          if (res.data.additional_queries) {
            setDisplaySpecific(res.data.additional_queries);
          }
          if (res.data.payment_detail) {
            setPaymentDetails(res.data.payment_detail);
          }
          if (res.data.feedback_detail) {
            setFeedback(res.data.feedback_detail);
          }
          if (res.data.result[0].assign_no) {
            setAssingmentNo(res.data.result[0].assign_no);
          }

          if (res.data.reports) {
            setReports(res.data.reports);
          }

          var purposeItem = res.data.result[0].purpose_opinion;
          var assementItem = res.data.result[0].assessment_year;


          
          try {
           
            var myYear = JSON.parse(assementItem);
           
            setYear(myYear);
          } catch (e) {
           
          }
          try {
            var myPurpose = JSON.parse(purposeItem);
            
            setPurpose(myPurpose);
           
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
              proposal_reactive_dates : res.data.proposal_queries[0].re_active_date.split(" ")[0].split("-").reverse().join("-"),
              proposal_reactive_notes : res.data.proposal_queries[0].notes
            });
            let a = moment(res.data.result[0].final_date);
            let b = moment(res.data.proposal_queries[0].cust_accept_date)
            let c = a.diff(b)
            let d = moment.duration(c)
            let finalDate = d.days() + 1;
           setFinalDate(finalDate)
          
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
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
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
              <h2 class="mb-0 query ml-3">
                <Link
                  to={{
                    pathname: `/teamleader/${props.location.routes}`,
                    index: props.location.index,
                  }}
                >
                  <button class="btn btn-success ml-3">Go Back</button>
                </Link>
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
                queryDocs={queryDocs}
                paymentDetails={paymentDetails}
                purpose={purpose}
                year={year}
                feedback={feedback}
                reports={reports}
                accept = {accept}
                tpStatus={tpStatus}
                tlName2={tlName2}
                tp22 = {tp22}
                finalDate={finalDate}
                qstatus={qstatus}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QueriesRecevied;

