import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import "antd/dist/antd.css";
import { Select } from "antd";
import { useForm } from "react-hook-form";
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from "moment";
const dateFormat = 'YYYY/MM/DD';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
function SearchFilter(props) {
  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;

  const [selectedData, setSelectedData] = useState([]);

  const { setData, getData, allquery, pendingAllocation } = props;
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10))
 const maxDate = moment(new Date().toISOString().slice(0, 10)).add(1, "days")
 const fromDateFun = (e) => {
  setFromDate(e.format("YYYY-MM-DD"))
}
  //search filter
  const handleChange = (value) => {

    setSelectedData(value);
    getData();
  };

  //reset date
  const resetData = () => {
  
    reset();
    getData();
  };

  //reset category
  const resetCategory = () => {
  
    setSelectedData([]);
    getData();
  };


  
  const onSubmit = (data) => {
 

    if (allquery === "allquery") {
      axios
        .get(
          `${baseUrl}/admin/getAllQueries?cat_id=${selectedData}&from=${fromDate}&to=${toDate}`
        )
        .then((res) => {
        
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
            }
          }
        });
    }

    if (pendingAllocation === "pendingAllocation") {
      axios
        .get(
          `${baseUrl}/admin/pendingAllocation?category=${selectedData}&date1=${fromDate}&date2=${toDate}`
        )
        .then((res) => {
         
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
            }
          }
        });
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-3 d-flex">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select Category"
            defaultValue={[]}
            onChange={handleChange}
            optionLabelProp="label"
            value={selectedData}
          >
            <OptGroup label="Direct Tax">
              <Option value="3" label="Compilance">
                <div className="demo-option-label-item">Compliance</div>
              </Option>
              <Option value="4" label="Assessment">
                <div className="demo-option-label-item">Assessment</div>
              </Option>
              <Option value="5" label="Appeals">
                <div className="demo-option-label-item">Appeals</div>
              </Option>
              <Option value="6" label="Advisory/opinion">
                <div className="demo-option-label-item">Advisory/opinion</div>
              </Option>
              <Option value="7" label="Transfer Pricing">
                <div className="demo-option-label-item">Transfer Pricing</div>
              </Option>
              <Option value="8" label="Others">
                <div className="demo-option-label-item">Others</div>
              </Option>
            </OptGroup>

            <OptGroup label="Indirect Tax">
              <Option value="9" label="Compilance">
                <div className="demo-option-label-item">Compliance</div>
              </Option>
              <Option value="10" label="Assessment">
                <div className="demo-option-label-item">Assessment</div>
              </Option>
              <Option value="11" label="Appeals">
                <div className="demo-option-label-item">Appeals</div>
              </Option>
              <Option value="12" label="Advisory/opinion">
                <div className="demo-option-label-item">Advisory/opinion</div>
              </Option>
              <Option value="13" label="Others">
                <div className="demo-option-label-item">Others</div>
              </Option>
            </OptGroup>
          </Select>

          <div>
            <button
              type="submit"
              className="btn btn-primary mb-2 ml-3"
              onClick={resetCategory}
            >
              X
            </button>
          </div>
        </div>

        <div className="col-sm-9 d-flex">
          <div>
            <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mx-sm-3 mb-2">
                <label className="form-select form-control">From</label>
              </div>
              <div className="form-group mx-sm-3 mb-2">
              <DatePicker 
                 
                 onChange={(e) =>fromDateFun(e)}
                 disabledDate={d => !d || d.isAfter(maxDate) }
                  format={dateFormatList} />
                {/* <input
                  type="date"
                  name="p_dateFrom"
                  className="form-select form-control"
                  ref={register}
                /> */}
              </div>

              <div className="form-group mx-sm-3 mb-2">
                <label className="form-select form-control">To</label>
              </div>
              <div className="form-group mx-sm-3 mb-2">
                {/* <input
                  type="date"
                  name="p_dateTo"
                  className="form-select form-control"
                  ref={register}
                /> */}
                  <DatePicker 
                 onChange={(e) =>setToDate(e.format("YYYY-MM-DD"))}
                 disabledDate={d => !d || d.isAfter(maxDate) }
                 defaultValue={moment(new Date(), "DD MM, YYYY")}
                    format={dateFormatList} />
              </div>
              <button type="submit" className="btn btn-primary mb-2">
                Search
              </button>
            </form>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary mb-2 ml-3"
              onClick={resetData}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
