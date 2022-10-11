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
import Loader from "../../../components/Loader/Loader";
import { Link } from "react-router-dom";
import CustomHeading from "../../../components/Common/CustomHeading";
import { Container } from "@material-ui/core";





function Custompay(props) {
  const alert = useAlert();
  const history = useHistory();
  const { handleSubmit, register, errors, reset } = useForm();

  const userId = window.localStorage.getItem("tlkey");

  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState("");
  const [data, setData] = useState("")
  const [paymentType, setPaymentType] = useState("")
  const [paymentMode, setPaymentMode] = useState("")
  const [paymentDis, setPaymentDis] = useState("");
  const [notes, setNotes] = useState("")
  const [bank, setBank] = useState("")
  const [paymentDate, setPaymentDate] = useState("")
const [showTl, setShowTl] = useState(false)
const token = window.localStorage.getItem("tlToken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }
useEffect(() => {
  
  axios.get(`${baseUrl}/tl/getPaymentDetail?tl_id=${JSON.parse(userId)}&invoice=1&invoice_id=${props.location.data.id}`, myConfig)
  .then((res) => {
if(res.data.code === 1){
  setData(res.data.payment_detail[0])
  console.log(res.data.payment_detail[0])
}
  })
  
}, [props])
 
  const onSubmit = (value) => {
    console.log()
    setLoading(true)
    let formData = new FormData();
    formData.append("invoice_id", data.assign_id);
    formData.append("assign_no", data.assign_no);
    formData.append("invoice_no", data.billno);
    formData.append("bank_name", bank);
    formData.append("receive_amount", data.invoice_amount);
    formData.append("payment_recived_date", paymentDate);
    formData.append("payment_by", data.invoice_by);
    formData.append("payment_information", paymentDis);
    formData.append("note", notes);
  
    axios({
      method: "POST",
      url: `${baseUrl}/tl/manualpayment`,
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
          // props.history.push(routes);
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
          <button class="customBtn ml-3" onClick={() =>history.goBack()}>Go Back</button>
              
            </Col>
            <Col md="4" align="center">
             <CustomHeading>
             Manual payment process
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
                         
                           value={data.billno}
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
                        
                           value={data.invoice_amount}
                          disabled
                        />
                      </div>
                  </div>
                  <div className="col-md-6">
                   <div class="form-group">
                        <label> Received in Bank / Account <span className="declined">*</span></label>
                        <input
                          type="text"
                          name="p_account"
                        value = {bank}
                        onChange = {(e) => setBank(e.target.value)}
                          ref={register({required : true})}
                          className = "form-control"
                        />
                      </div>
                  
                   </div>
                   <div className="col-md-6">
                   <div class="form-group">
                        <label> Payment Received date <span className="declined">*</span></label>
                        <input
                          type="date"
                          name="p_date"
                          className={classNames("form-control", {
                            "is-invalid": errors.p_date,
                          })}
                          value = {paymentDate}
                          onChange = {(e) => setPaymentDate(e.target.value)}
                          ref={register({required : true})}
                         
                        />
                      </div>
                     
                   </div>
                   <div className="col-md-6">
                   <div class="form-group">
                        <label> Payment type <span className="declined">*</span></label>
                     <select
                     ref={register({required : true})}
                     value = {paymentType}
                     onChange = {(e) => setPaymentType(e.target.value)}
                     name = "payment_mode"
                     className={classNames("form-control", {
                      "is-invalid": errors.payment_mode,
                    })}>
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
                          value = {paymentDis}
                          onChange = {(e) => setPaymentDis(e.target.value)}
                          placeholder="Message text here"
                          rows="5"
                          ref={register({required : true})}
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
                        <label>Notes</label>
                        <textarea
                          className= "form-control"
                          placeholder="Message text here"
                          rows="5"
                          ref={register}
                          value = {notes}
                          onChange = {(e) => setNotes(e.target.value)}
                          name="p_notes"
                        ></textarea>
                      
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
