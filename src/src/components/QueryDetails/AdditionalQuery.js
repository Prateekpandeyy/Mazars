import React from "react";
import CommonServices from "../../common/common";

function AdditionalQuery({ displayQuery }) {
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
          ADDITIONAL QUERIES
        </p>
        <table class="table table-bordered">
          <thead>
            <tr>
              {/* <th scope="col" style={{ width: "33.3%" }}>
                Additional Queries
              </th> */}
              <th scope="col">Date Submission</th>
              <th scope="col">Documents</th>
            </tr>
          </thead>
          {displayQuery.map((p, i) => (
            <tbody>
              <tr key={i}>
                {/* <td>{p.additional_queries}</td> */}
                <td>{CommonServices.changeFormateDate(p.created)}</td>
                <td>
                  {p.upload_doc == "" ? (
                    ""
                  ) : (
                    <p style={{ display: "flex" }}>
                      <a
                        href={`http://65.0.220.156/mazarapi/assets/image/${p.assign_no}/${p.upload_doc}`}
                        target="_blank"
                      >
                        <i class="fa fa-photo"></i>
                      </a>
                      <p style={{ marginLeft: "15px" }}>{p.upload_doc}</p>
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}

export default AdditionalQuery;
