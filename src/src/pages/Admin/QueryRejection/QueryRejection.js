import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useParams, Link, Redirect } from "react-router-dom";
import { useAlert } from "react-alert";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Table,
    Tooltip,
} from "reactstrap";
import Alerts from "../../../common/Alerts";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import Mandatory from "../../../components/Common/Mandatory";
import Loader from "../../../components/Loader/Loader";

const Schema = yup.object().shape({
    p_notes: yup.string().required(""),
});


function QueryRejection(props) {
    const { id } = useParams();

    const { handleSubmit, register, errors, reset } = useForm({
        resolver: yupResolver(Schema),
    });

    const userId = window.localStorage.getItem("adminkey");
    const [loading, setLoading] = useState(false);


    const onSubmit = (value) => {
        console.log("value :", value)
        setLoading(true)

        let formData = new FormData();
        formData.append("id", id);
        formData.append("notes", value.p_notes);

        axios({
            method: "POST",
            url: `${baseUrl}/admin/setAdminreject`,
            data: formData,
        })
            .then(function (response) {
                console.log("res-", response);
                if (response.data.code === 1) {
                    setLoading(false)
                    Alerts.SuccessNormal("Query declined successfully.")
                    props.history.push({
                        pathname: `/admin/queriestab`,
                        index: 1,
                    });
                } else if (response.data.code === 0) {
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.log("erroror - ", error);
            });
    };

    return (
        <Layout adminDashboard="adminDashboard" adminUserId={userId}>
            <Card>
                <CardHeader>
                    <Row>
                        <Col md="4">
                            <Link
                                to={{
                                    pathname: `/admin/queriestab`,
                                    index: 1,
                                }}
                            >
                                <button class="btn btn-success ml-3">
                                    <i class="fas fa-arrow-left mr-2"></i>
                                    Go Back
                                </button>
                            </Link>
                        </Col>
                        <Col md="4">
                            <div style={{ textAlign: "center" }}>
                                <h2>Decline Query</h2>
                            </div>
                        </Col>
                    </Row>
                </CardHeader>
                {
                    loading ?
                        <Loader />
                        :
                        <>
                            <CardHeader>
                                <div class="row mt-3">
                                    <div class="col-lg-2 col-xl-2 col-md-12"></div>
                                    <div class="col-lg-8 col-xl-8 col-md-12">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Notes<span className="declined">*</span></label>
                                                        <textarea
                                                            className={classNames("form-control", {
                                                                "is-invalid": errors.p_notes,
                                                            })}
                                                            id="textarea"
                                                            rows="6"
                                                            name="p_notes"
                                                            ref={register}
                                                        ></textarea>
                                                        {errors.p_notes && (
                                                            <div className="invalid-feedback">
                                                                {errors.p_notes.message}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                    <div class="col-lg-2 col-xl-2 col-md-12"></div>
                                </div>
                                <Mandatory />
                            </CardHeader>
                        </>
                }
            </Card>
        </Layout>
    );
}

export default QueryRejection;
