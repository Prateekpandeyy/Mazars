import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { styled, makeStyles } from "@mui/styles";
import HoldingData from "./HoldingData";
import { baseUrl } from "../baseUrl/BaseUrl";
import { Box, Select, MenuItem, Typography, Button, Grid } from "@mui/material";
import BackDrop from "../Loader/BackDrop";
import MyContainer from "../commonFunction/MyContainer";
import "./style.css";
import {
  DataGrid,
  Column,
  Selection,
  Paging,
  Summary,
  TotalItem,
  MasterDetail,
  Scrolling,
  Pager,
} from "devextreme-react/data-grid";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import axios from "axios";
import moment from "moment";
import { style } from "@mui/system";
const data = [
  { name: "", uv: 60, pv: 2000, amt: 2300 },
  { name: "", uv: 150, pv: 2000, amt: 2300 },
  { name: "", uv: 100, pv: 2000, amt: 2300 },
  { name: "", uv: 300, pv: 2000, amt: 2300 },
  { name: "", uv: 120, pv: 2000, amt: 2300 },
  { name: "", uv: 200, pv: 2000, amt: 2300 },
  { name: "", uv: 80, pv: 2000, amt: 2300 },
  { name: "", uv: 10, pv: 2000, amt: 2300 },
  { name: "", uv: 150, pv: 2000, amt: 2300 },
];
const TopBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px",
});
const useStyle = makeStyles({
  boxRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: "-20px",
  },
  MySelect: {
    display: "flex",
    width: "400px",
    height: "40px",
    background: "#ffffff",
    border: "1px solid #EBEBEB",
    fontWeight: "bold",
    boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
    borderRadius: "7px",
    padding: "0 10px",
    fontSize: "18px",
  },
  MySelect22: {
    display: "flex",
    width: "300px",
    height: "40px",
    background: "#ffffff",
    border: "1px solid #EBEBEB",
    fontWeight: "bold",
    boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
    borderRadius: "7px",
    padding: "0 10px",
    fontSize: "18px",
  },
});

const MyButton = styled(Button)({
  borderRadius: "5px",
  backgroundColor: "#0364BE",
  boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
  borderRadius: "5px",
  minWidth: "120px",
  height: "40px",
});
const Holding = () => {
  let num = {
    accountNumber: "",
    name: "",
  };
  const userName = localStorage.getItem("userName");
  const [accountNumber, setAccountNumber] = useState([]);
  const [date, setDate] = useState("");
  const [HoldingDatatop, setHoldingData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const myConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const Loder = () => {
    setIsLoading(true);
  };
  const classes = useStyle();
  const getDate = () => {
    try {
      axios
        .get(`${baseUrl}/Holding/Holding_MyDematAct_HoldingDates`, myConfig)
        .then((res) => {
          res.data.map((i) => {
            num.name = userName;
            setDate(i.name);
            setAccountNumber([num]);
          });
        });
    } catch (err) {
      setIsLoading(false);
    }
  };
  const getAccountNumber = () => {
    try {
      axios
        .get(`${baseUrl}/Holding/Holding_myDematAct_List`, myConfig)
        .then((res) => {
          res.data.map((i) => {
            num.accountNumber = i.DematActNo;

            setAccountNumber([num]);
            setIsLoading(false);
          });
        });
    } catch (err) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getDate();
    getAccountNumber();
  }, []);
  const onRowPre = (e) => {
    if (e.rowType == "header") {
      e.rowElement.style.backgroundColor = "#E1F1FF";
      e.rowElement.style.fontFamily = "Poppins";
      e.rowElement.style.fontStyle = "normal";
      e.rowElement.style.fontSize = "14px";
      e.rowElement.style.color = "#3D3D3D";
      e.rowElement.style.fontWeight = 600;

      e.rowElement.style.lineHeight = "35px";
    }
    if (e.rowType == "data") {
      e.rowElement.style.margin = "10px";
      e.rowElement.style.fontFamily = "Poppins";
      e.rowElement.style.fontStyle = "normal";
      e.rowElement.style.fontSize = "16px";
      e.rowElement.style.color = "#3D3D3D";
      e.rowElement.style.lineHeight = "35px";
      e.rowElement.style.fontWeight = 400;
    }
  };

  const cellRender = (e) => {
    kk = [];
    e.data.graphDetails.map((i) => {
      gObj = {
        name: "",
        uv: Number(i.rate),
        pv: Number(i.rateDt),
        amt: Number(i.rateDt),
      };
      kk.push(gObj);
    });
    return (
      <>
        <AreaChart
          width={80}
          height={40}
          margin={{ top: 20, right: 5, bottom: 5, left: 5 }}
          data={kk}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="10%"
                stopColor="rgba(0, 100, 0, 0.2)"
                stopOpacity={1.0}
              />
              <stop
                offset="100%"
                stopColor="rgba(0, 100, 0, 0.2)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="uv"
            stroke="rgba(0, 184, 36, 1)"
            strokeWidth={2}
            // fill="rgba(0, 100, 0, 0.2)"
            fillOpacity={5}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </>
    );
  };
  let gData = [];
  let kk;
  let gObj = {};
  // onSelecton holding
  const onSelectionHolding = (e) => {
    let accountNumber = "";
    e.currentSelectedRowKeys.map((i) => {
      accountNumber = i.accountNumber;
    });
    try {
      setIsLoading(true);
      axios
        .get(
          `${baseUrl}/Holding/Holding_myDematAct_Current?dematActNo=${accountNumber}&graphDays=600`,
          myConfig
        )
        .then((res) => {
          setHoldingData(res.data);

          setIsLoading(false);
        });
    } catch (err) {
      setIsLoading(false);
    }
  };
  // Rate Value
  const rateValue = (e) => {
    return parseFloat(Math.abs(e.rate));
  };
  const valueFun = (e) => {
    return parseFloat(Math.abs(e.value));
  };
  const floatVal = (e) => {
    return parseFloat(e.value).toFixed(2);
  };
  const customHeaderCell = (data) => {
    const { caption, name } = data?.column;
    return (
      <span
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          lineHeight: "30px",
          fontFamily: "poppins",
        }}
      >
        {caption || name}
      </span>
    );
  };

  return (
    <Layout mainLink="Holdings" showNavigationButtons={false}>
      <BackDrop isLoading={isLoading} />
      <TopBox>
        <Box className={classes.boxRoot}>
          <div className="holdingAccount">
            <Box className={classes.boxRoot} style={{ marginLeft: "0px" }}>
              <select className={classes.MySelect}>
                <option value={1}>Holding Available in my Demat Account</option>
                <option value={2}> Holding Available with the Broker</option>
                <option value={3}>Holding Pledge for Margin</option>
              </select>
            </Box>
          </div>
          <Box className={classes.boxRoot}>
            <div className="asOn">As On:</div>
            <div className="asOncurrentHolding">
              <select className={classes.MySelect22}>
                <option value={1}>Current holding</option>
                <option>{moment(date).format("DD/MM/YYYY")}</option>
              </select>
            </div>
          </Box>
          <div className="button">
            <Box className={classes.boxRoot}>
              <MyButton
                variant="contained"
                style={{ marginLeft: "35px", height: "60", width: "135px" }}
              >
                EDIS
              </MyButton>
              {/* </div> */}
              {/* </Box>
            <Box className={classes.boxRoot}> */}
              {/* <div className="butn1"> */}
              <MyButton
                variant="contained"
                style={{ marginLeft: "25px", height: "60", width: "135px" }}
              >
                Show
              </MyButton>
            </Box>
          </div>
        </Box>
      </TopBox>
      <TopBox>
        <Grid container>
          <Grid style={{ padding: "20px", marginLeft: "-37px" }}>
            <DataGrid
              dataSource={accountNumber}
              onRowPrepared={onRowPre}
              onSelectionChanged={onSelectionHolding}
              alignment="center"
              showRowLines={true}
              columnAutoWidth={true}
              showColumnLines={false}
              columnHidingEnabled={true}
              columnResizingMode="nextColumn"
              showBorders={false}
            >
              <Selection mode="multiple" showCheckBoxesMode="always" />
              <Column
                caption="DP ID / BOID"
                dataField="accountNumber"
                headerCellRender={customHeaderCell}
              ></Column>
              <Column caption="" dataField="name"></Column>
            </DataGrid>
          </Grid>
        </Grid>
      </TopBox>
      {/* <MyContainer> */}
      <Grid container>
        <Grid style={{ padding: "20px", marginLeft: "-15px" }}>
          {!isLoading && (
            <DataGrid
              dataSource={HoldingDatatop}
              onRowPrepared={onRowPre}
              keyExpr="isin"
              noDataText=""
              alignment="center"
              showRowLines={true}
              columnAutoWidth={true}
              showColumnLines={false}
              columnHidingEnabled={true}
              columnResizingMode={true}
              id="holdingDataGird"
              // noDataText=''
              showBorders={false}
            >
              <Selection mode="multiple" showCheckBoxesMode="always" />
              <Paging enabled={true} defaultPageSize={15} />

              <Column
                caption="Company Name"
                dataField="companyName"
                alignment="left"
                headerCellRender={customHeaderCell}
              ></Column>
              <Column
                caption="Graph"
                cellRender={cellRender}
                headerCellRender={customHeaderCell}
                alignment="left"
              ></Column>
              <Column
                caption="Quantity"
                dataField="quantity"
                alignment="center"
                headerCellRender={customHeaderCell}
              ></Column>
              <Column
                caption="Rate"
                dataField="rate"
                calculateCellValue={rateValue}
                alignment="center"
                customizeText={floatVal}
                headerCellRender={customHeaderCell}
              ></Column>
              <Column
                caption="Value"
                calculateCellValue={valueFun}
                dataField="value"
                alignment="center"
                customizeText={floatVal}
                headerCellRender={customHeaderCell}
              ></Column>
              <Column
                caption="Type"
                dataField="balanceType"
                alignment="center"
                headerCellRender={customHeaderCell}
              ></Column>
            </DataGrid>
          )}
        </Grid>
      </Grid>
      {/* </MyContainer> */}
    </Layout>
  );
};
export default Holding;
