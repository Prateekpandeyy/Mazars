import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import TermsConditions from "./TermsConditions";
import CommonServices from "../../common/common";
import Alerts from "../../common/Alerts";
import classNames from "classnames";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";
import RejectedModal22 from "./RejectedModal22";
import {Markup} from "interweave";

function ProposalView(props) {
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);
  const userId = window.localStorage.getItem("userid");
  const [queryStatus, setQueryStatus] = useState(null);
  const [custcheckError, setCheckerror] = useState(null);
  const [valueCheckBox, setValueCheckBox] = useState(false);
  const [rejectedBox, showRejectedBox] = useState(false)
  const [assignNo2, setAssignNo2] = useState()
  const [addPaymentModal, setPaymentModal] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const token = window.localStorage.getItem("clientToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
  const [diaplayProposal, setDisplayProposal] = useState({
    amount: "",
    proposal_date: "",
    name: "",
    description: "",

    amount_type: "",
    amount_fixed: "",
    amount_hourly: "",

    payment_terms: "",
    payment_plan : "",
    no_of_installment: "",
    installment_amount: "",
    due_date: "",
    
  });

  const { amount, proposal_date,
    name, description,
    amount_fixed, amount_hourly,
    payment_terms,
    payment_plan,
    no_of_installment,
    installment_amount,
    due_date,
    amount_type,
    start_date,
    end_date,
    sub_payment_plane
  } = diaplayProposal


  useEffect(() => {
    getProposalDetails();
  }, []);

  const getProposalDetails = () => {
    axios
      .get(
        `${baseUrl}/customers/getQueryDetails?id=${id}`, myConfig
      )
      .then((res) => {
      
        if (res.data.code === 1) {
        

          if (res.data.result[0].query_status) {
            setQueryStatus(res.data.result[0].query_status);
          }
          if (res.data.proposal_queries.length > 0) {
            setDisplayProposal({
              accepted_amount: res.data.proposal_queries[0].accepted_amount,
              payment_received: res.data.proposal_queries[0].paid_amount,
              amount: res.data.proposal_queries[0].amount,
              proposal_date: res.data.proposal_queries[0].created,
              name: res.data.proposal_queries[0].tlname,
              description: res.data.proposal_queries[0].description,
              amount_type: res.data.proposal_queries[0].amount_type,
              amount_fixed: res.data.proposal_queries[0].amount_fixed,
              amount_hourly: res.data.proposal_queries[0].amount_hourly,

              payment_terms: res.data.proposal_queries[0].payment_terms,
              payment_plan : res.data.proposal_queries[0].payment_plan,
              no_of_installment: res.data.proposal_queries[0].no_of_installment,
              installment_amount: res.data.proposal_queries[0].installment_amount,
              due_date: res.data.proposal_queries[0].due_date,
              payment_plan : res.data.proposal_queries[0].payment_plan,
              start_date : res.data.proposal_queries[0].start_date,
              end_date : res.data.proposal_queries[0].end_date,
              sub_payment_plane : res.data.proposal_queries[0].sub_payment_plane
            });
          }

        }
      });
  };

  
  var nfObject = new Intl.NumberFormat('hi-IN')
  const readTerms = () => {
 
    setPaymentModal(!addPaymentModal);
  };


  const updateCheckbox = ({ checked }) => {
    console.log("checked", checked)
    setValueCheckBox(checked)
    setPaymentModal(checked);
    setCheckerror("")
    const token = window.localStorage.getItem("clientToken")
    const myConfig = {
      headers : {
       "uit" : token
      },
      responseType: 'blob'
    }
    axios.get(`${baseUrl}/customers/dounloadpdf?id=${id}&viewpdf=1` , myConfig)
  .then((res) => {
   
    if(res.status === 200){
     
      window.URL = window.URL || window.webkitURL;
      var url = window.URL.createObjectURL(res.data);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = `Proposal.pdf`
      a.target = "_blank";
      a.click();
    }
  })
  }


  const onSubmit = (value) => {
  

    if (valueCheckBox === false) {
     
      setCheckerror("Please , You have to select")
    }
    else {
      setLoading(true)
      let formData = new FormData();
      formData.append("id", id);
      formData.append("status", 5);
      formData.append("terms_condition", Number(value.p_terms_condition));

      axios({
        method: "POST",
        url: `${baseUrl}/customers/ProposalAccept`,
        headers : {
          uit : token
        },
        data: formData,
      })
        .then(function (response) {
       
          if (response.data.code === 1) {
            setLoading(false)
            var variable = ""
            Alerts.SuccessNormal(variable)
            history.push({
              pathname: `/customer/proposal`,
              index: 0,
            });
          } if (response.data.code === 0) {
            setLoading(false)
          }

        })
        .catch((error) => {
       
        });
    }

  };

const amountStyle  = {
  display : "block",
  textAlign : "right",
 
}
  const installAmount = (data) => {
    var item = data.split(',')
   
    const dataItem = item.map((p, i) =>
    (
      <>
        <p>{CommonServices.removeTime(p)}</p>
      </>
    ))
    return dataItem;
  }
  const installAmount2 = (data) => {
    var item = data.split(',')
   
    const dataItem = item.map((p, i) =>
    (
      <>
        <p style={amountStyle}>{nfObject.format(p)}</p>
      </>
    ))
    return dataItem;
  }
  // curent date
  var date = new Date();
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }


  //rejected
  const rejected = (id) => {
   
    if (valueCheckBox === false) {
   
      setCheckerror("Please , You have to select")
    } else {
      Swal.fire({
        title: "Are you sure",
         text: "to reject proposal ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reject it",
       
      }).then((result) => {
        if (result.value) {
          deleteCliente(id);
        }
      });
    }
  };


  // delete data
  const deleteCliente = (key) => {
    setAssignNo2(id)
    showRejectedBox(!rejectedBox)
    
  };
 
  // sufix date formation
  function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}


  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
          <Col md="4">
            <Link
                  to={{
                    pathname: `/customer/${props.location.routes}`,
                    index: props.location.index,
                  }}
                >
                  <button class="customBtn ml-3">Go Back</button>
                </Link>
              
            </Col>
            <Col md="4" style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontSize: "20px" }}>Proposal Details</p>
            </Col>
            <Col
              md="4"
              style={{ display: "flex", justifyContent: "flex-end" }}
            ></Col>
          </Row>
        </CardHeader>
        <CardBody>
         <div className="queryBox">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th scope="row">Name of Team Leader</th>
                <td>{name}</td>
              </tr>
              <tr>
                <th scope="row">Date of allocation</th>
                <td>{CommonServices.removeTime(proposal_date)}</td>
              </tr>
              <tr>
                <th scope="row">Proposed amount</th>
                <td>{nfObject.format(amount)}</td>
              </tr>
              <tr>
                <th scope="row">Scope of work</th>
                <td><Markup content={description} /></td>
              </tr>
              {
            payment_plan === "3" || payment_plan === "4" ?
            <tr>

            <th>Start date</th>
            <td>{start_date.split("-").reverse().join("-")}</td>
            </tr> : ""
          }

  {
    payment_plan === "3" ?
    <>
    
    <tr>
  <th>End date</th>
  <td>{end_date.split("-").reverse().join("-")}</td>
  </tr>
    </> : ""
  }
  
    <tr>
          
          <th>Payment terms</th>

          <td>
     {
      payment_plan === "1" ?
      <table>
        <tr>
          <th>
Payment plan
          </th>
          <th>
          Amount of fee
          </th>
          <th>
          Due date
          </th>
        </tr>
        <tr>
          <td>
{amount_type}
          </td>
          <td>
{amount}
          </td>
          <td>
{due_date.split("-").reverse().join("-")}
          </td>
        </tr>
        </table> : ""
     }      

{
  (payment_plan === "3"  && sub_payment_plane === "1" ) || payment_plan === "2" ? 
  <table>
    <tr>
      <th>
      Payment plan  
      </th>
      <th>
        Amount of fee
      </th>
      </tr>
      <tr>
      <td>
        {amount_type}
      </td>
      <td>
      {amount}
      </td>
    </tr>
    <tr>
      <td colSpan={2}>
&nbsp;
      </td>
    </tr>
    <tr>
      <td colSpan= "2">
       <table style={{width : "100%", border : "0px"}}>
        <tr>
          <th>
            No of installment
            </th>
            <th style={{textAlign : "right"}}>Installment amount</th>
            <th>Due dates</th>
        </tr>
        <tr>
        <td>{no_of_installment}</td>
        <td style={{textAlign : "right"}}>{installAmount2(installment_amount)}</td>
        <td>{installAmount(due_date)}</td>
        
        </tr>
       </table>
      </td>
      
    </tr>
  </table> : ""
}


{
  payment_plan === "4" || (payment_plan === "3" && sub_payment_plane === "2") ?
  <table>
<tr>
<th>
Payment plan
</th>
<th> Amount of fee and due date </th>
</tr>
<tr>
  <td>
  {CommonServices.capitalizeFirstLetter(amount_type)}
  </td>
  <td>
  {`Rs. ${nfObject.format(amount)} per month payable before ${ordinal_suffix_of(due_date)} day of following month`}
                     
    </td>
</tr>
  </table> : ""
}
          </td>
         </tr>
         
              <tr>
                <th scope="row">Proposal status</th>
                <td>
                  {queryStatus == "4" && "Inprogress"}
                  {queryStatus == "6" && "Declined"}
                  {(queryStatus == "5" || queryStatus > 6) && "Accepted"}
                </td>
              </tr>
            </tbody>

          </table>

         </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-6">
              <div className="mb-3">
                <div className="form-check">
                  <input
                    id="terms_condition"
                    className="form-check-input"
                    type="checkbox"
                    name="p_terms_condition"
                    ref={register}
                    onChange={(e) => updateCheckbox(e.target)}
                  />
                  <label
                    htmlFor="terms_condition"
                    className="form-check-label"
                    title="Read"
                    style={{ cursor: "pointer" }}
                  >
                   Please read engagement letter
                  </label>
                  <p className="declined">{custcheckError}</p>
                </div>
                <br />

                {
                  loading ?
                    <Loader />
                    :
                    <>
                      <div className="form-check">
                        {
                          valueCheckBox ?
                            <div>
                              <button type="submit" className="customBtn">
                                Accept
                              </button>
                              <button type="button" className="dangerBtn ml-2" onClick={() => rejected(id)}>
                                Reject
                              </button>
                            </div>
                            :
                            <div className="proposalBtn">
                              <button type="submit" disabled  className="customBtnDisabled">
                                Accept
                              </button>
                              <button type="button" disabled  className="dangerBtnDisabled ml-2">
                                Reject
                              </button>
                              
                            </div>
                        }
                      </div>
                    </>
                }
              </div>
            </div>

          </form>


        </CardBody>

      {/* {addPaymentModal === true ?
        <TermsConditions
        readTerms={readTerms}
        addPaymentModal={addPaymentModal}
        id={id}
      /> : ""} */}
        {
          rejectedBox === true ?
          <RejectedModal22
          showRejectedBox = {showRejectedBox} 
          rejectedBox = {rejectedBox}
          // getQueriesData = {getQueriesData}
          assignNo={assignNo2}
          deleteCliente = {deleteCliente}/> : ""
        }
      </Card>
    </Layout>
  );
}

export default ProposalView;