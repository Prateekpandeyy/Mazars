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
    lastChunk,
    nextChunk,
    page,
    big,
    end,
    defaultPage,
    prevChunk,
    countNotification,
    firstChunk,
  } = props;
  const [searchedData, setSearchedData] = useState(null);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccuption] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const token = window.localStorage.getItem("adminToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("searchDataadclient"));
    setName(data.name);
    setCountry(data.country);
    setCity(data.city);
    setState(data.state);
    setEmail(data.email);
    setOccuption(data.occupation);
    setFromDate(data.p_dateFrom);
    setToDate(data.p_dateTo);
  }, []);
  const resetData = () => {
    localStorage.removeItem("searchDataadclient");
    localStorage.removeItem("adminClient");
    setName("");
    setCountry("");
    setCity("");
    setState("");
    setEmail("");
    setOccuption("");
    setFromDate("");
    setToDate("");
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={register}
            />
          </Grid>
          <Grid item sx={12} sm={6} md={4} lg={3}>
            <input
              placeholder="Country"
              type="country"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-control"
              ref={register}
            />
          </Grid>
          <Grid item sx={12} sm={6} md={4} lg={3}>
            <input
              placeholder="City"
              type="text"
              name="city2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-control"
              ref={register}
            />
          </Grid>
          <Grid item sx={12} sm={6} md={4} lg={3}>
            <input
              placeholder="State"
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={occupation}
              onChange={(e) => setOccuption(e.target.value)}
              ref={register}
            />
          </Grid>
          <Grid item sx={12} sm={6} md={4} lg={3}>
            <Grid container columnSpacing={2}>
              <Grid item lg={4}>
                <label className="form-control">From</label>
              </Grid>
              <Grid item lg={8}>
                <input
                  type="date"
                  name="p_dateFrom"
                  className="form-select form-control"
                  ref={register}
                  max={current_date}
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3}>
            <Grid container columnSpacing={2}>
              <Grid item lg={3}>
                <label className="form-select form-control">To</label>
              </Grid>
              <Grid item lg={9}>
                <input
                  type="date"
                  name="p_dateTo"
                  className="form-select form-control"
                  ref={register}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  max={current_date}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container my={1} spacing={1}>
          <Grid item lg={7}>
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
            <button
              type="button"
              class="autoWidthBtn mb-2"
              onClick={() => exportToExcel()}
            >
              Export to Excel
            </button>
            {/* <label className="form-control">Total Records : {records}</label> */}
          </Grid>

          <Grid item lg={5}>
            <div className="customPagination">
              <div className="ml-auto d-flex w-100 align-items-center justify-content-end">
                <span>
                  {big}-{end} of {countNotification}
                </span>
                <span className="d-flex">
                  {page > 1 ? (
                    <>
                      <button
                        type="button"
                        className="navButton mx-1"
                        onClick={(e) => firstChunk()}
                      >
                        &lt; &lt;
                      </button>
                      <button
                        type="button"
                        className="navButton mx-1"
                        onClick={(e) => prevChunk()}
                      >
                        &lt;
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                  <div
                    style={{
                      display: "flex",
                      maxWidth: "70px",
                      width: "100%",
                    }}
                  >
                    <select
                      value={page}
                      onChange={(e) => {
                        setPage(Number(e.target.value));
                        getCustomer(Number(e.target.value));
                        localStorage.setItem(
                          "adminClient",
                          Number(e.target.value)
                        );
                      }}
                      className="form-control"
                    >
                      {defaultPage.map((i) => (
                        <option value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  {defaultPage.length > page ? (
                    <>
                      <button
                        className="navButton mx-1"
                        type="button"
                        onClick={(e) => nextChunk()}
                      >
                        &gt;
                      </button>
                      <button
                        type="button"
                        className="navButton mx-1"
                        onClick={(e) => lastChunk()}
                      >
                        &gt; &gt;
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </span>
              </div>
            </div>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default CustomerListFilter;
