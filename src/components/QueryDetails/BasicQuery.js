import React, { useState, useEffect } from "react";
import CommonServices from "../../common/common";
import { ImageUrl } from "../../config/config";
import { Markup } from 'interweave';
import './queryStyle.css';

function BasicQuery({qstatus, p, diaplaySpecific, queryDocs, year, purpose, declined2,
  declinedStatus }) {



  return (
    <>
      <div style={{display : "block", height: "65vh", overflow :"scroll"}}>
        <p
          style={{
            textAlign: "center",
            color: "black",
            fontSize: "18px",
          }}
        >
          Basic Query Information
        </p>
        <table class="table table-bordered p-2">
          <thead>
            <tr>
              <th scope="col" style={{ width: "300px", overflow: "wrap" }}>Titles</th> 
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Query No</th>
              <td>{p.assign_no}</td>
            </tr>
            <tr>
              <th scope="row">Query Date</th>
              <td>{CommonServices.changeFormateDate(p.created)}</td>
            </tr>
            <tr>
              <th scope="row">Customer ID</th>
              <td>{p.email}</td>
            </tr>
            <tr>
              <th scope="row">Category</th>
              <td>{p.cat_name}</td>
            </tr>
            <tr>
              <th scope="row">Sub- Category</th>
              <td>{p.sub_cat_name}</td>
            </tr>
            <tr>
              <th scope="row">Name of the Case</th>
              <td>{p.case_name}</td>
            </tr>
            <tr>
              <th scope="row">Assessment Year(s)</th>
              <td>
                {year.map((p, i) => (
                  <p key={i}>{p.value}</p>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Brief fact of the case</th>
           <td className="tableStyle"> <Markup content={p.fact_case} /></td>
            </tr>
            <tr>
              <th scope="row">Uploaded Documents</th>
              <td>
                {queryDocs.map((p, i) => (
                  <p style={{ display: "flex" }}>
                    <a
                      href={`${ImageUrl}/${p.assign_no}/${p.name}`}
                      target="_blank"
                    >
                      <i class="fa fa-photo"></i>
                    </a>
                    <p style={{ marginLeft: "15px" }}>{p.name}</p>
                  </p>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Specific questions</th>
              <td>
                {diaplaySpecific.map((p, i) => (
                  <div>{i + 1}. {p.text}</div>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Purpose of the query</th>
              <td colspan="1">
                {purpose.map((p, i) => (
                  <p key={i}>{p.value}</p>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Format in which Opinion is required</th>
              <td colspan="1">
                <p>{p.softcopy_word === "1" && "Softcopy - Word/ Pdf"}</p>
                <p>
                  {p.softcopy_digitally_assigned === "1" &&
                    "SoftCopy- Digitally Signed"}
                </p>

                <p>
                  {p.printout_physically_assigned === "1" &&
                    "Printout- Physically Signed"}
                </p>
              </td>
            </tr>
            <tr>
              <th scope="row">Timelines within which Opinion is Required</th>
              <td colspan="1">{p.Timelines}</td>
            </tr>
            {qstatus == "-1" || p.is_delete == "1" ? 
            <tr>
              <th scope="row">Date of Declined</th>
              <td>{qstatus == "-1" || p.is_delete == "1" ? declined2 : ""}</td>
              </tr> : ""}
            {
              p.query_status == "-1" ?
                <tr>
                  <th scope="row">Reasons for Admin Decline Query</th>
                  <td colspan="1">
                    {
                      p.decline_notes
                    }
                  </td>
                </tr>
                : null
            }
            {
              p.is_delete == "1" ?
                <tr>
                  <th scope="row">Reasons for customer Decline Query</th>
                  <td colspan="1">
                    {
                      p.decline_notes
                    }
                  </td>
                </tr>
                : null
            }
            
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BasicQuery;
