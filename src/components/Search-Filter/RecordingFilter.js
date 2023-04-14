import React from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";

function RecordingFilter(props) {
  const { handleSubmit, register, reset } = useForm();

  const {
    records,
    setRecords,
    setData,
    getRecording,
    SearchQuery,
    userid,
    setDefaultPage,
    setCountNotification,
    resetPaging,
    setPage,
    page,
    setBig,
    setEnd,
  } = props;

  //reset date
  const resetData = () => {
    localStorage.removeItem("recordingData");
    setPage(1);
    reset();
    getRecording(1);
  };
  const updateResult = (res) => {
    let allEnd = Number(localStorage.getItem("admin_record_per_page"));
    let droppage = [];
    let customId = 1;
    if (res.data.code === 1) {
      let all = [];
      let data = res.data.result;
      data.map((i) => {
        let data = {
          ...i,
          cid: customId,
        };
        customId++;
        all.push(data);
      });
      let end = allEnd;

      if (allEnd > res.data.total) {
        end = res.data.total;
      }

      setEnd(end);
      let dynamicPage = Math.ceil(res.data.total / allEnd);

      let rem = (page - 1) * allEnd;

      if (page === 1) {
        setBig(rem + page);
      } else {
        setBig(rem + 1);
      }
      for (let i = 1; i <= dynamicPage; i++) {
        droppage.push(i);
      }
      setDefaultPage(droppage);
      setData(all);
      setCountNotification(res.data.total);
      setRecords(res.data.total);

      setDefaultPage(droppage);
      resetPaging();
      // if (
      //   Object.keys(returnData).length === 0 &&
      //   returnData.constructor === Object
      // ) {

      // }
    }
  };
  const onSubmit = (data) => {
    localStorage.setItem("recordingData", JSON.stringify(data));
    if (data.queryNo) {
      const token = window.localStorage.getItem("adminToken");
      const myConfig = {
        headers: {
          uit: token,
        },
      };
      axios
        .get(
          `${baseUrl}/admin/callRecordingPostlist?uid=${JSON.parse(
            userid
          )}&assign_id=${data.queryNo}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
              updateResult(res);
            }
          }
        });
    } else if (SearchQuery == "tlQuery") {
      const token = window.localStorage.getItem("tlToken");
      const myConfig = {
        headers: {
          uit: token,
        },
      };
      axios
        .get(
          `${baseUrl}/tl/callRecordingPostlist?uid=${JSON.parse(
            userid
          )}&assign_id=${data.queryNo}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
    } else if (SearchQuery == "tpQuery") {
      const token = window.localStorage.getItem("tptoken");
      const myConfig = {
        headers: {
          uit: token,
        },
      };
      axios
        .get(
          `${baseUrl}/tl/callRecordingPostlist?uid=${JSON.parse(
            userid
          )}&assign_id=${data.queryNo}`,
          myConfig
        )
        .then((res) => {
          if (res.data.code === 1) {
            if (res.data.result) {
              setData(res.data.result);
              setRecords(res.data.result.length);
            }
          }
        });
    }
  };

  const Reset = () => {
    return (
      <>
        <button
          type="submit"
          className="customBtn mx-sm-1"
          onClick={() => resetData()}
        >
          Reset
        </button>
      </>
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-12 d-flex">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-inline">
                <input
                  type="text"
                  name="queryNo"
                  ref={register}
                  className="form-select form-control"
                />
                <button type="submit" className="customBtn mx-sm-1">
                  Search
                </button>
                <Reset />
                <div className="form-group mx-sm-1">
                  <label className="form-select form-control">
                    Total Records : {records}
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecordingFilter;
