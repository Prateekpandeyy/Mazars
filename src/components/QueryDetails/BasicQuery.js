import React, { useState, useEffect } from "react";
import CommonServices from "../../common/common";
import { ImageUrl } from "../../config/config";
import { Markup } from 'interweave';
import axios from "axios";
import { baseUrl } from "../../config/config";
import './queryStyle.css';

import MainText from "../Common/MainText";
function BasicQuery({qstatus, panel, p, diaplaySpecific, queryDocs, year, purpose, declined2,
  declinedStatus }) {


    const downloadpdf = (qno, qid, name) => {
      let userId, token;
      if(panel === "admin"){
        userId = window.localStorage.getItem("adminkey");
        token = window.localStorage.getItem("adminToken")
        const myConfig2 = {
          headers : {
           "uit" : token
          },
          responseType: 'blob'
        }
        axios.get(`${baseUrl}/admin/viewdocument?assign_no=${qno}&id=${qid}` , myConfig2)
        .then((res) => {

          if(res.status === 200){
            window.URL = window.URL || window.webkitURL;
               var url = window.URL.createObjectURL(res.data);
               var a = document.createElement("a");
               document.body.appendChild(a);
               a.style = "display: none";
               a.href = url;
            
               a.download = name;
               a.target = '_blank';
               a.click();
          }
        })
       }
     else if(panel === "teamleader"){
      userId = window.localStorage.getItem("tlkey");
      token = window.localStorage.getItem("tlToken")
      const myConfig2 = {
        headers : {
         "uit" : token
        },
        responseType: 'blob'
      }
      axios.get(`${baseUrl}/tl/viewdocument?assign_no=${qno}&id=${qid}` , myConfig2)
      .then((res) => {
       
        if(res.status === 200){
          window.URL = window.URL || window.webkitURL;
             var url = window.URL.createObjectURL(res.data);
             var a = document.createElement("a");
             document.body.appendChild(a);
             a.style = "display: none";
             a.href = url;
          
             a.download = name;
             a.target = '_blank';
             a.click();
        }
      })
     }
     else if(panel === "taxprofessional"){
      userId = window.localStorage.getItem("tpkey");
      token = window.localStorage.getItem("tpToken")
      const myConfig2 = {
        headers : {
         "uit" : token
        },
        responseType: 'blob'
      }
      axios.get(`${baseUrl}/tl/viewdocument?assign_no=${qno}&id=${qid}` , myConfig2)
      .then((res) => {
       
        if(res.status === 200){
          window.URL = window.URL || window.webkitURL;
             var url = window.URL.createObjectURL(res.data);
             var a = document.createElement("a");
             document.body.appendChild(a);
             a.style = "display: none";
             a.href = url;
          
             a.download = name;
             a.target = '_blank';
             a.click();
        }
      })
     }
     else if(panel === "client"){
      userId = window.localStorage.getItem("userid");
      token = window.localStorage.getItem("clientToken")
      const myConfig2 = {
        headers : {
         "uit" : token
        },
        responseType: 'blob'
      }
      axios.get(`${baseUrl}/customers/viewdocument?assign_no=${qno}&id=${qid}` , myConfig2)
      .then((res) => {
      
        if(res.status === 200){
          window.URL = window.URL || window.webkitURL;
             var url = window.URL.createObjectURL(res.data);
             var a = document.createElement("a");
             document.body.appendChild(a);
             a.style = "display: none";
             a.href = url;
          
             a.download = name;
             a.target = '_blank';
             a.click();
        }
      })
     }
      
    
    }
  
  return (
    <>
      <div className="queryBox">
        <MainText align="center">
        Basic query information
        </MainText>
        <table className="table table-bordered p-2">
          <thead>
            <tr>
              <th scope="col">Titles</th> 
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Query no</th>
              <td>{p.assign_no}</td>
            </tr>
            <tr>
              <th scope="row">Query date</th>
              <td>{CommonServices.changeFormateDate(p.created)}</td>
            </tr>
            <tr>
              <th scope="row">Client id</th>
              <td>{p.email}</td>
            </tr>
            <tr>
              <th scope="row">Category</th>
              <td>{p.cat_name}</td>
            </tr>
            <tr>
              <th scope="row">Sub- category</th>
              <td>{p.sub_cat_name}</td>
            </tr>
            <tr>
              <th scope="row">Name of the case</th>
              <td>{p.case_name}</td>
            </tr>
            <tr>
              <th scope="row">Assessment year(s)</th>
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
              <th scope="row">Uploaded dcuments</th>
              <td>
                {queryDocs.map((p, i) => (
                  <p style={{ display: "flex" }}>
                     <span onClick={() => downloadpdf(p.assign_no, p.id, p.name)} style={{display : "flex", cursor : "pointer"}}>
                     <i className="fa fa-photo"></i>
                      
                  
                    <p style={{ marginLeft: "15px" }}>{p.name}</p>
                    </span>
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
              <th scope="row">Format in which opinion is required</th>
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
              <th scope="row">Timelines within which opinion is required</th>
              <td colspan="1">{p.Timelines}</td>
            </tr>
            {qstatus == "-1" || p.is_delete == "1" ? 
            <tr>
              <th scope="row">Date of decline</th>
              <td>{qstatus == "-1" || p.is_delete == "1" ? declined2 : ""}</td>
              </tr> : ""}
            {
              p.query_status == "-1" ?
                <tr>
                  <th scope="row">Reasons for admin decline query</th>
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
                  <th scope="row">Reasons for client decline query</th>
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
