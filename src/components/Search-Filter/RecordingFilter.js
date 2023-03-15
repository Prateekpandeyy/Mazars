import React from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";

function RecordingFilter(props) {
  const { handleSubmit, register, reset } = useForm();

  const { records, setRecords, setData, getRecording, SearchQuery, userid } =
    props;

  //reset date
  const resetData = () => {
    reset();
    getRecording();
  };

  const onSubmit = (data) => {
    if (SearchQuery == "adminQuery") {
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
          className="customBtn mx-sm-1 mb-2"
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
                <button type="submit" className="customBtn mx-sm-1 mb-2">
                  Search
                </button>
                <Reset />
                <div className="form-group mx-sm-1  mb-2">
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
