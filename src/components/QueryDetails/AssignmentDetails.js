import React from "react";
import CommonServices from "../../common/common";
import { ReportUrl } from "../../config/config";

function AssignmentDetails({ p, diaplayAssignment, diaplayProposal, reports, assingNo }) {

  const {
    assignment_number,
    assignment_date,
    date_of_delivery,
  } = diaplayAssignment;

  const { cust_accept_date } = diaplayProposal;

  const timeTaken = (a, b) => {
    var date2 = CommonServices.removeTime(a);
    var date1 = CommonServices.removeTime(b);

    console.log("a", date2);
    console.log("b", date1);

    // var difference = Math.abs(date2 - date1);
    // var days = difference / (1000 * 3600 * 24);
    var difference = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
    console.log(difference);
    // var difference = date2.getTime() - date1.getTime();
    // return difference;
  };
console.log("reports", reports)
  console.log("reports", reports)
  return (
    <>
      <div>
        <p
          style={{
            textAlign: "center",
            color: "black",
            fontSize: "18px",
          }}
        >
          Assignment Details
        </p>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" style={{ width: "400px" }}>Titles</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Assignment Number</th>
              <td>{assignment_number}</td>
            </tr>
            <tr>
              <th scope="row">Assignment Date</th>
              <td>{CommonServices.removeTime(assignment_date)}</td>
            </tr>
            <tr>
              <th scope="row">Proposed Date of Completion</th>
              <td>
                {p.query_status >= 9 ? (
                  <p>{CommonServices.removeTime(p.Exp_Delivery_Date)}</p>
                ) : null}
              </td>
            </tr>
            {/* {p.query_status >= 9 ? ( */}
            <tr>
              <th scope="row">Assignment Status</th>
              <td>
                <tr>
                  <th>Assignment Stage</th>
                  <th>Status</th>
                </tr>
                <tr>
                  <td>Client Discussion</td>
                  <td>{CommonServices.capitalizeFirstLetter(p.client_discussion)}</td>
                </tr>
                <tr>
                  <td>Draft Reports</td>
                  <td>{CommonServices.capitalizeFirstLetter(p.draft_report)}</td>
                </tr>
                <tr>
                  <td>Final Discussion</td>
                  <td>{CommonServices.capitalizeFirstLetter(p.final_discussion)}</td>
                </tr>
                <tr>
                  <td>Delivery of Final Reports</td>
                  <td>{CommonServices.capitalizeFirstLetter(p.delivery_report)}</td>
                </tr>
                <tr>
                  <td>Awaiting Completion</td>
                  <td>{CommonServices.capitalizeFirstLetter(p.other_stage)}</td>
                </tr>
              </td>
            </tr>
            {/* ) : null} */}
            <tr>
              <th scope="row">Time taken to complete the assignment</th>
              <td>
                {p.client_discussion == "completed" &&
                  p.delivery_report == "completed" &&
                  p.draft_report == "completed" &&
                  p.final_discussion == "completed" &&
                  p.other_stage == "completed"
                  ? CommonServices.removeTime(p.final_date)
                  : null}
              </td>
            </tr>

            <tr>
              <th scope="row">Reports</th>
              <td>
                {
                  reports.map((p, i) => (
                    <div>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <a
                            href={`${ReportUrl}/${assingNo}/${p.document}`}
                            target="_blank"
                          >
                            <i class="fa fa-photo"></i> {p.document}
                          </a>
                        </td>
                        <td style={{ marginLeft: "15px", color: "green" }}>
                          {p.stages_type == 2 && p.revise_report == null && "Draft Report" || p.stages_type == 3 && p.revise_report == null && "Final Report" || p.revise_report != null && "Reviewed Report"}
                        </td>
                        <td>
                          {p.status == "3"
                            ?
                            <p className="declined">Discarded</p>
                            : null}
                        </td>
                      </tr>
                    </div>
                  ))
                }
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </>
  );
}

export default AssignmentDetails;


// {timeTaken(p.final_date,cust_accept_date)}


// function parseDate(str) {
//   var mdy = str.split('/');
//   return new Date(mdy[2], mdy[0]-1, mdy[1]);
// }

// function datediff(first, second) {
//   // Take the difference between the dates and divide by milliseconds per day.
//   // Round to nearest whole number to deal with DST.
//   return Math.round((second-first)/(1000*60*60*24));
// }

// alert(datediff(parseDate(first.value), parseDate(second.value)));

{/* <p>
                        <a
                          href={`${ReportUrl}/${assingNo}/${p.document}`}
                          target="_blank"
                        >
                          <i class="fa fa-photo"></i> {p.document}
                        </a>

                      </p>
                      <p style={{ marginLeft: "15px", color: "green" }}>
                        {p.stages_type == 2 && "Draft report" || p.stages_type == 3 && "Final Report"} 
                        </p> */}