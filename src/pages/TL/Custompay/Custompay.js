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
import CustomHeading from "../../../components/Common/CustomHeading";
import { Container } from "@material-ui/core";
import Swal from "sweetalert2";




function Custompay(props) {
  const alert = useAlert();
  const history = useHistory();
  const { handleSubmit, register, errors, reset } = useForm();

  const userId = window.localStorage.getItem("tlkey");

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState("")
  const [paymentType, setPaymentType] = useState("")
  const [paymentMode, setPaymentMode] = useState("")
  const [paymentDis, setPaymentDis] = useState("");
  const [notes, setNotes] = useState("")
  const [bank, setBank] = useState("")
  const [paymentDate, setPaymentDate] = useState("")
  const [receiveAmount, setReceiveAmount] = useState("")
  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  const [item] = useState(current_date);
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
    formData.append("invoice_id", data.id);
    formData.append("assign_no", data.assign_no);
    formData.append("invoice_no", data.billno);
    formData.append("bank_name", bank);
    formData.append("invoice_amount", data.payable_amount);
    formData.append("payment_recived_date", paymentDate);
    formData.append("payment_by", paymentType);
    formData.append("receive_amount", receiveAmount)
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
          var variable = "Payment captured successully"
          Alerts.SuccessNormal(variable)
          history.push("/teamleader/paymentstatus")
          // props.history.push(routes);
        }
        else{
          setLoading(false)
          var variable = "Something went wrong, please try again"
          Alerts.ErrorNormal(variable) 
        }
      })
      .catch((error) => {
      
      });
  };
  const amountCredit = (e) => {
   console.log("eeee", e.target.value , data.payable_amount)
    
     if(Number(e.target.value) < Number(data.payable_amount)){
      Swal.fire({
        title : "warning",
        html : `Value could not be less than ${data.payable_amount}`,
        icon : "warning"
      })
      setReceiveAmount(data.payable_amount)
    }
  }

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
             Manual credit of payment
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
                        
                           value={data.payable_amount}
                          disabled
                        />
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="form-group">
                        <label>Amount credited  <span className="declined">*</span></label>
                        <input
                          type="number"
                          name="p_receive"
                          className={classNames("form-control", {
                            "is-invalid": errors.p_receive,
                          })}
                        onChange={(e) => setReceiveAmount(e.target.value)}
                           value={receiveAmount}
                           onBlur = {(e) => amountCredit(e)}
                         
                        />
                      </div>
                  </div>
                  <div className="col-md-6">
                   <div class="form-group">
                        <label> Paid in bank account number <span className="declined">*</span></label>
                        <input
                          type="text"
                          name="p_account"
                        value = {bank}
                        onChange = {(e) => setBank(e.target.value)}
                          ref={register({required : true})}
                          className={classNames("form-control", {
                            "is-invalid": errors.p_account,
                          })}
                        />
                      </div>
                  
                   </div>
                   <div className="col-md-6">
                   <div class="form-group">
                        <label> Payment receipt date <span className="declined">*</span></label>
                        <input
                          type="date"
                          name="p_date"
                          className={classNames("form-control", {
                            "is-invalid": errors.p_date,
                          })}
                          value = {paymentDate}
                          onChange = {(e) => setPaymentDate(e.target.value)}
                          ref={register({required : true})}
                          max= {item}
                         
                        />
                      </div>
                     
                   </div>
                   <div className="col-md-6">
                   <div class="form-group">
                        <label> Payment type <span className="declined">*</span></label>
                    {/* <input 
                    type = "text"
                    ref={register({required : true})}
                    value = {paymentType}
                    onChange = {(e) => setPaymentType(e.target.value)}
                    name = "payment_mode"
                    className={classNames("form-control", {
                     "is-invalid": errors.payment_mode,
                   })} /> */}
                   <select
                   ref={register({required : true})}
                   value = {paymentType}
                   onChange = {(e) => setPaymentType(e.target.value)}
                   name = "payment_mode"
                   className={classNames("form-control", {
                    "is-invalid": errors.payment_mode,
                  })}>
                      <option 
                    value = "check">
                      Checks
                    </option>
                    <option
                    value = "bank transer">
                      Bank transer
                      </option>
                    <option
                    value = "credit card">
                      Credit card
                    </option>
                    <option
                    value = "debit card">
                      Debit card
                    </option>
                    <option
                    value = "mobile wallet">
                     Mobile wallet
                    </option>
                    <option
                    value = "upi">
                    UPI
                    </option>
                    <option>
                     Electronic bank transfer
                    </option>
                   <option
                   value = "other">
                    Other
                    </option>
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
                          rows="3"
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
                        <label>Other information</label>
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
                        Submit
                      </button>
                      <button class="customBtn ml-3" onClick={() =>history.goBack()}>Cancel</button>
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
