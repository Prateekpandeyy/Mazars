import React, { useState } from "react";
import CommonServices from "../../common/common";
import MainText from "../Common/MainText";

function Feedback({ feedback }) {
  

    return (
        <div>
            
             <MainText align="center">
                Feedback
            </MainText>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th style={{ width: "80px" }}>S.No</th>
                        <th style={{ width: "200px" }}>Date</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        feedback.map((p, i) => (
                            <tr>
                                <td>{i + 1}</td>
                                <td style={{ display: "flex" , border : "0px"}}>
                                    <p>{CommonServices.removeTime(p.created)}</p>
                                    <p style={{ marginLeft: "15px" }}>{CommonServices.removeDate(p.created)}</p>
                                </td>
                                <td>{p.feedback}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Feedback;