import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { current_date } from "../../common/globalVeriable";
const InvoiceFilter = (props) => {
  const { handleSubmit, register, errors, reset } = useForm();
  const [queryNo, setQueryNo] = useState("");
  const [fromDate, setFromDate] = useState("");
  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);

  const [perPage, setPerPage] = useState(5);
  const [toDate, setToDate] = useState(current_date);
  const [status, setStatus] = useState("");
  const [installmentno, setInstallmentNo] = useState("");
  const [paymentPlan, setPaymentPlan] = useState("");
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem(`${props.invoice}`));
    if (data) {
      setQueryNo(data.query_no);

      setInstallmentNo(data.payment_plan);
      setFromDate(data.p_dateFrom);
      setToDate(data.p_dateTo);
      setStatus(data.opt);
      setPaymentPlan(data.installment_no);
    }
    if (props.invoice == "admincreate" || props.invoice == "admingenerated") {
      setPerPage(Number(localStorage.getItem("admin_record_per_page")));
    } else if (props.invoice == "tpcreate" || props.invoice == "tpgenerated") {
      setPerPage(Number(localStorage.getItem("tp_record_per_page")));
    } else if (props.invoice == "tlcreate" || props.invoice == "generated") {
      setPerPage(Number(localStorage.getItem("tl_record_per_page")));
    } else {
      setPerPage(5);
    }
  }, []);
  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("qno", data.query_no);
    formData.append("payment_plan", data.payment_plan);
    console.log('Length',Object.values(data));
    if (
      props.invoice == "tlcreate" ||
      props.invoice === "tpcreate" ||
      props.invoice === "admincreate"
    ) {
      formData.append("from", "");
      formData.append("to", "");
      formData.append("status", "");
    } else {
      formData.append("from", data.p_dateFrom);
      formData.append("to", data.p_dateTo);
      formData.append("status", data.opt);
    }
    {
      data.installment_no
        ? formData.append("installment_no", data.installment_no)
        : formData.append("installment_no", "");
    }

    // formData.append("status", data.opt);
    localStorage.setItem(`${props.invoice}`, JSON.stringify(data));
    if (props.invoice == "generated") {
      const token = window.localStorage.getItem("tlToken");
      axios({
        method: "POST",
        url: `${baseUrl}/tl/getPaymentDetail?tl_id=${props.userid}&invoice=1`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          updateResult(res);
        }
      });
    } else if (props.invoice == "tlcreate") {
      const token = window.localStorage.getItem("tlToken");
      axios({
        method: "POST",
        url: `${baseUrl}/tl/getPaymentDetail?tl_id=${props.userid}&invoice=0&status=${data.opt}`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          updateResult(res);
        }
      });
    } else if (props.invoice == "tpcreate") {
      const token = window.localStorage.getItem("tptoken");
      axios({
        method: "POST",
        url: `${baseUrl}/tl/getPaymentDetail?tp_id=${props.userid}&invoice=0`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        updateResult(res);
        props.resetPaging();
        // if (res.data.code === 1) {
        //   props.setData(res.data.payment_detail);
        //   props.setRec(res.data.payment_detail.length);
        // }
      });
    } else if (props.invoice == "tpgenerated") {
      const token = window.localStorage.getItem("tptoken");

      axios({
        method: "POST",
        url: `${baseUrl}/tl/getPaymentDetail?tp_id=${props.userid}&invoice=1`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        updateResult(res);
        props.resetPaging();
        // if (res.data.code === 1) {
        //   props.setData(res.data.payment_detail);
        //   props.setRec(res.data.payment_detail.length);
        // }
      });
    } else if (props.invoice == "admingenerated" && formData) {
      const token = window.localStorage.getItem("adminToken");

      let customId = 1;
      axios({
        method: "POST",
        url: `${baseUrl}/admin/getPaymentDetail?&invoice=1`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        updateResult(res);
        // if (res.data.code === 1) {
        //   let all = [];
        //   let data = res.data.payment_detail;
        //   data.map((i) => {
        //     let data = {
        //       ...i,
        //       cid: customId,
        //     };
        //     customId++;
        //     all.push(data);
        //   });
        //   props.setData(all);
        //   props.setCountNotification(res.data.total);
        //   props.setRecords(res.data.total);
        //   props.resetPaging();
        //   props.setRec(res.data.payment_detail.length);
        // }
      });
    } else if (props.invoice == "admincreate") {
      const token = window.localStorage.getItem("adminToken");
      let customId = 1;
      axios({
        method: "POST",
        url: `${baseUrl}/admin/getPaymentDetail?&invoice=0`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        updateResult(res);
      });
    }
  };
  const resetData = () => {
    // console.log("Props", props);
    // reset();
    setQueryNo("");
    setInstallmentNo("");
    setFromDate("");
    setToDate(current_date);
    setStatus("");
    props.resetPaging();
    localStorage.removeItem(props.sortedValuetl);
    localStorage.removeItem(props.invoice);
    props.getData(1);
  };
  const updateResult = (res) => {
    let allEnd = perPage;
    // let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    localStorage.setItem(props.localPage, 1);
    let returnData = JSON.parse(localStorage.getItem(`${props.invoice}`));
    let droppage = [];
    let customId = 1;
    if (res.data.code === 1) {
      let all = [];
      let data = res.data.payment_detail;
      props.setCountNotification(res.data.total);
      data.map((i) => {
        let data = {
          ...i,
          cid: customId,
        };
        customId++;
        all.push(data);
      });
      let end = props.page * allEnd;

      if (end > res.data.total) {
        end = res.data.total;
      }
      let dynamicPage = Math.ceil(res.data.total / allEnd);

      let rem = (props.page - 1) * allEnd;
      props.setBig(1);
      if (Number(res.data.total) < allEnd) {
        props.setEnd(Number(res.data.total));
      } else {
        props.setEnd(allEnd);
      }
      for (let i = 1; i <= dynamicPage; i++) {
        droppage.push(i);
      }

      props.setDefaultPage(droppage);
      props.setData(all);
      props.setPage(1);
      props.setRec(res.data.total);
      // console.log(returnData);
      if (returnData === null) {
        props.resetPaging();
      }
      // props.resetPaging();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              name="query_no"
              ref={register}
              placeholder="Enter Query Number"
              className="form-control"
              defaultValue={queryNo}
              value={queryNo}
              onChange={(e) => setQueryNo(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <select
              ref={register}
              value={installmentno}
              onChange={(e) => {
                setInstallmentNo(e.target.value);
                setPaymentPlan("");
              }}
              className="form-select form-control"
              style={{ height: "33px" }}
              name="payment_plan"
            >
              <option value="">Please select Payment plan</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3A">3 A</option>
              <option value="3B">3 B</option>
              <option value="4">4</option>
            </select>
          </div>
          {installmentno === "3B" ? (
            <div className="col-md-2">
              <input
                ref={register}
                name="installment_no"
                placeholder="Enter installment number"
                type="number"
                className="form-control"
                onChange={(e) => setPaymentPlan(e.target.value)}
                value={paymentPlan}
              />
            </div>
          ) : (
            ""
          )}
          {installmentno === "3A" ? (
            <div className="col-md-2">
              <select
                ref={register}
                className="form-select form-control"
                style={{ height: "33px" }}
                onChange={(e) => setPaymentPlan(e.target.value)}
                value={paymentPlan}
                name="installment_no"
              >
                <option value="">Please select installment</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
                <option value="32">32</option>
                <option value="33">33</option>
                <option value="34">34</option>
                <option value="35">35</option>
                <option value="36">36</option>
              </select>
            </div>
          ) : (
            ""
          )}
          {installmentno === "2" ? (
            <div className="col-md-2">
              <select
                ref={register}
                className="form-select form-control"
                style={{ height: "33px" }}
                name="installment_no"
                onChange={(e) => setPaymentPlan(e.target.value)}
                value={paymentPlan}
              >
                <option value="">Please select installment</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          ) : (
            ""
          )}
          {installmentno === "4" ? (
            <div className="col-md-2">
              <select
                ref={register}
                className="form-select form-control"
                style={{ height: "33px" }}
                name="installment_no"
                onChange={(e) => setPaymentPlan(e.target.value)}
                value={paymentPlan}
              >
                <option value="">Please select installment</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
            </div>
          ) : (
            ""
          )}
          {props.invoice == "tlcreate" ||
          props.invoice == "tpcreate" ||
          props.invoice === "admincreate" ? (
            ""
          ) : (
            <>
              <div className="col-md-1">
                <label className="form-select form-control">From</label>
              </div>
              <div className="col-md-2">
                <input
                  type="date"
                  name="p_dateFrom"
                  className="form-select form-control"
                  ref={register}
                  // defaultValue={fromDate}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="col-md-1">
                <label className="form-select form-control">To</label>
              </div>
              <div className="col-md-2">
                <input
                  type="date"
                  name="p_dateTo"
                  className="form-select form-control"
                  ref={register}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <select
                  name="opt"
                  className="form-select form-control"
                  ref={register}
                  style={{ height: "33px" }}
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                >
                  <option value="">Select </option>
                  <option value="0">Unpaid</option>
                  <option value="1">Paid</option>
                  <option value="2">Declined</option>
                </select>
              </div>
            </>
          )}

          <div className="col-md-5">
            <button
              className="customBtn"
              type="submit"
              style={{ height: "33px" }}
            >
              Search
            </button>
            <button
              type="button"
              className="customBtn mx-2"
              onClick={() => resetData()}
              style={{ height: "33px" }}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default InvoiceFilter;
