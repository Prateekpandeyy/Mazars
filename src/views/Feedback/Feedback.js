import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import classNames from "classnames";
import Alerts from "../../common/Alerts";
import Mandatory from "../../components/Common/Mandatory";
import Loader from "../../components/Loader/Loader";
import { Spinner } from 'reactstrap';
import ShowError from "../../components/LoadingTime/LoadingTime";
import { Link } from "react-router-dom";
import CustomHeading from "../../components/Common/CustomHeading";
const Schema = yup.object().shape({
  p_feedback: yup.string().required(""),
});



function Feedback(props) {

  const { handleSubmit, register, errors, reset } = useForm({
    resolver: yupResolver(Schema),
  });
  const token = window.localStorage.getItem("clientToken")
  const history = useHistory();
  const { id } = useParams();
  const userId = window.localStorage.getItem("userid");
  const [loading, setLoading] = useState(false);
 

  const onSubmit = (value) => {

    setLoading(true)
    let formData = new FormData();
    formData.append("assign_no", id);
    formData.append("feedback", value.p_feedback);
    formData.append("user_id", JSON.parse(userId));

    axios({
      method: "POST",
      url: `${baseUrl}/customers/PostUserFeedback`,
      headers : {
        uit : token
      },
      data: formData,
    })
      .then(function (response) {
    
        if (response.data.code === 1) {
          setLoading(false)
          reset();
          Alerts.SuccessNormal("Feedback sent successfully.")
          history.push({
            pathname: `/customer/queries`,
            index: 0,
          });
        } if (response.data.code === 0) {
          setLoading(false)
        }
      })
      .catch((error) => {
      ShowError.LoadingError(setLoading)
      });
  };


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
                  <button class="customBtn">Go Back</button>
                </Link>
              
            </Col>
            <Col md="8">
              <CustomHeading>
                Feedback
              </CustomHeading>
            </Col>
          </Row>
        </CardHeader>

        <CardBody>
         
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="row" style={{ display: "flex", justifyContent: "center" }}>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Query No.</label>
                        <input
                          type="text"
                          name="p_query"
                          className="form-control"
                          ref={register}
                          value={id}
                          disabled
                        />
                      </div>


                      <div class="form-group">
                        <label>Feedback</label>
                        <textarea
                          className={classNames("form-control", {
                            "is-invalid": errors.p_feedback,
                          })}
                          placeholder="Feedback text here"
                          rows="5"
                          ref={register}
                          name="p_feedback"
                        ></textarea>
                        {errors.p_feedback && (
                          <div className="invalid-feedback">
                            {errors.p_feedback.message}
                          </div>
                        )}
                      </div>
                       
                  {
                      loading ?
                        <Spinner color="primary" />
                        :
                        <button className="customBtn" type="submit">
                         Submit
                        </button>
                    }
                    </div>
                  </div>

                </form>
                <Mandatory />
              </>
          
        </CardBody>
      </Card>
    </Layout>
  );
}

export default Feedback;
