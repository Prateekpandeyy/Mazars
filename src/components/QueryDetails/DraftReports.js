import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import CommonServices from "../../common/common";

function DraftReports({ id }) {

    console.log("igg-", id)

    const userId = window.localStorage.getItem("userid");
    const [assignmentDisplay, setAssignmentDisplay] = useState([]);

    useEffect(() => {
        getAssignmentData();
    }, []);

    const getAssignmentData = () => {
        axios
            .get(
                `${baseUrl}/tl/getDcumentDeail?id=6&type=2`
            )
            .then((res) => {
                if (res) {
                    console.log("mmmm-", res)
                    setAssignmentDisplay(res.data.result);
                }
            });
    };

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
                    Draft Reports
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
                            <th scope="row">Draft Reports</th>
                            <td>
                                <tr>
                                    <th>Date</th>
                                    <th>Name</th>
                                </tr>
                                {assignmentDisplay.map((p, i) => (
                                    <tr>
                                        <td>{CommonServices.removeTime(p.date)}</td>
                                        <td>
                                            <a
                                                href={`http://65.0.220.156/mazarapi/assets/upload/report/${p.name}`}
                                                target="_blank"
                                            >
                                                {p.name}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DraftReports;
