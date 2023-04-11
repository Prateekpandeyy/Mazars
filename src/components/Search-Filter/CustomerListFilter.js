import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
import { current_date } from "../../common/globalVeriable";
import { Grid } from "@mui/material";
function CustomerListFilter(props) {
  const { handleSubmit, register, reset } = useForm();
  const {
    setData,

    getCustomer,
    setBig,
    setEnd,
    setCountNotification,
    setPage,
    setDefaultPage,
  } = props;
  const [searchedData, setSearchedData] = useState(null);
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    setSearchedData(JSON.parse(localStorage.getItem("searchDataadclient")));
  }, []);
  const resetData = () => {
    localStorage.removeItem("searchDataadclient");
    reset();
    getCustomer(1);
  };

  const onSubmit = (data) => {
    localStorage.setItem("searchDataadclient", JSON.stringify(data));
    if (Object.values(data).length > 0)
      axios
        .get(
          `${baseUrl}/admin/getAllList?&name=${data.name}&country=${data.country}&state=${data.state}&city=${data.city2}&email=${data.email}&occupation=${data.occupation}&from=${data.p_dateFrom}&to=${data.p_dateTo}`,
          myConfig
        )
        .then((res) => {
          let all = [];
          if (res.data.code === 1) {
            if (res.data.result) {
              let customId = 1;
              res.data.result.map((i) => {
                let data = {
                  ...i,
                  cid: customId,
                };
                customId++;
                all.push(data);
              });
              setData(all);
              let droppage = [];
              setPage(1);
              let allEnd = Number(
                localStorage.getItem("admin_record_per_page")
              );
              console.log(Number(allEnd) < Number(res.data.total));
              if (allEnd > Number(res.data.total)) {
                setEnd(Number(res.data.total));
              } else {
                setEnd(Number(allEnd));
              }

              setBig(1);
              setCountNotification(res.data.total);
              let dynamicPage = Math.ceil(res.data.total / allEnd);
              for (let i = 1; i <= dynamicPage; i++) {
                droppage.push(i);
              }
              setDefaultPage(droppage);
            }
          }
        });
  };
  const exportToExcel = async () => {
    const myConfig2 = {
      headers: {
        uit: token,
      },
      responseType: "blob",
    };
    axios.get(`${baseUrl}/admin/exportAllCustomer`, myConfig2).then((res2) => {
      window.URL = window.URL || window.webkitURL;
      var url = window.URL.createObjectURL(res2.data);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;

      a.download = "report.xlsx";
      a.target = "_blank";
      a.click();
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container my={1} spacing={1}>
          <Grid item sx={12} sm={6} md={4} lg={3}>
            <input
              placeholder="Name"
              type="text"
              name="name"
              className="form-control"
              defaultValue={searchedData?.name}
              ref={register}
            />
          </Grid>
          <Grid item sx={12} sm={6} md={4} lg={3}>
            <input
              placeholder="Country"
              type="country"
              name="country"
              defaultValue={searchedData?.country}
              className="form-control"
              ref={register}
            />
          </Grid>
          <Grid item sx={12} sm={6} md={4} lg={3}>
            <input
              placeholder="City"
              type="text"
              name="city2"
              defaultValue={searchedData?.city2}
              className="form-control"
              ref={register}
            />
          </Grid>
          <Grid item sx={12} sm={6} md={4} lg={3}>
            <input
              placeholder="State"
              type="text"
              name="state"
              defaultValue={searchedData?.state}
              className="form-control"
              ref={register}
            />
          </Grid>
        </Grid>
        <Grid container my={1} spacing={1}>
          <Grid item sx={12} sm={6} md={4} lg={3}>
            <input
              placeholder="Email"
              type="text"
              defaultValue={searchedData?.email}
              name="email"
              className="form-control"
              ref={register}
            />
          </Grid>
          <Grid item sx={12} sm={6} md={4} lg={3}>
            <input
              placeholder="Occupation"
              type="text"
              name="occupation"
              className="form-control"
              defaultValue={searchedData?.occupation}
              ref={register}
            />
          </Grid>
          <Grid item sx={12} sm={6} md={4} lg={3}>
            <Grid container columnSpacing={2}>
              <Grid item lg={6}>
                <label className="form-control">From</label>
              </Grid>
              <Grid item lg={6}>
                <input
                  type="date"
                  name="p_dateFrom"
                  className="form-select form-control"
                  ref={register}
                  max={current_date}
                  defaultValue={searchedData?.p_dateFrom}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3}>
            <Grid container columnSpacing={2}>
              <Grid item lg={6}>
                <label className="form-select form-control">To</label>
              </Grid>
              <Grid item lg={6}>
                <input
                  type="date"
                  name="p_dateTo"
                  className="form-select form-control"
                  ref={register}
                  defaultValue={searchedData?.p_dateTo}
                  max={current_date}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container my={1} spacing={1}>
          <Grid item lg={9}>
            <button type="submit" className="customBtn mx-sm-1 mb-2">
              Search
            </button>
            <button
              type="submit"
              className="customBtn mx-sm-1 mb-2"
              onClick={() => resetData()}
            >
              Reset
            </button>
            {/* <label className="form-control">Total Records : {records}</label> */}
          </Grid>

          <Grid item lg={3}>
            <button
              type="button"
              class="autoWidthBtn"
              onClick={() => exportToExcel()}
            >
              Export to Excel
            </button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default CustomerListFilter;
