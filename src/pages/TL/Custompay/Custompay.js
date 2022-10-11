import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import {
  Card,
  CardHeader,
  CardBody,
 
  Row,
  Col,

} from "reactstrap";
import { useHistory } from "react-router-dom";
import Alerts from "../../../common/Alerts";
import classNames from "classnames";
import Mandatory from "../../../components/Common/Mandatory";
import Loader from "../../../components/Loader/Loader";
import { Link } from "react-router-dom";
import CustomHeading from "../../../components/Common/CustomHeading";
import { Container } from "@material-ui/core";
const Schema = yup.object().shape({
  msg_type: yup.string().required(""),
  p_message: yup.string().required(""),
});



function Custompay(props) {
  const alert = useAlert();
  const history = useHistory();
  const { handleSubmit, register, errors, reset } = useForm({
    resolver: yupResolver(Schema),
  });

  const userId = window.localStorage.getItem("tlkey");

  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState("");
  const [data, setData] = useState({})
  const { message_type, query_id, query_No, routes } = data
const [showTl, setShowTl] = useState(false)
const token = window.localStorage.getItem("tlToken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
useEffect(() => {
    setData(props.location.data)
   console.log("data", props.location.data)
}, [props])
 
  const onSubmit = (value) => {
    
    setLoading(true)
    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("assign_id", query_id);
    formData.append("message_type", value.msg_type);
    formData.append("message", value.p_message);

    {
      value.p_to != undefined ?
    
    formData.append("to", value.p_to)
  : formData.append("to", "customer") }
    axios({
      method: "POST",
      url: `${baseUrl}/tl/messageSent`,
      headers : {
        uit : token
      },
      data: formData,
    })
      .then(function (response) {

        if (response.data.code === 1) {
          reset();
          setLoading(false)
          var variable = "Message sent successfully."
          Alerts.SuccessNormal(variable)
          props.history.push(routes);
        }
      })
      .catch((error) => {
      
      });
  };

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userId}>
      <Card>
        <CardHeader>
          <Row>
          <Col md="4">
            <Link
                  to={{
                    pathname: `/teamleader/${props.location.routes}`,
                    index: props.location.index,
                  }}
                >
                  <button class="customBtn ml-3">Go Back</button>
                </Link>
              
            </Col>
            <Col md="4" align="center">
             <CustomHeading>
                Custom pay
             </CustomHeading>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {
            loading ?
              <Loader />
              :
              <>
        <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Query no.</label>
                        <input
                          type="text"
                          name="p_query"
                          className="form-control"
                          ref={register}
                          value={data.assign_no}
                          disabled
                        />
                      </div>
                  </div>
                  <div className="col-md-6">
                   <div class="form-group">
                        <label>Invoice no.</label>
                        <input
                          type="text"
                          name="p_query"
                          className="form-control"
                          ref={register}
                          value={data.installment_no}
                          disabled
                        />
                      </div>
                  
                   </div>
                   <div class="col-md-6">
                      <div class="form-group">
                        <label>Invoice amount</label>
                        <input
                          type="text"
                          name="p_query"
                          className="form-control"
                          ref={register}
                          value={data.invoice_amount}
                          disabled
                        />
                      </div>
                  </div>
                  <div className="col-md-6">
                   <div class="form-group">
                        <label> Received in Bank / Account </label>
                        <input
                          type="text"
                          name="p_query"
                          className="form-control"
                          ref={register}
                         
                        />
                      </div>
                  
                   </div>
                   <div className="col-md-6">
                   <div class="form-group">
                        <label> Payment Received date </label>
                        <input
                          type="date"
                          name="p_query"
                          className="form-control"
                          ref={register}
                         
                        />
                      </div>
                     
                   </div>
                   <div className="col-md-6">
                   <div class="form-group">
                        <label> Payment type </label>
                     <select className="form-control">
                      <option>UPI</option>
                      <option>Paytm</option>
                     </select>
                      </div>
                   </div>
                   <div className="col-md-6">
                   <div class="form-group">
                        <label>Payment information<span className="declined">*</span></label>
                        <textarea
                          className={classNames("form-control", {
                            "is-invalid": errors.p_message,
                          })}
                          placeholder="Message text here"
                          rows="5"
                          ref={register}
                          name="p_message"
                        ></textarea>
                        {errors.p_message && (
                          <div className="invalid-feedback">
                            {errors.p_message.message}
                          </div>
                        )}
                      </div>
                   </div>
                   <div className="col-md-6">
                   <div class="form-group">
                        <label>Notes<span className="declined">*</span></label>
                        <textarea
                          className={classNames("form-control", {
                            "is-invalid": errors.p_message,
                          })}
                          placeholder="Message text here"
                          rows="5"
                          ref={register}
                          name="p_message"
                        ></textarea>
                        {errors.p_message && (
                          <div className="invalid-feedback">
                            {errors.p_message.message}
                          </div>
                        )}
                      </div>
                   </div>
                   </div>
                      <button type="submit" className="customBtn">
                        Send
                      </button>
                   
                </form>
            </Container>
               
              </>
          }
        </CardBody>

      </Card>
    </Layout>
  );
}

export default Custompay;
